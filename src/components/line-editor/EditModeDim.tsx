'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useLineEditMode } from './useLineEditMode'

/**
 * Wraps a section's normal content. While the line editor is active, dims
 * it to 30% opacity and disables pointer events on it, so line art that
 * normally sits hidden behind opaque content (cards, terminal, etc.)
 * becomes visible and draggable, without accidentally triggering the
 * page's own interactions (modals, links, hover effects) underneath.
 */
export function EditModeDim({ children, className }: { children: ReactNode; className?: string }) {
  const editing = useLineEditMode()

  return <div className={cn(className, editing && 'opacity-30 pointer-events-none')}>{children}</div>
}
