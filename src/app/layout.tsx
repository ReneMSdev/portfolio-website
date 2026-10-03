import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import { MotionProvider } from '@/components/MotionProvider'
import { CursorGlow } from '@/components/ui/cursor-glow'
import { PageLinesLayer } from '@/components/page-lines/PageLinesLayer'
import { Analytics } from '@vercel/analytics/react'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ReneMSdev',
  description: 'Portfolio website',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className='scroll-smooth motion-reduce:scroll-auto'
    >
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased font-sans min-h-screen`}
      >
        <a
          href='#main'
          className='sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-foreground'
        >
          Skip to content
        </a>
        <CursorGlow />
        <MotionProvider>
          <Navbar />
          <MobileMenu />

          <PageLinesLayer>
            <main id='main'>{children}</main>
          </PageLinesLayer>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
