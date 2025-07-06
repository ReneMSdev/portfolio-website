'use client'

import { useState } from 'react'
import NavLink from './NavLink'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Menu bar */}
      <div className='md:hidden fixed top-0 left-0 w-full h-14 flex items-center justify-baseline bg-slate-800 z-[900] px-4'>
        <a href='/'>
          <img
            src='/logo.svg'
            alt='logo'
            className='h-4 w-auto'
          />
        </a>
        <div className='absolute left-1/2 transform -translate-x-1/4'>
          <ThemeToggle />
        </div>
      </div>

      {/* Hamburger Icon */}
      <div
        id='nav-icon'
        className={cn(
          'md:hidden fixed top-4 right-4 w-10 h-10 z-[999] cursor-pointer',
          open && 'open'
        )}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Slide-in Menu */}
      <div
        className={cn(
          'md:hidden fixed top-0 right-0 h-screen w-40 bg-indigo-300 dark:bg-indigo-900 z-[998] p-8 pt-24 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out shadow-md',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className='text-xl font-medium'
          >
            <span className={cn('nav-link-hover', pathname === item.href && 'nav-link-active')}>
              {item.label}
            </span>
          </NavLink>
        ))}
        <a
          href='/resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl font-medium'
        >
          <span className='nav-link-hover'>Resume</span>
        </a>
        <a
          href='https://github.com/ReneMSdev'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl font-medium'
        >
          <span className='nav-link-hover'>Github</span>
        </a>
      </div>
    </>
  )
}
