"use client";

import { useMemo, useState } from "react";

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
        word.japanese_kanji
          ?.toLowerCase()
          .includes(q) ||
        word.japanese_hiragana
          ?.toLowerCase()
          .includes(q) ||
        word.english_meaning
          ?.toLowerCase()
          .includes(q)
      );
    });
  }, [words, search]);

  return (
    <div className="space-y-6">

      <input
        placeholder="🔍 Search vocabulary..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-xl border bg-background p-3"
      />

      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {words.length} words
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {filtered.map((word) => (
          <div
            key={word.id}
            className="glass-card rounded-xl p-5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold">
              {word.japanese_kanji ??
                word.japanese_hiragana}
            </h2>

            <p className="mt-1 text-primary">
              {word.japanese_hiragana}
            </p>

            <p className="mt-4 text-lg font-medium">
              {word.english_meaning}
            </p>

            {word.example_sentence && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                {word.example_sentence.replace(
                  /<[^>]*>/g,
                  ""
                )}
              </p>
            )}

            <div className="mt-5 flex items-center gap-2">

              {word.jlpt_level && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">
                  {word.jlpt_level}
                </span>
              )}

              {word.part_of_speech && (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {word.part_of_speech}
                </span>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}