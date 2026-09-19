'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface EmblaCarouselProps {
  slides: string[]
}

export default function EmblaCarousel({ slides }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <div className='relative w-full max-w-screen-sm mx-auto overflow-hidden rounded-lg shadow-lg shadow-black/50'>
      <div
        className='embla'
        ref={emblaRef}
      >
        <div className='flex'>
          {slides.map((src, index) => (
            <div
              className='min-w-0 flex-[0_0_100%]'
              key={index}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className='w-full h-auto object-cover'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-surface/80 rounded-full p-2 shadow-md text-foreground'
      >
        <ArrowLeft size={15} />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-surface/80 rounded-full p-2 shadow-md text-foreground'
      >
        <ArrowRight size={15} />
      </button>
    </div>
  )
}
