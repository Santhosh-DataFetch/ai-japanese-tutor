'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { addVocabulary } from '@/app/actions/vocabulary'

export function AddWordForm() {
  const [kanji, setKanji] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [meaning, setMeaning] = useState('')
  const [example, setExample] = useState('')
  const [jlpt, setJlpt] = useState('N5')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!hiragana.trim() || !meaning.trim()) {
      alert('Please fill all required fields.')
      return
    }

    setLoading(true)

    try {
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
      className="glass-card rounded-[28px] p-6 space-y-5"
    >
      <div>
        <h2 className="text-2xl font-semibold text-white">Manual entry</h2>
        <p className="mt-2 text-sm text-slate-400">Capture a new word with a calm, focused form that stays out of your way.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Japanese (Kanji)</label>
        <input value={kanji} onChange={(e) => setKanji(e.target.value)} className="glass-input" placeholder="日本" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Reading (Hiragana) *</label>
        <input value={hiragana} onChange={(e) => setHiragana(e.target.value)} className="glass-input" placeholder="にほん" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">English Meaning *</label>
        <input value={meaning} onChange={(e) => setMeaning(e.target.value)} className="glass-input" placeholder="Japan" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Example Sentence</label>
        <textarea value={example} onChange={(e) => setExample(e.target.value)} rows={3} className="glass-input min-h-24 resize-none" placeholder="私は日本へ行きたいです。" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">JLPT Level</label>
        <select value={jlpt} onChange={(e) => setJlpt(e.target.value)} className="glass-input">
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>
      </div>

      <Button type="submit" disabled={loading} className="w-full justify-center">
        {loading ? 'Saving...' : 'Save Word'}
      </Button>
    </motion.form>
  )
}