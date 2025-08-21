import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://spycctmatdfqpyuhriyc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      registrations: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          email: string
          phone_number: string
          country: string
          school?: string
          grade_level?: string
          birth_date?: string
          motivation?: string
          competition_code?: string
          code_generated_at?: string
          registration_status: string
        }
        Insert: {
          id?: string
          created_at?: string
          first_name: string
          last_name: string
          email: string
          phone_number: string
          country: string
          school?: string
          grade_level?: string
          birth_date?: string
          motivation?: string
          competition_code?: string
          code_generated_at?: string
          registration_status?: string
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone_number?: string
          country?: string
          school?: string
          grade_level?: string
          birth_date?: string
          motivation?: string
          competition_code?: string
          code_generated_at?: string
          registration_status?: string
        }
      }
    }
  }
}