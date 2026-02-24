'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, Grid, Minus, Sliders } from 'react-feather'
import type { Solution, SolutionStep } from '@/lib/types'
import VisualExplanationCsv from '@/components/VisualExplanationCsv'

type LabType = 'equation' | 'fraction' | 'geometry' | 'general'
type ViewMode = 'interactive' | 'csv'

export default function VisualExplanationLab({
  problem,
  solution,
  steps,
}: {
  problem: string
  solution: Solution
  steps: SolutionStep[]
}) {
  const [mode, setMode] = useState<ViewMode>('interactive')
  const labType = detectLabType(problem, solution)

  return (
    <div className="rounded-2xl border-2 border-[#C7D2FE] bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[16px] font-bold text-[#1F2937]">Interaktívne vizuálne laboratórium</p>
          <p className="text-[13px] text-[#6B7280]">Skúšaj hodnoty, sleduj zmeny a hraj sa s príkladom.</p>
        </div>
        <span className="rounded-lg bg-[#EEF2FF] px-2 py-1 text-xs font-semibold text-[#4F46E5]">
          {labelForType(labType)}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-[#F8FAFF] p-1">
        <button
          onClick={() => setMode('interactive')}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
            mode === 'interactive' ? 'bg-white text-[#4F46E5] shadow-sm' : 'text-[#6B7280]'
          }`}
        >
          Interaktívne
        </button>
        <button
          onClick={() => setMode('csv')}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
            mode === 'csv' ? 'bg-white text-[#4F46E5] shadow-sm' : 'text-[#6B7280]'
          }`}
        >
          CSV štýl
        </button>
      </div>

      {mode === 'csv' ? (
        <VisualExplanationCsv steps={steps} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {labType === 'equation' && <EquationLab source={problem} />}
          {labType === 'fraction' && <FractionLab source={problem} />}
          {labType === 'geometry' && <GeometryLab />}
          {labType === 'general' && <GeneralLab source={problem} />}
        </motion.div>
      )}
    </div>
  )
}

