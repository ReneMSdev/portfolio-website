# Portfolio handoff: project modal entry

**For a Claude Code session running inside a project's own repo.** Copy this file
into that repo, then tell the session: *"Read PORTFOLIO_HANDOFF.md and follow it for
<project name>."* The shared sections apply to every project. Find your project's
section under [Per-project briefs](#per-project-briefs).

## Context

René's portfolio site (`ReneMSdev/portfolio-website`: Next.js 16, TypeScript,
Tailwind v4, dark-only with a mint `#6EE7B7` accent) has a project grid, and each card
opens a case-study modal. Every modal is driven by one object in the portfolio's
`src/data/projects.ts`. Your job is to produce that object for this project, based on
what this repo actually contains, plus the screenshots and diagrams it needs.

**Do not edit the portfolio repo.** Everything you produce goes into this repo
(see [Deliverable](#deliverable)); a separate session in the portfolio repo imports it.

## The data model

This is the exact type your entry must satisfy:

```ts
export interface ProjectMetric {
  label: string
  value: string
}

export interface ArchitectureDiagram {
  title: string
  chart: string // Mermaid source
}

export interface Project {
  slug: string
  title: string
  status: string
  summary: string
  description: string
  stack: string[]
  images?: string[]
  imagePosition?: 'center' | 'top'
  demoUrl?: string
  demoNote?: string
  codeUrl?: string
  metrics?: ProjectMetric[]
  architectureDiagrams?: ArchitectureDiagram[]
  architectureNote?: string | string[]
  lessonsLearned?: string
}
```

## How it renders

**Grid card:** first image (16:9, cropped), `status`, `title`, `summary`.

**Modal, top to bottom.** Every optional field is skipped when empty, so leave a field
out rather than padding it.

| # | Section | Field | Guidance |
|---|---|---|---|
| 1 | Header | `status`, `title` | `status` is a short mono label (`Live`, `Demo`, `Demo (mock data)`, `Paused`, `Not live`). Exactly `'Live'` makes the demo button read "View Live Site" instead of "View Demo". |
| 2 | Image carousel | `images`, `imagePosition` | 16:9 frame, `object-cover`. Crops to the **top** by default; `'center'` overrides. One image renders static; 2+ get prev/next and dots. |
| 3 | Description | `description` | The main paragraph. Follows the [narrative framework](#narrative-framework). Roughly 60–110 words. |
| 4 | Metric tiles | `metrics` | Big mint number plus a small uppercase label, in a row. 1–3 tiles, only for numbers that are real and checkable. Most projects have none. |
| 5 | Diagrams | `architectureDiagrams` | Titled Mermaid diagrams, click to enlarge, carousel between them in the lightbox. See [Diagram conventions](#diagram-conventions). |
| 6 | "Architecture" | `architectureNote` | Italic. A string, or an array of strings for multiple paragraphs. How the system is put together and why it's shaped that way. |
| 7 | "Lessons Learned" | `lessonsLearned` | One paragraph. A real problem hit during development and how/why it was solved. **Not** a description of intended behavior or a design choice with no story behind it. |
| 8 | "Built with" | `stack` | Rendered as one comma-separated line. Include versions where they're meaningful (`Next.js 16`, `Python 3.13`). Only list what's actually in the dependencies/code. |
| 9 | Demo note | `demoNote` | Small italic caveat above the links (e.g. what's mocked or disabled in the demo). |
| 10 | Links | `demoUrl`, `codeUrl` | Omit rather than use `#`. Never link a repo that isn't public or that contains secrets in its history. |

`slug` is kebab-case and becomes the deep link (`/?project=<slug>`), so keep an
existing slug unchanged.

### A finished example

This is the Mobile Mechanic Site entry, a short one that's fully done:

```ts
{
  slug: 'mobile-mechanic',
  title: 'Mobile Mechanic Site',
  status: 'Live',
  summary:
    'Marketing site for ATX Reliable Wrenching, an Austin mobile mechanic — booking via Housecall Pro, contact form, and Google reviews.',
  description:
    'A production marketing site for ATX Reliable Wrenching, a mobile mechanic serving the Greater Austin area. The single responsive page presents their services and Google reviews, routes booking through Housecall Pro, and includes a contact form that emails the business through a serverless API route.',
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Embla Carousel', 'Nodemailer', 'Vercel'],
  architectureNote:
    'A single Next.js page with one serverless API route for the contact form, emailing the business via SMTP. Booking is handled entirely by linking out to Housecall Pro rather than building scheduling in-house.',
  lessonsLearned:
    "The site's signature look comes from angled diagonal panels across the welcome bar, nav logo, mobile header, and hero overlay, all meant to share one consistent cut. With fixed pixel offsets, the angles would stray from each other and the design would fall apart at different sizes, since an angle depends on both the offset and the element's height. The fix came from trigonometry: pick one shared angle, 25°, and have each panel compute its own offset from it using height × tan(25°), so every diagonal stays consistent regardless of screen size.",
  images: ['/img/mobile-mechanic/mobile-mechanic-1.jpg'],
  demoUrl: 'https://www.atxreliablewrenching.com/',
}
```

Note how the `lessonsLearned` is a concrete problem with a concrete fix, pulled from
the actual codebase. That's the bar.

## Narrative framework

Cover these, roughly in order, across `description`, `architectureNote`, and
`lessonsLearned`:

1. **Why:** the reason it exists (a real need, a learning goal, client work, a product
   attempt). One sentence is usually enough. If you can't tell from the repo, **ask
   René**; don't invent a motive.
2. **What:** one clause identifying what it is.
3. **How:** the interesting technical substance: `description`, `architectureNote`,
   `lessonsLearned`, `stack`, diagrams.
4. **Results:** only if there's something real and specific (users, usage, outcomes).
   Most projects won't have this; leave it out rather than force it.

## Writing rules

These are copied from the portfolio repo's `CLAUDE.md` and apply to every string in
the entry.

### Read like a person, not an AI

- Avoid an em dash joining two independent clauses within a sentence, where each side
  has its own subject and verb. Use a period, comma, or restructure instead.
- An em dash (or hyphen) separating short labels or fragments with no clause structure
  is fine: date ranges, a role and location, or similar short juxtapositions.
- Test: if each side could stand alone as a complete sentence, split it. If neither
  side is a full clause, leave it.
- Avoid overused AI words: "leverage," "seamlessly," "robust," "delve into,"
  "cutting-edge," "dynamic," and similar.
- No three-item lists used for effect ("fast, reliable, and scalable").
- Don't start consecutive sentences/paragraphs the same way (e.g., "Built..." twice in
  a row).
- Vary sentence rhythm and structure the way a person naturally would.

### Truthfulness

- Don't state skills, numbers, achievements, or experience that aren't real or
  verifiable. Every claim should trace back to something in the repo or something
  René told you directly.
- Anything René states directly in conversation counts as fact and can be used.
- Leave something out or ask, rather than guess or round up.
- Flag when a claim is unverified (e.g., a feature that's built but not tested against
  real-world use) rather than implying it's proven.
- René may explicitly override this for a specific piece of copy. That only applies
  when René says so for that specific instance. Never infer it or carry it forward.

## Diagram conventions

- Mermaid only (`flowchart LR`, `sequenceDiagram`, etc.). The portfolio renders them
  with a dark theme, so don't set a theme or `%%{init}%%` block.
- **Draw from the code, not from imagination.** If the repo already has diagrams in a
  README or ARCHITECTURE.md, reuse them. If you draw one that's partly illustrative
  (e.g. a flow you inferred rather than traced), say so in the deliverable.
- Prefer several focused diagrams (overall architecture, one key flow) over one dense
  one. Nodes stay readable at roughly 800px wide; the lightbox handles detail.
- Use `<br/>` for line breaks in node labels. Keep labels short: component name plus
  a parenthetical detail.
- Color-code with these existing classes; leave app code unstyled (default):

  ```
  classDef external fill:#2a1f14,stroke:#e8a659,color:#f2f2f0
  classDef storage fill:#16202a,stroke:#7ea6c9,color:#f2f2f0
  ```

  `external` is for third-party APIs/services, `storage` for databases, disks, and
  buckets. In sequence diagrams, wrap external-call segments in
  `rect rgb(42, 31, 20) ... end`. If the project needs a category these don't cover
  (auth/identity, a mobile client, device integration), propose a new `classDef`
  in the same muted-fill/bright-stroke style and call it out in the deliverable.
- Test that each diagram parses (e.g. paste it into mermaid.live or run the Mermaid
  CLI if available) before handing it over.

## Screenshots

- Take them from the running app, at a desktop viewport around 1440–1600px wide.
  The frame is 16:9 and crops to the top by default, so put the important part near
  the top of the shot, or plan to use `imagePosition: 'center'`.
- 1–4 images. The first one is the grid card thumbnail, so make it the most
  representative view.
- Compress before handing over: max 1600px wide, JPEG quality ~80 (e.g.
  `sips -Z 1600 -s format jpeg -s formatOptions 80 in.png --out out.jpg` on macOS).
  Existing images are 60–460KB.
- Name them `<slug>-1.jpg`, `<slug>-2.jpg`, … Their portfolio paths will be
  `/img/<slug>/<slug>-N.jpg`; use those paths in the entry's `images` array.
- No real personal data (names, emails, phone numbers, contacts) visible. Use
  seed/demo data.

## Deliverable

Put everything in a `portfolio-handoff/` folder at this repo's root:

```
portfolio-handoff/
  ENTRY.md          # the entry and its supporting notes (below)
  <slug>-1.jpg      # compressed screenshots
  <slug>-2.jpg
```

`ENTRY.md` contains, in this order:

1. **The entry:** one complete TypeScript object literal, ready to paste into
   `projects.ts`.
2. **Sources:** a short table mapping each factual claim (stack items, numbers,
   architecture statements, the lessons-learned story) to the file(s) or command
   output that backs it, or to "René said so."
3. **Unverified or illustrative:** anything drawn or stated without full
   verification.
4. **Open questions for René:** anything you had to leave out because you couldn't
   confirm it, especially the Why.
5. **Changes made to this repo:** if the brief asked for app-side work (fixes,
   demo mode, README), list what changed.

Before finishing, check every string in the entry against the writing rules once
more. The em dash test and the no-guessing rule are the ones most often missed.

---

## Per-project briefs

### LinkLeaf

**Status in the portfolio:** done. Imported into the lineup on 2026-09-30 from
`docs/portfolio-handoff/linkleaf/ENTRY.md`. Slug: `linkleaf`.

**What's known (from René, not yet verified against the code):** a link-in-bio
platform. More complex than the other projects: a FastAPI backend, auth, QR code
generation, a Dart/Flutter mobile frontend, and phone-contact syncing (the code turned out to
have a one-way vCard "Save Contact" download instead, not syncing). Earlier notes
also list PostgreSQL, Google Cloud Storage, and RevenueCat. It only runs in local
development and isn't deployed anywhere. A marketing page was planned but never
built. The project is paused.

**Last portfolio entry (placeholder, don't reuse as-is):**

```ts
{
  slug: 'linkleaf',
  title: 'LinkLeaf',
  status: 'Paused',
  summary: 'This project is coming soon.',
  description:
    'LinkLeaf is a link-in-bio platform. The backend MVP is complete with 122 passing tests, but the project is currently paused, so this is framed as an architecture case study rather than a live demo.',
  stack: ['FastAPI', 'PostgreSQL', 'Google Cloud Storage', 'RevenueCat'],
  metrics: [{ label: 'Tests passing', value: '122' }],
  architectureNote: 'Architecture diagram and detailed write-up coming soon.',
  codeUrl: '#',
}
```

**What this session should do:**

1. Get the app running locally (backend, and the Flutter client if feasible). Note
   anything that had to be fixed to get it running.
2. **Re-verify the "122 passing tests" number by actually running the test suite.**
   Use whatever the real count is, or drop the metric if tests don't pass.
3. With René, clean up whatever would embarrass a reviewer reading the code (dead
   code, leftover debug output, missing README). Ask before large refactors.
4. Write a real README / ARCHITECTURE.md with Mermaid diagrams: overall architecture,
   the auth flow, and the QR / Save Contact flow as separate diagrams. These can be
   reused in the portfolio entry.
5. Screenshots of both the web and mobile UI where they exist, using seed data.
6. If the repo is to be linked, check its full git history for secrets (e.g.
   `gitleaks detect`) before proposing a `codeUrl`, and confirm with René that it
   should be public.
7. Produce the deliverable. The framing is an architecture case study of a paused
   project, not a live product. Leave out `demoUrl` unless something is deployed.

**Open questions to ask René:** Was LinkLeaf a real product attempt or a learning
project? Why was it paused? Which subsystem is René proudest of (that's likely the
lessons-learned story)?

### Weather App

**Status in the portfolio:** removed from the lineup until it has real content.
Previous slug: `weather-app`.

**What's known:** a weather app built with Next.js and Node. Not currently live.
The old copy framed it apologetically ("out of scope… minimal reference"), which is
what needs replacing.

**Last portfolio entry (placeholder, don't reuse as-is):**

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
}
```

**What this session should do:**

1. Figure out what the app actually does and why it isn't live (dead API key, broken
   build, deploy config?). Report this before fixing anything.
2. Ask René whether the goal is to get it live again or to present it as-is. If live:
   make it work without a paid or personal API key exposed to the browser (a free
   tier with a server-side key, or a demo mode with bundled sample data like the
   Resume Builder's `NEXT_PUBLIC_DEMO_MODE` approach).
3. Work out the honest Why: what was it built to practice or prove? Look at the
   git history (first commits, dates) and ask René. This replaces the apologetic
   framing, the same way Route Planner's Why came from a real fiber-field-work
   problem.
4. Screenshots, a secrets check on the git history if `codeUrl` will be public, and
   the deliverable. A diagram is optional here; include one only if the data flow is
   interesting enough to earn it.

### Route Planning App (Route Boss)

> **Done (2026-10-02, fd4230c).** This brief was completed. The current entry and its
> sources are in `docs/portfolio-handoff/route-planner/ENTRY.md`; the entry quoted below
> is the old one, kept for history.

**Status in the portfolio:** in the lineup, with complete copy. Slug:
`route-planner`; keep it.

**The problem:** a routing/geocoding API key the app depends on is no longer
available for free, so the app (and possibly the public demo) no longer works as
described. The current `demoNote` says the demo uses cached/mock route data, but
that needs checking against what the deployed demo actually does today.

**Current portfolio entry:**

```ts
{
  slug: 'route-planner',
  title: 'Route Planning App',
  status: 'Demo (mock data)',
  summary: 'Route optimization app with map visualization and PDF/QR export.',
  description:
    "Route Boss is a route optimization web app where users can input multiple stops, calculate the most efficient path, and visualize their route on an interactive map. It grew out of a real problem from years of fiber optic field work: a day's list of addresses with no optimized route meant looking each one up individually in Google Maps beforehand. It supports manual address entry or CSV upload, geocodes using OpenCage, optimizes with OpenRouteService, and lets users export their route as a PDF or mobile-friendly QR code.",
  lessonsLearned:
    'Built early in my self-taught path, one of the first projects I attempted independently outside of guided tutorials, before AI-assisted development matured into the force multiplier it is today. It built real familiarity with UI development and the core patterns behind API integration: requests, responses, and asynchronous operations.',
  stack: [
    'Next.js 13 App Router',
    'React 19',
    'Tailwind CSS',
    'ShadCN UI',
    'Leaflet.js',
    'OpenCage',
    'OpenRouteService',
    'react-dropzone',
    'xlsx',
    'jsPDF',
    'next-qrcode',
  ],
  images: ['/img/route-planner/routeplanner1.jpg', '/img/route-planner/routeplanner2.jpg'],
  imagePosition: 'center',
  demoUrl: 'https://route-planner-nextjs.vercel.app/',
  demoNote: 'Demo Mode — uses cached/mock route data to avoid live API cost.',
  codeUrl: 'https://github.com/ReneMSdev/route-planner-nextjs',
}
```

**What this session should do:**

1. Find out exactly which service lost its free access (OpenCage geocoding,
   OpenRouteService optimization, or the map tiles) and what currently breaks,
   both locally and on the deployed demo at `https://route-planner-nextjs.vercel.app/`.
   Check how the existing demo/mock mode works and whether it still covers every
   path a visitor can take.
2. Present René with options before changing anything, e.g.:
   - a full demo mode with bundled sample data so the public demo needs no key at
     all (the Resume Builder approach), or
   - switching to a provider that still has a usable free tier, keeping the key
     server-side, or
   - both: the real app on a new provider, the public demo on fixtures.
   Check the usage policies of any free/public service before proposing it.
3. Implement what René picks and confirm the deployed demo works end to end.
4. **Update the entry to stay truthful.** The `description` names OpenCage and
   OpenRouteService, and `stack` and `demoNote` describe the current setup; change
   whichever of these no longer match. Keep the Why (fiber field work) and the
   existing `lessonsLearned` unless René says otherwise. If the fix itself makes a
   good story, mention it in the open questions rather than rewriting
   `lessonsLearned` on your own.
5. The screenshots are 800px wide and predate any changes. Retake them at the
   current spec if the UI changed or if it's cheap to do.
6. Produce the deliverable. For this project, `ENTRY.md` should also show a short
   diff-style list of which fields changed from the current entry.
