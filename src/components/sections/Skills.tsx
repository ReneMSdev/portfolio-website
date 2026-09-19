import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiSupabase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiSwift,
  SiPython,
  SiFirebase,
  SiAdobecreativecloud,
  SiFigma,
  SiNetlify,
  SiVercel,
} from 'react-icons/si'
import { FaLinux, FaAws } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import { RiJavaLine } from 'react-icons/ri'
import { TbBrandMysql } from 'react-icons/tb'

interface Skill {
  name: string
  icon: IconType
  color: string
}

const skills: Skill[] = [
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Swift', icon: SiSwift, color: '#FA7343' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Java', icon: RiJavaLine, color: '#007396' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#F2F2F0' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
  { name: 'MySQL', icon: TbBrandMysql, color: '#4479A1' },
  { name: 'PostgreSQL', icon: BiLogoPostgresql, color: '#336791' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'Linux', icon: FaLinux, color: '#FCC624' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#F2F2F0' },
  { name: 'Adobe CC', icon: SiAdobecreativecloud, color: '#DA1F26' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
  { name: 'Vercel', icon: SiVercel, color: '#F2F2F0' },
]

export default function Skills() {
  return (
    <section
      id='skills'
      className='scroll-mt-14 px-4 md:px-10 py-20 max-w-5xl mx-auto'
    >
      <p className='font-mono text-sm text-accent uppercase tracking-wider mb-6'>Skills</p>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-6'>
        {skills.map(({ name, icon: Icon, color }) => {
          const skillStyle = { '--skill-color': color } as CSSProperties

          return (
            <div
              key={name}
              className='group flex flex-col items-center text-center transition-transform duration-200 hover:scale-120'
              style={skillStyle}
            >
              <Icon className='text-4xl mb-2 text-muted-foreground transition-colors duration-300 group-hover:text-[var(--skill-color)]' />
              <span className='text-sm font-semibold text-muted-foreground group-hover:text-foreground'>
                {name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
