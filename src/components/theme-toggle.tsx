'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, type ComponentProps } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className, ...props }: ComponentProps<'button'>) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // Avoid hydration mismatch
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'p-1 mr-10 rounded-sm border-2 border-slate-400 dark:border-slate-600 cursor-pointer',
        className
      )}
      aria-label='Toggle Theme'
      {...props}
    >
      {resolvedTheme === 'dark' ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
    </button>
  )
}
