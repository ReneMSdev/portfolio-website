import Image from 'next/image'
import NavLink from './NavLink'
import { ExternalLink } from './ui/external-link'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <nav
      aria-label='Main'
      className='hidden md:grid grid-cols-[auto_1fr_auto] items-center fixed top-0 left-0 w-full h-14 text-md z-50 bg-background/70 backdrop-blur-sm px-10'>
      <a href='#hero'>
        <Image
          src='/logo-dark.svg'
          alt='René Maxey-Salomone, back to top'
          width={200}
          height={43}
          className='h-4 w-auto'
        />
      </a>

      <div className='flex justify-center gap-6 lowercase'>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            className='text-center text-foreground inline-block transition-all font-semibold nav-link-hover'
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className='flex justify-end gap-6 lowercase'>
        <ExternalLink
          href='https://github.com/ReneMSdev'
          className='text-foreground font-semibold hover:text-accent transition-colors'
        >
          Github
        </ExternalLink>
      </div>
    </nav>
  )
}
