export interface SolutionStep {
  nazov: string
  vysvetlenie: string
  matematika: string
}

export interface Solution {
  co_vieme: string
  hladame: string
  kroky: SolutionStep[]
  odpoved: string
  pochvala: string
}

export interface ValidationResult {
  spravne: boolean
  sprava: string
}

export interface HistoryEntry {
  id: string
  problem: string
  imageBase64?: string
  solution: Solution
  topic?: string
  date: string
}

export interface Question {
  id: string
  topic: string
  topicLabel: string
  difficulty: 1 | 2
  text: string
  hints: [string, string]
  answer: string
}
