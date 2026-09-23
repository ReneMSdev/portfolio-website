import type { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
}

export function TerminalWindow({ title, children }: TerminalWindowProps) {
  return (
    // Dracula-themed chrome, darkened from the stock palette (#282a36) so
    // it doesn't read too light against the site's near-black surfaces —
    // still reads as a distinct "screen", just lower contrast with the page.
    <div className='rounded-lg border border-[#6272a4]/40 bg-[#1f202b] overflow-hidden'>
      <div className='flex items-center gap-2 px-4 py-3 border-b border-[#6272a4]/40 bg-[#1a1b23]'>
        <span className='w-3 h-3 rounded-full bg-[#ff5f56]' />
        <span className='w-3 h-3 rounded-full bg-[#ffbd2e]' />
        <span className='w-3 h-3 rounded-full bg-[#27c93f]' />
        {title && <span className='ml-3 font-mono text-xs text-[#8b90a5]'>{title}</span>}
      </div>
      <div className='p-6 font-mono text-sm'>{children}</div>
    </div>
  )
}
