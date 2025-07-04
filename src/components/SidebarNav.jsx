'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import NavLink from './NavLink'

const navItems = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'hidden md:flex fixed top-7 left-0 h-screen w-10 flex-col items-center justify-start gap-14 bg-transparent text-md text-foreground z-90'
      )}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          className={cn(
            'transform -rotate-90 origin-right text-right w-10 h-10 inline-block transition-all font-semibold hover:underline underline-offset-6 decoration-2',
            pathname === item.href && 'underline underline-offset-6 decoration-2'
          )}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
