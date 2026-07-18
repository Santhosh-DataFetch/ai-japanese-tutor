'use client'

import { useEffect, useState } from 'react'
import { Search, Sparkles, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { getKanji } from '@/app/actions/kanji'
import Link from 'next/link'

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

export default function KanjiPage() {
  const [kanji, setKanji] = useState<Kanji[]>([])
  const [filtered, setFiltered] = useState<Kanji[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const data = await getKanji(500)
      const items = Array.isArray(data) ? data : []

      setKanji(items)
      setFiltered(items)
      setLoading(false)
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

        return (
          kanjiValue.includes(q) ||
          meaningValue.includes(q) ||
          onyomiValue.includes(q) ||
          kunyomiValue.includes(q)
        )
      })
    )
  }, [search, kanji])

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 py-4 md:py-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[32px] p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="glass-pill mb-4">Kanji collection</div>
              <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Discover the building blocks of Japanese.</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">Search the dictionary and open each character in a refined, distraction-free workspace.</p>
            </div>
            <div className="glass-sm rounded-[24px] p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-teal-300" />
                <span className="font-medium">{filtered.length} results</span>
              </div>
              <p className="mt-2">Refined results with elegant card layouts and premium spacing.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[28px] p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search kanji, meanings, or readings..."
              className="glass-input pl-12"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="glass-panel rounded-[28px] p-12 text-center text-slate-300">Loading the dictionary…</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((k) => (
              <motion.div key={k.id} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }}>
                <Link href={`/kanji/${k.kanji}`} className="glass-card flex h-full flex-col rounded-[24px] p-6 text-left transition">
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-2">
                      <BookOpen className="h-4 w-4 text-teal-300" />
                    </div>
                    <span className="glass-pill">{k.jlpt ?? '—'}</span>
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