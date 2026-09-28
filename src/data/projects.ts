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
  lessonsLearned?: string
}

// PLACEHOLDER CONTENT — see STATUS.md. Real URLs, screenshots, and copy
// for everything but Route Planner still need to be supplied.
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
    lessonsLearned:
      'Auto Apply is intentionally scoped to fill-only, never submit. The agent completes the form and stops there, keeping a human in the loop for final review before anything goes out.',
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
  },
]
