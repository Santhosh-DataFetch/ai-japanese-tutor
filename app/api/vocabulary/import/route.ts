import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const body = await req.json()

  const { words } = body

  const rows = words.map((word: any) => ({
    user_id: user.id,
    japanese_hiragana: word.hiragana,
    japanese_kanji: word.kanji || null,
    english_meaning: word.meaning,
    example_sentence:
  word.example?.replace(/<[^>]*>/g, '') || null,
  }))

  const { data, error } = await supabase
  .from('vocabulary')
  .upsert(rows, {
    onConflict: 'user_id,japanese_hiragana',
    ignoreDuplicates: true,
  })
  .select()

if (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  )
}

return NextResponse.json({
  success: true,
  imported: data?.length ?? 0,
  skipped: rows.length - (data?.length ?? 0),
})
}