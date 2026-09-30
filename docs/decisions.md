# Decisions

Append-only log of choices made and why. Newest at the bottom. Don't edit old
entries: if a decision is reversed, add a new entry that references the old one.

<!-- Entry format:

## YYYY-MM-DD: {{Short title}}

**Decision:** {{what was chosen}}
**Alternatives:** {{what else was considered}}
**Why:** {{the reason, including constraints at the time}}

-->

The entries below were imported on 2026-09-30 from `docs/current-work/STATUS.md` and
`TODO.md`. Dates are the original ones where the old docs gave them; otherwise the
date is when the entry was imported.

## 2026-09-30 (imported): Dark-only theme, mint accent

**Decision:** Dark-only site with a mint `#6EE7B7` accent. `next-themes` and the theme toggle were removed.
**Alternatives:** Light/dark toggle; the old rose/blue/teal palette.
**Why:** A redesign choice from the design brief. One theme also means `dark:` variants never activate, so they were converted to tokens.

## 2026-09-30 (imported): Deep links via a query param, not intercepting routes

**Decision:** Project modals sync to `?project=slug` with `router.replace(..., { scroll: false })`.
**Alternatives:** Intercepting routes.
**Why:** The site is a single page with no per-project route segments. The brief allowed shallow routing as an alternative.

## 2026-09-30 (imported): Generative line art replaced the hand-authored version

**Decision:** One algorithmically generated circuit pattern covers the whole page (`generative-lines/`), with text protected by a frosted backdrop.
**Alternatives:** Hand-authored per-section lines (`hero-effects/`, `section-lines/`), later consolidated into one hand-authored full-page design (888c5d6). That design is kept in `page-lines/PageLines.tsx`, switchable via the `ACTIVE` flag in `PageLinesLayer.tsx`.
**Why:** Hand-tuning coordinates per section and breakpoint didn't scale, especially to mobile.

## 2026-09-30 (imported): Re-roll the line pattern on width changes only

**Decision:** The pattern regenerates on debounced resize only when the width changes.
**Why:** Mobile browsers fire `resize` when the address bar shows or hides, which re-rolled the pattern on every scroll.

## 2026-09-30 (imported): `overflow: clip` on the line-art wrapper

**Decision:** `PageLinesLayer` uses `overflow: clip`, not `overflow: hidden`.
**Why:** With `hidden`, the wrapper became a scroll container. Nav-link fragment navigation scrolled it internally, and the user couldn't scroll back.

## 2026-09-26 (imported): Hand-rolled image carousel

**Decision:** Build the modal carousel with `motion` + `lucide-react`.
**Alternatives:** Bring back Embla, which was removed in Phase 4.
**Why:** Avoids re-adding a dependency that had already been dropped.

## 2026-09-28 (imported): Pull LinkLeaf and Weather App from the lineup

**Decision:** Remove both entries from `projects.ts` entirely, not just hide them. Their content is saved in `PROJECT_MODAL_UPDATES.md`.
**Why:** Neither is ready to showcase. LinkLeaf is blocked on René's own repo work.

## 2026-09-30 (imported): Client repo stays unlinked

**Decision:** The Mobile Mechanic Site gets no `codeUrl` unless the client agrees.
**Why:** It's a client deliverable, not a personal project.

## 2026-09-30 (imported): Dropped the reference-site comparison

**Decision:** Skip the planned final review against `ky.fyi` / `refact0r.dev/about`.
**Why:** The design ended up different enough from those references that comparing them no longer helps.

## 2026-09-30: Adopted the STATUS/TODO/decisions workflow

**Decision:** Folded `docs/current-work/STATUS.md` and `TODO.md` into `docs/STATUS.md`, `docs/TODO.md`, and this file. Kept `PROJECT_MODAL_UPDATES.md` as a reference doc and moved it to `docs/`. The old STATUS and TODO files get deleted only once René approves.
**Why:** René's standard `/new-project` layout. The phase checklist was mostly finished history, which git already records.

## 2026-09-30: LinkLeaf shows both lessons-learned stories

**Decision:** LinkLeaf's `lessonsLearned` has two separate paragraphs: the architecture reflection (A), then the `update` name-shadowing bug (B). `lessonsLearned` now accepts `string | string[]`, rendered like `architectureNote`.
**Alternatives:** Pick one, as the handoff planned (René's earlier call on 2026-09-29 was "keep both, don't combine, choose during review"); merge them into one paragraph.
**Why:** René wanted both. One is an architecture learning story and the other is a real bug that got fixed. Separate paragraphs keep them uncombined.

## 2026-09-30: Plain "resume" spelling

**Decision:** Portfolio copy spells it "resume", not "résumé".
**Why:** René prefers the more common American English spelling.

