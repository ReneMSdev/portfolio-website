'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { RIGHT_EDGE_X } from './anchors'

// LOCKED for large screens — approved, do not adjust without being asked.
// (Not yet tuned for narrower/stacked layouts — may need a compact preset
// later, same idea as Hero's wide/compact split.)
// Both branches clear the "Projects" header (top-left, roughly x:60-150
// y:0-60), then route freely — every card is an opaque bg-surface panel,
// so anything passing behind one is simply hidden. The left-side entry
// sits at y=100 (not right at the header's edge) so it stays clear even
// as the header's position shifts slightly across viewport widths.
// Kept apart on purpose (previous version crossed at a right angle and
// read as a pinwheel/swastika shape) — these never intersect.
function buildBranches(height: number) {
  return [
    'M -20 100 L 150 100 L 150 220 L 320 220 L 320 380',
    // Hands off to Contact at the shared right-edge anchor, right at this
    // section's true bottom edge.
    `M 640 130 L 480 130 L 480 260 L ${RIGHT_EDGE_X} 260 L ${RIGHT_EDGE_X} ${height}`,
  ]
}

const nodes = [
  { cx: 150, cy: 220 },
  { cx: 320, cy: 220 },
  { cx: 320, cy: 380 },
  { cx: 480, cy: 130 },
  { cx: 480, cy: 260 },
  // No node at the Contact handoff itself — it sits right on the section's
  // `overflow-hidden` bottom edge, so a circle there renders half-clipped.
]

interface ProjectsLinesProps {
  viewBox: string
  height: number
}

/** Projects' line-art segment — routes freely behind the (opaque) project cards, only clearing the header, and hands off to Contact at the shared right-edge anchor. */
export function ProjectsLines({ viewBox, height }: ProjectsLinesProps) {
  const reduced = useReducedMotion()
  const branches = buildBranches(height)

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
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
        />
      ))}
    </svg>
  )
}
