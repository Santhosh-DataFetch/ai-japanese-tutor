import fs from 'fs'
import { XMLParser } from 'fast-xml-parser'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
})

console.log('📖 Reading kanjidic2.xml...')

const xml = fs.readFileSync(
  './kanjidic2.xml',
  'utf8'
)

const json = parser.parse(xml)

console.log('✅ XML Loaded')

const characters = json.kanjidic2.character

console.log(`Found ${characters.length} kanji`)

const rows = characters.map((c: any) => {
  const readings = c.reading_meaning?.rmgroup?.reading ?? []

  const readingArray = Array.isArray(readings)
    ? readings
    : [readings]

  const meanings = c.reading_meaning?.rmgroup?.meaning ?? []

  const meaningArray = Array.isArray(meanings)
    ? meanings
    : [meanings]

  const onyomi = readingArray
    .filter((r: any) => r.r_type === 'ja_on')
    .map((r: any) => r['#text'])
    .join(', ')

  const kunyomi = readingArray
    .filter((r: any) => r.r_type === 'ja_kun')
    .map((r: any) => r['#text'])
    .join(', ')

  const englishMeaning = meaningArray
    .filter((m: any) => typeof m === 'string')
    .join(', ')

  return {
    kanji: c.literal,
    meaning: englishMeaning,
    onyomi,
    kunyomi,
    jlpt: Array.isArray(c.misc?.jlpt)
  ? `N${c.misc.jlpt[0]}`
  : c.misc?.jlpt
    ? `N${c.misc.jlpt}`
    : null,
    grade: Array.isArray(c.misc?.grade)
  ? c.misc.grade[0]
  : c.misc?.grade ?? null,
    stroke_count: Array.isArray(c.misc?.stroke_count)
  ? c.misc.stroke_count[0]
  : c.misc?.stroke_count ?? null,
    frequency: c.misc?.freq ?? null,
    radical: null,
    unicode_value: null,
    examples: null,
  }
})
async function main() {
  const batchSize = 500

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)

    console.log(
      `Uploading batch ${
        Math.floor(i / batchSize) + 1
      } / ${Math.ceil(rows.length / batchSize)}`
    )

    const { error } = await supabase
      .from('kanji_dictionary')
      .upsert(batch, {
        onConflict: 'kanji',
      })

    if (error) {
      console.error(error)
      process.exit(1)
    }
  }

  console.log('🎉 Import completed!')
}

main().catch(console.error)