# Status

_Last verified: 2026-09-30 at 41ac13b_

René's personal portfolio: a single-page Next.js site, live on `main`, with day-to-day
work on the `working` branch. The redesign (Phases 0–6) is done. Phase 7 (QA and
launch) is **on hold**, so don't start it unless asked. Current work is project-modal
content: getting each project's case-study copy, screenshots, and diagrams to a
truthful, finished state.

## Site

**State:** One scrollable page (`Hero`/`About`/`Skills`/`Projects`/`Contact` in
`src/components/sections/`). It's dark-only with a mint `#6EE7B7` accent, named tokens in
`globals.css`, and Space Grotesk/Space Mono fonts. `motion` handles animation and respects
reduced motion. The signature element is generative circuit-line art across the whole
page (`src/components/generative-lines/`). Project cards use a 3D tilt and open
deep-linkable modals (`?project=slug`) with a Mermaid diagram lightbox and an image
carousel. The mobile layout is in place, including a full-screen modal below `md`.

| Check | Result | Evidence |
|---|---|---|
| Lint | passing | `npm run lint`: exit 0, no findings (41ac13b, 2026-09-30) |
| Type-check | passing | `npx tsc --noEmit`: exit 0 (41ac13b, 2026-09-30) |
| Build | passing | `npm run build`: compiled, `/` prerendered static (41ac13b, 2026-09-30) |
| Tests | none | No test suite exists |
| Modal on a real phone | **unverified** | Only checked at a 500px browser viewport, per the old status doc |
| Live deploy matches `main` | **unverified** | Not checked this session |

**Known issues:** none known in code. `README.md` is still `create-next-app` boilerplate.

## Projects (lineup of 4, in `src/data/projects.ts`)

- **Resume Builder** (slug `resume-builder`; demo and repo URLs still use `resi-the-builder`): demo, public repo,
  3 screenshots, 3 diagrams. **Open:** `lessonsLearned` is a design-decision note rather
  than a real lesson. Write it together with René, not alone.
- **LinkLeaf** (paused product, architecture case study): back in the lineup as of
  41ac13b. It has 4 diagrams, one screenshot, a public repo and two metric tiles
  (133 tests, 32 endpoints). The metrics were verified in the LinkLeaf repo, not here;
  sources are in `docs/portfolio-handoff/linkleaf/ENTRY.md`. `lessonsLearned` has two
  paragraphs. The 4 diagrams parse with mermaid@12 (scratch script, 41ac13b, 2026-09-30).
  Browser check passed: René looked at it, and a Chrome DOM check at `/?project=linkleaf`
  found 4 rendered diagrams, no Mermaid or console errors, both lesson paragraphs, and
  the `client` fill applied (792d9ea, 2026-09-30). On `main` since 8f20d83 (pushed
  2026-09-30); whether the Vercel deploy picked it up is **unverified**.
- **Mobile Mechanic Site** (live client site): copy done. The screenshot is a fresh
  1600×900 capture of the live hero, showing the diagonal panels (2026-09-30). The repo is a client deliverable, so it gets no
  `codeUrl` without checking first.
- **Route Planning App** (status `Live`): updated 2026-10-02 from
  `docs/portfolio-handoff/route-planner/ENTRY.md`. OpenCage broke, so the app now uses
  Nominatim (geocoding) and OpenRouteService (routing). New stack, `demoNote` and
  architecture note, two diagrams, and three 1344×756 screenshots (two desktop, one
  phone composite built from the handoff's phone captures). The app-side claims were
  verified in the route-planner repo, not here; sources are in ENTRY.md. The modal was
  checked in the local dev server (images, both diagrams, no console errors).

**Pulled from the lineup:** Weather App. Its saved entry is in
`docs/PROJECT_MODAL_UPDATES.md`.

## Reference docs

- `docs/PROJECT_MODAL_UPDATES.md`: per-project copy status and saved entries.
- `docs/PORTFOLIO_HANDOFF.md`: brief for sessions in other repos that produce modal entries.
- `docs/portfolio-handoff/linkleaf/ENTRY.md`: kept as the source record for LinkLeaf's claims.
- `docs/portfolio-handoff/route-planner/ENTRY.md`: the same for Route Planning App, plus the
  phone captures the composite screenshot was built from.
- `src/components/page-lines/PageLinesLayer.tsx` is live (rendered from `layout.tsx`). Its
  `ACTIVE` flag picks `GenerativeLines` over the hand-authored full-page `PageLines`, which
  is kept but not rendered.
- Unused code kept on purpose: `ui/dot-background.tsx`, `sections/Skills.legacy.tsx`.

<!--
Rules for this file:
- Rewrite it to describe the current state. It isn't a log; history lives in git.
- Every "passing" or "works" claim needs evidence from a run, or it's marked unverified.
- Future work goes in TODO.md, and reasons in decisions.md.
-->
