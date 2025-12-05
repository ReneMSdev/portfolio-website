import { FaCode, FaUnlink } from 'react-icons/fa'
import { MdOutlineWeb } from 'react-icons/md'
import EmblaCarousel from '@/components/EmblaCarousel'

const builtWith = 'text-lg font-semibold text-slate-700 dark:text-[#A8DADC] mt-4'
const builtWithText = 'mt-1 max-w-lg text-slate-900 dark:text-slate-200'
const lightBackground = 'bg-slate-200 dark:bg-slate-800'

export default function ProjectItem({
  lightBackground,
  images,
  title,
  description,
  techStack,
  demoLink,
  codeLink,
}) {
  return (
    <div className='flex flex-col items-start px-6'>
      {/* Embla Carousel */}
      <EmblaCarousel slides={images} />

      {/* Text */}
      <div className='mt-10 mx-auto'>
        <h2 className='text-3xl text-slate-700 dark:text-[#A8DADC] font-semibold text-center md:text-start'>
          {title}
        </h2>
        {description}
        <p className={builtWith}>Built with:</p>
        <p className={builtWithText}>{techStack}</p>
      </div>

      {/* Demo & Code links */}
      <div className='flex mx-auto gap-16 md:gap-30 pt-8  mb-6'>
        {demoLink ? (
          <a
            href={demoLink}
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-blue-500'
          >
            <div className='flex items-center gap-2'>
              <MdOutlineWeb className='text-xl' />
              Demo
            </div>
          </a>
        ) : (
          <div className='font-semibold opacity-50 cursor-not-allowed'>
            <div className='flex items-center gap-2'>
              <FaUnlink className='text-md' />
              Demo
            </div>
          </div>
        )}
        <a
          href={codeLink}
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
  )
}
