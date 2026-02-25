'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SolutionStep } from '@/lib/types'
import { PenTool } from 'react-feather'

interface ConstructionLabProps {
    steps: SolutionStep[]
}

export default function ConstructionLab({ steps }: ConstructionLabProps) {
    const [currentStep, setCurrentStep] = useState(0)

    // Extract construction actions from step text
    const actions = steps.map(step => {
        const text = step.vysvetlenie.toLowerCase()
        if (text.includes('narysuj úsečku') || text.includes('základňu')) return 'ruler'
        if (text.includes('kružidlom') || text.includes('oblúk')) return 'compass'
        if (text.includes('pravý uhol') || text.includes('kolmicu')) return 'protracted'
        return 'pencil'
    })

    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-3xl shadow-[var(--shadow-card)] border-2 border-[var(--brand-soft)]">
            <div className="flex justify-between items-center bg-[var(--bg-surface-2)] -m-6 mb-4 p-6 rounded-t-3xl border-b border-[var(--brand-soft)]">
                <div>
                    <h3 className="font-bold text-xl text-[var(--text-primary)]">Konštrukčné Laboratórium</h3>
                    <p className="text-xs text-[var(--text-muted)]">Sleduj, ako sa postupne rysuje tvoj príklad.</p>
                </div>
            </div>

            <div className="relative h-64 w-full bg-[#FAFAFA] rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <svg viewBox="0 0 400 240" className="w-full h-full">
                    {/* Simplified geometry progression */}
                    <AnimatePresence mode="wait">
                        <motion.g key={currentStep}>
                            {currentStep >= 0 && (
                                <line x1="100" y1="180" x2="300" y2="180" stroke="#CBD5E1" strokeWidth="2" />
                            )}
                            {currentStep >= 1 && (
                                <motion.path
                                    d="M 120,180 A 100,100 0 0 1 200,80"
                                    fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 2"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                />
                            )}
                            {currentStep >= 2 && (
                                <motion.path
                                    d="M 280,180 A 100,100 0 0 0 200,80"
                                    fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 2"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                />
                            )}
                            {currentStep >= 3 && (
                                <motion.path
                                    d="M 100,180 L 200,80 L 300,180 Z"
                                    fill="var(--brand-primary)" fillOpacity="0.05"
                                    stroke="var(--brand-primary)" strokeWidth="3"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                />
                            )}
                        </motion.g>
                    </AnimatePresence>

                    {/* "Ghost" Tool */}
                    <motion.g
                        animate={{
                            x: actions[currentStep] === 'ruler' ? 200 : 150,
                            y: actions[currentStep] === 'compass' ? 80 : 180,
                            rotate: actions[currentStep] === 'compass' ? 15 : 0
                        }}
                        className="pointer-events-none"
                    >
                        <circle cx="0" cy="0" r="4" fill="var(--brand-accent)" />
                        <rect x="-2" y="0" width="4" height="40" fill="gray" fillOpacity="0.2" />
                        <text x="10" y="5" className="text-[10px] italic fill-gray-400 font-bold uppercase tracking-widest">
                            {actions[currentStep]}
                        </text>
                    </motion.g>
                </svg>
            </div>

            <div className="space-y-4">
                <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                    {steps.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentStep(i)}
                            className={`shrink-0 w-8 h-8 rounded-full font-black text-xs transition-all ${currentStep === i ? 'bg-[var(--brand-primary)] text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <div className="bg-[var(--bg-canvas)] p-4 rounded-2xl border-2 border-[var(--brand-soft)]">
                    <p className="text-[10px] uppercase font-black text-[var(--brand-primary)] mb-1">Inštrukcia:</p>
                    <p className="text-[13px] font-bold text-[var(--text-primary)] leading-snug">
                        {steps[currentStep]?.vysvetlenie}
                    </p>
                </div>
            </div>
        </div>
    )
}
