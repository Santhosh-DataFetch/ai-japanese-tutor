"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  words: any[];
}

export default function VocabularyList({ words }: Props) {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = words.filter((word) => {
      const q = search.toLowerCase();
      return (
        word.japanese_kanji?.toLowerCase().includes(q) ||
        word.japanese_hiragana?.toLowerCase().includes(q) ||
        word.english_meaning?.toLowerCase().includes(q)
      );
    });

    if (selectedFilter) {
      result = result.filter((word) => word.jlpt_level === selectedFilter);
    }

    return result;
  }, [words, search, selectedFilter]);

  const jlptLevels = ["N5", "N4", "N3", "N2", "N1"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-foreground">Vocabulary</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Build your Japanese vocabulary with {words.length} words
              </p>
            </div>
            <Link href="/vocabulary/add">
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30">
                <Plus className="w-5 h-5" />
                Add Word
              </Button>
            </Link>
          </div>

          {/* Raycast-style Search */}
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
                placeholder="Search by kanji, hiragana, or meaning..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
              />
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearch("")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* JLPT Level Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="text-sm text-muted-foreground font-medium">Filter:</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === null
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                  : "bg-white/10 text-muted-foreground hover:bg-white/20 border border-white/10"
              }`}
            >
              All
            </motion.button>
            {jlptLevels.map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === level
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                    : "bg-white/10 text-muted-foreground hover:bg-white/20 border border-white/10"
                }`}
              >
                {level}
              </motion.button>
            ))}
          </motion.div>

          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              <span className="font-semibold text-foreground">{words.length}</span> words
            </span>
          </motion.div>
        </motion.div>

        {/* Vocabulary Cards Grid */}
        {filtered.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((word, idx) => (
              <motion.div
                key={word.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                <div className="relative rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 h-full flex flex-col">
                  {/* Japanese Text */}
                  <div className="mb-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.02 + 0.1 }}
                      className="text-5xl font-bold text-foreground"
                    >
                      {word.japanese_kanji ?? word.japanese_hiragana}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.02 + 0.15 }}
                      className="mt-2 text-sm text-accent font-medium"
                    >
                      {word.japanese_hiragana}
                    </motion.p>
                  </div>

                  {/* English Meaning */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 + 0.2 }}
                    className="text-lg font-semibold text-foreground mb-4 flex-1"
                  >
                    {word.english_meaning}
                  </motion.p>

                  {/* Example Sentence */}
                  {word.example_sentence && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.02 + 0.25 }}
                      className="text-xs text-muted-foreground line-clamp-2 mb-4 italic"
                    >
                      {word.example_sentence.replace(/<[^>]*>/g, "")}
                    </motion.p>
                  )}

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 + 0.3 }}
                    className="flex items-center gap-2 flex-wrap mt-auto pt-4 border-t border-white/10"
                  >
                    {word.jlpt_level && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-cyan-300 border border-cyan-600/30">
                        {word.jlpt_level}
                      </span>
                    )}
                    {word.part_of_speech && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-pink-300 border border-pink-600/30">
                        {word.part_of_speech}
                      </span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
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
            <h3 className="text-2xl font-bold text-foreground">No words found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
