import { getByTopic, getRandom, getById, TOPICS } from '@/lib/questions'

describe('questions', () => {
  it('getByTopic returns questions for a valid topic', () => {
    const results = getByTopic('rovnice')
    expect(results.length).toBeGreaterThan(0)
    results.forEach(q => expect(q.topic).toBe('rovnice'))
  })

  it('getByTopic returns empty array for unknown topic', () => {
    expect(getByTopic('nonexistent')).toHaveLength(0)
  })

  it('getRandom returns a question from the topic', () => {
    const q = getRandom('zlomky')
    expect(q).not.toBeNull()
    expect(q?.topic).toBe('zlomky')
  })

  it('getById returns correct question', () => {
    const q = getById('eq-1')
    expect(q?.id).toBe('eq-1')
    expect(q?.answer).toBe('x = 4')
  })

  it('getById returns null for unknown id', () => {
    expect(getById('xyz-999')).toBeNull()
  })

  it('TOPICS contains all 8 topics', () => {
    expect(TOPICS).toHaveLength(8)
  })
})
