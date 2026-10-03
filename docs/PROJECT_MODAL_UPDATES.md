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
- 2026-10-02: entry replaced from `docs/portfolio-handoff/route-planner/ENTRY.md`
  (provider switch to Nominatim, `Live` status, truthful `demoNote`, architecture note
  and two diagrams, new screenshots). Title kept per René. `lessonsLearned` kept, plus a second paragraph René asked for on the API fix and phone layout.

### Resume Builder — done
- `description` now opens with the WHY beat (built to speed up own job search, real
  tool in active use; Auto Apply flagged as still in active development).
- `lessonsLearned` rewritten 2026-10-02 from René's own two lessons: customized
  prompts with specific rules for consistent generations, and prompt caching to
  reduce token usage. The old fill-only/never-submit note was dropped (that scoping
  is still stated in `description`).

### Weather App — removed from the lineup for now
- Pulled entirely out of `src/data/projects.ts` (not just hidden via copy) — needs
  more work before it's ready to showcase. Restore by re-adding the object below and
  updating its content per the open item.
- Needed before restoring: what was this actually built to practice or prove? Once
  known, replace the old apologetic framing ("out of scope... minimal reference")
  with an honest WHY beat, same pattern as Route Planner.
- Last content (for restoring):
  ```ts
  {
    slug: 'weather-app',
    title: 'Weather App',
    status: 'Not live',
    summary: 'This project is coming soon.',
    description:
      'A weather app built with Next.js and Node. Currently not live; redeploying and fixing it up is out of scope for this portfolio, so it is shown here as a minimal reference rather than a working demo.',
    stack: ['Next.js', 'Node.js'],
    codeUrl: '#',
  },
  ```

### LinkLeaf — back in the lineup (2026-09-30)
- Restored from the handoff produced in the LinkLeaf repo
  (`docs/portfolio-handoff/linkleaf/ENTRY.md`, which has the sources table and caveats).
- WHY beat: a real product attempt, paused before launch over market doubts (René).
- `lessonsLearned` uses both options from the handoff as two paragraphs: the
  architecture/first-full-CI reflection, then the `update` name-shadowing bug.
- Description changed from the handoff: "contact cards" replaced with the accurate
  Save Contact (vCard download) wording. There is no phone-contact syncing.
- Caveats: screenshot uses mock data; Firebase and RevenueCat were only tested with
  mocks; the overview diagram adds a `client` classDef (muted purple).

### Mobile Mechanic Site — done, one open item
- `stack`, `summary`, `description`, `architectureNote`, and `lessonsLearned` are all
  updated, including the fuller trigonometry-based diagonal-angle story. Metrics were
  considered and dropped (didn't earn their place as a tile).
- Screenshot replaced 2026-09-30 with a live hero capture that shows the diagonal
  panels (one image; René decided services/reviews shots weren't needed).
- Open: Results (bookings/client feedback) still has no real data to add.

## Undecided

- Section rename: keep "Projects," or switch to "Selected Projects" / "Case
  Studies" (leaning against "Selected Works" — reads more design-portfolio than
  software-engineer-portfolio for this site).
