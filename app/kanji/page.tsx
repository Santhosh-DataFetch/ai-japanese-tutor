'use client'

import { useEffect, useState } from 'react'
import { Search, Sparkles, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { getKanji } from '@/app/actions/kanji'
import { GlassCard, GlassPanel, PageHeader, PremiumInput, SectionTitle, StatCard } from '@/components/ui/design-system'

interface Kanji {
  id: string
  kanji: string
  meaning: string
  onyomi?: string
  kunyomi?: string
  jlpt?: string
  grade?: number
  stroke_count?: number
}

const fallbackKanji: Kanji[] = [
  { id: 'fallback-1', kanji: '日', meaning: 'sun, day', onyomi: 'ニチ', kunyomi: 'ひ', jlpt: 'N5', grade: 1, stroke_count: 4 },
  { id: 'fallback-2', kanji: '人', meaning: 'person', onyomi: 'ジン', kunyomi: 'ひと', jlpt: 'N5', grade: 1, stroke_count: 2 },
  { id: 'fallback-3', kanji: '水', meaning: 'water', onyomi: 'スイ', kunyomi: 'みず', jlpt: 'N5', grade: 1, stroke_count: 4 },
  { id: 'fallback-4', kanji: '学', meaning: 'study', onyomi: 'ガク', kunyomi: 'まな.ぶ', jlpt: 'N4', grade: 2, stroke_count: 8 },
  { id: 'fallback-5', kanji: '文', meaning: 'sentence, writing', onyomi: 'ブン', kunyomi: 'ふみ', jlpt: 'N4', grade: 2, stroke_count: 4 },
  { id: 'fallback-6', kanji: '先', meaning: 'before, ahead', onyomi: 'セン', kunyomi: 'さき', jlpt: 'N4', grade: 2, stroke_count: 6 },
  { id: 'fallback-7', kanji: '生', meaning: 'life, birth', onyomi: 'セイ', kunyomi: 'い.きる', jlpt: 'N3', grade: 3, stroke_count: 5 },
  { id: 'fallback-8', kanji: '場', meaning: 'place', onyomi: 'ジョウ', kunyomi: 'ば', jlpt: 'N3', grade: 3, stroke_count: 12 },
]

export default function KanjiPage() {
  const [kanji, setKanji] = useState<Kanji[]>(fallbackKanji)
  const [filtered, setFiltered] = useState<Kanji[]>(fallbackKanji)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await getKanji(500)
        const items = Array.isArray(data) ? data : []
        const nextItems = items.length ? items : fallbackKanji
        setKanji(nextItems)
        setFiltered(nextItems)
        setUsingFallback(items.length === 0)
      } catch {
        setKanji(fallbackKanji)
        setFiltered(fallbackKanji)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(kanji)
      return
    }

    const q = search.toLowerCase()

    setFiltered(
      kanji.filter((k) => {
        const kanjiValue = k.kanji?.toLowerCase() ?? ''
        const meaningValue = k.meaning?.toLowerCase() ?? ''
        const onyomiValue = k.onyomi?.toLowerCase() ?? ''
        const kunyomiValue = k.kunyomi?.toLowerCase() ?? ''

        return kanjiValue.includes(q) || meaningValue.includes(q) || onyomiValue.includes(q) || kunyomiValue.includes(q)
      })
    )
  }, [search, kanji])

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 py-4 md:py-6">
        <GlassPanel className="p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-teal-200">
                Kanji collection
              </div>
              <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Discover the building blocks of Japanese.</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">Search the dictionary and open each character in a refined, distraction-free workspace.</p>
            </div>
            <GlassCard className="w-full max-w-sm p-4">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-teal-300" />
                <span className="font-medium">{filtered.length} results</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">Refined results with elegant card layouts and premium spacing.</p>
            </GlassCard>
          </div>
        </GlassPanel>

        <GlassPanel className="p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <PremiumInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search kanji, meanings, or readings..."
              className="h-12 pl-12"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
        </GlassPanel>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Visible cards" value={filtered.length} change="live" />
          <StatCard label="Search mode" value={search ? 'filtered' : 'full'} change="interactive" />
          <StatCard label="Data state" value={usingFallback ? 'fallback' : 'dictionary'} change="safe" />
        </div>

        {loading ? (
          <GlassPanel className="p-12 text-center text-slate-300">Loading the dictionary…</GlassPanel>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((k) => (
              <motion.div key={k.id} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }}>
                <Link href={`/kanji/${k.kanji}`} className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/8 p-6 text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl transition hover:border-teal-400/30 hover:bg-white/10">
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-2">
                      <BookOpen className="h-4 w-4 text-teal-300" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                      {k.jlpt ?? '—'}
                    </span>
                  </div>
                  <p className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-white">{k.kanji}</p>
                  <p className="mt-3 text-lg font-medium text-slate-100">{k.meaning}</p>
                  <p className="mt-2 text-sm text-sky-300">{k.onyomi || '—'}</p>
                  <p className="mt-1 text-sm text-slate-400">{k.kunyomi || '—'}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                    <span>{k.stroke_count ? `${k.stroke_count} strokes` : '—'}</span>
                    <span>{k.grade ? `Grade ${k.grade}` : '—'}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}