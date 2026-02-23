import { SYSTEM_PROMPT, IMAGE_PREFIX, VALIDATION_PROMPT } from '@/lib/prompts'

describe('prompts', () => {
  it('SYSTEM_PROMPT contains Slovak language instruction', () => {
    expect(SYSTEM_PROMPT).toContain('slovensky')
  })

  it('SYSTEM_PROMPT contains JSON format instruction', () => {
    expect(SYSTEM_PROMPT).toContain('co_vieme')
    expect(SYSTEM_PROMPT).toContain('kroky')
    expect(SYSTEM_PROMPT).toContain('odpoved')
  })

  it('IMAGE_PREFIX contains transcription instruction', () => {
    expect(IMAGE_PREFIX).toContain('obrázku')
  })

  it('VALIDATION_PROMPT interpolates problem and answers', () => {
    const prompt = VALIDATION_PROMPT('2x+5=13', 'x=4', 'x=4')
    expect(prompt).toContain('2x+5=13')
    expect(prompt).toContain('spravne')
  })
})
