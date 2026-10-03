# Decisions

Append-only log of choices made and why. Newest at the bottom. Don't edit old
entries: if a decision is reversed, add a new entry that references the old one.

<!-- Entry format:

## YYYY-MM-DD: {{Short title}}

**Decision:** {{what was chosen}}
**Alternatives:** {{what else was considered}}
**Why:** {{the reason, including constraints at the time}}

-->

The entries below were imported on 2026-09-30 from `docs/current-work/STATUS.md` and
`TODO.md`. Dates are the original ones where the old docs gave them; otherwise the
date is when the entry was imported.

## 2026-09-30 (imported): Dark-only theme, mint accent

**Decision:** Dark-only site with a mint `#6EE7B7` accent. `next-themes` and the theme toggle were removed.
**Alternatives:** Light/dark toggle; the old rose/blue/teal palette.
**Why:** A redesign choice from the design brief. One theme also means `dark:` variants never activate, so they were converted to tokens.

## 2026-09-30 (imported): Deep links via a query param, not intercepting routes

**Decision:** Project modals sync to `?project=slug` with `router.replace(..., { scroll: false })`.
**Alternatives:** Intercepting routes.
**Why:** The site is a single page with no per-project route segments. The brief allowed shallow routing as an alternative.

## 2026-09-30 (imported): Generative line art replaced the hand-authored version

**Decision:** One algorithmically generated circuit pattern covers the whole page (`generative-lines/`), with text protected by a frosted backdrop.
**Alternatives:** Hand-authored per-section lines (`hero-effects/`, `section-lines/`), later consolidated into one hand-authored full-page design (888c5d6). That design is kept in `page-lines/PageLines.tsx`, switchable via the `ACTIVE` flag in `PageLinesLayer.tsx`.
**Why:** Hand-tuning coordinates per section and breakpoint didn't scale, especially to mobile.

## 2026-09-30 (imported): Re-roll the line pattern on width changes only

**Decision:** The pattern regenerates on debounced resize only when the width changes.
**Why:** Mobile browsers fire `resize` when the address bar shows or hides, which re-rolled the pattern on every scroll.

## 2026-09-30 (imported): `overflow: clip` on the line-art wrapper

**Decision:** `PageLinesLayer` uses `overflow: clip`, not `overflow: hidden`.
**Why:** With `hidden`, the wrapper became a scroll container. Nav-link fragment navigation scrolled it internally, and the user couldn't scroll back.

## 2026-09-26 (imported): Hand-rolled image carousel

**Decision:** Build the modal carousel with `motion` + `lucide-react`.
**Alternatives:** Bring back Embla, which was removed in Phase 4.
**Why:** Avoids re-adding a dependency that had already been dropped.

## 2026-09-28 (imported): Pull LinkLeaf and Weather App from the lineup

**Decision:** Remove both entries from `projects.ts` entirely, not just hide them. Their content is saved in `PROJECT_MODAL_UPDATES.md`.
**Why:** Neither is ready to showcase. LinkLeaf is blocked on René's own repo work.

## 2026-09-30 (imported): Client repo stays unlinked

**Decision:** The Mobile Mechanic Site gets no `codeUrl` unless the client agrees.
**Why:** It's a client deliverable, not a personal project.

## 2026-09-30 (imported): Dropped the reference-site comparison

**Decision:** Skip the planned final review against `ky.fyi` / `refact0r.dev/about`.
**Why:** The design ended up different enough from those references that comparing them no longer helps.

## 2026-09-30: Adopted the STATUS/TODO/decisions workflow

**Decision:** Folded `docs/current-work/STATUS.md` and `TODO.md` into `docs/STATUS.md`, `docs/TODO.md`, and this file. Kept `PROJECT_MODAL_UPDATES.md` as a reference doc and moved it to `docs/`. The old STATUS and TODO files get deleted only once René approves.
**Why:** René's standard `/new-project` layout. The phase checklist was mostly finished history, which git already records.

## 2026-09-30: LinkLeaf shows both lessons-learned stories

