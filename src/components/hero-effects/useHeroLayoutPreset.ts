import { useSyncExternalStore } from 'react'

// Matches the viewport width the Hero content needs to render at its full
// max-w-4xl two-column layout without squeezing — below this, the text
// column narrows/wraps taller (or the layout stacks entirely under `md`),
// so background line art needs a more conservative route.
const WIDE_QUERY = '(min-width: 1024px)'

export type HeroLayoutPreset = 'wide' | 'compact'

function subscribe(callback: () => void) {
  const mql = window.matchMedia(WIDE_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshot(): HeroLayoutPreset {
  return window.matchMedia(WIDE_QUERY).matches ? 'wide' : 'compact'
}

function getServerSnapshot(): HeroLayoutPreset {
  return 'wide'
}

export function useHeroLayoutPreset() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
