"use server";

import { createClient } from "@/lib/supabase/server";
import { getProfile } from "./profile";

type ReviewRating =
  | "Again"
  | "Hard"
  | "Good"
  | "Easy";

export async function reviewWord(
  wordId: string,
  rating: ReviewRating
) {
  const supabase = await createClient();

  const { data: word, error } = await supabase
    .from("vocabulary")
    .select("*")
    .eq("id", wordId)
    .single();

  if (error) throw error;

  const now = new Date();

  let days = 1;
  let xp = 5;
  let stability = word.stability ?? 0;
  let difficulty = word.difficulty ?? 5;

  switch (rating) {
    case "Again":
      days = 0;
      xp = 2;
      stability = Math.max(0, stability - 0.5);
      difficulty += 0.3;
      break;

    case "Hard":
      days = 1;
      xp = 5;
      stability += 0.3;
      difficulty += 0.1;
      break;

    case "Good":
      days = 3;
      xp = 10;
      stability += 1;
      difficulty = Math.max(1, difficulty - 0.1);
      break;

    case "Easy":
      days = 7;
      xp = 15;
      stability += 2;
      difficulty = Math.max(1, difficulty - 0.3);
      break;
  }

  const nextReview = new Date(now);

  if (days === 0) {
    nextReview.setMinutes(nextReview.getMinutes() + 10);
  } else {
    nextReview.setDate(nextReview.getDate() + days);
  }

  const { error: updateError } = await supabase
    .from("vocabulary")
    .update({
      stability,
      difficulty,
      interval: days,
      elapsed_days: days,
      scheduled_days: days,
      last_review: now.toISOString(),
      next_review_date: nextReview.toISOString(),
      times_reviewed:
        (word.times_reviewed ?? 0) + 1,
    })
    .eq("id", wordId);

  if (updateError) throw updateError;

  const profile = await getProfile();

  if (profile) {
  const today = new Date()
  .toISOString()
  .split("T")[0];

const lastDate = profile.current_streak_date
  ? new Date(profile.current_streak_date)
      .toISOString()
      .split("T")[0]
  : null;

let streak = profile.streak_count ?? 0;

if (lastDate !== today) {
  streak++;
}

  await supabase
    .from("profiles")
    .update({
      total_xp:
        (profile.total_xp ?? 0) + xp,

      streak_count: streak,

      current_streak_date: today,
    })
    .eq("id", profile.id);
}
    

  return {
    success: true,
  };
}