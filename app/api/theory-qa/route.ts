import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { readFile } from 'fs/promises'
import path from 'path'

export const maxDuration = 60

const SYSTEM_PROMPT = `Si Matikárka – priateľská matematická pomocníčka pre žiačku 8. ročníka so ŤAŽKOU DYSKALKULIOU a ADHD.
Odpovedáš na otázku o matematickej teórii. Máš k dispozícii obrázok zo zošita žiačky.
PRAVIDLÁ:
- Píš VÝLUČNE po slovensky
- Maximálne 3 vety na odpoveď
- Používaj jednoduché slová vhodné pre 8-ročníka
- Ak otázka súvisí s obrázkom, použi: "Ako vidíš na obrázku..."
- Ak je otázka mimo teórie na obrázku, povedz: "To nie je na tomto obrázku, ale môžem ti pomôcť cez Vyriešiť 😊"
- Nikdy nepoužívaj odborný žargón bez vysvetlenia`

export async function POST(req: NextRequest) {
  try {
    const { question, theoryId, imageFile } = await req.json()

    if (!question?.trim()) {
      return NextResponse.json({ error: 'Chýba otázka' }, { status: 400 })
    }
    // Security: only allow filenames matching theory-*.png pattern
    if (!imageFile || !/^theory-[\w-]+\.png$/.test(imageFile)) {
      return NextResponse.json({ error: 'Neplatný obrázok' }, { status: 400 })
    }

    const imagePath = path.join(process.cwd(), 'public', 'theory', imageFile)
    const imageBuffer = await readFile(imagePath)
    const imageBase64 = imageBuffer.toString('base64')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:image/png;base64,${imageBase64}`, detail: 'high' } },
            { type: 'text', text: question },
          ] as any,
        },
      ],
      temperature: 0.4,
      max_tokens: 300,
    })

    const answer = completion.choices[0].message.content?.trim()
    if (!answer) return NextResponse.json({ error: 'Prázdna odpoveď' }, { status: 500 })

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('Theory QA error:', error)
    return NextResponse.json({ error: 'Niečo sa pokazilo' }, { status: 500 })
  }
}
