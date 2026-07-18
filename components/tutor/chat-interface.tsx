'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader, Send, ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createChatSession, saveMessage, getMessages } from '@/app/actions/chat'

interface ChatInterfaceProps {
  userId: string
  sessionId?: string
}

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export function ChatInterface({ userId, sessionId }: ChatInterfaceProps) {
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
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
      }, 50)
    }
    loadMessages()
  }, [activeSessionId])

  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    function handleScroll() {
      const distance = container.scrollHeight - container.scrollTop - container.clientHeight
      setShowScrollButton(distance > 200)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input.trim() || loading) return

    setError('')
    const userMessage: Message = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      let currentSessionId = activeSessionId

      if (!currentSessionId) {
        const session = await createChatSession(userId)
        currentSessionId = session.id
        setActiveSessionId(currentSessionId)
      }

      await saveMessage(currentSessionId, 'user', input)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: currentSessionId, message: input }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      const assistantMessage: Message = { role: 'assistant', text: data.message }
      setMessages((prev) => [...prev, assistantMessage])
      await saveMessage(currentSessionId, 'assistant', data.message)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full flex-col'>
      {/* Messages Container */}
      <div
        ref={chatRef}
        className='flex-1 space-y-4 overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent'
      >
        <AnimatePresence mode='wait'>
          {messages.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className='flex h-full flex-col items-center justify-center space-y-4 text-center'
            >
              <div className='p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20'>
                <Sparkles className='w-8 h-8 text-accent' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-foreground'>Start a conversation</h3>
                <p className='mt-2 text-sm text-muted-foreground'>Ask about grammar, vocabulary, or practice your conversation skills</p>
              </div>
            </motion.div>
          ) : (
            <div className='space-y-4'>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-primary to-accent text-white rounded-br-none'
                        : 'bg-white/10 border border-white/20 text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className='text-sm leading-relaxed'>{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex justify-start'
                >
                  <div className='bg-white/10 border border-white/20 px-4 py-3 rounded-2xl rounded-bl-none'>
                    <div className='flex items-center gap-2'>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Loader className='w-4 h-4 text-accent' />
                      </motion.div>
                      <span className='text-sm text-muted-foreground'>Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='rounded-lg bg-destructive/20 p-3 text-sm text-destructive'
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className='mx-auto mb-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all'
          >
            <ChevronDown className='w-5 h-5 text-accent' />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='border-t border-white/10 bg-gradient-to-t from-background to-transparent p-4'
      >
        <div className='flex gap-3'>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type your message... (or ask in Japanese!)'
            disabled={loading}
            className='flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition-all backdrop-blur-sm hover:border-white/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 disabled:opacity-50'
          />
          <motion.button
            type='submit'
            disabled={loading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='p-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Send className='w-5 h-5' />
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}
