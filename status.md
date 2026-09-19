# Redesign Status

Last updated: 2026-09-19
Branch: `redesign`
Source brief: `~/Desktop/Portfolio Redesign - Design Brief.md`

## Current phase
**Phase 1 — Design System & Tokens** (done, except the type-scale/whitespace pass, which happens naturally in Phase 3 as content sections are built)

## Done
- Old branches (`carousel`, `colors`, `navbar`, `ui-update`) deleted locally and on origin; local `main` fast-forwarded to match origin.
- `redesign` branch created off `main` and pushed to origin.
- Full phase breakdown written to `todo.md`.
- **Phase 0**: Upgraded Next.js 15.3.8 → 16.3.5 (React 19.3.0). Migrated the whole project to TypeScript (`tsc --noEmit` clean). Installed `motion`. See git log for full detail — commit "Phase 0: upgrade Next.js to 16.3.5, migrate to TypeScript, add motion".
- **Phase 1**:
  - Accent color decided: **mint #6EE7B7**. Theme scope decided: **dark-only**.
  - Removed theme-switching entirely: uninstalled `next-themes`, deleted `theme-provider.tsx` and `theme-toggle.tsx`, removed the toggle UI from `Navbar`/`MobileMenu`, hardcoded the logo to `logo-dark.svg` (the light-on-dark variant), fixed `ContactPage`'s toast theme prop to a static `'dark'`.
  - Rewrote `globals.css`: new named token set (`background #121212`, `surface #17171a`, `foreground #f2f2f0`, `muted-foreground #b9b9bd`, `accent #6EE7B7`, `accent-foreground #121212`, `border #27272a`), single `:root` block (no more `.dark` variant/class), shadcn's semantic tokens (`card`, `primary`, `secondary`, `muted`, `ring`, `input`) now derive from these named tokens instead of the old zinc/oklch shadcn defaults. Dropped unused shadcn tokens (`popover`, `sidebar-*`, `chart-1..5`) — confirmed via grep that nothing in the codebase references them.
  - Swapped fonts: Geist Sans/Mono → **Space Grotesk** (`--font-sans`) + **Space Mono** (`--font-mono`) via `next/font/google`. Verified in compiled output.
  - Deleted `tailwind.config.js` — confirmed dead code (Tailwind v4's `@tailwindcss/postcss` never loads a JS config unless referenced via `@config` in CSS, which this project never did).
  - Fixed `components.json`: `tsx: false` → `true` (missed in the Phase 0 TS migration), and cleared the now-nonexistent `tailwind.config` path.
  - Recolored the `nav-link-hover` underline and hamburger-icon bars in `globals.css` from hardcoded rose (`#e11d48`) / light-mode-only colors to the new `accent`/`foreground` tokens.
  - Verified end-to-end: `tsc --noEmit` clean, `npm run build` succeeds, dev server serves `/`, `/projects`, `/contact` with the new `--background:#121212` / `--accent:#6ee7b7` tokens and Space Grotesk/Space Mono confirmed present in the compiled CSS/HTML.
  - Lint errors dropped from 7 to 3 (the 4 removed were the `mounted`-state hydration-guard pattern that only existed to support theme switching).

## Known pre-existing lint debt (not introduced by this work, left alone since the owning components/pages get rewritten in later phases)
- `@next/next/no-html-link-for-pages` on raw `<a href="/">` logo links in `Navbar`/`MobileMenu` (2 errors) — resolves once Phase 2 converts these to `next/link`.
- `react-hooks/set-state-in-effect` in `EmblaCarousel` (1 error) — carousel likely gets replaced by Aceternity tilt cards in Phase 4.
- `@next/next/no-img-element` warnings on raw `<img>` for the logo and Embla carousel slides (3 warnings).
- `react-hooks/exhaustive-deps` warnings on the `setIsLoading(false)` mount effects in the page components (4 warnings) — these pages get rewritten into sections in Phase 2/3.

## Known transitional visual state (expected, not a bug)
- Nav/base chrome (Navbar, MobileMenu, page background, hamburger icon, nav underline) now use the new dark/mint token system.
- Page **body content** (home hero/about/skills, projects cards, contact form) still uses the old hardcoded `slate-*`/`rose-*`/`blue-*` Tailwind classes and `dark:` variants, which are now inert (no `.dark` class is ever applied). This means those sections currently render in their light-mode coloring against the new dark nav/background, i.e. visually inconsistent until Phase 2/3 rebuilds them into sections using the new tokens. This was a deliberate scope call to avoid restyling markup that's about to be structurally rewritten anyway — see `todo.md`.
- `public/logo-dark.svg`/`logo-light.svg` still bake in the old rose accent color for a decorative shape — flagged in `todo.md` for a possible recolor to mint during Phase 2/3 polish.

## Up next
- Start Phase 2: collapse the 3-page site into a single scrollable one-pager (hero/about/skills/projects/contact sections), rebuild the sticky nav with anchor-scroll + underline hover effect using the new tokens. This is where the transitional visual inconsistency above gets resolved.

## Open decisions (blocking downstream phases)
- **Signature interactive element**: fiber/network line animation vs. terminal/CLI typing effect vs. other — blocks Phase 5.
- **Resume Auto-Apply Tool depth**: full case study (like LinkLeaf) vs. card + live demo link — blocks Phase 4 content.
- **Mobile layout**: not yet designed — blocks Phase 6.

## Notes
- Weather App and Route Planner API issues are explicitly out of scope for this redesign — present as-is, no further build work on those apps themselves.
- Cut from lineup: Life Coaching Website, Music Translation App (latter kept only as interview talking point).
