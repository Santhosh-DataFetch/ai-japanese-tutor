'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'

interface Props {
  kanji: string
  meaning: string
  onyomi?: string
  kunyomi?: string
}

export default function AIExplanation({
  kanji,
  meaning,
  onyomi,
  kunyomi,
}: Props) {
  const [loading, setLoading] =
    useState(false)

  const [text, setText] =
    useState('')

  async function explain() {
    setLoading(true)

    const res = await fetch(
      '/api/kanji/explain',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          kanji,
          meaning,
          onyomi,
          kunyomi,
        }),
      }
    )

    if (!res.ok) {
  const text = await res.text()
  console.error(text)
  setText(
  "⚠️ AI is temporarily unavailable.\n\nPlease try again in a few moments."
)

setLoading(false)
return
}

const data = await res.json()
setText(data.explanation)
  }

  return (
    <div className="glass-card rounded-3xl p-8">

      <Button
        onClick={explain}
        disabled={loading}
      >
        {loading
          ? <div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
  <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-150" />
  <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-300" />
  <span>Thinking...</span>
</div>
          : '✨ Explain this Kanji'}
      </Button>

      {text && (
        <div className="prose prose-invert mt-8 max-w-none">
          <ReactMarkdown
  components={{
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mt-6 mb-3">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mt-5 mb-2">
        {children}
      </h2>
    ),
    ul: ({ children }) => (
      <ul className="list-disc ml-6 space-y-2">
        {children}
      </ul>
    ),
    p: ({ children }) => (
      <p className="leading-8">
        {children}
      </p>
    ),
  }}
>
    {text}
</ReactMarkdown>
</div>
      )}

    </div>
  )
}