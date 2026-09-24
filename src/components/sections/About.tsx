'use client'

import { motion } from 'motion/react'

const facts = [
  'B.S. Computer Science · WGU 2024',
  '5+ yrs fiber & telecom field work',
  'Freelance Developer, Salo Labs LLC',
]

export default function About() {
  return (
    <motion.section
      id='about'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className='relative scroll-mt-14 bg-surface border-y border-border'
    >
      <div className='max-w-5xl mx-auto px-4 md:px-16 py-20 flex flex-col gap-7'>
        <p className='font-mono text-3xl font-semibold text-accent lowercase'>About</p>

        <div className='flex flex-col md:flex-row gap-8 md:gap-20'>
          <p className='max-w-[560px] text-[17px] leading-[1.7] text-body'>
            CS graduate (WGU) with 5+ years in fiber optic and telecom field work, currently
            transitioning into software — self-taught, with a B.S. in Computer Science earned
            while traveling. Now building full-stack applications and websites through personal
            projects and freelance work, with ongoing studies into cloud and AI infrastructure.
          </p>

          <div className='flex flex-col gap-[18px] md:pl-10 md:border-l md:border-border'>
            {facts.map((fact) => (
              <div
                key={fact}
                className='font-mono text-sm text-muted-foreground'
              >
                {fact}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
