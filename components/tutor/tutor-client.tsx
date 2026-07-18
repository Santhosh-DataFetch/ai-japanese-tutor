'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ChatInterface } from '@/components/tutor/chat-interface'
import ChatHistory from '@/components/chat-history'
import { BookOpen, Lightbulb, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { GlassCard, GlassPanel, PageHeader, PremiumButton, SectionTitle } from '@/components/ui/design-system'

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
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(sessions[0]?.id)

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-5rem)] flex-col gap-5 lg:flex-row">
        <GlassCard className="w-full shrink-0 overflow-hidden p-4 lg:w-80">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle eyebrow="Sessions" title="Chats" />
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-teal-300">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>

          <PremiumButton className="mt-4 w-full justify-center rounded-[18px]" onClick={() => setCurrentChatId(undefined)}>
            + New Chat
          </PremiumButton>

          <div className="mt-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
            <ChatHistory sessions={sessions} currentId={currentChatId} onSelect={setCurrentChatId} />
          </div>
        </GlassCard>

        <div className="flex flex-1 flex-col gap-5">
          <PageHeader
            eyebrow="AI tutor"
            title="Your calm study companion"
            description="Personalized learning at your pace, with a more focused conversational workspace."
          />

          <GlassPanel className="flex-1 overflow-hidden p-0">
            <div className="flex h-full flex-col">
              <div className="border-b border-white/10 bg-white/6 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-amber-300" /><span>Personalized learning at your pace</span></div>
                  <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-sky-300" /><span>Practice conversation anytime</span></div>
                </div>
              </div>

              <div className="flex-1 p-4 sm:p-6">
                <ChatInterface userId={user.id} sessionId={currentChatId} />
              </div>
            </div>
          </GlassPanel>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <GlassCard className="p-4">
              <p className="mb-1 text-sm font-semibold text-white">💭 Ask questions</p>
              <p className="text-sm text-slate-400">Ask about grammar, vocabulary, or pronunciation without leaving the flow.</p>
            </GlassCard>
            <GlassCard className="p-4">
              <p className="mb-1 text-sm font-semibold text-white">🗣️ Practice speaking</p>
              <p className="text-sm text-slate-400">Type Japanese and receive instant feedback in a relaxed setting.</p>
            </GlassCard>
            <GlassCard className="p-4">
              <p className="mb-1 text-sm font-semibold text-white">🎯 Track progress</p>
              <p className="text-sm text-slate-400">Every conversation helps your Japanese improve over time.</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}