'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'react-feather'
import { Solution, SolutionStep } from '@/lib/types'
import VisualExplanationCsv from './VisualExplanationCsv'
import BalanceScaleLab from './labs/BalanceScaleLab'
import PythagoreanLab from './labs/PythagoreanLab'
import CircleLab from './labs/CircleLab'
import PrismLab from './labs/PrismLab'
import ConstructionLab from './labs/ConstructionLab'
import { parseEquation, extractGeometry } from '@/lib/mathParser'

type ViewMode = 'interactive' | 'csv'
type LabType = 'equation' | 'geometry' | 'pythagoras' | 'circle' | 'prism' | 'general'

function detectLabType(problem: string, solution: Solution): LabType {
  const text = (problem + ' ' + (solution.odpoved || '')).toLowerCase()

  if (/vypočítaj.*=/.test(text) || /rovnic/.test(text)) return 'equation'
  if (/pytagoro|prepona|odvesna/.test(text)) return 'pythagoras'
  if (/kruh|polomer|priemer|obvod.*kruhu/.test(text)) return 'circle'
  if (/hranol|ihlan|objem|povrch/.test(text)) return 'prism'
  if (/trojuholník|štvoruholník|lichobežník|obvod|obsah|zostroj/.test(text)) return 'geometry'

  return 'general'
}

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

  const equationParams = useMemo(() => parseEquation(problem), [problem])
  const geoParams = useMemo(() => extractGeometry(problem), [problem])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
            <Zap size={18} />
          </div>
          <span className="text-sm font-bold text-[var(--text-primary)]">
            {labType === 'equation' ? 'Simulácia Rovnice' : 'Vizuálne Laboratórium'}
          </span>
        </div>
        <div className="flex bg-[var(--bg-surface-2)] p-1 rounded-xl gap-1 border border-white/50">
          <button
            onClick={() => setMode('interactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'interactive' ? 'bg-white text-[var(--brand-primary)] shadow-sm' : 'text-[var(--text-muted)] hover:bg-white/50'}`}
          >
            Interaktívne
          </button>
          <button
            onClick={() => setMode('csv')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'csv' ? 'bg-white text-[var(--brand-primary)] shadow-sm' : 'text-[var(--text-muted)] hover:bg-white/50'}`}
          >
            Postup
          </button>
        </div>
      </div>

      {mode === 'csv' ? (
        <VisualExplanationCsv steps={steps} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {labType === 'equation' && equationParams && (
            <BalanceScaleLab
              leftA={equationParams.leftA}
              leftB={equationParams.leftB}
              rightA={equationParams.rightA}
              rightB={equationParams.rightB}
              variable={equationParams.variable}
            />
          )}
          {labType === 'pythagoras' && (
            <PythagoreanLab
              initialA={geoParams.a || 3}
              initialB={geoParams.b || 4}
            />
          )}
          {labType === 'circle' && (
            <CircleLab
              initialR={geoParams.r || (geoParams.d ? geoParams.d / 2 : 50)}
            />
          )}
          {labType === 'prism' && <PrismLab />}
          {labType === 'geometry' && <ConstructionLab steps={steps} />}
          {labType === 'general' && (
            <div className="p-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-sm text-gray-400 font-bold italic">K tomuto príkladu zatiaľ nemáme interaktívnu simuláciu, ale pozri si postup!</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
