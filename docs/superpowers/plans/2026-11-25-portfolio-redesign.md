# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old scrolling React portfolio with the approved single-screen "Killua" design: one square card (Home, About, Projects, Resume) beside an animated blue line-art video, desktop and mobile.

**Architecture:** Keep Create React App 5 + TypeScript. Content lives in typed data modules (`src/data/*`), pages are small components rendered inside one shared `Card`, and a tiny hash-route hook (no router dependency) switches views so GitHub Pages never 404s. Each unit is tested with Jest + React Testing Library before the visuals are tuned in the browser.

**Tech Stack:** React 18, TypeScript (strict), CSS Modules (built into CRA), Jest + React Testing Library (`react-scripts test`), `gh-pages` for deploy, ffmpeg (one-time asset transcode).

**Spec:** `docs/superpowers/specs/2026-11-25-portfolio-redesign-design.md` (all copy, URLs, colors and sizes come from it; read it before any task).

## Global Constraints

- Package manager is Yarn 1 (`yarn.lock` is committed). Yarn is not installed here, so `yarn …` below means `npx --yes yarn@1.22.22 …`.
- Test command: `CI=true yarn test --watchAll=false <path>`; build command: `yarn build`; type check: `yarn tsc --noEmit`.
- No new runtime dependencies (no router, UI kit, icon pack or animation library). No new dev dependencies unless a task says so.
- TypeScript `strict` stays on. Pages and components are function components with named props types; data modules export typed constants.
- Styling: CSS Modules per component (`Name.module.css`) plus global tokens in `src/index.css`. Use only the tokens and sizes in spec §2/§3.
- Copy is verbatim from the spec, typos included (the Home note keeps "BYI", "hv" and "interested on"). Do not "fix" it.
- Routes are hashes: `#/` home, `#/about`, `#/projects`, `#/resume`; unknown hash means home.
- External links: `target="_blank" rel="noopener noreferrer"`. `mailto:` and resume links are not external-tab links.
- Icons are inline SVG components, no emoji, every icon-only link has an `aria-label`.
- Assets use `process.env.PUBLIC_URL` as the prefix (the site may be served from a subpath).
- Commit after every task with the repo's prefixes (`feat:`, `style:`, `refactor:`, `fix:`, `test:`, `docs:`, `chore:`). Work on branch `redesign/killua`; never commit to `main`.
- Do not run `yarn deploy` or push to `gh-pages` without the owner's explicit OK (it publishes rachzy.dev).

## Review Focus

Failure modes the spec implies but the feature tests do not cover directly, most likely first. Each has a test or check in the task named.

1. **Short or landscape viewports** (e.g. 1280×640, 844×390): the square card must not clip its content; it scrolls inside itself instead. Checked manually in Task 15.
2. **`prefers-reduced-motion`**: no autoplaying video and no Antares pulse; a still poster shows instead. Tests in Task 9 and Task 16.
3. **Unknown or malformed hash** (`#/nope`, `#about`, empty): shows Home and does not throw; back/forward work. Test in Task 6 and Task 10.
4. **Video format support** (Safari/iOS may not play VP9 WebM): the `<video>` offers a WebM and an MP4 source. Test in Task 9, transcode in Task 1.
5. **Subpath hosting and downloads**: resume, photo and video URLs honor `PUBLIC_URL`, and `public/CNAME` exists so a deploy keeps `rachzy.dev`. Tests in Task 1, Task 5 and Task 14.

---

## File Structure

```
public/
  index.html                      rewritten (fonts, meta, favicons)
  site.webmanifest                fixed paths
  CNAME                           rachzy.dev
  media/killua.webm, killua.mp4, killua-poster.jpg
  images/pfp.jpg
  resumes/CV_Henrique_Ferreira.pdf, CV_Henrique_Ferreira_Portuguese.pdf
src/
  index.tsx, index.css            entry + global tokens
  App.tsx                         shell: Background + Card + route switch
  hooks/useHashRoute.ts           Route type, parseHash, routeHref, useHashRoute
  utils/paginate.ts               paginate()
  data/profile.ts                 profile + aboutRows
  data/socials.ts                 socials (6)
  data/projects.ts                projects (4) + PROJECTS_PER_PAGE
  data/resumes.ts                 resumes (2)
  components/icons/               SocialIcons, ProjectIcons, Flags, UiIcons
  components/Background/          sky + hero video (+ reduced-motion poster)
  components/Card/                chamfered frame, watermark, HomeButton slot
  components/NavBar/              About / Projects / Resume cells
  components/HomeButton/          top-left Home link
  components/PageHeader/          avatar + title + subtitle (About/Projects/Resume)
  pages/Home.tsx, About.tsx, Projects.tsx, Resume.tsx  (+ .module.css, + .test.tsx)
  components/Pager/               visual pager
```
Everything under the old `src/components`, `src/data/*.json`, `src/interfaces`, `src/assets` and `App.css` is deleted in Task 17.

---

### Task 0: Branch, toolchain baseline

**Files:**
- Modify: none (workspace only)
- Create: none

