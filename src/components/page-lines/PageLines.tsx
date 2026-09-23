'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLineEditMode } from '@/components/line-editor/useLineEditMode'
import { EditableLineLayer } from '@/components/line-editor/EditableLineLayer'
import { parsePath } from '@/components/line-editor/pathUtils'
import { FusionIntro, FUSION_SETTLE_TIME } from './FusionIntro'
import { useLineLayoutTier, type LineLayoutTier } from './useLineLayoutTier'

const CIRCUIT_START = FUSION_SETTLE_TIME

// One draw speed for the whole design, so it reads as a single continuous
// growth flowing down the page rather than several separately-timed
// reveals — a branch's duration is its own length / SPEED (longer once
// extended down the page takes proportionally longer to draw), and it
// starts once the "front" reaches its own starting height.
const SPEED = 300 // viewBox units per second

function branchLength(d: string) {
  const points = parsePath(d)
  let length = 0
  for (let i = 1; i < points.length; i++) {
    length += Math.abs(points[i].x - points[i - 1].x) + Math.abs(points[i].y - points[i - 1].y)
  }
  return length
}

function startY(d: string) {
  return parsePath(d)[0]?.y ?? 0
}

interface NodePoint {
  cx: number
  cy: number
}

// One continuous design for the whole page, instead of separate per-section
// line art, keyed by breakpoint tier (matching Tailwind's md/lg) since a
// full-page design needs its own shape at each width — same idea as Hero's
// old wide/compact split. Only `lg` (1024px+) is built out so far; `md`/`sm`
// fall back to it below until they get their own pass.
const lgBranches = [
  // Fibers in, through the splice.
  'M -40 98 L 150 98 L 150 53 L 310 53',
  // Main trunk: a loose meander through About/Skills/Projects (all fine
  // to cross freely — occluded or protected) before shifting right into
  // Contact's safe zone (x>480, clear of its left-aligned text).
  'M 454 170 L 454 500 L 300 500 L 300 727 L 525 727 L 525 913 L 194 913 L 194 1212 L 544 1212 L 544 1528',
  'M -40 250 L 60 250 L 60 304 L 257 304 L 257 601',
  'M 660 60 L 500 60 L 500 170 L 360 170',
  'M 660 380 L 540 380 L 540 260 L 454 260',
  // Branches off the main trunk, through the Projects grid area.
  'M 467 727 L 467 760 L 360 760',
  'M 394 913 L 394 954 L 301 954',
  'M 464 913 L 464 984 L 352 984',
  'M 238 1212 L 238 1273 L 439 1273 L 439 1394',
  'M 327 1212 L 327 1317 L 489 1317 L 489 1463',
]

const lgNodes: NodePoint[] = [
  { cx: 150, cy: 53 },
  { cx: 310, cy: 53 },
  { cx: 257, cy: 601 },
  { cx: 500, cy: 170 },
  { cx: 454, cy: 170 },
  { cx: 454, cy: 260 },
  { cx: 360, cy: 170 },
  { cx: 544, cy: 1528 },
  { cx: 467, cy: 727 },
  { cx: 360, cy: 760 },
  { cx: 394, cy: 913 },
  { cx: 301, cy: 954 },
  { cx: 464, cy: 913 },
  { cx: 352, cy: 984 },
  { cx: 238, cy: 1212 },
  { cx: 439, cy: 1394 },
  { cx: 327, cy: 1212 },
  { cx: 489, cy: 1463 },
]

// Fixed viewBox height per tier — NOT measured live. The design is authored
// against this height; the SVG then sizes itself like a normal image (width
// 100%, height auto) so it scales uniformly with page width and never
// distorts/rescales on resize. If real content ends up taller than this,
// the bottom is simply uncovered — extend the design deliberately via the
// editor rather than growing this to chase it automatically.
const branchSets: Record<LineLayoutTier, { branches: string[]; nodes: NodePoint[]; height: number }> = {
  lg: { branches: lgBranches, nodes: lgNodes, height: 1600 },
  md: { branches: lgBranches, nodes: lgNodes, height: 1600 },
  sm: { branches: lgBranches, nodes: lgNodes, height: 1600 },
}

/** The whole page's fiber/circuit line art: the fusion intro, then one continuous set of circuit traces down the page. */
export function PageLines() {
  const reduced = useReducedMotion()
  const editing = useLineEditMode()
  const tier = useLineLayoutTier()
  const { branches, nodes, height } = branchSets[tier]

  return (
    <svg
      aria-hidden
      viewBox={`0 0 620 ${height}`}
      className={`absolute top-0 left-0 w-full opacity-25 ${editing ? '' : 'pointer-events-none'}`}
    >
      <FusionIntro />

      {editing ? (
        <EditableLineLayer
          id={`page-${tier}`}
          branches={branches}
        />
      ) : (
        <>
          {branches.map((d) => (
            <motion.path
              key={d}
              d={d}
              fill='none'
              strokeWidth={1.5}
              strokeLinecap='round'
              className='stroke-accent'
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: branchLength(d) / SPEED,
                delay: CIRCUIT_START + startY(d) / SPEED,
                ease: 'linear',
              }}
            />
          ))}
          {nodes.map((n) => (
            <motion.circle
              key={`${n.cx}-${n.cy}`}
              cx={n.cx}
              cy={n.cy}
              r={3}
              className='fill-accent'
              initial={reduced ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: CIRCUIT_START + n.cy / SPEED }}
            />
          ))}
        </>
      )}
    </svg>
  )
}
