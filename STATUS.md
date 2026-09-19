# Redesign Status

Last updated: 2026-09-19
Branch: `redesign`
Source brief: `~/Desktop/Portfolio Redesign - Design Brief.md`

## Current phase
**Phase 4 — Projects Grid & Case Study Modals** (mechanics done; 2 of 5 projects have real content, 3 still placeholder)

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

## Placeholder content — still needs real data
- **Resume Auto-Apply Tool**: placeholder `#` demo/code links, brief-derived description, no images.
- **LinkLeaf**: placeholder `#` code link, no demo link (intentional per brief), `architectureNote` is a literal "coming soon" placeholder string, no images.
- **Weather App**: placeholder `#` code link, intentionally no demo link (per brief), no images.

To fill these in: edit `src/data/projects.ts` directly — real URLs/images/metrics flow through the grid and modal automatically, no component changes needed. Compress any provided screenshots first (see above).

## Up next
- Get real URLs, screenshots, and refined copy for the 3 remaining placeholder projects, or continue to later phases and circle back.
- Phase 5: signature interactive element (open decision — see below).
- Phase 6: mobile layout pass (explicitly on hold per user request as of this writing — do not start without being asked).
- Phase 7: QA/launch.

## Open decisions (blocking downstream phases)
- **Signature interactive element**: fiber/network line animation vs. terminal/CLI typing effect vs. other — blocks Phase 5. Note: the Skills terminal effect might inform or double as this choice, or a different section might get its own distinct treatment — still open either way.
- **Mobile layout**: not yet designed — blocks Phase 6, and Phase 6 itself is on hold.

## Notes
- Weather App and Route Planner API issues are explicitly out of scope for this redesign — present as-is, no further build work on those apps themselves.
- Cut from lineup: Life Coaching Website, Music Translation App (latter kept only as interview talking point) — both fully removed from `Projects.tsx`/`projects.ts`.
- `public/logo-dark.svg` recolored to mint (`#6EE7B7`, was rose `#E11D48`) during Hero iterations; `logo-light.svg` remains unused/dead (dark-only theme).
- `DotBackground` (`ui/dot-background.tsx`) and `bg-dot-pattern` CSS are unused but left in the codebase — tried on Hero, removed, kept in case wanted elsewhere.
