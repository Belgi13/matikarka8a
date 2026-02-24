/**
 * @jest-environment node
 */
import type { NextRequest } from 'next/server'
import { POST } from '@/app/api/validate/route'

const mockCreate = jest.fn()
jest.mock('@/lib/openai', () => ({
  openai: { chat: { completions: { create: (...args: unknown[]) => mockCreate(...args) } } }
}))

describe('POST /api/validate', () => {
  it('returns spravne: true for correct answer', async () => {
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: '{"spravne": true, "sprava": "Výborne!"}' } }]
    })
    const req = new Request('http://localhost/api/validate', {
      method: 'POST',
      body: JSON.stringify({ problem: '2x+5=13', studentAnswer: 'x=4', correctAnswer: 'x=4' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as unknown as NextRequest)
    const data = await res.json()
    expect(data.spravne).toBe(true)
    expect(data.sprava).toBeTruthy()
  })

  it('returns spravne: false for wrong answer', async () => {
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: '{"spravne": false, "sprava": "Takmer, skús znova."}' } }]
    })
    const req = new Request('http://localhost/api/validate', {
      method: 'POST',
      body: JSON.stringify({ problem: '2x+5=13', studentAnswer: 'x=5', correctAnswer: 'x=4' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as unknown as NextRequest)
    const data = await res.json()
    expect(data.spravne).toBe(false)
  })
})
