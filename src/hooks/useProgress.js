import { useEffect, useState, useCallback, useRef } from 'react'
import { store, STORAGE_MODE } from '../lib/store'

const DEFAULT = { status: 'in_progress', dateEarned: null, notes: '', photo: null }

// Loads all progress once, keeps it in memory (mirrored in a ref so writes read
// the latest value synchronously), and persists every change through the active
// storage backend (Supabase or local IndexedDB).
export function useProgress() {
  const [progress, setProgress] = useState({})
  const ref = useRef({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const commit = (next) => {
    ref.current = next
    setProgress(next)
  }

  useEffect(() => {
    let active = true
    store
      .getAll()
      .then((data) => {
        if (active) commit(data)
      })
      .catch((e) => active && setError(e))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const saveBadge = useCallback(async (badgeId, partial) => {
    const existing = ref.current[badgeId] || { badgeId, ...DEFAULT }
    const saved = { ...existing, ...partial, badgeId, updatedAt: new Date().toISOString() }
    commit({ ...ref.current, [badgeId]: saved })
    await store.save(saved)
    return saved
  }, [])

  const removeBadge = useCallback(async (badgeId) => {
    const next = { ...ref.current }
    delete next[badgeId]
    commit(next)
    await store.remove(badgeId)
  }, [])

  const uploadPhoto = useCallback((badgeId, file) => store.uploadPhoto(badgeId, file), [])

  return { progress, loading, error, saveBadge, removeBadge, uploadPhoto, mode: STORAGE_MODE }
}
