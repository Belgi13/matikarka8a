'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CircleLab() {
    const [r, setR] = useState(50)
    const [unroll, setUnroll] = useState(0) // 0 to 1

    const circumference = 2 * Math.PI * r

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[var(--brand-soft)]">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Kruh a π (Pí)</h3>
                <span className="text-xs font-bold text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded">Geometria</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-[var(--bg-canvas)] p-2 rounded-lg border border-[var(--brand-soft)]">
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Obvod (o)</div>
                    <div className="text-sm font-bold text-[var(--brand-primary)]">{(2 * Math.PI * (r / 10)).toFixed(2)} cm</div>
                </div>
                <div className="bg-[var(--bg-canvas)] p-2 rounded-lg border border-[var(--brand-soft)]">
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Obsah (S)</div>
                    <div className="text-sm font-bold text-[var(--brand-accent)]">{(Math.PI * Math.pow(r / 10, 2)).toFixed(2)} cm²</div>
                </div>
            </div>

            <div className="relative h-64 w-full flex flex-col items-center justify-center overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                    {/* Ground line */}
                    <line x1="50" y1="150" x2="350" y2="150" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />

                    {/* The "Unrolled" line */}
                    <motion.line
                        x1="100" y1="152"
                        x2={100 + (circumference * unroll)} y2="152"
                        stroke="var(--brand-primary)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    {/* The Circle */}
                    <motion.g
                        animate={{
                            x: circumference * unroll,
                            rotate: unroll * 360
                        }}
                    >
                        <circle
                            cx="100" cy={150 - r} r={r}
                            fill="var(--brand-primary)" fillOpacity="0.1"
                            stroke="var(--brand-primary)" strokeWidth="3"
                        />
                        {/* Radius line */}
                        <line x1="100" y1={150 - r} x2="100" y2={150 - (2 * r)} stroke="var(--brand-primary)" strokeWidth="2" />
                        <text x="105" y={150 - r * 1.5} className="text-[10px] fill-[var(--brand-primary)] font-bold">r</text>

                        {/* Mark on the circle edge to see rotation */}
                        <circle cx="100" cy="150" r="4" fill="var(--brand-primary)" />
                    </motion.g>

                    {unroll > 0.1 && (
                        <text x={100 + (circumference * unroll) / 2} y="175" textAnchor="middle" className="text-[12px] font-bold fill-[var(--brand-primary)]">
                            o = 2 · π · r
                        </text>
                    )}
                </svg>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Veľkosť polomeru (r):</span>
                        <span>{(r / 10).toFixed(1)} cm</span>
                    </div>
                    <input
                        type="range" min="20" max="70" value={r}
                        onChange={(e) => setR(Number(e.target.value))}
                        className="w-full accent-[var(--brand-primary)]"
                    />
                </div>
                <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Odvaľovanie kruhu:</span>
                        <span>{Math.round(unroll * 100)}%</span>
                    </div>
                    <input
                        type="range" min="0" max="1" step="0.01" value={unroll}
                        onChange={(e) => setUnroll(parseFloat(e.target.value))}
                        className="w-full accent-[#F97316]"
                    />
                    <p className="text-[10px] text-gray-400 mt-1 italic text-center">
                        Skús odvaliť kruh, aby si videl ako jeho obvod tvorí priamku!
                    </p>
                </div>
            </div>
        </div>
    )
}
