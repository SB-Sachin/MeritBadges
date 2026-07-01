// Unified storage API used by the app. Backend is chosen automatically:
//   - Supabase  (when VITE_SUPABASE_* env vars are present)
//   - IndexedDB (local fallback, zero setup)
//
// Every method is async and works identically regardless of backend.
// Progress record shape:
//   { badgeId, status: 'in_progress'|'earned', dateEarned: 'YYYY-MM-DD'|null,
//     notes: string, photo: string|null, updatedAt: ISOString }

import { supabase, hasSupabase, PHOTO_BUCKET } from './supabase'
import { idbGetAll, idbPut, idbDelete } from './indexeddb'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function fileExt(file) {
  const fromName = file.name && file.name.includes('.') ? file.name.split('.').pop() : ''
  return (fromName || (file.type && file.type.split('/').pop()) || 'jpg').toLowerCase()
}

// ---- Local (IndexedDB) backend -------------------------------------------
const localBackend = {
  mode: 'local',
  async getAll() {
    const rows = await idbGetAll()
    return Object.fromEntries(rows.map((r) => [r.badgeId, r]))
  },
  async save(record) {
    await idbPut(record)
    return record
  },
  async remove(badgeId) {
    await idbDelete(badgeId)
  },
  async uploadPhoto(badgeId, file) {
    // Store inline as a data URL; returned value goes into record.photo.
    return { url: await fileToDataUrl(file) }
  },
}

// ---- Supabase backend -----------------------------------------------------
function rowToRecord(row) {
  return {
    badgeId: row.badge_id,
    status: row.status,
    dateEarned: row.date_earned,
    notes: row.notes || '',
    photo: row.photo_url || null,
    updatedAt: row.updated_at,
  }
}

function recordToRow(record) {
  return {
    badge_id: record.badgeId,
    status: record.status,
    date_earned: record.dateEarned || null,
    notes: record.notes || '',
    photo_url: record.photo || null,
    updated_at: record.updatedAt || new Date().toISOString(),
  }
}

const supabaseBackend = {
  mode: 'supabase',
  async getAll() {
    const { data, error } = await supabase.from('badge_progress').select('*')
    if (error) throw error
    return Object.fromEntries((data || []).map((row) => [row.badge_id, rowToRecord(row)]))
  },
  async save(record) {
    const { error } = await supabase
      .from('badge_progress')
      .upsert(recordToRow(record), { onConflict: 'badge_id' })
    if (error) throw error
    return record
  },
  async remove(badgeId) {
    const { error } = await supabase.from('badge_progress').delete().eq('badge_id', badgeId)
    if (error) throw error
  },
  async uploadPhoto(badgeId, file) {
    const path = `${badgeId}-${Date.now()}.${fileExt(file)}`
    const { error } = await supabase.storage
      .from(PHOTO_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type })
    if (error) throw error
    const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path)
    return { url: data.publicUrl }
  },
}

export const store = hasSupabase ? supabaseBackend : localBackend
export const STORAGE_MODE = store.mode
