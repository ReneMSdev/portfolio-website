'use client'

import { useState, useEffect, useRef } from 'react'
import NavLink from './NavLink'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Click Outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        target.id !== 'nav-icon' &&
        !target.closest('#nav-icon')
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* Menu bar */}
      <div className='md:hidden fixed top-0 left-0 w-full h-14 flex items-center bg-surface z-[50] px-4'>
        <a href='/'>
          <img
            src='/logo-dark.svg'
            alt='logo'
            className='h-4 w-auto z-[998]'
          />
        </a>
      </div>

      {/* Hamburger Icon */}
      <div
        id='nav-icon'
        className={cn(
          'md:hidden fixed top-4 right-4 w-10 h-10 z-[999] cursor-pointer pointer-events-auto',
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
        ref={menuRef}
        className={cn(
          'md:hidden fixed top-0 right-0 h-screen w-40 bg-surface z-[998] p-8 pt-24 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out shadow-md',
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
