import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full min-h-24 rounded-sm px-3 py-2 text-base shadow-xs outline-none',
        'bg-slate-200 dark:bg-slate-700',
        'border border-transparent focus:outline-none',
        'focus:ring-2 focus:ring-slate-500/40 dark:focus:ring-slate-200/40',
        'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
