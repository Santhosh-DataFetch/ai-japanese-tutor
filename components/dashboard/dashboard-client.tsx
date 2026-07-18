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
    <div className="space-y-8 p-8 max-w-7xl mx-auto">

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
        <h1 className="text-5xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-muted-foreground text-lg">
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
            className="premium-card"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {card.value}
                </h2>

              </div>

              <div
                className="rounded-2xl p-3"
                style={{
                  backgroundColor: `${card.color}20`,
                }}
              >
                <card.icon
                  className="h-6 w-6"
                  style={{
                    color: card.color,
                  }}
                />
              </div>

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
          className="premium-card flex flex-col justify-between"
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

          <Link href="/review">

            <Button className="mt-8 w-full">

              Review Now

              <ArrowRight className="ml-2 h-4 w-4" />

            </Button>

          </Link>

        </motion.div>

        {/* AI Tutor */}

        <motion.div
          variants={itemVariants}
          className="premium-card flex flex-col justify-between"
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

          <Link href="/tutor">

            <Button
              variant="secondary"
              className="mt-8 w-full"
            >
              Open Tutor
            </Button>

          </Link>

        </motion.div>

        {/* Vocabulary */}

        <motion.div
          variants={itemVariants}
          className="premium-card flex flex-col justify-between"
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

          <Link href="/vocabulary">

            <Button
              variant="secondary"
              className="mt-8 w-full"
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

        <h2 className="mb-5 text-2xl font-bold">
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

                <div className="premium-card cursor-pointer transition hover:scale-[1.02]">

                  <module.icon className="mb-5 h-8 w-8 text-primary" />

                  <h3 className="text-xl font-semibold">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Continue learning.
                  </p>

                </div>

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
      >
        <div className="flex flex-col gap-4">

          <div>
            <h2 className="text-2xl font-bold">
              Today's Challenge
            </h2>

            <p className="mt-2 text-muted-foreground">
              Complete all of today's reviews to keep your streak alive.
            </p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width:
                  stats.due === 0
                    ? "100%"
                    : "35%",
              }}
              transition={{
                duration: 1,
              }}
              className="h-full rounded-full bg-primary"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {stats.due === 0
              ? "Amazing! You're caught up."
              : `${stats.due} review cards remaining`}
          </p>

        </div>
      </motion.div>

    </div>
  );
}