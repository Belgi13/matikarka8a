'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send } from 'react-feather'

interface Message { role: 'student' | 'ai'; text: string }

export default function TheoryQAPanel({ theoryId, imageFile }: { theoryId: string; imageFile: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setError('')
    setMessages((prev) => [...prev, { role: 'student', text: q }])
    setLoading(true)
    try {
      const res = await fetch('/api/theory-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, theoryId, imageFile }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'ai', text: data.answer }])
    } catch {
      setError('Niečo sa pokazilo. Skús to znova.')
    }
    setLoading(false)
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h3 className="text-[18px] font-bold text-[#111827] mb-4 inline-flex items-center gap-2">
        <MessageCircle size={18} />
        Opýtaj sa Matikárku
      </h3>
      {messages.length > 0 && (
        <div className="flex flex-col gap-3 mb-4 max-h-80 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-[17px] leading-snug ${
                msg.role === 'student'
                  ? 'bg-[#6D28D9] text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-[#111827] rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 text-gray-400 text-[17px]">
                Premýšľam...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
      {error && <p className="text-red-500 text-[15px] mb-3 text-center">{error}</p>}
      <div className="flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder="Napíš otázku o tejto teórii... (napr. Čo je ortocentrum?)"
          rows={2}
          className="flex-1 p-3 text-[17px] rounded-2xl border-2 border-gray-200 focus:border-[#6D28D9] focus:outline-none resize-none leading-snug"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="py-3 px-5 bg-[#6D28D9] text-white text-[16px] font-semibold rounded-2xl hover:bg-purple-700 transition-colors active:scale-95 disabled:opacity-40 flex-shrink-0 inline-flex items-center gap-2"
        >
          Pýtam <Send size={14} />
        </button>
      </div>
    </div>
  )
}
