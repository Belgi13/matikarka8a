'use client'

import { motion } from 'framer-motion'
import { Zap } from 'react-feather'
import PythagoreanLab from './PythagoreanLab'
import CircleLab from './CircleLab'
import TriangleLab from './TriangleLab'
import QuadrilateralLab from './QuadrilateralLab'

export default function TheoryLabWrapper({ id }: { id: string }) {
    const renderLab = () => {
        switch (id) {
            case 'stvoruholniky':
            case 'priklady-stvoruholniky':
                return <QuadrilateralLab />
            case 'trojuholnik':
                return <TriangleLab />
            // In a real app, we might have more specific routes, 
            // but for demonstration we'll map these based on existing IDs
            default:
                // Fallback or specific mappings if needed
                if (id.includes('veta')) return <PythagoreanLab />
                if (id.includes('kruh')) return <CircleLab />
                return null
        }
    }

    const lab = renderLab()
    if (!lab) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 mb-10"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--brand-accent)] flex items-center justify-center text-white shadow-md">
                    <Zap size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Interaktívne Lab</h3>
                    <p className="text-xs text-[var(--text-muted)]">Vyskúšaj si teóriu v praxi!</p>
                </div>
            </div>

            {lab}

            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-[#6D28D9] text-white shadow-lg">
                <p className="text-sm font-bold mb-1">💡 Vedel si?</p>
                <p className="text-xs opacity-90 leading-relaxed">
                    Interaktívne učenie ti pomôže zapamätať si vzorce až o 60% rýchlejšie ako len čítanie textu. Skúšaj meniť hodnoty a sleduj, čo sa deje!
                </p>
            </div>
        </motion.div>
    )
}
