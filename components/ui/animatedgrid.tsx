import { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedGridProps extends ComponentPropsWithoutRef<'div'> {}

export default function AnimatedGrid({ className, ...props }: AnimatedGridProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-950/95 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),transparent_30%)] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent_30%,rgba(255,255,255,0.04))] after:opacity-80',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 grid grid-cols-12 gap-x-6 opacity-15">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="h-full border-r border-white/10" />
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-10 gap-y-6 opacity-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full border-b border-white/10" />
        ))}
      </div>
      <div className="absolute inset-0 animate-[pulse_6s_ease-in-out_infinite]">
        <div className="absolute left-10 top-12 h-24 w-24 rounded-full bg-slate-700/50 blur-3xl" />
        <div className="absolute right-16 top-28 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-1/2 bottom-20 h-28 w-28 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
    </div>
  )
}
