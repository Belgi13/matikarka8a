'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Premýšľam... 🤔',
  'Počítam krôčky... 🧮',
  'Skladám vysvetlenie... ✏️',
  'Už som takmer hotová... ⭐',
]

export default function LoadingView() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="w-16 h-16 border-4 border-[#DDD6FE] border-t-[#6D28D9] rounded-full animate-spin" />
      <p className="text-[20px] text-[#6D28D9] font-medium animate-pulse">{MESSAGES[idx]}</p>
    </div>
  )
}
