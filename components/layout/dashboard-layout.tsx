'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/app/actions/auth'
import { Sidebar } from '@/components/navigation/sidebar'
import AnimatedGrid from '@/components/ui/animatedgrid'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await getSession()
        if (!result.success || !result.session) {
          router.push('/login')
          return
        }

        setUserName(result.session.user?.email?.split('@')[0])
        setIsLoading(false)
      } catch (error) {
        console.error('[v0] Session check error:', error)
        router.push('/login')
      }
    }

    checkSession()
  }, [router])

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
        <AnimatedGrid className="pointer-events-none absolute inset-0 -z-10" />
        <div className="glass-panel relative rounded-full p-4 shadow-[0_24px_90px_-40px_rgba(0,0,0,0.72)]">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-teal-300 via-cyan-400 to-sky-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-foreground">
      <AnimatedGrid />

      <div className="relative flex min-h-screen">
        <Sidebar userName={userName} />
        <main className="flex-1 overflow-auto px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
