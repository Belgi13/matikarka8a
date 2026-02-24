/**
 * @jest-environment node
 */
import type { NextRequest } from 'next/server'
import { POST } from '@/app/api/theory-qa/route'

jest.mock('@/lib/openai', () => ({
  openai: { chat: { completions: { create: jest.fn().mockResolvedValue({
    choices: [{ message: { content: 'Štvorec má všetky strany rovnaké.' } }]
  }) } } }
}))
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  arrayBuffer: () => Promise.resolve(Buffer.from('fake-image').buffer),
})

describe('POST /api/theory-qa', () => {
  it('returns answer for valid request', async () => {
    const req = new Request('http://localhost/api/theory-qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'Čo je štvorec?', theoryId: 'stvoruholniky', imageFile: 'theory-stvoruholniky.png' }),
    })
    const res = await POST(req as unknown as NextRequest)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(typeof data.answer).toBe('string')
  })

  it('returns 400 for empty question', async () => {
    const req = new Request('http://localhost/api/theory-qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: '', theoryId: 'stvoruholniky', imageFile: 'theory-stvoruholniky.png' }),
    })
    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(400)
  })

  it('returns 400 for path traversal in imageFile', async () => {
    const req = new Request('http://localhost/api/theory-qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'hack', theoryId: 'x', imageFile: '../../../etc/passwd' }),
    })
    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(400)
  })
})
