# Status

_Last verified: 2026-10-03 at 0a368f4_

René's personal portfolio: a single-page Next.js site, live on `main`, with day-to-day
work on the `working` branch. The redesign (Phases 0–6) is done. Phase 7 (QA and
launch) started 2026-10-02: the accessibility pass, automated a11y scan, cross-browser
check, performance check and AI-trope sweep are done. Left: a VoiceOver pass and a look
in real Safari, both needing René. `main` is at b08811c; `working` (0a368f4) is four
commits ahead with the trope-sweep copy, card title button, new-tab labels and `<header>`.

## Site

**State:** One scrollable page (`Hero`/`About`/`Skills`/`Projects`/`Contact` in
`src/components/sections/`). It's dark-only with a mint `#6EE7B7` accent, named tokens in
`globals.css`, and Space Grotesk/Space Mono fonts. Animation is `motion` except the Hero
entrance, which is CSS (`tw-animate-css`) so it doesn't wait for hydration; both respect
reduced motion. The signature element is generative circuit-line art across the whole
page (`src/components/generative-lines/`). Project cards use a 3D tilt; the card is clickable and its
title is the keyboard/screen-reader button. They open deep-linkable modals
(`?project=slug`) with an image carousel and diagrams that expand into a lightbox. The
diagrams are Mermaid source in `projects.ts`, pre-rendered to `public/diagrams/*.svg` by
`npm run diagrams`; the production build fails if an SVG is stale or missing. The mobile layout is in place, including a full-screen modal below `md`.

| Check | Result | Evidence |
|---|---|---|
| Lint | passing | `npm run lint`: exit 0, no findings (0a368f4, 2026-10-03) |
| Type-check | passing | `npx tsc --noEmit`: exit 0 (0a368f4, 2026-10-03) |
| Build | passing | `npm run build`: compiled, `/` prerendered static (0a368f4, 2026-10-03) |
| Tests | none | No test suite exists |
| Accessibility (keyboard, focus, aria) | passing in headless Chrome | Scripted CDP check against the dev server (2026-10-02; script was a scratch file, not in the repo): skip link is first Tab stop with a 2px mint outline; one `h1`, `h2` per section, `h3` per card (the card title is a `<button>` since da143c2, so the `h3` shows in heading navigation); Enter or Space opens a card's modal with focus on Close; the diagram lightbox is a `role=dialog`, takes focus, traps Tab, and Escape returns focus to its expand button, then to the card; mobile menu button toggles `aria-expanded`, the closed menu is `inert`, Escape returns focus to it; under reduced motion the Skills commands show in full and scroll is `auto`; no console errors. External links carry sr-only "(opens in new tab)" (5d9a988) |
| Automated a11y scan | passing | axe-core 4.13 (WCAG 2.0/2.1/2.2 A and AA plus best practices) across 13 states, desktop and phone: full page, mobile menu, Skills tooltip, all 4 project modals, diagram lightbox. Lighthouse 13.5 accessibility: 100 mobile, 100 desktop. Local production build of 5d9a988 (2026-10-03). Only finding was the phone top bar sitting outside any landmark (moderate, best practice); it's now a `<header>` and passes on recheck. One contrast hit on a Skills item was a mid-fade snapshot; a rescan after the animations finished passed. axe left elements over the blur backdrops and background images as "needs review" because it can't compute their background |
| Contrast | passing | All text/background token pairs computed at 4.75:1 or higher (lowest is `--destructive`; terminal title 5.41:1) (2026-10-02) |
| Cross-browser | passing | Playwright script against a local production build of 6811eb3 (2026-10-02): Chrome 154, Firefox 155 and WebKit 26.6 at 1440×900 and 390×844. All three load with no page errors (only the Vercel Analytics script 404s locally, expected off Vercel) and no horizontal overflow, and render the hero lines, fonts, Skills terminal, card images, all 4 LinkLeaf diagrams, the lightbox, the sticky phone modal header, the mobile menu and Escape-to-close the same. The one bug found, a clipped diagram-lightbox close button, is fixed: after moving it into the title row it's hit-testable and closes the lightbox in all three engines at both sizes (rechecked 2026-10-02). WebKit's first Tab goes to a project card, not the skip link, because Safari skips links on Tab by default. Later changes (card title button, new-tab labels, `<header>`) were pixel-compared before/after in all three engines with no differences. Real Safari **unverified** |
| Performance | good; one follow-up | Lighthouse 13.5 against a local production build of 13b3db6 plus the uncommitted Hero/Projects perf changes (2026-10-02). Desktop: 100 (LCP 0.6-0.8 s, TBT 0-10 ms, CLS 0). Mobile with applied (devtools) throttling: score 86-90, LCP 1.7-2.4 s, TBT 370-470 ms, CLS 0, up from 70-74 and LCP 4.6-5.3 s before the hero fade moved to CSS (3 runs each). Default simulated mobile runs score 81-91 with LCP 3.0 s, but after the change they pick the 16px-tall mobile logo as the LCP element, so their LCP isn't trusted here. No work while idle; scroll and mousemove hold p95 16.7 ms frames at 4x CPU in headless Chrome, which has no GPU, so blur cost on real phones is **unverified**. Initial load (Playwright, 390px): 18 requests, 26 KB images (107 KB before card images stopped preloading), 40 KB fonts. Diagrams: Mermaid (about 3 MB uncompressed, previously loaded when a project with diagrams opened) is gone from the client; the modal fetches pre-rendered SVGs instead (30-34 KB uncompressed each for LinkLeaf; Lighthouse not rerun after this change). Before/after screenshots of all 9 diagrams at 3 sizes are pixel-identical (Playwright + pixelmatch, Chrome 154); they also render, with working lightbox prev/next, in Firefox 155 and WebKit 26.6 |
| Screen reader (VoiceOver) | **unverified** | Not tried; only DOM/aria checks so far |
| Modal on a real phone | working | René checked on a real phone (2026-10-02). Diagrams are tight on a small screen; pinch-zoom is the accepted answer |
| Live deploy matches `main` | partly checked | After `main` moved to b08811c, renemsdev.com served `/diagrams/manifest.json` (200) and the "Skip to content" link (curl, 2026-10-02). Not clicked through in a browser |

