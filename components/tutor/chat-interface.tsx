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
    <div className='flex h-full flex-col bg-background'>
      {/* Messages Container */}
      <div
        ref={chatRef}
        className='flex-1 overflow-y-auto p-8 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent'
      >
        <AnimatePresence mode='wait'>
          {messages.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className='flex h-full flex-col items-center justify-center space-y-6 text-center py-20'
            >
              <motion.div className='p-6 rounded-2xl bg-primary/10'>
                <Sparkles className='w-12 h-12 text-primary' />
              </motion.div>
              <div className='space-y-2 max-w-sm'>
                <h3 className='text-2xl font-light text-foreground'>Start a conversation</h3>
                <p className='text-base text-muted-foreground font-light'>
                  Ask about grammar, vocabulary, or practice speaking Japanese
                </p>
              </div>
            </motion.div>
          ) : (
            <div className='space-y-6 max-w-4xl mx-auto'>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    <div className='bg-primary text-primary-foreground rounded-2xl px-6 py-4 max-w-2xl shadow-md'>
                      <p className='text-base leading-relaxed'>{msg.text}</p>
                    </div>
                  ) : (
                    <div className='bg-card border border-border rounded-2xl px-6 py-4 max-w-2xl'>
                      <p className='text-base leading-relaxed text-foreground'>{msg.text}</p>
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex justify-start'
                >
                  <div className='bg-card border border-border rounded-2xl px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Loader className='w-5 h-5 text-primary' />
                      </motion.div>
                      <span className='text-base text-muted-foreground'>Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='rounded-2xl bg-destructive/10 p-4 text-destructive'
                >
                  <p className='text-sm'>{error}</p>
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
            className='mx-auto mb-4 p-2.5 rounded-full bg-card border border-border hover:border-primary/50 transition-all'
          >
            <ChevronDown className='w-5 h-5 text-primary' />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input Area - Sticky Composer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='border-t border-border bg-background p-6'
      >
        <form onSubmit={onSubmit} className='max-w-4xl mx-auto flex gap-3'>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Message...'
            disabled={loading}
            className='flex-1 rounded-2xl border border-border bg-card px-6 py-3.5 text-foreground placeholder-muted-foreground outline-none transition-all hover:border-primary/30 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-base'
          />
          <motion.button
            type='submit'
            disabled={loading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='p-3.5 rounded-2xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Send className='w-5 h-5' />
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
