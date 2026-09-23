'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import type { IconType } from 'react-icons'
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiPython,
  SiFirebase,
  SiGooglecloud,
  SiVercel,
  SiFastapi,
  SiFlutter,
  SiOpenai,
  SiClaude,
  SiGithubcopilot,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import { TerminalWindow } from '@/components/ui/terminal'
import { TextBlurBackdrop } from '@/components/ui/text-blur-backdrop'

interface Skill {
  name: string
  icon: IconType
  description: string
}

interface SkillGroup {
  command: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    command: 'npm install languages',
    skills: [
      { name: 'HTML', icon: SiHtml5, description: 'Semantic markup and accessible page structure.' },
      { name: 'CSS', icon: SiCss3, description: 'Layout and styling with modern Grid and Flexbox.' },
      { name: 'JavaScript', icon: SiJavascript, description: 'Core language for interactive, dynamic web apps.' },
      { name: 'TypeScript', icon: SiTypescript, description: 'Typed superset of JavaScript for safer, scalable code.' },
      { name: 'Python', icon: SiPython, description: 'General-purpose scripting, automation, and backend logic.' },
    ],
  },
  {
    command: 'npm install frameworks',
    skills: [
      { name: 'React', icon: SiReact, description: 'Component-based library for building interactive UIs.' },
      { name: 'Next.js', icon: SiNextdotjs, description: 'React framework for routing, rendering, and full-stack apps.' },
      { name: 'Node.js', icon: SiNodedotjs, description: 'JavaScript runtime for backend services and tooling.' },
      { name: 'FastAPI', icon: SiFastapi, description: 'Python framework for building fast, typed REST APIs.' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, description: 'Utility-first CSS framework for rapid, consistent styling.' },
      { name: 'React Native', icon: SiReact, description: 'Cross-platform mobile apps built with React.' },
      { name: 'Flutter', icon: SiFlutter, description: 'Dart-based toolkit for native mobile, web, and desktop apps.' },
    ],
  },
  {
    command: 'npm install cloud-infra',
    skills: [
      { name: 'PostgreSQL', icon: BiLogoPostgresql, description: 'Relational database for structured, transactional data.' },
      { name: 'AWS', icon: FaAws, description: 'Cloud infrastructure for hosting, storage, and compute.' },
      { name: 'GCP', icon: SiGooglecloud, description: "Google's cloud platform for hosting and services." },
      { name: 'Firebase', icon: SiFirebase, description: 'Backend-as-a-service for auth, realtime data, and hosting.' },
      { name: 'Vercel', icon: SiVercel, description: 'Deployment platform for Next.js and frontend apps.' },
    ],
  },
  {
    command: 'npm install tools',
    skills: [
      { name: 'Git', icon: SiGit, description: 'Version control for tracking and collaborating on code.' },
      { name: 'GitHub', icon: SiGithub, description: 'Git hosting, code review, and CI/CD workflows.' },
    ],
  },
  {
    command: 'npm install ai-tooling',
    skills: [
      { name: 'OpenAI API', icon: SiOpenai, description: 'GPT models for chat, generation, and AI-powered features.' },
      { name: 'Claude API', icon: SiClaude, description: "Anthropic's Claude models for chat, generation, and AI-powered features." },
      { name: 'GitHub Copilot', icon: SiGithubcopilot, description: 'AI pair-programming assistant for code completion and chat.' },
    ],
  },
]

const TYPE_SPEED_MS = 40
const PAUSE_BEFORE_OUTPUT_MS = 250
const PAUSE_BEFORE_NEXT_COMMAND_MS = 900

