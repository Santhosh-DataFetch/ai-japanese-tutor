/* eslint-disable no-undef */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashcardProps {
  japanese: string
  kanji?: string
  english: string
  example?: string
  onReviewQuality: (quality: number) => void
}

export function Flashcard({
  japanese,
  kanji,
  english,
  example,
  onReviewQuality,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const speakJapanese = () => {
    const utterance = new SpeechSynthesisUtterance(japanese)
    utterance.lang = 'ja-JP'
    window.speechSynthesis.speak(utterance)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full space-y-6"
    >
      {/* Card */}
      <motion.div
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
        style={{ perspective: '1000px' }}
        className="h-64 glass-card p-8 rounded-xl cursor-pointer flex items-center justify-center backdrop-blur-xl border border-white/10 group smooth-transition hover:shadow-lg hover:shadow-accent/20"
        whileHover={{ y: -4 }}
      >
        <div className="text-center">
          {!isFlipped ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Translate from English</p>
                <p className="text-4xl font-bold text-primary">{english}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speakJapanese()
                }}
                className="mx-auto p-2 hover:bg-primary/20 rounded-lg transition"
              >
                <Volume2 className="w-6 h-6 text-accent" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Japanese</p>
                <p className="text-3xl font-bold text-accent">{japanese}</p>
                {kanji && <p className="text-2xl text-primary mt-2">{kanji}</p>}
              </div>
              {example && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Example</p>
                  <p className="text-sm text-foreground italic">{example}</p>
                </div>
              )}
            </div>
          )}

          <motion.div animate={{ y: isFlipped ? 0 : 8 }} className="mt-6">
            <ChevronDown className="w-5 h-5 text-muted-foreground mx-auto opacity-50" />
          </motion.div>
        </div>
      </motion.div>

      {/* Review Buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-2 md:gap-3"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onReviewQuality(0)}
              variant="outline"
              className="w-full text-destructive hover:bg-destructive/10 border-destructive/30 smooth-transition"
            >
              Forgot
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onReviewQuality(2)}
              variant="outline"
              className="w-full text-yellow-500 hover:bg-yellow-500/10 border-yellow-500/30 smooth-transition"
            >
              Hard
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onReviewQuality(3)}
              variant="outline"
              className="w-full text-blue-500 hover:bg-blue-500/10 border-blue-500/30 smooth-transition"
            >
              Good
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="col-span-3">
            <Button
              onClick={() => onReviewQuality(4)}
              className="w-full col-span-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold smooth-transition shadow-lg shadow-green-600/20 hover:shadow-green-600/40"
            >
              ✨ Easy - Got it!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
