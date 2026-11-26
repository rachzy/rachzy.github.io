"""Rebuild the hero video (public/media/killua.{webm,mp4} and killua-poster.jpg).

The source art draws every stroke as a *pair* of thin parallel edges with a gap
between them, and its edges are stair-stepped. This script turns each pair into
one clean centre line and redraws it:

1. Take the per-pixel maximum over all frames, so every stroke is visible once
   (the art never moves; only light travels along the strokes). Doing the
   geometry once from this image keeps the lines from flickering.
2. Keep thin lines with a top-hat filter (drops the smooth glow halo), fill only
   the narrow enclosed gaps between paired edges, smooth the shape, and
   skeletonize it at 4x so the centre lines come out smooth. Short spurs are
   pruned. The glowing pupils are found separately and left as they are.
3. For each frame, draw an anti-aliased line of LINE_WIDTH px along the centre
   lines, coloured by the brightest nearby pixel of that frame (so the
   travelling light is kept), plus a soft two-layer glow. Pupils come from the
   original frame.
4. Insert a blended frame between each pair (the last blends into the first, so
   the loop stays seamless): 15 fps -> 30 fps.

Usage (needs ffmpeg on PATH):
    python3 -m venv .venv && .venv/bin/pip install -r scripts/hero-video/requirements.txt
    .venv/bin/python scripts/hero-video/render.py design-assets/killua2-hd3-with-eyes.webm public/media
"""

import argparse
import glob
import os
import subprocess
import tempfile
import warnings

import cv2
import numpy as np
from scipy import ndimage as ndi
from skimage.morphology import remove_small_objects, skeletonize

warnings.filterwarnings("ignore", category=FutureWarning)

LINE_WIDTH = 2.0      # px at 1600x1600 (shown at ~1150 px on a 1080p screen)
TOPHAT_THRESHOLD = 30  # 0-255; lower keeps fainter strokes
MAX_GAP_RADIUS = 6     # px; enclosed gaps narrower than ~2x this are filled
SPUR_LENGTH = 8        # px; skeleton branches shorter than this are removed
SS = 4                 # supersampling factor for the centre lines


def disk(r):
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))


def endpoints(s):
    nb = cv2.filter2D(s.astype(np.uint8), -1, np.ones((3, 3), np.float32),
                      borderType=cv2.BORDER_CONSTANT)
    return s & (nb == 2)


def geometry(frames):
    tmax = np.max([cv2.imread(f) for f in frames], axis=0)
    lum = tmax.max(2).astype(np.float32)
    h, w = lum.shape

    eyecore = cv2.morphologyEx((lum > 170).astype(np.uint8), cv2.MORPH_OPEN, disk(9)) > 0

    lines = cv2.morphologyEx(lum, cv2.MORPH_TOPHAT, disk(5)) > TOPHAT_THRESHOLD
    gaps, n = ndi.label(~lines)
    radius = ndi.maximum(ndi.distance_transform_edt(~lines), gaps, index=np.arange(1, n + 1))
    filled = lines | np.isin(gaps, np.where(radius <= MAX_GAP_RADIUS)[0] + 1)
    filled = cv2.morphologyEx(filled.astype(np.uint8), cv2.MORPH_CLOSE, disk(1)) > 0
    filled = remove_small_objects(filled, 40) & ~ndi.binary_dilation(eyecore, iterations=3)

    soft = cv2.GaussianBlur(filled.astype(np.float32), (0, 0), 1.6)
    big = cv2.resize(soft, None, fx=SS, fy=SS, interpolation=cv2.INTER_CUBIC) > 0.42
    sk = skeletonize(big)
    pruned = sk.copy()
    k = SPUR_LENGTH * SS
    for _ in range(k):
        pruned &= ~endpoints(pruned)
    for _ in range(k):
        grow = cv2.dilate(endpoints(pruned).astype(np.uint8), np.ones((3, 3), np.uint8))
        pruned |= grow.astype(bool) & sk
    sk = remove_small_objects(pruned, 10 * SS, connectivity=2)

    dist = cv2.distanceTransform((~sk).astype(np.uint8), cv2.DIST_L2, 5)
    core = np.clip(LINE_WIDTH * SS / 2 + 0.5 - dist, 0, 1).astype(np.float32)
    core = cv2.resize(core, (w, h), interpolation=cv2.INTER_AREA)
    sk1 = cv2.dilate(sk.astype(np.uint8), np.ones((SS, SS), np.uint8))[::SS, ::SS].astype(bool)
    return core, sk1, eyecore


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("outdir")
    args = ap.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        src_dir, out_dir = os.path.join(tmp, "src"), os.path.join(tmp, "out")
        os.makedirs(src_dir)
        os.makedirs(out_dir)
        subprocess.run(["ffmpeg", "-v", "error", "-i", args.source,
                        os.path.join(src_dir, "f%03d.png")], check=True)
        frames = sorted(glob.glob(os.path.join(src_dir, "f*.png")))

        core, sk, eyecore = geometry(frames)
        _, (iy, ix) = ndi.distance_transform_edt(~sk, return_indices=True)
        eye = cv2.dilate(eyecore.astype(np.uint8), disk(20)).astype(np.float32)
        eyesoft = cv2.GaussianBlur(eye, (0, 0), 8)[..., None]
        near = disk(4)

        def render(i):
            f = cv2.imread(frames[i % len(frames)]).astype(np.float32) / 255
            col = cv2.dilate(f, near)[iy, ix]  # this frame's colour of the nearest stroke
            lum = col.max(2, keepdims=True)
            col = col / np.maximum(lum, 1e-3) * np.clip(lum * 1.15, 0, 1)
            line = col * core[..., None]
            glow = (cv2.GaussianBlur(line, (0, 0), 2.5) * 0.9
                    + cv2.GaussianBlur(line, (0, 0), 9) * 0.6)
            img = 1 - (1 - line) * (1 - np.clip(glow, 0, 1))  # screen blend
            return img * (1 - eyesoft) + np.maximum(img, f) * eyesoft

        n = 0
        nxt = render(0)
        for i in range(len(frames)):
            cur, nxt = nxt, render(i + 1)
            for img in (cur, 0.5 * (cur + nxt)):
                out = np.clip(img * 255 + 0.5, 0, 255).astype(np.uint8)
                cv2.imwrite(os.path.join(out_dir, f"o{n:03d}.png"), out)
                n += 1

        seq = os.path.join(out_dir, "o%03d.png")
        ff = ["ffmpeg", "-v", "error", "-y", "-framerate", "30", "-i", seq]
        subprocess.run(ff + ["-c:v", "libvpx-vp9", "-crf", "18", "-b:v", "0", "-row-mt", "1",
                             "-pix_fmt", "yuv420p", "-an",
                             os.path.join(args.outdir, "killua.webm")], check=True)
        subprocess.run(ff + ["-c:v", "libx264", "-crf", "18", "-preset", "slow",
                             "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
                             os.path.join(args.outdir, "killua.mp4")], check=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(out_dir, "o015.png"),
                        "-q:v", "3", os.path.join(args.outdir, "killua-poster.jpg")], check=True)
    print(f"wrote {n} frames at 30 fps to {args.outdir}")


if __name__ == "__main__":
    main()
