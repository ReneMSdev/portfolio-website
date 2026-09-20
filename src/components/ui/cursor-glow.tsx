'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    const handleMove = (e: MouseEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty('--glow-x', `${e.clientX}px`)
        ref.current?.style.setProperty('--glow-y', `${e.clientY}px`)
        frame = 0
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className='pointer-events-none fixed inset-0 -z-10 hidden md:block'
      style={{
        background:
          'radial-gradient(900px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(96, 165, 250, 0.05), transparent 70%)',
      }}
    />
  )
}
