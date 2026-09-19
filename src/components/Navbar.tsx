'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import NavLink from './NavLink'
import { useActiveSection } from '@/hooks/useActiveSection'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const activeId = useActiveSection(navItems.map((item) => item.href.slice(1)))

  return (
    <nav className='hidden md:flex fixed top-0 left-0 w-full justify-center items-center h-14 text-md z-50 bg-background/70 backdrop-blur-sm'>
      <a
        href='#hero'
        className='ml-10'
      >
        <Image
          src='/logo-dark.svg'
          alt='logo'
          width={200}
          height={43}
          className='h-4 w-auto'
        />
      </a>
      <div className='flex gap-6 mx-auto'>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            className={cn(
              'text-center text-foreground inline-block transition-all font-semibold nav-link-hover',
              activeId === item.href.slice(1) && 'nav-link-active'
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
