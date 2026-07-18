'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 lg:p-12 space-y-8 max-w-7xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-6xl lg:text-7xl font-light">Kanji</h1>
            <p className="mt-2 text-lg text-muted-foreground font-light">Master {kanji.length} characters</p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-border bg-card max-w-md"
          >
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-base"
            />
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearch('')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </motion.button>
            )}
          </motion.div>

          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>
              <span className="font-medium text-foreground">{filtered.length}</span> results
            </span>
          </motion.div>
        </motion.div>

        {/* Kanji Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-24"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 border-2 border-border border-t-primary rounded-full"
            />
          </motion.div>
        ) : filtered.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filtered.map((k) => (
              <Link key={k.id} href={`/kanji/${encodeURIComponent(k.kanji)}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card border border-border rounded-2xl p-6 cursor-pointer group hover:border-border/60 transition-all"
                >
                  {/* Kanji Character */}
                  <div className="mb-4">
                    <p className="text-7xl font-light text-primary text-center">{k.kanji}</p>
                  </div>

                  {/* Meaning */}
                  <p className="text-center text-base font-medium mb-4 text-foreground">{k.meaning}</p>

                  {/* Readings */}
                  <div className="space-y-2 text-sm mb-4">
                    {k.onyomi && (
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Onyomi</p>
                        <p className="text-foreground">{k.onyomi}</p>
                      </div>
                    )}
                    {k.kunyomi && (
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Kunyomi</p>
                        <p className="text-foreground">{k.kunyomi}</p>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-border text-xs">
                    {k.jlpt && (
                      <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium">
                        N{k.jlpt}
                      </div>
                    )}
                    {k.stroke_count && (
                      <div className="text-muted-foreground">
                        {k.stroke_count} strokes
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-muted-foreground font-light">No kanji found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
