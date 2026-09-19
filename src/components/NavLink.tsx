'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLoading } from '@/context/LoadingContext'
import type { MouseEvent, ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { setIsLoading } = useLoading()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick?.()

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
