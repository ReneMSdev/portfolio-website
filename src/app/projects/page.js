import Image from 'next/image'

export default function ProjectsPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
      {/* Project 1 Text */}
      <div>
        <h1 className='text-4xl font-semibold'>Project Name</h1>
        <p className='max-w-md pt-10'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra lobortis metus,
          nec ultricies sem mollis quis. In sed libero condimentum, facilisis turpis ut, placerat
          risus. Curabitur euismod dignissim purus dapibus bibendum.
        </p>
        <p className='max-w-md pt-4  pb-10'>
          Maecenas laoreet tincidunt elit eu interdum. Proin tempus sit amet velit sit amet
          vulputate. Phasellus congue dictum est, ut congue justo pulvinar in. Nulla facilisi.
          Maecenas elementum, nibh nec pharetra vestibulum, felis elit vehicula tellus, sit amet
          pulvinar ante sem eu lorem. Pellentesque blandit eget elit non rhoncus.
        </p>
      </div>

      {/* Project 1 Image */}
      <div className='flex justify-center'>
        <Image
          src='/routeplanner1.jpg'
          alt='Rene Maxey-Salomone'
          width={500}
          height={0}
          layout='intrinsic'
          className='border-2 border-slate-500'
        />
      </div>

      {/* Project 2 Image */}
      <div className='flex justify-center'>
        <Image
          src='/routeplanner1.jpg'
          alt='Rene Maxey-Salomone'
          width={500}
          height={0}
          layout='intrinsic'
          className='border-2 border-slate-500'
        />
      </div>

      {/* Project 2 Text */}

      <div>
        <h1 className='text-4xl font-semibold'>Project Name</h1>
        <p className='max-w-md pt-10'>
          Ut ac ultricies massa, vitae laoreet tortor. Pellentesque imperdiet ornare est, sit amet
          elementum leo dignissim vel. Curabitur commodo justo sem, eget molestie sem aliquam eu.
          Integer at mauris in ipsum molestie iaculis quis dapibus dolor. Curabitur in odio ac
          sapien eleifend tincidunt.
        </p>
        <p className='max-w-md pt-4 pb-10'>
          Maecenas laoreet tincidunt elit eu interdum. Proin tempus sit amet velit sit amet
          vulputate. Phasellus congue dictum est, ut congue justo pulvinar in. Nulla facilisi.
          Maecenas elementum, nibh nec pharetra vestibulum, felis elit vehicula tellus, sit amet
          pulvinar ante sem eu lorem. Pellentesque blandit eget elit non rhoncus.
        </p>
      </div>

      {/* Project 3 Text */}

      <div>
        <h1 className='text-4xl font-semibold'>Project Name</h1>
        <p className='max-w-md pt-10'>
          Ut ac ultricies massa, vitae laoreet tortor. Pellentesque imperdiet ornare est, sit amet
          elementum leo dignissim vel. Curabitur commodo justo sem, eget molestie sem aliquam eu.
          Integer at mauris in ipsum molestie iaculis quis dapibus dolor. Curabitur in odio ac
          sapien eleifend tincidunt.
        </p>
        <p className='max-w-md pt-4 pb-10'>
          Maecenas laoreet tincidunt elit eu interdum. Proin tempus sit amet velit sit amet
          vulputate. Phasellus congue dictum est, ut congue justo pulvinar in. Nulla facilisi.
          Maecenas elementum, nibh nec pharetra vestibulum, felis elit vehicula tellus, sit amet
          pulvinar ante sem eu lorem. Pellentesque blandit eget elit non rhoncus.
        </p>
      </div>

      {/* Project 3 Image */}

      <div className='flex justify-center'>
        <Image
          src='/routeplanner1.jpg'
          alt='Rene Maxey-Salomone'
          width={500}
          height={0}
          layout='intrinsic'
          className='border-2 border-slate-500'
        />
      </div>
    </div>
  )
}
