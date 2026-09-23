import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Soft-edged radial fade so the blur/tint feathers out toward the edges
// instead of a hard rectangular cutoff — kept as one shared definition so
// every usage fades the same way.
const FADE_MASK = 'radial-gradient(ellipse at center, black 40%, transparent 100%)'

interface TextBlurBackdropProps {
  children: ReactNode
  className?: string
}

/**
 * Wraps text in a frosted-glass backdrop (blur + tint) so background line
 * art passing behind it stays legible without hand-tuned avoidance. The
 * mask is on a separate absolutely-positioned layer behind the content —
 * masking the text element itself would fade the text's own opacity too,
 * not just the blur — so the text stays fully crisp on top.
 */
export function TextBlurBackdrop({ children, className }: TextBlurBackdropProps) {
  return (
    <div className={cn('relative w-fit', className)}>
      <div
        aria-hidden
        className='absolute -inset-3 rounded-2xl backdrop-blur-md bg-background/20'
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      />
      <div className='relative'>{children}</div>
    </div>
  )
}