**Decision:** LinkLeaf's `lessonsLearned` has two separate paragraphs: the architecture reflection (A), then the `update` name-shadowing bug (B). `lessonsLearned` now accepts `string | string[]`, rendered like `architectureNote`.
**Alternatives:** Pick one, as the handoff planned (René's earlier call on 2026-09-29 was "keep both, don't combine, choose during review"); merge them into one paragraph.
**Why:** René wanted both. One is an architecture learning story and the other is a real bug that got fixed. Separate paragraphs keep them uncombined.

## 2026-09-30: Plain "resume" spelling

**Decision:** Portfolio copy spells it "resume", not "résumé".
**Why:** René prefers the more common American English spelling.

## 2026-10-02: Phase 7 started, accessibility first

**Decision:** Started Phase 7 at René's request with the accessibility pass. Contrast was measured and left alone (every pair already passes AA). Fixes went into focus, semantics and keyboard paths: one global `:focus-visible` outline in the accent color, a skip link, section labels as `h2`, a real `<button>` for the mobile menu with the closed menu `inert`, and the diagram lightbox as its own dialog with the modal underneath `inert`.
**Alternatives:** Per-component focus styles instead of one global rule.
**Why:** A single rule keeps focus looking the same everywhere and only shows for keyboard users. Project cards kept `role='button'` at first; see the 2026-10-03 entry.

## 2026-10-02: Hero entrance animation in CSS, not Motion

**Decision:** The Hero fade-up uses `tw-animate-css` classes (same durations, delays and 16px rise; CSS `ease` instead of Motion's `easeInOut`; off under reduced motion) instead of `motion` components, and Hero is no longer a client component.
**Alternatives:** Drop the fade entirely; keep Motion and accept the slower LCP.
**Why:** Motion renders the hero at opacity 0 until hydration, which on a throttled phone held the LCP image back by several seconds (LCP 4.6-5.3 s). CSS starts the fade at first paint (LCP 1.7-2.4 s) and keeps the look.

## 2026-10-02: Diagrams pre-rendered to SVG, Mermaid out of the client

**Decision:** `scripts/render-diagrams.mjs` (`npm run diagrams`) renders every `chart` in `projects.ts` to `public/diagrams/<slug>-<index>.svg` inside the running dev site, through the installed Chrome via `playwright-core`. The SVGs and a hash manifest are committed. The modal fetches and inlines them, and the page's server render fails the production build when a chart's hash doesn't match the manifest. Mermaid and playwright-core are dev dependencies only.
**Alternatives:** Render at build time on Vercel (needs a browser in the build); use `@mermaid-js/mermaid-cli` (bundles Puppeteer and its own Chromium, and renders outside the site's CSS); `<img>` tags instead of inlining (the SVG styles use the page's font variable, which an `<img>` can't see).
**Why:** Removes about 3 MB of client JS. Mermaid sizes labels by measuring text in the DOM, so rendering inside the real site page keeps the output identical: all 27 before/after screenshots matched pixel for pixel. The trade-off is a manual step after editing a chart, which the build check enforces.

## 2026-10-03: Project card title is the button

**Decision:** Each card's `h3` holds a `<button>` with the title; the card `div` keeps the mouse click handler and draws the focus outline with `has-[:focus-visible]`. The button has an explicit `tabIndex={0}`.
**Alternatives:** Keep `role='button'` on the card (hides the `h3` from heading navigation); the "stretched link" pattern (its overlay gets trapped inside the title because the 3D tilt transforms it).
**Why:** Titles are headings again for screen readers, with no visual or click change. `tabIndex={0}` keeps Safari's default Tab behavior the same as before, since Safari skips plain buttons on Tab unless the user turns that on.

## 2026-10-03: AI-trope sweep scope

**Decision:** From the trope list, René applied fixes to most uses of "real", the Mobile Mechanic summary and Housecall Pro line, the Contact line, and dropped the Resume Builder metric tiles. Kept as written: the Hero line, the "rather than" lines in Resume Builder and LinkLeaf, the About "ongoing studies" line, Mobile Mechanic's "signature look", "Hi, I'm René", the Route Planning App "force multiplier" clause and the Skills tooltips. Design elements (cursor glow, 3D tilt cards, terminal Skills, palette) stay.
**Why:** René's call: the design elements are deliberate, and the remaining copy reads fine to him.

