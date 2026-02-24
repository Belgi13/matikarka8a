export interface TheoryFormula {
  label: string
  formula: string
}

export interface TheoryShape {
  name: string
  emoji?: string
  properties: string[]
  formulas: TheoryFormula[]
}

export interface TheorySection {
  id: string
  title: string
  subtitle: string
  imageFile: string          // filename inside public/theory/
  topics: string[]           // topic IDs from TOPICS in lib/questions.ts
  shapes: TheoryShape[]
  notes?: string[]
}

export const THEORY_SECTIONS: TheorySection[] = [
  {
    id: 'stvoruholniky',
    title: 'Štvoruholníky',
    subtitle: 'Vlastnosti a vzorce pre obvod a obsah štvoruholníkov',
    imageFile: 'theory-stvoruholniky.png',
    topics: ['stvoruholnik', 'lichobeznik', 'obvod'],
    notes: ['Súčet uhlov v štvoruholníku je vždy 360°.'],
    shapes: [
      {
        name: 'ŠTVOREC',
        properties: [
          'Všetky štyri strany sú rovnako dlhé (zhodné)',
          'Všetky vnútorné uhly = 90°',
          'Uhlopriečky sú zhodné, navzájom kolmé a rozpoľujú sa (delia na póly)',
        ],
        formulas: [
          { label: 'Obvod', formula: 'o = 4a' },
          { label: 'Obsah', formula: 'S = a²' },
        ],
      },
      {
        name: 'OBDĹŽNIK', emoji: '▬',
        properties: [
          'Protiľahlé strany sú rovnobežné a rovnako dlhé',
          'Susedné strany sú navzájom kolmé',
          'Všetky vnútorné uhly = 90°',
          'Uhlopriečky sú zhodné a rozpoľujú sa (delia na póly)',
        ],
        formulas: [
          { label: 'Obvod', formula: 'o = 2 · (a + b)' },
          { label: 'Obsah', formula: 'S = a · b' },
        ],
      },
      {
        name: 'KOSOŠTVOREC',
        properties: [
          'Všetky štyri strany sú rovnako dlhé',
          'Vnútorné uhly nie sú 90° (strany nie sú kolmé)',
          'Protiľahlé uhly sú zhodné',
          'Súčet uhlov pri jednom ramene = 180°',
          'Uhlopriečky sú navzájom kolmé, rozpoľujú sa (delia na póly), ale nie sú rovnako dlhé',
          'Výška = kolmá vzdialenosť protiľahlých strán',
        ],
        formulas: [
          { label: 'Obvod', formula: 'o = 4a' },
          { label: 'Obsah (cez výšku)', formula: 'S = a · vₐ' },
          { label: 'Obsah (cez uhlopriečky)', formula: 'S = (u₁ · u₂) / 2' },
        ],
      },
      {
        name: 'KOSODĹŽNIK (rovnobežník)', emoji: '▱',
        properties: [
          'Protiľahlé strany sú rovnobežné a rovnako dlhé',
          'Susedné strany nie sú kolmé na seba',
          'Protiľahlé uhly sú zhodné',
          'Súčet uhlov pri jednom ramene = 180°',
          'Uhlopriečky rozpoľujú sa (delia na póly) a sú rovnako dlhé, ale nie sú kolmé',
          'Má dve rôzne výšky (vₐ a v_b)',
        ],
        formulas: [
          { label: 'Obvod', formula: 'o = 2 · (a + b)' },
          { label: 'Obsah', formula: 'S = a · vₐ = b · v_b' },
        ],
      },
      {
        name: 'LICHOBEŽNÍK',
        properties: [
          'Dve protiľahlé strany sú rovnobežné → nazývajú sa základne (a, c)',
          'Dve protiľahlé strany sú rôznobežné → nazývajú sa ramená (b, d)',
          'Výška = kolmá vzdialenosť medzi základňami',
          'Uhly pri jednom ramene spolu = 180°',
        ],
        formulas: [
          { label: 'Obvod', formula: 'o = a + b + c + d' },
          { label: 'Obsah', formula: 'S = (a + c) · v / 2' },
        ],
      },
      {
        name: 'ROVNORAMENNÝ LICHOBEŽNÍK',
        properties: [
          'Ramená sú rovnako dlhé (zhodné)',
          'Uhly pri základniach sú zhodné',
          'Uhlopriečky sú zhodné',
        ],
        formulas: [],
      },
    ],
  },
  {
    id: 'priklady-stvoruholniky',
    title: 'Príklady: Rovnobežník a Lichobežník',
    subtitle: '16 príkladov na rovnobežník a 10 príkladov na lichobežník zo zošita',
    imageFile: 'theory-priklady.png',
    topics: ['stvoruholnik', 'lichobeznik'],
    notes: ['Tento list obsahuje cvičné príklady — skvelé na tréning pred testom!'],
    shapes: [
      {
        name: 'ROVNOBEŽNÍK — Kľúčové vzorce pre príklady',
        properties: [
          'Ak poznáš obsah a výšku → stranu vypočítaš: a = S ÷ vₐ',
          'Ak poznáš obsah a stranu → výšku vypočítaš: vₐ = S ÷ a',
        ],
        formulas: [
          { label: 'Obvod', formula: 'o = 2 · (a + b)' },
          { label: 'Obsah', formula: 'S = a · vₐ' },
        ],
      },
      {
        name: 'LICHOBEŽNÍK — Kľúčové vzorce pre príklady',
        properties: [
          'Ak poznáš obsah, výšku a jednu základňu → druhú vypočítaš: a + c = (2 · S) ÷ v',
        ],
        formulas: [
          { label: 'Obvod', formula: 'o = a + b + c + d' },
          { label: 'Obsah', formula: 'S = (a + c) · v / 2' },
        ],
      },
    ],
  },
  {
    id: 'trojuholnik',
    title: 'Základné prvky trojuholníka',
    subtitle: 'Výšky, ťažnice, stredné priečky, opísaná a vpísaná kružnica',
    imageFile: 'theory-trojuholnik.png',
    topics: ['trojuholnik', 'vyska', 'obvod'],
    notes: [
      'Trojuholníková nerovnosť: trojuholník existuje iba ak súčet každých dvoch strán je VÄČŠÍ ako tretia strana.',
    ],
    shapes: [
      {
        name: 'ZÁKLADNÉ VZORCE',
        properties: [],
        formulas: [
          { label: 'Obvod', formula: 'o = a + b + c' },
          { label: 'Obsah', formula: 'S = (a · vₐ) / 2' },
        ],
      },
      {
        name: 'TYPY PODĽA UHLOV',
        properties: [
          'Ostrouhlý: všetky tri vnútorné uhly sú ostré (< 90°)',
          'Tupouhlý: jeden vnútorný uhol je tupý (> 90°)',
          'Pravouhlý: jeden vnútorný uhol je presne 90°',
        ],
        formulas: [],
      },
      {
        name: 'TYPY PODĽA STRÁN',
        properties: [
          'Rovnoramenný: dve strany sú rovnako dlhé (zhodné)',
          'Rovnostranný: všetky tri strany sú rovnako dlhé, všetky uhly = 60°',
        ],
        formulas: [],
      },
      {
        name: 'VÝŠKY',
        properties: [
          'Výška = kolmá vzdialenosť vrchola od protiľahlej strany',
          'Každý trojuholník má tri výšky',
          'Všetky tri výšky sa pretínajú v jednom bode → ORTOCENTRUM',
          'Výška je najkratšia vzdialenosť z vrchola na protiľahlú stranu',
        ],
        formulas: [],
      },
      {
        name: 'ŤAŽNICE',
        properties: [
          'Ťažnica = úsečka od vrchola do stredu protiľahlej strany',
          'Každý trojuholník má tri ťažnice',
          'Všetky tri ťažnice sa pretínajú v jednom bode → ŤAŽISKO',
          'Ťažisko rozdeľuje každú ťažnicu v pomere 2 : 1 (dlhšia časť smeruje k vrcholu)',
        ],
        formulas: [],
      },
      {
        name: 'STREDNÉ PRIEČKY',
        properties: [
          'Stredná priečka = úsečka, ktorá spája stredy dvoch strán trojuholníka',
          'Je rovnobežná s treťou stranou',
          'Je rovná presne polovici tej tretej strany',
        ],
        formulas: [],
      },
      {
        name: 'KRUŽNICA OPÍSANÁ',
        properties: [
          'Stred = priesečník osí strán trojuholníka',
          'Polomer = vzdialenosť stredu od každého vrchola',
          'V pravouhlom trojuholníku: stred leží na strede prepony',
          'V tupouhlom trojuholníku: stred leží vne trojuholníka',
        ],
        formulas: [],
      },
      {
        name: 'KRUŽNICA VPÍSANÁ',
        properties: [
          'Stred = priesečník osí uhlov trojuholníka',
          'Polomer = kolmá vzdialenosť stredu od ľubovoľnej strany',
        ],
        formulas: [],
      },
    ],
  },
]

export function getTheoryById(id: string): TheorySection | null {
  return THEORY_SECTIONS.find((s) => s.id === id) ?? null
}

export function getTheoryByTopic(topicId: string): TheorySection[] {
  return THEORY_SECTIONS.filter((s) => s.topics.includes(topicId))
}
