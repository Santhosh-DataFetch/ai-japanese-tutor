"use server";

import { createClient } from "@/lib/supabase/server";
import { getProfile } from "./profile";

export async function getStatistics() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await getProfile();

  const [
    { count: vocabulary },
    { count: kanji },
    { count: reviewed },
    { count: due },
  ] = await Promise.all([
    supabase
      .from("vocabulary")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id),

    supabase
      .from("kanji_dictionary")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("vocabulary")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .gt("times_reviewed", 0),

    supabase
      .from("vocabulary")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("unlocked", true)
      .lte(
        "next_review_date",
        new Date().toISOString()
      ),
  ]);

  return {
    xp: profile?.total_xp ?? 0,
    streak: profile?.streak_count ?? 0,
    vocabulary: vocabulary ?? 0,
    kanji: kanji ?? 0,
    reviewed: reviewed ?? 0,
    due: due ?? 0,
  };
}