"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSettings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  let { data } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    const { data: created } = await supabase
      .from("user_settings")
      .insert({
        user_id: user.id,
      })
      .select()
      .single();

    data = created;
  }

  return data;
}

export async function saveSettings(
  daily_goal: number,
  ai_model: string,
  temperature: number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("user_settings")
    .upsert({
      user_id: user.id,
      daily_goal,
      ai_model,
      temperature,
      updated_at: new Date(),
    });
}