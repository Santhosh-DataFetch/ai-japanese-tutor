"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReviewButtons from "./review-buttons";
import type { Vocabulary } from "@/types";
import { reviewWord } from "@/app/actions/review";

interface Props {
  word: Vocabulary;
  onNext: () => void;
}

export default function ReviewCard({ word, onNext }: Props) {
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (loading) return;

      if (e.code === "Space" && !showAnswer) {
        e.preventDefault();
        setIsFlipped(!isFlipped);
        setShowAnswer(true);
        return;
      }

      if (!showAnswer) return;

      switch (e.key) {
        case "1":
          handleReview("Again");
          break;
        case "2":
          handleReview("Hard");
          break;
        case "3":
          handleReview("Good");
          break;
        case "4":
          handleReview("Easy");
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAnswer, loading, isFlipped]);

  async function handleReview(rating: "Again" | "Hard" | "Good" | "Easy") {
    setLoading(true);

    try {
      const xpMessages = {
        Again: "+2 XP",
        Hard: "+5 XP",
        Good: "+10 XP",
        Easy: "+15 XP 🔥",
      };

      setMessage(xpMessages[rating]);
      await reviewWord(word.id, rating);

      setTimeout(() => {
        setMessage("");
        setShowAnswer(false);
        setIsFlipped(false);
        onNext();
      }, 600);
    } finally {
      setLoading(false);
    }
  }

  const gradients = [
    "from-blue-600 to-cyan-600",
    "from-purple-600 to-pink-600",
    "from-orange-600 to-red-600",
    "from-green-600 to-emerald-600",
    "from-yellow-600 to-orange-600",
  ];

  const gradientIndex = word.id % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl"
    >
      {/* Main Card */}
      <motion.div
        onClick={() => {
          if (!showAnswer) {
            setIsFlipped(!isFlipped);
            setShowAnswer(true);
          }
        }}
        style={{ perspective: 1000 }}
        className="relative cursor-pointer"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
          className={`relative w-full aspect-video rounded-3xl border border-white/10 backdrop-blur-xl bg-gradient-to-br ${gradient} bg-opacity-5 p-8 md:p-12 overflow-hidden flex flex-col items-center justify-center`}
        >
          {/* Animated background glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 blur-3xl -z-10`} />

          {/* Front Side - Japanese */}
          {!isFlipped && (
            <motion.div
              style={{ backfaceVisibility: "hidden" }}
              className="w-full h-full flex flex-col items-center justify-center z-10"
            >
              <motion.p
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-8xl md:text-9xl font-bold text-foreground text-center leading-tight"
              >
                {word.japanese_kanji ?? word.japanese_hiragana}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-lg text-muted-foreground font-medium"
              >
                {word.japanese_hiragana && word.japanese_kanji ? (
                  <span>
                    Reading: <span className="text-accent">{word.japanese_hiragana}</span>
                  </span>
                ) : null}
              </motion.p>

              {!showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-muted-foreground mb-4">Click or press Space to reveal</p>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20"
                  >
                    <span className="text-lg">␣</span>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Back Side - Answer */}
          {isFlipped && (
            <motion.div
              style={{ backfaceVisibility: "hidden", rotateY: 180 }}
              className="w-full h-full flex flex-col items-center justify-center z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground font-medium mb-4">Meaning</p>
                <p className="text-6xl md:text-7xl font-bold text-foreground">
                  {word.english_meaning}
                </p>
              </motion.div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <p className="text-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {message}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Answer Buttons */}
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <ReviewButtons loading={loading} onRate={handleReview} />
        </motion.div>
      )}
    </motion.div>
  );
}
