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
  SiSwift,
  SiPython,
  SiFirebase,
  SiGooglecloud,
  SiNetlify,
  SiVercel,
  SiFastapi,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import { TerminalWindow } from '@/components/ui/terminal'

interface Skill {
  name: string
  icon: IconType
}

const skills: Skill[] = [
  { name: 'HTML', icon: SiHtml5 },
  { name: 'CSS', icon: SiCss3 },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Swift', icon: SiSwift },
  { name: 'Python', icon: SiPython },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'PostgreSQL', icon: BiLogoPostgresql },
  { name: 'AWS', icon: FaAws },
  { name: 'GCP', icon: SiGooglecloud },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Netlify', icon: SiNetlify },
  { name: 'Vercel', icon: SiVercel },
]

const COMMAND = 'npm install skills'

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [typedCommand, setTypedCommand] = useState('')
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedCommand(COMMAND.slice(0, i))
      if (i >= COMMAND.length) {
        clearInterval(interval)
        setTimeout(() => setShowOutput(true), 300)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      id='skills'
      ref={sectionRef}
      className='scroll-mt-14 px-4 md:px-10 py-24 max-w-5xl mx-auto'
    >
      <p className='font-mono text-3xl font-semibold text-accent lowercase mb-6'>Skills</p>

      <TerminalWindow title='skills.sh'>
        <p className='text-foreground'>
          <span className='text-accent'>$</span> {typedCommand}
          {typedCommand.length < COMMAND.length && (
            <span className='inline-block w-2 h-4 bg-foreground align-middle ml-0.5 animate-pulse' />
          )}
        </p>

        {showOutput && (
          <div className='mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1.5'>
            {skills.map(({ name, icon: Icon }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className='flex items-center gap-2 text-sm text-muted-foreground'
              >
                <span className='text-accent'>✓</span>
                <Icon className='text-base' />
                <span>{name}</span>
              </motion.div>
            ))}
          </div>
        )}
      </TerminalWindow>
    </section>
  )
}
