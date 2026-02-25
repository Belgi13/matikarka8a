'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export default function CircleLab({ initialR = 50 }: { initialR?: number }) {
    const [r] = useState(initialR) // Represents radius
    const [unroll, setUnroll] = useState(0) // 0 to 1, controls the unrolling animation

    const circumference = 2 * Math.PI * r
    const displayScale = useMemo(() => 80 / (r || 1), [r])
    const scaledR = r * displayScale

    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-3xl shadow-[var(--shadow-card)] border-2 border-[var(--brand-soft)]">
            <div className="flex justify-between items-center bg-[var(--bg-surface-2)] -m-6 mb-4 p-6 rounded-t-3xl border-b border-[var(--brand-soft)] text-[var(--text-primary)]">
                <div>
                    <h3 className="font-bold text-xl">Kruh a jeho časti</h3>
                    <p className="text-xs text-[var(--text-muted)]">Pomer obvodu k priemeru je vždy π (3,14).</p>
                </div>
            </div>

            <div className="relative h-60 w-full bg-[var(--bg-canvas)] rounded-2xl border-2 border-[var(--brand-soft)] overflow-hidden">
                <svg viewBox="0 0 400 240" className="w-full h-full">
                    <line x1="50" y1="200" x2="350" y2="200" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" />

                    <motion.g
                        animate={{
                            x: (circumference * displayScale) * unroll,
                            rotate: unroll * 360
                        }}
                        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                    >
                        <circle
                            cx="100" cy={200 - scaledR} r={scaledR}
                            fill="var(--brand-primary)" fillOpacity="0.1"
                            stroke="var(--brand-primary)" strokeWidth="3"
                        />
                        <line x1="100" y1={200 - scaledR} x2="100" y2={200 - (2 * scaledR)} stroke="var(--brand-primary)" strokeWidth="2" />
                        <text x="105" y={200 - scaledR * 1.5} className="text-[12px] fill-[var(--brand-primary)] font-black">r = {r.toFixed(1)}</text>
                        <circle cx="100" cy="200" r="4" fill="var(--brand-primary)" />
                    </motion.g>

                    <motion.line
                        x1="100" y1="202"
                        x2={100 + (circumference * displayScale * unroll)} y2="202"
                        stroke="var(--brand-accent)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    {unroll > 0.1 && (
                        <motion.text
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            x={100 + (circumference * displayScale * unroll / 2)} y="222"
                            textAnchor="middle"
                            className="text-[14px] font-black fill-[var(--brand-accent)]"
                        >
                            obvod ≈ {(circumference * unroll).toFixed(1)}
                        </motion.text>
                    )}
                </svg>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-black text-[var(--text-primary)]">Odvinutie kruhu:</span>
                        <span className="bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] px-3 py-1 rounded-full text-xs font-black">
                            {Math.round(unroll * 100)}%
                        </span>
                    </div>
                    <input
                        type="range" min="0" max="1" step="0.01" value={unroll}
                        onChange={(e) => setUnroll(parseFloat(e.target.value))}
                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[var(--brand-accent)]"
                    />
                </div>

                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold shrink-0">π</div>
                    <p className="text-[11px] text-orange-800 leading-tight">
                        <strong>Matematické kúzlo:</strong> Ak by si kruh rozstrihol a vystrel, bude presne <strong>3,14-krát</strong> dlhší ako jeho priemer. Toto číslo voláme <strong>Pí</strong>.
                    </p>
                </div>
            </div>
        </div>
    )
}
