'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="animate-pulse">
        <div className="h-12 w-12 bg-primary rounded-lg" />
      </div>
    </main>
  )
}
