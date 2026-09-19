'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

const MouseEnterContext = createContext<
  [boolean, (value: boolean) => void] | undefined
>(undefined)

export function useMouseEnter() {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a CardContainer')
  }
  return context
}

interface CardContainerProps {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function CardContainer({ children, className, containerClassName }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn('flex items-center justify-center', containerClassName)}
        style={{ perspective: '1000px' }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'relative flex items-center justify-center transition-all duration-200 ease-linear',
            className
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        '[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardItemProps<T extends ElementType> {
  as?: T
  children: ReactNode
  className?: string
  translateX?: number
  translateY?: number
  translateZ?: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
}

export function CardItem<T extends ElementType = 'div'>({
  as,
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardItemProps<T>>) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)
  const [isMouseEntered] = useMouseEnter()

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ])

  return (
    <Tag
      ref={ref as never}
      className={cn('w-fit transition duration-200 ease-linear', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
