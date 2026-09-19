'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section
      id='hero'
      className='scroll-mt-14 min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-10 pt-20 md:pt-0 max-w-5xl mx-auto'
    >
      <motion.div
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='order-1 md:order-2'
      >
        <Image
          src='/img/profile/profile.jpg'
          alt='Rene Maxey-Salomone'
          width={250}
          height={375}
          className='rounded-md'
          priority
        />
      </motion.div>

      <div className='order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left'>
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.5 }}
          className='font-mono text-sm text-accent uppercase tracking-wider mb-4'
        >
          Hi, I&apos;m
        </motion.p>
        <motion.h1
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6, delay: 0.05 }}
          className='text-4xl md:text-6xl font-semibold text-foreground leading-tight'
        >
          René
          <br className='hidden md:inline' /> Maxey-
          <br className='hidden md:inline' />
          Salomone
        </motion.h1>
        <motion.h2
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-xl md:text-3xl mt-3 font-semibold'
        >
          <span className='text-accent'>Full-Stack</span> Developer
        </motion.h2>
      </div>
    </section>
  )
}
