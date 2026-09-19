'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import NavLink from './NavLink'

const navItems = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className='hidden md:flex fixed top-0 left-0 w-full justify-center items-center h-14 text-md z-50 bg-background/70 backdrop-blur-sm'>
      <a href='/'>
        <img
          src='/logo-dark.svg'
          alt='logo'
          className='h-4 w-auto ml-10'
        />
      </a>
      <div className='flex gap-6 mx-auto'>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            className={cn(
              'text-center text-foreground inline-block transition-all font-semibold nav-link-hover',
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
          className='text-foreground font-semibold nav-link-hover'
        >
          Resume
        </a>
        <a
          href='https://github.com/ReneMSdev'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground font-semibold nav-link-hover'
        >
          Github
        </a>
      </div>
    </nav>
  )
}
