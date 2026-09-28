# Redesign Status

Last updated: 2026-09-28
Branch: `working` (day-to-day dev branch; `redesign` is merged into `main` and retired)

## Current phase
**Phase 7 — QA & Launch (on hold).** The redesign itself (Phases 0–6) is functionally complete and live on `main`. Recent sessions have been project-modal features and a copy pass on project content (see below), not Phase 7 work.

## Done, by phase
- **Phase 0**: Next.js 16.3.5, React 19, full TypeScript migration, `motion` installed.
- **Phase 1**: Accent mint `#6EE7B7`, dark-only theme, named token system in `globals.css`, Space Grotesk/Space Mono fonts.
- **Phase 2**: Single scrollable page (`Hero`/`About`/`Skills`/`Projects`/`Contact` in `src/components/sections/`), anchor-scroll nav, dead multi-page-transition infra removed.
- **Phase 3**: Motion entrance/scroll animations on all sections via `MotionProvider` (respects `prefers-reduced-motion`).
- **Phase 4**: 3D tilt project grid (`src/components/ui/3d-card.tsx`), deep-linkable case-study modals (`src/components/ProjectModal.tsx`, `?project=slug` URL sync), typed `Project` data model at `src/data/projects.ts`.
- **Phase 5 — signature interactive element**: algorithmically-generated circuit-trace line art, one continuous pattern spanning the entire page (`src/components/generative-lines/`) — this replaced an earlier hand-authored, per-section approach (`hero-effects/`, `section-lines/`) that was tried first and fully removed once the generative approach proved out. Key mechanics:
  - `generateCircuit.ts`: constrained random walk (strict horizontal/vertical alternation guarantees right angles), seeded PRNG, grid-snapped steps.
  - `useGeneratedPattern.ts`: generates once on mount, re-rolls with a fresh random seed on debounced window resize (`useSyncExternalStore`) — **width changes only**, since mobile browsers fire `resize` when the address bar shows/hides on scroll. Canvas is a fixed size per pattern — taller on mobile (`HEIGHT_MOBILE = 5200` vs. desktop's `1600`) since mobile stacks the whole page into one narrow column and is far taller relative to its width than desktop.
  - `GenerativeLines.tsx`: renders the SVG with `vector-effect="non-scaling-stroke"` so line weight stays constant in screen pixels regardless of viewport width.
  - Exposed text is protected via a frosted-glass backdrop (`ui/text-blur-backdrop.tsx`, feathered mask edge) instead of the lines needing to avoid it — this is what made the page-wide/mobile-wide expansion tractable without per-section coordinate tuning.
  - The hand-authored version is preserved, unused, at `src/components/page-lines/` in case ever wanted again; `PageLinesLayer.tsx`'s `ACTIVE` constant switches between them.
- **Phase 6 — mobile & responsive**: `MobileMenu.tsx` (hamburger + slide-in panel), responsive project grid (`grid-cols-1 md:grid-cols-2`), and the generative line art's mobile-tier canvas (above) — all verified live at a 500px viewport. The project modal was reworked for mobile on 2026-09-26: full-screen takeover below `md`, hamburger hidden while a modal is open (`body.modal-open`), and a sticky header (status/title/close) inside the scroll container. The scroll-container fix was verified against real content height; a final look on an actual phone is the only thing left before calling Phase 6 closed.

## Project modal features (added 2026-09-26)
- **Mermaid architecture diagrams** (`ui/mermaid-diagram.tsx`, `architectureDiagrams` field on `Project`), dark-themed, nodes color-coded by category (external services amber, storage blue).
- **Click-to-expand diagram lightbox** (`ui/diagram-lightbox.tsx`) with prev/next between a project's diagrams. Escape closes the lightbox first, then the modal on a second press.
- **Image carousel** (`ui/image-carousel.tsx`), hand-rolled with `motion` + `lucide-react` rather than reintroducing Embla. Single-image projects render a static image with no controls.
- Project images default to top-cropped; `imagePosition: 'center'` overrides per project.
- `architectureNote` accepts `string | string[]` for multi-paragraph notes.

## Project copy
- **Writing-style and truthfulness rules live in `CLAUDE.md`** and apply to all portfolio prose (Hero, About, `projects.ts`). A full audit against them has been done and violations fixed.
- **`PROJECT_MODAL_UPDATES.md`** is the per-project tracker for narrative copy (Why/What/How/Results framework), and holds the saved entries for projects pulled from the lineup.
- Hero and About were rewritten for accuracy on 2026-09-23 (unsupported claims dropped, no "founder" framing, fiber/telecom field work corrected to 5+ years, CS pivot framed as ongoing), and About was later rewritten in a warmer voice. Facts list: `B.S. Computer Science · WGU 2024`, `5+ yrs fiber & telecom field work`, `Freelance Developer, Salo Labs LLC`.
- Resume link removed from nav entirely (`Navbar.tsx`, `MobileMenu.tsx`) — not currently something to surface.

## Projects — current lineup (3)
- **Resume Builder** (renamed back from "Resi the Builder"; repo/demo URLs still use `resi-the-builder`): live demo (`https://resi-the-builder.vercel.app`), public repo (`https://github.com/ReneMSdev/resi-the-builder`, confirmed no secrets in git history via `gitleaks`), 3 screenshots, 3 Mermaid diagrams, two-paragraph architecture note. **Open:** `lessonsLearned` is a design-decision note, not a real lesson — to be worked through together with the user, not drafted alone.
- **Mobile Mechanic Site**: live production client site (`https://www.atxreliablewrenching.com/`) — modal button reads "View Live Site". Copy is done, including the trigonometry-based diagonal-panel story. No `codeUrl` (client's repo — see note below). **Open:** the one screenshot predates the site's diagonal-panel redesign.
- **Route Planning App**: demo + public repo, Why beat and `lessonsLearned` done.

**Removed from the lineup** (2026-09-28): **LinkLeaf** and **Weather App** were pulled out of `projects.ts` entirely, since both need more work before they're ready to showcase. Their last content and what's needed to restore them are saved in `PROJECT_MODAL_UPDATES.md`. LinkLeaf is blocked on the user's own repo work (run locally, clean up, screenshot, write real docs).

**Note on client work**: the Mobile Mechanic Site's source is a client deliverable, not a personal project — its repo should stay private/unlinked from the portfolio unless the client explicitly agrees to public visibility. Don't add a `codeUrl` for it without checking first.

## Bug fixes worth knowing about (not action items)
- Fixed a permanent page-clipping bug: `PageLinesLayer`'s `overflow-hidden` wrapper could become a genuinely scrollable element (since the line-art SVG can render taller than actual page content), and native nav-link fragment navigation would scroll it internally — `overflow: hidden` then made that offset permanently unrecoverable by user scroll. Fixed with `overflow: clip`, which is never treated as a scroll container.
- Fixed line-art stroke width visually thinning on viewport resize (`vector-effect="non-scaling-stroke"`).
- Fixed duplicate React keys in generated line/node lists (coincidental coordinate collisions on the shared snap grid).
- Fixed generative lines only covering the Hero section on mobile (see Phase 5 above).
- Fixed the line pattern re-rolling on every mobile scroll (address-bar `resize` events; see Phase 5 above).
- Fixed the project modal collapsing to 0 height when content exceeded 85vh: the scroll container sits on an untransformed child of the `layoutId` element (a transformed ancestor breaks `position: sticky`), inside a `flex flex-col` card with `min-h-0` (deliberately not `flex-1`, which collapses an auto-height flex parent).

## Up next — Phase 7: QA & Launch
On hold for now. When picked back up, accessibility is the priority item (focus states, contrast, aria attributes, keyboard nav) — cross-browser, performance, and trope review are lower priority for a personal portfolio. The reference comparison (`ky.fyi`/`refact0r.dev/about`) has been dropped entirely: the design has landed somewhere distinct enough that a side-by-side isn't useful anymore.

## Notes
- `redesign` branch: fully merged into `main`, no longer in active use. `working` is now the day-to-day branch.
- The original design brief (`~/Desktop/Portfolio Redesign - Design Brief.md`) is no longer at that path. `TODO.md` and this file have absorbed everything still relevant from it.
- Route Planner API issues remain explicitly out of scope for this redesign.
- `DotBackground` (`ui/dot-background.tsx`) and `Skills.legacy.tsx` are unused dead code kept intentionally, in case ever wanted again.
- `README.md` is still the `create-next-app` boilerplate.
