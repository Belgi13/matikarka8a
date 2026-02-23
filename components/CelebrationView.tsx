'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const PRAISES = [
  'Výborne! Každý príklad ťa robí silnejšou! 💜',
  'Skvelá práca! Matematika ťa nezastaví! ⭐',
  'Wow, zvládla si to! Mám z teba radosť! 🌟',
  'Takto sa to robí! Krok za krokom — a si tam! 🚀',
  'Si šikovnejšia, ako si myslíš! 💪',
  'Ďalší príklad vyriešený! Ideme ďalej! 🎉',
  'Každý krok ti dáva väčšiu silu! ⭐',
  'Vynikajúco! Tvoja učiteľka bude hrdá! 📚',
]

interface Props {
  answer: string
  praise: string
  onReset: () => void
  onSave: () => void
}

export default function CelebrationView({ answer, praise, onReset, onSave }: Props) {
  const randomPraise = PRAISES[Math.floor(Math.random() * PRAISES.length)]

  useEffect(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
  }, [])

  return (
    <div className="py-8 px-4">
      <div className="bg-[#F0FDF4] border-2 border-[#10B981] rounded-2xl p-6 text-center mb-6">
        <p className="text-2xl font-bold text-[#065F46] mb-2">✅ Odpoveď:</p>
        <p className="text-[22px] font-mono text-[#065F46]">{answer}</p>
      </div>
      <div className="bg-[#EEF2FF] rounded-2xl p-5 text-center mb-8">
        <p className="text-[18px] text-[#4338CA] leading-relaxed">{praise || randomPraise}</p>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={onSave}
          className="w-full py-4 rounded-2xl border-2 border-[#6D28D9] text-[#6D28D9] text-[18px] font-semibold hover:bg-[#EEF2FF] transition-colors"
        >
          💾 Uložiť do histórie
        </button>
        <button
          onClick={onReset}
          className="w-full py-4 rounded-2xl bg-[#F59E0B] text-white text-[18px] font-semibold hover:bg-amber-500 transition-colors active:scale-95"
        >
          🔄 Nový príklad
        </button>
      </div>
    </div>
  )
}
