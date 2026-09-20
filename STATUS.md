# Redesign Status

Last updated: 2026-09-20 (later session)
Branch: `redesign`
Source brief: `~/Desktop/Portfolio Redesign - Design Brief.md`

## Current phase
**Phase 5 — Signature Interactive Element** (in progress — fiber/circuit line art, see below). Phase 4 mechanics are done; 2 of 5 projects have real content, 3 still placeholder (on hold, see Up next).

## Done, by phase
- Old branches deleted, `redesign` branch created off `main`.
- **Phase 0**: Next.js 15.3.8 → 16.3.5, React 19.3.0, full TypeScript migration, `motion` installed.
- **Phase 1**: Accent mint `#6EE7B7`, dark-only theme (removed `next-themes`/toggle entirely), new named token system in `globals.css`, Space Grotesk/Space Mono fonts.
- **Phase 2**: Collapsed the 3-route site into one scrollable page (`Hero`/`About`/`Skills`/`Projects`/`Contact` in `src/components/sections/`), anchor-scroll nav, removed dead multi-page-transition infra (`LoadingContext`, `RouteChangeSpinner`, `/spinner` route).
- **Phase 3**: Motion entrance/scroll animations on Hero/About/Skills/Contact via a `MotionProvider` (`MotionConfig reducedMotion="user"`) at the root layout.
- **Phase 4**: 3D tilt project grid (`src/components/ui/3d-card.tsx`, adapted from Aceternity's "3D Card Effect") + deep-linkable case-study modals (`src/components/ProjectModal.tsx`, shared `layoutId` expand animation, hand-rolled focus trap, `?project=slug` URL sync via `router.replace`). Typed `Project` data model at `src/data/projects.ts` with optional fields (`metrics`, `architectureNote`, `lessonsLearned`) so a project can start minimal and grow into a full case study later without restructuring the modal. Lineup swapped to the brief's 5 projects; `EmblaCarousel` and `embla-carousel-react` deleted as dead code once the grid replaced them.

Full detail on any of the above is in git log (commit messages are written narratively, one per logical change) — this file tracks current state, not history.

## Since Phase 4 landed: user-directed design iteration
A long back-and-forth polish pass, roughly in order:
- **Hero**: copy iterated several times (availability line added then removed, full name tried then reverted to "Hi, I'm René", location added), profile photo removed then reincorporated in a two-column layout, a dot-background effect (Aceternity-style, `src/components/ui/dot-background.tsx` + `.bg-dot-pattern` in `globals.css`) tried then removed — both left in the codebase unused in case wanted later.
- **About**: fully redesigned to match a user-supplied mockup — full-bleed `bg-surface` band with `border-y`, two-column layout (bio paragraph + a 4-item fact list with a divider). New bio content (WGU CS grad 2024, solo technical founder, 8+ yrs fiber/telecom field work, TDLR Apprentice Electrician License, Founder of Salo Labs LLC). Added a `body` color token (`#cfcfd2`) for this longer-form copy — a third text shade between `foreground` and `muted-foreground`. The old expand/collapse bio mechanic was dropped entirely; `ui/collapsible.tsx` and `@radix-ui/react-collapsible` deleted as dead code.
- **Section headers standardized**: all eyebrow labels (Hero/About/Skills/Projects/Contact) are lowercase now (not uppercase), sized `text-3xl font-semibold` (started at `text-sm`, went through `text-base`/`text-lg` before landing here), `tracking-wider` dropped since it stopped suiting text at this size.
- **Nav**: added a Skills link; desktop `Navbar` restructured into a 3-column grid (logo / centered section links / Resume+Github) so the section links are genuinely centered; Resume/Github are hover-highlight only, no underline, separated from the anchor-scroll links. Fixed a real scroll-spy bug — `useActiveSection` used to pick whichever section had the largest visible area via `IntersectionObserver`, which let Contact's `min-h-screen` height dominate and stay "active" while scrolling back up; replaced with a scroll-position threshold check (direction-agnostic).
- **Skills redesigned as a terminal simulation** (by request): a `TerminalWindow` chrome component (`src/components/ui/terminal.tsx`) runs 4 sequential typed commands — `npm install languages`, `frameworks`, `cloud-infra`, `tools` — each typing out character-by-character then revealing its skill list as staggered checkmark lines, before the next command starts. Later added a 5th group, `npm install ai-tooling` (OpenAI API, Claude API). The old icon-grid version is preserved, unused, at `Skills.legacy.tsx`. Current groups:
  - `languages`: HTML, CSS, JavaScript, TypeScript, Python
  - `frameworks`: React, Next.js, Node.js, FastAPI, Tailwind CSS, React Native, Flutter
  - `cloud-infra`: PostgreSQL, AWS, GCP, Firebase, Vercel
  - `tools`: Git, GitHub
  - `ai-tooling`: OpenAI API, Claude API
  (Removed along the way: MySQL, Linux, Adobe CC, Figma, Supabase, Java, Swift, Netlify — tailored to the user's target roles.)
- **Project modal**: widened `max-w-2xl` → `max-w-4xl` (went as far as `max-w-5xl` before settling slightly slimmer). Scrollbars dark-themed site-wide (not just the modal — the default light system scrollbar looked equally wrong on the main page), via `scrollbar-color`/`::-webkit-scrollbar` rules in `globals.css`.
- **Mobile Mechanic Site**: now has real content — live URL `https://www.atxreliablewrenching.com/` and a homepage screenshot. The user-provided screenshot (6.4MB PNG) was compressed via macOS `sips` (resized to 1600px wide, re-encoded as JPEG quality 80) to 469KB with no visible quality loss, saved as `public/img/mobile-mechanic/mobile-mechanic-1.jpg`. **Standing preference saved to memory**: compress/resize any image the user hands over before using it, automatically, without being asked.
- **Skills hover cards**: hovering (or focusing/tapping) a skill name in the terminal now shows a floating info card with a one-line description of that technology — dark navy (`#0d1b30`) background with a steel-blue border, deliberately contrasting the rest of the terminal chrome. The first row of the first group (HTML/CSS/JavaScript) opens its card downward instead of upward since it sits too close to the terminal window's `overflow-hidden` top edge and would otherwise clip. Added GitHub Copilot to the `ai-tooling` group alongside OpenAI/Claude API.
- **Skills "Card Hover Effect"**: each skill item also gets a soft mint background glow on hover (Aceternity-style shared `layoutId` highlight, `bg-accent/10`) that smoothly slides between items as the cursor moves across a row; scoped to only the icon+name (the `✓` checkmark is excluded from the highlight area).
- **Cursor glow**: a very subtle ambient radial-gradient glow (`src/components/ui/cursor-glow.tsx`) follows the mouse across the whole page — fixed, `-z-10`, desktop-only (`hidden md:block`), respects `prefers-reduced-motion`. Iterated on color/opacity a few times; landed on blue (`rgba(96, 165, 250, 0.05)`), 900px radius, after trying mint and purple at higher opacity first.
- **Project card glow**: 3D tilt cards in the Projects grid get a soft mint border/shadow glow on hover (pure CSS `box-shadow` + `border-color` transition on `CardBody`, no extra state/DOM).
- **Contact section rebuilt**: removed the contact form (was POSTing to web3forms) and the QR code — both were redundant with the plain email link. Restyled to match the rest of the site (`py-20`, left-aligned mint eyebrow, plain link list) instead of the old two-column form/QR box layout. Phone number updated to `512-884-3571`. The email link now also copies the address to the clipboard on click (with a brief "✓ Copied" confirmation) as a fallback for visitors with no default mail client configured, since a bare `mailto:` link does nothing visible in that case. Deleted now-dead code freed up by the form removal: `ui/button.tsx`, `ui/input.tsx`, `ui/textarea.tsx`, `public/img/qrcode.png`, `.env.local` (only held the web3forms key), and the `react-toastify`/`class-variance-authority`/`@radix-ui/react-slot` dependencies.
- **Section spacing standardized**: all sections after Hero (About, Skills, Projects, Contact) now use `py-20` consistently (Skills/Projects/Contact were `py-24`, felt too far apart).
- **Project modal open animation smoothed**: it felt laggy on open. Root causes were `backdrop-blur-sm` animating on a fullscreen fixed overlay (expensive to composite every frame) and Motion's default spring transition on the large card→modal size delta. Fixed by dropping the blur (`bg-background/90` instead), giving both the overlay fade and the shared `layoutId` transition explicit fast tweens (`0.2s` / `0.25s ease-out`), and resetting the 3D tilt's `rotateX/rotateY` to neutral on click (`onClickCapture` in `3d-card.tsx`) so the FLIP animation doesn't start from a skewed transform.
- **Project card thumbnail fix**: the Mobile Mechanic grid thumbnail sometimes failed to paint on first load (only fixed by opening DevTools) — a Chromium quirk where a lazy-loaded `next/image` inside a CSS-3D-transformed element (`CardItem`'s `translateZ`) can finish loading without the compositing layer repainting. Fixed by adding `priority` to the grid thumbnail `Image` so it loads eagerly instead of lazily; negligible cost since only 2 of 5 cards currently have images.

## Phase 5 — signature interactive element: fiber/circuit line art
Decided direction: a fusion-splice metaphor (two fiber strands meet and fuse with a glow, echoing your fiber/telecom background), then circuit-style traces spring outward from that point — tying your fiber-optic field work to the software side visually. Built as an explicitly modular, swappable system so options could be tried side by side without losing any of them:
- **`src/components/hero-effects/`** — Hero's background line art. `FusionIntro.tsx` holds the **locked/approved** fusion behavior (two fibers drop from the nav gaps either side of the link cluster, bend toward each other, meet, fuse with a glow, then fade away entirely) — shared by any Hero variant. `FusionSplice.tsx` (currently active) plays that intro, then draws circuit traces outward from the splice point; it has two **locked** branch presets switched by `useHeroLayoutPreset` (a `1024px`-width hook) — `wide` for full desktop layout, `compact` (asymmetric, routes behind the photo and underneath the text box) for squeezed/stacked layouts, so the lines never cross the actual text at any viewport width. `FiberLines.tsx` is an earlier, simpler variant (no fusion intro) kept intact and selectable via `ACTIVE_HERO_EFFECT` or `?heroEffect=fiber-lines`. All variants respect `prefers-reduced-motion`.
- **`src/components/section-lines/`** + **`src/hooks/useMeasuredViewBox.ts`** — the mechanism for extending line art down the rest of the page, agreed approach: independent per-section SVGs (not one giant page-spanning SVG) triggered by scroll, each measuring its own live height via `ResizeObserver` against a shared fixed viewBox width (`SECTION_VIEWBOX_WIDTH = 620`, matching Hero) so a line at a given x-anchor (`anchors.ts`: `LEFT_EDGE_X`/`RIGHT_EDGE_X`) lands at the same screen pixel in every section — this is what makes independently-built per-section segments hand off convincingly instead of just coincidentally lining up. Per-section rule of thumb agreed with the user: sections with an opaque local element protecting their text (Skills' terminal window, Projects' cards) can route freely behind it; sections without one (Contact's bare link list) need the lines to actually avoid the text; section header labels are a hard no-go everywhere.
  - **Skills**: wired up (`SkillsLines.tsx`) — two dynamic multi-turn traces that clear only the "Skills" header (`y<70`) then route freely since the terminal window occludes everything else. Required restructuring `Skills.tsx` so the `<section>` itself is full-bleed (width constraint moved to an inner wrapper, matching Hero/About) — same visual layout, needed for the shared anchors to measure correctly. The lines don't draw until the terminal's own typing sequence fully finishes (`outputShownFor === skillGroups.length - 1`), not on scroll-into-view.
  - **About**: tried, then explicitly rejected by the user ("about section should not have a line") — reverted, `AboutLines.tsx` deleted. Nothing else about the mechanism changed.
  - **Projects, Contact**: not yet wired up.
- Hero's fusion intro doesn't yet terminate at a clean shared edge/anchor (its branches end at scattered interior points), so there's no literal visual seam between Hero and Skills yet — extending one Hero branch down to the bottom edge at a shared anchor would be a small additive follow-up, not a rearchitecture.

## Placeholder content — still needs real data
- **Resume Auto-Apply Tool**: placeholder `#` demo/code links, brief-derived description, no images.
- **LinkLeaf**: placeholder `#` code link, no demo link (intentional per brief), `architectureNote` is a literal "coming soon" placeholder string, no images.
- **Weather App**: placeholder `#` code link, intentionally no demo link (per brief), no images.

To fill these in: edit `src/data/projects.ts` directly — real URLs/images/metrics flow through the grid and modal automatically, no component changes needed. Compress any provided screenshots first (see above).

## Up next
- Continue Phase 5: wire up Projects and Contact section-lines (Contact needs actual text-avoidance, not just occlusion-based routing), and consider the small Hero→Skills seam follow-up noted above.
- Placeholder projects (Resume Auto-Apply Tool, LinkLeaf, Weather App) explicitly deprioritized by the user for now in favor of Phase 5 — real URLs/screenshots/copy still needed whenever picked back up.
- Phase 6: mobile layout pass (explicitly on hold per user request — do not start without being asked).
- Phase 7: QA/launch.

## Open decisions (blocking downstream phases)
- **Mobile layout**: not yet designed — blocks Phase 6, and Phase 6 itself is on hold.

## Notes
- Weather App and Route Planner API issues are explicitly out of scope for this redesign — present as-is, no further build work on those apps themselves.
- Cut from lineup: Life Coaching Website, Music Translation App (latter kept only as interview talking point) — both fully removed from `Projects.tsx`/`projects.ts`.
- `public/logo-dark.svg` recolored to mint (`#6EE7B7`, was rose `#E11D48`) during Hero iterations; `logo-light.svg` remains unused/dead (dark-only theme).
- `DotBackground` (`ui/dot-background.tsx`) and `bg-dot-pattern` CSS are unused but left in the codebase — tried on Hero, removed, kept in case wanted elsewhere.
