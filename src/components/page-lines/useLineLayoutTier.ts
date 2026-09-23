'use client'

import { useSyncExternalStore } from 'react'

const LG_QUERY = '(min-width: 1024px)'
const MD_QUERY = '(min-width: 768px)'

export type LineLayoutTier = 'lg' | 'md' | 'sm'

function subscribe(callback: () => void) {
  const lg = window.matchMedia(LG_QUERY)
  const md = window.matchMedia(MD_QUERY)
  lg.addEventListener('change', callback)
  md.addEventListener('change', callback)
  return () => {
    lg.removeEventListener('change', callback)
    md.removeEventListener('change', callback)
  }
}

function getSnapshot(): LineLayoutTier {
  if (window.matchMedia(LG_QUERY).matches) return 'lg'
  if (window.matchMedia(MD_QUERY).matches) return 'md'
  return 'sm'
}

function getServerSnapshot(): LineLayoutTier {
  return 'lg'
}

/** Which breakpoint tier the page-wide line art should use — matches Tailwind's `md`/`lg`. */
export function useLineLayoutTier() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
