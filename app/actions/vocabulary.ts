'use server'

import { createClient } from '@/lib/supabase/server'

export async function addVocabulary({
  kanji,
  hiragana,
  meaning,
  example,
}: {
  kanji: string
  hiragana: string
  meaning: string
  example: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
  .from("vocabulary")
  .select("*")
  .eq("user_id", user!.id)
  .like("japanese_kanji", `%${kanji}%`)
  .limit(20)

  if (error) throw error

  return {
    success: true,
  }
}

export async function getVocabulary() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', {
      ascending: false,
    })

  if (error) throw error

  return data
}

export async function getVocabularyByKanji(
  kanji: string
) {
  const supabase = await createClient()
  const {
  data: { user },
} = await supabase.auth.getUser()

console.log("Logged in user:", user?.id)

  console.log("Searching for:", kanji)


  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
    .like("japanese_kanji", `%${kanji}%`)
    .limit(20)

  console.log("Result:", data)
  console.log("Error:", error)

  if (error) throw error

  return data ?? []
}
export async function getDueVocabulary() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("vocabulary")
    .select("*")
.eq("user_id", user.id)
.eq("unlocked", true)
.lte("next_review_date", now)
.order("next_review_date", {
  ascending: true,
})
.limit(20);
  

  if (error) throw error;

  return data ?? [];
}