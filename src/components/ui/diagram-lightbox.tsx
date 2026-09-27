'use client'

import { useState } from 'react'
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
        onClick={(e) => e.stopPropagation()}
        className='relative w-full max-w-6xl max-h-full overflow-auto'
      >
        <button
          type='button'
          onClick={onClose}
          aria-label='Close'
          className='absolute -top-8 right-0 text-muted-foreground hover:text-foreground cursor-pointer'
        >
          <X className='w-6 h-6' />
        </button>

        <p className='font-mono text-xs text-accent uppercase tracking-wider mb-3'>
          {diagram.title}
        </p>

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

            <div className='flex gap-1.5'>
              {diagrams.map((d, i) => (
                <button
                  key={d.title}
                  type='button'
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${d.title}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                    i === index ? 'bg-accent' : 'bg-foreground/40'
                  }`}
                />
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
