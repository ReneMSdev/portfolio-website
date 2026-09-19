'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
