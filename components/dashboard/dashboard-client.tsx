"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Brain,
  BookOpen,
  Flame,
  Zap,
  ArrowRight,
  BarChart3,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import type { Variants } from "framer-motion";

interface DashboardStats {
  streak: number;
  xp: number;
  vocabulary: number;
  kanji: number;
  due: number;
}

interface Props {
  stats: DashboardStats;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
} satisfies Variants;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} satisfies Variants;

export default function DashboardClient({ stats }: Props) {
  const statCards = [
    { label: "Streak", value: stats.streak, unit: "days", icon: Flame, color: "from-orange-600 to-red-600" },
    { label: "XP Earned", value: Math.floor(stats.xp / 1000), unit: "k", icon: Zap, color: "from-yellow-600 to-orange-600" },
    { label: "Vocabulary", value: stats.vocabulary, unit: "words", icon: BookOpen, color: "from-blue-600 to-cyan-600" },
    { label: "Kanji", value: stats.kanji, unit: "learned", icon: Brain, color: "from-purple-600 to-pink-600" },
  ];

  const quickActions = [
    { href: "/review", label: "Start Review", icon: Flame, color: "primary", desc: `${stats.due} due` },
    { href: "/tutor", label: "Chat with AI", icon: MessageSquare, color: "accent", desc: "Practice now" },
    { href: "/vocabulary", label: "Browse", icon: BookOpen, color: "secondary", desc: "Add more" },
  ];

  return (
    <div className="min-h-screen md:ml-20 bg-gradient-to-br from-background via-background to-purple-950/10 px-4 md:px-8 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-purple-600/20 rounded-4xl blur-3xl -z-10" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative rounded-4xl p-8 md:p-12 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
              >
                Welcome back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-lg text-muted-foreground"
              >
                Continue your Japanese learning journey. You're on a {stats.streak} day streak!
              </motion.p>

              {/* Animated XP Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="mt-8 inline-block"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-3 rounded-xl bg-gradient-to-br from-yellow-600 to-orange-600"
                    >
                      <Zap className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total XP</p>
                      <p className="text-3xl font-bold text-white">{(stats.xp / 1000).toFixed(1)}k</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stat Cards Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="relative rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="mt-2 text-4xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{stat.unit}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Trend line */}
                  <motion.div className="mt-4 flex items-end gap-1 h-8">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${20 + i * 15}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                        className={`flex-1 rounded-sm bg-gradient-to-t ${stat.color}`}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            const isReview = action.href === "/review";
            return (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link href={action.href}>
                  <div className="group relative rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-accent/10" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${
                          isReview ? 'from-orange-600 to-red-600' : 'from-purple-600 to-pink-600'
                        } text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h3 className="font-semibold text-foreground">{action.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{action.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02]"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Weekly Activity</h2>
          
          <div className="space-y-4">
            {[
              { day: "Mon", activity: 320, goal: 500 },
              { day: "Tue", activity: 480, goal: 500 },
              { day: "Wed", activity: 290, goal: 500 },
              { day: "Thu", activity: 410, goal: 500 },
              { day: "Fri", activity: 500, goal: 500 },
              { day: "Sat", activity: 200, goal: 500 },
              { day: "Sun", activity: 150, goal: 500 },
            ].map((item, idx) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.05 }}
                className="flex items-center gap-4"
              >
                <p className="w-12 text-sm font-medium text-muted-foreground">{item.day}</p>
                <div className="flex-1 bg-white/5 rounded-lg h-8 overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.activity / item.goal) * 100}%` }}
                    transition={{ delay: 1 + idx * 0.05, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${
                      item.activity >= item.goal
                        ? 'from-green-600 to-emerald-600'
                        : 'from-primary to-accent'
                    } rounded-lg`}
                  />
                </div>
                <p className="w-16 text-right text-sm font-medium text-foreground">{item.activity}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Review Status */}
          <div className="rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Review Status</h3>
              <div className="p-2 rounded-lg bg-red-600/20">
                <Flame className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <p className="text-4xl font-bold text-foreground">{stats.due}</p>
            <p className="text-sm text-muted-foreground mt-2">cards due today</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-6"
            >
              <Link href="/review">
                <Button className="w-full gap-2">
                  Review Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Learning Stats */}
          <div className="rounded-2xl p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Learning Stats</h3>
              <div className="p-2 rounded-lg bg-purple-600/20">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Completion</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Retention</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
