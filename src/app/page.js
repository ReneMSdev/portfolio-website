import Image from 'next/image'

export default function Home() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
      {/* Image Column - top for small screens, right for md+ */}
      <div className='order-1 md:order-2 flex justify-center'>
        <Image
          src='/profile1.jpg'
          alt='Rene Maxey-Salomone'
          width={250}
          height={0}
          layout='intrinsic'
        />
      </div>

      {/* Text Column - below image on small screens, left on md+ */}
      <div className='order-2 md:order-1 flex flex-col items-center md:items-start'>
        <h1 className='text-4xl font-semibold'>Rene Maxey-Salomone</h1>
        <h2 className='text-2xl mt-2 font-semibold'>Full-Stack Software Engineer</h2>

        <p className='max-w-md pt-10'>
          Hi, I&apos;m Rene &mdash; a software engineer with a background in design and a passion
          for building human-centered web applications. I work primarily with JavaScript, Next.js,
          Node.js, and Python, and love crafting clean, scalable solutions that solve real problems.
        </p>
        <p className='max-w-md pt-4'>
          After earning my B.S. in Computer Science, I&apos;ve developed a variety of projects
          working freelance for small businesses and entreprenuers. Through collaboration I&apos;ve
          helped to bring my clients ideas to life. I approach software with both a developer&apos;s
          logic and a designer&apos;s eye, always striving to create seamless user experiences.
        </p>
        <p className='max-w-md pt-4'>
          I&apos;m currently open to full-time roles where I can contribute to meaningful products,
          continue learning, and collaborate with thoughtful teams.
        </p>
        <p className='max-w-md pt-4'>
          Outside of coding, you&apos;ll usually find me traveling, descovering new coffee shops,
          and working on my next spotify playlist. Feel free to reach out &mdash; I&apos;m always
          happy to connect, collaborate, or just chat about technology.
        </p>

        {/* Resume & Github links */}
        <div className='flex gap-12 pt-8'>
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-indigo-400'
          >
            Resume
          </a>
          <a
            href='https://github.com/ReneMSdev'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold hover:text-indigo-400'
          >
            Github
          </a>
        </div>
      </div>
    </div>
  )
}
