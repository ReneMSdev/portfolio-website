'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useHeroLayoutPreset } from './useHeroLayoutPreset'
import { FusionIntro, FUSION_SETTLE_TIME } from './FusionIntro'

const CIRCUIT_START = FUSION_SETTLE_TIME

// LOCKED — approved, do not adjust without being asked. The FiberLines
// composition, re-tuned to clear the text column at full desktop width
// (roughly x:120-390) as the viewport narrows toward the 1024px breakpoint.
const wideBranches = [
  'M -40 110 L 150 110 L 150 30 L 360 30',
  'M -40 250 L 60 250 L 60 340 L 250 340 L 250 420',
  'M 660 60 L 500 60 L 500 170 L 360 170',
  'M 660 380 L 540 380 L 540 250 L 430 250',
]

const wideNodes = [
  { cx: 150, cy: 30 },
  { cx: 360, cy: 30 },
  { cx: 250, cy: 420 },
  { cx: 500, cy: 170 },
  { cx: 360, cy: 170 },
  { cx: 430, cy: 250 },
]

// Narrower viewports (squeezed two-column, or fully stacked under `md`)
// can't guarantee exactly where the text column ends, but it can pass
// behind the photo (same interplay as the wide route) and underneath the
// text once it's below the content — it just can't cross the text itself.
// Deliberately asymmetric rather than a mirrored left/right pair.
const compactBranches = [
  'M 310 100 L 60 100 L 60 400',
  'M 310 100 L 390 100 L 390 400',
  'M 310 100 L 560 100 L 560 200 L 610 200 L 610 380',
  'M 310 100 L 470 100 L 470 340 L 130 340 L 130 400',
]

const compactNodes = [
  { cx: 560, cy: 200 },
  { cx: 610, cy: 200 },
  { cx: 610, cy: 380 },
  { cx: 470, cy: 340 },
  { cx: 130, cy: 340 },
  { cx: 130, cy: 400 },
  { cx: 60, cy: 400 },
  { cx: 390, cy: 400 },
]

/** Hero background option: two fibers meet beneath the nav and fuse (see FusionIntro), then a circuit pattern draws in — routed to clear the text at the current viewport width. */
export function FusionSplice() {
  const reduced = useReducedMotion()
  const layout = useHeroLayoutPreset()
  const branches = layout === 'wide' ? wideBranches : compactBranches
  const branchNodes = layout === 'wide' ? wideNodes : compactNodes

  return (
    <svg
      aria-hidden
      viewBox='0 0 620 440'
      preserveAspectRatio='xMidYMid slice'
      className='pointer-events-none absolute inset-0 h-full w-full opacity-40'
    >
      <FusionIntro />

      {branches.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill='none'
          strokeWidth={1.5}
          strokeLinecap='round'
          className='stroke-accent'
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: CIRCUIT_START + i * 0.2, ease: 'easeOut' }}
        />
      ))}
      {branchNodes.map((n, i) => (
        <motion.circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r={3}
          className='fill-accent'
          initial={reduced ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: CIRCUIT_START + 0.7 + i * 0.15 }}
        />
      ))}
    </svg>
  )
}
