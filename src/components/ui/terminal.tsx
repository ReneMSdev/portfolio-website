import type { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
}

export function TerminalWindow({ title, children }: TerminalWindowProps) {
  return (
    <div className='rounded-lg border border-border bg-surface overflow-hidden'>
      <div className='flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40'>
        <span className='w-3 h-3 rounded-full bg-[#ff5f56]' />
        <span className='w-3 h-3 rounded-full bg-[#ffbd2e]' />
        <span className='w-3 h-3 rounded-full bg-[#27c93f]' />
        {title && <span className='ml-3 font-mono text-xs text-muted-foreground'>{title}</span>}
      </div>
      <div className='p-6 font-mono text-sm'>{children}</div>
    </div>
  )
}
