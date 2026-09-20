'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const paths = [
  'M -40 110 L 150 110 L 150 30 L 360 30',
  'M -40 250 L 100 250 L 100 340 L 310 340 L 310 420',
  'M 660 60 L 500 60 L 500 170 L 360 170',
  'M 660 380 L 540 380 L 540 250 L 430 250',
]

const nodes = [
  { cx: 150, cy: 30 },
  { cx: 360, cy: 30 },
  { cx: 310, cy: 420 },
  { cx: 500, cy: 170 },
  { cx: 360, cy: 170 },
  { cx: 430, cy: 250 },
]

/** Hero background option: a fiber/circuit-trace line pattern that draws itself in once on load. */
export function FiberLines() {
  const reduced = useReducedMotion()

  return (
    <svg
      aria-hidden
      viewBox='0 0 620 440'
      preserveAspectRatio='xMidYMid slice'
      className='pointer-events-none absolute inset-0 h-full w-full opacity-40'
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill='none'
          strokeWidth={1.5}
          strokeLinecap='round'
          className='stroke-accent'
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r={3}
          className='fill-accent'
          initial={reduced ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
        />
      ))}
    </svg>
  )
}
