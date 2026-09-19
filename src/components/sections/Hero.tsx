'use client'

import { motion } from 'motion/react'
import { DotBackground } from '@/components/ui/dot-background'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <DotBackground
      className='scroll-mt-14 min-h-screen flex items-center justify-center'
      id='hero'
    >
      <div className='flex flex-col items-center gap-3 px-4 md:px-10 text-center max-w-5xl mx-auto'>
        <motion.h1
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6 }}
          className='text-4xl md:text-6xl font-semibold text-foreground leading-tight'
        >
          Hi, I&apos;m René
        </motion.h1>
        <motion.h2
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-xl md:text-3xl font-semibold'
        >
          <span className='text-accent'>Full-Stack</span> Developer
        </motion.h2>
      </div>
    </DotBackground>
  )
}
