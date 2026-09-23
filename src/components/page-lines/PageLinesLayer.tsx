import type { ReactNode } from 'react'
import { PageLines } from './PageLines'
import { GenerativeLines } from '@/components/generative-lines/GenerativeLines'

// Which background line-art implementation is live: the hand-authored,
// saved design (page-lines/ — every coordinate placed and verified by
// hand) or the algorithmically-generated one being tried
// (generative-lines/ — a constrained random walk instead of hand-placed
// coordinates). Both are kept fully intact; flip this to compare them.
const ACTIVE: 'hand-authored' | 'generative' = 'generative'

/**
 * Renders one continuous line-art SVG behind the whole page — replaces the
 * earlier per-section line art with a single page-wide design.
 *
 * The SVG uses a fixed viewBox and sizes itself like a normal image
 * (width 100%, height auto), so it scales uniformly with page width and
 * never distorts/rescales on resize — no live measurement here.
 */
export function PageLinesLayer({ children }: { children: ReactNode }) {
  return (
    <div className='relative overflow-hidden'>
      {ACTIVE === 'generative' ? <GenerativeLines /> : <PageLines />}
      {children}
    </div>
  )
}
