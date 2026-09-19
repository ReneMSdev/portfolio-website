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
      <div className='flex flex-col items-center gap-4 px-4 md:px-10 text-center max-w-2xl mx-auto'>
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.5 }}
          className='font-mono text-sm text-accent uppercase tracking-wider'
        >
          Available for full-time roles
        </motion.p>
        <motion.h1
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6, delay: 0.05 }}
          className='text-4xl md:text-[64px] font-bold text-foreground leading-tight'
        >
          Hi, I&apos;m René
        </motion.h1>
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='font-mono text-base md:text-[18px] text-muted-foreground'
        >
          Full-Stack Developer — Austin, TX
        </motion.p>
        <motion.p
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6, delay: 0.15 }}
          className='text-[17px] text-muted-foreground max-w-md leading-relaxed'
        >
          Building AI-powered tools and cloud-native backend systems — from resume automation to
          distributed identity platforms.
        </motion.p>
      </div>
    </DotBackground>
  )
}
