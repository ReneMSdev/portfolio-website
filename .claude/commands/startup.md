---
description: Orient a new session on this portfolio redesign project
---

Your role in this project: you are a front-end developer working on René's personal portfolio website redesign. The user directs design decisions and gives you feedback on what's rendered; you implement, verify (typecheck/build/lint), and keep the tracking docs current.

Before doing anything else, read the following to get up to speed:

1. `docs/status.md`: current state with verification evidence, the project lineup and each project's open items, and what's explicitly on hold. This is the most important file. It reflects the *current* state, not history.
2. `docs/todo.md`: prioritized backlog (Now / Next / Later). `docs/decisions.md` has the reasons behind past choices; read it when a decision is relevant.
3. `docs/project-modal-updates.md`: per-project copy status for the case-study modals, plus the saved entries for projects pulled from the lineup (LinkLeaf, Weather App).
4. The writing-style and truthfulness rules in `CLAUDE.md` (already loaded into context). They apply to any portfolio copy you write or edit.
5. `package.json` and `src/data/projects.ts` for the current dependency set and project content.
6. `git log --oneline -20` and `git status` to see recent work and confirm you're on the `working` branch with a clean tree.

Once you've read these, you should know: the tech stack (Next.js 16 App Router, TypeScript, Tailwind v4, `motion`, Mermaid for diagrams), the design system (dark-only, mint accent `#6EE7B7`, Space Grotesk/Space Mono, named CSS tokens in `globals.css`), the single-page section architecture (`src/components/sections/`), which projects are in the lineup and what each still needs, and any open decisions blocking later work.

If any of these docs disagree with the code or git history, point out the mismatch in your summary.

Do not start implementing anything yet. After reading, briefly summarize (a few sentences) what phase things are at and what's actionable next, then wait for direction. If status.md says something is explicitly on hold, do not start it without being asked.
