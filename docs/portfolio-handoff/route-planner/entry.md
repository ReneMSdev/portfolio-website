# Portfolio entry: Route Planning App (Route Boss)

Update to the existing `route-planner` entry in `src/data/projects.ts`. Prepared
2026-10-02 from this repo at `main` 56a657c (same tree as `working` 4f2b143).

## 1. The entry

```ts
{
  slug: 'route-planner',
  title: 'Route Planning App',
  status: 'Live',
  summary:
    'Route optimization web app that finds an efficient stop order and hands the route off to Google Maps or a PDF.',
  description:
    "Route Boss is a route optimization web app: enter or upload a list of stops, and it finds an efficient order and draws the drive on an interactive map. It grew out of a real problem from years of fiber optic field work: a day's list of addresses with no optimized route meant looking each one up individually in Google Maps beforehand. Addresses can be typed in or imported from a CSV or Excel file. Nominatim (OpenStreetMap) geocodes them and OpenRouteService works out the order and the road route. The finished route can be saved as a PDF or opened straight in Google Maps.",
  lessonsLearned:
    'Built early in my self-taught path, one of the first projects I attempted independently outside of guided tutorials, before AI-assisted development matured into the force multiplier it is today. It built real familiarity with UI development and the core patterns behind API integration: requests, responses, and asynchronous operations.',
  stack: [
    'Next.js 15 App Router',
    'React 19',
    'JavaScript',
    'Tailwind CSS v4',
    'shadcn/ui',
    'Leaflet (react-leaflet)',
    'Nominatim / OpenStreetMap',
    'OpenRouteService',
    'react-dropzone',
    'SheetJS (xlsx)',
    'Papa Parse',
    'dnd-kit',
    'jsPDF',
    'next-qrcode',
    'Vercel',
  ],
  images: [
    '/img/route-planner/route-planner-1.jpg',
    '/img/route-planner/route-planner-2.jpg',
    // '/img/route-planner/route-planner-3.jpg': phone composite, to be built in the
    // portfolio session from route-planner-mobile-stops.jpg and -mobile-map.jpg
  ],
  demoUrl: 'https://route-planner-nextjs.vercel.app/',
  demoNote:
    'Runs on free API tiers, so it is limited to US addresses and 25 stops per route. Each visitor is rate-limited, and optimizing can be slow when OpenRouteService is busy.',
  codeUrl: 'https://github.com/ReneMSdev/route-planner-nextjs',
  architectureNote: [
    "The browser never calls the geocoder or the router itself. Three Next.js server routes proxy them, which keeps the OpenRouteService key on the server. Each route first checks that the request comes from the app's own origin, then applies a per-visitor limit of 10 requests a minute and 100 a day to protect the free API quotas.",
    "Nominatim's usage policy shaped the geocode route. Lookups run one at a time with at least 1.1 seconds between them, and results are cached. Only the OpenStreetMap map tiles load directly from the browser. On phones the two-column layout turns into a Stops and Map switch, and the export dialog leads with an Open in Google Maps button, since a phone can't scan its own QR code.",
  ],
  architectureDiagrams: [
    {
      title: 'System overview',
      chart: `flowchart LR
  subgraph Browser
    UI["page.js<br/>(state + route building)"]
    Form["AddressForm / ImportForm"]
    Map["MapDisplay<br/>(Leaflet)"]
    Export["ExportModal<br/>(jsPDF, next-qrcode)"]
    Form --> UI
    UI --> Map
    UI --> Export
  end

  subgraph Vercel["Next.js server routes (src/app/api)"]
    Guard["apiGuard<br/>same-origin + per-IP limit"]
    Geo["/api/geocode<br/>1.1 s queue, cache, max 25"]
    Opt["/api/optimize"]
    Route["/api/route<br/>snap radius 1 km"]
    Valid["routeInput<br/>profile + coordinate checks"]
    Guard --> Geo
    Guard --> Opt
    Guard --> Route
    Opt -.-> Valid
    Route -.-> Valid
  end

  Nominatim[("Nominatim<br/>OpenStreetMap geocoder")]
  ORS[("OpenRouteService<br/>optimization + directions")]
  Tiles[("tile.openstreetmap.org<br/>map tiles")]
  GMaps[("Google Maps<br/>(link or QR code)")]

  UI -- "POST JSON" --> Guard
  Geo -- "no key" --> Nominatim
  Opt -- "ORS_API_KEY" --> ORS
  Route -- "ORS_API_KEY" --> ORS
  Map -- "tile images, direct" --> Tiles
  Export -. "URL only" .-> GMaps

  classDef external fill:#2a1f14,stroke:#e8a659,color:#f2f2f0
  class Nominatim,ORS,Tiles,GMaps external`,
    },
    {
      title: 'Building a route',
      chart: `sequenceDiagram
  autonumber
  actor User
  participant Page as page.js
  participant G as /api/geocode
  participant O as /api/optimize
  participant R as /api/route
  participant N as Nominatim
  participant ORS as OpenRouteService

  User->>Page: Submit or Generate Random Route
  Page->>Page: loading on (spinner, form locked)
  Page->>G: addresses (up to 25)
  rect rgb(42, 31, 20)
    loop each address, at least 1.1 s apart (cached results skip the call)
      G->>N: search (limit 1, US only)
      N-->>G: lat/lng or nothing
    end
  end
  G-->>Page: [lat, lng] or null per address
  Note over Page: Fewer than 2 found: clear route, stop
  Page->>O: coordinates of the found stops
  rect rgb(42, 31, 20)
    O->>ORS: /optimization (one vehicle, starts at the first found stop)
    ORS-->>O: visit order
  end
  O-->>Page: stepIds (falls back to input order on error)
  Page->>Page: reorder stops, draw markers A, B, C...
  Page->>R: coordinates in route order
  rect rgb(42, 31, 20)
    R->>ORS: /v2/directions/driving-car/geojson (radiuses 1000 m)
    ORS-->>R: road geometry
  end
  R-->>Page: polyline
  Page->>Page: draw route line, loading off
  Page-->>User: alert for anything that needs attention`,
    },
  ],
}
```

