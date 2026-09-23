'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FaGithub, FaLinkedin, FaPhoneSquareAlt } from 'react-icons/fa'
import { MdEmail, MdCheck } from 'react-icons/md'
import { EditModeDim } from '@/components/line-editor/EditModeDim'

const EMAIL = 'rene.salomone@gmail.com'

const links = [
  { href: 'tel:+15128843571', icon: FaPhoneSquareAlt, label: '+1 (512) 884-3571' },
  {
    href: 'https://github.com/ReneMSdev',
    icon: FaGithub,
    label: 'GitHub',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/rene-maxey-salomone-5444722a8/',
    icon: FaLinkedin,
    label: 'LinkedIn',
    external: true,
  },
]

const linkClasses =
  'flex items-center gap-3 text-foreground hover:text-accent text-sm font-medium w-fit transition-colors'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — the mailto: link still attempts to fire
    }
  }

  return (
    <motion.section
      id='contact'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className='relative overflow-hidden scroll-mt-14 py-20'
    >
      <EditModeDim className='relative px-4 md:px-10 max-w-5xl mx-auto'>
        <p className='font-mono text-3xl font-semibold text-accent lowercase mb-6'>Contact</p>

        <p className='text-[17px] text-muted-foreground max-w-md leading-relaxed mb-10'>
          Open to full-stack and backend roles — reach out through any of the below.
        </p>

        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <a
              href={`mailto:${EMAIL}`}
              onClick={handleEmailClick}
              className={linkClasses}
            >
              <MdEmail className='text-xl' />
              {EMAIL}
            </a>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className='flex items-center gap-1 font-mono text-xs text-accent'
                >
                  <MdCheck /> Copied
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {links.map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className={linkClasses}
            >
              <Icon className='text-xl' />
              {label}
            </a>
          ))}
        </div>
      </EditModeDim>
    </motion.section>
  )
}
