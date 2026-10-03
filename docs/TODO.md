# TODO

## Now
<!-- What's actively being worked on. Keep this to a few items. -->
- [x] Phase 7 accessibility pass: focus ring, skip link, headings, landmarks, keyboard-operable mobile menu, lightbox as a real dialog, larger carousel dot targets, reduced-motion Skills typing and scrolling (2026-10-02)
- [ ] Phase 7 a11y follow-ups: project cards use `role='button'`, which hides their `h3` titles from heading navigation (fix: a real `<button>` inside the card, or the title as the button); external links don't say they open a new tab; no screen-reader pass with VoiceOver yet
- [x] Phase 7: cross-browser check (2026-10-02): Chrome 154, Playwright Firefox 155 and WebKit 26.6, desktop and phone sizes. All render and behave the same; one bug found (next item)
- [x] Diagram lightbox close button was clipped (sat at `-top-8` inside the `overflow-auto` panel) in every browser. Moved into the title row; visible and clickable in Chrome, Firefox and WebKit at both sizes, and focus returns to the expand button (2026-10-02)
- [ ] Glance at the site in real Safari (Playwright WebKit is the same engine but not Safari itself)
- [x] Phase 7: performance check (2026-10-02). Hero fade moved from motion to CSS so it doesn't wait for hydration (throttled mobile LCP 4.6-5.3 s -> 1.7-2.4 s); project-card images no longer `priority`, so they lazy-load (initial images 107 KB -> 26 KB). Idle cost zero; scroll and mousemove hold 60 fps at 4x CPU throttle in headless Chrome (no GPU, so real-phone blur cost unverified)
- [ ] Perf follow-up: Mermaid adds about 3 MB of uncompressed JS the first time a project with diagrams opens. Option: render the diagrams to static SVG at build time and drop Mermaid from the client
- [ ] Perf follow-up: TBT of 200-340 ms (Lighthouse simulated) to 370-470 ms (applied throttling) on mobile, mostly hydration (React plus Motion). Option: make sections that only use motion for a fade-in server components with CSS fades, like Hero
- [ ] Phase 7: sweep the copy and design for AI-template tropes
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
