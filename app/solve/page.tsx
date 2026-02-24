'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSearchParams } from 'next/navigation'
import StepCard from '@/components/StepCard'
import ProgressDots from '@/components/ProgressDots'
import LoadingView from '@/components/LoadingView'
import CelebrationView from '@/components/CelebrationView'
import VisualExplanationLab from '@/components/VisualExplanationLab'
import { saveEntry } from '@/lib/history'
import { getById } from '@/lib/questions'
import { ArrowRight, CheckCircle, FileText, Image as ImageIcon, RefreshCw, Save, X } from 'react-feather'
import type { Solution } from '@/lib/types'

type PageState = 'input' | 'loading' | 'solution' | 'done'

function SolvePageInner() {
  const [state, setState] = useState<PageState>('input')
  const [problem, setProblem] = useState('')
  const [imageData, setImageData] = useState<{ base64: string; mimeType: string } | null>(null)
  const [solution, setSolution] = useState<Solution | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [revealAll, setRevealAll] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [showVisualExplanation, setShowVisualExplanation] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const qId = searchParams.get('q')
    if (qId) {
      const q = getById(qId)
      if (q) {
        setProblem(q.text)
      }
    }
  }, []) // eslint-disable-line

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.heic', '.webp'] },
    maxSize: 10 * 1024 * 1024,
    onDropAccepted: async ([file]) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1]
        setImageData({ base64, mimeType: file.type })
      }
      reader.readAsDataURL(file)
    },
    onDropRejected: ([rejection]) => {
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('Obrázok je príliš veľký. Skús ho zmenšiť alebo odfotiť znova.')
      } else {
        setError('Tento formát nefunguje. Skús JPG alebo PNG.')
      }
    },
  })

  const canSubmit = problem.trim().length > 0 || !!imageData

  const handleSolve = async () => {
    if (!canSubmit) {
      setError('Najprv napíš alebo nahraj príklad.')
      return
    }
    setError('')
    setState('loading')
    try {
      let data: Solution
      if (imageData) {
        const res = await fetch('/api/solve-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: imageData.base64, mimeType: imageData.mimeType, additionalText: problem }),
        })
        if (!res.ok) throw new Error()
        data = await res.json()
      } else {
        const res = await fetch('/api/solve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problem }),
        })
        if (!res.ok) throw new Error()
        data = await res.json()
      }
      setSolution(data)
      setCurrentStep(0)
      setRevealAll(false)
      setShowVisualExplanation(false)
      setState('solution')
    } catch {
      setError('Niečo sa pokazilo. Skús to znova o chvíľu.')
      setState('input')
    }
  }

  const handleReset = () => {
    setProblem('')
    setImageData(null)
    setSolution(null)
    setError('')
    setSaved(false)
    setShowVisualExplanation(false)
    setState('input')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    if (!solution || saved) return
    saveEntry({ problem, imageBase64: imageData?.base64, solution })
    setSaved(true)
  }

  if (state === 'loading') return <LoadingView />

  if (state === 'solution' && solution) {
    const allSteps = [
      { nazov: 'Čo vieme?', vysvetlenie: solution.co_vieme, matematika: '' },
      { nazov: 'Hľadáme:', vysvetlenie: solution.hladame, matematika: '' },
      ...solution.kroky,
    ]
    const isLast = currentStep >= allSteps.length - 1

    return (
      <div className="py-6">
        <div className="bg-gray-100 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-500 mb-1">Tvoj príklad:</p>
          <p className="text-[17px] font-medium text-[#111827]">{problem || '(obrázok)'}</p>
        </div>
        <ProgressDots current={currentStep} total={allSteps.length} />

        <div className="mt-4">
          {(revealAll ? allSteps : allSteps.slice(0, currentStep + 1)).map((step, i) => (
            <StepCard key={i} step={step} stepNumber={i + 1} dimmed={!revealAll && i < currentStep} />
          ))}
        </div>

        {!revealAll && !isLast && (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="w-full py-4 bg-[#F59E0B] text-white text-[18px] font-semibold rounded-2xl mt-2 hover:bg-amber-500 transition-colors active:scale-95 inline-flex items-center justify-center gap-2"
          >
            Ďalší krok <ArrowRight size={16} />
          </button>
        )}

        {!revealAll && isLast && (
          <CelebrationView
            answer={solution.odpoved}
            praise={solution.pochvala}
            onReset={handleReset}
            onSave={handleSave}
          />
        )}

        {!revealAll && !isLast && (
          <button onClick={() => setRevealAll(true)} className="w-full text-center text-gray-400 text-sm mt-4 py-2">
            Ukáž všetko naraz
          </button>
        )}

        {revealAll && (
          <div className="mt-4">
            <div className="bg-[#F0FDF4] border-2 border-[#10B981] rounded-2xl p-5 text-center mb-4">
              <p className="text-[20px] font-bold text-[#065F46] inline-flex items-center gap-2"><CheckCircle size={20} /> {solution.odpoved}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowVisualExplanation((v) => !v)}
                className="w-full py-3 rounded-2xl border-2 border-[#C7D2FE] text-[#4F46E5] font-semibold inline-flex items-center justify-center gap-2"
              >
                <FileText size={16} />
                {showVisualExplanation ? 'Skryť vizuálne laboratórium' : 'Zobraziť vizuálne laboratórium'}
              </button>
              {showVisualExplanation && (
                <VisualExplanationLab problem={problem} solution={solution} steps={allSteps} />
              )}
              <button onClick={handleSave} disabled={saved} className="w-full py-3 rounded-2xl border-2 border-[#6D28D9] text-[#6D28D9] font-semibold disabled:opacity-50 inline-flex items-center justify-center gap-2">
                <Save size={16} />
                {saved ? 'Uložené' : 'Uložiť do histórie'}
              </button>
              <button onClick={handleReset} className="w-full py-3 bg-[#F59E0B] text-white font-semibold rounded-2xl inline-flex items-center justify-center gap-2"><RefreshCw size={16} /> Nový príklad</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="py-6">
      <h1 className="text-[26px] font-bold text-[#111827] mb-6">Zadaj príklad</h1>

      <textarea
        ref={inputRef}
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="Napíš sem príklad... napr. 3k + 7/3 + 1 = 5 + 2k/2"
        className="w-full h-36 p-4 text-[18px] rounded-2xl border-2 border-gray-200 focus:border-[#6D28D9] focus:outline-none resize-none leading-relaxed"
      />

      <p className="text-center text-gray-400 my-4 text-[16px]">alebo</p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-[#6D28D9] bg-[#EEF2FF]' : 'border-gray-300 hover:border-[#6D28D9] hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        {imageData ? (
          <div className="flex items-center justify-center gap-3">
            <span className="text-green-600 text-[18px] inline-flex items-center gap-2"><CheckCircle size={18} /> Obrázok nahraný</span>
            <button
              onClick={(e) => { e.stopPropagation(); setImageData(null) }}
              className="text-red-400 hover:text-red-600 font-bold text-xl"
              aria-label="Odstrániť obrázok"
            ><X size={18} /></button>
          </div>
        ) : (
          <>
            <p className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#6D28D9]">
              <ImageIcon size={22} />
            </p>
            <p className="text-[18px] text-gray-500">Nahraj foto príkladu</p>
            <p className="text-sm text-gray-400 mt-1">klikni alebo presuň obrázok sem · max 10 MB</p>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-[16px] mt-3 text-center">{error}</p>}

      <button
        onClick={handleSolve}
        disabled={!canSubmit}
        className="w-full mt-6 py-4 bg-[#F59E0B] text-white text-[20px] font-bold rounded-2xl shadow-md hover:bg-amber-500 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        <ArrowRight size={18} /> Vyriešiť
      </button>
    </div>
  )
}

export default function SolvePage() {
  return (
    <Suspense fallback={<LoadingView />}>
      <SolvePageInner />
    </Suspense>
  )
}
