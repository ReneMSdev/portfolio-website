import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import { LoadingProvider } from '@/context/LoadingContext'
import RouteChangeSpinner from '@/components/RouteChangeSpinner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'ReneMSdev',
  description: 'Portfolio website',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 antialiased font-sans min-h-screen overflow-auto`}
      >
        <LoadingProvider>
          <RouteChangeSpinner />
          <Navbar />
          <MobileMenu />
          <main className='pt-0 md:pt-20'>{children}</main>
        </LoadingProvider>
      </body>
    </html>
  )
}
