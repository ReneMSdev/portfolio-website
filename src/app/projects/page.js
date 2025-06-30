import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { FaCode } from 'react-icons/fa'
import { MdOutlineWeb } from 'react-icons/md'

export default function ProjectsPage() {
  const projectOneImages = ['/routeplanner1.jpg', '/routeplanner2.jpg']

  return (
    <div className='grid grid-cols-1 gap-8 items-start mt-20 md:mt-12'>
      {/* Project 1 */}
      <div className='flex flex-col items-start px-6'>
        {/* ShadCN Carousel */}
        <div className='w-full mx-auto'>
          <Carousel
            className='max-w-lg mx-auto'
            opts={{ loop: true }}
          >
            <CarouselContent>
              {projectOneImages.map((src, i) => (
                <CarouselItem
                  key={i}
                  className='flex justify-center'
                >
                  <Image
                    src={src}
                    alt={`Route Boss ${i + 1}`}
                    width={500}
                    height={300}
                    className=' border-1 border-slate-600'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Text */}
        <div className='mt-8 mx-auto'>
          <h1 className='text-4xl font-semibold text-center md:text-start'>Route Planning App</h1>
          <p className='max-w-lg mt-4'>
            Route Boss is a modern route planning web app built with Next.js 13 App Router and React
            19. It is styled using Tailwind CSS and shadcn/ui. It lets users input delivery or
            travel destinations, optimize routes, visualize them on a map, and export them for use
            in the real world.
          </p>
        </div>

        {/* Demo & Code links */}
        <div className='flex mx-auto gap-16 md:gap-30 pt-8  mb-6'>
          <a
            href='https://route-planner-nextjs.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:underline hover:underline-offset-4 decoration-2'
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
            className='font-semibold hover:underline hover:underline-offset-4 decoration-2'
          >
            <div className='flex items-center gap-2'>
              <FaCode className='text-xl' />
              Code
            </div>
          </a>
        </div>
      </div>

      {/* Project 2 */}
      <div className='flex flex-col items-start w-full bg-slate-100 py-16 px-6'>
        {/* ShadCN Carousel */}
        <div className='w-full mx-auto'>
          <Carousel
            className='max-w-lg mx-auto'
            opts={{ loop: true }}
          >
            <CarouselContent>
              {projectOneImages.map((src, i) => (
                <CarouselItem
                  key={i}
                  className='flex justify-center'
                >
                  <Image
                    src={src}
                    alt={`Route Boss ${i + 1}`}
                    width={500}
                    height={300}
                    className=' border-1 border-slate-600'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Text */}
        <div className='mt-8 mx-auto'>
          <h1 className='text-4xl font-semibold text-center md:text-start'>Route Planning App</h1>
          <p className='max-w-lg mt-4'>
            Route Boss is a modern route planning web app built with Next.js 13 App Router and React
            19. It is styled using Tailwind CSS and shadcn/ui. It lets users input delivery or
            travel destinations, optimize routes, visualize them on a map, and export them for use
            in the real world.
          </p>
        </div>

        {/* Demo & Code links */}
        <div className='flex mx-auto gap-16 md:gap-30 pt-8'>
          <a
            href='https://route-planner-nextjs.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:underline hover:underline-offset-4 decoration-2'
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
            className='font-semibold hover:underline hover:underline-offset-4 decoration-2'
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
