# UI/UX Redesign Proposal (Matikárka 8A)

## Scope

Deep UX/UI review of the current Next.js app with recommendations for a modern, sleek, high-feedback experience with richer animation and flashier workflows.

Skills used:
- `ui-ux-pro-max` (audit framework, interaction/accessibility/performance heuristics)
- `frontend-design` (distinctive visual direction and motion language)

## Current UX/UI Assessment

### Strengths
- Product structure is clear: `Solve`, `Collection`, `Practice`, `Theory`, `History`.
- Large touch targets and simple workflows are child-friendly.
- Good async feedback exists (`LoadingView`, disabled buttons during requests).
- Consistent card pattern and spacing across most pages.

### Main UI Issues
- Visual identity feels template-like rather than product-grade modern.
- Heavy emoji usage as primary icons in nav/cards/actions reduces polish and consistency.
- Flat white surfaces dominate; limited depth, atmosphere, and hierarchy.
- Typography is partially inconsistent (`globals.css` default body stack conflicts with Poppins intent).
- Navigation is functional but lacks premium interaction states and context.

### Main UX Issues
- Home screen has minimal onboarding and no progressive guidance into workflows.
- Solve flow lacks delightful transitions between states (`input -> loading -> step reveal -> success`).
- Practice flow has weak momentum mechanics (streaking, progress celebration, next-action pull).
- Theory Q&A area is useful but visually detached from theory cards and image context.
- History has low information density (quick scan, grouping, and recap are limited).

## Redesign Direction

## Design System Direction (recommended)
- Style: **Soft neo-clay / glass-hybrid education UI** (not generic enterprise dashboard).
- Tone: bright, premium-learning, kinetic, encouraging.
- Visual motif: layered cards, soft shadows, subtle gradients, rounded geometry, SVG icon set.
- Replace emoji-as-icons with a consistent icon library (Lucide/Heroicons) while preserving playful accent moments.

### Color Strategy
- Keep brand anchoring in indigo + warm CTA, but improve contrast and surface hierarchy.
- Introduce semantic tokens:
- `--bg-canvas`, `--bg-surface-1`, `--bg-surface-2`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--brand-primary`, `--brand-accent`, `--success`, `--warning`, `--danger`

### Typography Strategy
- Use one expressive display face + one highly readable body face (via `next/font`).
- Enforce a stable type scale (`12/14/16/18/24/32`) and line-height system.
- Remove fallback conflict from global CSS so the app renders consistently.

## Motion System (Modern + Flashy)

### Global Motion Principles
- 150-300ms micro interactions.
- Use transform/opacity only for performance.
- Respect `prefers-reduced-motion`.

### High-Impact Motion Moments
1. **Page-load choreography**
- Staggered reveal for heading, card grid, and primary CTA.
- Soft parallax/background mesh drift on static pages.

2. **Solve workflow transitions**
- Animated state container morph (`input -> loading -> solved`).
- Step cards slide/fade with depth and subtle progress pulse.
- Final success block with controlled confetti burst + glow ring around answer.

3. **Practice momentum effects**
- Progress bar with spring interpolation.
- Correct answer: brief card “lift + shimmer”.
- Streak indicator with combo animation (e.g., 2x/3x streak).

4. **Theory interaction polish**
- Expand/collapse image with smooth height + blur-to-sharp reveal.
- Q&A messages animate per-bubble with subtle directional entrance.

## Workflow Redesign Recommendations

### 1) Home (`/`)
- Add “quick start” cards for most common intents:
- Solve now
- Practice 5 questions
- Continue from history
- Add a lightweight “today goal” indicator to create return motivation.

### 2) Solve (`/solve`)
- Better dual-input UX: segmented control (`Text` / `Photo`) with active state.
- For uploads, show preview thumbnail + remove/replace actions.
- Add model turnaround expectation (“~5-10s”).
- Add “save + continue to practice this topic” CTA after success.

### 3) Practice (`/practice`)
- Convert topic selection grid to richer cards (progress, difficulty recommendation).
- Add session meta header (streak, remaining questions, confidence).
- Introduce “adaptive next question” hinting based on mistakes.

### 4) Collection (`/collection`)
- Add search + filter chips (topic + difficulty).
- Show per-topic completion status (“Solved x/y”).
- Add mini previews to reduce click depth.

### 5) Theory (`/theory`, `/theory/[id]`)
- Introduce sticky section TOC inside detail page.
- Keep formula cards compact with quick-copy math action.
- Contextual prompt chips in Q&A (“Čo je…?”, “Ako vypočítam…?”).

### 6) History (`/history`)
- Group by date (“Today”, “This week”, “Earlier”).
- Add quick replay actions: `Open in Solve`, `Practice similar`.
- Add summary stats (“saved examples”, “favorite topic”).

## Accessibility + Quality Upgrades

- Replace emoji-only actionable icons with labeled SVG icons.
- Ensure color contrast >= 4.5:1 for text.
- Add visible keyboard focus styles for all controls.
- Increase consistency of aria labels for icon buttons.
- Add reduced-motion variants for all animated transitions.

## Implementation Plan (Phased)

### Phase 1: Foundations (high ROI)
- Tokenize colors, spacing, shadows, radii in `globals.css`.
- Unify typography and iconography.
- Upgrade bottom navigation visuals + active states.

### Phase 2: Motion + Solve/Practice
- Build reusable motion primitives (`FadeIn`, `Stagger`, `CardLift`, `ProgressPulse`).
- Redesign `Solve` and `Practice` with richer transitions and progression cues.

### Phase 3: Theory/History + retention loops
- Improve theory detail reading experience and Q&A affordances.
- Redesign history for discoverability + replay workflows.

### Phase 4: Measurement and optimization
- Track interaction metrics (session completion, retry rate, solve-to-practice conversion).
- Tune animation intensity and reduce-motion fallbacks from real usage.

## Suggested Immediate Quick Wins

1. Replace bottom nav emoji icons with SVG icons + stronger active indicator.
2. Introduce a design token layer (colors, shadows, radii, typography scale).
3. Add page-enter stagger animation to home, collection, theory cards.
4. Upgrade solve success state with premium celebration animation and next-step CTA.
5. Add practice streak/energy indicator to improve engagement.
