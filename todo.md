# Redesign TODO

Source: `Portfolio Redesign — Design Brief.md` (2026-09-19). Tracked phase-by-phase; check items off as they land. See `status.md` for current phase and blockers.

## Phase 0 — Foundation & Tooling
- [ ] Migrate project from JS/JSX to TypeScript
- [ ] Upgrade Next.js to current stable (16.2.x LTS or 16.3)
- [ ] Confirm React 19 / Tailwind 4 / shadcn compatibility after upgrade
- [ ] Add `motion` (Framer Motion) dependency
- [ ] Add Aceternity UI components (hero/section effects, 3D-tilt card, `CardContainer`/`CardBody`)
- [ ] Re-verify Embla Carousel and react-toastify still needed post-redesign

## Phase 1 — Design System & Tokens
- [ ] Add Space Grotesk (headings/UI) + Space Mono (labels/nav/tags) via `next/font`
- [ ] Define named color tokens: 2-3 background shades, 2-3 text shades, 1-2 accents
- [ ] Implement dark-neutral base palette (#121212 bg, #17171a alt surface, #f2f2f0 primary text, #b9b9bd secondary text)
- [ ] **Decide final accent color** (mint #6EE7B7 default vs. coral/purple/blue) — open question
- [ ] Remove old rose/blue/teal/slate palette remnants
- [ ] Set base type scale / whitespace rhythm (content-first, no heavy cards/shadows/gradients)

## Phase 2 — Page Structure & Navigation
- [ ] Collapse 3-page site (Home/Projects/Contact) into single scrollable one-pager
- [ ] Build section shell: hero, about/summary, skills, projects grid, contact
- [ ] Sticky top nav with anchor-scroll links
- [ ] Underline hover/active effect on nav links (accent green, grows under link)

## Phase 3 — Content Sections
- [ ] Hero section (Aceternity effect(s) TBD)
- [ ] About/summary section
- [ ] Skills section
- [ ] Contact section

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
