'use client'

interface Session {
  id: string
  title: string
}

interface Props {
  sessions: Session[]
  currentId?: string
  onSelect(id: string): void
}

export default function ChatHistory({
  sessions,
  currentId,
  onSelect,
}: Props) {
  return (
    <div className="space-y-2">
      {sessions.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          className={`w-full rounded-[16px] border p-3 text-left text-sm transition ${
            currentId === chat.id
              ? 'border-teal-400/30 bg-teal-400/10 text-white'
              : 'border-white/10 bg-white/6 text-slate-300 hover:bg-white/10'
          }`}
        >
          {chat.title}
        </button>
      ))}
    </div>
  )
}