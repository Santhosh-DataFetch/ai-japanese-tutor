"use client";

import { useState } from "react";

import ReviewCard from "./review-card";
import ReviewProgress from "./review-progress";

import type { Vocabulary } from "@/types";

interface Props {
  words: Vocabulary[];
}

export default function ReviewSession({
  words,
}: Props) {
  const [index, setIndex] =
    useState(0);

  if (words.length === 0) {
    return (
      <div className="glass-panel rounded-[32px] p-10 text-center">
        <h2 className="text-3xl font-semibold text-white">Nothing to review</h2>
        <p className="mt-4 text-lg text-slate-300">You are fully caught up for now. Come back tomorrow for more practice.</p>
      </div>
    );
  }

  if (index >= words.length) {
    return (
      <div className="glass-panel rounded-[32px] p-10 text-center">
        <h2 className="text-4xl font-semibold text-white">Session complete</h2>
        <p className="mt-3 text-lg text-slate-300">Great work today. Your streak is stronger for it.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReviewProgress current={index + 1} total={words.length} />
      <ReviewCard word={words[index]} onNext={() => setIndex(index + 1)} />
    </div>
  );
}