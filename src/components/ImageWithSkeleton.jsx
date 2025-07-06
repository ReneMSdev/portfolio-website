'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageLoader from './ImageLoader' // assuming it's in the same folder

export default function ImageWithSkeleton({ src, alt, width = 500, height = 300 }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className='relative'
      style={{ width, height }}
    >
      {!loaded && (
        <div className='absolute inset-0 z-10'>
          <ImageLoader
            width={width}
            height={height}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-sm border border-slate-600 object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  )
}
