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
          className={`w-full rounded-lg p-3 text-left transition ${
            currentId === chat.id
              ? 'bg-primary text-white'
              : 'hover:bg-muted'
          }`}
        >
          {chat.title}
        </button>
      ))}
    </div>
  )
}