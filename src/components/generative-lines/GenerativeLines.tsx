'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useGeneratedPattern } from './useGeneratedPattern'

const WIDTH = 620
const HEIGHT = 1600

/**
 * Experimental alternative to page-lines/: an algorithmically-generated
 * circuit pattern instead of hand-placed coordinates, so it isn't tied to
 * guessing exact section heights on a page whose content is inherently
 * variable. No avoid-rects needed: exposed text sits on its own frosted-
 * glass backdrop (TextBlurBackdrop) that keeps it legible regardless of
 * what passes behind it, so the walk is free to roam the full page.
 * Lower opacity (10%) than the hand-authored version, since a denser
 * generated pattern reads as busier at the same opacity.
 *
 * Re-rolled with a fresh random seed on every resize (see
 * useGeneratedPattern) — the canvas itself stays a fixed 620x1600 (still
 * scales uniformly via width:100% height:auto, no distortion); only which
 * pattern fills it changes.
 */
export function GenerativeLines() {
  const reduced = useReducedMotion()
  const pattern = useGeneratedPattern()

  if (!pattern) return null

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className='pointer-events-none absolute top-0 left-0 w-full opacity-10'
    >
      {pattern.branches.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill='none'
          strokeWidth={1.5}
          strokeLinecap='round'
          className='stroke-accent'
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
        />
      ))}
      {pattern.nodes.map((n, i) => (
        <motion.circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r={3}
          className='fill-accent'
          initial={reduced ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
        />
      ))}
    </svg>
  )
}
