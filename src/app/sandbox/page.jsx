'use client'

export default function SandboxPage() {
  return (
    <div className='pt-8 flex flex-row justify-center gap-10'>
      {/* Image Column */}
      <div className='flex flex-col items-center'>
        <img
          src='/img/cloud/CloudText.png'
          alt='Cloud'
          className='w-[420px] h-[auto]'
        />
        <h2>Under the Cloud</h2>
      </div>

      {/* Text Column */}
      <div className='flex flex-col items-start pt-12'>
        <h1 className='text-3xl font-semibold text-slate-700 dark:text-[#FEBA74]'>
          René
          <br className='' /> Maxey-
          <br className='' />
          Salomone
        </h1>
        <h2 className='text-xl mt-2 font-semibold'>
          <span className='text-red-400'>Full-Stack</span> Developer
        </h2>
        <p className={'max-w-sm pt-6 text-md text-slate-900 dark:text-slate-200'}>
          {
            "Hi, I'm René, a software developer with a background in computer science and a growing interest and expertise in cloud technologies. I’m driven by problem-solving and enjoy building human-centered web and mobile applications."
          }
        </p>
        <p className='pt-2 text-blue-500'>Read more</p>
      </div>
    </div>
  )
}
