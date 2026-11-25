import { render } from "@testing-library/react";
import Background from "./Background";
import { mockMatchMedia } from "../../testUtils";

test("renders a muted looping video with webm then mp4", () => {
  mockMatchMedia(false);
  const { container } = render(<Background />);
  const video = container.querySelector("video") as HTMLVideoElement;
  expect(video).not.toBeNull();
  expect(video.muted).toBe(true);
  expect(video.loop).toBe(true);
  expect(video.autoplay).toBe(true);
  expect(video).toHaveAttribute("playsinline");
  const types = Array.from(video.querySelectorAll("source")).map((s) =>
    s.getAttribute("type")
  );
  expect(types).toEqual(['video/webm; codecs="vp9"', "video/mp4"]);
});

test("reduced motion shows the poster instead of the video", () => {
  mockMatchMedia(true);
  const { container } = render(<Background />);
  expect(container.querySelector("video")).toBeNull();
  const img = container.querySelector("img") as HTMLImageElement;
  expect(img.getAttribute("src")).toMatch(/killua-poster\.jpg$/);
  expect(img).toHaveAttribute("alt", "");
});
