# Redesign Status

Last updated: 2026-09-24
Branch: `working` (day-to-day dev branch; `redesign` is merged into `main` and retired)

## Current phase
**Phase 7 — QA & Launch.** The redesign itself (Phases 0–6) is functionally complete and live on `main`. What's left is a formal QA pass, not new design/build work — see the Phase 7 breakdown below.

## Done, by phase
- **Phase 0**: Next.js 16.3.5, React 19, full TypeScript migration, `motion` installed.
- **Phase 1**: Accent mint `#6EE7B7`, dark-only theme, named token system in `globals.css`, Space Grotesk/Space Mono fonts.
- **Phase 2**: Single scrollable page (`Hero`/`About`/`Skills`/`Projects`/`Contact` in `src/components/sections/`), anchor-scroll nav, dead multi-page-transition infra removed.
- **Phase 3**: Motion entrance/scroll animations on all sections via `MotionProvider` (respects `prefers-reduced-motion`).
- **Phase 4**: 3D tilt project grid (`src/components/ui/3d-card.tsx`), deep-linkable case-study modals (`src/components/ProjectModal.tsx`, `?project=slug` URL sync), typed `Project` data model at `src/data/projects.ts`.
- **Phase 5 — signature interactive element**: algorithmically-generated circuit-trace line art, one continuous pattern spanning the entire page (`src/components/generative-lines/`) — this replaced an earlier hand-authored, per-section approach (`hero-effects/`, `section-lines/`) that was tried first and fully removed once the generative approach proved out. Key mechanics:
  - `generateCircuit.ts`: constrained random walk (strict horizontal/vertical alternation guarantees right angles), seeded PRNG, grid-snapped steps.
  - `useGeneratedPattern.ts`: generates once on mount, re-rolls with a fresh random seed on debounced window resize (`useSyncExternalStore`). Canvas is a fixed size per pattern — taller on mobile (`HEIGHT_MOBILE = 5200` vs. desktop's `1600`) since mobile stacks the whole page into one narrow column and is far taller relative to its width than desktop.
  - `GenerativeLines.tsx`: renders the SVG with `vector-effect="non-scaling-stroke"` so line weight stays constant in screen pixels regardless of viewport width.
  - Exposed text is protected via a frosted-glass backdrop (`ui/text-blur-backdrop.tsx`, feathered mask edge) instead of the lines needing to avoid it — this is what made the page-wide/mobile-wide expansion tractable without per-section coordinate tuning.
  - The hand-authored version is preserved, unused, at `src/components/page-lines/` in case ever wanted again; `PageLinesLayer.tsx`'s `ACTIVE` constant switches between them.
- **Phase 6 — mobile & responsive**: `MobileMenu.tsx` (hamburger + slide-in panel), responsive project grid (`grid-cols-1 md:grid-cols-2`), and the generative line art's mobile-tier canvas (above) — all verified live at a 500px viewport. Project modal responsiveness (`max-w-4xl`, `p-4`/`p-4 md:p-8`) uses the same responsive patterns as the rest of the site but wasn't independently re-verified at mobile width in the same session (browser resize tooling became unreliable mid-check) — worth a quick manual look before calling Phase 6 fully closed.

## Content accuracy pass (this session)
Hero and About copy were rewritten for accuracy after a long back-and-forth:
- Hero subhead dropped unsupported claims ("cloud-native backend systems," "distributed identity platforms" — the latter didn't match any real project) in favor of "I design and build full-stack applications, integrating AI where it adds real value."
- About dropped the "solo technical founder" framing (real story: a brief, design-phase-only co-founder attempt, and a personal project that hasn't found commercial footing — neither rises to "founder"), corrected fiber/telecom field-work years (8+ → 5+, based on actual employment dates: 2018–2023), and reframed the CS pivot as ongoing rather than complete (a return to telecom contracting in 2026 means it isn't fully behind him). Facts list: `B.S. Computer Science · WGU 2024`, `5+ yrs fiber & telecom field work`, `Freelance Developer, Salo Labs LLC`.
- Resume link removed from nav entirely (`Navbar.tsx`, `MobileMenu.tsx`) — not currently something to surface.

## Projects — current state
- **Resume Auto-Apply Tool**: now has real content — live demo (`https://resi-the-builder.vercel.app/`), public repo (`https://github.com/ReneMSdev/resi-the-builder`, confirmed no secrets in git history via `gitleaks`), and a screenshot (`public/img/resume-builder/`).
- **Mobile Mechanic Site**: real content, live production client site (`https://www.atxreliablewrenching.com/`) — modal button reads "View Live Site" instead of "View Demo" since it's not a demo. No `codeUrl` (client's repo, kept private/unlinked deliberately — see note below).
- **Route Planning App**: real content, demo + public repo, unchanged.
- **LinkLeaf**: still placeholder — `architectureNote` is a literal "coming soon" string, no real demo/images. This is the one genuine content gap left in the project lineup.
- **Weather App**: intentionally minimal per the original brief (not live, out of scope for this redesign) — not a gap, a deliberate choice.

**Note on client work**: the Mobile Mechanic Site's source is a client deliverable, not a personal project — its repo should stay private/unlinked from the portfolio unless the client explicitly agrees to public visibility. Don't add a `codeUrl` for it without checking first.

## Bug fixes landed this session (worth knowing about, not action items)
- Fixed a permanent page-clipping bug: `PageLinesLayer`'s `overflow-hidden` wrapper could become a genuinely scrollable element (since the line-art SVG can render taller than actual page content), and native nav-link fragment navigation would scroll it internally — `overflow: hidden` then made that offset permanently unrecoverable by user scroll. Fixed with `overflow: clip`, which is never treated as a scroll container.
- Fixed line-art stroke width visually thinning on viewport resize (`vector-effect="non-scaling-stroke"`).
- Fixed duplicate React keys in generated line/node lists (coincidental coordinate collisions on the shared snap grid).
- Fixed generative lines only covering the Hero section on mobile (see Phase 5 above).

## Up next — Phase 7: QA & Launch
On hold for now. When picked back up, accessibility is the priority item (focus states, contrast, aria attributes, keyboard nav) — cross-browser, performance, trope review, and the reference comparison are lower priority for a personal portfolio.

## Notes
- `redesign` branch: fully merged into `main`, no longer in active use. `working` is now the day-to-day branch.
- Weather App and Route Planner API issues remain explicitly out of scope for this redesign.
- `DotBackground` (`ui/dot-background.tsx`) and `Skills.legacy.tsx` are unused dead code kept intentionally, in case ever wanted again.
