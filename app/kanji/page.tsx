'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
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

      setKanji(data)
      setFiltered(data)

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
      kanji.filter(
        (k) =>
          k.kanji.includes(search) ||
          k.meaning.toLowerCase().includes(q) ||
          k.onyomi?.includes(search) ||
          k.kunyomi?.includes(search)
      )
    )
  }, [search, kanji])

  return (
  <DashboardLayout>
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-4xl font-bold mb-6">
        Kanji Dictionary
      </h1>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search kanji, meaning, reading..."
          className="
            w-full
            rounded-xl
            border
            border-border
            bg-background
            pl-12
            pr-4
            py-3
          "
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((k) => (
            <Link
href={`/kanji/${k.kanji}`}
  key={k.id}
  className="glass-card rounded-xl p-5 hover:scale-105 transition block"
>
              <p className="text-5xl font-bold">
                {k.kanji}
              </p>

              <p className="mt-3 font-semibold">
                {k.meaning}
              </p>

              <p className="text-sm text-primary">
                {k.onyomi}
              </p>

              <p className="text-sm text-muted-foreground">
                {k.kunyomi}
              </p>

              <div className="mt-4 flex justify-between text-xs">
                <span>{k.jlpt}</span>

                <span>
                  {k.stroke_count} strokes
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </DashboardLayout>
)
}