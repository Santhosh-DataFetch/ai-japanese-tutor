import type { Vocabulary } from "./vocabulary";

export interface ReviewSessionProps {
  words: Vocabulary[];
}

export interface ReviewCardProps {
  word: Vocabulary;
  onNext: () => void;
}

export type ReviewRating =
  | "Again"
  | "Hard"
  | "Good"
  | "Easy";