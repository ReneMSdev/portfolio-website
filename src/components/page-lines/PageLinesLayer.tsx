'use client'

import type { ReactNode } from 'react'
import { useLineEditMode } from '@/components/line-editor/useLineEditMode'
import { PageLines } from './PageLines'

/**
 * Renders one continuous line-art SVG behind the whole page — replaces the
 * earlier per-section line art with a single page-wide design.
 *
 * The SVG uses a fixed viewBox (see PageLines) and sizes itself like a
 * normal image (width 100%, height auto), so it scales uniformly with page
 * width and never distorts/rescales on resize — no live measurement here.
 *
 * Every section is `position: relative` (needed for its own internal
 * content layering), which puts it in the same stacking context as this
 * SVG and above it — so while editing, `children` (everything below the
 * SVG in the DOM) gets `pointer-events: none` as a whole, letting clicks
 * reach the SVG's drag handles underneath instead of being swallowed by a
 * section's own (otherwise invisible) bounding box.
 */
export function PageLinesLayer({ children }: { children: ReactNode }) {
  const editing = useLineEditMode()

  return (
    <div className='relative overflow-hidden'>
      <PageLines />
      <div className={editing ? 'pointer-events-none' : undefined}>{children}</div>
    </div>
  )
}
