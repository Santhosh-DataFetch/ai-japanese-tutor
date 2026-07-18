import { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/90 shadow-[0_32px_96px_-42px_rgba(0,0,0,0.75)] backdrop-blur-2xl',
        className
      )}
      {...props}
    />
  )
}
