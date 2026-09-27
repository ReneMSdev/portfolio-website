'use client'

import { useEffect, useId, useRef, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
}

let mermaidInitialized = false

async function getMermaid() {
  const mermaid = (await import('mermaid')).default

  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        background: '#17171a',
        primaryColor: '#1f1f23',
        primaryTextColor: '#f2f2f0',
        primaryBorderColor: '#6ee7b7',
        lineColor: '#6ee7b7',
        secondaryColor: '#17171a',
        tertiaryColor: '#17171a',
        textColor: '#f2f2f0',
        actorBorder: '#6ee7b7',
        actorBkg: '#1f1f23',
        actorTextColor: '#f2f2f0',
        signalColor: '#b9b9bd',
        signalTextColor: '#f2f2f0',
        labelBoxBorderColor: '#6ee7b7',
        labelBoxBkgColor: '#1f1f23',
        labelTextColor: '#f2f2f0',
        loopTextColor: '#f2f2f0',
        noteBorderColor: '#27272a',
        noteBkgColor: '#1f1f23',
        noteTextColor: '#b9b9bd',
        fontFamily: 'var(--font-space-mono), monospace',
      },
    })
    mermaidInitialized = true
  }

  return mermaid
}

/**
 * Renders a Mermaid diagram from source text, styled to match the site's
 * dark theme. Client-only (mermaid renders to SVG via the DOM), so this
 * mounts empty on the server and fills in after hydration.
 */
export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    let cancelled = false

    getMermaid()
      .then((mermaid) => mermaid.render(`mermaid-${id}`, chart))
      .then(({ svg }) => {
        if (!cancelled && containerRef.current) containerRef.current.innerHTML = svg
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to render diagram')
      })

    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (error) {
    return <p className='text-xs text-destructive'>Diagram failed to render: {error}</p>
  }

  return (
    <div
      ref={containerRef}
      className='mermaid-diagram overflow-x-auto rounded-md border border-border bg-surface p-4 [&_svg]:mx-auto'
    />
  )
}
