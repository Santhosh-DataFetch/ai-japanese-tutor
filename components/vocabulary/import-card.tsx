'use client'

import { useRef, useState } from 'react'
import { Upload, FileText, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Papa from 'papaparse'

export function ImportCard() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')

  async function uploadWords(words: any[]) {
    setStatus('Uploading...')
    setProgress(70)

    const response = await fetch('/api/vocabulary/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ words }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    setStatus('Completed!')
    setProgress(100)
    return data
  }

  async function importCsv(file: File) {
    setStatus('Reading CSV...')
    setProgress(20)

    return new Promise<void>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results: any) => {
          try {
            const data = await uploadWords(results.data as any[])
            alert(`Imported ${data.imported} words\nSkipped ${data.skipped} duplicates`)
            setFile(null)
            resolve()
          } catch (err) {
            reject(err)
          }
        },
        error: reject,
      })
    })
  }

  async function importTxt(file: File) {
    setStatus('Reading Anki TXT...')
    setProgress(20)

    const text = await file.text()
    const words = text
      .split('\n')
      .filter((line) => line.startsWith('Core'))
      .map((line) => {
        const cols = line.split('\t')
        return {
          kanji: cols[3] ?? '',
          hiragana: cols[5] ?? '',
          meaning: cols[6] ?? '',
          example: cols[10] ?? '',
        }
      })

    const data = await uploadWords(words)
    alert(`Imported ${data.imported} cards\nSkipped ${data.skipped} duplicates`)
    setFile(null)
  }

  async function handleImport() {
    if (!file) return

    setLoading(true)

    try {
      if (file.name.endsWith('.csv')) {
        await importCsv(file)
      } else if (file.name.endsWith('.txt')) {
        await importTxt(file)
      } else {
        alert('APKG support coming soon.')
      }
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    } finally {
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
        setStatus('')
      }, 1000)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-[28px] p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Import vocabulary</h2>
        <p className="mt-2 text-sm text-slate-400">Import CSV or Anki decks into your learning library.</p>
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full rounded-[24px] border border-dashed border-white/15 bg-white/6 p-10 text-center transition hover:border-teal-400/35"
      >
        <Upload className="mx-auto mb-4 h-10 w-10 text-teal-300" />
        <p className="font-semibold text-white">Click to choose a file</p>
        <p className="mt-2 text-sm text-slate-400">Supports .csv, .txt (Anki Export), and .apkg</p>
      </button>

      <input ref={fileInputRef} hidden type="file" accept=".csv,.apkg,.txt" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />

      {file && (
        <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/8 p-4">
          <FileText className="h-6 w-6 text-sky-300" />
          <div className="flex-1">
            <p className="font-medium text-white">{file.name}</p>
            <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}

      <Button onClick={handleImport} disabled={!file || loading} className="w-full justify-center">
        <Database className="mr-2 h-4 w-4" />
        {loading ? 'Importing...' : 'Import'}
      </Button>

      {loading && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-300">{status}</p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400">{progress}%</p>
        </div>
      )}

      <div className="rounded-[20px] border border-white/10 bg-white/8 p-4 text-sm">
        <p className="font-semibold text-white">Supported formats</p>
        <ul className="ml-5 mt-2 list-disc space-y-1 text-slate-400">
          <li>CSV</li>
          <li>Anki (.apkg)</li>
        </ul>
      </div>
    </motion.div>
  )
}