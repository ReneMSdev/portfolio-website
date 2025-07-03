'use client'
import { FadeLoader } from 'react-spinners'
import { useLoading } from '@/context/LoadingContext'

export default function RouteChangeSpinner() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className='fixed inset-0 z-50 bg-white/70 backdrop-blur flex items-center justify-center'>
      <FadeLoader color='#3b82f6' />
    </div>
  )
}
