# Redesign Status

Last updated: 2026-09-19
Branch: `redesign`
Source brief: `~/Desktop/Portfolio Redesign - Design Brief.md`

## Current phase
**Phase 4 — Projects Grid & Case Study Modals** (mechanics done; content is placeholder except Route Planner)

## Done
- Old branches deleted, `redesign` branch created off `main`.
- **Phase 0**: Next.js 16.3.5, React 19.3.0, full TypeScript migration, `motion` installed.
- **Phase 1**: Accent mint #6EE7B7, dark-only theme, new token system, Space Grotesk/Space Mono.
- **Phase 2**: Collapsed to one scrollable page with anchor-scroll nav + scroll-spy.
- **Phase 3**: Motion entrance/scroll animations on Hero/About/Skills/Contact.
- **Hero iterations** (user-directed, several rounds after Phase 3): copy changed to "AVAILABLE FOR FULL-TIME ROLES" / name / "Full-Stack Developer — Austin, TX" / tagline, name reverted to "Hi, I'm René" per user request, dot-background tried then removed, profile photo removed then reincorporated in a two-column layout (photo right, text left, stacks on mobile). `DotBackground` component and `bg-dot-pattern` CSS utility remain in the codebase unused, in case wanted elsewhere later.
- **Phase 4**:
  - Resolved both open decisions needed to start: Resume Auto-Apply Tool ships as a simple card + demo link for now (not a deep case study); build the grid/modal mechanics with placeholder content first, fill in real project details after.
  - `src/data/projects.ts`: typed `Project` data model with optional fields (`images`, `demoUrl`, `demoNote`, `codeUrl`, `metrics`, `architectureNote`, `lessonsLearned`) so a project can start minimal (Resume Auto-Apply Tool today) and grow into a full case study (like LinkLeaf) later without restructuring the modal component — sections render conditionally based on which fields are present.
  - `src/components/ui/3d-card.tsx`: Aceternity's "3D Card Effect" (`CardContainer`/`CardBody`/`CardItem`) adapted to TypeScript — mouse-position-driven CSS 3D tilt via direct ref/style manipulation (not React state per frame, for performance).
  - `src/components/sections/Projects.tsx`: renders the 5-project grid as tilt cards (keyboard-accessible: `role="button"`, `tabIndex`, Enter/Space activation), manages which project's modal is open, and syncs that to a `?project=slug` URL query param via `router.replace(..., { scroll: false })` for deep-linking — read back via `useSearchParams` on mount so a shared/reloaded link reopens the right modal. This is the "shallow routing" alternative to intercepting routes the brief allows; intercepting routes didn't fit since the site has no per-project route segments after Phase 2's single-page collapse.
  - `src/components/ProjectModal.tsx`: shares a Framer Motion `layoutId` (`project-card-{slug}`) with its grid card for the expand animation; hand-rolled focus trap (Tab cycling, Escape to close, focus returns to the triggering card on close) and body-scroll lock — no new dependency added for this. `max-h-[85vh] overflow-y-auto` for long content. Renders description, optional metrics/architecture/lessons-learned sections, stack list, and demo/code links, all conditionally based on what data a given project has.
  - `page.tsx`: wrapped `<Projects />` in `<Suspense>` since it's a client component using `useSearchParams` (Next.js requirement to avoid de-opting the whole page from static rendering).
  - Both grid-card and modal `<img>` usages converted to `next/image` with `fill` + `sizes` inside sized relative containers (no fixed width/height available per-image, since project screenshots vary).
  - **Deleted `EmblaCarousel.tsx` and the `embla-carousel-react` dependency** — fully dead code once the new grid replaced the old carousel-per-project-card pattern (flagged as a likely casualty back in Phase 0). This was the last remaining pre-existing lint issue; **lint is now fully clean (0 errors, 0 warnings)** for the first time this session.
  - Verified: `tsc --noEmit` clean, `npm run build` succeeds, lint clean.

## Placeholder content — needs real data before this phase is "done" content-wise
Only **Route Planner** has real URLs/screenshots (reused from the old site: `route-planner-nextjs.vercel.app`, its GitHub repo, and the two existing screenshot images). The other 4 projects in `src/data/projects.ts` currently have:
- **Resume Auto-Apply Tool**: placeholder `#` demo/code links, brief-derived description, no images.
- **LinkLeaf**: placeholder `#` code link, no demo link (intentional per brief), `architectureNote` is a literal "coming soon" placeholder string (no real diagram), no images.
- **Mobile Mechanic Site**: placeholder `#` demo link, no images.
- **Weather App**: placeholder `#` code link, intentionally no demo link (per brief), no images.

To fill these in: edit `src/data/projects.ts` directly — real URLs/images/metrics will flow through the grid and modal automatically, no component changes needed.

## Post-Phase-4 adjustments (user request)
- **About section redesigned** to match a user-supplied mockup: full-bleed `bg-surface` band with `border-y border-border`, two-column layout (bio paragraph left, a 4-item fact list right with a left border divider), specific typography (17px/1.7 line-height body copy, 14px mono fact list). Added a new `body` color token (`#cfcfd2`) for this longer-form paragraph copy — a third text shade between `foreground` and `muted-foreground`, which the brief's "2-3 text shades" allowance anticipated. New bio content: CS graduate (WGU 2024), solo technical founder, 8+ years fiber/telecom field work, TDLR Apprentice Electrician License, Founder of Salo Labs LLC.
- Removed the old "Read more" collapsible bio entirely — the new mockup is a fixed two-column block with no expand/collapse. This made `ui/collapsible.tsx` dead code (grepped, confirmed no other usage) — deleted it and the `@radix-ui/react-collapsible` dependency.
- **Standardized and enlarged the section eyebrow labels**: About/Skills/Projects labels bumped from `text-sm` (14px) to `text-base` (16px), by explicit request ("headers should be a bit bigger... standardize"). Hero's label and Contact left untouched — Contact is getting a full separate redesign later, out of scope for this pass.

## Up next
- Get real URLs, screenshots, and refined copy for the 4 placeholder projects from the user, or continue to later phases and circle back.
- Phase 5: signature interactive element (still an open decision — fiber/network animation vs. terminal/CLI typing effect vs. other).
- Phase 6: mobile layout pass (not yet designed).
- Phase 7: QA/launch.

## Open decisions (blocking downstream phases)
- **Signature interactive element**: fiber/network line animation vs. terminal/CLI typing effect vs. other — blocks Phase 5.
- **Mobile layout**: not yet designed — blocks Phase 6.

## Notes
- Weather App and Route Planner API issues are explicitly out of scope for this redesign — present as-is, no further build work on those apps themselves.
- Cut from lineup: Life Coaching Website, Music Translation App (latter kept only as interview talking point) — both fully removed from `Projects.tsx`/`projects.ts` now.
- `public/logo-dark.svg` recolored to mint already (done during Hero iterations); `logo-light.svg` remains unused/dead (dark-only theme).
