export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  slug: string
  title: string
  status: string
  summary: string
  description: string
  stack: string[]
  images?: string[]
  demoUrl?: string
  demoNote?: string
  codeUrl?: string
  metrics?: ProjectMetric[]
  architectureNote?: string
  lessonsLearned?: string
}

// PLACEHOLDER CONTENT — see status.md. Real URLs, screenshots, and copy
// for everything but Route Planner still need to be supplied.
export const projects: Project[] = [
  {
    slug: 'resume-auto-apply',
    title: 'Resume Auto-Apply Tool',
    status: 'Demo',
    summary: 'AI-assisted, chat-based resume and cover-letter generation.',
    description:
      'An AI/automation tool that iteratively generates tailored resumes and cover letters through a chat-based workflow. FastAPI backend, Next.js frontend.',
    stack: ['FastAPI', 'Next.js', 'OpenAI API'],
    demoUrl: '#',
    codeUrl: '#',
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
      'A static site built for a real client running a mobile mechanic business, giving them a booking and contact presence online.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
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
    images: ['/img/project1/routeplanner1.jpg', '/img/project1/routeplanner2.jpg'],
    demoUrl: 'https://route-planner-nextjs.vercel.app/',
    demoNote: 'Demo Mode — uses cached/mock route data to avoid live API cost.',
    codeUrl: 'https://github.com/ReneMSdev/route-planner-nextjs',
  },
]
