# Portfolio redesign: design spec

Status: approved by the owner in the prototype review (all decisions below were confirmed in chat).
Prototype (private, owner-only): https://claude.ai/artifact/VvDZPLUHK5kwuW2hKJxf6b
Pages in the prototype: desktop `Killua-C` (Home), `Killua-About`, `Killua-Projects`, `Killua-Resume`; mobile `Mobile-Home`, `Mobile-About`, `Mobile-Projects`, `Mobile-Resume` (390×844).

## 1. Concept

A single, non-scrolling screen. One square "card" holds everything. Behind and beside it, an animated blue line drawing of Killua (Hunter x Hunter) on black, with space and lightning cues. Dark, minimalist, two colors: white and blue.

Four views, switched by the bottom bar: Home, About, Projects, Resume. No Skills section. Only six social links.

## 2. Visual tokens

| Token | Value |
|---|---|
| Page background | `#03050b` |
| Card face | `linear-gradient(170deg, rgba(10,22,48,.9), rgba(5,10,23,.92) 60%)` (Home and Resume use `.78/.84` on mobile so the art shows through) |
| Card edge | `linear-gradient(135deg, #bfe3ff, #3fa9ff 40%, #1b5fbf)`, 1.5px, chamfered top-left and bottom-right corners (36px desktop, 26px mobile) |
| Accent | `#3fa9ff` |
| Text | `#eaf4ff`; secondary `#a9bbd6` / `#c3d6ee`; muted `#7f90ab` |
| Hairlines | `rgba(110,185,255,.14)` to `.35` |
| Project colors | Antares `#ff9a3d`, Larawag `#b99cff`, Shaula `#5aa5ff`, Fang `#4fd38a` |
| Display font | Big Shoulders Display 700/800 (names, titles) |
| Body font | Barlow 400/500/600 |
| Watermark | 神速 (Noto Sans JP 900, subset to those two glyphs), accent color, opacity .06, behind the card content. It reads "shinsoku" ("godspeed"), a nod to Killua's Godspeed |

## 3. Layout

- **Desktop** (viewport > 900px): card is square, `width: min(680px, 92vw, 88vh)`, left-aligned with `padding-left: clamp(24px, 8vw, 140px)`, vertically centered. The art is a square video, `height: 106vh`, anchored `right: -3vw; top: -3vh`, radial mask fading its edges, `mix-blend-mode: screen`.
- **Mobile** (viewport <= 900px): card fills the screen with a 16px margin (390×844 reference), art centered behind it at `opacity .7` (Projects/About use an opaque card face), watermark 230px.
- Card inner structure, top to bottom: Home button (absolute, top-left), page header area, bottom `NavBar`.
- Bottom `NavBar`: three equal cells, order **About, Projects, Resume**; the cell for the current page is filled accent (`#3fa9ff`, text `#031022`); on Home no cell is filled. Height 60px desktop / 56px mobile.
- **Home button**: top-left corner of the card, house icon + "Home". On Home it is the highlighted current item (white text, accent icon); elsewhere it is a link to Home.

## 4. Pages and exact copy

### Home
- Avatar: round, 148px desktop / 120px mobile, glow shadow, no border or frame.
- Name: "rachzy" (display font, lowercase, 34px desktop). Subtitle (muted): "Henrique Ferreira".
- Tagline: "Software engineer, currently working in OT cybersecurity."
- Note above the icons, small muted text, verbatim from the owner: `BYI: I'm not interested on internships / non-remote jobs; I hate audios; I hv mod/sev ADHD; I usually forget answering people`
- Social icons, in this order (icon-only links with `aria-label`): Discord, Gmail, GitHub, Steam, Bluesky, LinkedIn.

| Id | Label | URL |
|---|---|---|
| discord | Discord | `https://discord.com/users/392839201034338316` |
| gmail | Gmail | `mailto:henriqueferreira.fox@gmail.com` |
| github | GitHub | `https://github.com/rachzy` |
| steam | Steam | `https://steamcommunity.com/id/rachzy/` |
| bluesky | Bluesky | `https://bsky.app/profile/rachzy.com` |
| linkedin | LinkedIn | `https://www.linkedin.com/in/henrique-ferreira-638304239/` |

### About
Header: small round avatar (56px desktop / 48px mobile), title "About", subtitle "rachzy, Henrique Ferreira". Then rows, label (muted) + value, in this order:

