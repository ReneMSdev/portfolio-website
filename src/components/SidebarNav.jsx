'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'hidden md:flex fixed top-7 left-0 h-screen w-10 flex-col items-center justify-start gap-14 bg-transparent text-md text-foreground z-40'
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transform -rotate-90 origin-right text-right w-10 h-10 inline-block transition-all hover:font-semibold',
            pathname === item.href && 'underline underline-offset-6 decoration-2'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
