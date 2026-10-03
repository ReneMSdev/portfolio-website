import Image from 'next/image'
import { TextBlurBackdrop } from '@/components/ui/text-blur-backdrop'
import { cn } from '@/lib/utils'

// Fade-up entrance in CSS rather than motion: it starts with the first paint
// instead of waiting for hydration, which was holding back mobile LCP (the
// profile photo) by seconds on a throttled phone.
const fadeUp =
  'animate-in fade-in slide-in-from-bottom-4 animation-duration-600 fill-mode-both motion-reduce:animate-none'

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative scroll-mt-14 min-h-screen pt-14 flex items-center justify-center overflow-hidden'
    >
      <div className='relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-10 max-w-4xl mx-auto'>
        <div className={cn(fadeUp, 'delay-200 order-1 md:order-2 shrink-0')}>
          <Image
            src='/img/profile/profile.jpg'
            alt='René Maxey-Salomone'
            width={220}
            height={330}
            className='rounded-md ring-1 ring-accent/20'
            priority
          />
        </div>

        <TextBlurBackdrop className='order-2 md:order-1'>
          <div className='flex flex-col items-center md:items-start gap-4 text-center md:text-left'>
            <h1 className={cn(fadeUp, 'text-4xl md:text-[64px] font-bold text-foreground leading-tight')}>
              Hi, I&apos;m René
            </h1>
            <p
              className={cn(fadeUp, 'delay-100 font-mono text-base md:text-[18px] text-muted-foreground')}
            >
              Full-Stack Developer — Austin, TX
            </p>
            <p
              className={cn(fadeUp, 'delay-150 text-[17px] text-muted-foreground max-w-md leading-relaxed')}
            >
              I design and build full-stack applications, integrating AI where it adds real value.
            </p>
          </div>
        </TextBlurBackdrop>
      </div>
    </section>
  )
}
