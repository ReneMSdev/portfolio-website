# Redesign TODO

Source: `Portfolio Redesign — Design Brief.md` (2026-09-19). Tracked phase-by-phase; check items off as they land. See `STATUS.md` for current phase and blockers.

## Phase 0 — Foundation & Tooling
- [x] Migrate project from JS/JSX to TypeScript
- [x] Upgrade Next.js to current stable (16.3.5)
- [x] Confirm React 19 / Tailwind 4 / shadcn compatibility after upgrade
- [x] Add `motion` (Framer Motion) dependency
- [ ] Add Aceternity UI components (hero/section effects, 3D-tilt card, `CardContainer`/`CardBody`) — deferred to Phase 3/4, copied in alongside the components that use them
- [x] Re-verify Embla Carousel and react-toastify still needed post-redesign — both removed: Embla in Phase 4 (grid replaced the carousel), react-toastify when the Contact form was removed post-Phase-4 (see STATUS.md)

## Phase 1 — Design System & Tokens
- [x] Add Space Grotesk (headings/UI) + Space Mono (labels/nav/tags) via `next/font`
- [x] Define named color tokens: `background`, `surface`, `foreground`, `muted-foreground`, `accent`, `accent-foreground`, `border` in `globals.css`
- [x] Implement dark-neutral base palette (#121212 bg, #17171a surface, #f2f2f0 text, #b9b9bd muted text)
- [x] **Accent color decided: mint #6EE7B7**
- [x] **Theme scope decided: dark-only** — removed `next-themes`, `theme-provider.tsx`, `theme-toggle.tsx`, and the light/dark toggle UI entirely
- [x] Removed dead `tailwind.config.js` (unused under Tailwind v4's CSS-based config; confirmed no `@config` import ever loaded it)
- [x] Remove old rose/blue/teal/slate palette remnants — done everywhere (nav/chrome in Phase 1; page content converted to tokens while moving it into sections in Phase 2, including a couple of `dark:`-only backgrounds in `Input`/`Textarea`/`EmblaCarousel` that would've rendered as light-gray boxes now that `dark:` never activates)
- [x] Set base type scale / whitespace rhythm (content-first, no heavy cards/shadows/gradients) — landed via the section-header standardization and the `py-20` spacing pass across all sections (see STATUS.md)

## Phase 2 — Page Structure & Navigation
- [x] Collapse 3-page site (Home/Projects/Contact) into single scrollable one-pager
- [x] Build section shell: hero, about/summary, skills, projects grid, contact
- [x] Sticky top nav with anchor-scroll links
- [x] Underline hover/active effect on nav links (accent green, grows under link) — hover was already there from Phase 1; active state now driven by scroll-spy (`useActiveSection`, IntersectionObserver) instead of route pathname
- [x] Old `/projects` and `/contact` routes redirect to `/#projects`/`/#contact` (307) so old links don't 404
- [x] Removed multi-page-transition infra that no longer applies to a single scrolling page: `LoadingContext`, `RouteChangeSpinner`, the `/spinner` test route, and `NavLink`'s router-push-with-timeout logic (now a plain anchor)
- [x] Deleted `SidebarNav.tsx` (confirmed dead/unused since Phase 0)

## Phase 3 — Content Sections
- [x] Hero section — staggered fade/slide-up entrance via `motion` (Framer Motion) on the eyebrow label, name, role, and photo. Kept deliberately restrained (no gradients/particles) per the brief's "avoid AI-template tropes" — the flashier signature effect is still Phase 5's separate open decision, not this.
- [x] About/summary section — scroll-triggered fade-in (`whileInView`), refined the "Read more" trigger to the mono/uppercase label style used elsewhere, consistent `py-24` rhythm.
- [x] Skills section — staggered grid reveal on scroll into view, consistent `py-24` rhythm. *(Superseded later by the terminal-simulation redesign — see the post-Phase-4 adjustments in STATUS.md. The original icon-grid version is preserved, unused, at `src/components/sections/Skills.legacy.tsx`.)*
- [x] Contact section — scroll-triggered fade-in, removed the unused shadcn `Card`/`CardContent` wrapper (visually a no-op after Phase 1/2's `border-none shadow-none bg-transparent`, and used nowhere else — deleted `ui/card.tsx` entirely), consistent spacing rhythm.
- [x] Added `MotionProvider` (`MotionConfig reducedMotion="user"`) at the root layout so all current and future `motion` usage automatically respects the OS-level reduced-motion preference.
- [x] Projects section — deliberately left as structural placeholder from Phase 2; superseded by Phase 4's tilt cards, modals, and new project lineup.

## Note on logo assets
- `public/logo-dark.svg` and `logo-light.svg` both still bake in the old rose accent (`#E11D48`) for a decorative shape. `logo-dark.svg` (light-on-dark wordmark) is now the only one in use. Consider recoloring that accent shape to mint (`#6EE7B7`) during Phase 2/3 polish — not done automatically since it's a visible brand-asset edit, not a code token.

## Phase 4 — Projects Grid & Case Study Modals
- [x] Build project card grid with 3D tilt-on-hover (`src/components/ui/3d-card.tsx` — `CardContainer`/`CardBody`/`CardItem`, adapted from Aceternity's "3D Card Effect")
- [x] Card → modal expand via Framer Motion `layoutId` (`project-card-{slug}` shared between the grid card and `ProjectModal`)
- [x] Modal: internal scroll for long content (`max-h-[85vh] overflow-y-auto`)
- [x] Modal: URL deep-linking — implemented as a `?project=slug` query param synced via `router.replace(..., { scroll: false })`, read on mount via `useSearchParams`. Chose this over intercepting routes since the site has no per-project route segments (single-page architecture from Phase 2); this is the "shallow routing" alternative the brief explicitly allows.
- [x] Modal: focus trap + Escape to close + `aria-modal` (`ProjectModal.tsx`, hand-rolled — no new dependency)
- [x] Modal: return focus to triggering card on close (`triggerRef`)
- [x] **Resume Auto-Apply Tool depth decided**: simple card + demo link for now; data model (`src/data/projects.ts`) supports optional `architectureNote`/`lessonsLearned`/`metrics` fields so it can grow into a full case study later without restructuring
- [x] Project lineup swapped to the brief's 5 projects (Resume Auto-Apply Tool, LinkLeaf, Mobile Mechanic Site, Weather App, Route Planner) — **placeholder content**, see STATUS.md for what's real (Route Planner, Mobile Mechanic Site) vs. placeholder (the other 3: URLs are `#`, no screenshots yet)
- [x] Cut projects (Life Coaching Website, Music Translation App) removed from the lineup
- [x] Removed `EmblaCarousel` (dead code once the new grid replaced it) and its `embla-carousel-react` dependency

## Note on Phase 4 placeholder content
Route Planner and Mobile Mechanic Site have real URLs/screenshots. Resume Auto-Apply Tool, LinkLeaf, and Weather App still have placeholder `#` links, no images, and brief-derived copy. Update `src/data/projects.ts` with real content when ready — the grid/modal will pick it up automatically (LinkLeaf's `architectureNote` and any project's optional `metrics`/`lessonsLearned` render conditionally).

## Phase 5 — Signature Interactive Element
- [x] **Decide** signature element — fiber/circuit line art tying the fiber/telecom background to the software side
- [x] ~~Build Hero's fusion intro + circuit routing (`hero-effects/`)~~ / ~~per-section extension mechanism (`section-lines/`)~~ — this hand-authored, per-section approach was built and worked, but was replaced entirely: pivoted to a single algorithmically-generated pattern spanning the whole page (`src/components/generative-lines/`), since hand-tuning coordinates per section/breakpoint didn't scale. The hand-authored version is preserved, unused, at `src/components/page-lines/`.
- [x] Wire up the whole page (Hero through Contact) — the generative approach covers all sections automatically as one continuous pattern; no per-section wiring needed. Exposed text is protected via a frosted-glass backdrop (`ui/text-blur-backdrop.tsx`) instead of the lines needing to avoid it.
- [x] Mobile coverage — fixed a gap where the fixed-aspect-ratio canvas only reached the Hero section on narrow viewports; mobile now uses a taller generation canvas so the pattern reaches the bottom of the page.

## Phase 6 — Mobile & Responsive Pass
- [x] Mobile nav (`MobileMenu.tsx` — hamburger + slide-in panel)
- [x] Responsive projects grid (`grid-cols-1 md:grid-cols-2`)
- [x] Signature line art extended to mobile (see Phase 5)
- [ ] Re-verify project modal responsiveness at a narrow viewport (uses the same responsive patterns as the rest of the site; built but not independently re-confirmed live this session)

## Phase 7 — QA & Launch
- [ ] Accessibility pass (focus states, contrast, aria attributes, keyboard nav) — **priority when this phase picks back up**
- [ ] Cross-browser check
- [ ] Performance check (animation cost, Aceternity/Framer Motion bundle size)
- [ ] Remove/replace any remaining AI-template tropes (gradient washes, left-border cards, default fonts)
- [x] ~~Final review against `ky.fyi` / `refact0r.dev/about` references~~ — dropped; the design has landed somewhere distinct enough from the original references that a comparison isn't useful anymore
- [x] ~~Merge `redesign` → `main` and deploy~~ — `redesign` has been merged into `main` throughout; day-to-day work now happens on `working`
