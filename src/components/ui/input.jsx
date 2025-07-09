import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'flex h-9 w-full min-w-0 rounded-sm px-3 py-1 text-base shadow-xs outline-none',
        'bg-slate-200 dark:bg-slate-700',
        'border border-transparent focus:outline-none',
        'focus:ring-2 focus:ring-slate-500/40 dark:focus:ring-slate-200/40',
        'focus:ring-offset-0 transition-shadow',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Input }