### Changes from the current portfolio entry

```diff
  slug, title, demoUrl, codeUrl, lessonsLearned: unchanged
- status: 'Demo (mock data)'
+ status: 'Live'
- summary: 'Route optimization app with map visualization and PDF/QR export.'
+ summary: (rewritten: Google Maps handoff added)
- description: "...geocodes using OpenCage, optimizes with OpenRouteService, and lets users export their route as a PDF or mobile-friendly QR code."
+ description: (first sentence rewritten; Why sentence kept word for word; OpenCage replaced by Nominatim, CSV becomes CSV or Excel, QR becomes "opened straight in Google Maps")
- stack: 'Next.js 13 App Router', 'Tailwind CSS', 'ShadCN UI', 'Leaflet.js', 'OpenCage', 'xlsx'
+ stack: 'Next.js 15 App Router', 'JavaScript', 'Tailwind CSS v4', 'shadcn/ui', 'Leaflet (react-leaflet)', 'Nominatim / OpenStreetMap', 'SheetJS (xlsx)', 'Papa Parse', 'dnd-kit', 'Vercel'
  (React 19, OpenRouteService, react-dropzone, jsPDF, next-qrcode kept)
- images: ['/img/route-planner/routeplanner1.jpg', '/img/route-planner/routeplanner2.jpg']
+ images: route-planner-1.jpg, route-planner-2.jpg (new, exactly 16:9 at 1344×756); route-planner-3.jpg to come (phone composite, built in the portfolio session)
- imagePosition: 'center'
+ (removed: the new images are exactly 16:9, so nothing is cropped)
- demoNote: 'Demo Mode — uses cached/mock route data to avoid live API cost.'
+ demoNote: (rewritten: there is no mock mode; it runs on free tiers with real limits)
+ architectureNote: (new, 2 paragraphs)
+ architectureDiagrams: (new: System overview, Building a route)
```

The old `demoNote` was not true of the current app: there is no demo or mock
mode in the code, and `git log -S DEMO_MODE` and `git log -G "mock|Mock" -- src`
find none in the history either. The deployed site makes real API calls.

### Images

| File | Size | What it shows |
|---|---|---|
| `route-planner-1.jpg` | 1344×756, 148 KB | Desktop: a 5-stop Bay Area route (Sausalito, Twin Peaks, Ferry Building, Oakland, Berkeley) drawn on the map, with the stop list and buttons. Card thumbnail |
| `route-planner-2.jpg` | 1344×756, 97 KB | Desktop: the Export dialog (Download PDF, Open in Google Maps, QR code) over the same route |
| `route-planner-mobile-stops.jpg` | 500×757, 40 KB | Phone layout, Stops view: the 5 stops in route order. Not for the `images` array as is; source for the `route-planner-3.jpg` composite |
| `route-planner-mobile-map.jpg` | 500×757, 67 KB | Phone layout, Map view: the same route with the floating Export button. Source for the composite |

