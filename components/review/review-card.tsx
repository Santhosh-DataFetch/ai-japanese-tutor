"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReviewButtons from "./review-buttons";
import type { Vocabulary } from "@/types";
import { reviewWord } from "@/app/actions/review";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";


interface Props {
  word: Vocabulary;
  onNext: () => void;
}

export default function ReviewCard({
  word,
  onNext,
}: Props) {
    const [message, setMessage] = useState("");
    
  const [showAnswer, setShowAnswer] =
  useState(false);

const [loading, setLoading] =
  useState(false);

  useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (loading) return;

    // Space = reveal answer
    if (e.code === "Space" && !showAnswer) {
      e.preventDefault();
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

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
}, [showAnswer, loading]);

  async function handleReview(
  rating: "Again" | "Hard" | "Good" | "Easy"
) {
  setLoading(true);

  try {

    switch (rating) {
  case "Again":
    setMessage("+2 XP • Review again soon");
    break;
  case "Hard":
    setMessage("+5 XP");
    break;
  case "Good":
    setMessage("+10 XP");
    break;
  case "Easy":
    setMessage("+15 XP 🔥");
    break;
}
    await reviewWord(word.id, rating);

    setShowAnswer(false);

    setTimeout(() => {
  setMessage("");
  setShowAnswer(false);
  onNext();
}, 700);

  } finally {
    setLoading(false);
  }
}
  return (
    <motion.div 
      className="glass-card rounded-3xl p-12 max-w-3xl mx-auto backdrop-blur-xl border border-white/10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ boxShadow: "0 20px 40px rgba(124, 58, 237, 0.1)" }}
    >
      <motion.p
        className={`mx-auto text-center text-7xl font-bold transition-all duration-500 ${
          showAnswer ? "scale-95 opacity-70" : "scale-100 opacity-100"
        }`}
        key={`${word.id}-main`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {word.japanese_kanji ?? word.japanese_hiragana}
      </motion.p>

      {!showAnswer ? (
        <motion.div
          className="mt-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-muted-foreground text-sm font-medium mb-4">Press Space or click to reveal</p>
          <Button
            onClick={() => setShowAnswer(true)}
            size="lg"
            className="smooth-transition hover:shadow-lg hover:shadow-primary/20"
          >
            ␣ Reveal Answer
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 mt-8"
        >
          <motion.p 
            className="text-center text-2xl font-semibold text-accent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {word.japanese_hiragana}
          </motion.p>

          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-lg text-foreground">Meaning</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {word.english_meaning}
            </p>
          </motion.div>

          {message && (
            <motion.p 
              className="mt-4 text-center font-semibold text-green-400 text-base"
              key={message}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✨ {message}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ReviewButtons
              loading={loading}
              onRate={handleReview}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
