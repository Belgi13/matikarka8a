'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { TOPICS, getByTopic } from '@/lib/questions'
import TopicIcon from '@/components/TopicIcon'

export default function CollectionPage() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="py-6"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
    >
      <h1 className="text-[26px] font-bold text-[var(--text-primary)] mb-2">Zbierka príkladov</h1>
      <p className="text-[var(--text-muted)] text-[17px] mb-6">Vyber tému a riešme spolu</p>
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduceMotion ? 0 : 0.05 } },
        }}
      >
        {TOPICS.map((topic) => {
          const count = getByTopic(topic.id).length
          return (
            <motion.div
              key={topic.id}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/collection/${topic.id}`}
                className="bg-[var(--bg-surface-1)] rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] border border-white p-4 hover:border-[var(--brand-soft)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 flex flex-col items-center text-center"
              >
                <span className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-surface-2)] text-[var(--brand-primary)]">
                  <TopicIcon topicId={topic.id} size={22} />
                </span>
                <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-tight mb-1">{topic.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{count} príkladov</p>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
