import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full min-h-24 rounded-sm px-3 py-2 text-base shadow-xs outline-none',
        'bg-surface text-foreground',
        'border border-transparent focus:outline-none',
        'focus:ring-2 focus:ring-accent/40',
        'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
