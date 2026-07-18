import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient()

  const body = await req.json()
  const { kanji } = body

  const rows = kanji.map((k: any) => ({
    kanji: k.kanji,
    meaning: k.meaning,
    onyomi: k.onyomi || null,
    kunyomi: k.kunyomi || null,
    jlpt: k.jlpt || null,
    grade: k.grade ? Number(k.grade) : null,
    stroke_count: k.stroke_count
      ? Number(k.stroke_count)
      : null,
    radical: k.radical || null,
  }))

  const { error } = await supabase
    .from('kanji_dictionary')
    .upsert(rows, {
      onConflict: 'kanji',
    })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    imported: rows.length,
  })
}