'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getByTopicAndDifficulty, getById, TOPICS } from '@/lib/questions'
import TopicIcon from '@/components/TopicIcon'
import VisualExplanationLab from '@/components/VisualExplanationLab'
import { AlertCircle, ArrowLeft, ArrowRight, Award, CheckCircle, HelpCircle, RefreshCw, Sliders } from 'react-feather'
import type { Question, Solution, SolutionStep } from '@/lib/types'

type PracticeState = 'select-topic' | 'select-difficulty' | 'question' | 'summary'

function PracticePageInner() {
  const searchParams = useSearchParams()
  const initialQ = (() => { const id = searchParams.get('q'); return id ? getById(id) : null })()
  const [practiceState, setPracticeState] = useState<PracticeState>(initialQ ? 'question' : 'select-topic')
  const [topic, setTopic] = useState(initialQ?.topic ?? '')
  const [difficulty, setDifficulty] = useState<1 | 2>(initialQ?.difficulty ?? 1)
  const [questions, setQuestions] = useState<Question[]>(initialQ ? [initialQ] : [])
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [hintsShown, setHintsShown] = useState(0)
  const [feedback, setFeedback] = useState<{ spravne: boolean; sprava: string } | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showVisualLab, setShowVisualLab] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)

  const startSession = (t: string, d: 1 | 2) => {
    const pool = getByTopicAndDifficulty(t, d)
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(5, pool.length))
    setQuestions(shuffled)
    setTopic(t)
    setDifficulty(d)
    setIdx(0)
    setScore(0)
    setFeedback(null)
    setAnswer('')
    setAttempts(0)
    setHintsShown(0)
    setShowSolution(false)
    setShowVisualLab(false)
    setPracticeState('question')
  }

  const handleCheck = async () => {
    if (!answer.trim()) return
    setLoading(true)
    try {
      const q = questions[idx]
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: q.text, studentAnswer: answer, correctAnswer: q.answer }),
      })
      const data = await res.json()
      setFeedback(data)
      if (data.spravne) {
        setScore((s) => s + 1)
      } else {
        setAttempts((a) => a + 1)
      }
    } catch {
      setFeedback({ spravne: false, sprava: 'Niečo sa pokazilo. Skús znova.' })
    }
    setLoading(false)
  }

  const handleNext = () => {
    if (idx + 1 >= questions.length) {
      setPracticeState('summary')
    } else {
      setIdx((i) => i + 1)
      setAnswer('')
      setFeedback(null)
      setAttempts(0)
      setHintsShown(0)
      setShowSolution(false)
      setShowVisualLab(false)
    }
  }

  if (practiceState === 'select-topic') {
    return (
      <div className="py-6">
        <h1 className="text-[26px] font-bold text-[#111827] mb-6">Precvičiť</h1>
        <p className="text-gray-500 mb-4">Vyber tému:</p>
        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTopic(t.id); setPracticeState('select-difficulty') }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:border-[#6D28D9] transition-all active:scale-95"
            >
              <span className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#6D28D9]">
                <TopicIcon topicId={t.id} size={18} />
              </span>
              <p className="text-[14px] font-semibold text-[#111827] leading-tight">{t.label}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (practiceState === 'select-difficulty') {
    return (
      <div className="py-6">
        <button onClick={() => setPracticeState('select-topic')} className="text-[#6D28D9] font-semibold mb-6 inline-flex items-center gap-2"><ArrowLeft size={16} />Späť</button>
        <h2 className="text-[22px] font-bold mb-6">Vyber obtiažnosť:</h2>
        <div className="flex flex-col gap-4">
          <button onClick={() => startSession(topic, 1)} className="w-full py-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[#6D28D9] text-[18px] font-semibold transition-all">
            Ľahšie
          </button>
          <button onClick={() => startSession(topic, 2)} className="w-full py-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-[#6D28D9] text-[18px] font-semibold transition-all">
            Ťažšie
          </button>
        </div>
      </div>
    )
  }

  if (practiceState === 'summary') {
    return (
      <div className="py-6 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#6D28D9]">
          <Award size={30} />
        </div>
        <h2 className="text-[26px] font-bold mb-2">Hotovo!</h2>
        <p className="text-[20px] text-gray-600 mb-6">{score} z {questions.length} správne</p>
        <div className="bg-[#EEF2FF] rounded-2xl p-5 mb-8">
          <p className="text-[18px] text-[#4338CA]">
            {score === questions.length ? 'Perfektný výsledok! Si úžasná.' :
             score >= questions.length / 2 ? 'Skvelá práca! Cvič ďalej.' :
             'Nevadí, skús znova. Každý pokus ťa posúva dopredu.'}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={() => startSession(topic, difficulty)} className="w-full py-4 bg-[#F59E0B] text-white text-[18px] font-semibold rounded-2xl inline-flex items-center justify-center gap-2">
            <RefreshCw size={16} /> Skúsiť znova
          </button>
          <button onClick={() => setPracticeState('select-topic')} className="w-full py-4 border-2 border-[#6D28D9] text-[#6D28D9] text-[18px] font-semibold rounded-2xl">
            Iná téma
          </button>
        </div>
      </div>
    )
  }

  const currentQ = questions[idx]
  if (!currentQ) return null

  const labSolution: Solution = {
    co_vieme: currentQ.text,
    hladame: 'Nájdi správny výsledok.',
    kroky: currentQ.hints.map((hint, i) => ({
      nazov: `Nápoveda ${i + 1}`,
      vysvetlenie: hint,
      matematika: '',
    })),
    odpoved: showSolution || feedback?.spravne ? currentQ.answer : '',
    pochvala: '',
  }

  const labSteps: SolutionStep[] = [
    { nazov: 'Čo vieme?', vysvetlenie: labSolution.co_vieme, matematika: '' },
    { nazov: 'Hľadáme:', vysvetlenie: labSolution.hladame, matematika: '' },
    ...labSolution.kroky,
  ]

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{TOPICS.find((t) => t.id === topic)?.label}</span>
        <span className="text-sm font-semibold text-[#6D28D9]">Otázka {idx + 1} z {questions.length}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className="bg-[#6D28D9] h-2 rounded-full transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <p className="text-[18px] text-[#111827] leading-relaxed">{currentQ.text}</p>
      </div>

      <button
        onClick={() => setShowVisualLab((v) => !v)}
        className="w-full mb-4 py-3 rounded-2xl border-2 border-[#C7D2FE] text-[#4F46E5] font-semibold inline-flex items-center justify-center gap-2"
      >
        <Sliders size={16} />
        {showVisualLab ? 'Skryť vizuálne laboratórium' : 'Zobraziť vizuálne laboratórium'}
      </button>

      {showVisualLab && (
        <div className="mb-5">
          <VisualExplanationLab problem={currentQ.text} solution={labSolution} steps={labSteps} />
        </div>
      )}

      {!feedback && !showSolution && (
        <>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Tvoja odpoveď..."
            className="w-full p-4 text-[18px] rounded-2xl border-2 border-gray-200 focus:border-[#6D28D9] focus:outline-none mb-4"
          />

          {hintsShown < 2 && (
            <button
              onClick={() => setHintsShown((h) => h + 1)}
              className="w-full py-3 border border-gray-300 rounded-xl text-gray-500 text-[15px] mb-3 hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2"><HelpCircle size={16} />Potrebujem nápovedu {hintsShown > 0 ? '(ďalšia)' : ''}</span>
            </button>
          )}

          {hintsShown > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
              <p className="text-[16px] text-yellow-800 inline-flex items-start gap-2"><HelpCircle size={16} className="mt-0.5" />{currentQ.hints[hintsShown - 1]}</p>
            </div>
          )}

          <button
            onClick={handleCheck}
          disabled={!answer.trim() || loading}
          className="w-full py-4 bg-[#F59E0B] text-white text-[18px] font-semibold rounded-2xl disabled:opacity-40"
        >
            {loading ? 'Kontrolujem...' : 'Skontrolovať odpoveď'}
          </button>
        </>
      )}

      {feedback && !showSolution && (
        <div className={`rounded-2xl p-5 mb-4 ${feedback.spravne ? 'bg-[#F0FDF4] border-2 border-[#10B981]' : 'bg-orange-50 border-2 border-orange-200'}`}>
          <p className="text-[18px] font-semibold mb-1 inline-flex items-center gap-2">
            {feedback.spravne ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {feedback.spravne ? 'Správne!' : attempts >= 2 ? 'Takmer...' : 'Skús ešte raz'}
          </p>
          <p className="text-[16px]">{feedback.sprava}</p>
        </div>
      )}

      {feedback && !feedback.spravne && attempts >= 2 && !showSolution && (
        <button onClick={() => setShowSolution(true)} className="w-full py-3 border-2 border-[#6D28D9] text-[#6D28D9] font-semibold rounded-2xl mb-3 inline-flex items-center justify-center gap-2">
          Ukáž mi riešenie <ArrowRight size={16} />
        </button>
      )}

      {showSolution && (
        <div className="bg-[#EEF2FF] rounded-2xl p-4 mb-4">
          <p className="text-[16px] font-semibold text-[#4338CA] mb-1">Správna odpoveď:</p>
          <p className="text-[18px] font-mono text-[#1E40AF]">{currentQ.answer}</p>
        </div>
      )}

      {(feedback?.spravne || showSolution) && (
        <button onClick={handleNext} className="w-full py-4 bg-[#F59E0B] text-white text-[18px] font-semibold rounded-2xl mt-2 inline-flex items-center justify-center gap-2">
          {idx + 1 >= questions.length ? 'Zobraziť výsledky' : 'Ďalšia otázka'} <ArrowRight size={16} />
        </button>
      )}

      {!feedback && attempts >= 2 && !showSolution && (
        <button onClick={() => setShowSolution(true)} className="w-full py-3 text-[#6D28D9] text-[15px] mt-3 inline-flex items-center justify-center gap-2">
          Ukáž mi riešenie <ArrowRight size={16} />
        </button>
      )}
    </div>
  )
}

export default function PracticePage() {
  return (
    <Suspense>
      <PracticePageInner />
    </Suspense>
  )
}
