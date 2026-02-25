'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2 } from 'react-feather'

type QuadType = 'square' | 'rectangle' | 'parallelogram' | 'trapezoid'

export default function QuadrilateralLab() {
    const [type, setType] = useState<QuadType>('parallelogram')
    const [skew, setSkew] = useState(30)
    const [ratio, setRatio] = useState(1.5)

    const renderShape = () => {
        const size = 100
        const w = size * ratio
        const h = size

        let points = ""
        if (type === 'square') {
            points = `50,50 150,50 150,150 50,150`
        } else if (type === 'rectangle') {
            points = `50,75 ${50 + w},75 ${50 + w},175 50,175`
        } else if (type === 'parallelogram') {
            const offset = Math.tan(skew * Math.PI / 180) * h * 0.5
            points = `${50 + offset},75 ${50 + w + offset},75 ${50 + w - offset},175 ${50 - offset},175`
        } else if (type === 'trapezoid') {
            points = `80,75 220,75 270,175 30,175`
        }

        return (
            <motion.polygon
                animate={{ points }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                fill="var(--brand-primary)" fillOpacity="0.1"
                stroke="var(--brand-primary)" strokeWidth="3" strokeLinejoin="round"
            />
        )
    }

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[var(--brand-soft)]">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Štvoruholníky</h3>
                <span className="text-xs font-bold text-[#4338CA] bg-[#4338CA]/10 px-2 py-1 rounded">Druhy a tvary</span>
            </div>

            <div className="flex bg-[#F1F5F9] p-1 rounded-xl gap-1">
                {(['square', 'rectangle', 'parallelogram', 'trapezoid'] as QuadType[]).map(t => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${type === t ? 'bg-white text-[var(--brand-primary)] shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
                    >
                        {labelFor(t)}
                    </button>
                ))}
            </div>

            <div className="relative h-[220px] w-full bg-[#F8FAFF] rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
                <svg viewBox="0 0 300 220" className="w-full h-full">
                    {renderShape()}

                    {/* Symbolic Angles or Labels could go here */}
                    {(type === 'parallelogram' || type === 'rectangle') && (
                        <text x="150" y="200" textAnchor="middle" className="text-[10px] fill-gray-400 font-medium italic">
                            Protiľahlé strany sú rovnobežné
                        </text>
                    )}
                </svg>
            </div>

            <div className="space-y-4">
                {(type === 'parallelogram' || type === 'rectangle') && (
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span>Pomer strán (a:b):</span>
                            <span>{ratio.toFixed(1)} : 1</span>
                        </div>
                        <input
                            type="range" min="0.5" max="2.5" step="0.1" value={ratio}
                            onChange={(e) => setRatio(parseFloat(e.target.value))}
                            className="w-full accent-[var(--brand-primary)]"
                        />
                    </div>
                )}

                {type === 'parallelogram' && (
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-1 text-[var(--brand-accent)]">
                            <span>Uhol sklonu:</span>
                            <span>{skew}°</span>
                        </div>
                        <input
                            type="range" min="0" max="60" value={skew}
                            onChange={(e) => setSkew(Number(e.target.value))}
                            className="w-full accent-[var(--brand-accent)]"
                        />
                    </div>
                )}

                <div className="bg-[#EEF2FF] p-3 rounded-xl border border-[#C7D2FE]">
                    <p className="text-[12px] font-bold text-[#4338CA] mb-1 flex items-center gap-2">
                        <Maximize2 size={14} /> {labelFor(type)}
                    </p>
                    <p className="text-[11px] text-[#4B5563] leading-tight">
                        {descFor(type)}
                    </p>
                </div>
            </div>
        </div>
    )
}

function labelFor(t: QuadType) {
    switch (t) {
        case 'square': return 'Štvorec'
        case 'rectangle': return 'Obdĺžnik'
        case 'parallelogram': return 'Kosodĺžnik'
        case 'trapezoid': return 'Lichobežník'
    }
}

function descFor(t: QuadType) {
    switch (t) {
        case 'square': return 'Všetky strany sú zhodné a všetky uhly sú pravé (90°).'
        case 'rectangle': return 'Susedné strany sú kolmé, protiľahlé strany sú zhodné.'
        case 'parallelogram': return 'Protiľahlé strany sú rovnobežné a zhodné. Uhly nemusia byť pravé.'
        case 'trapezoid': return 'Práve dve strany (základne) sú rovnobežné.'
    }
}
