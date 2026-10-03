# TODO

## Now
<!-- What's actively being worked on. Keep this to a few items. -->
- [ ] Phase 7: VoiceOver pass with René (Claude can write the checklist)
- [ ] Phase 7: look at the site in real Safari, desktop and ideally iPhone (Playwright WebKit is the same engine but not Safari itself; also covers diagram labels sized in Chrome)
- [ ] Merge `working` into `main`: `main` is at b08811c, so the trope-sweep copy, card title button, new-tab labels and `<header>` (b24e7c7..0a368f4) aren't live yet

## Next
<!-- Planned soon, in priority order. -->
- [ ] Weather App: produce a real entry via the handoff brief, or drop it
- [ ] LinkLeaf lesson B: add how the `update` bug was tracked down with the agent, if René remembers the details

## Later
<!-- Ideas and deferred scope. It's fine for items to sit here. -->
- [ ] Perf, optional: mobile TBT is 200-340 ms (Lighthouse simulated) to 370-470 ms (applied throttling), mostly hydration (React plus Motion). Sections that only use Motion for a fade-in could become server components with CSS fades, like Hero
- [ ] Add a test suite or CI if the site grows past content changes

## Done recently
<!-- /wrapup moves finished items here with a date. Keep about the last 10. -->
- [x] Phone top bar is a `<header>`; automated scan: axe-core across 13 states, Lighthouse accessibility 100/100 (2026-10-03, 0a368f4)
- [x] New-tab links announce "(opens in new tab)" via a shared `ExternalLink` (2026-10-03, 5d9a988)
- [x] Project card title is the button, so titles are headings again; cards pixel-identical (2026-10-03, da143c2)
- [x] AI-trope sweep: René picked the copy fixes; Resume Builder metric tiles dropped (2026-10-03, b24e7c7)
- [x] Diagrams pre-rendered to static SVG, Mermaid out of the client; pushed and `main` fast-forwarded to it (2026-10-02, b08811c)
- [x] Performance check: CSS hero fade (throttled mobile LCP 4.6-5.3 s -> 1.7-2.4 s), lazy card images (2026-10-02, 428f7a2)
- [x] Cross-browser check (Chrome, Firefox, WebKit); fixed the clipped diagram-lightbox close button (2026-10-02, 13b3db6)
- [x] Phase 7 accessibility pass: focus ring, skip link, headings, landmarks, mobile menu, lightbox dialog (2026-10-02, 6811eb3)
- [x] README replaced, with hero screenshot (2026-10-02, 80c0156)
- [x] Resume Builder `lessonsLearned` written from René's lessons; real-phone modal check done by René (2026-10-02, c36442e)
