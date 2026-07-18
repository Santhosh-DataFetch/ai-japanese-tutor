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
} from "lucide-react";



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

import type { Variants } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} satisfies Variants;

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
} satisfies Variants;

export default function DashboardClient({
  stats,
}: Props) {
  const cards = [
    {
      title: "Daily Streak",
      value: `${stats.streak} Days`,
      icon: Flame,
      color: "#f97316",
    },

    {
      title: "Total XP",
      value: stats.xp.toLocaleString(),
      icon: Zap,
      color: "#eab308",
    },

    {
      title: "Vocabulary",
      value: stats.vocabulary.toString(),
      icon: BookOpen,
      color: "#06b6d4",
    },

    {
      title: "Kanji",
      value: stats.kanji.toString(),
      icon: Brain,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-muted-foreground text-base font-medium">
          Continue your Japanese journey.
        </p>

      </motion.div>

      {/* Statistics */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >

        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={itemVariants}
            className="premium-card group cursor-pointer"
            whileHover={{ y: -4 }}
          >

            <div className="flex items-center justify-between gap-4">

              <div className="flex-1">

                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {card.value}
                </h2>

              </div>

              <motion.div
                className="rounded-2xl p-3 flex-shrink-0"
                style={{
                  backgroundColor: `${card.color}20`,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <card.icon
                  className="h-6 w-6"
                  style={{
                    color: card.color,
                  }}
                />
              </motion.div>

            </div>

          </motion.div>
        ))}

      </motion.div>
            {/* Quick Actions */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >

            {/* Continue Review */}

        <motion.div
          variants={itemVariants}
          className="premium-card flex flex-col justify-between group hover:border-primary/40"
          whileHover={{ y: -4 }}
        >

          <div>

            <h2 className="text-xl font-semibold">
              Continue Review
            </h2>

            <p className="mt-2 text-muted-foreground">
              You have
              <span className="mx-2 font-bold text-primary">
                {stats.due}
              </span>
              cards due.
            </p>

          </div>

          <Link href="/review" className="w-full">

            <Button className="mt-8 w-full group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-200">

              Review Now

              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />

            </Button>

          </Link>

        </motion.div>

        {/* AI Tutor */}

        <motion.div
          variants={itemVariants}
          className="premium-card flex flex-col justify-between group hover:border-accent/40"
          whileHover={{ y: -4 }}
        >

          <div>

            <h2 className="text-xl font-semibold">
              AI Tutor
            </h2>

            <p className="mt-2 text-muted-foreground">
              Ask questions, practice grammar,
              and improve your Japanese.
            </p>

          </div>

          <Link href="/tutor" className="w-full">

            <Button
              variant="secondary"
              className="mt-8 w-full group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-200"
            >
              Open Tutor
            </Button>

          </Link>

        </motion.div>

        {/* Vocabulary */}

        <motion.div
          variants={itemVariants}
          className="premium-card flex flex-col justify-between group hover:border-primary/40"
          whileHover={{ y: -4 }}
        >

          <div>

            <h2 className="text-xl font-semibold">
              Vocabulary
            </h2>

            <p className="mt-2 text-muted-foreground">
              Browse and manage your
              vocabulary collection.
            </p>

          </div>

          <Link href="/vocabulary" className="w-full">

            <Button
              variant="secondary"
              className="mt-8 w-full group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-200"
            >
              Open Vocabulary
            </Button>

          </Link>

        </motion.div>

      </motion.div>

      {/* Learning Modules */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <h2 className="mb-6 text-2xl font-bold">
          Learning Modules
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          {[
            {
              title: "Kanji",
              href: "/kanji",
              icon: Brain,
            },
            {
              title: "Vocabulary",
              href: "/vocabulary",
              icon: BookOpen,
            },
            {
              title: "AI Tutor",
              href: "/tutor",
              icon: Zap,
            },
          ].map((module) => (

            <motion.div
              key={module.title}
              variants={itemVariants}
            >

              <Link href={module.href}>

                <motion.div 
                  className="premium-card cursor-pointer group"
                  whileHover={{ y: -4, borderColor: 'var(--color-accent)' }}
                  transition={{ duration: 0.2 }}
                >

                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <module.icon className="mb-4 h-8 w-8 text-primary" />
                  </motion.div>

                  <h3 className="text-lg font-semibold">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Continue learning.
                  </p>

                </motion.div>

              </Link>

            </motion.div>

          ))}

        </div>

      </motion.div>
            {/* Today's Challenge */}

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="premium-card"
        whileHover={{ y: -2 }}
      >
        <div className="flex flex-col gap-4">

          <div>
            <h2 className="text-2xl font-bold">
              Today's Challenge
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Complete all of today's reviews to keep your streak alive.
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width:
                  stats.due === 0
                    ? "100%"
                    : `${((50 - Math.min(stats.due, 50)) / 50) * 100}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <motion.p 
            className="text-sm font-medium text-muted-foreground"
            key={stats.due}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stats.due === 0
              ? "✨ Amazing! You're caught up."
              : `${stats.due} review card${stats.due !== 1 ? 's' : ''} remaining`}
          </motion.p>

        </div>
      </motion.div>

    </div>
  );
}
