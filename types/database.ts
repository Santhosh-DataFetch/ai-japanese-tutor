export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      chat_history: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      kanji: {
        Row: {
          created_at: string | null
          difficulty_level: number | null
          id: string
          kanji_character: string
          kun_reading: string | null
          meaning: string | null
          on_reading: string | null
          proficiency: number | null
          stroke_count: number | null
          times_practiced: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          difficulty_level?: number | null
          id?: string
          kanji_character: string
          kun_reading?: string | null
          meaning?: string | null
          on_reading?: string | null
          proficiency?: number | null
          stroke_count?: number | null
          times_practiced?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          difficulty_level?: number | null
          id?: string
          kanji_character?: string
          kun_reading?: string | null
          meaning?: string | null
          on_reading?: string | null
          proficiency?: number | null
          stroke_count?: number | null
          times_practiced?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      kanji_dictionary: {
        Row: {
          created_at: string | null
          examples: string | null
          frequency: number | null
          grade: number | null
          id: string
          jlpt: string | null
          kanji: string
          kunyomi: string | null
          meaning: string
          onyomi: string | null
          radical: string | null
          stroke_count: number | null
          unicode_value: string | null
        }
        Insert: {
          created_at?: string | null
          examples?: string | null
          frequency?: number | null
          grade?: number | null
          id?: string
          jlpt?: string | null
          kanji: string
          kunyomi?: string | null
          meaning: string
          onyomi?: string | null
          radical?: string | null
          stroke_count?: number | null
          unicode_value?: string | null
        }
        Update: {
          created_at?: string | null
          examples?: string | null
          frequency?: number | null
          grade?: number | null
          id?: string
          jlpt?: string | null
          kanji?: string
          kunyomi?: string | null
          meaning?: string
          onyomi?: string | null
          radical?: string | null
          stroke_count?: number | null
          unicode_value?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          content: string
          created_at: string | null
          id: string
          lesson_type: string
          title: string
          updated_at: string | null
          user_id: string
          xp_earned: number | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          content: string
          created_at?: string | null
          id?: string
          lesson_type: string
          title: string
          updated_at?: string | null
          user_id: string
          xp_earned?: number | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          content?: string
          created_at?: string | null
          id?: string
          lesson_type?: string
          title?: string
          updated_at?: string | null
          user_id?: string
          xp_earned?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_streak_date: string | null
          display_name: string | null
          email: string | null
          id: string
          streak_count: number | null
          total_xp: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_streak_date?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          streak_count?: number | null
          total_xp?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_streak_date?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          streak_count?: number | null
          total_xp?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reading_assignments: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          difficulty_level: number | null
          english_translation: string | null
          furigana: string | null
          id: string
          japanese_text: string
          updated_at: string | null
          user_id: string
          xp_earned: number | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          difficulty_level?: number | null
          english_translation?: string | null
          furigana?: string | null
          id?: string
          japanese_text: string
          updated_at?: string | null
          user_id: string
          xp_earned?: number | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          difficulty_level?: number | null
          english_translation?: string | null
          furigana?: string | null
          id?: string
          japanese_text?: string
          updated_at?: string | null
          user_id?: string
          xp_earned?: number | null
        }
        Relationships: []
      }
      vocabulary: {
        Row: {
          created_at: string | null
          difficulty: number | null
          difficulty_level: number | null
          ease_factor: number | null
          elapsed_days: number | null
          english_meaning: string
          example_sentence: string | null
          id: string
          interval: number | null
          japanese_hiragana: string
          japanese_kanji: string | null
          jlpt_level: string | null
          lapses: number | null
          last_review: string | null
          next_review_date: string | null
          part_of_speech: string | null
          reps: number | null
          scheduled_days: number | null
          stability: number | null
          state: string | null
          times_reviewed: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          difficulty?: number | null
          difficulty_level?: number | null
          ease_factor?: number | null
          elapsed_days?: number | null
          english_meaning: string
          example_sentence?: string | null
          id?: string
          interval?: number | null
          japanese_hiragana: string
          japanese_kanji?: string | null
          jlpt_level?: string | null
          lapses?: number | null
          last_review?: string | null
          next_review_date?: string | null
          part_of_speech?: string | null
          reps?: number | null
          scheduled_days?: number | null
          stability?: number | null
          state?: string | null
          times_reviewed?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          difficulty?: number | null
          difficulty_level?: number | null
          ease_factor?: number | null
          elapsed_days?: number | null
          english_meaning?: string
          example_sentence?: string | null
          id?: string
          interval?: number | null
          japanese_hiragana?: string
          japanese_kanji?: string | null
          jlpt_level?: string | null
          lapses?: number | null
          last_review?: string | null
          next_review_date?: string | null
          part_of_speech?: string | null
          reps?: number | null
          scheduled_days?: number | null
          stability?: number | null
          state?: string | null
          times_reviewed?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      writing_assignments: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          feedback: string | null
          id: string
          prompt: string
          updated_at: string | null
          user_id: string
          user_submission: string | null
          xp_earned: number | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          prompt: string
          updated_at?: string | null
          user_id: string
          user_submission?: string | null
          xp_earned?: number | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          prompt?: string
          updated_at?: string | null
          user_id?: string
          user_submission?: string | null
          xp_earned?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
