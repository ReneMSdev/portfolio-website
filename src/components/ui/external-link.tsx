import type { ComponentPropsWithoutRef } from 'react'

type ExternalLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'target' | 'rel'>

/**
 * Link that opens in a new tab. Screen readers hear "(opens in new tab)" as
 * part of the link name; the note is sr-only, so it takes no visible space.
 */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a
      {...props}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
      <span className='sr-only'> (opens in new tab)</span>
    </a>
  )
}
