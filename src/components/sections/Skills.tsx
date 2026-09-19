'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
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
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import { TerminalWindow } from '@/components/ui/terminal'

interface Skill {
  name: string
  icon: IconType
}

interface SkillGroup {
  command: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    command: 'npm install languages',
    skills: [
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss3 },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    command: 'npm install frameworks',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'React Native', icon: SiReact },
      { name: 'Flutter', icon: SiFlutter },
    ],
  },
  {
    command: 'npm install cloud-infra',
    skills: [
      { name: 'PostgreSQL', icon: BiLogoPostgresql },
      { name: 'AWS', icon: FaAws },
      { name: 'GCP', icon: SiGooglecloud },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
  {
    command: 'npm install tools',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
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

  return (
    <p className='text-foreground'>
      <span className='text-accent'>$</span> {typed}
      {typed.length < command.length && (
        <span className='inline-block w-2 h-4 bg-foreground align-middle ml-0.5 animate-pulse' />
      )}
    </p>
  )
}

function SkillOutput({ skills }: { skills: Skill[] }) {
  return (
    <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1.5'>
      {skills.map(({ name, icon: Icon }, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: i * 0.04 }}
          className='flex items-center gap-2 text-sm text-muted-foreground'
        >
          <span className='text-accent'>✓</span>
          <Icon className='text-base' />
          <span>{name}</span>
        </motion.div>
      ))}
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
      className='scroll-mt-14 px-4 md:px-10 py-24 max-w-5xl mx-auto'
    >
      <p className='font-mono text-3xl font-semibold text-accent lowercase mb-6'>Skills</p>

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
                  {outputShownFor >= index && <SkillOutput skills={group.skills} />}
                </div>
              )
            })}
        </div>
      </TerminalWindow>
    </section>
  )
}
