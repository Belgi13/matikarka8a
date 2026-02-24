'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'react-feather'

export default function Home() {
  const reduceMotion = useReducedMotion()

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: reduceMotion ? 0 : 0.09, duration: 0.28, ease: 'easeOut' }}
    >
      <motion.div
        variants={item}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-soft)] bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--brand-primary)] shadow-[var(--shadow-soft)]"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-accent)]" />
        Krok za krokom
      </motion.div>
      <motion.h1 variants={item} className="text-4xl font-bold text-[var(--brand-primary)] mb-3">
        Matikárka
      </motion.h1>
      <motion.p variants={item} className="text-xl text-[var(--text-muted)] mb-10 leading-relaxed">
        Tvoja trpezlivá<br />pomocníčka z matematiky
      </motion.p>
      <motion.div variants={item}>
        <Link
          href="/solve"
          className="bg-[var(--brand-accent)] hover:brightness-95 text-white text-xl font-semibold px-10 py-4 rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] transition-all duration-200 active:scale-95 inline-flex items-center gap-2"
        >
          Začnime! <ArrowRight size={18} />
        </Link>
      </motion.div>
    </motion.div>
  )
}
