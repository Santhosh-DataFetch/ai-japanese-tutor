import { redirect } from 'next/navigation'
import { getUser } from '@/app/actions/auth'
import { getChatSessions } from '@/app/actions/chat'
import TutorClient from '@/components/tutor/tutor-client'

export default async function TutorPage() {
  const result = await getUser()

  if (!result.success || !result.user) {
    redirect('/login')
  }

  const sessions = await getChatSessions()

  return (
    <TutorClient
      user={result.user}
      sessions={sessions}
    />
  )
}