function EquationLab({ source }: { source: string }) {
  const parsed = useMemo(() => parseLinearEquation(source), [source])
  const [x, setX] = useState(1)

  if (!parsed) {
    return <GeneralLab source={source} />
  }

  const left = parsed.leftA * x + parsed.leftB
  const right = parsed.rightA * x + parsed.rightB
  const diff = left - right
  const maxAbs = Math.max(1, Math.abs(left), Math.abs(right))
  const eqNow = diff === 0

  return (
    <div className="space-y-4">
      <p className="rounded-xl bg-[#EEF2FF] px-3 py-2 text-sm font-semibold text-[#4338CA]">{parsed.raw}</p>

      <div className="rounded-xl border border-[#E5E7EB] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#374151] inline-flex items-center gap-2"><Sliders size={14} /> Posuň x</span>
          <span className="text-sm font-bold text-[#4F46E5]">x = {x}</span>
        </div>
        <input
          type="range"
          min={-12}
          max={12}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="w-full accent-[#4F46E5]"
        />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 rounded-xl bg-[#F8FAFF] p-3">
        <ScaleColumn label="Ľavá strana" value={left} maxAbs={maxAbs} color="#4F46E5" />
        <Minus size={20} className={eqNow ? 'text-[#16A34A]' : 'text-[#9CA3AF]'} />
        <ScaleColumn label="Pravá strana" value={right} maxAbs={maxAbs} color="#F97316" />
      </div>

      <p className={`text-sm font-semibold ${eqNow ? 'text-[#16A34A]' : 'text-[#B45309]'}`}>
        {eqNow ? 'Rovnováha: obe strany sú rovnaké.' : `Rozdiel strán: ${diff > 0 ? '+' : ''}${diff}`}
      </p>
    </div>
  )
}

function FractionLab({ source }: { source: string }) {
  const fractions = useMemo(() => extractFractions(source), [source])
  const first = fractions[0] ?? { n: 1, d: 2 }
  const second = fractions[1] ?? { n: 3, d: 4 }
  const [n, setN] = useState(first.n)
  const [d, setD] = useState(Math.max(first.d, 2))

  return (
    <div className="space-y-4">
      <p className="rounded-xl bg-[#EEF2FF] px-3 py-2 text-sm font-semibold text-[#4338CA]">
        Meniteľný zlomok: {n}/{d} (hodnota {round2(n / d)})
      </p>

      <div className="rounded-xl border border-[#E5E7EB] p-3">
        <label className="mb-1 block text-sm font-semibold text-[#374151]">Čitateľ: {n}</label>
        <input type="range" min={0} max={Math.max(12, d)} value={n} onChange={(e) => setN(Number(e.target.value))} className="mb-3 w-full accent-[#4F46E5]" />
        <label className="mb-1 block text-sm font-semibold text-[#374151]">Menovateľ: {d}</label>
        <input type="range" min={2} max={12} value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full accent-[#F97316]" />
      </div>

      <div className="space-y-3">
        <FractionBar n={n} d={d} label="Tvoj zlomok" color="bg-[#4F46E5]" />
        <FractionBar n={second.n} d={second.d} label={`Porovnanie (${second.n}/${second.d})`} color="bg-[#F97316]" />
      </div>
    </div>
  )
}

function GeometryLab() {
  const [a, setA] = useState(6)
  const [b, setB] = useState(4)

  const area = a * b
  const perimeter = 2 * (a + b)
  const w = Math.max(90, a * 16)
  const h = Math.max(70, b * 16)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#E5E7EB] p-3">
        <label className="mb-1 block text-sm font-semibold text-[#374151]">Strana a: {a}</label>
        <input type="range" min={1} max={12} value={a} onChange={(e) => setA(Number(e.target.value))} className="mb-3 w-full accent-[#4F46E5]" />
        <label className="mb-1 block text-sm font-semibold text-[#374151]">Strana b: {b}</label>
        <input type="range" min={1} max={12} value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-[#F97316]" />
      </div>

      <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl bg-[#F8FAFF] p-3">
        <div>
          <p className="text-sm font-semibold text-[#1F2937]">Obsah: {area}</p>
          <p className="text-sm font-semibold text-[#1F2937]">Obvod: {perimeter}</p>
        </div>
        <div className="flex items-center justify-center rounded-lg bg-white p-2 shadow-sm">
          <svg width={w + 28} height={h + 28} viewBox={`0 0 ${w + 28} ${h + 28}`}>
            <rect x="14" y="14" width={w} height={h} rx="8" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function GeneralLab({ source }: { source: string }) {
  const nums = useMemo(() => {
    const found = Array.from(source.matchAll(/-?\d+(?:[.,]\d+)?/g)).map((m) => Number(m[0].replace(',', '.')))
    return found.length > 0 ? found.slice(0, 6) : [2, 3, 5]
  }, [source])
  const [vals, setVals] = useState(nums)

  const sum = vals.reduce((a, b) => a + b, 0)
  const avg = vals.length ? sum / vals.length : 0

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#F8FAFF] p-3">
        <p className="mb-2 text-sm font-semibold text-[#374151] inline-flex items-center gap-2"><Grid size={14} /> Hraj sa s číslami z príkladu</p>
        <div className="grid grid-cols-3 gap-2">
          {vals.map((v, i) => (
            <div key={`${v}-${i}`} className="rounded-lg border border-[#E5E7EB] bg-white p-2 text-center">
              <p className="text-sm font-bold text-[#111827]">{round2(v)}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <button onClick={() => setVals((prev) => prev.map((x, idx) => (idx === i ? x - 1 : x)))} className="rounded bg-[#EEF2FF] px-2 text-[#4F46E5]">-</button>
                <button onClick={() => setVals((prev) => prev.map((x, idx) => (idx === i ? x + 1 : x)))} className="rounded bg-[#FFF7ED] px-2 text-[#C2410C]">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#E5E7EB] p-3">
        <p className="text-sm font-semibold text-[#1F2937] inline-flex items-center gap-2"><BarChart2 size={14} /> Súčet: {round2(sum)}</p>
        <p className="text-sm font-semibold text-[#1F2937]">Priemer: {round2(avg)}</p>
      </div>
    </div>
  )
}

function ScaleColumn({ label, value, maxAbs, color }: { label: string; value: number; maxAbs: number; color: string }) {
  const ratio = Math.min(1, Math.abs(value) / maxAbs)
  const height = 26 + ratio * 74

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-xs font-semibold text-[#4B5563]">{label}</div>
      <div className="relative h-28 w-20 rounded-lg bg-white shadow-sm">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-b-lg"
          style={{ backgroundColor: color }}
          animate={{ height }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        />
      </div>
      <div className="mt-2 text-sm font-bold text-[#111827]">{round2(value)}</div>
    </div>
  )
}

function FractionBar({ n, d, label, color }: { n: number; d: number; label: string; color: string }) {
  const denominator = Math.max(1, d)
  const numerator = Math.max(0, Math.min(n, denominator))
  const segments = Array.from({ length: denominator })

  return (
    <div>
      <p className="mb-1 text-xs font-semibold text-[#4B5563]">{label}</p>
      <div className="grid grid-flow-col gap-1">
        {segments.map((_, i) => (
          <div key={i} className={`h-7 rounded ${i < numerator ? color : 'bg-[#E5E7EB]'}`} />
        ))}
      </div>
    </div>
  )
}

function detectLabType(problem: string, solution: Solution): LabType {
  const text = `${problem} ${solution.co_vieme} ${solution.hladame} ${solution.kroky.map((k) => `${k.nazov} ${k.vysvetlenie} ${k.matematika}`).join(' ')}`.toLowerCase()

  if (/(=).*[xk]|[xk].*=/.test(text)) return 'equation'
  if (/\d+\s*\/\s*\d+|zlomk/.test(text)) return 'fraction'
  if (/trojuhol|štvorec|obdĺž|lichobe|obvod|obsah|geometr/.test(text)) return 'geometry'
  return 'general'
}

function labelForType(type: LabType) {
  if (type === 'equation') return 'Rovnica'
  if (type === 'fraction') return 'Zlomky'
  if (type === 'geometry') return 'Geometria'
  return 'Čísla'
}

function parseLinearEquation(input: string) {
  const clean = input.replace(/\s+/g, '')
  const parts = clean.split('=')
  if (parts.length !== 2) return null

  const left = parseLinearSide(parts[0])
  const right = parseLinearSide(parts[1])
  if (!left || !right) return null

  return {
    raw: `${parts[0]} = ${parts[1]}`,
    leftA: left.a,
    leftB: left.b,
    rightA: right.a,
    rightB: right.b,
  }
}

function parseLinearSide(side: string) {
  const normalized = side.replace(/-/g, '+-')
  const terms = normalized.split('+').filter(Boolean)
  if (terms.length === 0) return null

  let a = 0
  let b = 0
  for (const term of terms) {
    if (/[xk]/i.test(term)) {
      const coef = term.replace(/[xk]/gi, '')
      if (coef === '' || coef === '+') a += 1
      else if (coef === '-') a -= 1
      else a += Number(coef)
    } else {
      b += Number(term)
    }
  }
  if (Number.isNaN(a) || Number.isNaN(b)) return null
  return { a, b }
}

function extractFractions(input: string) {
  return Array.from(input.matchAll(/(\d+)\s*\/\s*(\d+)/g)).map((m) => ({
    n: Number(m[1]),
    d: Number(m[2]),
  }))
}

function round2(value: number) {
  return Math.round(value * 100) / 100
}
