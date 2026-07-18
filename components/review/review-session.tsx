"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReviewCard from "./review-card";
import ReviewProgress from "./review-progress";
import type { Vocabulary } from "@/types";

interface Props {
  words: Vocabulary[];
}

export default function ReviewSession({ words }: Props) {
  const [index, setIndex] = useState(0);

  if (words.length === 0) {
    return (
      <div className="min-h-screen md:ml-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center"
          >
            <span className="text-5xl">✨</span>
          </motion.div>
          <h2 className="text-5xl font-bold text-foreground">All caught up!</h2>
          <p className="mt-4 text-lg text-muted-foreground">No cards to review right now</p>
        </motion.div>
      </div>
    );
  }

  if (index >= words.length) {
    return (
      <div className="min-h-screen md:ml-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-600/30 to-emerald-600/30 flex items-center justify-center"
          >
            <span className="text-5xl">🎉</span>
          </motion.div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Session Complete!
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Awesome job! You reviewed {words.length} cards</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:ml-20 bg-gradient-to-br from-background via-background to-purple-950/10 flex flex-col px-4 md:px-8 py-8">
      <div className="flex-1 flex flex-col">
        <ReviewProgress current={index + 1} total={words.length} />
        <div className="flex-1 flex items-center justify-center">
          <ReviewCard word={words[index]} onNext={() => setIndex(index + 1)} />
        </div>
      </div>
    </div>
  );
}
