'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import NavLink from './NavLink'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid Hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <nav
      className={cn(
        'hidden md:flex fixed top-0 left-0 w-full justify-center items-center h-14 text-md z-50 bg-slate-200 dark:bg-slate-800'
      )}
    >
      <a href='/'>
        {mounted && (
          <img
            src={currentTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
            alt='logo'
            className='h-4 w-auto ml-10'
          />
        )}
      </a>
      <div className='flex gap-6 mx-auto'>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            className={cn(
              'text-center text-slate-800 dark:text-slate-50 inline-block transition-all font-semibold nav-link-hover',
              pathname === item.href && 'nav-link-active'
            )}
          >
            {item.label}
          </NavLink>
        ))}
        <a
          href='/resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='text-slate-800 dark:text-slate-50 font-semibold nav-link-hover'
        >
          Resume
        </a>
        <a
          href='https://github.com/ReneMSdev'
          target='_blank'
          rel='noopener noreferrer'
          className='text-slate-800 dark:text-slate-50 font-semibold nav-link-hover'
        >
          Github
        </a>
      </div>
      <ThemeToggle className='text-slate-800 dark:text-slate-50' />
    </nav>
  )
}
