'use client'

import { useSyncExternalStore } from 'react'

function subscribe() {
  return () => {}
}

function getSnapshot() {
  return new URLSearchParams(window.location.search).get('editLines') === '1'
}

function getServerSnapshot() {
  return false
}

/**
 * Dev-only design tool: is `?editLines=1` present in the URL? Reads
 * `window.location.search` directly (not Next's `useSearchParams`) so it
 * doesn't force every line-art component into a Suspense boundary.
 *
 * Uses `useSyncExternalStore` (not `useState`/`useEffect`) specifically so
 * the initial client render matches SSR's `false` — avoiding a hydration
 * mismatch — then syncs to the real value right after, without an explicit
 * `setState` in an effect.
 */
export function useLineEditMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
