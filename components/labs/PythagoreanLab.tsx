'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PythagoreanLab() {
    const [a, setA] = useState(3)
    const [b, setB] = useState(4)

    const c = Math.sqrt(a * a + b * b)
    const scale = 25 // pixels per unit

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[var(--brand-soft)]">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Pytagorova veta</h3>
                <span className="text-xs font-bold text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-2 py-1 rounded">Vizuálny dôkaz</span>
            </div>

            <div className="flex justify-center items-center gap-4 text-xl font-mono bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--brand-soft)] overflow-hidden">
                <span className="text-[#4338CA] font-bold">{a}²</span>
                <span>+</span>
                <span className="text-[#F97316] font-bold">{b}²</span>
                <span>=</span>
                <span className="text-[#10B981] font-bold">{c.toFixed(2)}²</span>
            </div>

            <div className="relative h-[300px] w-full flex items-center justify-center">
                <svg
                    viewBox={`0 0 400 400`}
                    className="w-full h-full max-w-[350px]"
                    style={{ overflow: 'visible' }}
                >
                    {/* The Triangle */}
                    <motion.path
                        d={`M 200,200 L 200,${200 - a * scale} L ${200 + b * scale},200 Z`}
                        fill="#EEF2FF"
                        stroke="#4F46E5"
                        strokeWidth="2"
                    />

                    {/* Square a^2 */}
                    <motion.rect
                        x={200 - a * scale}
                        y={200 - a * scale}
                        width={a * scale}
                        height={a * scale}
                        fill="#4338CA"
                        fillOpacity="0.2"
                        stroke="#4338CA"
                        strokeWidth="1"
                        animate={{ width: a * scale, height: a * scale, x: 200 - a * scale, y: 200 - a * scale }}
                    />
                    <text x={200 - (a * scale) / 2} y={200 - (a * scale) / 2} textAnchor="middle" className="text-[10px] fill-[#4338CA] font-bold">a²={a * a}</text>

                    {/* Square b^2 */}
                    <motion.rect
                        x={200}
                        y={200}
                        width={b * scale}
                        height={b * scale}
                        fill="#F97316"
                        fillOpacity="0.2"
                        stroke="#F97316"
                        strokeWidth="1"
                        animate={{ width: b * scale, height: b * scale }}
                    />
                    <text x={200 + (b * scale) / 2} y={200 + (b * scale) / 2} textAnchor="middle" className="text-[10px] fill-[#F97316] font-bold">b²={b * b}</text>

                    {/* Square c^2 (Hypotenuse) */}
                    {/* Needs rotation matrix math for CSS or SVG transform */}
                    <motion.rect
                        width={c * scale}
                        height={c * scale}
                        fill="#10B981"
                        fillOpacity="0.2"
                        stroke="#10B981"
                        strokeWidth="1"
                        style={{
                            transformOrigin: '200px 200px',
                            transform: `translate(${200}px, ${200 - a * scale}px) rotate(${-Math.atan2(a, b) * (180 / Math.PI)}deg) translate(0, -${c * scale}px)`
                        }}
                        animate={{ width: c * scale, height: c * scale }}
                    />

                    {/* Labels for sides */}
                    <text x={190} y={200 - (a * scale) / 2} textAnchor="end" className="text-xs font-bold font-sans">a={a}</text>
                    <text x={200 + (b * scale) / 2} y={215} textAnchor="middle" className="text-xs font-bold font-sans">b={b}</text>
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--brand-soft)]">
                    <label className="text-xs font-bold text-[#4338CA] mb-1 block">Strana a (výška)</label>
                    <input
                        type="range" min="1" max="8" step="0.1" value={a}
                        onChange={(e) => setA(parseFloat(e.target.value))}
                        className="w-full accent-[#4338CA]"
                    />
                </div>
                <div className="bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--brand-soft)]">
                    <label className="text-xs font-bold text-[var(--brand-accent)] mb-1 block">Strana b (základňa)</label>
                    <input
                        type="range" min="1" max="8" step="0.1" value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                        className="w-full accent-[var(--brand-accent)]"
                    />
                </div>
            </div>
        </div>
    )
}
