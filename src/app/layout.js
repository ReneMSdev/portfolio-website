import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SidebarNav from '@/components/SidebarNav'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`bg-zinc-400 ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <SidebarNav />
        <main className='ml-32 px-6 py-10'>{children}</main>
      </body>
    </html>
  )
}
