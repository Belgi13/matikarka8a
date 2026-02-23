import { saveEntry, getAll, getById, deleteAll } from '@/lib/history'
import type { Solution } from '@/lib/types'

const mockSolution: Solution = {
  co_vieme: 'Test', hladame: 'Test', kroky: [], odpoved: 'x = 1', pochvala: 'Výborne!'
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(global, 'localStorage', { value: localStorageMock })

beforeEach(() => localStorage.clear())

describe('history', () => {
  it('saveEntry returns entry with id and date', () => {
    const entry = saveEntry({ problem: '2x=4', solution: mockSolution })
    expect(entry.id).toBeTruthy()
    expect(entry.date).toBeTruthy()
    expect(entry.problem).toBe('2x=4')
  })

  it('getAll returns saved entries newest first', () => {
    saveEntry({ problem: 'first', solution: mockSolution })
    saveEntry({ problem: 'second', solution: mockSolution })
    const all = getAll()
    expect(all).toHaveLength(2)
    expect(all[0].problem).toBe('second')
  })

  it('getById returns correct entry', () => {
    const saved = saveEntry({ problem: 'find me', solution: mockSolution })
    const found = getById(saved.id)
    expect(found?.problem).toBe('find me')
  })

  it('getById returns null for unknown id', () => {
    expect(getById('nonexistent')).toBeNull()
  })

  it('deleteAll clears all entries', () => {
    saveEntry({ problem: 'test', solution: mockSolution })
    deleteAll()
    expect(getAll()).toHaveLength(0)
  })
})
