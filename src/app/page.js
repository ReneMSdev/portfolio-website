import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
      {/* Text Column */}
      <div className=''>
        <h1 className='text-4xl font-semibold'>Rene Maxey-Salomone</h1>
        <h2 className='text-2xl mt-2 font-semibold'>Full-Stack Software Engineer</h2>

        <p className='max-w-md pt-10'>
          I am a software engineer looking for work. I specialize in building websites. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Maecenas viverra lobortis metus, nec
          ultricies sem mollis quis. In sed libero condimentum, facilisis turpis ut, placerat risus.
        </p>
        <div></div>
      </div>

      {/* Image Column */}
      <div className='flex justify-center'>
        <Image
          src='/profile1.jpg'
          alt='Rene Maxey-Salomone'
          width={250}
          height={0}
          layout='intrinsic'
        />
      </div>
    </div>
  )
}
