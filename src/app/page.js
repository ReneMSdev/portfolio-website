'use client'

import Image from 'next/image'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useState, useEffect } from 'react'
import { useLoading } from '@/context/LoadingContext'

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

const skills = [
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Swift', icon: SiSwift, color: '#FA7343' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Java', icon: RiJavaLine, color: '#007396' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000', darkModeFix: true },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC' },
  { name: 'MySQL', icon: TbBrandMysql, color: '#4479A1' },
  { name: 'PostgreSQL', icon: BiLogoPostgresql, color: '#336791' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'Linux', icon: FaLinux, color: '#FCC624' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#000000', darkModeFix: true },
  { name: 'Adobe CC', icon: SiAdobecreativecloud, color: '#DA1F26' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
  { name: 'Vercel', icon: SiVercel, color: '#000000', darkModeFix: true },
]

const textStyles = ' max-w-md text-slate-900 dark:text-slate-200'

export default function Home() {
  const [open, setOpen] = useState(false)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-4 md:px-10 mt-10 mx-auto max-w-5xl min-h-[150vh]'>
      {/* Image Column - top for small screens, right for md+ */}
      <div className='order-1 justify-center pt-20 md:pt-0 md:order-2 md:sticky md:top-30 flex'>
        <div className='flex flex-col items-center md:ml-auto'>
          <div className='relative inline-block'>
            {/* Image on top */}
            <Image
              src='/img/profile/profile1.jpg'
              alt='Rene Maxey-Salomone'
              width={250}
              height={375}
              className='rounded-md relative z-10'
              priority
            />
          </div>
        </div>
      </div>

      {/* Text Column - below image on small screens, left on md+ */}
      <div className='order-2 md:order-1 flex flex-col items-center md:items-start pb-20'>
        <h1 className='text-3xl md:text-6xl font-semibold text-slate-700 dark:text-[#A8DADC]'>
          René
          <br className='hidden md:inline' /> Maxey-
          <br className='hidden md:inline' />
          Salomone
        </h1>
        <h2 className='text-xl md:text-2xl mt-2 font-semibold'>
          <span className='text-rose-600'>Full-Stack</span> Developer
        </h2>

        {/* About Section */}
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className='max-w-md'
        >
          <p className={'max-w-md pt-8' + textStyles}>
            Hi, I&apos;m René &mdash; a software developer with a background in design and computer
            science. I have a passion for problem solving and building human-centered web
            applications. I&apos;m currently open to full-time roles where I can contribute to
            meaningful products, continue learning, and collaborate with thoughtful teams.
          </p>
          <CollapsibleContent className='space-y-4'>
            <p className={'pt-4' + textStyles}>
              After earning my B.S. in Computer Science, I&apos;ve developed a variety of projects
              working freelance for small businesses and entrepreneurs. Through collaboration,
              I&apos;ve helped bring my clients&apos; ideas to life. I&apos;m always striving to
              create seamless user experiences.
            </p>
            <p className={textStyles}>
              Outside of coding, you&apos;ll usually find me traveling, discovering new coffee
              shops, and working on my next Spotify playlist. Feel free to reach out &mdash;
              I&apos;m always happy to connect and collaborate.
            </p>
          </CollapsibleContent>
          <div className='w-full flex'>
            <CollapsibleTrigger className=' mt-2 font-semibold text-sm cursor-pointer text-blue-500'>
              {open ? 'Read less' : 'Read more'}
            </CollapsibleTrigger>
          </div>
        </Collapsible>

        {/* Skills Section */}
        <h2 className='text-xl md:text-2xl mt-10 font-semibold text-rose-600'>Skills</h2>
        <div className='grid grid-cols-3 md:grid-cols-4 gap-6 pt-6'>
          {skills.map(({ name, icon: Icon, color, darkModeFix }) => {
            const skillStyle = {
              '--skill-color': color,
              ...(darkModeFix && { '--tw-dark-skill-color': '#ffffff' }),
            }

            const iconClass =
              'text-4xl mb-2 text-slate-500 transition-colors duration-300 group-hover:text-[var(--skill-color)]' +
              (darkModeFix ? ' dark:group-hover:text-[var(--tw-dark-skill-color)]' : '')

            const textClass =
              'text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'

            return (
              <div
                key={name}
                className='group flex flex-col items-center text-center transition-transform duration-200 hover:scale-120'
                style={skillStyle}
              >
                <Icon className={iconClass} />
                <span className={textClass}>{name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
