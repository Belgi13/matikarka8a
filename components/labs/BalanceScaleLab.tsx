'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sliders, HelpCircle } from 'react-feather'

interface BalanceScaleProps {
  leftA: number
  leftB: number
  rightA: number
  rightB: number
  variable?: string
  initialX?: number
}

export default function BalanceScaleLab({
  leftA, leftB,
  rightA, rightB,
  variable = 'x',
  initialX = 1
}: BalanceScaleProps) {
  const [x, setX] = useState(initialX)

  const leftWeight = leftA * x + leftB
  const rightWeight = rightA * x + rightB

  const diff = leftWeight - rightWeight
  const tiltAngle = Math.max(-15, Math.min(15, -diff * 1.5))

  const isBalanced = Math.abs(leftWeight - rightWeight) < 0.05

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-3xl shadow-[var(--shadow-card)] border-2 border-[var(--brand-soft)]">
      <div className="flex justify-between items-center bg-[var(--bg-surface-2)] -m-6 mb-4 p-6 rounded-t-3xl border-b border-[var(--brand-soft)]">
        <div>
          <h3 className="font-bold text-xl text-[var(--text-primary)]">Matematické váhy</h3>
          <p className="text-xs text-[var(--text-muted)]">Rovnica je ako rovnováha na váhach.</p>
        </div>
        <div className={`px-4 py-2 rounded-2xl text-sm font-black uppercase tracking-wider transition-colors ${isBalanced ? 'bg-[var(--success)] text-white' : 'bg-[var(--brand-accent)] text-white'}`}>
          {isBalanced ? 'ROVNOVÁHA!' : 'HĽADAJ BALANS'}
        </div>
      </div>

      {/* The Equation Display */}
      <div className="flex justify-center items-center gap-4 text-2xl font-black bg-[var(--bg-canvas)] p-5 rounded-2xl border-2 border-[var(--brand-soft)] shadow-inner">
        <motion.div animate={{ scale: isBalanced ? 1.05 : 1 }} className="text-[var(--brand-primary)]">
          {leftA !== 0 && `${leftA}${variable}`} {leftB !== 0 && `${leftB > 0 ? '+' : '-'} ${Math.abs(leftB)}`}
        </motion.div>
        <span className={`transition-all duration-500 ${isBalanced ? 'scale-150 rotate-0 text-[var(--success)]' : 'scale-100 opacity-50'}`}>=</span>
        <motion.div animate={{ scale: isBalanced ? 1.05 : 1 }} className="text-[var(--brand-accent)]">
          {rightA !== 0 && `${rightA}${variable}`} {rightB !== 0 && `${rightB > 0 ? '+' : '-'} ${Math.abs(rightB)}`}
        </motion.div>
      </div>

      <div className="relative h-72 w-full flex items-center justify-center pt-16 mt-8">
        {/* Scale Base */}
        <div className="absolute bottom-0 w-48 h-6 bg-gray-300 rounded-t-2xl shadow-sm" />
        <div className="absolute bottom-6 w-6 h-48 bg-gray-400 rounded-lg" />
        <div className="absolute top-20 w-12 h-12 bg-gray-500 rounded-full border-4 border-white shadow-md z-10" />

        {/* Moving Scale Beam */}
        <motion.div
          className="relative w-full h-3 flex items-center justify-center z-0"
          animate={{ rotate: tiltAngle }}
          transition={{ type: 'spring', stiffness: 40, damping: 12 }}
        >
          {/* Main Beam */}
          <div className="w-[94%] h-full bg-gray-700 rounded-full shadow-lg" />

          {/* Left Pan */}
          <div className="absolute left-[3%] top-0 flex flex-col items-center">
            <div className="w-1 h-20 bg-gray-500" />
            <div className="w-40 h-6 bg-gray-400 rounded-b-3xl relative shadow-md">
              <PanelContent val={leftWeight} color="var(--brand-primary)" title={`Ľavá: ${leftWeight.toFixed(1)}`} />
            </div>
          </div>

          {/* Right Pan */}
          <div className="absolute right-[3%] top-0 flex flex-col items-center">
            <div className="w-1 h-20 bg-gray-500" />
            <div className="w-40 h-6 bg-gray-400 rounded-b-3xl relative shadow-md">
              <PanelContent val={rightWeight} color="var(--brand-accent)" title={`Pravá: ${rightWeight.toFixed(1)}`} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-[var(--bg-canvas)] p-6 rounded-2xl border-2 border-[var(--brand-soft)] shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-md font-black flex items-center gap-2 text-[var(--text-primary)]">
            <Sliders size={20} className="text-[var(--brand-primary)]" /> Meň hodnotu {variable}:
          </span>
          <div className="bg-white px-4 py-1 rounded-full border-2 border-[var(--brand-soft)] font-black text-xl text-[var(--brand-primary)]">
            {variable} = {x}
          </div>
        </div>
        <input
          type="range"
          min="-10"
          max="20"
          step="0.5"
          value={x}
          onChange={(e) => setX(parseFloat(e.target.value))}
          className="w-full h-4 bg-gray-200 rounded-xl appearance-none cursor-pointer accent-[var(--brand-primary)]"
        />
        <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 px-1">
          <span>-10</span>
          <span>-5</span>
          <span>0</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>

      <div className="flex gap-2 items-start bg-blue-50 p-4 rounded-2xl border border-blue-100">
        <HelpCircle size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Tip pre teba:</strong> Bloky 🟦 predstavujú číslo, ktoré hľadáme ({variable}). <br />
          Menej ako nula? Vtedy sa objavia 🎈 <strong>balóniky</strong>, ktoré váhu nadľahčujú!
        </p>
      </div>
    </div>
  )
}

function PanelContent({ val, color, title }: { val: number, color: string, title: string }) {
  const isNegative = val < 0
  const absVal = Math.abs(val)
  const count = Math.min(12, Math.floor(absVal))

  return (
    <div className="absolute -top-16 left-0 right-0 h-16 flex flex-wrap justify-center content-end gap-1.5 px-2">
      <AnimatePresence>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            layout
            initial={{ scale: 0, y: isNegative ? 20 : -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            className={`w-5 h-5 rounded-md shadow-sm border border-black/10 flex items-center justify-center`}
            style={{
              backgroundColor: color,
              boxShadow: isNegative ? '0 0 10px rgba(255,255,255,0.8)' : 'none'
            }}
          >
            {isNegative && <span className="text-[14px]">🎈</span>}
          </motion.div>
        ))}
        {absVal > 0 && absVal < 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 0.7 }}
            className="w-5 h-5 rounded-md opacity-70"
            style={{ backgroundColor: color }}
          />
        )}
      </AnimatePresence>
      <div className="absolute -top-5 left-0 right-0 text-center text-[10px] font-black uppercase text-gray-500 tracking-tighter">
        {title}
      </div>
    </div>
  )
}
