'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import NavLink from './NavLink'
import { ExternalLink } from './ui/external-link'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  // Escape closes the menu and puts focus back on the button that opened it
  useEffect(() => {
    if (!open) return
    function handleEscape(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <>
      {/* Menu bar: a <header> so it counts as the page's banner landmark */}
      <header className='md:hidden fixed top-0 left-0 w-full h-14 flex items-center bg-surface z-[50] px-4'>
        <a href='#hero'>
          <Image
            src='/logo-dark.svg'
            alt='René Maxey-Salomone, back to top'
            width={200}
            height={43}
            className='h-4 w-auto z-[998]'
          />
        </a>
      </header>

      {/* Hidden while a project modal is open (see .modal-open in globals.css) —
          both float above the modal's own z-index otherwise, colliding with
          its close button. */}
      <div className='mobile-nav-controls'>
        {/* Hamburger Icon */}
        <button
          ref={buttonRef}
          type='button'
          id='nav-icon'
          aria-label='Menu'
          aria-expanded={open}
          aria-controls='mobile-menu'
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
        </button>

        {/* Slide-in Menu */}
        <nav
          ref={menuRef}
          id='mobile-menu'
          aria-label='Main'
          // Off-screen when closed; inert keeps its links out of the tab order
          inert={!open}
          className={cn(
            'md:hidden fixed top-0 right-0 h-screen w-40 bg-surface z-[998] p-8 pt-24 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out shadow-md lowercase',
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
              <span className='nav-link-hover'>{item.label}</span>
            </NavLink>
          ))}
          <ExternalLink
            href='https://github.com/ReneMSdev'
            className='text-xl font-medium'
          >
            <span className='nav-link-hover'>Github</span>
          </ExternalLink>
        </nav>
      </div>
    </>
  )
}
