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
      <div className="flex h-[calc(100vh-5rem)] flex-col gap-4 lg:flex-row">
        <div className="w-full shrink-0 rounded-[28px] border border-white/10 bg-white/6 p-4 overflow-y-auto lg:w-72">
          <h2 className="mb-4 text-lg font-semibold text-white">Chats</h2>
          <button onClick={() => setCurrentChatId(undefined)} className="mb-4 w-full rounded-[16px] bg-gradient-to-r from-teal-400/20 to-sky-400/20 px-4 py-2 text-sm font-medium text-white">
            + New Chat
          </button>
          <ChatHistory sessions={sessions} currentId={currentChatId} onSelect={setCurrentChatId} />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="glass-panel rounded-[28px] p-6">
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white">AI Tutor</h1>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row">
              <div className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-amber-300" /><span>Personalized learning at your pace</span></div>
              <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-sky-300" /><span>Practice conversation anytime</span></div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-6">
            <ChatInterface userId={user.id} sessionId={currentChatId} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="glass-card rounded-[24px] p-4">
              <p className="mb-1 text-sm font-semibold text-white">💭 Ask questions</p>
              <p className="text-sm text-slate-400">Ask about grammar, vocabulary, or pronunciation without leaving the flow.</p>
            </div>
            <div className="glass-card rounded-[24px] p-4">
              <p className="mb-1 text-sm font-semibold text-white">🗣️ Practice speaking</p>
              <p className="text-sm text-slate-400">Type Japanese and receive instant feedback in a relaxed setting.</p>
            </div>
            <div className="glass-card rounded-[24px] p-4">
              <p className="mb-1 text-sm font-semibold text-white">🎯 Track progress</p>
              <p className="text-sm text-slate-400">Every conversation helps your Japanese improve over time.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}