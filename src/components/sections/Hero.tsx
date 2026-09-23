'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { EditModeDim } from '@/components/line-editor/EditModeDim'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative scroll-mt-14 min-h-screen flex items-center justify-center overflow-hidden'
    >
      <EditModeDim className='relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-10 max-w-4xl mx-auto'>
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='order-1 md:order-2 shrink-0'
        >
          <Image
            src='/img/profile/profile.jpg'
            alt='René Maxey-Salomone'
            width={220}
            height={330}
            className='rounded-md ring-1 ring-accent/20'
            priority
          />
        </motion.div>

        <div className='order-2 md:order-1 flex flex-col items-center md:items-start gap-4 text-center md:text-left'>
          <motion.h1
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.6 }}
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
      </EditModeDim>
    </section>
  )
}
