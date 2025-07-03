'use client'
import { useEffect } from 'react'
import { useLoading } from '@/context/LoadingContext'

export default function SpinnerTestPage() {
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Keep spinner up for 5 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <p className='text-lg font-semibold text-gray-500'>Testing spinner appearance...</p>
    </div>
  )
}
