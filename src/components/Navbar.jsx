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
        'hidden md:flex fixed top-0 left-0 w-full justify-center items-center h-14 text-md text-foreground z-50 backdrop-blur bg-[linear-gradient(to_right,#0f172a,#4338ca)]'
      )}
    >
      <a href='/'>
        <img
          src='/logo.svg'
          alt='logo'
          className='h-4 w-auto ml-10 mr-16'
        />
      </a>
      <div className='flex gap-6 mx-auto'>
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
          className='text-white font-semibold hover:text-rose-600'
        >
          Resume
        </a>
        <a
          href='https://github.com/ReneMSdev'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white font-semibold hover:text-rose-600'
        >
          Github
        </a>
      </div>
      <FaMoon className='text-white ml-auto mr-10 cursor-pointer' />
    </nav>
  )
}
