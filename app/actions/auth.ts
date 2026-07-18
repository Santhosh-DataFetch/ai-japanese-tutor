'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: 'Check your email to verify your account.',
      user: data.user,
    }
  } catch (error) {
    console.error('[v0] Sign up error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

export async function signInWithEmail(
  email: string,
  password: string
) {
  const supabase = await createClient()

  try {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/')

    return {
      success: true,
      user: data.user,
    }
  } catch (error) {
    console.error('[v0] Sign in error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

export async function signOut() {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath('/')

    return { success: true }
  } catch (error) {
    console.error('[v0] Sign out error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

export async function getSession() {
  const supabase = await createClient()

  try {
    const { data, error } =
      await supabase.auth.getSession()

    if (error) {
      return {
        success: false,
        error: error.message,
        session: null,
      }
    }

    return {
      success: true,
      session: data.session,
    }
  } catch (error) {
    console.error('[v0] Get session error:', error)

    return {
      success: false,
      error: 'An unexpected error occurred',
      session: null,
    }
  }
}

export async function getUser() {
  const supabase = await createClient()

  try {
    const { data, error } =
      await supabase.auth.getUser()

    console.log('USER:', data.user)
    console.log('ERROR:', error)

    if (error) {
      return {
        success: false,
        error: error.message,
        user: null,
      }
    }

    return {
      success: true,
      user: data.user,
    }
  } catch (error) {
    console.error('[v0] Get user error:', error)

    return {
      success: false,
      user: null,
    }
  }
}