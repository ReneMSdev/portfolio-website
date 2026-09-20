'use client'

import { useLayoutEffect, useRef, useState, type RefObject } from 'react'

/**
 * Shared width for every section's line-art viewBox. Every section spans
 * the same full page width, so keeping this fixed and only measuring each
 * section's own height keeps horizontal positions (and therefore x-anchors
 * used to hand a line off between sections) at the same screen pixel across
 * all of them — no `preserveAspectRatio` cropping/guessing needed.
 */
export const SECTION_VIEWBOX_WIDTH = 620

/**
 * Measures a section element's live aspect ratio (via ResizeObserver) and
 * returns a viewBox string whose height exactly matches it, so an `<svg
 * viewBox={viewBox} preserveAspectRatio="none">` sized to 100%/100% renders
 * with no cropping and lines up with neighboring sections using this hook.
 *
 * Pass an existing ref if the section already has one (e.g. for its own
 * `useInView` check) so both share the same element instead of needing two.
 */
export function useMeasuredViewBox<T extends HTMLElement>(externalRef?: RefObject<T | null>): {
  ref: RefObject<T | null>
  viewBox: string
  height: number
} {
  const internalRef = useRef<T>(null)
  const ref = externalRef ?? internalRef
  // Fallback before the first measurement lands, using Hero's original 620x440 ratio.
  const [height, setHeight] = useState(440)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0) {
        setHeight((SECTION_VIEWBOX_WIDTH * rect.height) / rect.width)
      }
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return { ref, viewBox: `0 0 ${SECTION_VIEWBOX_WIDTH} ${height}`, height }
}
