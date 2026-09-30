@AGENTS.md

# Writing style for portfolio copy

Applies to prose written for this site: Hero, About, project descriptions,
`architectureNote`, `lessonsLearned`, and similar copy in `src/data/projects.ts`.
Does not apply to code comments, commit messages, or this file.

## Read like a person, not an AI

- Avoid an em dash joining two independent clauses within a sentence, where
  each side has its own subject and verb. That is the pattern to flag; use a
  period, comma, or restructure instead.
- An em dash (or hyphen) separating short labels or fragments with no clause
  structure is fine: date ranges (Jan 2026 - Present), a role and location
  (Full-Stack Developer - Austin, TX), or similar short juxtapositions.
- Test: if each side could stand alone as a complete sentence, split it. If
  neither side is a full clause, leave it.
- Avoid overused AI words: "leverage," "seamlessly," "robust," "delve into,"
  "cutting-edge," "dynamic," and similar.
- No three-item lists used for effect ("fast, reliable, and scalable").
- Don't start consecutive sentences/paragraphs the same way (e.g., "Built..."
  twice in a row).
- Vary sentence rhythm and structure the way a person naturally would; don't
  repeat the same sentence shape paragraph after paragraph.

## Truthfulness

- Don't state skills, numbers, achievements, or experience that aren't real or
  verifiable.
- Anything the user states directly in conversation counts as fact and can be
  used.
- Leave something out or ask, rather than guess or round up.
- Flag when a claim is unverified (e.g., a feature that's built but not yet
  tested against real-world use) rather than implying it's proven.
- The user may explicitly override this rule for a specific piece of copy when
  it makes for better showcasing (e.g., describing an in-development,
  not-yet-verified feature like Auto Apply as if it's already fully working).
  This override only applies when the user directly and explicitly says so for
  that specific instance. Never infer it, apply it on your own judgment, or
  assume it carries forward to other copy.

# Project

René's personal portfolio: single-page Next.js 16 site, live on `main`; day-to-day work on `working`.

| Purpose | Command |
|---|---|
| Install | `npm install` |
| Run locally | `npm run dev` |
| Lint / type-check | `npm run lint`, `npx tsc --noEmit` |
| Build | `npm run build` |

No test suite; lint + tsc + build are the checks.

## Project rules
- Mobile Mechanic Site is client work: no `codeUrl` without checking first.
- Phase 7 (QA & launch) is on hold; don't start it unless asked.

## State
Current state: `docs/STATUS.md`. Backlog: `docs/TODO.md`. Decisions: `docs/decisions.md`.
Copy tracker: `docs/PROJECT_MODAL_UPDATES.md`.