**Interfaces:**
- Produces: branch `redesign/killua`, installed `node_modules`, a known-good build/test toolchain on Node 26.

- [ ] **Step 1: Create the branch and clean stray files**

The branch `redesign/killua` already exists and is pushed (confirm with `git branch --show-current`; if you are on `main`, switch to it). Delete the untracked `hi_mask.png` in the repo root if it is present (a leftover from earlier work).

- [ ] **Step 2: Install dependencies**

Run: `npx --yes yarn@1.22.22 install --frozen-lockfile`
Expected: exits 0.

- [ ] **Step 3: Verify test and build run on this Node version**

Run: `CI=true npx --yes yarn@1.22.22 test --watchAll=false --passWithNoTests` and `npx --yes yarn@1.22.22 build`
Expected: both exit 0. If the build fails on Node 26 (OpenSSL or webpack errors), set `NODE_OPTIONS=--openssl-legacy-provider` for the build and record the workaround in `README.md` (Task 18); if still failing, stop and report to the owner.

- [ ] **Step 4: Commit the docs**

```bash
git add docs/superpowers
git commit -m "docs: add portfolio redesign spec and plan"
```

---

### Task 1: Static assets

**Files:**
- Create: `public/media/killua.webm`, `public/media/killua.mp4`, `public/media/killua-poster.jpg`, `public/images/pfp.jpg`, `public/resumes/CV_Henrique_Ferreira.pdf`, `public/resumes/CV_Henrique_Ferreira_Portuguese.pdf`, `public/CNAME`
- Test: `src/assets.test.ts`

**Interfaces:**
- Produces: the static file URLs used by later tasks: `/media/killua.webm`, `/media/killua.mp4`, `/media/killua-poster.jpg`, `/images/pfp.jpg`, `/resumes/CV_Henrique_Ferreira.pdf`, `/resumes/CV_Henrique_Ferreira_Portuguese.pdf`.

- [ ] **Step 1: Write the failing test** in `src/assets.test.ts` using `fs.existsSync` and `fs.readFileSync` on paths under `../public`:
  - `test("all published assets exist")` asserts each path above exists and is non-empty.
  - `test("CNAME keeps the custom domain")` asserts `public/CNAME` trimmed equals `rachzy.dev`.

- [ ] **Step 2: Run it to verify it fails**

Run: `CI=true yarn test --watchAll=false src/assets.test.ts`
Expected: FAIL (files missing).

- [ ] **Step 3: Add the assets**
  - Copy `design-assets/killua2-hd3-with-eyes.webm` to `public/media/killua.webm`.
  - Transcode the MP4 twin: `ffmpeg -i public/media/killua.webm -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/media/killua.mp4`
  - Poster frame: `ffmpeg -ss 0.5 -i public/media/killua.webm -frames:v 1 -q:v 3 public/media/killua-poster.jpg`
  - Profile photo: copy `design-assets/pfp-killua.jpg` (the whole Killua picture, 480×480) to `public/images/pfp.jpg`.
  - If `ffmpeg` is missing in this environment, install it (`apt-get install -y ffmpeg`, or use the `ffmpeg-static` npm package from `npx` only for this one-off) before the MP4 and poster steps.
  - Resumes: copy `src/assets/resume.pdf` to `public/resumes/CV_Henrique_Ferreira.pdf` and `src/assets/resume-portuguese.pdf` to `public/resumes/CV_Henrique_Ferreira_Portuguese.pdf`.
  - `public/CNAME` containing exactly `rachzy.dev`.

- [ ] **Step 4: Run the test and check the video**

Run: `CI=true yarn test --watchAll=false src/assets.test.ts` (PASS) and `ffprobe -v error -show_entries stream=codec_name,width,height -of csv=p=0 public/media/killua.mp4` (Expected: `h264,1600,1600`).

- [ ] **Step 5: Commit**

```bash
git add public src/assets.test.ts
git commit -m "feat: add art video, photo, resumes and CNAME to public"
```

---

### Task 2: HTML shell, global tokens and favicons

**Files:**
- Modify: `public/index.html`, `public/site.webmanifest`, `src/index.css`, `src/index.tsx`
- Test: `src/publicHtml.test.ts`

**Interfaces:**
- Produces: CSS custom properties on `:root` used by every component: `--bg:#03050b`, `--accent:#3fa9ff`, `--text:#eaf4ff`, `--text-2:#c3d6ee`, `--text-3:#a9bbd6`, `--muted:#7f90ab`, `--line:rgba(110,185,255,.24)`, `--font-display`, `--font-body`. Body is `overflow:hidden` and the root fills `100dvh`.

- [ ] **Step 1: Write the failing test** `src/publicHtml.test.ts`:
  - `test("index.html loads only fonts we use and no old CDNs")`: the HTML contains `Big+Shoulders+Display` and `Barlow`, and does not contain `font-awesome`, `iconify` or `font-mfizz`.
  - `test("every local href/src in index.html exists in public/")`: collects `href|src="…"` values that start with `%PUBLIC_URL%/` or are relative, resolves them under `public/` and asserts each exists. (Today the `favicon/…` paths fail this.)

