'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { RIGHT_EDGE_X } from './anchors'

// LOCKED for large screens — approved, do not adjust without being asked.
// (Not yet tuned for narrower/stacked layouts — may need a compact preset
// later, same idea as Hero's wide/compact split.)
// Contact has no protective element behind its text (unlike Skills'
// terminal or Projects' cards), so these actually have to avoid the
// content — the header, description, and link list are all left-aligned
// and stay well left of x=480, so everything here stays right of that.
// Continues in from Projects at the shared right-edge anchor.
const branches = [
  `M ${RIGHT_EDGE_X} 0 L ${RIGHT_EDGE_X} 150 L 480 150 L 480 300 L 600 300 L 600 400`,
  'M 640 80 L 590 80 L 590 220',
]

const nodes = [
  { cx: RIGHT_EDGE_X, cy: 150 },
  { cx: 480, cy: 150 },
  { cx: 480, cy: 300 },
  { cx: 600, cy: 300 },
  { cx: 600, cy: 400 },
  { cx: 590, cy: 220 },
]

interface ContactLinesProps {
  viewBox: string
}

/** Contact's line-art segment — continues from Projects' handoff, staying right of the (unprotected) text content. */
export function ContactLines({ viewBox }: ContactLinesProps) {
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
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: i * 0.3, ease: 'easeOut' }}
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
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
        />
      ))}
    </svg>
  )
}
