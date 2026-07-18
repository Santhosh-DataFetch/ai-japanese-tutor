'use client'

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
      <div className="flex h-[calc(100vh-5rem)] gap-4">

        {/* Sidebar */}
        <div className="w-72 shrink-0 glass-card rounded-xl border border-border p-4 overflow-y-auto">
          <h2 className="mb-4 text-lg font-bold">Chats</h2>
         <button
  onClick={() => setCurrentChatId(undefined)}
  className="mb-4 w-full rounded-lg bg-primary px-4 py-2 text-white"
>
  + New Chat
</button>
          <ChatHistory
            sessions={sessions}
            currentId={currentChatId}
            onSelect={setCurrentChatId}
          />
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              AI Tutor
            </h1>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span>Personalized learning at your pace</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Practice conversation anytime</span>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 glass-card rounded-xl border border-border p-6 overflow-hidden">
            <ChatInterface
  userId={user.id}
  sessionId={currentChatId}
/>
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-lg p-4">
              <p className="mb-1 text-sm font-semibold">
                💭 Ask Questions
              </p>

              <p className="text-xs text-muted-foreground">
                Feel free to ask about grammar, vocabulary or pronunciation.
              </p>
            </div>

            <div className="glass-card rounded-lg p-4">
              <p className="mb-1 text-sm font-semibold">
                🗣️ Practice Speaking
              </p>

              <p className="text-xs text-muted-foreground">
                Type Japanese and receive instant feedback.
              </p>
            </div>

            <div className="glass-card rounded-lg p-4">
              <p className="mb-1 text-sm font-semibold">
                🎯 Track Progress
              </p>

              <p className="text-xs text-muted-foreground">
                Every conversation helps improve your Japanese.
              </p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}