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
        className="fixed md:relative md:translate-x-0 left-0 top-0 h-screen w-72 glass-card flex flex-col z-30 md:z-0 border-r backdrop-blur-xl"
      >
        <motion.div 
          className="p-6 border-b border-border/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            L
          </motion.h1>
          <p className="text-xs text-muted-foreground mt-2 font-medium">Japanese Learning Companion</p>
        </motion.div>

        {/* User Stats */}
        {userName && (
          <motion.div 
            className="p-4 space-y-3 border-b border-border/50 bg-gradient-to-br from-primary/5 to-accent/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <p className="text-sm text-foreground font-semibold capitalize">{userName}</p>
            <div className="space-y-2">
              <motion.div 
                className="flex items-center gap-2 text-xs"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Flame className="w-4 h-4 text-orange-500 animate-float" />
                <span className="text-muted-foreground">Streak: <span className="text-orange-400 font-medium">{streak}</span> days</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 text-xs"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="w-4 h-4 text-yellow-500 animate-float" style={{ animationDelay: '0.5s' }} />
                <span className="text-muted-foreground"><span className="text-yellow-400 font-medium">{xp}</span> XP</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5">
          {links.map((link, idx) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <motion.div 
                key={link.href} 
                whileHover={{ x: 6 }} 
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 smooth-transition ${
                    active
                      ? 'bg-gradient-to-r from-primary/25 to-accent/15 text-primary border border-primary/40 shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/8 hover:border hover:border-primary/20'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Sign Out Button */}
        <motion.div 
          className="p-4 border-t border-border/50 bg-gradient-to-t from-destructive/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </motion.div>
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
