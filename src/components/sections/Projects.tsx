'use client'

import { useCallback, useRef, useState, type MouseEvent, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { ProjectModal } from '@/components/ProjectModal'
import { TextBlurBackdrop } from '@/components/ui/text-blur-backdrop'
import { projects, type Project } from '@/data/projects'

export default function Projects() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const triggerRef = useRef<HTMLElement | null>(null)

  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => {
    const slug = searchParams.get('project')
    return slug && projects.some((p) => p.slug === slug) ? slug : null
  })

  const openProject = useCallback(
    (project: Project, trigger: HTMLElement) => {
      triggerRef.current = trigger
      setSelectedSlug(project.slug)
      const params = new URLSearchParams(searchParams.toString())
      params.set('project', project.slug)
      router.replace(`${pathname}?${params.toString()}#projects`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const closeProject = useCallback(() => {
    setSelectedSlug(null)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('project')
    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}#projects`, { scroll: false })
  }, [pathname, router, searchParams])

  const selectedProject = projects.find((p) => p.slug === selectedSlug) ?? null

  return (
    <section
      id='projects'
      className='relative overflow-hidden scroll-mt-14 py-20'
    >
      <div className='relative px-4 md:px-10 max-w-5xl mx-auto'>
        <TextBlurBackdrop className='mb-10'>
          <p className='font-mono text-3xl font-semibold text-accent lowercase'>Projects</p>
        </TextBlurBackdrop>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {projects.map((project, index) => {
            const handleOpen = (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
              openProject(project, e.currentTarget)
            }

            return (
              <motion.div
                key={project.slug}
                layoutId={`project-card-${project.slug}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.4,
                  delay: (index % 4) * 0.05,
                  layout: { duration: 0.25, ease: 'easeOut' },
                }}
                role='button'
                tabIndex={0}
                aria-haspopup='dialog'
                onClick={handleOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleOpen(e)
                  }
                }}
                className='cursor-pointer'
              >
                <CardContainer containerClassName='py-0'>
                  <CardBody className='w-full bg-surface border border-border rounded-lg p-6 transition-[box-shadow,border-color] duration-300 hover:border-accent/40 hover:shadow-[0_0_50px_-12px_rgba(110,231,183,0.35)]'>
                    {project.images?.[0] && (
                      <CardItem
                        translateZ={40}
                        className='w-full'
                      >
                        <div className='relative w-full h-40 rounded-md overflow-hidden mb-4'>
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            sizes='(max-width: 768px) 100vw, 50vw'
                            className={`object-cover ${project.imagePosition === 'top' ? 'object-top' : ''}`}
                            priority
                          />
                        </div>
                      </CardItem>
                    )}
                    <CardItem
                      as='p'
                      translateZ={50}
                      className='font-mono text-xs text-accent uppercase tracking-wider mb-2'
                    >
                      {project.status}
                    </CardItem>
                    <CardItem
                      as='h3'
                      translateZ={60}
                      className='text-xl font-semibold text-foreground mb-2'
                    >
                      {project.title}
                    </CardItem>
                    <CardItem
                      as='p'
                      translateZ={30}
                      className='text-sm text-muted-foreground'
                    >
                      {project.summary}
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeProject}
            triggerRef={triggerRef}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
