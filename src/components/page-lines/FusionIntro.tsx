'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const SPLICE_X = 310
export const SPLICE_Y = 100
const LEFT_DROP_X = 170
const RIGHT_DROP_X = 450

// Two fibers drop down from the nav gaps either side of the link cluster
// (roughly logo↔About on the left, Contact↔Resume on the right), then
// bend toward each other and meet at the splice point.
const strands = [
  `M ${LEFT_DROP_X} -20 L ${LEFT_DROP_X} ${SPLICE_Y} L ${SPLICE_X} ${SPLICE_Y}`,
  `M ${RIGHT_DROP_X} -20 L ${RIGHT_DROP_X} ${SPLICE_Y} L ${SPLICE_X} ${SPLICE_Y}`,
]

const FIBER_DELAY = 0.2
const FIBER_DRAW = 0.5
const FIBER_HOLD = 0.4
const FIBER_FADE = 0.4
const FIBER_TOTAL = FIBER_DRAW + FIBER_HOLD + FIBER_FADE
const FIBER_TIMES = [0, FIBER_DRAW / FIBER_TOTAL, (FIBER_DRAW + FIBER_HOLD) / FIBER_TOTAL, 1]

const FLASH_DELAY = FIBER_DELAY + FIBER_DRAW
const FLASH_DURATION = 0.6

/** When a variant's own routing should start drawing, once the fusion has fully played out and faded. */
export const FUSION_SETTLE_TIME = FIBER_DELAY + FIBER_TOTAL + 0.1

/**
 * Shared hero-effect intro: two fibers drop from the nav gaps, bend toward
 * each other, meet at (SPLICE_X, SPLICE_Y), fuse with a glow, then both the
 * fibers and the flash fade away entirely. This behavior is settled — reuse
 * it as-is in every variant. Render inside your own
 * `<svg viewBox="0 0 620 440">` alongside whatever routing follows, starting
 * that routing at `FUSION_SETTLE_TIME` and anchoring it to `SPLICE_X`/`SPLICE_Y`.
 */
export function FusionIntro() {
  const reduced = useReducedMotion()

  return (
    <>
      {strands.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill='none'
          strokeWidth={1.5}
          strokeLinecap='round'
          className='stroke-accent'
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
          transition={{
            pathLength: { duration: FIBER_DRAW, delay: FIBER_DELAY + i * 0.05, ease: 'easeOut' },
            opacity: { duration: FIBER_TOTAL, delay: FIBER_DELAY, times: FIBER_TIMES },
          }}
        />
      ))}

      {/* Splice flash — soft blurred halo behind a bright core burst, both fade to nothing */}
      <motion.circle
        cx={SPLICE_X}
        cy={SPLICE_Y}
        r={10}
        className='fill-accent'
        style={{ filter: 'blur(6px)' }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.8, 0], scale: [0.4, 2.2, 2.6] }}
        transition={{ duration: FLASH_DURATION, delay: FLASH_DELAY, ease: 'easeOut' }}
      />
      <motion.circle
        cx={SPLICE_X}
        cy={SPLICE_Y}
        r={3}
        fill='#f7fffb'
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 1.2] }}
        transition={{ duration: FLASH_DURATION, delay: FLASH_DELAY, ease: 'easeOut' }}
      />
    </>
  )
}
