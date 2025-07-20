import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Activity = {
  id: string
  title: string
  description: string
  type: 'hackathon' | 'project' | 'achievement' | 'conference' | 'workshop'
  date: string
  image_url?: string
  link?: string
  tags: string[]
  created_at: string
}

export type Project = {
  id: string
  title: string
  description: string
  image_url?: string
  live_url?: string
  github_url?: string
  technologies: string[]
  featured: boolean
  created_at: string
}