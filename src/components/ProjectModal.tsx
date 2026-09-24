'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
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

  useEffect(() => {
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const modalEl = modalRef.current
    const focusables = modalEl
      ? Array.from(modalEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : []
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
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

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [onClose, triggerRef])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4'
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-card-${project.slug}`}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        role='dialog'
        aria-modal='true'
        aria-labelledby={`project-title-${project.slug}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className='relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-lg bg-surface border border-border p-6 md:p-8'
      >
        <button
          onClick={onClose}
          aria-label='Close'
          className='absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer'
        >
          <X className='w-5 h-5' />
        </button>

        <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
          {project.status}
        </p>
        <h3
          id={`project-title-${project.slug}`}
          className='text-2xl md:text-3xl font-semibold text-foreground mb-4'
        >
          {project.title}
        </h3>

        {project.images && project.images.length > 0 && (
          <div className='relative w-full aspect-video rounded-md overflow-hidden mb-6'>
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              sizes='(max-width: 896px) 100vw, 896px'
              className='object-cover'
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

        {project.architectureNote && (
          <div className='mb-6'>
            <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
              Architecture
            </p>
            <p className='text-muted-foreground leading-relaxed italic'>
              {project.architectureNote}
            </p>
          </div>
        )}

        {project.lessonsLearned && (
          <div className='mb-6'>
            <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>
              Lessons Learned
            </p>
            <p className='text-muted-foreground leading-relaxed'>{project.lessonsLearned}</p>
          </div>
        )}

        <div className='mb-6'>
          <p className='font-mono text-xs text-accent uppercase tracking-wider mb-2'>Built with</p>
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
      </motion.div>
    </motion.div>
  )
}
