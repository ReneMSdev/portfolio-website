'use client'
import { FadeLoader } from 'react-spinners'
import { useLoading } from '@/context/LoadingContext'

export default function RouteChangeSpinner() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className='fixed inset-0 z-50 bg-slate-100/70 dark:bg-stone-900/70 backdrop-blur flex items-center justify-center'>
      <FadeLoader
        color='#6366f1'
        height={15}
        width={5}
        radius={20}
        speedMultiplier={1.5}
      />
    </div>
  )
}
