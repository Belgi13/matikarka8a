import questionsData from '@/data/questions.json'
import type { Question } from './types'

const questions = questionsData as Question[]

export const TOPICS = [
  { id: 'rovnice', label: 'Rovnice (jednoduché)' },
  { id: 'zlomky', label: 'Rovnice so zlomkami' },
  { id: 'slovne', label: 'Slovné úlohy' },
  { id: 'trojuholnik', label: 'Zostrojenie trojuholníka' },
  { id: 'stvoruholnik', label: 'Štvorec a obdĺžnik' },
  { id: 'lichobeznik', label: 'Lichobežník' },
  { id: 'obvod', label: 'Obvod a obsah' },
  { id: 'vyska', label: 'Výška v trojuholníku' },
]

export function getByTopic(topic: string): Question[] {
  return questions.filter((q) => q.topic === topic)
}

export function getByTopicAndDifficulty(topic: string, difficulty: 1 | 2): Question[] {
  return questions.filter((q) => q.topic === topic && q.difficulty === difficulty)
}

export function getById(id: string): Question | null {
  return questions.find((q) => q.id === id) ?? null
}

export function getRandom(topic: string): Question | null {
  const pool = getByTopic(topic)
  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}
