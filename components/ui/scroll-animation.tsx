"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type InViewViewport = Omit<IntersectionObserverInit, 'root'> & {
  root?: Element | null
}

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  viewport?: InViewViewport
}

export function ScrollAnimation({ children, className, viewport }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px', amount: 0.4, ...(viewport ?? {}) })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 24, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
