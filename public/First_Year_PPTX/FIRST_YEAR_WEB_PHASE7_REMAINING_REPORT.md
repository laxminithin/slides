# FIRST YEAR WEB PHASE 7 REMAINING REPORT

## Final PPTX Source Baseline

- Final First Year PPTX source: `First_Year_PPTX/`
- Total First Year subjects: 51
- Total PPTX files rendered/checked: 295
- Total First Year slides: 9963
- Phase 7 final PPTX slides: 1900
- Phase 7 PPTX files: 100
- Render failures in final PPTX baseline: 0

## Phase 7 Scope

Extracted directly from `FIRST_YEAR_WEB_PHASE1_AUDIT.json` Section K, `laterPhases["7"]`. Phase 7 is the remaining Humanities / Communication / Constitution / Kannada / Labs / Project work. Phase 1–6 subjects were not recreated. Phase 8 forensic QA was not started.

Humanities decks use a non-engineering palette (teal / amber / conversation scenes). Labs are experiment sequences (aim → principle → tools → procedure → measurement → observation → error → viva), not five theory modules. Projects are activity stages with syllabus-named deliverables only. Kannada uses native Unicode in the slide body, not English-only cards.

| # | Subject | Code | Kind | Files | PPTX slides | Web slides |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 1 | Communication Skills | 1BENGL106 | Theory | 5 units | 200 | 150 |
| 2 | Indian Constitution and Engineering Ethics | 1BICO107/207 | Theory | 5 modules | 200 | 150 |
| 3 | Balake Kannada (Kannada for Usage) | 1BKBK109 | Language | 5 modules | 200 | 145 |
| 4 | Samskrutika Kannada | 1BKSK109 | Language | 5 units | 200 | 145 |
| 5 | Soft Skills | 1BSKS106/206 | Theory | 5 modules | 200 | 150 |
| 6 | Basic Electrical Lab | 1BBEEL107 | Lab | 12 exp | 144 | 144 |
| 7 | Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Lab | 12 exp | 144 | 144 |
| 8 | Elements of Mechanical Engineering Lab | 1BEMEL105 | Lab | 12 exp | 144 | 144 |
| 9 | MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Lab | 9 exp | 108 | 108 |
| 10 | C Programming Lab | 1BPOPL107/207 | Lab | 14 exp | 168 | 182 |
| 11 | Innovation & Design Thinking Lab | 1BIDTL158 | Activity | 8 stages | 96 | 80 |
| 12 | Interdisciplinary Project Work | 1BPRJ258 | Project | 8 stages | 96 | 80 |

## Subjects Created

12 Phase 7 subjects were created under `src/firstYearRemaining/` and registered first in `src/data/subjects.jsx`. Completed Phase 2–6 families were not recreated.

Routes:

- `communication-skills-1bengl106` (`unit-N`)
- `indian-constitution-engineering-ethics-1bico107-207` (`module-N`)
- `balake-kannada-1bkbk109` (`module-N`)
- `samskrutika-kannada-1bksk109` (`unit-N`)
- `soft-skills-1bsks106-206` (`module-N`)
- `basic-electrical-lab-1bbeel107` (`experiment-N`)
- `fundamentals-ece-lab-1becel107` (`experiment-N`)
- `elements-mechanical-lab-1bemel105` (`experiment-N`)
- `mechanics-materials-lab-1bmeml107-207` (`experiment-N`)
- `c-programming-lab-1bpopl107-207` (`experiment-N`)
- `innovation-design-thinking-lab-1bidtl158` (`stage-N`)
- `interdisciplinary-project-work-1bprj258` (`stage-N`)

## Modules / Units / Experiments / Stages Created

100 official segments: 15 theory units/modules, 10 language units/modules, 59 lab experiments, 16 project/activity stages.

## Interactive Slides

Interactive web slides created: **1622**. QA rendered **3244** slide instances across 1920×1080 and 1280×720. Depth is PPTX-driven: core teaching scenes plus every finalized PPTX teaching block as a source slide.

- Theory engines: 10 core scenes + source blocks + recap (30 web slides / 40 PPTX)
- Language engines: 9 core scenes + source blocks + recap (29 web slides / 40 PPTX), Kannada glyphs required in the slide body
- Lab engines: 8 core scenes + source blocks (12 web / 12 PPTX)
- C Programming Lab: 9 core scenes (includes terminal output) + source blocks (13 web / 12 PPTX)
- Project/activity engines: 6 core scenes + source blocks (10 web / 12 PPTX)

