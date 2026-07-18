'use server'

import { supabase } from '@/lib/supabase/client'

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('[v0] Profile fetch error:', error)
      return { success: false, error: error.message, profile: null }
    }

    return { success: true, profile: data }
  } catch (error) {
    console.error('[v0] Profile error:', error)
    return { success: false, error: 'Failed to fetch profile', profile: null }
  }
}

export async function updateUserProfile(userId: string, updates: Record<string, unknown>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('[v0] Profile update error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, profile: data }
  } catch (error) {
    console.error('[v0] Update profile error:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}

export async function getVocabularyList(userId: string, limit = 50, offset = 0) {
  try {
    const { data, error } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('[v0] Vocabulary fetch error:', error)
      return { success: false, error: error.message, vocabulary: [] }
    }

    return { success: true, vocabulary: data }
  } catch (error) {
    console.error('[v0] Vocabulary error:', error)
    return { success: false, error: 'Failed to fetch vocabulary', vocabulary: [] }
  }
}

export async function addVocabulary(userId: string, vocab: {
  japanese_hiragana: string
  japanese_kanji?: string
  english_meaning: string
  part_of_speech?: string
  example_sentence?: string
  difficulty_level?: number
}) {
  try {
    const { data, error } = await supabase
      .from('vocabulary')
      .insert({
        user_id: userId,
        ...vocab,
      })
      .select()
      .single()

    if (error) {
      console.error('[v0] Add vocabulary error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, vocabulary: data }
  } catch (error) {
    console.error('[v0] Add vocabulary error:', error)
    return { success: false, error: 'Failed to add vocabulary' }
  }
}

export async function updateVocabularyReview(
  vocabularyId: string,
  reviewed: boolean,
  nextReviewDate: Date,
  easyFactor: number,
  interval: number
) {
  try {
    const { data, error } = await supabase
      .from('vocabulary')
      .update({
        times_reviewed: supabase.rpc('increment_times_reviewed') || 1,
        next_review_date: nextReviewDate,
        ease_factor: easyFactor,
        interval,
        updated_at: new Date(),
      })
      .eq('id', vocabularyId)
      .select()
      .single()

    if (error) {
      console.error('[v0] Update review error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, vocabulary: data }
  } catch (error) {
    console.error('[v0] Update review error:', error)
    return { success: false, error: 'Failed to update review' }
  }
}

export async function getKanjiList(userId: string, limit = 50, offset = 0) {
  try {
    const { data, error } = await supabase
      .from('kanji')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('[v0] Kanji fetch error:', error)
      return { success: false, error: error.message, kanji: [] }
    }

    return { success: true, kanji: data }
  } catch (error) {
    console.error('[v0] Kanji error:', error)
    return { success: false, error: 'Failed to fetch kanji', kanji: [] }
  }
}

export async function getChatHistory(userId: string, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[v0] Chat history fetch error:', error)
      return { success: false, error: error.message, messages: [] }
    }

    return { success: true, messages: data }
  } catch (error) {
    console.error('[v0] Chat history error:', error)
    return { success: false, error: 'Failed to fetch chat history', messages: [] }
  }
}

export async function addChatMessage(userId: string, role: string, content: string) {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .insert({
        user_id: userId,
        role,
        content,
      })
      .select()
      .single()

    if (error) {
      console.error('[v0] Add message error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, message: data }
  } catch (error) {
    console.error('[v0] Add message error:', error)
    return { success: false, error: 'Failed to add message' }
  }
}
