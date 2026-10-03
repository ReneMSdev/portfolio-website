# TODO

## Now
<!-- What's actively being worked on. Keep this to a few items. -->
- [x] Phase 7 accessibility pass: focus ring, skip link, headings, landmarks, keyboard-operable mobile menu, lightbox as a real dialog, larger carousel dot targets, reduced-motion Skills typing and scrolling (2026-10-02)
- [x] Project cards: the title is now the button (`<h3><button>`), the card keeps its click handler, so titles show up in heading navigation again. Cards are pixel-identical before/after (normal, hover, phone) in Chrome, Firefox and WebKit; click, Enter, Space and focus return checked in all three (2026-10-03)
- [x] New-tab links announce it: shared `ExternalLink` adds sr-only "(opens in new tab)" to the 7 external links (nav and mobile-menu GitHub, Contact GitHub/LinkedIn, modal View Demo/Live Site/Code). Screenshots pixel-identical before/after in Chrome, Firefox and WebKit (2026-10-03)
- [ ] Phase 7 a11y follow-ups: automated scan (axe-core + Lighthouse accessibility); VoiceOver pass with René
- [x] Phase 7: cross-browser check (2026-10-02): Chrome 154, Playwright Firefox 155 and WebKit 26.6, desktop and phone sizes. All render and behave the same; one bug found (next item)
- [x] Diagram lightbox close button was clipped (sat at `-top-8` inside the `overflow-auto` panel) in every browser. Moved into the title row; visible and clickable in Chrome, Firefox and WebKit at both sizes, and focus returns to the expand button (2026-10-02)
- [ ] Glance at the site in real Safari (Playwright WebKit is the same engine but not Safari itself)
- [x] Phase 7: performance check (2026-10-02). Hero fade moved from motion to CSS so it doesn't wait for hydration (throttled mobile LCP 4.6-5.3 s -> 1.7-2.4 s); project-card images no longer `priority`, so they lazy-load (initial images 107 KB -> 26 KB). Idle cost zero; scroll and mousemove hold 60 fps at 4x CPU throttle in headless Chrome (no GPU, so real-phone blur cost unverified)
- [x] Diagrams pre-rendered to static SVG (`npm run diagrams` -> `public/diagrams/`), Mermaid dropped from the client: about 3 MB of uncompressed JS no longer loads when a project opens; the 9 SVGs total about 68 KB gzipped. All 27 before/after diagram screenshots (desktop modal, desktop lightbox, phone modal) pixel-identical; the build fails if a chart changes without re-rendering (2026-10-02)
- [ ] Perf follow-up: TBT of 200-340 ms (Lighthouse simulated) to 370-470 ms (applied throttling) on mobile, mostly hydration (React plus Motion). Option: make sections that only use motion for a fade-in server components with CSS fades, like Hero
- [x] Phase 7: AI-trope sweep (2026-10-03). René reviewed the list and picked the fixes: cut most uses of "real" (Hero and the two meaningful ones kept), Mobile Mechanic summary and Housecall Pro line simplified, Contact line rewritten, Resume Builder metric tiles dropped. Design elements kept as deliberate choices
- [ ] Trope follow-ups René hasn't decided on: Route Planning App "force multiplier" clause; Skills tooltips that all follow one adjective-pair formula (rewrite needs a line from René per tool)
- [x] Resume Builder `lessonsLearned`: replace the design-decision note with a real lesson, worked through with René (2026-10-02: prompt rules + prompt caching, from René)

## Next
<!-- Planned soon, in priority order. -->
- [x] Check the project modal on a real phone (last open item from Phase 6). René checked it 2026-10-02: works; diagrams are cramped on a small screen but pinch-zoom covers it, no change planned
- [ ] Weather App: produce a real entry via the handoff brief, or drop it
- [ ] LinkLeaf lesson B: add how the `update` bug was tracked down with the agent, if René remembers the details

## Later
<!-- Ideas and deferred scope. It's fine for items to sit here. -->
- [x] Replace the boilerplate `README.md` (2026-10-02, with hero screenshot at `docs/img/site-hero.jpg`)
- [ ] Add a test suite or CI if the site grows past content changes

## Done recently
<!-- /wrapup moves finished items here with a date. Keep about the last 10. -->
- [x] Route Planning App updated from its handoff (`docs/portfolio-handoff/route-planner/ENTRY.md`): Nominatim replaces OpenCage, status `Live`, new stack and `demoNote`, two diagrams, three new screenshots including a phone composite (2026-10-02)
- [x] Mobile Mechanic screenshot replaced with a current hero capture showing the diagonal panels (2026-09-30)
- [x] Pushed `working` and fast-forwarded `main` to it, bringing LinkLeaf to `main` (2026-09-30, 8f20d83)
- [x] Browser check of the LinkLeaf modal (2026-09-30, 792d9ea)
- [x] LinkLeaf back in the lineup with its full case study; `lessonsLearned` accepts multiple paragraphs (2026-09-30, 41ac13b)
- [x] Set up STATUS/TODO/decisions tracking, project settings, and `CLAUDE.md` project section (2026-09-30, 8deed5d)
- [x] Portfolio handoff folder with the LinkLeaf entry (270f2b1)
- [x] Removed LinkLeaf and Weather App from the visible lineup (2026-09-28, db4383d)
- [x] Split Resume Builder's architecture note into two paragraphs (6bfc5b0)
- [x] Project modal: Mermaid diagrams, diagram lightbox, image carousel, mobile full-screen layout (2026-09-26)
