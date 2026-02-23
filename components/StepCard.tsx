'use client'

import { motion } from 'framer-motion'
import type { SolutionStep } from '@/lib/types'

interface Props {
  step: SolutionStep
  stepNumber: number
  dimmed?: boolean
}

export default function StepCard({ step, stepNumber, dimmed = false }: Props) {
  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: dimmed ? 0.45 : 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="w-9 h-9 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          {stepNumber}
        </span>
        <h3 className="text-[18px] font-semibold text-[#111827] leading-tight">{step.nazov}</h3>
      </div>
      <p className="text-[18px] leading-[1.8] text-[#374151] mb-4">{step.vysvetlenie}</p>
      {step.matematika && (
        <div className="bg-[#EFF6FF] rounded-xl p-4">
          <p className="text-[20px] font-mono text-[#1E40AF] leading-relaxed break-words">{step.matematika}</p>
        </div>
      )}
    </motion.div>
  )
}
