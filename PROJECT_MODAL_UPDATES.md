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

Writing-style and truthfulness rules now live in `CLAUDE.md` (em dash usage, AI
buzzwords, sentence rhythm, and the truthfulness clause with its user-invoked-only
override). All copy in this file should be checked against that before landing —
a first full audit against it has already been done and the clear violations fixed
(see git history around the "writing-style guidelines" and "audit" commits).

## Per-project status

### Route Planning App — done
- `description` has its WHY beat (grew out of a real fiber optic field-work problem).
- `lessonsLearned` covers it as an early, pre-AI-assisted self-taught project.

### Resume Builder — done
- `description` now opens with the WHY beat (built to speed up own job search, real
  tool in active use; Auto Apply flagged as still in active development).
- `lessonsLearned` still needs real content — current copy is a design-decision note
  (fill-only/never-submit scoping), not an actual lesson learned. Tracked in
  `TODO.md`. Needs the user's own reflection on what actually happened during
  development, not something to draft from the outside.

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

### Mobile Mechanic Site — done, two open items
- `stack`, `summary`, `description`, `architectureNote`, and `lessonsLearned` are all
  updated, including the fuller trigonometry-based diagonal-angle story. Metrics were
  considered and dropped (didn't earn their place as a tile).
- Open, tracked in `TODO.md`: screenshots predate the redesign and don't show the
  diagonal-panel design the story now describes; Results (bookings/client feedback)
  still has no real data to add.

## Undecided

- Section rename: keep "Projects," or switch to "Selected Projects" / "Case
  Studies" (leaning against "Selected Works" — reads more design-portfolio than
  software-engineer-portfolio for this site).
