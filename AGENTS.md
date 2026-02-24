# AGENTS.md

This document gives coding agents a high-signal map of the project: product behavior, architecture, data flow, and current health.

## 1. Project Purpose

Matikárka is a Slovak educational web app for 8th-grade math support (including dyscalculia/ADHD-friendly language constraints). It provides:

- guided AI solving of custom problems,
- practice mode over a curated local question bank,
- theory pages with visual notebook references,
- AI Q&A over selected theory images,
- local history of solved examples.

## 2. User-Facing Features

### Solve (`/solve`)

- Input math problem as text and/or image upload (JPG/PNG/HEIC/WEBP, up to 10 MB).
- Calls:
- `POST /api/solve` for text-only input.
- `POST /api/solve-image` for image-assisted solving.
- Renders structured steps with progressive reveal.
- Final state includes answer, praise, optional history save.

### Practice (`/practice`)

- Select topic and difficulty (`1 | 2`).
- Pulls question pool from `data/questions.json` via `lib/questions.ts`.
- Randomly samples up to 5 questions per session.
- Uses `POST /api/validate` to evaluate student answers.
- Provides hint system (`2` hints max/question), retries, solution reveal, final score summary.

### Collection (`/collection`, `/collection/[topic]`)

- Browse question bank by topic.
- Topic pages surface direct actions:
- Open item in Solve mode (`/solve?q=<id>`).
- Open item in Practice mode (`/practice?q=<id>`).
- If topic has mapped theory section(s), links to theory pages are shown.

### Theory (`/theory`, `/theory/[id]`)

- Displays structured geometry/math theory cards from `data/theory.ts`.
- Optional notebook image toggle (`public/theory/*.png`).
- Embedded chat panel (`TheoryQAPanel`) sends question + theory image filename to `POST /api/theory-qa`.

### History (`/history`)

- Client-side storage only (`localStorage` key: `matikarka_history`).
- View, filter by topic, inspect detailed saved solution steps, clear all history.

## 3. Tech Stack

- Framework: Next.js `16.1.6` (App Router, React Compiler enabled)
- Runtime/UI: React `19.2.3`, TypeScript (strict), Tailwind CSS 4
- Libraries:
- `openai` for LLM calls
- `react-dropzone` for image upload
- `framer-motion` for step animations
- `canvas-confetti` for celebration UI
- Testing: Jest 30 + Testing Library
- Deployment config present for Netlify (`netlify.toml`, `@netlify/plugin-nextjs`)

## 4. App Architecture

### Routing

- UI routes under `app/**/page.tsx`.
- API routes under `app/api/**/route.ts`.
- Shared domain logic under `lib/*` and `data/*`.
- Reusable UI under `components/*`.

### Data Sources

- Questions: `data/questions.json` (49 items total, 8 topics).
- Theory: `data/theory.ts` (section metadata, shapes, formulas, topic mapping).
- History: browser LocalStorage only.

### Core Domain Modules

- `lib/questions.ts`
- topic metadata (`TOPICS`)
- filters by topic/difficulty
- lookup by id/random

- `lib/history.ts`
- save/get/delete history entries
- entry schema includes `problem`, optional `imageBase64`, full AI `solution`, optional `topic`, `date`

- `lib/prompts.ts`
- primary system prompt for solving
- image-specific solving prefix
- validator prompt template

- `lib/openai.ts`
- centralized OpenAI client using `OPENAI_API_KEY`

## 5. API Endpoints and Flow

### `POST /api/solve`

- Input: `{ problem }`
- Validates non-empty problem.
- Calls `openai.chat.completions.create` with model `gpt-4o` and strict JSON response format.
- Parses AI JSON into `Solution` and returns it.

### `POST /api/solve-image`

- Input: `{ imageBase64, mimeType, additionalText }`
- Requires image payload.
- Sends multimodal message (`image_url` + optional text context) to `gpt-4o`.
- Returns parsed `Solution` JSON.

### `POST /api/validate`

- Input: `{ problem, studentAnswer, correctAnswer }`
- Uses deterministic validation prompt (`temperature: 0`).
- Returns `{ spravne, sprava }` JSON.

### `POST /api/theory-qa`

- Input: `{ question, imageFile }` (client also sends `theoryId`, route currently ignores it).
- Guardrails:
- rejects empty question
- rejects image filenames not matching `^theory-[\w-]+\.png$`
- Fetches theory image from `${process.env.URL ?? 'http://localhost:3000'}/theory/<imageFile>`.
- Sends image + question to `gpt-4o` and returns short Slovak answer.

## 6. How the App Works End-to-End

1. User opens one of 5 bottom-nav tabs (`Solve`, `Collection`, `Practice`, `Theory`, `History`).
2. For solving/practice/theory QA, client submits JSON payload to internal Next.js API routes.
3. API routes call OpenAI using prompts tuned for very simple Slovak explanations and strict output shape.
4. UI renders result cards and optional celebratory feedback.
5. On save, solution is persisted only in browser localStorage; history page reads from that store.

## 7. Deep Check (Current State)

Checks run locally in this workspace:

- `npm test -- --runInBand`: PASS (`7` suites, `25` tests)
- `npm run lint`: PASS
- `npm run build`: PASS

Notable observations:

- `npm install` reported `26 high severity vulnerabilities` from transitive dependencies (`npm audit` needed for detail/remediation planning).
- Test warning appears: `--localstorage-file was provided without a valid path` (does not fail tests, but worth cleaning in CI/runner config if persistent).
- `app/globals.css` still contains default template font/color variables; layout body class currently enforces Poppins and app colors, so this is mostly redundant style debt.

## 8. Environment and Runbook

Required:

- `OPENAI_API_KEY`

Recommended:

- `URL` set to public app base URL in deployed environments (important for `/api/theory-qa` image fetch).

Local run:

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm test -- --runInBand
npm run lint
npm run build
```

## 9. Known Constraints and Risks

- AI response parsing assumes valid JSON for solve/validate routes; malformed model output returns 500.
- History is non-portable (local browser only; no account sync/server persistence).
- Practice answer validation is model-based, not symbolic math, so edge-case equivalence may be judged inconsistently.
- Theory QA depends on server being able to fetch its own hosted image URL.

## 10. Suggested Next Engineering Steps

- Add schema validation (e.g., zod) around parsed AI responses in all API routes.
- Add integration tests for `/api/solve-image` route.
- Add error telemetry and request IDs for easier production debugging.
- Address dependency vulnerabilities with targeted upgrades and regression checks.
