'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AddWordForm } from '@/components/vocabulary/add-word-form'
import { ImportCard } from '@/components/vocabulary/import-card'
import { motion } from 'framer-motion'

export default function AddVocabularyPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8 p-8">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold">
            Add Vocabulary
          </h1>

          <p className="mt-2 text-muted-foreground">
            Add words manually or import an existing deck.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">

          <AddWordForm />

          <ImportCard />

        </div>

      </div>
    </DashboardLayout>
  )
}