- [ ] **Step 2: Run it to verify it fails**

Run: `CI=true yarn test --watchAll=false src/publicHtml.test.ts`
Expected: FAIL (old CDNs, missing `favicon/` folder).

- [ ] **Step 3: Rewrite the shell**
  - `public/index.html`: title `rachzy`, description "rachzy, Henrique Ferreira: software engineer", `theme-color` `#03050b`, `viewport` with `viewport-fit=cover`, Google Fonts link for Big Shoulders Display 700;800, Barlow 400;500;600 and Noto Sans JP 900 with `&text=神速`, favicons pointing at the existing root files (`%PUBLIC_URL%/favicon-32x32.png` etc.), manifest `%PUBLIC_URL%/site.webmanifest`. Remove FontAwesome, Iconify and mfizz tags.
  - `public/site.webmanifest`: fix `src` paths to the existing root PNGs; `theme_color` and `background_color` `#03050b`; delete `public/manifest.json`.
  - `src/index.css`: tokens above (colors from spec §2), `*{box-sizing:border-box}`, body margin 0, background `var(--bg)`, `color:var(--text)`, `font-family:var(--font-body)`, `overflow:hidden`; `#root{height:100dvh}`; `button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}`; `a{color:inherit;text-decoration:none}`; `:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `CI=true yarn test --watchAll=false src/publicHtml.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add public src/index.css src/index.tsx src/publicHtml.test.ts
git commit -m "style: new html shell, fonts, tokens and fixed favicon paths"
```

---

### Task 3: Profile, about rows and socials data

**Files:**
- Create: `src/data/profile.ts`, `src/data/socials.ts`
- Test: `src/data/profile.test.ts`, `src/data/socials.test.ts`

**Interfaces:**
- Produces:
  - `export const profile: { handle: string; fullName: string; tagline: string; note: string }` with the spec §4 Home values.
  - `export type AboutRow = { label: string; value: string; groupStart?: boolean }` and `export const aboutRows: AboutRow[]` (10 rows, spec §4 About order; `Interests` has `groupStart: true`).
  - `export type SocialId = "discord" | "gmail" | "github" | "steam" | "bluesky" | "linkedin"`; `export type Social = { id: SocialId; label: string; href: string; external: boolean }`; `export const socials: Social[]`.

- [ ] **Step 1: Write the failing tests**
  - `profile.test.ts`: `aboutRows.map(r => r.label)` equals `["Birthday","Working at","Enrolled at","Tech fields","Based in","Languages","Interests","Currently playing","Currently reading","Currently studying"]`; `aboutRows[0].value === "February 25th"`; `aboutRows.find(r => r.label === "Interests")?.groupStart === true` and no other row has it; `profile.note` equals the exact note string from spec §4; `profile.tagline === "Software engineer, currently working in OT cybersecurity."`.
  - `socials.test.ts`: ids equal `["discord","gmail","github","steam","bluesky","linkedin"]` (LinkedIn last); `hrefs` equal the six URLs in spec §4; `gmail.external === false` and the rest `true`.

- [ ] **Step 2: Run to verify they fail**

Run: `CI=true yarn test --watchAll=false src/data`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement** the three exports with the spec's exact strings (`&` stays a literal `&` in the TypeScript string).

- [ ] **Step 4: Run to verify they pass**

Run: `CI=true yarn test --watchAll=false src/data`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data
git commit -m "feat: add profile, about and social data"
```

---

### Task 4: Projects data and pagination

**Files:**
- Create: `src/data/projects.ts`, `src/utils/paginate.ts`
- Test: `src/data/projects.test.ts`, `src/utils/paginate.test.ts`

**Interfaces:**
- Produces:
  - `export type ProjectId = "antares" | "larawag" | "shaula" | "fang"`; `export type Project = { id: ProjectId; name: string; description: string; accent: string; featured?: boolean; repoUrl: string; siteUrl?: string }`; `export const projects: Project[]`; `export const PROJECTS_PER_PAGE = 4`.
  - `export function paginate<T>(items: T[], page: number, perPage: number): { items: T[]; page: number; pageCount: number }` (1-based; `page` is clamped into `[1, pageCount]`; `pageCount` is at least 1).

- [ ] **Step 1: Write the failing tests**
  - `projects.test.ts`: names in order `["Antares","Larawag","Shaula","Fang"]`; accents `#ff9a3d`, `#b99cff`, `#5aa5ff`, `#4fd38a`; only Antares has `featured`; `siteUrl` is defined only for Antares (`https://antares.rachzy.com`) and Larawag (`http://larawag.rachzy.dev/`); every `repoUrl` equals `https://github.com/rachzy/<id>`; descriptions equal the spec §4 strings.
  - `paginate.test.ts`: 4 items per page 4 returns `{pageCount:1, items.length:4, page:1}`; 5 items returns `pageCount:2` and page 2 holds 1 item; `page: 0`, `page: 99` and `NaN` clamp to a valid page; empty list returns `pageCount:1`, `items:[]`.

- [ ] **Step 2: Run to verify they fail**

Run: `CI=true yarn test --watchAll=false src/data/projects.test.ts src/utils`
Expected: FAIL.

