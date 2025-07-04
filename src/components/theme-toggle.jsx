'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // Avoid hydration mismatch
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='p-2 mr-10 rounded-md cursor-pointer'
      aria-label='Toggle Theme'
    >
      {theme === 'dark' ? (
        <Sun className='w-5 h-5 text-white' />
      ) : (
        <Moon className='w-5 h-5 text-white' />
      )}
    </button>
  )
}
