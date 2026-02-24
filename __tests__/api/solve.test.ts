/**
 * @jest-environment node
 */
import type { NextRequest } from 'next/server'
import { POST } from '@/app/api/solve/route'

// Mock OpenAI
jest.mock('@/lib/openai', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{
            message: {
              content: JSON.stringify({
                co_vieme: 'Máme rovnicu 2x + 5 = 13.',
                hladame: 'Hľadáme hodnotu x.',
                kroky: [
                  { nazov: 'Krok 1', vysvetlenie: 'Odčítame 5.', matematika: '2x = 8' },
                  { nazov: 'Krok 2', vysvetlenie: 'Delíme 2.', matematika: 'x = 4' },
                ],
                odpoved: 'x = 4',
                pochvala: 'Výborne!',
              })
            }
          }]
        })
      }
    }
  }
}))

describe('POST /api/solve', () => {
  it('returns structured solution for a valid problem', async () => {
    const req = new Request('http://localhost/api/solve', {
      method: 'POST',
      body: JSON.stringify({ problem: '2x + 5 = 13' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as unknown as NextRequest)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.co_vieme).toBeTruthy()
    expect(Array.isArray(data.kroky)).toBe(true)
    expect(data.odpoved).toBe('x = 4')
  })

  it('returns 400 for empty problem', async () => {
    const req = new Request('http://localhost/api/solve', {
      method: 'POST',
      body: JSON.stringify({ problem: '' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(400)
  })
})
