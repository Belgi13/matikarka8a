import Link from 'next/link'
import { THEORY_SECTIONS } from '@/data/theory'

export default function TheoryPage() {
  return (
    <div className="py-6">
      <h1 className="text-[26px] font-bold text-[#111827] mb-2">Teória</h1>
      <p className="text-gray-500 text-[17px] mb-6">Čo musíš vedieť — prehľadne a jednoducho</p>
      <div className="flex flex-col gap-4">
        {THEORY_SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={`/theory/${section.id}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-[#6D28D9] hover:shadow-md transition-all active:scale-[0.98] flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 text-3xl">📖</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[18px] font-bold text-[#111827] mb-1">{section.title}</h2>
              <p className="text-[15px] text-gray-500 leading-snug">{section.subtitle}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {section.topics.map((t) => (
                  <span key={t} className="text-xs bg-[#DDD6FE] text-[#6D28D9] px-2 py-0.5 rounded-full font-medium">{t}</span>
                ))}
              </div>
            </div>
            <span className="text-gray-400 text-lg mt-1">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
