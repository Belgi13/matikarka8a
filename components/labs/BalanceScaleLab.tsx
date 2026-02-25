'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sliders } from 'react-feather'

interface BalanceScaleProps {
  leftA: number
  leftB: number
  rightA: number
  rightB: number
  initialX?: number
}

export default function BalanceScaleLab({ leftA, leftB, rightA, rightB, initialX = 0 }: BalanceScaleProps) {
  const [x, setX] = useState(initialX)

  const leftWeight = leftA * x + leftB
  const rightWeight = rightA * x + rightB
  
  // Calculate tilt angle: simple linear mapping for visualization
  // If left is heavier, angle is negative (tips left)
  const diff = leftWeight - rightWeight
  const tiltAngle = Math.max(-15, Math.min(15, -diff * 2)) 
  
  const isBalanced = Math.abs(leftWeight - rightWeight) < 0.01

  return (
    <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[var(--brand-soft)]">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-[var(--text-primary)]">Váhy rovnosti</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${isBalanced ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]'}`}>
          {isBalanced ? 'ROVNOVÁHA!' : 'NEROVNOVÁHA'}
        </div>
      </div>

      {/* The Equation Display */}
      <div className="flex justify-center items-center gap-2 text-xl font-mono bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--brand-soft)]">
        <span className="text-[var(--brand-primary)] font-bold">{leftA}x {leftB >= 0 ? '+' : '-'} {Math.abs(leftB)}</span>
        <span className={`transition-transform duration-300 ${isBalanced ? 'scale-125' : ''}`}>=</span>
        <span className="text-[var(--brand-accent)] font-bold">{rightA}x {rightB >= 0 ? '+' : '-'} {Math.abs(rightB)}</span>
      </div>

      <div className="relative h-64 w-full flex items-center justify-center pt-10">
        {/* Scale Base */}
        <div className="absolute bottom-0 w-32 h-4 bg-gray-300 rounded-t-lg" />
        <div className="absolute bottom-4 w-4 h-40 bg-gray-400" />

        {/* Moving Scale Beam */}
        <motion.div 
          className="relative w-full h-2 flex items-center justify-center"
          animate={{ rotate: tiltAngle }}
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
        >
          {/* Beam */}
          <div className="w-[90%] h-full bg-gray-600 rounded-full" />
          
          {/* Left Pan */}
          <div className="absolute left-[5%] top-0 flex flex-col items-center">
            <div className="w-0.5 h-16 bg-gray-500" />
            <div className="w-32 h-4 bg-gray-400 rounded-b-xl relative">
              <div className="absolute -top-12 left-0 right-0 flex flex-wrap justify-center content-end gap-1 px-1 h-12">
                   {/* Visual cubes for weight */}
                   <WeightDisplay val={leftWeight} color="var(--brand-primary)" />
              </div>
            </div>
            <div className="mt-2 text-sm font-bold text-[var(--brand-primary)]">{leftWeight.toFixed(1)}</div>
          </div>

          {/* Right Pan */}
          <div className="absolute right-[5%] top-0 flex flex-col items-center">
            <div className="w-0.5 h-16 bg-gray-500" />
            <div className="w-32 h-4 bg-gray-400 rounded-b-xl relative">
              <div className="absolute -top-12 left-0 right-0 flex flex-wrap justify-center content-end gap-1 px-1 h-12">
                   <WeightDisplay val={rightWeight} color="var(--brand-accent)" />
              </div>
            </div>
            <div className="mt-2 text-sm font-bold text-[var(--brand-accent)]">{rightWeight.toFixed(1)}</div>
          </div>
        </motion.div>
      </div>

      <div className="bg-[var(--bg-canvas)] p-4 rounded-xl border border-[var(--brand-soft)]">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold flex items-center gap-2"><Sliders size={16}/> Hľadaj hodnotu x:</span>
            <span className="text-lg font-bold text-[var(--brand-primary)]">x = {x}</span>
        </div>
        <input 
          type="range" 
          min="-10" 
          max="20" 
          step="0.5"
          value={x}
          onChange={(e) => setX(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)]"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>-10</span>
            <span>0</span>
            <span>10</span>
            <span>20</span>
        </div>
      </div>
    </div>
  )
}

function WeightDisplay({ val, color }: { val: number, color: string }) {
    // Generate some blocks to represent the value
    const count = Math.max(1, Math.min(15, Math.floor(Math.abs(val))))
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div 
                    key={i}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 rounded-sm shadow-sm"
                    style={{ backgroundColor: color }}
                />
            ))}
            {val < 0 && <span className="text-[10px] font-bold text-red-500">ZÁPORNÉ!</span>}
        </>
    )
}
