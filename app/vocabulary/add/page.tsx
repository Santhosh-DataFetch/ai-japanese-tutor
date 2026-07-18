'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AddWordForm } from '@/components/vocabulary/add-word-form'
import { ImportCard } from '@/components/vocabulary/import-card'
import { motion } from 'framer-motion'

export default function AddVocabularyPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 py-4 md:py-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[32px] p-8 md:p-10">
          <div className="glass-pill mb-4">Vocabulary import</div>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Add vocabulary</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Add words manually or bring over an existing deck without changing the workflow.</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <AddWordForm />
          <ImportCard />
        </div>
      </div>
    </DashboardLayout>
  )
}