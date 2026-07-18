import { getKanjiByCharacter } from '@/app/actions/kanji'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { getVocabularyByKanji } from '@/app/actions/vocabulary'
import AIExplanation from '@/components/kanji/ai-explanation'
import { Sparkles } from 'lucide-react'

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
  const data = await getKanjiByCharacter(decodedKanji)
  const vocabulary = await getVocabularyByKanji(decodedKanji)

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 py-4 md:py-6">
        <div className="glass-panel rounded-[32px] p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col items-start">
              <div className="glass-pill mb-4">Character study</div>
              <div className="text-8xl font-semibold tracking-[-0.04em] text-white md:text-9xl">{data.kanji}</div>
              <div className="mt-6 flex flex-wrap gap-3">
                {data.jlpt && <span className="rounded-full border border-white/10 bg-white/8 px-4 py-1 text-sm text-slate-200">{data.jlpt}</span>}
                {data.grade && <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-1 text-sm text-teal-200">Grade {data.grade}</span>}
              </div>
            </div>
            <div className="glass-sm max-w-xl rounded-[24px] p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Meaning</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{data.meaning}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">A deep, premium reading experience designed to keep the focus on the character itself.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Readings</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-sm text-slate-400">On reading</p>
                <p className="mt-3 text-2xl font-semibold text-sky-300">{data.onyomi || '—'}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-sm text-slate-400">Kun reading</p>
                <p className="mt-3 text-2xl font-semibold text-teal-300">{data.kunyomi || '—'}</p>
              </div>
            </div>
          </div>
          <div className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Character details</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-sm text-slate-400">Strokes</p>
                <p className="mt-3 text-3xl font-semibold text-white">{data.stroke_count ?? '—'}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-sm text-slate-400">Grade</p>
                <p className="mt-3 text-3xl font-semibold text-white">{data.grade ?? '—'}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-sm text-slate-400">Frequency</p>
                <p className="mt-3 text-3xl font-semibold text-white">{data.frequency ?? '—'}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-sm text-slate-400">JLPT</p>
                <p className="mt-3 text-3xl font-semibold text-white">{data.jlpt ?? '—'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-8">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-teal-300" />
            <h2 className="text-2xl font-semibold text-white">Related vocabulary</h2>
          </div>
          <AIExplanation kanji={data.kanji} meaning={data.meaning} onyomi={data.onyomi} kunyomi={data.kunyomi} />
          <p className="mt-6 text-sm text-slate-400">Vocabulary found: {vocabulary.length}</p>
          {vocabulary.length === 0 ? (
            <p className="mt-4 text-slate-300">No vocabulary found.</p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {vocabulary.map((word: any) => (
                <div key={word.id} className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                  <p className="text-3xl font-semibold text-white">{word.japanese_kanji ?? word.japanese_hiragana}</p>
                  <p className="mt-2 text-sky-300">{word.japanese_hiragana}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{word.english_meaning}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}