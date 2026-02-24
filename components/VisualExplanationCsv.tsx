'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { SolutionStep } from '@/lib/types'

interface Props {
  steps: SolutionStep[]
}

export default function VisualExplanationCsv({ steps }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="mt-4 rounded-2xl border border-[#C7D2FE] bg-[#0f172a] text-[#e2e8f0] overflow-hidden shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-[#334155] px-4 py-2 text-xs font-semibold">
        <span>vizualne-riesenie.csv</span>
        <span className="text-[#94a3b8]">live preview</span>
      </div>
      <div className="px-4 py-3 text-[13px] leading-6 font-mono overflow-x-auto">
        <div className="min-w-[560px] text-[#93c5fd]">krok,nazov,vysvetlenie,matematika</div>
        {steps.map((step, i) => (
          <motion.div
            key={`${step.nazov}-${i}`}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : i * 0.12, duration: 0.22, ease: 'easeOut' }}
            className="min-w-[560px] border-b border-[#1e293b]/80 last:border-b-0"
          >
            {`${i + 1},"${escapeField(step.nazov)}","${escapeField(step.vysvetlenie)}","${escapeField(step.matematika)}"`}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function escapeField(value: string) {
  return value.replaceAll('"', '""')
}
