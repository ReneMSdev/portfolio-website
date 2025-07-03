'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLoading } from '@/context/LoadingContext'

export default function NavLink({ href, children, className }) {
  const router = useRouter()
  const pathname = usePathname()
  const { setIsLoading } = useLoading()

  const handleClick = (e) => {
    e.preventDefault()

    if (pathname === href) return

    setIsLoading(true)

    setTimeout(() => {
      router.push(href)
    }, 50)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  )
}
