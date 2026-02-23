import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTheoryById } from '@/data/theory'
import TheoryShapeCard from '@/components/TheoryShapeCard'
import TheoryImageToggle from '@/components/TheoryImageToggle'
import TheoryQAPanel from '@/components/TheoryQAPanel'

export default function TheoryDetailPage({ params }: { params: { id: string } }) {
  const section = getTheoryById(params.id)
  if (!section) notFound()

  return (
    <div className="py-6">
      <Link href="/theory" className="text-[#6D28D9] font-semibold mb-4 flex items-center gap-1 text-[17px]">
        ← Teória
      </Link>
      <h1 className="text-[26px] font-bold text-[#111827] mb-1">{section.title}</h1>
      <p className="text-gray-500 text-[16px] mb-5">{section.subtitle}</p>

      {section.notes && section.notes.length > 0 && (
        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-2xl p-4 mb-5">
          {section.notes.map((note, i) => (
            <p key={i} className="text-[17px] text-[#92400E] font-medium leading-snug">⚠️ {note}</p>
          ))}
        </div>
      )}

      {section.shapes.map((shape, i) => (
        <TheoryShapeCard key={i} shape={shape} />
      ))}

      <TheoryImageToggle imageFile={section.imageFile} title={section.title} />
      <TheoryQAPanel theoryId={section.id} imageFile={section.imageFile} />
    </div>
  )
}
