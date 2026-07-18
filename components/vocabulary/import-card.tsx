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
  setStatus("Uploading...")
  setProgress(70)

  const response = await fetch(
    "/api/vocabulary/import",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ words }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error)
  }

  setStatus("Completed!")
  setProgress(100)

  return data
}

async function importCsv(file: File) {
  setStatus("Reading CSV...")
  setProgress(20)

  return new Promise<void>((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
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
  setStatus("Reading Anki TXT...")
  setProgress(20)

  const text = await file.text()

  const words = text
    .split("\n")
    .filter(line => line.startsWith("Core"))
    .map(line => {
      const cols = line.split("\t")

      return {
        kanji: cols[3] ?? "",
        hiragana: cols[5] ?? "",
        meaning: cols[6] ?? "",
        example: cols[10] ?? "",
      }
    })

  const data = await uploadWords(words)

  alert(
  `Imported ${data.imported} cards\nSkipped ${data.skipped} duplicates`
)
  setFile(null)
}




  async function handleImport() {
  if (!file) return

  setLoading(true)

  try {
    if (file.name.endsWith(".csv")) {
      await importCsv(file)
    } else if (file.name.endsWith(".txt")) {
      await importTxt(file)
    } else {
      alert("APKG support coming soon.")
    }
  } catch (err: any) {
    console.error(err)
    alert(err.message)
  } finally {
    setTimeout(() => {
      setLoading(false)
      setProgress(0)
      setStatus("")
    }, 1000)
  }
}

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-xl p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">
          Import Vocabulary
        </h2>

        <p className="text-sm text-muted-foreground mt-2">
          Import CSV or Anki decks.
        </p>
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="
          w-full
          rounded-xl
          border-2
          border-dashed
          border-border
          p-10
          transition
          hover:border-primary
        "
      >
        <Upload className="mx-auto h-10 w-10 mb-4" />

        <p className="font-semibold">
          Click to choose a file
        </p>

        <p className="text-sm text-muted-foreground mt-2">
          Supports .csv, .txt (Anki Export) and .apkg
        </p>
      </button>

      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept=".csv,.apkg,.txt"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ?? null
          )
        }
      />

      {file && (
        <div className="rounded-lg border border-border p-4 flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />

          <div className="flex-1">
            <p className="font-medium">
              {file.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      )}

      <Button
        onClick={handleImport}
        disabled={!file || loading}
        className="w-full"
      >
        <Database className="mr-2 h-4 w-4" />

        {loading
          ? 'Importing...'
          : 'Import'}
      </Button>
      {loading && (
  <div className="mt-4 space-y-2">
    <p className="text-sm font-medium">
      {status}
    </p>

    <div className="h-2 w-full rounded bg-muted overflow-hidden">
      <div
        className="h-2 rounded bg-primary transition-all duration-300"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>

    <p className="text-xs text-muted-foreground">
      {progress}%
    </p>
  </div>
)}

      <div className="rounded-lg bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">
          Supported Formats
        </p>

        <ul className="list-disc ml-5 text-muted-foreground">
          <li>CSV</li>
          <li>Anki (.apkg)</li>
        </ul>
      </div>
    </motion.div>
  )
}