'use client'

import { motion } from 'motion/react'

const facts = [
  'B.S. Computer Science · WGU 2024',
  '8+ yrs fiber & telecom field work',
  'TDLR Apprentice Electrician License',
  'Founder, Salo Labs LLC',
]

export default function About() {
  return (
    <motion.section
      id='about'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className='scroll-mt-14 bg-surface border-y border-border'
    >
      <div className='max-w-5xl mx-auto px-4 md:px-16 py-20 flex flex-col gap-7'>
        <p className='font-mono text-base text-accent uppercase tracking-wider'>About</p>

        <div className='flex flex-col md:flex-row gap-8 md:gap-20'>
          <p className='max-w-[560px] text-[17px] leading-[1.7] text-body'>
            CS graduate (WGU, 2024) and solo technical founder with 8+ years in fiber optic
            installation and telecom field work. Now building production-grade software solo —
            FastAPI backends, Next.js frontends, and cloud infrastructure — while transitioning
            fully into engineering.
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
