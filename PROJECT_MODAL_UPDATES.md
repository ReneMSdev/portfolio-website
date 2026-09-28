# Planned updates: project modal content

Tracking doc for in-progress copy work on `src/data/projects.ts`, one project at a
time. Not a design/architecture doc (see `STATUS.md`/`TODO.md` for that) — this is
specifically about narrative content in the case-study modals.

## Narrative framework

For each project, aim to cover, in roughly this order:

1. **Why** — the reason it exists (real need, learning goal, client work, architecture
   case study). Skipped when self-evident (e.g. client work).
2. **What** — one clause identifying what it is (existing convention across all
   entries already).
3. **How** — covered by `description`, `architectureNote`, `lessonsLearned`, `stack`,
   and diagrams.
4. **Results** — only when there's something real and specific to report. Not forced;
   most projects in this lineup don't have one yet.

## Standing guideline

All copy should be checked against AI-generated-sounding style (buzzwords, generic
phrasing, AI "tells"). Resume Builder has its own generation-style prompts/guidelines
that may be pasted in here as a reference once available — not yet supplied.

## Per-project status

### Route Planning App — agreed, ready to apply
- `description`: add a WHY beat — built out of real fiber optic field work (a day's
  address list with no optimized route meant looking each one up individually in
  Google Maps beforehand).
- `lessonsLearned` (new): "Built early in my self-taught path — one of the first
  projects I attempted independently, outside of guided tutorials, before
  AI-assisted development matured into the force multiplier it is today. It built
  real familiarity with UI development and the core patterns behind API integration:
  requests, responses, and handling async."

### Resume Builder — drafted, needs final confirmation
- `description` WHY beat drafted: "Built to speed up my own job search — I use it
  for real resume and cover letter generation, tailored to each job description,
  with an integrated chat interface for iteratively revising individual sections or
  bullets. A separate automation layer, still in active development, orchestrates
  Claude Code and a dedicated Claude-in-Chrome agent to fill out job application
  forms from the saved application data — form-fill only, never submits."
- Confirmed true: it's a real tool in active personal use for generation; Auto Apply
  specifically is still being refined, not yet run against a live job posting.

### Weather App — open, needs input
- No copy drafted yet. Current entry frames it apologetically ("out of scope...
  minimal reference") instead of stating a real purpose.
- Needed: what was this actually built to practice or prove? Once known, replace the
  apology with an honest WHY beat, same pattern as Route Planner.

### LinkLeaf — no new copy pending
- Blocked on the user's own repo work (spin up locally, clean up, screenshot, write
  real README/architecture docs) before a real case study can be built.
- Already tracked in `TODO.md` and in session memory
  (`project_linkleaf_case_study.md`).
- Once unblocked: add a WHY beat too (was this meant to be a real product attempt,
  not just a learning exercise?) alongside the deeper HOW content.

### Mobile Mechanic Site — implemented, one follow-up pending
- Already updated: `stack`, `summary`, `description`, `architectureNote`,
  `lessonsLearned` (diagonal-angle design problem). Metrics removed (were `25°`
  shared angle / `0` animation libraries — decided the numbers didn't earn their
  place as a metrics tile, though `25°` survives inline in `lessonsLearned`).
- Pending: a fuller trig-based story (from another Claude Code session working in
  the actual `atx-reliable-wrenching` codebase) to revise the `lessonsLearned`
  paragraph with more depth on how the angle-as-a-function-of-height problem was
  solved.
- Open: Results (bookings/client feedback) — no data yet, not added.

## Undecided

- Section rename: keep "Projects," or switch to "Selected Projects" / "Case
  Studies" (leaning against "Selected Works" — reads more design-portfolio than
  software-engineer-portfolio for this site).
