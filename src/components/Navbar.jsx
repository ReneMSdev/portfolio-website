'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import NavLink from './NavLink'
import { FaSun, FaMoon } from 'react-icons/fa'

const navItems = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'hidden md:flex gap-10 fixed top-0 left-0 w-full justify-center items-center h-14 text-md text-foreground z-50 backdrop-blur bg-[linear-gradient(to_right,#0f172a,#4338ca)]'
      )}
    >
      <FaSun className='text-white mr-auto ml-20' />

      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          className={cn(
            'text-center text-white inline-block transition-all font-semibold hover:underline underline-offset-6 decoration-2',
            pathname === item.href && 'underline underline-offset-6 decoration-2'
          )}
        >
          {item.label}
        </NavLink>
      ))}
      <a
        href='/resume.pdf'
        target='_blank'
        rel='noopener noreferrer'
        className='text-white font-semibold hover:underline hover:underline-offset-4 decoration-2'
      >
        Resume
      </a>
      <a
        href='https://github.com/ReneMSdev'
        target='_blank'
        rel='noopener noreferrer'
        className='text-white font-semibold hover:underline hover:underline-offset-4 decoration-2'
      >
        Github
      </a>
      <FaMoon className='text-white ml-auto mr-20' />
    </nav>
  )
}
