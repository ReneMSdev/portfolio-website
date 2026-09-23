'use client'

import { useSyncExternalStore } from 'react'
import { generateCircuitBranches, type NodePoint } from './generateCircuit'

const WIDTH = 620
const HEIGHT = 1600
const BRANCH_COUNT = 26
const RESIZE_DEBOUNCE_MS = 400

export interface Pattern {
  branches: string[]
  nodes: NodePoint[]
}

function randomSeed() {
  return Math.floor(Math.random() * 1_000_000)
}

function generate(): Pattern {
  return generateCircuitBranches({ width: WIDTH, height: HEIGHT, branchCount: BRANCH_COUNT, seed: randomSeed() })
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
