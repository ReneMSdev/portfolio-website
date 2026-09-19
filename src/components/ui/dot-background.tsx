import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function DotBackground({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <div className='absolute inset-0 bg-dot-pattern' />
      <div className='absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />
      <div className='relative z-10'>{children}</div>
    </div>
  )
}
