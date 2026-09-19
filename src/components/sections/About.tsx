'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const textStyles = 'max-w-md text-muted-foreground leading-relaxed'

export default function About() {
  const [open, setOpen] = useState(false)

  return (
    <motion.section
      id='about'
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className='scroll-mt-14 px-4 md:px-10 py-24 max-w-5xl mx-auto flex flex-col items-center md:items-start'
    >
      <p className='font-mono text-sm text-accent uppercase tracking-wider mb-4'>About</p>

      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className='max-w-md'
      >
        <p className={textStyles}>
          {
            "Hi, I'm René, a software developer with a background in computer science. I have a passion for problem-solving and building human-centered web applications. I'm currently open to full-time roles where I can contribute to meaningful products, continue learning, and collaborate with thoughtful teams."
          }
        </p>
        <CollapsibleContent className='space-y-4'>
          <p className={'pt-4 ' + textStyles}>
            {
              "After earning my B.S. in Computer Science, I've developed a variety of projects through freelance work for small businesses and entrepreneurs. Through collaboration, I've helped bring my clients' ideas to life, always striving to create seamless user experiences."
            }
          </p>
          <p className={textStyles}>
            {
              "Outside of coding, you'll usually find me traveling, discovering new coffee shops, and working on my next Spotify playlist. Feel free to reach out. I'm always happy to connect and collaborate."
            }
          </p>
        </CollapsibleContent>
        <div className='w-full flex'>
          <CollapsibleTrigger className='mt-3 font-mono text-xs uppercase tracking-wider cursor-pointer text-accent hover:opacity-80 transition-opacity'>
            {open ? 'Read less' : 'Read more'}
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </motion.section>
  )
}
