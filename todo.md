# Redesign TODO

Source: `Portfolio Redesign — Design Brief.md` (2026-09-19). Tracked phase-by-phase; check items off as they land. See `status.md` for current phase and blockers.

## Phase 0 — Foundation & Tooling
- [x] Migrate project from JS/JSX to TypeScript
- [x] Upgrade Next.js to current stable (16.3.5)
- [x] Confirm React 19 / Tailwind 4 / shadcn compatibility after upgrade
- [x] Add `motion` (Framer Motion) dependency
- [ ] Add Aceternity UI components (hero/section effects, 3D-tilt card, `CardContainer`/`CardBody`) — deferred to Phase 3/4, copied in alongside the components that use them
- [ ] Re-verify Embla Carousel and react-toastify still needed post-redesign

## Phase 1 — Design System & Tokens
- [x] Add Space Grotesk (headings/UI) + Space Mono (labels/nav/tags) via `next/font`
- [x] Define named color tokens: `background`, `surface`, `foreground`, `muted-foreground`, `accent`, `accent-foreground`, `border` in `globals.css`
- [x] Implement dark-neutral base palette (#121212 bg, #17171a surface, #f2f2f0 text, #b9b9bd muted text)
- [x] **Accent color decided: mint #6EE7B7**
- [x] **Theme scope decided: dark-only** — removed `next-themes`, `theme-provider.tsx`, `theme-toggle.tsx`, and the light/dark toggle UI entirely
- [x] Removed dead `tailwind.config.js` (unused under Tailwind v4's CSS-based config; confirmed no `@config` import ever loaded it)
- [x] Remove old rose/blue/teal/slate palette remnants — done everywhere (nav/chrome in Phase 1; page content converted to tokens while moving it into sections in Phase 2, including a couple of `dark:`-only backgrounds in `Input`/`Textarea`/`EmblaCarousel` that would've rendered as light-gray boxes now that `dark:` never activates)
- [ ] Set base type scale / whitespace rhythm (content-first, no heavy cards/shadows/gradients) — deferred to Phase 3 content-section work

## Phase 2 — Page Structure & Navigation
- [x] Collapse 3-page site (Home/Projects/Contact) into single scrollable one-pager
- [x] Build section shell: hero, about/summary, skills, projects grid, contact
- [x] Sticky top nav with anchor-scroll links
- [x] Underline hover/active effect on nav links (accent green, grows under link) — hover was already there from Phase 1; active state now driven by scroll-spy (`useActiveSection`, IntersectionObserver) instead of route pathname
- [x] Old `/projects` and `/contact` routes redirect to `/#projects`/`/#contact` (307) so old links don't 404
- [x] Removed multi-page-transition infra that no longer applies to a single scrolling page: `LoadingContext`, `RouteChangeSpinner`, the `/spinner` test route, and `NavLink`'s router-push-with-timeout logic (now a plain anchor)
- [x] Deleted `SidebarNav.tsx` (confirmed dead/unused since Phase 0)

## Phase 3 — Content Sections
- [ ] Hero section (Aceternity effect(s) TBD)
- [ ] About/summary section
- [ ] Skills section
- [ ] Contact section

## Note on logo assets
- `public/logo-dark.svg` and `logo-light.svg` both still bake in the old rose accent (`#E11D48`) for a decorative shape. `logo-dark.svg` (light-on-dark wordmark) is now the only one in use. Consider recoloring that accent shape to mint (`#6EE7B7`) during Phase 2/3 polish — not done automatically since it's a visible brand-asset edit, not a code token.

## Phase 4 — Projects Grid & Case Study Modals
- [ ] Build project card grid with 3D tilt-on-hover (Aceternity `CardContainer`/`CardBody`)
- [ ] Card → modal expand via Framer Motion `layoutId`
- [ ] Modal: internal scroll for long content
- [ ] Modal: URL deep-linking (shallow routing or intercepting routes)
- [ ] Modal: focus trap + Escape to close + `aria-modal`
- [ ] Modal: return focus to triggering card on close
- [ ] Populate project lineup:
  - [ ] Resume Auto-Apply Tool (demo) — **decide**: full case study or card + live demo link
  - [ ] LinkLeaf (paused) — architecture-focused case study: diagram, metrics, stack breakdown, no live link
  - [ ] Mobile Mechanic Site (live) — client work card
  - [ ] Weather App (not live) — minimal card, screenshots + stack + short description, no live link, no further build work
  - [ ] Route Planner (demo, mock data) — cached/mock route data, "Demo Mode" note
- [ ] Confirm cut projects stay out (Life Coaching Website, Music Translation App)

## Phase 5 — Signature Interactive Element
- [ ] **Decide** signature element (fiber/network line animation vs. terminal/CLI typing effect vs. electrician/fiber-themed idea) — open question
- [ ] Build and integrate chosen element

## Phase 6 — Mobile & Responsive Pass
- [ ] Design mobile layout (not yet designed — open question)
- [ ] Responsive nav (mobile menu)
- [ ] Responsive projects grid
- [ ] Responsive modal behavior

## Phase 7 — QA & Launch
- [ ] Accessibility pass (focus states, contrast, aria attributes, keyboard nav)
- [ ] Cross-browser check
- [ ] Performance check (animation cost, Aceternity/Framer Motion bundle size)
- [ ] Remove/replace any remaining AI-template tropes (gradient washes, left-border cards, default fonts)
- [ ] Final review against `ky.fyi` / `refact0r.dev/about` references
- [ ] Merge `redesign` → `main` and deploy
