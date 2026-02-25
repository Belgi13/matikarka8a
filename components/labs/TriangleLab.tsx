'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Info } from 'react-feather'

export default function TriangleLab() {
    const [v, setV] = useState({
        A: { x: 100, y: 50 },
        B: { x: 50, y: 200 },
        C: { x: 250, y: 200 },
    })

    const [showAltitudes, setShowAltitudes] = useState(false)
    const [showMedians, setShowMedians] = useState(true)

    const svgRef = useRef<SVGSVGElement>(null)

    const handleDrag = (point: 'A' | 'B' | 'C', _event: MouseEvent | TouchEvent | PointerEvent, info: { delta: { x: number, y: number } }) => {
        setV(prev => ({
            ...prev,
            [point]: {
                x: Math.max(20, Math.min(280, prev[point].x + info.delta.x)),
                y: Math.max(20, Math.min(230, prev[point].y + info.delta.y))
            }
        }))
    }

    // Midpoints
    const M_ab = { x: (v.A.x + v.B.x) / 2, y: (v.A.y + v.B.y) / 2 }
    const M_bc = { x: (v.B.x + v.C.x) / 2, y: (v.B.y + v.C.y) / 2 }
    const M_ca = { x: (v.C.x + v.A.x) / 2, y: (v.C.y + v.A.y) / 2 }

    // Centroid (Ťažisko)
    const T = {
        x: (v.A.x + v.B.x + v.C.x) / 3,
        y: (v.A.y + v.B.y + v.C.y) / 3
    }

    // Altitudes (simplified for visual representation)
    // For altitude from A to BC, we need the foot of the perpendicular
    const getPerpFoot = (p: { x: number, y: number }, l1: { x: number, y: number }, l2: { x: number, y: number }) => {
        const dx = l2.x - l1.x
        const dy = l2.y - l1.y
        if (dx === 0 && dy === 0) return l1
        const t = ((p.x - l1.x) * dx + (p.y - l1.y) * dy) / (dx * dx + dy * dy)
        return { x: l1.x + t * dx, y: l1.y + t * dy }
    }

    const F_a = getPerpFoot(v.A, v.B, v.C)
    const F_b = getPerpFoot(v.B, v.A, v.C)
    const F_c = getPerpFoot(v.C, v.A, v.B)

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[var(--brand-soft)]">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Trojuholník</h3>
                <span className="text-xs font-bold text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-2 py-1 rounded">Vlastnosti</span>
            </div>

            <div className="relative h-[250px] w-full bg-[#F8FAFF] rounded-xl border border-dashed border-gray-200 overflow-hidden touch-none">
                <svg ref={svgRef} viewBox="0 0 300 250" className="w-full h-full">
                    {/* Triangle Body */}
                    <motion.path
                        d={`M ${v.A.x},${v.A.y} L ${v.B.x},${v.B.y} L ${v.C.x},${v.C.y} Z`}
                        fill="var(--brand-primary)" fillOpacity="0.05"
                        stroke="var(--brand-primary)" strokeWidth="3" strokeLinejoin="round"
                    />

                    {/* Medians (Ťažnice) */}
                    {showMedians && (
                        <g opacity="0.6">
                            <line x1={v.A.x} y1={v.A.y} x2={M_bc.x} y2={M_bc.y} stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 2" />
                            <line x1={v.B.x} y1={v.B.y} x2={M_ca.x} y2={M_ca.y} stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 2" />
                            <line x1={v.C.x} y1={v.C.y} x2={M_ab.x} y2={M_ab.y} stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 2" />
                            <circle cx={T.x} cy={T.y} r="4" fill="#F97316" />
                            <text x={T.x + 8} y={T.y + 4} className="text-[10px] fill-[#F97316] font-bold">Ťažisko (T)</text>
                        </g>
                    )}

                    {/* Altitudes (Výšky) */}
                    {showAltitudes && (
                        <g opacity="0.6">
                            <line x1={v.A.x} y1={v.A.y} x2={F_a.x} y2={F_a.y} stroke="#10B981" strokeWidth="1.5" />
                            <line x1={v.B.x} y1={v.B.y} x2={F_b.x} y2={F_b.y} stroke="#10B981" strokeWidth="1.5" />
                            <line x1={v.C.x} y1={v.C.y} x2={F_c.x} y2={F_c.y} stroke="#10B981" strokeWidth="1.5" />
                            <text x={F_a.x} y={F_a.y + 12} textAnchor="middle" className="text-[8px] fill-[#10B981] font-bold">vₐ</text>
                        </g>
                    )}

                    {/* Vertices (Draggable) */}
                    <Vertex point="A" pos={v.A} onDrag={(e, i) => handleDrag('A', e, i)} />
                    <Vertex point="B" pos={v.B} onDrag={(e, i) => handleDrag('B', e, i)} />
                    <Vertex point="C" pos={v.C} onDrag={(e, i) => handleDrag('C', e, i)} />
                </svg>
            </div>

            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowMedians(!showMedians)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${showMedians ? 'bg-[#F97316] text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                    >
                        Ťažnice
                    </button>
                    <button
                        onClick={() => setShowAltitudes(!showAltitudes)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${showAltitudes ? 'bg-[#10B981] text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                    >
                        Výšky
                    </button>
                </div>

                <div className="bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--brand-soft)] flex items-start gap-2">
                    <Info size={16} className="text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                        <strong>Ťažnica</strong> spája vrchol so stredom protiľahlej strany. Všetky sa pretínajú v <strong>ťažisku</strong>. <br />
                        <strong>Výška</strong> je kolmica z vrcholu na protiľahlú stranu.
                    </p>
                </div>
                <p className="text-[10px] text-gray-400 text-center italic">Chyť body A, B, C a meň tvar trojuholníka!</p>
            </div>
        </div>
    )
}

function Vertex({ point, pos, onDrag }: { point: string, pos: { x: number, y: number }, onDrag: (e: MouseEvent | TouchEvent | PointerEvent, i: { delta: { x: number, y: number } }) => void }) {
    return (
        <motion.g
            drag
            dragMomentum={false}
            onDrag={onDrag}
            style={{ cursor: 'grab' }}
            x={pos.x}
            y={pos.y}
        >
            <circle cx="0" cy="0" r="12" fill="white" fillOpacity="0.01" /> {/* Larger invisible hit area */}
            <circle cx="0" cy="0" r="6" fill="var(--brand-primary)" stroke="white" strokeWidth="2" shadow-sm="true" />
            <text y="-10" textAnchor="middle" className="text-[12px] font-bold fill-[var(--brand-primary)] select-none pointer-events-none">{point}</text>
        </motion.g>
    )
}
