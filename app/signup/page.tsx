'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { signUpWithEmail } from '@/app/actions/auth'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const result = await signUpWithEmail(email, password, displayName)
      if (!result.success) {
        setError(result.error || 'Signup failed')
        setIsLoading(false)
        return
      }

      alert('Check your email and verify your account before logging in.')
router.push('/login')
    } catch (err) {
      console.error('[v0] Signup error:', err)
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-10 top-10 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
        <motion.div animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="relative z-10 w-full max-w-md">
        <div className="glass-panel rounded-[32px] p-8 space-y-8">
          <div className="space-y-3 text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center justify-center">
              <div className="rounded-[20px] bg-gradient-to-br from-teal-400/30 via-sky-400/30 to-violet-400/20 p-3">
                <span className="text-2xl font-semibold text-white">L</span>
              </div>
            </motion.div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">Get started</h1>
            <p className="text-slate-300">Begin your Japanese learning journey today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="space-y-2">
              <label htmlFor="displayName" className="block text-sm font-medium text-slate-300">Full name</label>
              <input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" required className="glass-input" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="glass-input" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="glass-input" />
              <p className="text-xs text-slate-400">At least 8 characters</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">Confirm password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required className="glass-input" />
            </motion.div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[20px] border border-rose-400/20 bg-rose-400/10 p-4 text-sm font-medium text-rose-200">
                {error}
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <Button type="submit" disabled={isLoading} className="h-12 w-full justify-center rounded-[18px]">
                {isLoading ? <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>Creating account...</motion.span> : 'Create Account'}
              </Button>
            </motion.div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-transparent px-3 text-xs font-medium uppercase tracking-wide text-slate-400">Already have an account?</span>
            </div>
          </div>

          <Link href="/login">
            <Button type="button" variant="secondary" className="h-12 w-full justify-center rounded-[18px]">
              Sign In
            </Button>
          </Link>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-center text-xs text-slate-400">
          Join thousands learning Japanese with L.
        </motion.p>
      </motion.div>
    </div>
  )
}
