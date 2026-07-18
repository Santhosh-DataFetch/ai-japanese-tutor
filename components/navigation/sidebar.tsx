'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BookOpen,
  MessageSquare,
  Zap,
  BarChart3,
  LogOut,
  Menu,
  X,
  Flame,
  Settings,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  userName?: string
  streak?: number
  xp?: number
}

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/review', label: 'Review', icon: Flame },
  { href: '/tutor', label: 'AI Tutor', icon: MessageSquare },
  { href: '/vocabulary', label: 'Vocabulary', icon: BookOpen },
  { href: '/kanji', label: 'Kanji', icon: Zap },
  { href: '/statistics', label: 'Statistics', icon: BarChart3 },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ userName, streak = 0, xp = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      <button
        className="fixed left-4 top-4 z-40 rounded-3xl border border-white/10 bg-white/10 p-3 text-slate-100 backdrop-blur-3xl shadow-lg shadow-black/20 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5 text-teal-300" /> : <Menu className="h-5 w-5 text-teal-300" />}
      </button>

      <motion.aside
        initial={{ x: -120 }}
        animate={{ x: isOpen ? 0 : -120 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="fixed left-0 top-0 z-30 flex h-screen w-24 flex-col items-center gap-4 border-r border-white/10 bg-slate-950/90 px-3 py-5 text-slate-100 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.32)] md:relative md:w-28"
      >
        <div className="group flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-400/20 via-sky-400/20 to-violet-400/15 text-xl font-semibold text-white shadow-[0_20px_40px_-30px_rgba(45,212,191,0.95)]">
          L
        </div>

        <div className="hidden w-full flex-col items-center gap-1 text-center text-[11px] uppercase tracking-[0.32em] text-slate-500 md:flex">
          <span className="text-white">{userName ?? 'Learner'}</span>
          <span>Study Dock</span>
        </div>

        <nav className="mt-3 flex flex-1 flex-col items-center gap-3">
          {links.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <motion.div key={link.href} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="relative flex h-14 w-14 items-center justify-center rounded-3xl"
                >
                  <span className={`absolute inset-0 rounded-3xl transition ${active ? 'bg-teal-400/18 shadow-[0_16px_40px_-22px_rgba(45,212,191,0.5)]' : 'bg-white/5 hover:bg-white/10'}`} />
                  <Icon className={`relative z-10 h-6 w-6 transition ${active ? 'text-teal-300' : 'text-slate-300'}`} />
                  <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-full border border-white/10 bg-slate-950/90 px-3 py-1 text-xs text-slate-100 shadow-lg backdrop-blur-xl group-hover:block md:block lg:hidden">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className="mt-auto w-full rounded-3xl border border-white/10 bg-white/5 p-2">
          <Button
            onClick={handleSignOut}
            variant="secondary"
            className="w-full rounded-3xl border-white/10 bg-slate-900/80 px-3 py-3 text-[0.8rem] text-slate-200 hover:bg-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      </motion.aside>

      {isOpen && <div className="fixed inset-0 z-20 bg-black/60 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