**Known issues:** none known in code.

## Projects (lineup of 4, in `src/data/projects.ts`)

- **Resume Builder** (slug `resume-builder`; demo and repo URLs still use `resi-the-builder`): demo, public repo,
  3 screenshots, 3 diagrams, no metric tiles (dropped in the trope sweep). `lessonsLearned`
  is two paragraphs from René's own lessons (prompt rules, prompt caching).
- **LinkLeaf** (paused product, architecture case study): back in the lineup as of
  41ac13b. It has 4 diagrams, one screenshot, a public repo and two metric tiles
  (133 tests, 32 endpoints). The metrics were verified in the LinkLeaf repo, not here;
  sources are in `docs/portfolio-handoff/linkleaf/ENTRY.md`. `lessonsLearned` has two
  paragraphs. Browser check passed: René looked at it, and a Chrome DOM check at
  `/?project=linkleaf` found 4 rendered diagrams, both lesson paragraphs, and the
  `client` fill applied (792d9ea, 2026-09-30).
- **Mobile Mechanic Site** (live client site): copy done. The screenshot is a fresh
  1600×900 capture of the live hero, showing the diagonal panels (2026-09-30). The repo is a client deliverable, so it gets no
  `codeUrl` without checking first.
- **Route Planning App** (status `Live`): updated 2026-10-02 from
  `docs/portfolio-handoff/route-planner/ENTRY.md`. OpenCage broke, so the app now uses
  Nominatim (geocoding) and OpenRouteService (routing). New stack, `demoNote` and
  architecture note, two diagrams, and three 1344×756 screenshots (two desktop, one
  phone composite built from the handoff's phone captures). The app-side claims were
  verified in the route-planner repo, not here; sources are in ENTRY.md. The modal was
  checked in the local dev server (images, both diagrams, no console errors), and René
  confirmed it live on the production site (fd4230c, 2026-10-02).

**Pulled from the lineup:** Weather App. Its saved entry is in
`docs/PROJECT_MODAL_UPDATES.md`.

## Reference docs

- `docs/PROJECT_MODAL_UPDATES.md`: per-project copy status and saved entries.
- `docs/PORTFOLIO_HANDOFF.md`: brief for sessions in other repos that produce modal entries.
- `docs/portfolio-handoff/linkleaf/ENTRY.md`: kept as the source record for LinkLeaf's claims.
- `docs/portfolio-handoff/route-planner/ENTRY.md`: the same for Route Planning App, plus the
  phone captures the composite screenshot was built from.
- `src/components/page-lines/PageLinesLayer.tsx` is live (rendered from `layout.tsx`). Its
  `ACTIVE` flag picks `GenerativeLines` over the hand-authored full-page `PageLines`, which
  is kept but not rendered.
- Unused code kept on purpose: `ui/dot-background.tsx`, `sections/Skills.legacy.tsx`.

<!--
Rules for this file:
- Rewrite it to describe the current state. It isn't a log; history lives in git.
- Every "passing" or "works" claim needs evidence from a run, or it's marked unverified.
- Future work goes in TODO.md, and reasons in decisions.md.
-->
