'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff } from 'react-feather'

export default function TheoryImageToggle({ imageFile, title }: { imageFile: string; title: string }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="mt-6 mb-2">
      <button
        onClick={() => setVisible((v) => !v)}
        className="w-full py-3 border-2 border-gray-200 rounded-2xl text-[16px] font-medium text-gray-600 hover:border-[#6D28D9] hover:text-[#6D28D9] transition-colors inline-flex items-center justify-center gap-2"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        {visible ? 'Skryť obrázok' : 'Zobraziť pôvodný obrázok zo zošita'}
      </button>
      {visible && (
        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <Image src={`/theory/${imageFile}`} alt={`Teória: ${title}`} width={800} height={1000} className="w-full h-auto" />
        </div>
      )}
    </div>
  )
}
