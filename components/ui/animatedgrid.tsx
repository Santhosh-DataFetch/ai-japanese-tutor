'use client'

import { useEffect, useState, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedGridProps extends ComponentPropsWithoutRef<'div'> {}

export default function AnimatedGrid({ className, ...props }: AnimatedGridProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    let frameId: number | undefined

    const handleMouseMove = (event: MouseEvent) => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(() => {
        setMousePosition({ x: event.clientX, y: event.clientY })
      })
    }

    const handleMouseLeave = () => {
      setMousePosition(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 min-h-screen w-screen overflow-hidden bg-[#050505] dark:bg-[#050505] will-change-transform [transform:translateZ(0)]',
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[0.78] animate-[breath_10s_ease-in-out_infinite] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:168px_168px]" />

      {mousePosition ? (
        <div
          className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl transition-opacity duration-300"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        />
      ) : null}
    </div>
  )
}
