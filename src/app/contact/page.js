'use client'

import { useState, useRef, useEffect } from 'react'
import { useLoading } from '@/context/LoadingContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaPhoneSquareAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function ContactPage() {
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(formRef.current)
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      toast.success('Message sent successfully! 🎉')
      formRef.current.reset()
    } else {
      toast.error('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-start mx-auto mt-20 md:mt-10 pl-0 md:pl-26 max-w-5xl'>
        {/* Contact Form */}
        <div className='flex flex-col w-xs mx-auto'>
          <h2 className='text-2xl font-semibold mb-6 text-center text-indigo-900 dark:text-indigo-700'>
            Let’s Connect
          </h2>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <input
              type='hidden'
              name='access_key'
              value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
            />
            <Card className='border-none shadow-none bg-transparent'>
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
                    type='text'
                    id='name'
                    name='name'
                    required
                    placeholder='Your name'
                    className='w-full focus:outline-none border-1 border-slate-300'
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
                    name='email'
                    type='email'
                    required
                    placeholder='you@example.com'
                    className='w-full focus:outline-none border-1 border-slate-300'
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
                    name='message'
                    required
                    placeholder='Type your message here...'
                    className='w-full focus:outline-none border-1 selection:text-white selection:bg-black border-slate-300'
                  />
                </div>

                {/* Send Button */}
                <Button
                  type='submit'
                  className='w-full text-black bg-slate-300 flex items-center justify-center cursor-pointer hover:text-white hover:font-bold hover:bg-slate-500 hover:border-none'
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
        <div className='flex flex-col items-center gap-6'>
          <h2 className='text-2xl font-semibold mb-6 text-center text-indigo-900 dark:text-indigo-700'>
            My Links
          </h2>
          {/* QR Code */}
          <Image
            src='/img/qrcode.png'
            alt='Scan to connect'
            width={150}
            height={150}
            className='border border-slate-300 rounded-md'
          />
          <p className='text-sm text-muted-foreground'>Scan for my digital business card</p>

          {/* Social Links */}
          <div className='flex flex-col items-start gap-3 pb-20'>
            <a
              href='mailto:renems.dev@gmail.com'
              className='hover:text-blue-500 text-sm font-medium text-foreground'
            >
              <div className='flex'>
                <MdEmail className='text-xl mr-4' />
                renems.dev@gmail.com
              </div>
            </a>
            <a
              href='tel:+15103131898'
              className='hover:text-blue-500 text-sm font-medium text-foreground'
            >
              <div className='flex'>
                <FaPhoneSquareAlt className='text-xl mr-4' />
                +1 (510) 313 - 1898
              </div>
            </a>
            <a
              href='https://github.com/ReneMSdev'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-500 text-sm font-medium text-foreground'
            >
              <div className='flex'>
                <FaGithub className='text-xl mr-4' />
                GitHub
              </div>
            </a>
            <a
              href='https://www.linkedin.com/in/rene-maxey-salomone-5444722a8/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-500 text-sm font-medium text-foreground'
            >
              <div className='flex'>
                <FaLinkedin className='text-xl mr-4' />
                LinkedIn
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position='top-right' />
    </>
  )
}
