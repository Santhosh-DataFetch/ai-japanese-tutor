'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/app/actions/auth'
import { Sidebar } from '@/components/navigation/sidebar'

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
        // TODO: Fetch user profile stats from database
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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-primary rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userName={userName} />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
