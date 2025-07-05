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
  { name: 'HTML', icon: SiHtml5 },
  { name: 'CSS', icon: SiCss3 },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Swift', icon: SiSwift },
  { name: 'Python', icon: SiPython },
  { name: 'Java', icon: RiJavaLine },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'MySQL', icon: TbBrandMysql },
  { name: 'PostgreSQL', icon: BiLogoPostgresql },
  { name: 'AWS', icon: FaAws },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Supabase', icon: SiSupabase },
  { name: 'Linux', icon: FaLinux },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Adobe CC', icon: SiAdobecreativecloud },
  { name: 'Figma', icon: SiFigma },
  { name: 'Netlify', icon: SiNetlify },
  { name: 'Vercel', icon: SiVercel },
]

export default function Home() {
  const [open, setOpen] = useState(false)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-10 mx-6 md:mx-30 md:pl-6 xl:mx-auto max-w-5xl min-h-[150vh]'>
      {/* Image Column - top for small screens, right for md+ */}
      <div className='order-1 justify-center pt-20 md:pt-0 md:order-2 md:sticky md:top-30 md:justify-start flex'>
        <div className='flex flex-col items-center md:ml-auto'>
          <div className='relative inline-block'>
            {/* Image on top */}
            <Image
              src='/img/profile/profile1.jpg'
              alt='Rene Maxey-Salomone'
              width={250}
              height={375}
              className='rounded-md relative z-10 border-2'
            />
          </div>
        </div>
      </div>

      {/* Text Column - below image on small screens, left on md+ */}
      <div className='order-2 md:order-1 flex flex-col items-center md:items-start pb-20'>
        <h1 className='text-3xl md:text-4xl font-semibold text-indigo-900 dark:text-indigo-700'>
          René Maxey-Salomone
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
          <p className='max-w-md pt-8'>
            Hi, I&apos;m René &mdash; a software developer with a background in design and a passion
            for building human-centered web applications. I&apos;m currently open to full-time roles
            where I can contribute to meaningful products, continue learning, and collaborate with
            thoughtful teams.
          </p>
          <CollapsibleContent className='space-y-4'>
            <p className='max-w-md pt-4'>
              After earning my B.S. in Computer Science, I&apos;ve developed a variety of projects
              working freelance for small businesses and entrepreneurs. Through collaboration,
              I&apos;ve helped bring my clients&apos; ideas to life. I&apos;m always striving to
              create seamless user experiences.
            </p>
            <p className='max-w-md'>
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
          {skills.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className='flex flex-col items-center text-center transition-transform duration-200 hover:scale-115'
            >
              <Icon className='text-4xl mb-2 text-slate-700 dark:text-slate-600' />
              <span className='text-sm font-semibold group-hover:font-bold transition-all duration-200'>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
