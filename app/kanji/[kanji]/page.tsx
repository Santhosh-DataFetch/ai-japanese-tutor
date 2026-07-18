import { getKanjiByCharacter } from '@/app/actions/kanji'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { getVocabularyByKanji } from '@/app/actions/vocabulary'
import AIExplanation from '@/components/kanji/ai-explanation'

interface Props {
  params: Promise<{
    kanji: string
  }>
}

export default async function KanjiDetailPage({
  params,
}: Props) {
  const { kanji } = await params

const decodedKanji = decodeURIComponent(kanji)

const data =
  await getKanjiByCharacter(decodedKanji)

const vocabulary =
  await getVocabularyByKanji(decodedKanji)
  console.log("PAGE:", vocabulary)
console.log("PAGE LENGTH:", vocabulary.length)

  return (
  <DashboardLayout>
    <div className="mx-auto max-w-6xl p-8 space-y-8">

      <div className="glass-card rounded-3xl p-10">

        <div className="flex flex-col md:flex-row gap-10">

          <div className="flex flex-col items-center justify-center">

            <div className="text-8xl md:text-9xl font-bold">
              {data.kanji}
            </div>

            <div className="mt-6 flex gap-3">

              {data.jlpt && (
                <span className="rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold">
                  {data.jlpt}
                </span>
              )}

              {data.grade && (
                <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
                  Grade {data.grade}
                </span>
              )}

            </div>

          </div>

          <div className="flex-1 space-y-8">

            <div>

              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Meaning
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {data.meaning}
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="glass-card rounded-xl p-5">

                <p className="text-xs uppercase text-muted-foreground">
                  On Reading
                </p>

                <p className="mt-2 text-2xl text-primary">
                  {data.onyomi || '—'}
                </p>

              </div>

              <div className="glass-card rounded-xl p-5">

                <p className="text-xs uppercase text-muted-foreground">
                  Kun Reading
                </p>

                <p className="mt-2 text-2xl text-primary">
                  {data.kunyomi || '—'}
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              <div className="glass-card rounded-xl p-5">

                <p className="text-xs text-muted-foreground">
                  Strokes
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {data.stroke_count}
                </p>

              </div>

              <div className="glass-card rounded-xl p-5">

                <p className="text-xs text-muted-foreground">
                  Frequency
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {data.frequency ?? '—'}
                </p>

              </div>

              <div className="glass-card rounded-xl p-5">

                <p className="text-xs text-muted-foreground">
                  JLPT
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {data.jlpt ?? '—'}
                </p>

              </div>

              <div className="glass-card rounded-xl p-5">

                <p className="text-xs text-muted-foreground">
                  Grade
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {data.grade ?? '—'}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
    <div className="glass-card rounded-3xl p-8 mt-8">

  <h2 className="text-3xl font-bold mb-6">
    Related Vocabulary
  </h2>
  <AIExplanation
  kanji={data.kanji}
  meaning={data.meaning}
  onyomi={data.onyomi}
  kunyomi={data.kunyomi}
/>
  <p className="text-red-500">
  Vocabulary found: {vocabulary.length}
</p>
  {vocabulary.length === 0 ? (

    <p className="text-muted-foreground">
      No vocabulary found.
    </p>

  ) : (

    <div className="grid md:grid-cols-2 gap-5">

      {vocabulary.map((word: any) => (

        <div
          key={word.id}
          className="rounded-xl border border-border p-5"
        >

          <p className="text-3xl font-bold">
            {word.japanese_kanji ??
              word.japanese_hiragana}
          </p>

          <p className="mt-2 text-primary">
            {word.japanese_hiragana}
          </p>

          <p className="mt-3">
            {word.english_meaning}
          </p>

        </div>

      ))}

    </div>

  )}

</div>
  </DashboardLayout>
)
}