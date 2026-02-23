import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { SYSTEM_PROMPT } from '@/lib/prompts'
import type { Solution } from '@/lib/types'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { problem } = await req.json()

    if (!problem?.trim()) {
      return NextResponse.json({ error: 'Chýba príklad' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: problem },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const content = completion.choices[0].message.content
    if (!content) {
      return NextResponse.json({ error: 'Prázdna odpoveď' }, { status: 500 })
    }

    const solution: Solution = JSON.parse(content)
    return NextResponse.json(solution)
  } catch (error) {
    console.error('Solve error:', error)
    return NextResponse.json({ error: 'Niečo sa pokazilo' }, { status: 500 })
  }
}
