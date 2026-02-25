'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PrismLab() {
    const [w, setW] = useState(4) // width
    const [d, setD] = useState(3) // depth
    const [h, setH] = useState(2) // height

    const volume = w * d * h
    const surfaceArea = 2 * (w * d + w * h + d * h)

    // Drawing cubes in isometric view
    // x increases right-down, y increases left-down, z increases up
    const renderCubes = () => {
        const cubes = []
        for (let zi = 0; zi < h; zi++) {
            for (let di = 0; di < d; di++) {
                for (let wi = 0; wi < w; wi++) {
                    cubes.push(<Cube key={`${wi}-${di}-${zi}`} x={wi} y={di} z={zi} />)
                }
            }
        }
        return cubes
    }

    return (
        <div className="flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-sm border border-[var(--brand-soft)]">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Hranol a Objem</h3>
                <span className="text-xs font-bold text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded">3D priestor</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-[var(--bg-canvas)] p-2 rounded-lg border border-[var(--brand-soft)]">
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Objem (V)</div>
                    <div className="text-sm font-bold text-[var(--brand-primary)]">{volume} m³</div>
                </div>
                <div className="bg-[var(--bg-canvas)] p-2 rounded-lg border border-[var(--brand-soft)]">
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Povrch (S)</div>
                    <div className="text-sm font-bold text-[var(--brand-accent)]">{surfaceArea} m²</div>
                </div>
            </div>

            <div className="relative h-64 w-full flex items-center justify-center bg-[#F8FAFF] rounded-xl border border-dashed border-gray-200">
                <svg viewBox="0 0 300 250" className="w-full h-full">
                    <g transform="translate(150, 180)">
                        {renderCubes()}
                    </g>

                    {/* Dimension Labels */}
                    <text x="200" y="210" className="text-[10px] font-bold fill-gray-400">šírka: {w}</text>
                    <text x="70" y="210" className="text-[10px] font-bold fill-gray-400">hĺbka: {d}</text>
                    <text x="220" y="100" className="text-[10px] font-bold fill-gray-400">výška: {h}</text>
                </svg>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <DimensionControl label="Šírka" val={w} setVal={setW} color="var(--brand-primary)" />
                <DimensionControl label="Hĺbka" val={d} setVal={setD} color="var(--brand-accent)" />
                <DimensionControl label="Výška" val={h} setVal={setH} color="#10B981" />
            </div>

            <p className="text-[11px] text-gray-500 italic text-center leading-tight">
                Počítaj kocky! Každá malá kocka je 1 m³. <br />
                Objem je počet všetkých kociek v hranole.
            </p>
        </div>
    )
}

function DimensionControl({ label, val, setVal, color }: { label: string, val: number, setVal: (v: number) => void, color: string }) {
    return (
        <div className="bg-[var(--bg-canvas)] p-2 rounded-xl border border-[var(--brand-soft)] flex flex-col items-center">
            <span className="text-[10px] font-bold text-gray-500 mb-1">{label}</span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setVal(Math.max(1, val - 1))}
                    className="w-6 h-6 rounded bg-white border border-gray-200 shadow-sm flex items-center justify-center font-bold text-gray-600 active:scale-90"
                >-</button>
                <span className="font-bold text-sm" style={{ color }}>{val}</span>
                <button
                    onClick={() => setVal(Math.min(6, val + 1))}
                    className="w-6 h-6 rounded bg-white border border-gray-200 shadow-sm flex items-center justify-center font-bold text-gray-600 active:scale-90"
                >+</button>
            </div>
        </div>
    )
}

function Cube({ x, y, z }: { x: number, y: number, z: number }) {
    // Isometric projection
    // isoX = (x - y) * cos(30)
    // isoY = (x + y) * sin(30) - z * h

    const size = 18
    const isoX = (x - y) * size * 0.866
    const isoY = (x + y) * size * 0.5 - z * size

    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (x + y + z) * 0.05 }}
            transform={`translate(${isoX}, ${isoY})`}
        >
            {/* Top Face */}
            <path d={`M 0 0 L ${size * 0.866} ${-size * 0.5} L 0 ${-size} L ${-size * 0.866} ${-size * 0.5} Z`} fill="#E0E7FF" stroke="#4F46E5" strokeWidth="0.5" />
            {/* Right Face */}
            <path d={`M 0 0 L ${size * 0.866} ${-size * 0.5} L ${size * 0.866} ${size * 0.5} L 0 ${size} Z`} fill="#C7D2FE" stroke="#4F46E5" strokeWidth="0.5" />
            {/* Left Face */}
            <path d={`M 0 0 L ${-size * 0.866} ${-size * 0.5} L ${-size * 0.866} ${size * 0.5} L 0 ${size} Z`} fill="#A5B4FC" stroke="#4F46E5" strokeWidth="0.5" />
        </motion.g>
    )
}
