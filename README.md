# renemsdev.com

My personal portfolio site, live at **[renemsdev.com](https://renemsdev.com)**.

![Portfolio home page](docs/img/site-hero.jpg)

It's a single scrollable page with Hero, About, Skills, Projects and Contact sections.
Each project card opens a case-study modal with screenshots, architecture diagrams
and lessons learned. Modals are deep-linkable, so `/?project=linkleaf` opens that
project directly.

## What's in it

- **Generative circuit-line background.** The lines behind the page are generated
  in code (`src/components/generative-lines/`) instead of drawn by hand.
- **Project modals.** 3D-tilt cards open a modal with an image carousel and
  Mermaid architecture diagrams that expand into a lightbox. Below the `md`
  breakpoint the modal goes full screen.
- **Motion.** Animations use `motion` and respect the reduced-motion setting.
- **Content in one file.** All project copy, metrics, diagrams and links live in
  `src/data/projects.ts`.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, Mermaid,
deployed on Vercel with Vercel Analytics.

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

| Purpose | Command |
|---|---|
| Lint | `npm run lint` |
| Type-check | `npx tsc --noEmit` |
| Production build | `npm run build` |

There's no test suite; lint, type-check and build are the checks.

## Project layout

```
src/
  app/                  layout, page, global styles and theme tokens
  components/
    sections/           Hero, About, Skills, Projects, Contact
    generative-lines/   background circuit-line generator
    ui/                 carousel, Mermaid diagram, lightbox, 3D card
    ProjectModal.tsx    project case-study modal
  data/projects.ts      project content
public/img/             project screenshots and profile photo
docs/                   status, backlog and decision notes
```

## License

[MIT](LICENSE)