function CommandLine({ command, onComplete }: { command: string; onComplete: () => void }) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setTyped(command.slice(0, i))
      if (i >= command.length) {
        clearInterval(interval)
        onComplete()
      }
    }, TYPE_SPEED_MS)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command])

  // Dracula-inspired syntax highlighting: purple prompt, pink command word,
  // default "install", green argument (the package/group name).
  const firstSpace = command.indexOf(' ')
  const secondSpace = command.indexOf(' ', firstSpace + 1)

  return (
    <p className='text-foreground'>
      <span className='text-[#bd93f9]'>$</span>{' '}
      <span className='text-[#ff79c6]'>{typed.slice(0, firstSpace)}</span>
      <span>{typed.slice(firstSpace, secondSpace)}</span>
      <span className='text-[#50fa7b]'>{typed.slice(secondSpace)}</span>
      {typed.length < command.length && (
        <span className='inline-block w-2 h-4 bg-foreground align-middle ml-0.5 animate-pulse' />
      )}
    </p>
  )
}

function SkillOutput({
  skills,
  flipFirstRow,
  groupIndex,
}: {
  skills: Skill[]
  flipFirstRow?: boolean
  groupIndex: number
}) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  return (
    <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1.5'>
      {skills.map(({ name, icon: Icon, description }, i) => {
        const dropDown = flipFirstRow && i < 3

        return (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            className='relative'
          >
            <button
              type='button'
              onMouseEnter={() => setActiveSkill(name)}
              onMouseLeave={() => setActiveSkill((cur) => (cur === name ? null : cur))}
              onFocus={() => setActiveSkill(name)}
              onBlur={() => setActiveSkill((cur) => (cur === name ? null : cur))}
              onClick={() => setActiveSkill((cur) => (cur === name ? null : name))}
              className='relative flex items-center gap-2 cursor-help text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus:outline-none'
            >
              <span className='text-accent'>✓</span>
              <span className='relative inline-flex items-center gap-2'>
                <AnimatePresence>
                  {activeSkill === name && (
                    <motion.span
                      layoutId={`skill-hover-bg-${groupIndex}`}
                      className='absolute -inset-x-2 -inset-y-1 rounded-md bg-accent/10'
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.35 }}
                    />
                  )}
                </AnimatePresence>
                <span className='relative flex items-center gap-2'>
                  <Icon className='text-base' />
                  <span>{name}</span>
                </span>
              </span>
            </button>

            <AnimatePresence>
              {activeSkill === name && (
                <motion.div
                  initial={{ opacity: 0, y: dropDown ? -4 : 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: dropDown ? -4 : 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  role='tooltip'
                  className={`pointer-events-none absolute left-1/2 z-50 w-52 -translate-x-1/2 rounded-lg border border-[#274b7a] bg-[#0d1b30] p-3 text-xs leading-relaxed text-muted-foreground shadow-xl shadow-black/40 ${
                    dropDown ? 'top-full mt-2' : 'bottom-full mb-2'
                  }`}
                >
                  <span className='mb-1 block font-mono text-xs font-semibold text-foreground'>
                    {name}
                  </span>
                  {description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeGroupIndex, setActiveGroupIndex] = useState(0)
  const [outputShownFor, setOutputShownFor] = useState(-1)

  const handleCommandComplete = (index: number) => {
    setTimeout(() => {
      setOutputShownFor(index)
      setTimeout(() => setActiveGroupIndex(index + 1), PAUSE_BEFORE_NEXT_COMMAND_MS)
    }, PAUSE_BEFORE_OUTPUT_MS)
  }

  return (
    <section
      id='skills'
      ref={sectionRef}
      className='relative overflow-hidden scroll-mt-14 py-20 min-h-[900px]'
    >

      <div className='relative px-4 md:px-10 max-w-5xl mx-auto'>
        <TextBlurBackdrop className='mb-6'>
          <p className='font-mono text-3xl font-semibold text-accent lowercase'>Skills</p>
        </TextBlurBackdrop>

        <TerminalWindow title='skills.sh'>
          <div className='space-y-4'>
            {isInView &&
              skillGroups.map((group, index) => {
                if (index > activeGroupIndex) return null

                return (
                  <div key={group.command}>
                    <CommandLine
                      command={group.command}
                      onComplete={() => handleCommandComplete(index)}
                    />
                    {outputShownFor >= index && (
                      <SkillOutput
                        skills={group.skills}
                        flipFirstRow={index === 0}
                        groupIndex={index}
                      />
                    )}
                  </div>
                )
              })}
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
