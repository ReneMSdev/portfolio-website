'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  images: string[]
  alt: string
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)

  if (images.length === 0) return null

  const goTo = (i: number) => setIndex((i + images.length) % images.length)

  return (
    <div className='relative w-full aspect-video rounded-md overflow-hidden mb-6 bg-surface'>
      <AnimatePresence
        mode='wait'
        initial={false}
      >
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='absolute inset-0'
        >
          <Image
            src={images[index]}
            alt={`${alt} screenshot ${index + 1} of ${images.length}`}
            fill
            sizes='(max-width: 896px) 100vw, 896px'
            className='object-cover'
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type='button'
            onClick={() => goTo(index - 1)}
            aria-label='Previous screenshot'
            className='absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 text-foreground hover:text-accent transition-colors cursor-pointer'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button
            type='button'
            onClick={() => goTo(index + 1)}
            aria-label='Next screenshot'
            className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/70 text-foreground hover:text-accent transition-colors cursor-pointer'
          >
            <ChevronRight className='w-5 h-5' />
          </button>

          <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5'>
            {images.map((src, i) => (
              <button
                key={src}
                type='button'
                onClick={() => goTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                  i === index ? 'bg-accent' : 'bg-foreground/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
