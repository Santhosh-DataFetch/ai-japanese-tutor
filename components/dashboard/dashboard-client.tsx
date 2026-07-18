"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Flame, Zap, Sparkles } from "lucide-react";

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

const metrics = [
  { label: "Streak", key: "streak", emoji: "🔥", accent: "from-amber-300 via-orange-300 to-red-400" },
  { label: "XP", key: "xp", emoji: "⚡", accent: "from-cyan-300 via-sky-400 to-blue-500" },
  { label: "Vocabulary", key: "vocabulary", emoji: "📚", accent: "from-teal-300 via-cyan-400 to-sky-500" },
  { label: "Kanji", key: "kanji", emoji: "漢", accent: "from-violet-400 via-fuchsia-500 to-pink-500" },
] as const;

export default function DashboardClient({ stats }: Props) {
  return (
    <div className="relative overflow-hidden px-4 py-6 md:px-8 lg:px-10">
      <div className="glass-panel relative overflow-hidden rounded-[42px] border-white/10 bg-[rgba(255,255,255,0.08)] p-8 shadow-[0_40px_120px_-46px_rgba(0,0,0,0.78)] md:p-12">
        <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-teal-400/12 blur-3xl" />
        <div className="absolute right-6 top-24 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -left-10 bottom-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative grid gap-8 xl:grid-cols-[1.8fr_1.2fr] xl:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.34em] text-slate-300 shadow-[0_12px_40px_-32px_rgba(0,0,0,0.9)]">
              <Sparkles className="h-4 w-4 text-teal-300" />
              Premium study cockpit
            </div>
            <div className="max-w-3xl">
              <p className="text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">Your Japanese practice, fully reimagined.</p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Step into a spacious learning workspace with ambient glass panels, elegant motion, and clear study direction for kanji, vocabulary, and AI tutoring.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/review">
                <Button className="rounded-[20px] px-6 py-3">Continue review</Button>
              </Link>
              <Link href="/tutor">
                <Button variant="secondary" className="rounded-[20px] px-6 py-3">Launch tutor</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/5 p-8 shadow-[0_32px_120px_-48px_rgba(0,0,0,0.82)]">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Focus snapshot</p>
            <div className="mt-8 grid gap-5">
              <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Due reviews</p>
                <p className="mt-4 text-4xl font-semibold text-white">{stats.due}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Consistency</p>
                <p className="mt-4 text-4xl font-semibold text-white">{stats.streak}d</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="grid gap-6">
          <div className="glass-card rounded-[34px] p-8 shadow-[0_36px_124px_-52px_rgba(0,0,0,0.82)]">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.34em] text-slate-400">Learning mission</p>
                <h2 className="text-3xl font-semibold text-white">A cleaner path for daily study.</h2>
                <p className="text-slate-300">Designed for large whitespace, layered glass depth, and distraction-free study flow across your learning journeys.</p>
              </div>
              <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.07)] p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Snapshot</p>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <p>• {stats.vocabulary} vocabulary cards</p>
                  <p>• {stats.kanji} kanji studied</p>
                  <p>• {stats.xp.toLocaleString()} XP so far</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="glass-card rounded-[32px] p-6 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-white">{stats[metric.key as keyof DashboardStats]}</p>
                  </div>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${metric.accent} text-[#041615] shadow-[0_16px_32px_-22px_rgba(45,212,191,0.55)]`}>
                    <span className="text-xl">{metric.emoji}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-panel rounded-[34px] p-8 shadow-[0_36px_124px_-52px_rgba(0,0,0,0.82)]">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Today</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Ready for your next review?</h2>
              </div>
              <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-6">
                <p className="text-sm text-slate-400">Next session</p>
                <p className="mt-4 text-3xl font-semibold text-white">{stats.due} cards</p>
              </div>
              <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-6">
                <p className="text-sm text-slate-400">Weekly momentum</p>
                <p className="mt-4 text-3xl font-semibold text-white">{stats.streak} days</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[34px] p-8 shadow-[0_36px_124px_-52px_rgba(0,0,0,0.82)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Quick actions</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Open a study zone</h3>
              </div>
              <Sparkles className="h-6 w-6 text-teal-300" />
            </div>
            <div className="mt-6 grid gap-3">
              <Link href="/kanji" className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">Explore Kanji</Link>
              <Link href="/vocabulary" className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">Browse Vocabulary</Link>
              <Link href="/tutor" className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">Launch Tutor</Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10 glass-panel rounded-[42px] border-white/10 p-8 shadow-[0_40px_130px_-58px_rgba(0,0,0,0.82)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-slate-400">Insight</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Your progress at a glance.</h2>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Updated after each review session</div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-6">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Momentum</p>
            <div className="mt-6 h-48 rounded-[28px] bg-gradient-to-br from-teal-400/15 to-sky-400/5 shadow-inner shadow-black/20" />
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-6">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Focus</p>
            <div className="mt-6 h-48 rounded-[28px] bg-gradient-to-br from-violet-400/15 to-fuchsia-400/5 shadow-inner shadow-black/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
