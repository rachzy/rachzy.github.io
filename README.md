# rachzy.dev

Personal portfolio of rachzy (Henrique Ferreira): a single, non-scrolling screen with one square card (Home, About, Projects, Resume) beside an animated blue line-art video of Killua. Create React App 5 + TypeScript, deployed to GitHub Pages at <https://rachzy.dev>.

## Scripts

Yarn 1 is the package manager (`yarn.lock` is committed).

```bash
yarn start    # dev server on http://localhost:3000
yarn test     # Jest + React Testing Library (CI=true yarn test --watchAll=false for one run)
yarn build    # production build into build/
yarn tsc --noEmit
```

Deploying (`yarn deploy`, via `gh-pages`) publishes the live site. Only do it deliberately; `public/CNAME` keeps the `rachzy.dev` domain on every deploy.

Node 22 builds and tests without any workaround; no `--openssl-legacy-provider` flag is needed.

## Structure

```
public/            index.html, favicons, CNAME, media/ (art), images/pfp.jpg, resumes/
src/
  App.tsx          Background + Card + page for the current route
  hooks/           useHashRoute (#/, #/about, #/projects, #/resume), useReducedMotion
  utils/paginate.ts
  data/            profile + about rows, socials, projects, resumes (typed, tested)
  components/      icons, Background, Card, NavBar, HomeButton, PageHeader, Pager
  pages/           Home, About, Projects, Resume
```

Routing is hash-based so GitHub Pages never returns a 404. Unknown hashes show Home. The design spec and plan live in `docs/superpowers/`.

## Replacing the art

The hero is `public/media/killua.webm` (VP9) with an H.264 twin `killua.mp4` for Safari/iOS and a poster `killua-poster.jpg`, which is also shown when the visitor prefers reduced motion. All three are built from `design-assets/killua2-hd3-with-eyes.webm` (1600x1600, 6 s seamless loop on black, 15 fps) and drawn with `mix-blend-mode: screen`.

The source draws each stroke as two parallel edges with jagged steps. `scripts/hero-video/render.py` turns them into single smooth 2 px lines with a soft glow, keeps the light travelling along the strokes and the glowing pupils, and blends in-between frames for a 30 fps loop. Line width, threshold and spur length are constants at the top of the script.

```bash
python3 -m venv .venv && .venv/bin/pip install -r scripts/hero-video/requirements.txt
.venv/bin/python scripts/hero-video/render.py design-assets/killua2-hd3-with-eyes.webm public/media
```

## Refreshing the resumes

Replace `public/resumes/CV_Henrique_Ferreira.pdf` (English) and `public/resumes/CV_Henrique_Ferreira_Portuguese.pdf`. The names are used as the download file names. The current PDFs were last updated February 2025 and still say UFU 2024-2027.

## Licensing note

The artwork and profile picture are derived from the anime Hunter x Hunter (Killua). Whether and how to use them publicly is the owner's call.
