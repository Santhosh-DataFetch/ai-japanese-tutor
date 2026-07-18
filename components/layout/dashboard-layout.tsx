'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
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
      <div className="flex items-center justify-center h-screen bg-background">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.p
            className="text-muted-foreground text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading your learning journey...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div 
      className="flex h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Sidebar userName={userName} />
      <main className="flex-1 overflow-auto">
        <motion.div 
          className="p-4 md:p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </motion.div>
  )
}
