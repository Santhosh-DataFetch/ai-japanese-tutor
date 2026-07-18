'use client'

import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import SettingsForm from "@/app/settings/settings-form";

interface SettingsContentProps {
  settings: any
}

export default function SettingsContent({ settings }: SettingsContentProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-xl bg-primary/20"
          >
            <Settings className="w-6 h-6 text-primary" />
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        <p className="mt-3 text-muted-foreground font-medium">
          Manage your preferences and learning settings.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <SettingsForm settings={settings} />
      </motion.div>
    </div>
  );
}
