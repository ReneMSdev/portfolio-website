'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Maximize2, X } from 'lucide-react'
import { DiagramLightbox } from '@/components/ui/diagram-lightbox'
import { ImageCarousel } from '@/components/ui/image-carousel'
import { MermaidDiagram } from '@/components/ui/mermaid-diagram'
import type { Project } from '@/data/projects'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
}

export function ProjectModal({ project, onClose, triggerRef }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [openDiagramIndex, setOpenDiagramIndex] = useState<number | null>(null)

  useEffect(() => {
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('modal-open')

    const modalEl = modalRef.current
    const focusables = modalEl
      ? Array.from(modalEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : []
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    function handleTab(e: KeyboardEvent) {
      if (e.key === 'Tab' && focusables.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => {
      document.removeEventListener('keydown', handleTab)
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('modal-open')
      trigger?.focus()
    }
  }, [triggerRef])

  // Separate from the focus-trap effect above so opening/closing the
  // lightbox doesn't re-run it (which would re-steal focus and reset
  // overflow). Escape closes the lightbox first if one's open, otherwise
  // closes the whole modal.
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (openDiagramIndex !== null) {
        setOpenDiagramIndex(null)
      } else {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [openDiagramIndex, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-0 md:p-4'
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-card-${project.slug}`}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        role='dialog'
        aria-modal='true'
        aria-labelledby={`project-title-${project.slug}`}
        onClick={(e) => e.stopPropagation()}
        className='relative flex flex-col w-full h-full md:h-auto max-w-none md:max-w-4xl max-h-full md:max-h-[85vh] overflow-hidden rounded-none md:rounded-lg bg-surface border-0 md:border md:border-border'
      >
        {/* Framer Motion applies a transform to the layoutId-animated element
            above for the shared-element transition. An ancestor with a
            transform is a known source of inconsistent position:sticky
            behavior across browsers, so the scroll container (and the
            sticky header inside it) live on this separate, untransformed
            div instead of sharing the animated one. */}
        <div
          ref={modalRef}
          className='min-h-0 overflow-y-auto overscroll-none px-6 pb-6 pt-0 md:p-8'
        >
          <div className='sticky top-0 z-10 -mx-6 px-6 pt-6 pb-4 bg-surface border-b border-border flex items-start justify-between gap-4 md:static md:mx-0 md:px-0 md:pt-0 md:pb-0 md:mb-4 md:bg-transparent md:border-0 md:block'>
            <div>
              <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
                {project.status}
              </p>
              <h3
                id={`project-title-${project.slug}`}
                className='text-2xl md:text-3xl font-semibold text-foreground md:mb-4'
              >
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              aria-label='Close'
              className='shrink-0 text-muted-foreground hover:text-foreground cursor-pointer md:absolute md:top-4 md:right-4'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          {project.images && project.images.length > 0 && (
            <div className='pt-6 md:pt-0'>
              <ImageCarousel
                images={project.images}
                alt={project.title}
                imagePosition={project.imagePosition}
              />
            </div>
          )}

          <p className='text-muted-foreground leading-relaxed mb-6'>{project.description}</p>

          {project.metrics && project.metrics.length > 0 && (
            <div className='flex gap-6 mb-6'>
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className='text-2xl font-semibold text-accent'>{metric.value}</p>
                  <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {project.architectureDiagrams && project.architectureDiagrams.length > 0 && (
            <div className='mb-6 flex flex-col gap-6'>
              {project.architectureDiagrams.map((diagram, i) => (
                <div key={diagram.title}>
                  <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
                    {diagram.title}
                  </p>
                  <button
                    type='button'
                    onClick={() => setOpenDiagramIndex(i)}
                    aria-label={`Expand ${diagram.title}`}
                    className='group relative block w-full cursor-zoom-in text-left'
                  >
                    <MermaidDiagram chart={diagram.chart} />
                    <span className='absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-md bg-background/70 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Maximize2 className='w-4 h-4' />
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {project.architectureNote && (
            <div className='mb-6'>
              <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
                Architecture
              </p>
              <div className='flex flex-col gap-3'>
                {(Array.isArray(project.architectureNote)
                  ? project.architectureNote
                  : [project.architectureNote]
                ).map((paragraph) => (
                  <p
                    key={paragraph}
                    className='text-muted-foreground leading-relaxed italic'
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {project.lessonsLearned && (
            <div className='mb-6'>
              <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
                Lessons Learned
              </p>
              <div className='flex flex-col gap-3'>
                {(Array.isArray(project.lessonsLearned)
                  ? project.lessonsLearned
                  : [project.lessonsLearned]
                ).map((paragraph) => (
                  <p key={paragraph} className='text-muted-foreground leading-relaxed'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className='mb-6'>
            <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
              Built with
            </p>
            <p className='text-muted-foreground'>{project.stack.join(', ')}</p>
          </div>

          {project.demoNote && (
            <p className='text-xs text-muted-foreground italic mb-4'>{project.demoNote}</p>
          )}

          <div className='flex gap-6'>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='font-semibold text-foreground hover:text-accent'
              >
                {project.status === 'Live' ? 'View Live Site' : 'View Demo'}
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='font-semibold text-foreground hover:text-accent'
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {openDiagramIndex !== null && project.architectureDiagrams && (
          <DiagramLightbox
            diagrams={project.architectureDiagrams}
            initialIndex={openDiagramIndex}
            onClose={() => setOpenDiagramIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
