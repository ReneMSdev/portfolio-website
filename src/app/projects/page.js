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

  return (
    <div className='min-h-screen grid grid-cols-1 gap-8 items-start pt-30 md:pt-12'>
      {/* Project 1 */}
      <div className='flex flex-col items-start px-6'>
        {/* Embla Carousel */}
        <EmblaCarousel slides={projectOneImages} />

        {/* Text */}
        <div className='mt-8 mx-auto'>
          <h2 className='text-2xl text-indigo-900 dark:text-indigo-700 font-semibold text-center md:text-start'>
            Route Planning App
          </h2>
          <p className='max-w-lg mt-4'>
            Route Boss is a modern route planning web app built with Next.js 13 App Router and React
            19. It is styled using Tailwind CSS and shadcn/ui. It lets users input delivery or
            travel destinations, optimize routes, visualize them on a map, and export them for use
            in the real world.
          </p>
          <p className='max-w-lg mt-4'>
            <span className='font-semibold'>Built with:</span> Next.js, Leaflet.js, OpenCage Data,
            OpenRouteService, react-dropzone, papaparse, jsPDF, html2canvas, next-qrcode, Tailwind
            CSS, ShadCN UI
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
      <div className='flex flex-col items-start w-full bg-slate-200 dark:bg-stone-800 py-16 px-6'>
        {/* Embla Carousel */}
        <EmblaCarousel slides={projectTwoImages} />

        {/* Text */}
        <div className='mt-8 mx-auto'>
          <h2 className='text-2xl text-indigo-900 dark:text-indigo-700 font-semibold text-center md:text-start'>
            Life Coaching Website
          </h2>
          <p className='max-w-lg mt-4'>
            I designed and developed a responsive website for a lifestyle coach, focused on
            showcasing their services and making client engagement seamless. Built using HTML, CSS,
            JavaScript, and Bootstrap, the site offers a clean, modern layout optimized for both
            desktop and mobile users.
          </p>
          <p className='max-w-lg mt-4'>
            Key features include an integrated Calendly scheduler, allowing visitors to easily book
            consultations, and a custom contact form for direct inquiries. The overall design
            reflects the client&apos;s personal brand and provides a smooth, user-friendly
            experience to support their coaching business online.
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
        <div className='mt-8 mx-auto'>
          <h2 className='text-2xl text-indigo-900 dark:text-indigo-700 font-semibold text-center md:text-start'>
            Music Translation App
          </h2>
          <p className='max-w-lg mt-4'>
            YourSound™ helps you understand music across borders by translating the lyrics of the
            songs you’re listening to on Spotify — in real time. Whether you&apos;re learning a new
            language or exploring global music, YourSound™ maintains the rhythm and flow so nothing
            gets lost in translation.
          </p>
          <p className='max-w-lg mt-4'>
            This project is fully designed and developed by me. It is currently in active
            development, with core features like authentication and Spotify integration already
            built. The app is not yet deployed, as I&apos;m continuing to implement real-time lyric
            translation and synced playback features to enhance the user experience.
          </p>
          <p className='max-w-lg mt-4'>
            <span className='font-semibold'>Built with:</span> Next.js, Supabase, Spotify API,
            Tailwind CSS, ShadCN UI
          </p>
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
