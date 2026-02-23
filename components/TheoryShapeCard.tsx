import type { TheoryShape } from '@/data/theory'

export default function TheoryShapeCard({ shape }: { shape: TheoryShape }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
      <h3 className="text-[18px] font-bold text-[#111827] mb-3">
        {shape.emoji && <span className="mr-2">{shape.emoji}</span>}
        {shape.name}
      </h3>
      {shape.properties.length > 0 && (
        <ul className="mb-4 space-y-2">
          {shape.properties.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-[17px] text-[#374151] leading-snug">
              <span className="text-[#6D28D9] font-bold mt-0.5 flex-shrink-0">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      {shape.formulas.length > 0 && (
        <div className="bg-[#EFF6FF] rounded-xl p-4 space-y-3">
          {shape.formulas.map((f, i) => (
            <div key={i}>
              {f.label && (
                <p className="text-[12px] text-[#3B82F6] font-semibold uppercase tracking-wide mb-0.5">{f.label}</p>
              )}
              <p className="text-[20px] font-mono text-[#1E40AF] leading-relaxed break-words">{f.formula}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
