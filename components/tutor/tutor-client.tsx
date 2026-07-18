'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ChatInterface } from '@/components/tutor/chat-interface'
import ChatHistory from '@/components/chat-history'
import { BookOpen, Lightbulb } from 'lucide-react'
import { useState } from 'react'


interface TutorClientProps {
  user: {
    id: string
    email?: string
  }
  sessions: any[]
}

export default function TutorClient({
  user,
  sessions,
}: TutorClientProps) {
  const [currentChatId, setCurrentChatId] =
  useState<string | undefined>(
    sessions[0]?.id
  )

  return (
    <DashboardLayout>
      <motion.div className="flex h-[calc(100vh-5rem)] gap-4">

        {/* Sidebar */}
        <motion.div 
          className="w-72 shrink-0 glass-card rounded-xl border border-border p-4 overflow-y-auto backdrop-blur-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="mb-4 text-lg font-bold">Chats</h2>
          <motion.button
            onClick={() => setCurrentChatId(undefined)}
            className="mb-4 w-full rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-white font-medium smooth-transition shadow-lg shadow-primary/20 hover:shadow-primary/40"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            + New Chat
          </motion.button>
          <ChatHistory
            sessions={sessions}
            currentId={currentChatId}
            onSelect={setCurrentChatId}
          />
        </motion.div>

        {/* Main */}
        <motion.div 
          className="flex-1 flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >

          {/* Header */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Tutor
            </h1>

            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, staggerChildren: 0.1 }}
            >
              <motion.div 
                className="flex items-center gap-2 text-sm text-muted-foreground smooth-transition hover:text-foreground"
                whileHover={{ x: 4 }}
              >
                <Lightbulb className="w-4 h-4 text-yellow-500 animate-float" />
                <span>Personalized learning at your pace</span>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2 text-sm text-muted-foreground smooth-transition hover:text-foreground"
                whileHover={{ x: 4 }}
              >
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Practice conversation anytime</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Chat */}
          <motion.div 
            className="flex-1 glass-card rounded-xl border border-border p-6 overflow-hidden backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{ boxShadow: "0 20px 40px rgba(124, 58, 237, 0.1)" }}
          >
            <ChatInterface
              userId={user.id}
              sessionId={currentChatId}
            />
          </motion.div>

          {/* Tips */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, staggerChildren: 0.1 }}
          >
            <motion.div 
              className="glass-card rounded-lg p-4 backdrop-blur-sm hover:border-primary/30 smooth-transition"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2 }}
            >
              <p className="mb-2 text-sm font-semibold">
                💭 Ask Questions
              </p>

              <p className="text-xs text-muted-foreground">
                Feel free to ask about grammar, vocabulary or pronunciation.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card rounded-lg p-4 backdrop-blur-sm hover:border-accent/30 smooth-transition"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2 }}
            >
              <p className="mb-2 text-sm font-semibold">
                🗣️ Practice Speaking
              </p>

              <p className="text-xs text-muted-foreground">
                Type Japanese and receive instant feedback.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card rounded-lg p-4 backdrop-blur-sm hover:border-primary/30 smooth-transition"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2 }}
            >
              <p className="mb-2 text-sm font-semibold">
                🎯 Track Progress
              </p>

              <p className="text-xs text-muted-foreground">
                Every conversation helps improve your Japanese.
              </p>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </motion.div>
    </DashboardLayout>
  )
}
