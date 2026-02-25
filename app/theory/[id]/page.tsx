import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTheoryById } from '@/data/theory'
import TheoryShapeCard from '@/components/TheoryShapeCard'
import TheoryImageToggle from '@/components/TheoryImageToggle'
import TheoryQAPanel from '@/components/TheoryQAPanel'
import { AlertTriangle, ArrowLeft } from 'react-feather'
import TheoryLabWrapper from '@/components/labs/TheoryLabWrapper'

export default async function TheoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const section = getTheoryById(id)
  if (!section) notFound()

  return (
    <div className="py-6">
      <Link href="/theory" className="text-[#6D28D9] font-semibold mb-4 flex items-center gap-2 text-[17px]">
        <ArrowLeft size={16} /> Teória
      </Link>
      <h1 className="text-[26px] font-bold text-[#111827] mb-1">{section.title}</h1>
      <p className="text-gray-500 text-[16px] mb-5">{section.subtitle}</p>

      {section.notes && section.notes.length > 0 && (
        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-2xl p-4 mb-5">
          {section.notes.map((note, i) => (
            <p key={i} className="text-[17px] text-[#92400E] font-medium leading-snug inline-flex items-start gap-2">
              <AlertTriangle size={16} className="mt-1 flex-shrink-0" />
              <span>{note}</span>
            </p>
          ))}
        </div>
      )}

      {section.shapes.map((shape, i) => (
        <TheoryShapeCard key={i} shape={shape} />
      ))}

      <TheoryLabWrapper id={section.id} />

      <TheoryImageToggle imageFile={section.imageFile} title={section.title} />
      <TheoryQAPanel theoryId={section.id} imageFile={section.imageFile} />
    </div>
  )
}
