'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { diagramKey } from '@/lib/diagrams'

interface MermaidDiagramProps {
  slug: string
  index: number
}

/**
 * Shows a project's architecture diagram from the static SVG pre-rendered by
 * `npm run diagrams` (public/diagrams/), so Mermaid never ships to the
 * browser. The SVG is inlined rather than used as an <img>: its styles rely on
 * the page's Space Mono font variable, which an <img> can't see.
 */
export function MermaidDiagram({ slug, index }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const instanceId = useId().replace(/:/g, '')
  const key = diagramKey(slug, index)

  useEffect(() => {
    let cancelled = false

    fetch(`/diagrams/${key}.svg`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((svg) => {
        if (cancelled || !containerRef.current) return
        // The same diagram can be on screen twice (modal and lightbox). Its
        // ids scope its CSS and arrowhead markers, so give each copy its own.
        containerRef.current.innerHTML = svg.replaceAll(
          `diagram-${key}`,
          `diagram-${key}-${instanceId}`
        )
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load diagram')
      })

    return () => {
      cancelled = true
    }
  }, [key, instanceId])

  if (error) {
    return <p className='text-xs text-destructive'>Diagram failed to load: {error}</p>
  }

  return (
    <div
      ref={containerRef}
      className='mermaid-diagram overflow-x-auto rounded-md border border-border bg-surface p-4 [&_svg]:mx-auto'
    />
  )
}
