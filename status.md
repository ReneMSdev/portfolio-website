# Redesign Status

Last updated: 2026-09-19
Branch: `redesign`
Source brief: `~/Desktop/Portfolio Redesign - Design Brief.md`

## Current phase
**Phase 3 — Content Sections** (done, except Projects — deliberately deferred to Phase 4). Plus a round of user-requested Hero/logo adjustments ahead of Phase 4.

## Post-Phase-3 adjustments (user request, before starting Phase 4)
- `public/logo-dark.svg`: recolored the wordmark from the old rose accent (`#E11D48`) to mint (`#6EE7B7`); kept the light `#F8FAFC` bracket/chevron shapes as-is. `logo-light.svg` untouched (still unused/dead — dark-only theme means only `logo-dark.svg` is ever rendered).
- `Hero.tsx`: removed the profile photo entirely (user wants to try an Aceternity ASCII-art image treatment later instead) and collapsed the eyebrow + multi-line name into a single "Hi, I'm René" heading, dropping "Maxey-Salomone". Layout simplified from a two-column (photo + text) row to a single centered column since there's no image to lay out around.

## Done
- Old branches (`carousel`, `colors`, `navbar`, `ui-update`) deleted locally and on origin; local `main` fast-forwarded to match origin.
- `redesign` branch created off `main` and pushed to origin.
- **Phase 0**: Next.js 15.3.8 → 16.3.5, React 19.3.0, full TypeScript migration, `motion` installed.
- **Phase 1**: Accent mint #6EE7B7, dark-only theme, new token system in `globals.css`, Space Grotesk/Space Mono.
- **Phase 2**: Collapsed 3 routes into one scrollable page (`Hero`/`About`/`Skills`/`Projects`/`Contact` sections), anchor-scroll nav with `useActiveSection` scroll-spy, removed dead multi-page-transition infra.
- **Phase 3**:
  - Added `MotionProvider` (`MotionConfig reducedMotion="user"`) wrapping the app in `layout.tsx` — first real use of the `motion` dependency installed back in Phase 0. All animation across the site now automatically disables for users with OS-level reduced-motion set, without each component having to handle it individually.
  - `Hero.tsx`: staggered fade/slide-up entrance (eyebrow → name → role → photo). Kept intentionally restrained — no gradients, particles, or flashy backgrounds — per the brief's "avoid AI-template tropes" note. This is separate from the still-undecided Phase 5 "signature interactive element."
  - `About.tsx`: scroll-triggered fade-in (`whileInView`), restyled the "Read more" trigger to match the mono/uppercase eyebrow-label convention used across sections, `py-24` rhythm.
  - `Skills.tsx`: staggered grid-item reveal on scroll into view (capped stagger delay via `index % 8` so a 23-item grid doesn't produce a multi-second cascade), `py-24` rhythm.
  - `Contact.tsx`: scroll-triggered fade-in, `py-24` rhythm. Removed the shadcn `Card`/`CardContent` wrapper around the form — grepped and confirmed it was used nowhere else in the app and had already been stripped of all visual styling (`border-none shadow-none bg-transparent`) back in earlier phases, so it was a pure no-op wrapper. Deleted `src/components/ui/card.tsx` entirely as dead code.
  - `Projects.tsx`: intentionally left alone beyond a `py-24` rhythm bump — it's getting a full rebuild in Phase 4 (tilt cards, modals, new 5-project lineup), so investing in its current placeholder content/motion now would be replaced almost immediately.
  - Verified: `tsc --noEmit` clean, `npm run build` succeeds, lint unchanged (still just the pre-existing `EmblaCarousel` issue flagged for Phase 4). Did not run my own dev server — user has one running locally to watch changes live.

## Known pre-existing lint debt (unchanged since Phase 1, deferred to Phase 4)
- `react-hooks/set-state-in-effect` + `@next/next/no-img-element` in `EmblaCarousel` — candidate for replacement by Aceternity tilt cards.

## Up next
- Start Phase 4: Projects Grid & Case Study Modals. This is the biggest remaining phase — Aceternity `CardContainer`/`CardBody` 3D-tilt cards, Framer Motion `layoutId` card-to-modal expansion, URL deep-linking, focus trap/a11y, and swapping in the brief's actual 5-project lineup (Resume Auto-Apply Tool, LinkLeaf, Mobile Mechanic Site, Weather App, Route Planner) in place of the current 3-project placeholder (Route Planner, Life Coaching, Music Translation).
- The "Resume Auto-Apply Tool depth" open decision (full case study vs. card + demo link) blocks part of this phase's content — will need an answer before writing that project's copy.

## Open decisions (blocking downstream phases)
- **Signature interactive element**: fiber/network line animation vs. terminal/CLI typing effect vs. other — blocks Phase 5.
- **Resume Auto-Apply Tool depth**: full case study (like LinkLeaf) vs. card + live demo link — blocks Phase 4 content.
- **Mobile layout**: not yet designed — blocks Phase 6.

## Notes
- Weather App and Route Planner API issues are explicitly out of scope for this redesign — present as-is, no further build work on those apps themselves.
- Cut from lineup: Life Coaching Website, Music Translation App (latter kept only as interview talking point). Both are still in `Projects.tsx`'s Phase 2 structural placeholder — Phase 4 swaps in the brief's actual lineup.
- `public/logo-dark.svg`/`logo-light.svg` still bake in the old rose accent color for a decorative shape — flagged for a possible recolor to mint during Phase 2/3 polish, not done automatically since it's a visible brand-asset edit.
