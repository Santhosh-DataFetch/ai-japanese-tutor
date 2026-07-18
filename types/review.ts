import type { Vocabulary } from "./index";

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