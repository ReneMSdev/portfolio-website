'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { MermaidDiagram } from './mermaid-diagram'
import type { ArchitectureDiagram } from '@/data/projects'

interface DiagramLightboxProps {
  diagrams: ArchitectureDiagram[]
  initialIndex: number
  onClose: () => void
}

/**
 * Full-viewport-width overlay for viewing an architecture diagram at a
 * readable size, with its own prev/next navigation when a project has more
 * than one diagram. Escape-to-close is handled by the parent (ProjectModal),
 * since it needs to close this before the modal underneath it.
 */
export function DiagramLightbox({ diagrams, initialIndex, onClose }: DiagramLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const diagram = diagrams[index]

  const goTo = (i: number) => setIndex((i + diagrams.length) % diagrams.length)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Move focus in on open and keep Tab inside the lightbox. ProjectModal
  // returns focus to the expand button on close.
  useEffect(() => {
    closeRef.current?.focus()

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button'))
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className='fixed inset-0 z-[200] flex items-center justify-center bg-background/95 p-4 md:p-10'
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-label={diagram.title}
        onClick={(e) => e.stopPropagation()}
        className='w-full max-w-6xl max-h-full overflow-auto'
      >
        {/* Close sits in the title row: anything positioned outside the
            panel gets clipped by its overflow-auto. The padding leaves room
            for the focus outline at the panel's edge. */}
        <div className='flex items-center justify-between gap-4 mb-3 pt-1 pr-1'>
          <p className='font-mono text-xs text-accent uppercase tracking-wider'>{diagram.title}</p>
          <button
            ref={closeRef}
            type='button'
            onClick={onClose}
            aria-label='Close diagram'
            className='shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground cursor-pointer'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <MermaidDiagram chart={diagram.chart} />

        {diagrams.length > 1 && (
          <div className='flex items-center justify-center gap-4 mt-4'>
            <button
              type='button'
              onClick={() => goTo(index - 1)}
              aria-label='Previous diagram'
              className='flex items-center justify-center w-8 h-8 rounded-full text-foreground hover:text-accent transition-colors cursor-pointer'
            >
              <ChevronLeft className='w-5 h-5' />
            </button>

            <div className='flex'>
              {diagrams.map((d, i) => (
                <button
                  key={d.title}
                  type='button'
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${d.title}`}
                  aria-current={i === index}
                  className='flex items-center justify-center w-6 h-6 cursor-pointer'
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === index ? 'bg-accent' : 'bg-foreground/40'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type='button'
              onClick={() => goTo(index + 1)}
              aria-label='Next diagram'
              className='flex items-center justify-center w-8 h-8 rounded-full text-foreground hover:text-accent transition-colors cursor-pointer'
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
