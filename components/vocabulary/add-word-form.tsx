'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function AddWordForm() {
  const [kanji, setKanji] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [meaning, setMeaning] = useState('')
  const [example, setExample] = useState('')
  const [jlpt, setJlpt] = useState('N5')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (
      !hiragana.trim() ||
      !meaning.trim()
    ) {
      alert('Please fill all required fields.')
      return
    }

    setLoading(true)

    try {
      // We'll connect this to Supabase next.
      await addVocabulary({
  kanji,
  hiragana,
  meaning,
  example,
})

alert('Word saved successfully!')

      setKanji('')
      setHiragana('')
      setMeaning('')
      setExample('')
      setJlpt('N5')
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold">
        Manual Entry
      </h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Japanese (Kanji)
        </label>

        <input
          value={kanji}
          onChange={(e) =>
            setKanji(e.target.value)
          }
          className="w-full rounded-lg border border-border bg-background p-3"
          placeholder="日本"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Reading (Hiragana) *
        </label>

        <input
          value={hiragana}
          onChange={(e) =>
            setHiragana(e.target.value)
          }
          className="w-full rounded-lg border border-border bg-background p-3"
          placeholder="にほん"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          English Meaning *
        </label>

        <input
          value={meaning}
          onChange={(e) =>
            setMeaning(e.target.value)
          }
          className="w-full rounded-lg border border-border bg-background p-3"
          placeholder="Japan"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Example Sentence
        </label>

        <textarea
          value={example}
          onChange={(e) =>
            setExample(e.target.value)
          }
          rows={3}
          className="w-full rounded-lg border border-border bg-background p-3"
          placeholder="私は日本へ行きたいです。"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          JLPT Level
        </label>

        <select
          value={jlpt}
          onChange={(e) =>
            setJlpt(e.target.value)
          }
          className="w-full rounded-lg border border-border bg-background p-3"
        >
          <option>N5</option>
          <option>N4</option>
          <option>N3</option>
          <option>N2</option>
          <option>N1</option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Saving...' : 'Save Word'}
      </Button>
    </motion.form>
  )
}