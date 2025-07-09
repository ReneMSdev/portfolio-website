'use client'

import { useEffect } from 'react'
import { useLoading } from '@/context/LoadingContext'
import { FaCode, FaUnlink } from 'react-icons/fa'
import { MdOutlineWeb } from 'react-icons/md'
import EmblaCarousel from '@/components/EmblaCarousel'

export default function ProjectsPage() {
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [])

  const projectOneImages = ['/img/project1/routeplanner1.jpg', '/img/project1/routeplanner2.jpg']
  const projectTwoImages = [
    '/img/project2/gina1.jpg',
    '/img/project2/gina2.jpg',
    '/img/project2/gina3.jpg',
  ]
  const projectThreeImages = [
    '/img/project3/music1.jpg',
    '/img/project3/music2.jpg',
    '/img/project3/music3.jpg',
    '/img/project3/music4.jpg',
    '/img/project3/music5.jpg',
  ]

  const textStyles = 'mt-4 max-w-lg text-slate-900 dark:text-slate-200'
  const builtWith = 'text-lg font-semibold text-slate-700 dark:text-[#A8DADC] mt-4'
  const builtWithText = 'mt-1 max-w-lg text-slate-900 dark:text-slate-200'

  return (
    <div className='min-h-screen grid grid-cols-1 gap-8 items-start pt-30 md:pt-12'>
      {/* Project 1 */}
      <div className='flex flex-col items-start px-6'>
        {/* Embla Carousel */}
        <EmblaCarousel slides={projectOneImages} />

        {/* Text */}
        <div className='mt-10 mx-auto'>
          <h2 className='text-3xl text-slate-700 dark:text-[#A8DADC] font-semibold text-center md:text-start'>
            Route Planning App
          </h2>
          <p className={textStyles}>
            Route Boss is a modern route optimization web app where users can input multiple stops,
            calculate the most efficient path, and visualize their route on an interactive map. It
            supports manual address entry or CSV upload, geocodes using OpenCage, optimizes with
            OpenRouteService, and lets users export their route as a PDF or mobile-friendly QR code.
          </p>
          <p className={builtWith}>Built with:</p>
          <p className={builtWithText}>
            Next.js 13 App Router, React 19, Tailwind CSS, ShadCN UI, Leaflet.js, OpenCage,
            OpenRouteService, react-dropzone, xlsx, jsPDF, next-qrcode
          </p>
        </div>

        {/* Demo & Code links */}
        <div className='flex mx-auto gap-16 md:gap-30 pt-8  mb-6'>
          <a
            href='https://route-planner-nextjs.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-blue-500'
          >
            <div className='flex items-center gap-2'>
              <MdOutlineWeb className='text-xl' />
              Demo
            </div>
          </a>
          <a
            href='https://github.com/ReneMSdev/route-planner-nextjs'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-blue-500'
          >
            <div className='flex items-center gap-2'>
              <FaCode className='text-xl' />
              Code
            </div>
          </a>
        </div>
      </div>

      {/* Project 2 */}
      <div className='flex flex-col items-start w-full bg-slate-200 dark:bg-slate-800 py-16 px-6'>
        {/* Embla Carousel */}
        <EmblaCarousel slides={projectTwoImages} />

        {/* Text */}
        <div className='mt-10 mx-auto'>
          <h2 className='text-3xl text-slate-700 dark:text-[#A8DADC] font-semibold text-center md:text-start'>
            Life Coaching Website
          </h2>
          <p className={textStyles}>
            I designed and developed a responsive website for a Gina Phillips, a professional life
            coach specializing in burnout recovery, mindset mastery, and ADHD support. Focusing on
            on showcasing her services and making client engagement seamless, the site offers a
            clean, modern layout optimized for both desktop and mobile users.
          </p>
          <p className={textStyles}>
            Key features include an integrated Calendly scheduler, allowing visitors to easily book
            consultations, and a custom contact form for direct inquiries. The overall design
            reflects the client&apos;s personal brand and provides a smooth, user-friendly
            experience to support their coaching business online.
          </p>
          <p className={builtWith}>Built with:</p>
          <p className={builtWithText}>
            HTML, CSS, JavaScript, Bootstrap 5, Calendly Embed, Web3Forms API, Toastify.js
          </p>
        </div>

        {/* Demo & Code links */}
        <div className='flex mx-auto gap-16 md:gap-30 pt-8'>
          <a
            href='https://renemsdev.github.io/gina-website/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-blue-500'
          >
            <div className='flex items-center gap-2'>
              <MdOutlineWeb className='text-xl' />
              Demo
            </div>
          </a>
          <a
            href='https://github.com/ReneMSdev/gina-website'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-blue-500'
          >
            <div className='flex items-center gap-2'>
              <FaCode className='text-xl' />
              Code
            </div>
          </a>
        </div>
      </div>

      {/* Project 3 */}
      <div className='flex flex-col items-start px-6 my-10'>
        {/* Embla Carousel */}
        <EmblaCarousel slides={projectThreeImages} />

        {/* Text */}
        <div className='mt-10 mx-auto'>
          <h2 className='text-3xl text-slate-700 dark:text-[#A8DADC] font-semibold text-center md:text-start'>
            Music Translation App
          </h2>
          <p className={textStyles}>
            YourSound™ is a music translation app that connects to your Spotify Premium account and
            translates lyrics of the songs you&apos;re currently listening to — in real time.
            Designed to preserve rhythm and flow, it helps users explore international music, learn
            new languages, and engage more deeply with global sounds.
          </p>
          <p className={textStyles}>
            This project is designed and developed by me. It is currently in active development,
            with core features like authentication and Spotify integration already built. The app is
            not yet deployed, as I&apos;m continuing to implement real-time lyric translation and
            synced playback features to enhance the user experience.
          </p>
          <p className={builtWith}>Built with:</p>
          <p className={builtWithText}>Next.js, Supabase, Spotify API, Tailwind CSS, ShadCN UI</p>
        </div>

        {/* Demo & Code links */}
        <div className='flex mx-auto gap-16 md:gap-30 pt-8  mb-6'>
          <div className='flex items-center gap-2 font-semibold'>
            <FaUnlink className='text-md' />
            <span className='line-through decoration-2'>Demo</span>
          </div>
          <a
            href='https://github.com/ReneMSdev/music-app'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-blue-500'
          >
            <div className='flex items-center gap-2'>
              <FaCode className='text-xl' />
              Code
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
