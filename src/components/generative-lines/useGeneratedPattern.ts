'use client'

import { useSyncExternalStore } from 'react'
import { generateCircuitBranches, type NodePoint } from './generateCircuit'

const WIDTH = 620

// Mobile stacks the whole page into one narrow column (no side-by-side
// layouts like Hero's image or Projects' 2-col grid), so it's far taller
// relative to its width than desktop is. A single fixed aspect ratio can't
// serve both — below the md breakpoint we use a much taller canvas so the
// pattern still reaches the bottom of the page instead of only covering
// Hero. Any excess is invisible: PageLinesLayer clips overflow.
const MOBILE_QUERY = '(max-width: 767px)'
const HEIGHT_DESKTOP = 1600
const HEIGHT_MOBILE = 5200
const BRANCH_COUNT_DESKTOP = 26
const BRANCH_COUNT_MOBILE = 42
const RESIZE_DEBOUNCE_MS = 400

export interface Pattern {
  branches: string[]
  nodes: NodePoint[]
  width: number
  height: number
}

function randomSeed() {
  return Math.floor(Math.random() * 1_000_000)
}

function generate(): Pattern {
  const isMobile = window.matchMedia(MOBILE_QUERY).matches
  const height = isMobile ? HEIGHT_MOBILE : HEIGHT_DESKTOP
  const branchCount = isMobile ? BRANCH_COUNT_MOBILE : BRANCH_COUNT_DESKTOP

  return {
    width: WIDTH,
    height,
    ...generateCircuitBranches({ width: WIDTH, height, branchCount, seed: randomSeed() }),
  }
}

let pattern: Pattern | null = null

function subscribe(callback: () => void) {
  // First subscriber ever (client-only — subscribe never runs during SSR):
  // generate the initial pattern right away instead of waiting for a resize.
  if (!pattern) {
    pattern = generate()
    callback()
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const handleResize = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      pattern = generate()
      callback()
    }, RESIZE_DEBOUNCE_MS)
  }

  window.addEventListener('resize', handleResize)
  return () => {
    clearTimeout(timeoutId)
    window.removeEventListener('resize', handleResize)
  }
}

function getSnapshot() {
  return pattern
}

function getServerSnapshot() {
  return null
}

/**
 * A randomly-generated circuit pattern, re-rolled with a fresh seed on
 * every resize (debounced, so dragging a window edge doesn't fire dozens
 * of regenerations). Generated entirely client-side — null until the
 * first subscription lands, so there's nothing to keep in sync with SSR.
 */
export function useGeneratedPattern() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
