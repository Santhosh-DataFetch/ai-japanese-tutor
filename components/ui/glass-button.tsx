"use client"

import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  className?: string
}

export default function GlassButton({ name, className, ...props }: GlassButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-[28px] border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl transition duration-200 hover:bg-white/15',
        className
      )}
      {...props}
    >
      {name}
    </button>
  )
}
