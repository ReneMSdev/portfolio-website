import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import { LoadingProvider } from '@/context/LoadingContext'
import RouteChangeSpinner from '@/components/RouteChangeSpinner'
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
    <html lang='en'>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased font-sans min-h-screen overflow-auto`}
      >
        <LoadingProvider>
          <RouteChangeSpinner />
          <Navbar />
          <MobileMenu />

          <main className='pt-0 md:pt-20'>{children}</main>
        </LoadingProvider>
        <Analytics />
      </body>
    </html>
  )
}
