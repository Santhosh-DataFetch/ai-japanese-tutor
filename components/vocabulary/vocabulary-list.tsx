"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  words: any[];
}

export default function VocabularyList({
  words,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return words.filter((word) => {
      const q = search.toLowerCase();

      return (
        word.japanese_kanji?.toLowerCase().includes(q) ||
        word.japanese_hiragana?.toLowerCase().includes(q) ||
        word.english_meaning?.toLowerCase().includes(q)
      );
    });
  }, [words, search]);

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-[28px] p-4 md:p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search vocabulary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input pl-12"
          />
        </div>
        <p className="mt-4 text-sm text-slate-400">Showing {filtered.length} of {words.length} words</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((word) => (
          <motion.div key={word.id} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }}>
            <div className="glass-card rounded-[24px] p-6">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                {word.japanese_kanji ?? word.japanese_hiragana}
              </h2>
              <p className="mt-1 text-sky-300">{word.japanese_hiragana}</p>
              <p className="mt-4 text-lg font-medium text-slate-100">{word.english_meaning}</p>

              {word.example_sentence && (
                <p className="mt-3 text-sm leading-7 text-slate-400 line-clamp-3">{word.example_sentence.replace(/<[^>]*>/g, "")}</p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {word.jlpt_level && <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs text-teal-200">{word.jlpt_level}</span>}
                {word.part_of_speech && <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-slate-300">{word.part_of_speech}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}