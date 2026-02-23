import Link from 'next/link'
import { getByTopic, TOPICS } from '@/lib/questions'
import { getTheoryByTopic } from '@/data/theory'
import { notFound } from 'next/navigation'

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topicMeta = TOPICS.find((t) => t.id === params.topic)
  if (!topicMeta) notFound()

  const questions = getByTopic(params.topic)
  const theoryLinks = getTheoryByTopic(params.topic)

  return (
    <div className="py-6">
      <Link href="/collection" className="text-[#6D28D9] font-semibold mb-4 flex items-center gap-1">
        ← Zbierka
      </Link>

      {theoryLinks.length > 0 && (
        <div className="mb-5 flex flex-col gap-2">
          {theoryLinks.map((section) => (
            <Link
              key={section.id}
              href={`/theory/${section.id}`}
              className="flex items-center gap-3 bg-[#EEF2FF] border border-[#DDD6FE] rounded-2xl px-4 py-3 hover:bg-[#DDD6FE] transition-colors"
            >
              <span className="text-xl">📖</span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-[#6D28D9]">Teória k tejto téme</p>
                <p className="text-[13px] text-[#4338CA]">{section.title}</p>
              </div>
              <span className="text-[#6D28D9]">→</span>
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-[24px] font-bold text-[#111827] mb-6">
        {topicMeta.icon} {topicMeta.label}
      </h1>
      <div className="flex flex-col gap-3">
        {questions.map((q) => (
          <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">{q.difficulty === 1 ? '⭐' : '⭐⭐'}</span>
              <span className="text-xs text-gray-400">{q.difficulty === 1 ? 'Ľahší' : 'Ťažší'}</span>
            </div>
            <p className="text-[16px] text-[#111827] mb-3 leading-relaxed">{q.text}</p>
            <div className="flex gap-2">
              <Link
                href={`/solve?q=${q.id}`}
                className="flex-1 text-center py-2 bg-[#F59E0B] text-white text-[14px] font-semibold rounded-xl hover:bg-amber-500 transition-colors"
              >
                Vyriešiť s pomocou
              </Link>
              <Link
                href={`/practice?q=${q.id}`}
                className="flex-1 text-center py-2 border-2 border-[#6D28D9] text-[#6D28D9] text-[14px] font-semibold rounded-xl hover:bg-[#EEF2FF] transition-colors"
              >
                Precvičiť
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
