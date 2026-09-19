# Redesign Status

Last updated: 2026-09-19
Branch: `redesign`
Source brief: `~/Desktop/Portfolio Redesign - Design Brief.md`

## Current phase
**Phase 0 — Foundation & Tooling** (nearly done — only Aceternity components remain, deferred to Phase 3/4)

## Done
- Old branches (`carousel`, `colors`, `navbar`, `ui-update`) deleted locally and on origin; local `main` fast-forwarded to match origin.
- `redesign` branch created off `main` and pushed to origin.
- Full phase breakdown written to `todo.md`.
- Upgraded Next.js 15.3.8 → 16.3.5 via official codemod (React 19.3.0, eslint-config-next 16.3.5). Removed a dead `cacheComponents`-only `instant` export the codemod added defensively. Pinned `turbopack.root` in `next.config.mjs` to silence a monorepo-root warning (stray `package.json` in `~`, unrelated to this project).
- Downgraded `eslint` devDependency from the codemod's 10.11.0 to latest 9.x — `eslint-config-next`/`typescript-eslint` aren't compatible with ESLint 10 yet (crashed with `scopeManager.addGlobals is not a function`).
- Ran `npm audit fix` — cleared 6 transitive dev-tooling vulnerabilities (tar, minimatch, browserslist, etc.), none in runtime code.
- Migrated the whole project to TypeScript: added `tsconfig.json` (removed `jsconfig.json`), renamed all `.js`/`.jsx` to `.ts`/`.tsx`, and typed every component/page/util. `npx tsc --noEmit` is clean.
- While typing, fixed two pre-existing dead props surfaced by strict typing: `ThemeToggle` and `NavLink` were both called with props (`className`, `onClick`) they silently dropped — now wired in using the codebase's existing `cn()` merge convention.
- Installed `motion` (Framer Motion) per the brief.
- Verified: `npm run build` and dev server both succeed; `/`, `/projects`, `/contact` all return 200.
- Note: Next 16's `next dev` auto-generates `AGENTS.md`/`CLAUDE.md` at repo root (a framework feature flagging breaking API changes to AI agents — regenerates every `next dev` run per its own comment, so it's being committed rather than fought).

## Known pre-existing lint debt (not introduced by this work, left alone since the owning components get rewritten in later phases)
- `react-hooks/set-state-in-effect` on the `mounted` pattern in `Navbar`, `MobileMenu`, `theme-provider`, `theme-toggle` (4 errors) — standard hydration-mismatch guard, same count before and after migration.
- `@next/next/no-html-link-for-pages` on raw `<a href="/">` logo links in `Navbar`/`MobileMenu` (2 errors) — will resolve naturally once Phase 2 converts these to `next/link`.
- `@next/next/no-img-element` warnings on raw `<img>` for the theme-aware logo swap and Embla carousel slides (4 warnings).
- `react-hooks/exhaustive-deps` warnings on the `setIsLoading(false)` mount effects in the page components (4 warnings) — these pages get rewritten into sections in Phase 2/3.

## Up next
- Start Phase 1: design tokens (Space Grotesk/Space Mono, color tokens, accent color decision).

## Open decisions (blocking downstream phases)
- **Accent color**: mint #6EE7B7 (default) vs. coral/purple/blue — blocks Phase 1.
- **Signature interactive element**: fiber/network line animation vs. terminal/CLI typing effect vs. other — blocks Phase 5.
- **Resume Auto-Apply Tool depth**: full case study (like LinkLeaf) vs. card + live demo link — blocks Phase 4 content.
- **Mobile layout**: not yet designed — blocks Phase 6.

## Notes
- Weather App and Route Planner API issues are explicitly out of scope for this redesign — present as-is, no further build work on those apps themselves.
- Cut from lineup: Life Coaching Website, Music Translation App (latter kept only as interview talking point).
