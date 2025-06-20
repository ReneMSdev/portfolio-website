'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Top white bar background */}
      <div className='md:hidden fixed top-0 left-0 w-full h-14 bg-white z-[900]' />

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
          'md:hidden fixed top-0 right-0 h-screen w-50 bg-slate-200 z-[998] p-8 pt-24 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              'text-xl font-medium',
              pathname === item.href && 'underline underline-offset-4 decoration-2'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}