- [ ] **Step 3: Implement** both files; `paginate` uses `Math.ceil` and clamps with `Number.isFinite` guard.

- [ ] **Step 4: Run to verify they pass**

Run: same command. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/data/projects.test.ts src/utils
git commit -m "feat: add projects data and paginate helper"
```

---

### Task 5: Resume data

**Files:**
- Create: `src/data/resumes.ts`
- Test: `src/data/resumes.test.ts`

**Interfaces:**
- Produces: `export type Resume = { id: "en" | "pt"; label: "English" | "Portuguese"; flag: "us" | "br"; href: string; downloadName: string }`; `export const resumes: Resume[]` (English first). `href` is `` `${process.env.PUBLIC_URL}/resumes/<file>` ``.

- [ ] **Step 1: Write the failing test**: ids `["en","pt"]`; labels `["English","Portuguese"]`; flags `["us","br"]`; `downloadName`s equal `CV_Henrique_Ferreira.pdf` and `CV_Henrique_Ferreira_Portuguese.pdf`; each `href` ends with its file name and starts with `process.env.PUBLIC_URL`. Add a case that sets `process.env.PUBLIC_URL = "/sub"` and re-imports the module with `jest.isolateModules` to assert `href` starts with `/sub/resumes/` (Review Focus 5).

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/data/resumes.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement** `resumes.ts`.

- [ ] **Step 4: Run to verify it passes** (same command, PASS).

- [ ] **Step 5: Commit**

```bash
git add src/data/resumes.ts src/data/resumes.test.ts
git commit -m "feat: add resume data"
```

---

### Task 6: Hash routing hook

**Files:**
- Create: `src/hooks/useHashRoute.ts`
- Test: `src/hooks/useHashRoute.test.tsx`

**Interfaces:**
- Produces: `export type Route = "home" | "about" | "projects" | "resume"`; `export function parseHash(hash: string): Route`; `export function routeHref(route: Route): string` (`home` returns `#/`, others `#/about`, `#/projects`, `#/resume`); `export function useHashRoute(): Route` (re-renders on `hashchange`, removes its listener on unmount).