## Character Separation

- Humanities / communication / constitution / soft skills: scenario, dialogue, timeline, ethics case — not circuit or formula decks
- Kannada: Noto Sans Kannada; word → meaning → usage; grammar transform; passage; polite-form mistakes
- Labs: apparatus, polarity, procedure order, observation table, viva
- C lab: compile/run terminal, dry-run table, execution trace
- Projects: week-block activities and syllabus-named deliverables only; no invented extra artefacts

## Dual-Resolution QA

Script: `scripts/first-year-phase7-remaining-qa.mjs`
Report: `qa/first-year-phase7-remaining-report.json`

- Remaining slides rendered: 3244 (1622 × 2 viewports)
- Reduced-motion checks: 24
- Regression routes: 16 (Chemistry, Math, Science, Programming, Phase 6 Electrical, Foundation, BDA, Analog Electronics)
- Failures: **0**

## Production Build

`npm run build` **PASS**. Vite large-chunk warning remains non-fatal and pre-existing. Latest hashes: `index-DEoI4Wnl.js`, `index-B5ayKyZh.css`.

## Source Inconsistencies

- Phase 1 audit `totalSlides` values are pre-depth-pass counts. Phase 7 used `First_Year_PPTX/` (9,963 slides) as the teaching-depth authority.
- Kannada syllabus PDFs extract as garbled bytes; teaching copy was rebuilt from official topics with correct Unicode.
- Two Analog Electronics WhatsApp JPEGs remain isolated in `tmp/phase5-unreadable-assets/` after Phase 5 EPERM failures; Phase 7 did not restore or reference them.

## Phase 8 Readiness

`phase8Ready = true`

Phase 8 (whole First Year forensic QA) was **not started**.

## Module Delta Table

