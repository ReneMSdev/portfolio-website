'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function MobileMenu() {
  const pathname = usePathname()

  return (
    <div className='md:hidden fixed top-0 left-0 w-full h-14 bg-white z-[900] flex items-center justify-center gap-8 px-4 shadow-sm'>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-md font-semibold transition-colors hover:text-black',
            pathname === item.href && 'underline underline-offset-6 decoration-2 text-black'
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
