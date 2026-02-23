import Link from 'next/link'
import { TOPICS, getByTopic } from '@/lib/questions'

export default function CollectionPage() {
  return (
    <div className="py-6">
      <h1 className="text-[26px] font-bold text-[#111827] mb-2">Zbierka príkladov</h1>
      <p className="text-gray-500 text-[17px] mb-6">Vyber tému a riešme spolu</p>
      <div className="grid grid-cols-2 gap-3">
        {TOPICS.map((topic) => {
          const count = getByTopic(topic.id).length
          return (
            <Link
              key={topic.id}
              href={`/collection/${topic.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:border-[#6D28D9] hover:shadow-md transition-all active:scale-95 flex flex-col items-center text-center"
            >
              <span className="text-4xl mb-2">{topic.icon}</span>
              <p className="text-[15px] font-semibold text-[#111827] leading-tight mb-1">{topic.label}</p>
              <p className="text-xs text-gray-400">{count} príkladov</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
