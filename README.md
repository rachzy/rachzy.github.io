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

The hero is `public/media/killua.webm` (VP9) with an H.264 twin `killua.mp4` for Safari/iOS and a poster `killua-poster.jpg`, which is also shown when the visitor prefers reduced motion. Source video: a 1600x1600, 6 s seamless loop on black, drawn with `mix-blend-mode: screen`.

```bash
ffmpeg -i public/media/killua.webm -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/media/killua.mp4
ffmpeg -ss 0.5 -i public/media/killua.webm -frames:v 1 -q:v 3 public/media/killua-poster.jpg
```

## Refreshing the resumes

Replace `public/resumes/CV_Henrique_Ferreira.pdf` (English) and `public/resumes/CV_Henrique_Ferreira_Portuguese.pdf`. The names are used as the download file names. The current PDFs were last updated February 2025 and still say UFU 2024-2027.

## Licensing note

The artwork and profile picture are derived from the anime Hunter x Hunter (Killua). Whether and how to use them publicly is the owner's call.
