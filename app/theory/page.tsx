'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'react-feather'
import { THEORY_SECTIONS } from '@/data/theory'

export default function TheoryPage() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="py-6"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
    >
      <h1 className="text-[26px] font-bold text-[var(--text-primary)] mb-2">Teória</h1>
      <p className="text-[var(--text-muted)] text-[17px] mb-6">Čo musíš vedieť — prehľadne a jednoducho</p>
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
        }}
      >
        {THEORY_SECTIONS.map((section) => (
          <motion.div
            key={section.id}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href={`/theory/${section.id}`}
              className="bg-[var(--bg-surface-1)] rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] border border-white p-5 hover:border-[var(--brand-soft)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] flex items-start gap-4"
            >
              <div className="w-14 h-14 rounded-[var(--radius-md)] bg-[var(--bg-surface-2)] flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] relative">
                <BookOpen size={26} />
                {['stvoruholniky', 'trojuholnik', 'priklady-stvoruholniky'].includes(section.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--brand-accent)] rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white"
                    title="Interaktívne Lab k dispozícii"
                  >
                    🧪
                  </motion.div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-1">{section.title}</h2>
                <p className="text-[15px] text-[var(--text-muted)] leading-snug">{section.subtitle}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {section.topics.map((t) => (
                    <span key={t} className="text-xs bg-[var(--brand-soft)]/70 text-[var(--brand-primary)] px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <ArrowRight size={18} className="text-[var(--text-muted)] mt-1" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
