'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Loader,
  Send,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  createChatSession,
  saveMessage,
} from '@/app/actions/chat'
import { getMessages } from '@/app/actions/chat'

interface ChatInterfaceProps {
  userId: string
  sessionId?: string
}

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export function ChatInterface({
  userId,
  sessionId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeSessionId, setActiveSessionId] = useState(sessionId)
  const router = useRouter()
  const chatRef = useRef<HTMLDivElement>(null)
const [showScrollButton, setShowScrollButton] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
  setActiveSessionId(sessionId)
}, [sessionId])



   useEffect(() => {
  async function loadMessages() {
    if (!activeSessionId) {
      setMessages([])
      return
    }

    const msgs = await getMessages(activeSessionId)
    setMessages(msgs)
   setTimeout(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "auto",
  })
}, 50)
    
  }

  loadMessages()
}, [activeSessionId])

  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    function handleScroll() {
      const distance = (container?.scrollHeight ?? 0) - (container?.scrollTop ?? 0) - (container?.clientHeight ?? 0)
      setShowScrollButton(distance > 200)
    }

    container.addEventListener('scroll', handleScroll)

    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (!input.trim() || loading) return

    setError('')

    const userMessage: Message = {
      role: 'user',
      text: input,
    }

    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setTimeout(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  })
}, 50)
    setInput('')
    setLoading(true)

    try {
      let currentSessionId = activeSessionId

      if (!currentSessionId) {
        const session = await createChatSession(input.slice(0, 40))

        if (!session) {
          throw new Error('Could not create chat')
        }

        currentSessionId = session.id
        setActiveSessionId(currentSessionId)
        router.refresh()
      }

      if (!currentSessionId) {
        throw new Error('Chat session unavailable')
      }

      await saveMessage(currentSessionId, 'user', input)

  const response = await fetch('/api/chat',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
const assistantMessage: Message = {
  role: 'assistant',
  text: data.message,
}

setMessages([
  ...updatedMessages,
  assistantMessage,
])





      await saveMessage(currentSessionId, 'assistant', data.message)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div ref={chatRef} className="flex-1 overflow-y-auto space-y-4 pr-2 relative">

        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center h-full"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to L Tutor
              </h2>

              <p className="text-muted-foreground max-w-md">
                Start chatting in Japanese or ask anything about
                grammar, vocabulary, pronunciation or culture.
              </p>
            </div>
          </motion.div>
        )}

        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{
  opacity: 0,
  y: 15,
}}
animate={{
  opacity: 1,
  y: 0,
}}
transition={{
  duration: 0.35,
  ease: 'easeOut',
}}
            className={`flex ${
              message.role === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] rounded-[20px] px-4 py-3 whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-teal-400/20 to-sky-400/20 text-white'
                  : 'border border-white/10 bg-white/8 text-slate-200'
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3">
              <Loader className="h-4 w-4 animate-spin text-teal-300" />
            </div>
          </div>
        )}
        

{showScrollButton && (
  <button
    onClick={() =>
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="
      absolute
      bottom-36
      right-10
      z-50
      h-12
      w-12
      rounded-full
      bg-primary
      text-white
      shadow-lg
      hover:scale-110
      transition
    "
  >
    <ChevronDown className="h-5 w-5" />
  </button>
)}


        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={onSubmit} className="flex gap-3 border-t border-white/10 pt-4">

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Ask anything about Japanese..."
          className="flex-1 rounded-[18px] border border-white/10 bg-white/8 px-5 py-3 text-white outline-none placeholder:text-slate-400 focus:border-teal-400/30 focus:ring-2 focus:ring-teal-400/20"
        />

        <Button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-[18px] px-6"
        >
          {loading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}