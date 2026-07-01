// Minimal promise-based IndexedDB wrapper for local (no-Supabase) mode.
// One object store, "progress", keyed by badgeId. Photos are stored inline as
// data URLs (IndexedDB has no practical size cap like localStorage does).

const DB_NAME = 'meritbadge_tracker'
const DB_VERSION = 1
const STORE = 'progress'

let dbPromise = null

function openDb() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'badgeId' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

function tx(mode, fn) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const t = db.transaction(STORE, mode)
        const store = t.objectStore(STORE)
        const result = fn(store)
        t.oncomplete = () => resolve(result)
        t.onerror = () => reject(t.error)
        t.onabort = () => reject(t.error)
      }),
  )
}

export function idbGetAll() {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db.transaction(STORE, 'readonly').objectStore(STORE).getAll()
        req.onsuccess = () => resolve(req.result || [])
        req.onerror = () => reject(req.error)
      }),
  )
}

export function idbPut(record) {
  return tx('readwrite', (store) => store.put(record))
}

export function idbDelete(badgeId) {
  return tx('readwrite', (store) => store.delete(badgeId))
}
