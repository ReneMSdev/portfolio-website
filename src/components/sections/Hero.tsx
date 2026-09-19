import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id='hero'
      className='scroll-mt-14 min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-10 pt-20 md:pt-0 max-w-5xl mx-auto'
    >
      <Image
        src='/img/profile/profile.jpg'
        alt='Rene Maxey-Salomone'
        width={250}
        height={375}
        className='rounded-md order-1 md:order-2'
        priority
      />

      <div className='order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left'>
        <h1 className='text-3xl md:text-6xl font-semibold text-foreground'>
          René
          <br className='hidden md:inline' /> Maxey-
          <br className='hidden md:inline' />
          Salomone
        </h1>
        <h2 className='text-xl md:text-3xl mt-2 font-semibold'>
          <span className='text-accent'>Full-Stack</span> Developer
        </h2>
      </div>
    </section>
  )
}