| Subject | Code | Module | Final PPTX Slides | Final Web Slides | Compression/Expansion | Depth Coverage |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Communication Skills | 1BENGL106 | Unit 1 | 40 | 30 | 0.75 | PASS |
| Communication Skills | 1BENGL106 | Unit 2 | 40 | 30 | 0.75 | PASS |
| Communication Skills | 1BENGL106 | Unit 3 | 40 | 30 | 0.75 | PASS |
| Communication Skills | 1BENGL106 | Unit 4 | 40 | 30 | 0.75 | PASS |
| Communication Skills | 1BENGL106 | Unit 5 | 40 | 30 | 0.75 | PASS |
| Indian Constitution and Engineering Ethics | 1BICO107/207 | Module 1 | 40 | 30 | 0.75 | PASS |
| Indian Constitution and Engineering Ethics | 1BICO107/207 | Module 2 | 40 | 30 | 0.75 | PASS |
| Indian Constitution and Engineering Ethics | 1BICO107/207 | Module 3 | 40 | 30 | 0.75 | PASS |
| Indian Constitution and Engineering Ethics | 1BICO107/207 | Module 4 | 40 | 30 | 0.75 | PASS |
| Indian Constitution and Engineering Ethics | 1BICO107/207 | Module 5 | 40 | 30 | 0.75 | PASS |
| Balake Kannada (Kannada for Usage) | 1BKBK109 | Module 1 | 40 | 29 | 0.72 | PASS |
| Balake Kannada (Kannada for Usage) | 1BKBK109 | Module 2 | 40 | 29 | 0.72 | PASS |
| Balake Kannada (Kannada for Usage) | 1BKBK109 | Module 3 | 40 | 29 | 0.72 | PASS |
| Balake Kannada (Kannada for Usage) | 1BKBK109 | Module 4 | 40 | 29 | 0.72 | PASS |
| Balake Kannada (Kannada for Usage) | 1BKBK109 | Module 5 | 40 | 29 | 0.72 | PASS |
| Samskrutika Kannada | 1BKSK109 | Unit 1 | 40 | 29 | 0.72 | PASS |
| Samskrutika Kannada | 1BKSK109 | Unit 2 | 40 | 29 | 0.72 | PASS |
| Samskrutika Kannada | 1BKSK109 | Unit 3 | 40 | 29 | 0.72 | PASS |
| Samskrutika Kannada | 1BKSK109 | Unit 4 | 40 | 29 | 0.72 | PASS |
| Samskrutika Kannada | 1BKSK109 | Unit 5 | 40 | 29 | 0.72 | PASS |
| Soft Skills | 1BSKS106/206 | Module 1 | 40 | 30 | 0.75 | PASS |
| Soft Skills | 1BSKS106/206 | Module 2 | 40 | 30 | 0.75 | PASS |
| Soft Skills | 1BSKS106/206 | Module 3 | 40 | 30 | 0.75 | PASS |
| Soft Skills | 1BSKS106/206 | Module 4 | 40 | 30 | 0.75 | PASS |
| Soft Skills | 1BSKS106/206 | Module 5 | 40 | 30 | 0.75 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 1 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 2 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 3 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 4 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 5 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 6 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 7 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 8 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 9 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 10 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 11 | 12 | 12 | 1.00 | PASS |
| Basic Electrical Lab | 1BBEEL107 | Experiment 12 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 1 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 2 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 3 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 4 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 5 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 6 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 7 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 8 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 9 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 10 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 11 | 12 | 12 | 1.00 | PASS |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Experiment 12 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 1 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 2 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 3 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 4 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 5 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 6 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 7 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 8 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 9 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 10 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 11 | 12 | 12 | 1.00 | PASS |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | Experiment 12 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 1 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 2 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 3 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 4 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 5 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 6 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 7 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 8 | 12 | 12 | 1.00 | PASS |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Experiment 9 | 12 | 12 | 1.00 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 1 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 2 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 3 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 4 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 5 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 6 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 7 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 8 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 9 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 10 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 11 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 12 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 13 | 12 | 13 | 1.08 | PASS |
| C Programming Lab | 1BPOPL107/207 | Experiment 14 | 12 | 13 | 1.08 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 1 | 12 | 10 | 0.83 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 2 | 12 | 10 | 0.83 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 3 | 12 | 10 | 0.83 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 4 | 12 | 10 | 0.83 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 5 | 12 | 10 | 0.83 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 6 | 12 | 10 | 0.83 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 7 | 12 | 10 | 0.83 | PASS |
| Innovation & Design Thinking Lab | 1BIDTL158 | Stage 8 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 1 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 2 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 3 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 4 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 5 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 6 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 7 | 12 | 10 | 0.83 | PASS |
| Interdisciplinary Project Work | 1BPRJ258 | Stage 8 | 12 | 10 | 0.83 | PASS |

## Final Subject Table

| Subject | Code | Kind | Segments | Web Slides | PPTX Slides | Process Visuals | Major Animations | 1920 QA | 1280 QA | Content |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| Communication Skills | 1BENGL106 | theory | 5 | 150 | 200 | 15 | 75 | PASS | PASS | COMPLETE |
| Indian Constitution and Engineering Ethics | 1BICO107/207 | theory | 5 | 150 | 200 | 15 | 75 | PASS | PASS | COMPLETE |
| Balake Kannada (Kannada for Usage) | 1BKBK109 | language | 5 | 145 | 200 | 25 | 70 | PASS | PASS | COMPLETE |
| Samskrutika Kannada | 1BKSK109 | language | 5 | 145 | 200 | 25 | 70 | PASS | PASS | COMPLETE |
| Soft Skills | 1BSKS106/206 | theory | 5 | 150 | 200 | 15 | 75 | PASS | PASS | COMPLETE |
| Basic Electrical Lab | 1BBEEL107 | lab | 12 | 144 | 144 | 12 | 72 | PASS | PASS | COMPLETE |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | lab | 12 | 144 | 144 | 12 | 72 | PASS | PASS | COMPLETE |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | lab | 12 | 144 | 144 | 12 | 72 | PASS | PASS | COMPLETE |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | lab | 9 | 108 | 108 | 9 | 54 | PASS | PASS | COMPLETE |
| C Programming Lab | 1BPOPL107/207 | clab | 14 | 182 | 168 | 14 | 84 | PASS | PASS | COMPLETE |
| Innovation & Design Thinking Lab | 1BIDTL158 | project | 8 | 80 | 96 | 8 | 48 | PASS | PASS | COMPLETE |
| Interdisciplinary Project Work | 1BPRJ258 | project | 8 | 80 | 96 | 8 | 48 | PASS | PASS | COMPLETE |
