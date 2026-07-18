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
      <div className="glass-card rounded-2xl p-10 text-center">

        <h2 className="text-3xl font-bold">
          🎉 Nothing to review!
        </h2>

        <p className="mt-4 text-muted-foreground">
          Come back tomorrow.
        </p>

      </div>
    );
  }

  if (index >= words.length) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">

        <h2 className="text-4xl font-bold">
          🎉 Session Complete
        </h2>

        <p className="mt-3 text-muted-foreground">
          Great work today!
        </p>

      </div>
    );
  }

  return (
    <>
      <ReviewProgress
        current={index + 1}
        total={words.length}
      />

      <ReviewCard
        word={words[index]}
        onNext={() =>
          setIndex(index + 1)
        }
      />
    </>
  );
}