"use client"

import { motion } from 'framer-motion'
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ScrollTextProps extends HTMLAttributes<HTMLDivElement> {
  text: string
  classname?: string
  letterAnime?: boolean
  lineAnime?: boolean
  direction?: 'left' | 'right' | 'down'
  variants?: any
}

export default function ScrollText({
  text,
  classname,
  letterAnime,
  lineAnime,
  direction,
  variants,
  ...props
}: ScrollTextProps) {
  const animation = letterAnime
    ? {
        hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { staggerChildren: 0.05 } },
      }
    : {
        hidden: { opacity: 0, y: direction === 'down' ? -30 : 30, x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
      }

  return (
    <div className={cn(classname)} {...props}>
      {text}
    </div>
  )
}
