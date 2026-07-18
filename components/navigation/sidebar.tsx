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

export function Sidebar({ userName, streak = 0, xp = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },

  { href: "/review", label: "Review", icon: Flame },

  { href: "/tutor", label: "AI Tutor", icon: MessageSquare },

  { href: "/vocabulary", label: "Vocabulary", icon: BookOpen },

  { href: "/kanji", label: "Kanji", icon: Zap },

  { href: "/statistics", label: "Statistics", icon: BarChart3 },

  { href: "/profile", label: "Profile", icon: User },

  { href: "/settings", label: "Settings", icon: Settings },
];

  const isActive = (href: string) => pathname === href

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden p-2 glass rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-accent" />
        ) : (
          <Menu className="w-5 h-5 text-accent" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:relative md:translate-x-0 left-0 top-0 h-screen w-72 glass-card flex flex-col z-30 md:z-0 border-r"
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            L
          </h1>
          <p className="text-xs text-muted-foreground mt-2">Japanese Learning Companion</p>
        </div>

        {/* User Stats */}
        {userName && (
          <div className="p-4 space-y-3 border-b border-border">
            <p className="text-sm text-foreground font-semibold">{userName}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-muted-foreground">Streak: {streak} days</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-muted-foreground">{xp} XP</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <motion.div key={link.href} whileHover={{ x: 4 }} whileTap={{ x: 2 }}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 border-t border-border">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
