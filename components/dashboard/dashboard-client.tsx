'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Flame,
  Zap,
  MessageSquare,
  Calendar,
} from 'lucide-react'

interface DashboardStats {
  streak: number
  xp: number
  vocabulary: number
  kanji: number
  due: number
}

interface Props {
  stats: DashboardStats
}

export default function DashboardClient({ stats }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const xpPercentage = Math.min((stats.xp / 1000) * 100, 100)

  return (
    <div className="flex-1 overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 lg:p-12 space-y-12 max-w-7xl"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-6xl lg:text-7xl font-light tracking-tight">
            Welcome back
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Main Bento Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Large XP Card with Circular Progress */}
          <motion.div
            whileHover={{ y: -2 }}
            className="lg:col-span-2 bg-card border border-border rounded-2xl p-8 flex flex-col justify-between"
          >
            <div className="space-y-3 mb-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Today's Progress
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-light">{stats.xp}</span>
                <span className="text-muted-foreground">/1000 XP</span>
              </div>
            </div>

            {/* Circular Progress Visualization */}
            <div className="flex justify-center">
              <div className="w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-border"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="text-primary"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: (1 - xpPercentage / 100) * 2 * Math.PI * 40 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">{Math.round(xpPercentage)}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Current Streak
            </p>
            <div className="flex items-end gap-3">
              <Flame className="w-7 h-7 text-primary" />
              <div>
                <div className="text-4xl font-light">{stats.streak}</div>
                <div className="text-sm text-muted-foreground">days</div>
              </div>
            </div>
          </motion.div>

          {/* Due Today Card */}
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Due Today
            </p>
            <div className="flex items-end gap-3">
              <Calendar className="w-7 h-7 text-secondary" />
              <div>
                <div className="text-4xl font-light">{stats.due}</div>
                <div className="text-sm text-muted-foreground">reviews</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/review">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-card border border-border rounded-2xl p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="font-medium text-base mb-1">Start Review</h3>
              <p className="text-sm text-muted-foreground">Continue learning</p>
            </motion.div>
          </Link>

          <Link href="/tutor">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-card border border-border rounded-2xl p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/15 transition-colors">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <h3 className="font-medium text-base mb-1">AI Tutor</h3>
              <p className="text-sm text-muted-foreground">Get personalized help</p>
            </motion.div>
          </Link>

          <Link href="/vocabulary">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-card border border-border rounded-2xl p-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="font-medium text-base mb-1">Vocabulary</h3>
              <p className="text-sm text-muted-foreground">Browse and learn</p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Weekly Heatmap */}
        <motion.div variants={itemVariants} className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-lg font-medium mb-8">Weekly Activity</h2>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <p className="text-xs text-muted-foreground font-medium">{day}</p>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 60 + 20}px` }}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                  className="w-full bg-gradient-to-t from-primary to-primary/40 rounded-sm"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-light text-primary mb-2">{stats.vocabulary}</p>
            <p className="text-xs text-muted-foreground font-medium">Words</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-light text-primary mb-2">{stats.kanji}</p>
            <p className="text-xs text-muted-foreground font-medium">Kanji</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-light text-secondary mb-2">156</p>
            <p className="text-xs text-muted-foreground font-medium">Reviewed</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-light text-primary mb-2">89%</p>
            <p className="text-xs text-muted-foreground font-medium">Accuracy</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
