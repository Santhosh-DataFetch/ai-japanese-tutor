'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  userName?: string
  streak?: number
  xp?: number
}

export function Sidebar({ userName, streak = 0, xp = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/review", label: "Review", icon: Flame },
    { href: "/tutor", label: "AI Tutor", icon: MessageSquare },
    { href: "/vocabulary", label: "Vocabulary", icon: BookOpen },
    { href: "/kanji", label: "Kanji", icon: Zap },
    { href: "/statistics", label: "Statistics", icon: BarChart3 },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Floating Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 h-auto max-h-[90vh] w-20 flex-col items-center gap-3 z-50"
      >
        {/* Sidebar Container */}
        <motion.div
          layout
          className="flex flex-col items-center gap-2 rounded-3xl p-3 backdrop-blur-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-2xl"
        >
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/40 transition-all"
          >
            L
          </motion.button>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 py-2">
            {links.map((link, idx) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    title={link.label}
                    className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center ${
                      active
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/40'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-white/10" />

          {/* User Stats Compact */}
          {userName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-2 text-center text-xs"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-orange-500/10 text-orange-400 font-semibold cursor-help"
                title={`${streak} day streak`}
              >
                {streak}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 font-semibold cursor-help"
                title={`${xp} XP`}
              >
                {Math.floor(xp / 1000)}k
              </motion.div>
            </motion.div>
          )}

          {/* Sign Out */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="p-3 rounded-2xl text-destructive hover:bg-destructive/10 transition-all"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Mobile Expanded Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed md:hidden left-0 top-0 h-screen w-72 z-40 flex flex-col backdrop-blur-xl border-r border-white/10 bg-gradient-to-b from-white/5 to-transparent"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  L
                </motion.h1>
                <p className="text-xs text-muted-foreground mt-2 font-medium">Japanese Learning</p>
              </div>

              {/* User Info */}
              {userName && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 py-4 border-b border-white/10"
                >
                  <p className="text-sm font-semibold capitalize text-foreground">{userName}</p>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>Streak: <span className="text-orange-400 font-semibold">{streak}</span> days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span>XP: <span className="text-yellow-400 font-semibold">{xp.toLocaleString()}</span></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {links.map((link, idx) => {
                  const Icon = link.icon
                  const active = isActive(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all ${
                          active
                            ? 'bg-gradient-to-r from-primary/30 to-accent/20 text-primary border border-primary/40 shadow-md'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Sign Out */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 border-t border-white/10"
              >
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full gap-2 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </motion.div>
            </motion.aside>

            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}
