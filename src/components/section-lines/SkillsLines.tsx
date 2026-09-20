'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Both branches clear the "Skills" header (top-left, roughly x:60-150
// y:0-60) then move freely — the terminal window is opaque and covers
// everything below that, so there's nothing else to dodge. The left-side
// entry sits at y=100 (not right at the header's edge) so it stays clear
// even as the header's position shifts slightly across viewport widths.
const branches = [
  'M -20 100 L 130 100 L 130 160 L 320 160 L 320 40 L 480 40 L 480 250 L 640 250',
  'M 640 110 L 500 110 L 500 300 L 350 300',
]

const nodes = [
  { cx: 130, cy: 160 },
  { cx: 320, cy: 40 },
  { cx: 480, cy: 250 },
  { cx: 500, cy: 300 },
  { cx: 350, cy: 300 },
]

interface SkillsLinesProps {
  viewBox: string
  /** Don't start drawing until the terminal's own command sequence has finished. */
  active: boolean
}

/** Skills' line-art segment — routes freely behind the (opaque) terminal window, only clearing the header. */
export function SkillsLines({ viewBox, active }: SkillsLinesProps) {
  const reduced = useReducedMotion()

  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio='none'
      className='pointer-events-none absolute inset-0 h-full w-full opacity-40'
    >
      {branches.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill='none'
          strokeWidth={1.5}
          strokeLinecap='round'
          className='stroke-accent'
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.3, delay: i * 0.3, ease: 'easeOut' }}
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
          animate={active ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
        />
      ))}
    </svg>
  )
}
