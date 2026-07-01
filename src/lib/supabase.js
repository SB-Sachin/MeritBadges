import { createClient } from '@supabase/supabase-js'

// Cloud sync is optional. If these env vars are set (see .env.example), the app
// stores progress + photos in Supabase. Otherwise it falls back to local
// IndexedDB storage so the app still works with zero setup.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabase = Boolean(url && anonKey)

export const supabase = hasSupabase ? createClient(url, anonKey) : null

// Storage bucket used for uploaded certificate / badge photos.
export const PHOTO_BUCKET = 'badge-photos'
