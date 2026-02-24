# Matikárka 8A

Matikárka je Next.js aplikácia pre žiačku 8. ročníka, navrhnutá na trpezlivé vysvetľovanie matematiky krok za krokom v slovenčine. Kombinuje AI riešenie príkladov, precvičovanie, tematickú zbierku úloh, teóriu a lokálnu históriu vyriešených príkladov.

## Hlavné funkcie

- `Vyriešiť` (`/solve`)
- zadanie príkladu textom alebo nahraním fotky
- AI vráti štruktúrované riešenie (`co_vieme`, `hladame`, kroky, odpoveď, pochvala)
- postupné odhaľovanie krokov alebo „ukáž všetko naraz“
- uloženie výsledku do lokálnej histórie

- `Precvičiť` (`/practice`)
- výber témy a obtiažnosti (1 alebo 2 hviezdičky)
- sada otázok z lokálneho datasetu (max 5 na session)
- AI validácia odpovede, nápovedy a zobrazenie riešenia po opakovaných pokusoch
- súhrn skóre po dokončení

- `Zbierka príkladov` (`/collection`)
- tematický prehľad úloh
- rýchly prechod na „Vyriešiť“ alebo „Precvičiť“ s konkrétnou otázkou

- `Teória` (`/theory`)
- sekcie so vzorcami a vlastnosťami tvarov
- prepínanie pôvodného obrázka zo zošita
- Q&A panel nad teóriou (AI odpovedá na otázky k zobrazenému obrázku)

- `História` (`/history`)
- lokálne uložené príklady (LocalStorage)
- filtrovanie podľa témy
- detail kroku riešenia

## Tech stack

- Framework: Next.js 16 (App Router)
- Jazyk: TypeScript, React 19
- Styling: Tailwind CSS 4
- Animácie/UI: Framer Motion, canvas-confetti, react-dropzone
- AI: OpenAI SDK (`gpt-4o`)
- Testy: Jest + Testing Library
- Deployment config: Netlify (`@netlify/plugin-nextjs`)

## Rýchly štart

### 1) Požiadavky

- Node.js 20+
- npm
- OpenAI API kľúč

### 2) Inštalácia

```bash
npm install
```

### 3) Environment

Vytvor `.env.local`:

```bash
OPENAI_API_KEY=your_openai_api_key
# voliteľné hlavne pre deployment/theory image fetch v API route:
URL=http://localhost:3000
```

### 4) Spustenie

```bash
npm run dev
```

Aplikácia beží na [http://localhost:3000](http://localhost:3000).

## Skripty

```bash
npm run dev       # vývoj
npm run build     # produkčný build
npm run start     # spustenie buildu
npm run lint      # eslint
npm test          # jest
npm run test:watch
```

## Dáta a architektúra

- otázky: `data/questions.json` (49 úloh, 8 tém)
- teória: `data/theory.ts` (sekcie, tvary, vzorce, odkazy na obrázky)
- hlavná logika práce s otázkami: `lib/questions.ts`
- prompt engineering pre AI: `lib/prompts.ts`
- lokálna história: `lib/history.ts`
- API routes:
- `POST /api/solve`
- `POST /api/solve-image`
- `POST /api/validate`
- `POST /api/theory-qa`

## Testovanie a kvalita

Aktuálny stav v tomto repozitári:

- `npm test` (7 test suites, 25 testov) - passed
- `npm run lint` - passed
- `npm run build` - passed

## Poznámky

- Históriu riešení aplikácia ukladá iba do prehliadača používateľa.
- API route `/api/theory-qa` načítava obrázok cez `URL` (fallback `http://localhost:3000`). Pri nasadení nastavte správnu verejnú URL aplikácie.
