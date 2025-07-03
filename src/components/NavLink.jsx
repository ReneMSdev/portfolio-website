'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/context/LoadingContext'

export default function NavLink({ href, children, className }) {
  const router = useRouter()
  const { setIsLoading } = useLoading()

  const handleClick = (e) => {
    e.preventDefault()
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
