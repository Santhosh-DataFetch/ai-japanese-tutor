'use server'

import { createClient } from '@/lib/supabase/server'

export async function getChatSessions() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  return data ?? []
}

export async function createChatSession(title = 'New Chat') {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      user_id: user.id,
      title,
    })
    .select()
    .single()

  if (error) throw error

  return data
}

export async function saveMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      role,
      content,
    })

  if (error) throw error
}

export async function getMessages(sessionId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .order('created_at')

  return (
    data?.map((m) => ({
      role: m.role,
      text: m.content,
    })) ?? []
  )
}