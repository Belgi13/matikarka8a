import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { VALIDATION_PROMPT } from '@/lib/prompts'
import type { ValidationResult } from '@/lib/types'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { problem, studentAnswer, correctAnswer } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: VALIDATION_PROMPT(problem, studentAnswer, correctAnswer) }],
      response_format: { type: 'json_object' },
      temperature: 0,
    })

    const content = completion.choices[0].message.content
    if (!content) return NextResponse.json({ error: 'Prázdna odpoveď' }, { status: 500 })

    const result: ValidationResult = JSON.parse(content)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Validate error:', error)
    return NextResponse.json({ error: 'Niečo sa pokazilo' }, { status: 500 })
  }
}
