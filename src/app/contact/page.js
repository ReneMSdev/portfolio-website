'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function ContactPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mx-auto px-4 py-12 gap-8'>
      <div className='w-full max-w-xl flex flex-col items-center md:items-start px-4'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Let’s Connect</h2>
        <Card className='border-none shadow-none'>
          <CardContent className='p-0 space-y-6'>
            {/* Name Field */}
            <div className='flex flex-col space-y-2'>
              <label
                htmlFor='name'
                className='text-sm font-medium'
              >
                Name
              </label>
              <Input
                id='name'
                placeholder='Your name'
                className='w-full focus:outline-none border-1 border-slate-300 rounded-none'
              />
            </div>

            {/* Email Field */}
            <div className='flex flex-col space-y-2'>
              <label
                htmlFor='email'
                className='text-sm font-medium'
              >
                Email
              </label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                className='w-full focus:outline-none border-1 border-slate-300 rounded-none'
              />
            </div>

            {/* Message Field */}
            <div className='flex flex-col space-y-2'>
              <label
                htmlFor='message'
                className='text-md font-sm'
              >
                Message
              </label>
              <Textarea
                id='message'
                placeholder='Type your message here...'
                className='w-full focus:outline-none border-1 border-slate-300 rounded-none'
              />
            </div>

            {/* Send Button */}
            <Button className='w-full bg-white text-black border border-slate-300 rounded-none flex items-center justify-center cursor-pointer'>
              Send
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col items-center gap-6'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>My Links</h2>
        {/* QR Code */}
        <Image
          src='/qrcode.png'
          alt='Scan to connect'
          width={150}
          height={150}
          className='border border-slate-300'
        />
        <p className='text-sm text-muted-foreground'>Scan to connect</p>

        {/* Social Links */}
        <div className='flex flex-col items-center gap-3'>
          <a
            href='https://github.com/ReneMSdev'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline text-sm font-medium text-foreground'
          >
            GitHub
          </a>
          <a
            href='https://linkedin.com/in/yourprofile'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline text-sm font-medium text-foreground'
          >
            LinkedIn
          </a>
          <a
            href='mailto:renems.dev@gmail.com'
            className='hover:underline text-sm font-medium text-foreground'
          >
            renems.dev@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
