"use client"

import { type ButtonHTMLAttributes, type MouseEvent, useState } from 'react'
import { cn } from '@/lib/utils'

interface SlideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name1: string
  name2: string
  className?: string
}

export default function SlideButton({ name1, name2, className, onClick, ...props }: SlideButtonProps) {
  const [active, setActive] = useState(false)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setActive((current) => !current)
    onClick?.(event)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'relative inline-flex h-14 w-full max-w-[320px] items-center justify-between overflow-hidden rounded-full border border-white/10 bg-slate-900/90 px-1 text-sm text-white shadow-[0_20px_70px_-30px_rgba(15,23,42,0.8)] transition-all duration-300 hover:border-white/20 hover:bg-slate-900/95',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'absolute inset-y-1 z-0 transition-all duration-300 rounded-full bg-slate-800/95 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.6)]',
          active ? 'right-1 w-1/2' : 'left-1 w-1/2'
        )}
      />
      <span className={cn('relative z-10 w-1/2 text-center transition-colors duration-300', active ? 'text-slate-300' : 'text-white')}>
        {name1}
      </span>
      <span className={cn('relative z-10 w-1/2 text-center transition-colors duration-300', active ? 'text-white' : 'text-slate-300')}>
        {name2}
      </span>
    </button>
  )
}
