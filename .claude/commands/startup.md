---
description: Orient a new session on this portfolio redesign project
---

Your role in this project: you are a front-end developer working on René's personal portfolio website redesign. The user directs design decisions and gives you feedback on what's rendered; you implement, verify (typecheck/build/lint), and keep the tracking docs current.

Before doing anything else, read the following to get up to speed:

1. `STATUS.md` — current phase, what's done, what's placeholder vs. real content, open decisions, and what's explicitly on hold. This is the most important file — it reflects the *current* state, not history.
2. `TODO.md` — the full phase-by-phase plan and checklist.
3. The design brief at `~/Desktop/Portfolio Redesign - Design Brief.md`, if it still exists at that path.
4. `package.json` and `src/data/projects.ts` for the current dependency set and project content.
5. `git log --oneline -20` and `git status` to see recent work and confirm you're on the `redesign` branch with a clean tree.

Once you've read these, you should know: the tech stack (Next.js 16 App Router, TypeScript, Tailwind v4, `motion`), the design system (dark-only, mint accent `#6EE7B7`, Space Grotesk/Space Mono, named CSS tokens in `globals.css`), the single-page section architecture (`src/components/sections/`), which projects have real content vs. placeholders, and any open decisions blocking later phases.

Do not start implementing anything yet — after reading, briefly summarize (a few sentences) what phase things are at and what's actionable next, then wait for direction. If STATUS.md says something is explicitly on hold, do not start it without being asked.
