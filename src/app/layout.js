import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SidebarNav from '@/components/SidebarNav'
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans min-h-screen bg-[linear-gradient(to_right,_#ffffff,_#c7d2fe)]`}
      >
        <LoadingProvider>
          <RouteChangeSpinner />
          <SidebarNav />
          <MobileMenu />
          <main className='mt-26 md:mt-0'>{children}</main>
        </LoadingProvider>
      </body>
    </html>
  )
}