All taken 2026-10-02 from the live site (https://route-planner-nextjs.vercel.app)
in Chrome, JPEG quality 80. The desktop shots are from a 1440×757 viewport,
cropped on the right to exactly 16:9; the OpenStreetMap attribution was moved
back onto the cropped edge so the credit stays visible. In image 2 the mouse
cursor sat over the attribution, so it uses image 1's attribution, darkened to
match the dialog backdrop. Stops are public landmarks from
the app's demo list, so no personal data is shown.

## 2. Sources

| Claim | Backed by |
|---|---|
| Why: fiber optic field work, looking up each address in Google Maps | René, in the current portfolio entry (kept word for word) |
| Typed in or imported from CSV or Excel | `src/components/ImportForm/ImportForm.jsx` (accepts `.csv`, `.xls`, `.xlsx`), `parseFile.js` (Papa Parse, SheetJS) |
| Nominatim geocodes, OpenRouteService orders and routes | `src/app/api/geocode/route.js`, `src/app/api/optimize/route.js`, `src/app/api/route/route.js`; `docs/decisions.md` 2026-10-01 |
| Saved as a PDF or opened in Google Maps; QR code | `src/utils/downloadRoutePdf.js` (jsPDF), `src/utils/generateGoogleMapsUrl.js`, `src/components/ExportModal.jsx` (next-qrcode). René, 2026-10-02: on an iPhone the Open in Google Maps button opens the Google Maps app, and the desktop QR code scans |
| US addresses only, 25 stops | `countrycodes` and `MAX_ADDRESSES = 25` in `api/geocode/route.js`; `MAX_STOPS` in `src/lib/routeInput.js` |
| Same-origin check; 10/minute and 100/day per visitor | `src/lib/apiGuard.js` (`LIMITS`) |
| Lookups one at a time, at least 1.1 s apart, cached | `MIN_INTERVAL_MS = 1100` and the cache in `api/geocode/route.js` |
| Key stays on the server; only map tiles load directly | `ORS_API_KEY` read only in `src/app/api/`; tile URL in `src/components/MapDisplay/MapDisplay.js`; `ARCHITECTURE.md` |
| Phone layout: Stops and Map switch; Google Maps first, QR hidden on phones | `src/app/page.js`, `src/components/ExportModal.jsx`; René checked production on an iPhone (2026-10-02) |
| "Can be slow when OpenRouteService is busy" | Observed: `/api/optimize` took about 40 s on production on 2026-10-02 and 15.2 s on 2026-10-01 (`docs/todo.md`) |
| Live and working end to end | Production on 2026-10-02: two route builds, `/api/geocode`, `/api/optimize`, `/api/route` all HTTP 200, route drawn; Vercel Production deploy `success` for 864dc59 |
| Stack versions | `package.json` and installed `node_modules`: next 15.5.27, react 19.1.0, tailwindcss 4.1.6, leaflet 1.9.4, react-leaflet 5.0.0, jspdf 4.2.1, next-qrcode 2.5.1, xlsx 0.18.5, papaparse 5.5.2, react-dropzone 14.3.8, @dnd-kit/core 6.3.1 |
| Diagrams | Copied from `ARCHITECTURE.md` (written from the code on 2026-10-01 and kept current). Changes: the handoff's `external` class and amber `rect` blocks added, and the Google Maps node label shortened to "(link or QR code)". Both parsed and rendered with Mermaid 11 (dark theme) in Chrome on 2026-10-02 |
| `codeUrl` is safe to link | `gitleaks detect --log-opts=--all`: no leaks (8.30.1, 2026-10-02); no `.env` file was ever committed; the only key-like strings in history are placeholders such as `your_opencage_api_key` |

## 3. Unverified or illustrative

- **The phone screenshots** are uncropped 500×757 captures (portrait, not 16:9),
  saved straight from Chrome without recompressing, for the portfolio session to
  compose into `route-planner-3.jpg` on a background that matches the site.
  Chrome's narrowest viewport here was 500px, a little wider than a real phone,
  but it is the app's real phone layout (below 768px).
- **"Three Next.js server routes"** counts the routes the app uses. A fourth,
  `/api/autocomplete`, is unused leftover code (still targeting OpenCage) with no
  origin check or rate limit; deleting it is in `docs/todo.md`.
- **The diagrams** are traced from the code, not illustrative, but the "System
  overview" is dense at 800px wide; the lightbox should make it readable.

## 4. Open questions for René (resolved)

All answered by René on 2026-10-02:

1. **Status:** `'Live'` is correct.
2. **Lessons Learned:** keep the current text. (The provider-switch story was
   offered as an alternative and declined.)
3. **Three-item list** in the current `lessonsLearned`: fine here, keep it.
4. **Title:** keep "Route Planning App".

## 5. Changes made to this repo

For this handoff, only this `portfolio-handoff/` folder was added. The app-side
work the brief asked for was done earlier, in the 2026-10-01 and 2026-10-02
sessions:

- **What broke:** OpenCage rejected the production key (401, 2026-09-30) and
  CARTO's basemaps started requiring a key (blank map, 2026-10-01).
  OpenRouteService still works on its free key.
- **What was chosen:** switch providers rather than add a demo mode. Geocoding
  moved to Nominatim and tiles to OpenStreetMap, both keyless; ORS kept, its key
  server-side (`docs/decisions.md`).
- Since then: input validation on the ORS routes, abuse protection, a loading
  state, the phone layout, the Open in Google Maps button, a scroll fix for
  iPhone, and a new favicon. All are in production at 56a657c.

**Bug found while taking the screenshots (not fixed):** with a route on the map,
resizing from the desktop layout to the phone layout while the Stops view is
showing leaves the Map view zoomed all the way in on empty water. Rotating a
phone from landscape to portrait can trigger it. It's already listed in
`docs/todo.md` (from the 2026-10-02 verifier review) and doesn't affect the
normal flow.
