import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export default function ProjectsPage() {
  const projectOneImages = ['/routeplanner1.jpg', '/routeplanner2.jpg']

  return (
    <div className='grid grid-cols-1 gap-8 items-start px-4'>
      {/* Project 1 */}
      <div className='flex flex-col items-start max-w-4xl mx-auto'>
        {/* ShadCN Carousel */}
        <div className='w-full max-w-lg'>
          <Carousel
            className='w-full'
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
        <div className='mt-8'>
          <h1 className='text-4xl font-semibold'>Route Boss</h1>
          <p className='max-w-md mt-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra lobortis
            metus, nec ultricies sem mollis quis. In sed libero condimentum, facilisis turpis ut,
            placerat risus. Curabitur euismod dignissim purus dapibus bibendum.
          </p>
          <p className='max-w-md mt-4  mb-10'>
            Maecenas laoreet tincidunt elit eu interdum. Proin tempus sit amet velit sit amet
            vulputate. Phasellus congue dictum est, ut congue justo pulvinar in. Nulla facilisi.
            Maecenas elementum, nibh nec pharetra vestibulum, felis elit vehicula tellus, sit amet
            pulvinar ante sem eu lorem. Pellentesque blandit eget elit non rhoncus.
          </p>
        </div>
      </div>
    </div>
  )
}
