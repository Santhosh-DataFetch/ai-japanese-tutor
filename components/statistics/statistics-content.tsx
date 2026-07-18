'use client'

import { motion } from 'framer-motion'
import { Zap, Flame, BookOpen, Brain, CheckCircle, TrendingUp, Calendar, Target } from 'lucide-react'

interface StatisticsContentProps {
  stats: any
}

export default function StatisticsContent({ stats }: StatisticsContentProps) {
  const mainStats = [
    { icon: Zap, label: 'Total XP', value: Math.floor((stats?.xp ?? 0) / 1000), unit: 'k', color: 'from-yellow-600 to-orange-600' },
    { icon: Flame, label: 'Current Streak', value: stats?.streak ?? 0, unit: 'days', color: 'from-orange-600 to-red-600' },
    { icon: BookOpen, label: 'Vocabulary', value: stats?.vocabulary ?? 0, unit: 'words', color: 'from-blue-600 to-cyan-600' },
    { icon: Brain, label: 'Kanji Learned', value: stats?.kanji ?? 0, unit: 'characters', color: 'from-purple-600 to-pink-600' },
  ]

  const secondaryStats = [
    { icon: CheckCircle, label: 'Cards Reviewed', value: stats?.reviewed ?? 0, color: 'from-green-600 to-emerald-600' },
    { icon: Target, label: 'Due Today', value: stats?.due ?? 0, color: 'from-red-600 to-orange-600' },
  ]

  const weeklyData = [
    { day: 'Mon', count: 23, goal: 50 },
    { day: 'Tue', count: 45, goal: 50 },
    { day: 'Wed', count: 32, goal: 50 },
    { day: 'Thu', count: 50, goal: 50 },
    { day: 'Fri', count: 48, goal: 50 },
    { day: 'Sat', count: 20, goal: 50 },
    { day: 'Sun', count: 15, goal: 50 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="min-h-screen md:ml-20 bg-gradient-to-br from-background via-background to-purple-950/10 px-4 md:px-8 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-foreground">Statistics</h1>
          <p className="text-lg text-muted-foreground">Track your learning progress and achievements</p>
        </motion.div>

        {/* Main Stats Grid - Bento Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {mainStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="relative rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300 h-full">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="mt-2 text-4xl font-bold text-foreground">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Secondary Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {secondaryStats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-15 group-hover:opacity-25 transition-opacity`} />
                <div className="relative rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white opacity-80`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Weekly Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Weekly Activity</h2>
          </div>

          <div className="space-y-4">
            {weeklyData.map((item, idx) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="flex items-center gap-4"
              >
                <span className="w-12 font-medium text-sm text-muted-foreground">{item.day}</span>
                <div className="flex-1 bg-white/5 rounded-lg h-8 overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count / item.goal) * 100}%` }}
                    transition={{ delay: 0.6 + idx * 0.05, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${item.count >= item.goal ? 'from-green-600 to-emerald-600' : 'from-primary to-accent'} rounded-lg`}
                  />
                </div>
                <span className="w-16 text-right text-sm font-medium text-foreground">{item.count}/{item.goal}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {/* Distribution by Type */}
          <div className="rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02]">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">Distribution</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Vocabulary', value: 65, max: 100, color: 'from-blue-600 to-cyan-600' },
                { label: 'Kanji', value: 48, max: 100, color: 'from-purple-600 to-pink-600' },
                { label: 'Grammar', value: 82, max: 100, color: 'from-green-600 to-emerald-600' },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: 0.7 + idx * 0.1, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02]">
            <h3 className="text-xl font-bold text-foreground mb-6">Insights</h3>
            <div className="space-y-4">
              {[
                { title: 'Keep it up!', desc: 'You are 3 days away from a 30-day streak' },
                { title: 'Great progress', desc: 'You learned 12 new kanji this week' },
                { title: 'Consistent learner', desc: 'Your best day was Thursday with 50 reviews' },
              ].map((insight, idx) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <p className="font-semibold text-sm text-accent">{insight.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{insight.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
