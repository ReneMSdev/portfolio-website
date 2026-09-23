import Image from 'next/image'
import NavLink from './NavLink'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  return (
    <nav className='hidden md:grid grid-cols-[auto_1fr_auto] items-center fixed top-0 left-0 w-full h-14 text-md z-50 bg-background/70 backdrop-blur-sm px-10'>
      <a href='#hero'>
        <Image
          src='/logo-dark.svg'
          alt='logo'
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
        <a
          href='/resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground font-semibold hover:text-accent transition-colors'
        >
          Resume
        </a>
        <a
          href='https://github.com/ReneMSdev'
          target='_blank'
          rel='noopener noreferrer'
          className='text-foreground font-semibold hover:text-accent transition-colors'
        >
          Github
        </a>
      </div>
    </nav>
  )
}
