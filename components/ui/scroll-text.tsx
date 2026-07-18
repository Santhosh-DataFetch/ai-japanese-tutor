"use client"

import { motion } from 'framer-motion'
import { type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const motionTagMap = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
} as const

interface ScrollTextProps extends HTMLAttributes<HTMLDivElement> {
  text: string
  classname?: string
  letterAnime?: boolean
  lineAnime?: boolean
  direction?: 'left' | 'right' | 'down'
  variants?: any
  as?: ElementType
}

export default function ScrollText({
  text,
  classname,
  letterAnime,
  lineAnime,
  direction,
  variants,
  as: Tag = 'div',
  ...props
}: ScrollTextProps) {
  const MotionTag = (typeof Tag === 'string' && Tag in motionTagMap ? motionTagMap[Tag as keyof typeof motionTagMap] : motion.div)
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
    <MotionTag
      initial="hidden"
      animate="visible"
      variants={variants ?? animation}
      className={cn(classname)}
      {...props}
    >
      {text}
    </MotionTag>
  )
}
