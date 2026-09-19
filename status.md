# Redesign Status

Last updated: 2026-09-19
Branch: `redesign`
Source brief: `~/Desktop/Portfolio Redesign - Design Brief.md`

## Current phase
**Phase 2 — Page Structure & Navigation** (done)

## Done
- Old branches (`carousel`, `colors`, `navbar`, `ui-update`) deleted locally and on origin; local `main` fast-forwarded to match origin.
- `redesign` branch created off `main` and pushed to origin.
- **Phase 0**: Upgraded Next.js 15.3.8 → 16.3.5 (React 19.3.0). Migrated the whole project to TypeScript. Installed `motion`. See git log commit "Phase 0: ...".
- **Phase 1**: Decided accent (mint #6EE7B7) and theme scope (dark-only). New named token set in `globals.css`. Space Grotesk/Space Mono fonts. Removed `next-themes` and the toggle. See git log commit "Phase 1: ...".
- **Phase 2**:
  - Collapsed the 3-page site (`/`, `/projects`, `/contact`) into a single scrollable one-pager at `/`, composed of `<Hero>`, `<About>`, `<Skills>`, `<Projects>`, `<Contact>` in `src/components/sections/`. Old route folders deleted; `next.config.mjs` redirects `/projects` → `/#projects` and `/contact` → `/#contact` (307) so old links/bookmarks don't 404.
  - Rebuilt nav for anchor-scroll: `NavLink` is now a plain `<a href="#section">` (previously did `router.push` + a 50ms timeout + a global loading spinner — that machinery existed only to mask multi-page route transitions, which don't happen on a single page anymore). Added `src/hooks/useActiveSection.ts` (IntersectionObserver-based scroll-spy) so the nav's active-underline state now reflects which section is in view instead of the old route pathname.
  - Removed the multi-page-transition infrastructure entirely, now dead on a single page: `LoadingContext`, `RouteChangeSpinner`, the `/spinner` test route. Also deleted `SidebarNav.tsx`, confirmed unused since Phase 0.
  - Added `scroll-smooth` on `<html>` and `scroll-mt-14` on every section so anchor jumps land below the fixed nav bar instead of under it.
  - While relocating page content into sections, converted all remaining hardcoded `slate-*`/`rose-*`/`blue-*` classes to the new tokens (`text-foreground`, `text-muted-foreground`, `text-accent`, `bg-surface`) — this was the last piece of the Phase 1 "remove old palette" checklist item, finished here rather than done twice.
  - Found and fixed a real regression from the dark-only decision: `Input`, `Textarea`, and `EmblaCarousel`'s nav buttons/shadow hardcoded `bg-slate-200 dark:bg-slate-700/800` — since `.dark` is never applied anymore, these would have permanently rendered as light-gray boxes on the dark page. Converted to `bg-surface`/`text-foreground`/`shadow-black`. Left `ui/button.tsx`'s `dark:` variants alone (they only tweak opacity on top of a token-driven base color, so no visible break — just now-unreachable refinements, low priority shadcn boilerplate).
  - `Skills.tsx`: the old `darkModeFix` per-skill hover-color hack (used to swap black-branded icons — Next.js, GitHub, Vercel — to white specifically in dark mode) is now just the permanent, unconditional color for those three icons, since dark mode is the only mode.
  - Converted the nav logo `<img>` to `next/image` in `Navbar`/`MobileMenu` (quick, low-risk fix, not deferred since these components aren't going away).
  - Verified: `tsc --noEmit` clean, `npm run build` succeeds (single `/` route + redirects confirmed in the build's routes manifest), lint down to 1 pre-existing error + 1 warning (both in `EmblaCarousel`, flagged since Phase 0 as a candidate for replacement in Phase 4).
  - Did not run my own `npm run dev` this phase — user has a dev server running in another terminal to watch changes live; verified instead via `tsc`, `build`, and lint.

## Known pre-existing lint debt (unchanged from Phase 1, deferred to Phase 4)
- `react-hooks/set-state-in-effect` + `@next/next/no-img-element` in `EmblaCarousel` — carousel is a candidate for replacement by Aceternity tilt cards in Phase 4 (see Phase 0 "Re-verify Embla Carousel ... still needed" todo item).

## Up next
- Start Phase 3: content sections — hero/about/skills/contact get an actual design pass (type scale, whitespace, Aceternity hero effects per the brief), rather than the structural placeholders built in Phase 2.

## Open decisions (blocking downstream phases)
- **Signature interactive element**: fiber/network line animation vs. terminal/CLI typing effect vs. other — blocks Phase 5.
- **Resume Auto-Apply Tool depth**: full case study (like LinkLeaf) vs. card + live demo link — blocks Phase 4 content.
- **Mobile layout**: not yet designed — blocks Phase 6.

## Notes
- Weather App and Route Planner API issues are explicitly out of scope for this redesign — present as-is, no further build work on those apps themselves.
- Cut from lineup: Life Coaching Website, Music Translation App (latter kept only as interview talking point). Both are still in the Phase 2 `Projects.tsx` structural placeholder (old lineup) — Phase 4 swaps in the brief's actual 5-project lineup.
- `public/logo-dark.svg`/`logo-light.svg` still bake in the old rose accent color for a decorative shape — flagged for a possible recolor to mint during Phase 2/3 polish, not done automatically since it's a visible brand-asset edit.