| Label | Value |
|---|---|
| Birthday | February 25th |
| Working at | Unvoid |
| Enrolled at | Information Systems, UFU (2024-2028) |
| Tech fields | Cybersecurity, AI/Harness Engineering, Automation, Web |
| Based in | Uberlândia, Brasil |
| Languages | Portuguese (native), English (fluent), Japanese (learning) |
| Interests (gap before this row) | Astrophysics & Cosmology, Sci-fi, Cybersecurity, Anime & Manga |
| Currently playing | Cyberpunk 2077, No Man's Sky, CS2 |
| Currently reading | Kagurabachi, HxH |
| Currently studying | Transit Photometry, Linear Algebra, Supervised Learning |

### Projects
Header like About with title "Projects". Four standalone bordered containers in a 2×2 grid (desktop) / one column (mobile), 4 projects per page, with a pager below ("‹ 1 ›", arrows disabled while there is one page; on mobile the pager is anchored just above the NavBar). Each container: icon (outline SVG, project color), name, description, bottom icon links.

| Project | Description | GitHub | Website |
|---|---|---|---|
| Antares | Look at the sky, pinpoint a star and start hunting for exoplanets. | `https://github.com/rachzy/antares` | `https://antares.rachzy.com` |
| Larawag | Three.js library for building and visualizing 3D stellar and planetary systems. | `https://github.com/rachzy/larawag` | `http://larawag.rachzy.dev/` |
| Shaula | Python pipeline that extracts exoplanet-detection features from light curves using transit photometry. | `https://github.com/rachzy/shaula` | none |
| Fang | Machine learning model that flags potential exoplanets from pre-processed light curve data. | `https://github.com/rachzy/fang` | none |

Order: Antares, Larawag, Shaula, Fang. Hover: all containers glow the accent blue (`#3fa9ff`), except **Antares**, which is the featured project: orange border and glow that slowly pulses (4.5s), stronger orange glow on hover, no pulse for `prefers-reduced-motion`.
Icons are the outline SVGs in `design-assets/icons/*.svg` (viewBox 0 0 64 64, stroke 2.5, round caps): Antares = four-point star, Shaula = crescent moon, Fang = circle with two bands, Larawag = center circle + tilted orbit + planet.

### Resume
Header like About with title "Resume". Two large buttons, English first:

| Label | Flag | File | Download name |
|---|---|---|---|
| English | United States | `resumes/CV_Henrique_Ferreira.pdf` | `CV_Henrique_Ferreira.pdf` |
| Portuguese | Brazil | `resumes/CV_Henrique_Ferreira_Portuguese.pdf` | `CV_Henrique_Ferreira_Portuguese.pdf` |

Clicking starts the download immediately (plain `<a href download>`). Sources: `src/assets/resume.pdf` and `src/assets/resume-portuguese.pdf` in the old site. The owner should refresh these PDFs: they were last updated February 2025 and still say UFU 2024-2027.

## 5. Art assets

- Animated art: `design-assets/killua2-hd3-with-eyes.webm` (1600×1600, 6s seamless loop, black background, VP9, 1.1 MB). Blue (`#0e4ea0` to `#2e8ef0`) lines with light travelling along the strokes, plus same-blue glowing pupils. Meant to be drawn with `mix-blend-mode: screen`, muted, autoplaying, looping, `playsinline`. An H.264 MP4 twin must be added for Safari/iOS.
- Profile photo: Killua image, whole picture at 480×480 (artifact asset `b47d9c61ea9ab9b2416b7aba7311de97`, `pfp-killua3.jpg`).
- Icons: inline SVG React components (social glyphs, project icons, flags, house, download, chevrons, globe).

## 6. Behavior

- Navigation is client-side and uses URL hashes so GitHub Pages never 404s: `#/` Home, `#/about`, `#/projects`, `#/resume`. Unknown hashes show Home. The browser back button works.
- No scrolling on desktop and mobile at the reference sizes.
- External links open in a new tab with `rel="noopener noreferrer"`; `mailto:` and resume links do not.
- Hosting: GitHub Pages via `gh-pages`, custom domain `rachzy.dev` (`CNAME` exists on the `gh-pages` branch only; it must also live in `public/CNAME`).

## 7. Out of scope

Blog, i18n, CMS, analytics, a second page of projects (the pager is visual only for now), light theme.
