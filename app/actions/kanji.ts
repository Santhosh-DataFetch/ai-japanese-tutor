'use server'

import { createClient } from '@/lib/supabase/server'

export async function getKanji(limit = 100) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('kanji_dictionary')
    .select('*')
    .limit(limit)

  console.log('KANJI:', data?.length)
  console.log(data?.[0])

  if (error) throw error

  return data ?? []
}export async function getKanjiByCharacter(
  character: string
) {
  const supabase = await createClient()
  console.log('Character:', character)
 const { data, error } = await supabase
  .from('kanji_dictionary')
  .select('*')
  .eq('kanji', character)
  .maybeSingle()

  if (error) throw error

if (!data) {
  throw new Error(
    `Kanji "${character}" not found`
  )
}

return data
}

