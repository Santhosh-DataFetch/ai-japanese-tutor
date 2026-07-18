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
          className="space-y-6"
        >
          <div>
            <h1 className="text-5xl font-bold text-foreground">Kanji Dictionary</h1>
            <p className="mt-2 text-lg text-muted-foreground">Master {kanji.length} kanji characters</p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-purple-600/20 rounded-2xl blur-2xl -z-10" />

            <div className="relative flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search kanji, meaning, or reading..."
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
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
            </div>
          </motion.div>

          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>
              Found <span className="font-semibold text-foreground">{filtered.length}</span> kanji
            </span>
          </motion.div>
        </motion.div>

        {/* Kanji Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 border-2 border-primary border-t-accent rounded-full"
            />
          </motion.div>
        ) : filtered.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {filtered.map((k) => (
              <Link key={k.id} href={`/kanji/${encodeURIComponent(k.kanji)}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative h-24 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />

                  <div className="relative h-full rounded-xl p-2 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300 flex flex-col items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl font-bold text-foreground text-center"
                    >
                      {k.kanji}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs text-muted-foreground mt-1 line-clamp-1 text-center"
                    >
                      {k.meaning}
                    </motion.p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">No kanji found</h3>
            <p className="mt-2 text-muted-foreground">Try a different search term</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
