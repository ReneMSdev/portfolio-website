export interface ProjectMetric {
  label: string
  value: string
}

export interface ArchitectureDiagram {
  title: string
  chart: string
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
  lessonsLearned?: string | string[]
}

// Project lineup shown in the grid. Copy follows the writing-style rules in
// CLAUDE.md; per-project copy status lives in PROJECT_MODAL_UPDATES.md.
export const projects: Project[] = [
  {
    slug: 'resume-builder',
    title: 'Resume Builder',
    status: 'Demo',
    summary: 'AI-assisted resume and cover-letter generation, plus automated application form-fill.',
    description:
      'Built to speed up my own job search. I use it for real resume and cover letter generation, tailored to each job description, with an integrated chat interface for iteratively revising individual sections or bullets. A separate automation layer, still in active development, orchestrates Claude Code and a dedicated Claude-in-Chrome agent to fill out job application forms from the saved application data. It fills the form but never submits it.',
    metrics: [
      { value: '2', label: 'Coordinated AI agents' },
      { value: '$0', label: 'Demo hosting cost' },
    ],
    architectureDiagrams: [
      {
        title: 'Request flow (generation, revision, Auto Apply)',
        chart: `sequenceDiagram
    participant U as User
    participant F as Next.js Frontend
    participant B as FastAPI Backend
    participant C as Claude API
    participant CC as Claude Code
    participant CIC as Claude in Chrome

    U->>F: Select saved application + job URL
    F->>B: Request tailored resume/cover letter
    rect rgb(42, 31, 20)
        B->>C: Generate content (prompt caching)
        C-->>B: Tailored resume + cover letter
    end
    B-->>F: Return generated content
    U->>F: Select section/bullet, request revision (chat)
    F->>B: Scoped revision request
    rect rgb(42, 31, 20)
        B->>C: Revise selected content only
        C-->>B: Revised section
    end
    B-->>F: Updated content

    rect rgb(42, 31, 20)
        U->>CC: Trigger Auto Apply
        CC->>CIC: Launch agent, direct to application URL
        CIC->>B: Pull saved application data
        CIC->>CIC: Fill form fields (no submit)
    end`,
      },
      {
        title: 'Local full-stack (real app)',
        chart: `flowchart LR
    UI["Next.js App<br/>(localhost:3000)"]

    subgraph Backend["FastAPI Backend (localhost:8000)"]
        Routes["Routes<br/>/health /profile /generate<br/>/revise /render /applications"]
        LLM["llm.py<br/>(generate + revise prompts,<br/>prompt caching)"]
        RenderSvc["render.py<br/>(docx templating)"]
        Guard["usage_guard.py<br/>(daily call cap,<br/>input-length guard)"]
    end

    Anthropic[("Anthropic API<br/>claude-sonnet-4-6")]
    LibreOffice[("LibreOffice<br/>(headless, docx→pdf)")]
    Disk[("Local disk<br/>app/data/profile.json<br/>app/data/applications/*")]

    UI -->|"fetch(NEXT_PUBLIC_API_URL)"| Routes
    Routes --> LLM
    Routes --> RenderSvc
    LLM --> Guard
    LLM -->|"generate / revise calls"| Anthropic
    RenderSvc -->|"pdf conversion (subprocess)"| LibreOffice
    Routes <-->|"read / write JSON"| Disk

    classDef external fill:#2a1f14,stroke:#e8a659,color:#f2f2f0
    classDef storage fill:#16202a,stroke:#7ea6c9,color:#f2f2f0
    class Anthropic,LibreOffice external
    class Disk storage`,
      },
      {
        title: 'Public demo (Vercel, frontend-only)',
        chart: `flowchart LR
    Visitor(["Portfolio visitor"])

    subgraph Vercel["Vercel — resi-the-builder.vercel.app<br/>(Root Directory: frontend/, no backend deployed)"]
        UI2["Next.js App<br/>NEXT_PUBLIC_DEMO_MODE=true"]
        Fixtures[("Static fixtures<br/>lib/demoFixtures/*.json<br/>lib/demoFixtures/refinements.ts")]
    end

    Visitor -->|"browser"| UI2
    UI2 -->|"reads (no network call)"| Fixtures

    classDef storage fill:#16202a,stroke:#7ea6c9,color:#f2f2f0
    class Fixtures storage`,
      },
    ],
    architectureNote: [
      'The real application runs entirely locally: a Next.js frontend and FastAPI backend calling the Claude API (claude-sonnet-4-6, with prompt caching). It stays local by design rather than by omission. Auto Apply already requires Claude Code running on the same machine to drive the Claude-in-Chrome agent, so the backend never needs to be reachable from outside it.',
      "A separate, frontend-only build is deployed to Vercel for the public demo, with no backend and no API key anywhere near the browser. The build-time flag NEXT_PUBLIC_DEMO_MODE swaps every network call for a bundled sample application (one real saved job description, resume, and cover letter, plus canned chat revisions), so the demo costs nothing to host and never touches a live key. Generation, downloads, and Auto Apply are all disabled in this mode. Vercel couldn't run the real backend anyway, since PDF export shells out to LibreOffice in headless mode, a system dependency serverless functions can't provide.",
    ],
    lessonsLearned: [
      'This project taught me how to put AI to work inside an app through customized prompts, each with its own specific rules. Generating a full resume and revising a single bullet get different prompts. The rules turned out to be the important part, since they are what keep the generations coming back consistent from one request to the next.',
      'I also learned about prompt caching. The backend uses it on its Claude calls so the parts of a prompt that stay the same between requests are reused instead of being sent and billed as fresh input every time, which reduces token usage.',
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Radix UI',
      'FastAPI',
      'Python 3.13',
      'Pydantic v2',
      'Uvicorn',
      'pytest',
      'Claude API (claude-sonnet-4-6)',
      'python-docx',
      'LibreOffice (headless)',
      'Claude Code',
      'Claude in Chrome',
    ],
    images: [
      '/img/resume-builder/resume-builder-1.jpg',
      '/img/resume-builder/resume-builder-2.jpg',
      '/img/resume-builder/resume-builder-3.jpg',
    ],
    demoUrl: 'https://resi-the-builder.vercel.app',
    codeUrl: 'https://github.com/ReneMSdev/resi-the-builder',
    demoNote:
      'Interactive demo running on sample data, with AI generation, downloads, and Auto Apply disabled.',
  },
  {
    slug: 'linkleaf',
    title: 'LinkLeaf',
    status: 'Paused',
    summary:
      'A digital business card shared by QR code: a tested FastAPI backend with auth and subscriptions, plus a Flutter app prototype.',
    description:
      'LinkLeaf was a real product attempt: a digital business card you share through a QR code or profile link, with free and premium tiers. It was paused before launch over doubts about the market. The backend is the finished part, a FastAPI API for profiles, links, media uploads, themes and subscriptions, with its test suite running in GitHub Actions. It also serves a Save Contact download, a vCard file that visitors can add to their phone\'s contacts. On the mobile side, the Flutter app is a UI prototype that runs on mock data and was never connected to the API. Nothing is deployed, so this is an architecture case study rather than a demo.',
    stack: [
      'Python 3.12',
      'FastAPI',
      'SQLAlchemy 2 (async)',
      'PostgreSQL 16',
      'Alembic',
      'Pydantic v2',
      'Firebase Auth',
      'Google Cloud Storage',
      'RevenueCat',
      'Pillow',
      'structlog',
      'pytest',
      'GitHub Actions',
      'Docker',
      'Flutter',
      'Dart 3',
    ],
    metrics: [
      { label: 'Tests passing', value: '133' },
      { label: 'API endpoints', value: '32' },
    ],
    images: ['/img/linkleaf/linkleaf-1.jpg'],
    architectureDiagrams: [
      {
        title: 'System overview',
        chart: `flowchart LR
    app["Flutter app<br/>(UI prototype, mock data)"]:::client
    visitor["Visitor's phone<br/>(scans QR code)"]:::client

    subgraph api["FastAPI backend (modular monolith)"]
      routers["api/<br/>(routers: /v1 + public<br/>/p, /q, vCard, theme preview)"]
      domain["domain/<br/>(user, profile, link, contact,<br/>media, theme, subscription)"]
      core["core/<br/>(db session, storage, image processing)"]
      authdep["auth/<br/>(token check, UID allowlist)"]
      routers --> domain --> core
      routers --> authdep
    end

    firebase["Firebase Auth"]:::external
    revenuecat["RevenueCat"]:::external
    pg[("PostgreSQL 16")]:::storage
    gcspub[("GCS public bucket<br/>(avatars, images)")]:::storage
    gcspriv[("GCS private bucket<br/>(resumes)")]:::storage

    app -. "Bearer ID token (not wired yet)" .-> routers
    app -. "sign in (not wired yet)" .-> firebase
    visitor -- "/q/{token}, /p/{slug}, vCard" --> routers
    authdep -- "verify ID token" --> firebase
    revenuecat -- "subscription webhook" --> routers
    core --> pg
    core --> gcspub
    core -- "signed URLs" --> gcspriv

    classDef external fill:#2a1f14,stroke:#e8a659,color:#f2f2f0
    classDef storage fill:#16202a,stroke:#7ea6c9,color:#f2f2f0
    classDef client fill:#1f1a2a,stroke:#a78bfa,color:#f2f2f0`,
      },
      {
        title: 'Authentication and first login',
        chart: `sequenceDiagram
    participant App as Flutter app
    participant API as FastAPI (auth/dependencies.py)
    participant DB as PostgreSQL
    rect rgb(42, 31, 20)
      Note over App,Firebase: planned, not wired in the app yet
      App->>Firebase: sign in
      Firebase-->>App: ID token
    end
    App->>API: request with Authorization: Bearer <token>
    rect rgb(42, 31, 20)
      API->>Firebase: verify_id_token (Admin SDK)
      Firebase-->>API: uid, email
    end
    alt UID not in ALLOWED_FIREBASE_UIDS
      API-->>App: 403 (or anonymous on optional-auth routes)
    else allowed
      API->>DB: find user by firebase_uid
      opt first login
        API->>DB: create user + free subscription
      end
      API-->>App: response
      API--)DB: background task: update last_login_at
    end`,
      },
      {
        title: 'QR scan, public profile and Save Contact',
        chart: `sequenceDiagram
    participant V as Visitor's phone
    participant API as FastAPI (public routes)
    participant DB as PostgreSQL
    V->>API: GET /q/{qr_token}
    API->>DB: active profile with this token?
    API-->>V: 302 → /p/{current slug}
    V->>API: GET /p/{slug}
    API->>DB: active profile with this slug?
    alt found
      API->>DB: load links, contact, public media, theme
      API-->>V: ProfilePublic JSON (is_premium, has_sensitive_data)
      API--)DB: background task: view_count + 1 (skipped for the owner)
    else not found, but slug is in slug_history
      API-->>V: 301 → /p/{new slug}
    end
    V->>API: GET /contacts/{profile_id}/vcard
    API-->>V: {slug}.vcf (vCard 3.0, branding note on free tier)`,
      },
      {
        title: 'Subscription lifecycle (RevenueCat webhook)',
        chart: `flowchart TD
    hook["POST /v1/subscriptions/webhook"] --> secret{"secret valid?"}
    secret -- no --> r401["401"]
    secret -- yes --> parse{"known event,<br/>known user?"}
    parse -- no --> ignored["200 ignored"]
    parse -- "INITIAL_PURCHASE / RENEWAL /<br/>RESTORE / PRODUCT_CHANGE" --> active["premium, active"]
    parse -- "CANCELLATION / BILLING_ISSUE" --> cancelled["premium, cancelled<br/>(access kept until expiry)"]
    parse -- EXPIRATION --> expired["free, expired"]
    expired --> c1["soft-delete portfolio images<br/>and resumes on non-default profiles"]
    c1 --> c2["soft-delete non-default profiles"]
    c2 --> c3["soft-delete portfolio images<br/>and resume on the default profile"]
    c3 --> grace[("30-day grace period:<br/>owner can restore")]:::storage
    active --> ok["200"]
    cancelled --> ok
    grace --> ok

    classDef storage fill:#16202a,stroke:#7ea6c9,color:#f2f2f0`,
      },
    ],
    architectureNote: [
      'The backend is a modular monolith: routers, domain services, and a shared core layer for the database, file storage and image processing. Domains are meant to reach each other only through service functions, and the code mostly follows that, though a few services still query other domains\' models directly.',
      'Identity and billing are bought rather than built. Firebase handles sign-in and RevenueCat handles app-store subscriptions, while the backend keeps the rules: it verifies Firebase tokens, only lets allowlisted accounts in, creates a user with a free subscription on first login, and turns RevenueCat webhooks into plan changes. When premium expires, extra profiles, portfolio images and resumes are soft-deleted and stay restorable for 30 days.',
      'Printed QR codes point at a permanent token instead of the profile\'s slug. The token redirects to whatever the slug is now, and old slugs answer with 301 redirects, so renaming a profile never breaks a card that has already been handed out.',
    ],
    lessonsLearned: [
      'Most of what I took from LinkLeaf came from attempting a real production backend, with user auth, subscriptions and data management to get right. A lot of research went into the architecture: deciding which services to build in house and which to hand to third parties, which is how Firebase ended up handling authentication and RevenueCat handling app-store billing, and weighing the pros and cons of each technology decision. It was also the first project I built with a full test suite running in GitHub Actions CI and configuration for separate development, staging and production environments, even though only development ever ran.',
      'A bug early on showed me why naming rules matter. The user service had a function called `update`, which quietly replaced SQLAlchemy\'s `update` imported at the top of the same file. When the background task that records each user\'s last login called `update(User)`, it expected SQLAlchemy and got my own function instead. Because it ran after the response was sent, no error ever reached the app, and last-login times simply never saved. The fix was renaming it to `update_user`, adding error output to the background task, and making "never name a service function plain `update` or `delete`" a project rule.',
    ],
    codeUrl: 'https://github.com/ReneMSdev/linkleaf-mono',
  },
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
  },
  {
    slug: 'route-planner',
    title: 'Route Planning App',
    status: 'Live',
    summary:
      'Route optimization web app that finds an efficient stop order and hands the route off to Google Maps or a PDF.',
    description:
      "Route Boss is a route optimization web app: enter or upload a list of stops, and it finds an efficient order and draws the drive on an interactive map. It grew out of a real problem from years of fiber optic field work: a day's list of addresses with no optimized route meant looking each one up individually in Google Maps beforehand. Addresses can be typed in or imported from a CSV or Excel file. Nominatim (OpenStreetMap) geocodes them and OpenRouteService works out the order and the road route. The finished route can be saved as a PDF or opened straight in Google Maps.",
    lessonsLearned: [
      'Built early in my self-taught path, one of the first projects I attempted independently outside of guided tutorials, before AI-assisted development matured into the force multiplier it is today. It built real familiarity with UI development and the core patterns behind API integration: requests, responses, and asynchronous operations.',
      'I recently came back to it after the geocoding service it relied on stopped accepting its key and the map tiles started requiring one, which left the live app broken. It was fixed by switching to OpenStreetMap\'s keyless geocoder and tiles. That update also made the app usable on a phone, with a Stops and Map switch and a button that opens the route in Google Maps.',
    ],
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
      '/img/route-planner/route-planner-3.jpg',
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
  },
]