- [ ] **Step 1: Write the failing tests**
  - `parseHash`: `""`, `"#"`, `"#/"` → `home`; `"#/about"`, `"#/projects"`, `"#/resume"` → matching routes; `"#about"`, `"#/nope"`, `"#/about/extra"`, `"#/ABOUT"` → `home` (Review Focus 3: nothing throws).
  - `routeHref` returns the four strings above.
  - `useHashRoute` with `renderHook`: sets `window.location.hash = "#/resume"`, dispatches `hashchange` inside `act`, expects `"resume"`; unmounting removes the listener (spy on `removeEventListener`).

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/hooks`
Expected: FAIL.

- [ ] **Step 3: Implement** with a lookup table of valid hashes; the hook reads `window.location.hash` in `useState` initializer.

- [ ] **Step 4: Run to verify it passes** (same command, PASS).

- [ ] **Step 5: Commit**

```bash
git add src/hooks
git commit -m "feat: add hash route hook"
```

---

### Task 7: Icon components

**Files:**
- Create: `src/components/icons/SocialIcons.tsx`, `ProjectIcons.tsx`, `Flags.tsx`, `UiIcons.tsx`, `index.ts`
- Test: `src/components/icons/icons.test.tsx`

**Interfaces:**
- Produces (all accept `{ size?: number; className?: string }` and render one `<svg aria-hidden="true">` unless noted):
  - `socialIcons: Record<SocialId, (p: IconProps) => JSX.Element>` for discord, gmail, github, steam, bluesky, linkedin (glyphs from the approved prototype; GitHub and Bluesky are filled, the rest are 1.4px outline).
  - `projectIcons: Record<ProjectId, (p: IconProps) => JSX.Element>` from `design-assets/icons/*.svg` (viewBox `0 0 64 64`, stroke 2.5, round caps, stroke is the project color from `projects`).
  - `Flag({ code: "us" | "br"; size?: number })` renders `<svg role="img" aria-label="United States flag" | "Brazil flag">`.
  - `HomeIcon`, `GlobeIcon`, `DownloadIcon`, `ChevronIcon({ direction: "left" | "right" })`.
  - Larawag's orbit mask needs a unique id per instance (use `React.useId`).

- [ ] **Step 1: Write the failing tests**: every key of `socialIcons` and `projectIcons` renders an `svg` with `aria-hidden="true"`; `Flag` with `us`/`br` is found by `getByRole("img", {name: "United States flag"})` / `"Brazil flag"`; two Larawag icons on one page produce different mask ids.

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/components/icons`
Expected: FAIL.

- [ ] **Step 3: Implement** the icon files using the SVG paths from `design-assets/icons/` and the glyphs already approved in the prototype; keep every icon in its own small function.

- [ ] **Step 4: Run to verify it passes** (same command, PASS).

- [ ] **Step 5: Commit**

```bash
git add src/components/icons
git commit -m "feat: add social, project, flag and ui icons"
```

---

### Task 8: Card, NavBar, HomeButton and PageHeader

**Files:**
- Create: `src/components/NavBar/NavBar.tsx`, `NavBar.module.css`; `src/components/HomeButton/HomeButton.tsx`, `.module.css`; `src/components/Card/Card.tsx`, `.module.css`; `src/components/PageHeader/PageHeader.tsx`, `.module.css`
- Test: `src/components/NavBar/NavBar.test.tsx`, `src/components/Card/Card.test.tsx`

**Interfaces:**
- Consumes: `Route`, `routeHref` (Task 6); `HomeIcon` (Task 7).
- Produces:
  - `NavBar({ active: Route })`: `<nav aria-label="Sections">` with links About, Projects, Resume (that order) to `routeHref`; the link for `active` gets `aria-current="page"` and the filled style; `active="home"` fills none.
  - `HomeButton({ current: boolean })`: link "Home" to `#/`; `aria-current="page"` when `current`.
  - `Card({ route: Route; children: ReactNode })`: chamfered frame (edge layer 36px cut, face layer 34.5px cut on desktop; 26px / 24.5px at `max-width: 900px`), watermark `神速` (`aria-hidden`), `HomeButton`, a `<main>` holding `children`, and `NavBar` pinned at the bottom.
  - `PageHeader({ title: string })`: round avatar (`/images/pfp.jpg` with `PUBLIC_URL`, 56px desktop / 48px mobile, no border) beside the title (display font 34px / 30px) and the subtitle "rachzy, Henrique Ferreira".

- [ ] **Step 1: Write the failing tests**
  - NavBar: link names in order `["About","Projects","Resume"]`; `active="projects"` gives only Projects `aria-current="page"`; `active="home"` gives none; hrefs are `#/about`, `#/projects`, `#/resume`.
  - Card: on `route="home"` the "Home" link has `aria-current="page"`; on `route="about"` it does not and its `href` is `#/`; children are inside `main`; the watermark is not exposed to `getByText` via role (it has `aria-hidden`).

- [ ] **Step 2: Run to verify they fail**

Run: `CI=true yarn test --watchAll=false src/components/NavBar src/components/Card`
Expected: FAIL.

- [ ] **Step 3: Implement** the four components and their CSS modules. Sizes: desktop card `width: min(680px, 92vw, 88vh); aspect-ratio: 1/1`, glow `filter: drop-shadow(0 0 26px rgba(63,169,255,.38))`, NavBar cell height 60px (56px mobile) with hairline dividers, Home button at `left:44px; top:28px` (`left:24px; top:20px` mobile).

- [ ] **Step 4: Run to verify they pass** (same command, PASS), then `yarn tsc --noEmit` (exit 0).

- [ ] **Step 5: Commit**

```bash
git add src/components
git commit -m "feat: add card, nav bar, home button and page header"
```

---

### Task 9: Background art

**Files:**
- Create: `src/components/Background/Background.tsx`, `Background.module.css`
- Test: `src/components/Background/Background.test.tsx`

**Interfaces:**
- Produces: `Background()` renders the sky gradient layer plus the hero. The hero is `<video autoPlay loop muted playsInline preload="auto" aria-hidden="true" poster=…>` with `<source type='video/webm; codecs="vp9"'>` first and `<source type="video/mp4">` second, URLs from `PUBLIC_URL` (`/media/killua.webm`, `/media/killua.mp4`, poster `/media/killua-poster.jpg`). When `window.matchMedia("(prefers-reduced-motion: reduce)").matches` it renders an `<img alt="">` of the poster instead of the video.

- [ ] **Step 1: Write the failing tests**
  - With `matchMedia` mocked to `matches:false`: the `video` has `muted`, `loop`, `autoplay`, `playsinline` attributes and two `source` children with types `video/webm; codecs="vp9"` then `video/mp4` (Review Focus 4).
  - With `matches:true`: no `video` in the document and an `img` with `src` ending `killua-poster.jpg` (Review Focus 2).
  - Note: jsdom has no `matchMedia`; define it in the test with `Object.defineProperty(window, "matchMedia", …)`.

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/components/Background`
Expected: FAIL.

- [ ] **Step 3: Implement** `Background`. CSS: hero `position:absolute; right:-3vw; top:-3vh; height:106vh; aspect-ratio:1/1; pointer-events:none; mix-blend-mode:screen` with `mask-image: radial-gradient(closest-side,#000 70%,transparent 100%)`; sky `radial-gradient(ellipse 45% 60% at 72% 42%, rgba(30,110,230,.26), transparent 70%)` over `--bg`. At `max-width: 900px` the hero is 844px tall, centered, `opacity:.7`, and sky is `radial-gradient(ellipse 80% 45% at 50% 36%, rgba(30,110,230,.3), transparent 70%)`.

- [ ] **Step 4: Run to verify it passes** (same command, PASS).

- [ ] **Step 5: Commit**

```bash
git add src/components/Background
git commit -m "feat: add background art with video and reduced-motion poster"
```

---

### Task 10: App shell and routing

**Files:**
- Modify: `src/App.tsx` (replace entirely), `src/index.tsx`
- Create: `src/pages/Home.tsx`, `About.tsx`, `Projects.tsx`, `Resume.tsx` as placeholders returning their `<h1>`/heading text only (filled in Tasks 11-14)
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `useHashRoute` (Task 6), `Card`, `Background` (Tasks 8-9).
- Produces: `App()` renders `<Background/>` and `<Card route>` containing the page for the route. Each page is a default-exported component with no props: `Home`, `About`, `Projects`, `Resume`.

- [ ] **Step 1: Write the failing tests** in `src/App.test.tsx` (set `window.location.hash` before rendering, mock `matchMedia` like Task 9):
  - `#/about` renders a heading named "About"; `#/projects` "Projects"; `#/resume` "Resume"; `""` renders "rachzy".
  - `#/nope` renders Home without throwing (Review Focus 3).
  - Clicking the nav link "Projects" changes the visible heading to "Projects" after `hashchange`.

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/App.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement** `App` with a `Record<Route, ComponentType>` lookup; the placeholders each render one heading so the tests can pass. Keep the old files for now but unused.

- [ ] **Step 4: Run to verify it passes**, then `yarn start` in the background and open `http://localhost:3000/` to confirm all four hashes switch views (screenshot at 1440×900).

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/index.tsx src/pages
git commit -m "feat: add app shell with hash routing and page placeholders"
```

---

### Task 11: Home page

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/Home.module.css`
- Test: `src/pages/Home.test.tsx`

**Interfaces:**
- Consumes: `profile`, `socials` (Task 3), `socialIcons` (Task 7).
- Produces: `Home()` with avatar (148px desktop / 120px mobile, glow, no frame, `alt="Henrique's profile picture, Killua from Hunter x Hunter"`), `<h1>` handle, subtitle, tagline, the note, and `<nav aria-label="Social links">` containing the six icon links.

- [ ] **Step 1: Write the failing tests**: `h1` text `rachzy`; text "Henrique Ferreira" and the tagline present; the note paragraph text equals `profile.note` exactly; links inside "Social links" have accessible names `["Discord","Gmail","GitHub","Steam","Bluesky","LinkedIn"]` in that order with the hrefs from `socials`; external ones have `target="_blank"` and `rel="noopener noreferrer"`, Gmail has neither; avatar `src` ends with `/images/pfp.jpg`.

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/pages/Home.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement** Home and CSS: content centered; note 13px (12.5px mobile) in `--muted`, centered, `padding: 0 9%`, above the icon row; icon links 40px hit area, `--text-3` color, white + accent drop-shadow on hover.

- [ ] **Step 4: Run to verify it passes**, then compare against the spec at 1440×900 and 390×844 in the browser and fix spacing.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.tsx src/pages/Home.module.css src/pages/Home.test.tsx
git commit -m "feat: implement home page"
```

---

### Task 12: About page

**Files:**
- Modify: `src/pages/About.tsx`
- Create: `src/pages/About.module.css`
- Test: `src/pages/About.test.tsx`

**Interfaces:**
- Consumes: `aboutRows` (Task 3), `PageHeader` (Task 8).
- Produces: `About()`: `<PageHeader title="About" />` then a `<dl>` with one label/value pair per row; the row with `groupStart` gets extra top margin (12px desktop / 10px mobile).

- [ ] **Step 1: Write the failing tests**: `h1` "About"; `<dt>` texts equal `aboutRows` labels in order; `<dd>` texts equal the values; "February 25th" is in the first `dd`; "Currently reading" is present; "Astrophysics & Cosmology, Sci-fi, Cybersecurity, Anime & Manga" renders with a literal `&`.

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/pages/About.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement** About: grid `140px 1fr` (104px mobile), 15px (14px mobile) text, labels `--muted`, hairlines `rgba(110,185,255,.14)` above each row and below the last.

- [ ] **Step 4: Run to verify it passes**, then verify all ten rows fit inside the card at 1440×900 and 390×844 (no scrollbar).

- [ ] **Step 5: Commit**

```bash
git add src/pages/About.tsx src/pages/About.module.css src/pages/About.test.tsx
git commit -m "feat: implement about page"
```

---

### Task 13: Projects page and pager

**Files:**
- Modify: `src/pages/Projects.tsx`
- Create: `src/pages/Projects.module.css`, `src/components/Pager/Pager.tsx`, `Pager.module.css`
- Test: `src/pages/Projects.test.tsx`, `src/components/Pager/Pager.test.tsx`

**Interfaces:**
- Consumes: `projects`, `PROJECTS_PER_PAGE` (Task 4), `paginate` (Task 4), `projectIcons`, `GlobeIcon`, `socialIcons.github` (Task 7), `PageHeader` (Task 8).
- Produces:
  - `Pager({ page: number; pageCount: number; onChange?: (page: number) => void })`: `<nav aria-label="Project pages">` with a Previous button, the current page number (`aria-current="page"`), a Next button; each arrow is `disabled` when it cannot move.
  - `Projects()`: `PageHeader title="Projects"`, then one `<article>` per project on the current page (`data-featured="true"` on Antares only), each with the project icon, an `<h2>` name, description, and a link row at the bottom: GitHub link (name `"<Name> on GitHub"`) for all, Website link (name `"<Name> website"`) only when `siteUrl` exists; then `Pager`. Page state is local (`useState(1)`).

- [ ] **Step 1: Write the failing tests**
  - Projects: article headings in order `["Antares","Larawag","Shaula","Fang"]`; four GitHub links with the spec hrefs; exactly two Website links (Antares `https://antares.rachzy.com`, Larawag `http://larawag.rachzy.dev/`); only the Antares article has `data-featured="true"`; the pager shows page 1.
  - Pager: with `pageCount=1` both arrows are `disabled`; with `page=1, pageCount=2` Next is enabled and calls `onChange(2)`; `page=2` disables Next.

- [ ] **Step 2: Run to verify they fail**

Run: `CI=true yarn test --watchAll=false src/pages/Projects.test.tsx src/components/Pager`
Expected: FAIL.

- [ ] **Step 3: Implement.** Desktop: `grid-template-columns: 1fr 1fr; gap: 14px`, each container `border: 1px solid var(--line); background: rgba(8,16,36,.62); padding: 14px 16px 8px`, icon (36px) and name on one row, description 14px, links row (36px hit area) at the bottom. Mobile (`max-width:900px`): one column, 10px gap, icon 32px, name and link icons share the first row, pager `position:absolute; bottom:68px`. Hover for every container glows accent `#3fa9ff` (border `var(--accent)`, `box-shadow: 0 0 24px -8px var(--accent)`). The featured container uses orange: border `rgba(255,154,61,.8)`, tinted gradient, glow animation `4.5s ease-in-out infinite` between `0 0 16px -4px rgba(255,154,61,.35)` and `0 0 32px -2px rgba(255,154,61,.7)`, hover stops the animation at `0 0 34px -2px rgba(255,154,61,.85)`.

- [ ] **Step 4: Run to verify they pass**, then check the layout in the browser at both sizes.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Projects.tsx src/pages/Projects.module.css src/pages/Projects.test.tsx src/components/Pager
git commit -m "feat: implement projects page with featured Antares and pager"
```

---

### Task 14: Resume page

**Files:**
- Modify: `src/pages/Resume.tsx`
- Create: `src/pages/Resume.module.css`
- Test: `src/pages/Resume.test.tsx`

**Interfaces:**
- Consumes: `resumes` (Task 5), `Flag`, `DownloadIcon` (Task 7), `PageHeader` (Task 8).
- Produces: `Resume()`: `PageHeader title="Resume"` and two large `<a download>` buttons (96px tall desktop / 88px mobile) in the order of `resumes`, each showing the flag, the label, a muted "PDF" and a download icon.

- [ ] **Step 1: Write the failing test**: the links' accessible names (flag text excluded or included consistently) start with `English` then `Portuguese`; each has `download` equal to `downloadName` and `href` equal to `resume.href`; no `target` attribute; with `PUBLIC_URL="/sub"` isolated import the href starts with `/sub/resumes/` (Review Focus 5).

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/pages/Resume.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement** Resume; hover gives accent border and glow `0 0 26px -6px var(--accent)`; the buttons sit vertically centered in the free space above the NavBar (mobile: `margin-bottom: 70px`).

- [ ] **Step 4: Run to verify it passes**, then click both buttons in the browser to confirm a PDF actually downloads with the expected file name.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Resume.tsx src/pages/Resume.module.css src/pages/Resume.test.tsx
git commit -m "feat: implement resume page with direct downloads"
```

---

### Task 15: Responsive and viewport pass

**Files:**
- Modify: `src/components/Card/Card.module.css`, `Background.module.css`, page CSS modules as needed
- Test: manual checks listed below (CSS layout is not unit-testable in jsdom)

**Interfaces:**
- Consumes: all pages from Tasks 11-14.
- Produces: the mobile layout from spec §3 (breakpoint `max-width: 900px`): card inset 16px with `left/right/top/bottom: 16px`, centered art behind it, kanji 230px, Home/Resume card face opacity `.78/.84` and About/Projects `.9/.92`.

- [ ] **Step 1: Check no-scroll at reference sizes**

For each route and each size 1440×900 and 390×844, run in the browser console (via the browser tool): `document.documentElement.scrollHeight <= window.innerHeight && document.documentElement.scrollWidth <= window.innerWidth`
Expected: `true` for all eight combinations; fix spacing where false.

- [ ] **Step 2: Check awkward viewports (Review Focus 1)**

Repeat at 1280×640, 1024×600 and landscape 844×390. Expected: the card never overflows the viewport and its content stays reachable; if it does not fit, give `Card`'s `main` `overflow-y: auto` and a `min-height: 0` flex chain so it scrolls inside the card, with the NavBar staying visible.

- [ ] **Step 3: Check wide and short mid sizes**

Check 900px and 901px widths (breakpoint edge) and 1920×1080. Expected: no layout jump other than the intended one; art never covers the card text.

- [ ] **Step 4: Commit**

```bash
git add src
git commit -m "style: responsive and short-viewport pass"
```

---

### Task 16: Accessibility and reduced motion

**Files:**
- Modify: component CSS and `Projects.module.css` as needed
- Test: `src/a11y.test.tsx`

**Interfaces:**
- Consumes: `App` (Task 10).

- [ ] **Step 1: Write the failing tests** in `src/a11y.test.tsx`: for each route the page has exactly one `h1`; every `<a>` and `<button>` has a non-empty accessible name; `img` elements either have text alt or `alt=""`; with reduced motion mocked on, the Antares article has the class that disables the animation (assert via a `data-reduced-motion` attribute set by a small `useReducedMotion` hook in `src/hooks/useReducedMotion.ts`, which Background also uses; add that hook and move Task 9's `matchMedia` check into it).

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/a11y.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement** `useReducedMotion(): boolean`; the CSS also gets `@media (prefers-reduced-motion: reduce)` blocks that disable the Antares pulse and transitions. Check contrast of muted text on the card (`#7f90ab` on the dark face is at least 4.5:1) and keyboard order (Home, page content, NavBar) manually with Tab.

- [ ] **Step 4: Run to verify it passes**, plus the full suite: `CI=true yarn test --watchAll=false`.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: reduced-motion hook and accessibility checks"
```

---

### Task 17: Remove the old site

**Files:**
- Delete: everything under `src/components/` that is not part of the new set, `src/data/*.json`, `src/interfaces/`, `src/assets/`, `src/App.css`, `src/logo.svg` and `public/icons/`, `public/about.txt` if present
- Modify: `package.json` (remove unused dependencies such as `web-vitals` if nothing imports it)
- Test: the full existing suite plus a new guard in `src/publicHtml.test.ts`

**Interfaces:**
- Consumes: new components from Tasks 7-14 (they must not import anything being deleted).

- [ ] **Step 1: Write the failing guard test**: `test("no old-site leftovers")` asserts that `src/interfaces`, `src/data/projects.json`, `src/data/skills.json` and `public/icons` do not exist.

- [ ] **Step 2: Run to verify it fails**

Run: `CI=true yarn test --watchAll=false src/publicHtml.test.ts`
Expected: FAIL.

- [ ] **Step 3: Delete the old code** with `git rm -r`; keep `src/index.tsx`, `src/index.css`, `src/App.tsx`, the new folders and test setup. Run `yarn tsc --noEmit` and fix any dangling imports.

- [ ] **Step 4: Verify**

Run: `CI=true yarn test --watchAll=false` (PASS), `yarn build` (exit 0). Record the gzipped JS/CSS sizes printed by the build in the commit message.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove old portfolio components, data and assets"
```

---

### Task 18: Final verification, docs and handoff

**Files:**
- Modify: `README.md` (create if missing)
- Test: none new; this task runs the whole check list

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Write the README**: what the site is, `yarn start / test / build`, project structure from this plan's File Structure, how to replace the art (`public/media`, ffmpeg commands from Task 1), how to refresh the resume PDFs, that anime-derived artwork is used and its licensing is the owner's call, and the Node 26 workaround if Task 0 needed one.

- [ ] **Step 2: Full verification**

Run: `CI=true yarn test --watchAll=false && yarn tsc --noEmit && yarn build`
Expected: all exit 0. Then serve the build (`npx --yes serve -s build`) and, at 1440×900 and 390×844, click through all four views, both resume downloads, every social and project link target, and the back button. Confirm `build/CNAME` exists and contains `rachzy.dev`.

- [ ] **Step 3: Dry run the deploy**

Run: `npx --yes gh-pages --dry-run -d build` if supported by the installed version, otherwise only inspect `build/`. Do not publish.

- [ ] **Step 4: Open the pull request**

```bash
git add README.md
git commit -m "docs: add readme for the redesigned portfolio"
git push -u origin redesign/killua
```
Open a PR to `main` titled "Redesign: single-screen Killua portfolio" with screenshots, then ask the owner for approval before running `yarn deploy`.

---

## Self-Review

1. **Spec coverage:** §1 concept and §3 layout: Tasks 8, 9, 15. §2 tokens: Tasks 2, 8. §4 Home: Tasks 3, 11. About: Tasks 3, 12. Projects: Tasks 4, 13. Resume: Tasks 5, 14. §5 assets: Task 1, Task 7. §6 behavior: Task 6, 10, 16, 18. §7 out of scope respected. The mobile pager anchoring and the Antares featured states are in Task 13.
2. **Step scan:** every step names the files, the signature or the assertions; test steps carry the spec's exact values.
3. **Type consistency:** `Route`, `routeHref`, `SocialId`, `ProjectId`, `Project`, `Resume`, `paginate`, `useReducedMotion` are defined once and reused by the same names. The only cross-task refactor is moving the `matchMedia` check into `useReducedMotion` in Task 16, flagged in that task.
4. **Review Focus:** items 1-5 map to Tasks 15, 9/16, 6/10, 9/1, 5/14/1.
5. **Proportion:** the plan is longer than the spec because it carries the task breakdown, but code bodies are left to the implementer.
