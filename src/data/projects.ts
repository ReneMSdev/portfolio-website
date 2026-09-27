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
  architectureNote?: string
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
      'An AI-assisted resume and cover letter generator that tailors output to a specific job description, with an integrated chat interface for iteratively revising individual sections or bullets. A separate automation layer orchestrates Claude Code and a dedicated Claude-in-Chrome agent to fill out job application forms from the saved application data — form-fill only, never submits.',
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
    architectureNote:
      'The real application runs entirely locally: a Next.js frontend and FastAPI backend calling the Claude API (claude-sonnet-4-6, with prompt caching). It stays local by design rather than by omission — the Auto Apply automation already requires Claude Code running on the same machine to drive the Claude-in-Chrome agent, so the backend never needs to be reachable from outside it. The public demo is a separate, frontend-only build deployed to Vercel with no backend and no API key anywhere near the browser. A build-time flag (NEXT_PUBLIC_DEMO_MODE) swaps every network call for a bundled sample application — one real saved job description, resume, and cover letter, plus canned chat revisions — so the demo costs nothing to host and never touches a live key. Generation, downloads, and Auto Apply are disabled in this mode. The backend couldn’t run on Vercel regardless, since PDF export shells out to LibreOffice in headless mode, a system dependency serverless functions can’t provide.',
    lessonsLearned:
      'Auto Apply is intentionally scoped to fill-only, never submit — the agent completes the form and stops there, keeping a human in the loop for final review before anything goes out.',
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
      'Interactive demo running on sample data — AI generation, downloads, and Auto Apply are disabled in this mode.',
  },
  {
    slug: 'linkleaf',
    title: 'LinkLeaf',
    status: 'Paused',
    summary: 'Backend MVP for a link-in-bio platform — paused, architecture-focused.',
    description:
      'LinkLeaf is a link-in-bio platform. The backend MVP is complete with 122 passing tests, but the project is currently paused, so this is framed as an architecture case study rather than a live demo.',
    stack: ['FastAPI', 'PostgreSQL', 'Google Cloud Storage', 'RevenueCat'],
    metrics: [{ label: 'Tests passing', value: '122' }],
    architectureNote: 'Architecture diagram and detailed write-up coming soon.',
    codeUrl: '#',
  },
  {
    slug: 'mobile-mechanic',
    title: 'Mobile Mechanic Site',
    status: 'Live',
    summary: 'Client site for a mobile mechanic — booking and contact presence.',
    description:
      'A static site built for ATX Reliable Wrenching, a mobile mechanic business serving the Greater Austin area, giving them a booking and contact presence online.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    images: ['/img/mobile-mechanic/mobile-mechanic-1.jpg'],
    demoUrl: 'https://www.atxreliablewrenching.com/',
  },
  {
    slug: 'weather-app',
    title: 'Weather App',
    status: 'Not live',
    summary: 'Next.js/Node weather app — currently not deployed.',
    description:
      'A weather app built with Next.js and Node. Currently not live; redeploying and fixing it up is out of scope for this portfolio, so it is shown here as a minimal reference rather than a working demo.',
    stack: ['Next.js', 'Node.js'],
    codeUrl: '#',
  },
  {
    slug: 'route-planner',
    title: 'Route Planning App',
    status: 'Demo (mock data)',
    summary: 'Route optimization app with map visualization and PDF/QR export.',
    description:
      'Route Boss is a route optimization web app where users can input multiple stops, calculate the most efficient path, and visualize their route on an interactive map. It supports manual address entry or CSV upload, geocodes using OpenCage, optimizes with OpenRouteService, and lets users export their route as a PDF or mobile-friendly QR code.',
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
