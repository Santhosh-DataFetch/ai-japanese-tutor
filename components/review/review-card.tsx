"use client";

import { useState } from "react";
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
    <div className="glass-panel rounded-[32px] p-8 md:p-12 max-w-3xl mx-auto">
      <div className="glass-pill mb-6 inline-flex">Review card</div>
      <p className={`mx-auto text-center text-7xl font-semibold tracking-[-0.04em] text-white transition-all duration-500 ${showAnswer ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
        {word.japanese_kanji ?? word.japanese_hiragana}
      </p>

      {!showAnswer ? (
        <div className="mt-8 flex justify-center">
          <Button onClick={() => setShowAnswer(true)} className="px-6">
            <span className="mr-2">␣</span>
            Reveal Answer
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-8 text-center text-2xl font-semibold text-slate-100">{word.japanese_hiragana}</p>
          <p className="mt-2 text-center text-lg text-sky-300">{word.english_meaning}</p>
          {message && <p className="mt-4 text-center font-semibold text-teal-300">{message}</p>}
          <ReviewButtons loading={loading} onRate={handleReview} />
        </>
      )}
    </div>
  );
}