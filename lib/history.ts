import type { HistoryEntry } from './types'

const STORAGE_KEY = 'matikarka_history'

export function saveEntry(
  entry: Omit<HistoryEntry, 'id' | 'date'>
): HistoryEntry {
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  }
  const all = getAll()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...all]))
  return newEntry
}

export function getAll(): HistoryEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getById(id: string): HistoryEntry | null {
  return getAll().find((e) => e.id === id) ?? null
}

export function deleteAll(): void {
  localStorage.removeItem(STORAGE_KEY)
}
