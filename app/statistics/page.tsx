'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getStatistics } from "@/app/actions/statistics";
import { Zap, Flame, BookOpen, Brain, CheckCircle, Clock } from 'lucide-react'

interface StatCards {
  icon: React.ReactNode
  label: string
  value: number | string
  color: string
  highlight?: boolean
}

export default async function StatisticsPage() {
  const stats = await getStatistics();

  const statCards: StatCards[] = [
    { icon: <Zap className="w-6 h-6" />, label: "Total XP", value: stats?.xp ?? 0, color: "text-yellow-500" },
    { icon: <Flame className="w-6 h-6" />, label: "Current Streak", value: `${stats?.streak ?? 0} days`, color: "text-orange-500" },
    { icon: <BookOpen className="w-6 h-6" />, label: "Vocabulary", value: stats?.vocabulary ?? 0, color: "text-blue-500" },
    { icon: <Brain className="w-6 h-6" />, label: "Kanji", value: stats?.kanji ?? 0, color: "text-purple-500" },
    { icon: <CheckCircle className="w-6 h-6" />, label: "Reviewed", value: stats?.reviewed ?? 0, color: "text-green-500" },
    { icon: <Clock className="w-6 h-6" />, label: "Due Today", value: stats?.due ?? 0, color: "text-accent", highlight: true },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Statistics
          </h1>

          <p className="mt-3 text-muted-foreground font-medium">
            Track your Japanese learning progress and achievements.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="visible"
        >

          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              className={`premium-card group ${stat.highlight ? 'md:col-span-2 xl:col-span-1 ring-1 ring-accent/50' : ''}`}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                    {stat.label}
                  </p>

                  <h2 className={`mt-2 text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent`}>
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </h2>
                </div>

                <div className={`p-3 rounded-2xl ${stat.color} opacity-20 group-hover:opacity-30 smooth-transition`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>

        <motion.div 
          className="premium-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ y: -2 }}
        >
          <h2 className="text-2xl font-bold">
            Learning Progress
          </h2>

          <p className="mt-3 text-muted-foreground">
            Charts and detailed analytics will be displayed here.
          </p>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
