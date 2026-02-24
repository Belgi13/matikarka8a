'use client'

import { useState } from 'react'
import { getAll, deleteAll } from '@/lib/history'
import { TOPICS } from '@/lib/questions'
import type { HistoryEntry } from '@/lib/types'
import StepCard from '@/components/StepCard'
import { ArrowLeft, ArrowRight, CheckCircle, Inbox } from 'react-feather'

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>(() => getAll())
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<HistoryEntry | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const filtered = filter === 'all' ? entries : entries.filter((e) => e.topic === filter)

  const handleDelete = () => {
    deleteAll()
    setEntries([])
    setShowConfirm(false)
  }

  if (selected) {
    const allSteps = [
      { nazov: 'Čo vieme?', vysvetlenie: selected.solution.co_vieme, matematika: '' },
      { nazov: 'Hľadáme:', vysvetlenie: selected.solution.hladame, matematika: '' },
      ...selected.solution.kroky,
    ]
    return (
      <div className="py-6">
        <button onClick={() => setSelected(null)} className="text-[#6D28D9] font-semibold mb-4 flex items-center gap-2">
          <ArrowLeft size={16} /> Späť
        </button>
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Príklad:</p>
          <p className="text-[17px] font-medium">{selected.problem || '(obrázok)'}</p>
        </div>
        {allSteps.map((step, i) => <StepCard key={i} step={step} stepNumber={i + 1} />)}
        <div className="bg-[#F0FDF4] border-2 border-[#10B981] rounded-2xl p-4 text-center mt-2">
          <p className="text-[20px] font-bold text-[#065F46] inline-flex items-center gap-2"><CheckCircle size={20} /> {selected.solution.odpoved}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <h1 className="text-[26px] font-bold text-[#111827] mb-4">Moje príklady</h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 rounded-xl border-2 border-gray-200 text-[16px] mb-5 focus:border-[#6D28D9] focus:outline-none"
      >
        <option value="all">Všetky témy</option>
        {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
      </select>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#6D28D9]"><Inbox size={22} /></p>
          <p className="text-[18px]">Ešte si nič nevyriešila.</p>
          <a href="/solve" className="text-[#6D28D9] font-semibold mt-2 inline-flex items-center gap-2">Začni teraz <ArrowRight size={14} /></a>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((entry) => {
            const topicLabel = TOPICS.find((t) => t.id === entry.topic)?.label ?? 'Iné'
            const date = new Date(entry.date).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long' })
            return (
              <button
                key={entry.id}
                onClick={() => setSelected(entry)}
                className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:border-[#6D28D9] transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs bg-[#DDD6FE] text-[#6D28D9] px-2 py-0.5 rounded-full font-medium">{topicLabel}</span>
                  <span className="text-xs text-gray-400">{date}</span>
                </div>
                <p className="text-[16px] text-gray-700 truncate">{entry.problem || '(obrázok)'}</p>
              </button>
            )
          })}
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-8">
          {showConfirm ? (
            <div className="bg-red-50 rounded-2xl p-4">
              <p className="text-[16px] text-red-700 mb-3">Naozaj chceš vymazať celú históriu?</p>
              <div className="flex gap-3">
                <button onClick={handleDelete} className="flex-1 py-2 bg-red-500 text-white rounded-xl font-semibold">Áno, vymazať</button>
                <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border-2 border-gray-300 rounded-xl font-semibold">Nie</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowConfirm(true)} className="w-full py-3 text-red-400 text-[15px] border border-red-200 rounded-xl hover:bg-red-50">
              Vymazať históriu
            </button>
          )}
        </div>
      )}
    </div>
  )
}
