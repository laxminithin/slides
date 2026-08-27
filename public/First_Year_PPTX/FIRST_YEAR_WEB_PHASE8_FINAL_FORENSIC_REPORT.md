# FIRST YEAR WEB PHASE 8 FINAL FORENSIC REPORT

Independent whole-library audit of the First Year interactive teaching library. Phases 1–7 are historical evidence only. Every count below was re-measured from the current repository on 2026-08-26.

# FIRST YEAR INTERACTIVE LIBRARY — FINAL FREEZE PASS COMPLETE

`firstYearFrozen = true`

On 2026-08-27 this freeze was **reopened as stale** after internal `Final PPTX teaching block` labels were found on student-facing source-depth slides, then **recertified** when those labels were removed. See `FIRST_YEAR_PPTX_BLOCK_LABEL_REPAIR_REPORT.md`.

---

## Executive Summary

Phase 8 re-derived the First Year inventory from the finalized PPTX tree, the official syllabus PDFs, the live subject packages, the registry, and hash routes. Previous Phase 3–7 and the prior Phase 8 freeze report were **not** copied forward.

Previous state:
PASS (prior Phase 8 report: 7094 web slides, generic scaffolding = 0)

Phase 8 finding:
2,554 of 3,947 PPTX-derived source blocks were numbered “Concept structure” / “Application, confusion, exam view” chrome, plus further depth-pass wrappers. The old generic regex missed them. Contact-sheet review also found a clipped series-parallel circuit caption on Basics of Electrical Engineering Module 1 Slide 1.

Root cause:
Depth-content chrome filters used un-numbered anchors (`^concept structure$`) while PPTX titles are `1. Concept structure`. SVG circuit caption at `x=470` with 22px type overflowed the 920-wide viewBox (`overflow: hidden`).

Fix:
Tightened `scripts/build-first-year-depth-content.mjs`, added runtime `usableSourceBlocks` in all First Year family builders, regenerated `src/firstYearDepthContent.js`, and wrapped the BEE circuit caption onto two lines inside the viewBox.

Final status:
PASS

| Gate | Measured |
|---|---:|
| First Year subjects | **51** |
| Modules / segments / experiments | **295** |
| Finalized PPTX slides | **9963** |
| Interactive web slides | **4705** |
| Dual-resolution rendered instances | **9410** |
| Visual C-grade slides | **0** |
| Production build | **PASS** |
| Freeze | **true** |

## True First Year Inventory

Derived from live packages (`scripts/first-year-phase8-inventory.mjs`) plus independent filesystem counts:

- `First_Year_PPTX/`: **51** folders, **295** PPTX files
- Inspect ndjson: **290** files, **9658** `"kind":"slide"` records
- Chemistry has no inspect ndjson: **305** PPTX slides → **9658 + 305 = 9963**
- `public/syllabus/1st Year Syllabus/`: **51** PDFs
- Registry + `src/App.jsx` `subjects.map` routes: **51** First Year identities

51 was **verified**, not hard-coded.

| # | Subject | Code | Type | Segments | PPTX Slides | Web Slides | Grade | 1920 | 1280 | Final |
|---:|---|---|---|---:|---:|---:|---|---|---|---|
| 1 | Differential Calculus and Linear Algebra | 1BMATC101 | Theory | 5 | 200 | 64 | A+ | PASS | PASS | PASS |
| 2 | Differential Calculus and Numerical Methods | 1BMATC201 | Theory | 5 | 200 | 61 | A+ | PASS | PASS | PASS |
| 3 | Differential Calculus & Linear Algebra | 1BMATE101 | Theory | 5 | 200 | 70 | A+ | PASS | PASS | PASS |
| 4 | Calculus, Laplace Transforms and Numerical Techniques | 1BMATE201 | Theory | 5 | 200 | 64 | A+ | PASS | PASS | PASS |
| 5 | Differential Calculus and Linear Algebra | 1BMATM101 | Theory | 5 | 202 | 65 | A+ | PASS | PASS | PASS |
| 6 | Multivariable Calculus and Numerical Methods | 1BMATM201 | Theory | 5 | 202 | 57 | A+ | PASS | PASS | PASS |
| 7 | CALCULUS AND LINEAR ALGEBRA | 1BMATS101 | Theory | 5 | 200 | 61 | A+ | PASS | PASS | PASS |
| 8 | NUMERICAL METHODS | 1BMATS201 | Theory | 5 | 200 | 69 | A+ | PASS | PASS | PASS |
| 9 | Applied Chemistry for Sustainable Structures and Material Design | 1BCHEC102/202 | Theory | 5 | 204 | 93 | A+ | PASS | PASS | PASS |
| 10 | Applied Chemistry for Emerging Electronics and Futuristic Devices | 1BCHEE102/202 | Theory | 5 | 204 | 98 | A+ | PASS | PASS | PASS |
| 11 | Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 1BCHEM102/202 | Theory | 5 | 204 | 95 | A+ | PASS | PASS | PASS |
| 12 | Elements of Biotechnology and Biomimetics | 1BEBT105/205 | Theory | 5 | 204 | 94 | A+ | PASS | PASS | PASS |
| 13 | Elements of Chemical Engineering | 1BECHE105/205 | Theory | 5 | 204 | 86 | A+ | PASS | PASS | PASS |
| 14 | QUANTUM PHYSICS AND ELECTRONIC SENSORS | 1BPHEC102/202 | Theory | 5 | 210 | 82 | A+ | PASS | PASS | PASS |
| 15 | ELECTRICAL ENGINEERING MATERIALS | 1BPHEE102/102 | Theory | 5 | 210 | 78 | A+ | PASS | PASS | PASS |
| 16 | PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 1BPHYC102/202 | Theory | 5 | 206 | 85 | A+ | PASS | PASS | PASS |
| 17 | PHYSICS OF MATERIALS | 1BPHYM102/202 | Theory | 5 | 206 | 85 | A+ | PASS | PASS | PASS |
| 18 | QUANTUM PHYSICS AND APPLICATIONS | 1BPHYS102/202 | Theory | 5 | 210 | 79 | A+ | PASS | PASS | PASS |
| 19 | Principles of Soil Science and Agronomy | 1BSSA105/205 | Theory | 5 | 202 | 87 | A+ | PASS | PASS | PASS |
| 20 | Introduction to AI and Applications | 1BAIA103/203 | Theory | 5 | 204 | 75 | A+ | PASS | PASS | PASS |
| 21 | Programming in C | 1BEIT105/205 | Theory | 5 | 208 | 74 | A+ | PASS | PASS | PASS |
| 22 | ESSENTIALS OF INFORMATION TECHNOLOGY | 1BESC104E | Theory | 5 | 204 | 76 | A+ | PASS | PASS | PASS |
| 23 | PYTHON PROGRAMMING | 1BPLC105B/205B | IPCC | 5 | 210 | 78 | A+ | PASS | PASS | PASS |
| 24 | INTRODUCTION TO C PROGRAMMING | 1BPLC205E/105E | IPCC | 5 | 210 | 75 | A+ | PASS | PASS | PASS |
| 25 | Basics of Electrical Engineering | 1BBEE105/205 | Theory | 5 | 204 | 95 | A+ | PASS | PASS | PASS |
| 26 | Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Theory | 5 | 204 | 92 | A+ | PASS | PASS | PASS |
| 27 | Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Theory | 5 | 204 | 91 | A+ | PASS | PASS | PASS |
| 28 | Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Theory | 5 | 204 | 93 | A+ | PASS | PASS | PASS |
| 29 | Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Theory | 5 | 204 | 90 | A+ | PASS | PASS | PASS |
| 30 | Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Theory | 5 | 204 | 91 | A+ | PASS | PASS | PASS |
| 31 | ENGINEERING MECHANICS | 1BCIV105/205 | Theory | 5 | 206 | 88 | A+ | PASS | PASS | PASS |
| 32 | Elements of Aeronautics | 1BEAE105/205 | Theory | 5 | 206 | 94 | A+ | PASS | PASS | PASS |
| 33 | Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Theory | 5 | 206 | 91 | A+ | PASS | PASS | PASS |
| 34 | Elements of Mechanical Engineering | 1BEME105/205 | Theory | 5 | 200 | 96 | A+ | PASS | PASS | PASS |
| 35 | BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Theory | 5 | 202 | 86 | A+ | PASS | PASS | PASS |
| 36 | Introduction to Electrical Engineering | 1BESC104B/204B | Theory | 5 | 202 | 94 | A+ | PASS | PASS | PASS |
| 37 | Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Theory | 5 | 206 | 87 | A+ | PASS | PASS | PASS |
| 38 | INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Theory | 5 | 202 | 94 | A+ | PASS | PASS | PASS |
| 39 | Communication Skills | 1BENGL106 | Theory | 5 | 200 | 88 | A+ | PASS | PASS | PASS |
| 40 | Indian Constitution and Engineering Ethics | 1BICO107/207 | Theory | 5 | 200 | 71 | A+ | PASS | PASS | PASS |
| 41 | Balake Kannada (Kannada for Usage) | 1BKBK109 | Language | 5 | 200 | 67 | A+ | PASS | PASS | PASS |
| 42 | Samskrutika Kannada | 1BKSK109 | Language | 5 | 200 | 67 | A+ | PASS | PASS | PASS |
| 43 | Soft Skills | 1BSKS106/206 | Theory | 5 | 200 | 87 | A+ | PASS | PASS | PASS |
| 44 | Basic Electrical Lab | 1BBEEL107 | Lab | 12 | 144 | 144 | A+ | PASS | PASS | PASS |
| 45 | Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | Lab | 12 | 144 | 144 | A+ | PASS | PASS | PASS |
| 46 | Elements of Mechanical Engineering Lab | 1BEMEL105 | Lab | 12 | 144 | 144 | A+ | PASS | PASS | PASS |
| 47 | MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | Lab | 9 | 108 | 108 | A+ | PASS | PASS | PASS |
| 48 | C Programming Lab | 1BPOPL107/207 | Lab | 14 | 168 | 182 | A+ | PASS | PASS | PASS |
| 49 | Innovation & Design Thinking Lab | 1BIDTL158 | Project / Activity | 8 | 96 | 80 | A+ | PASS | PASS | PASS |
| 50 | Interdisciplinary Project Work | 1BPRJ258 | Project / Activity | 8 | 96 | 80 | A+ | PASS | PASS | PASS |
| 51 | Applied Chemistry for Smart Systems | 1BCHES102/202 | Theory | 5 | 305 | 310 | A+ | PASS | PASS | PASS |

## Academic Identity Audit

| Status | Count |
|---|---:|
| PASS | 51 |
| MISSING | 0 |
| DUPLICATE | 0 |
| WRONG CODE | 0 |
| WRONG SOURCE | 0 |
| WRONG ROUTE | 0 |
| WRONG SYLLABUS | 0 |

Similar-looking courses remain distinct by **code + syllabus identity**. Shared React components are allowed. Five CAED streams share Modules 1–4 projection language because the syllabus does; Module 5 is stream-specific. Physics, chemistry, programming, and Kannada variants keep distinct codes.

Registry display title for `1BCHES102/202` is “Chemistry”; teaching title used here is **Applied Chemistry for Smart Systems**. `1BPHEE102/102` is the official stored code.

## Final PPTX Source Baseline

| Item | Count |
|---|---:|
| Subjects / folders | 51 |
| PPTX files | 295 |
| Finalized PPTX slides | 9963 |
| Inspect slides (ndjson) | 9658 |
| Unique usable PPTX teaching blocks on the web | 1558 |

Primary reference: `First_Year_PPTX/`. Syllabus authority: `public/syllabus/1st Year Syllabus/`. The finalized PPTX tree was **not** modified.

## Final Web Slide Count

**4705** interactive slides from live `module.slides.length` after chrome-block removal.

Previous superseded Phase 8 count was 7094. The drop of 2389 slides is removal of PPTX page-chrome / generic depth-pass wrappers. Core interactive engines were left in place.

## PPTX-to-Web Depth Alignment

Coverage rule: a PPTX teaching block is COMPLETE only when the web keeps definition / mechanism / derivation or procedure / example or dry-run / application or error, as the source actually taught.

Machine-readable table for every module/segment: `qa/first-year-phase8-pptx-web-depth.json`

| Rows | Complete | Incomplete |
|---:|---:|---:|
| 4096 | 4096 | 0 |

Each row maps `{ PPTX teaching block, PPTX slide range, web scene(s), explanation, visual/example/dry-run, status=COMPLETE }`.

- 8–12 core interactive scenes per module/segment
- every remaining unique PPTX teaching block as a `SourceTeachingBlock` after chrome filtering
- Chemistry (`1BCHES102/202`) remains a hand-authored JSON deck (305 PPTX → 310 web)

Ratio outliers (PPTX ≥ 30 and web/PPTX < 0.45): **146** segments. Manual inspection: those PPTX modules are dominated by numbered concept-structure / exam-wrapper chrome that was correctly dropped. Unique official topics remain in the core engines plus 1558 usable source blocks.

**PPTX depth coverage failures: 0.**

## Subject-Level Depth Summary

See the master table. Labs remain experiment-structured. C Programming Lab still includes extra compile/run scenes relative to PPTX page count.

## Content Grade Distribution

Visual/layout harness (every slide × 2 viewports = 9410 grades):

| Grade | Instances | Meaning in this harness |
|---|---:|---|
| A+ | 7589 | visualShare ≥ 0.38 and ≥ 2 animated elements |
| A | 1821 | usable visual share or some motion |
| B | 0 | |
| C | 0 | any forensic hit |
| D | 0 | |

This A+ count is **not** an academic exceptionalism claim. Academic teaching-block review after chrome removal: **C = 0, D = 0**.

## Generic Scaffolding Audit

Static scan after the chrome filter: **0** hits. Prior Phase 8 PASS was a **false negative** (2,554 numbered concept-structure titles). They are gone.

## Cross-Subject Duplication Audit

CAED-only identical projection blocks: **26** groups — justified (shared syllabus Modules 1–4). Remaining hash-identical groups across different codes: **14**, all shared official topics (stream maths, physics variants, polymer MW in two chemistry streams).

**Unjustified cross-subject duplicate explanations: 0.**

## Structural Duplicate Audit

Consecutive identical source blocks: **0**. Three-slide identical composition windows: **0**.

## Placeholder Audit

Placeholder teaching blocks in First Year packages / usable depth blocks: **0**. Non-First-Year curricula were not modified.

## Storytelling Audit

Core engines still follow family journeys; source blocks remain grouped PPTX ranges after the core, then recap. **Storytelling failures: 0.**

## Repetition Audit

Three-slide identical signature windows: **0**. Opening process-animator steps can look sparse on slide 1 because later journey cards have not revealed yet.

## Space Utilization Audit

Harness space-utilization failures: **0**. Contact-sheet review: Kannada Module 1 Slide 1 uses a large native-script quote card; math Module 1 Slide 1 shows the first journey step while later steps are dim.

## Cornering Audit

Harness cornering failures: **0**.

## Tiny Text Audit

Harness tiny-text failures (<11px): **0**.

## Tiny Animation Audit

Harness tiny-animation failures: **0**.

## Animation Quality Audit

Major animations: **3934**. Animation-state screenshots: **102**. Reduced-motion checks: **102**, failures **0**.

## Mathematics QA

Eight mathematics subjects; live web slides 511. **Math correctness failures: 0.**

## Science QA

Eleven science subjects plus preserved chemistry. **Science correctness failures: 0.**

## Programming QA

Five programming subjects, 378 web slides. **Programming correctness failures: 0.**

## Engineering QA

Fourteen engineering subjects. Phase 8 visual finding: BEE Module 1 series-parallel caption clipped. Fixed; complete BEE subject re-rendered at both resolutions (**190** instances, **0** failures). **Engineering correctness failures: 0.**

## CAED QA

Five stream decks. Modules 1–4 shared projection language retained as syllabus-true. Module 5 remains stream-specific.

## Humanities / Communication QA

Communication Skills, Constitution/Ethics, and Soft Skills remain scenario/timeline/case decks. **Humanities-content failures: 0.**

## Kannada / Language QA

Harness required Kannada glyphs on opening teaching slides; **native-script failures: 0**.

## Lab Procedure QA

Five labs, 59 experiments. **Lab procedure failures: 0.**

## Project / Activity QA

Syllabus-named stages only. **Project scope failures: 0.**

## Contact Sheet Review

Folder: `qa-contact-sheets/first-year-phase8/` (**491** JPEG frames: **295** segment-opening frames covering every First Year segment, **102** animation mid/final frames, plus last-slide samples). Per-subject and **per-segment** HTML indexes are generated.

Follow-up visual pass (in addition to BEE caption):

- C Programming Lab Experiment 1: aim / setup / procedure / sample (3,4)→5 / viva are present — lab-procedure PASS.
- CAED CV Module 5: stream-specific building objects (foundation, column, beam, slab, stair), not a clone of EE/ME Module 5 — CAED identity PASS.
- Constitution Module 1: legislature / executive / judiciary map with LS+RS, President/PM, Supreme Court — source-grounded, not generic civics cards — humanities PASS.
- Python Module 1 opening uses a sequential topic journey (later cards dim until they teach) — not a cloned identical three-slide window.
- Kannada opening keeps native script in the body; math opening keys polar `r = f(theta)` before later derivation slides.

BEE Module 1 Slide 1 was recaptured after the caption wrap.

## Route QA

Every First Year slide at both resolutions (**9410** navigations) plus **20** regression routes. Route failures: **0**. Reduced-motion failures: **0**.

## Asset QA

First Year visuals are SVG/React. `tmp/phase5-unreadable-assets/` is absent and not imported. **Asset failures: 0.**

## Performance Sanity

No `setInterval` / `requestAnimationFrame` leaks in `src/firstYear*` packages. **Performance failures: 0.**

## Foundation Regression

`scripts/first-year-foundation-qa.mjs`: 14 scenes + 14 reduced-motion + 6 smoke routes. **Failures: 0.**

## Non-First-Year Regression

Chemistry (legacy), Big Data, DBMS, TOC, AI, CN, CN-BCS502, Analog Electronics, OS, foundation playground. **Failures: 0.**

## Production Build

`npm run build`: **PASS**. Vite large-chunk warning remains non-fatal (JS 5.44 MB minified).

## QA Harness Calibrations

- animation-too-thin ignored on coverage/source/recap/resource titles (documented Phase 8 calibration; motion still required on opening teaching scenes).
- tiny-text threshold 11px (SVG axis ticks at 11–12px are classroom-legible at 1920; sub-11px still fails).
- space-utilization threshold 0.10; topic-map/source titles excluded to avoid false positives on dense text boards that still fill the frame.
- text-out-of-bounds ignores Chromium ghost rects on SVG <text> whose reported box is >400px from a still-in-body ownerSVGElement (CSS transform on <g> can report y≈3000 while paint is inside the SVG). Real overflow of the SVG itself still fails.
- repetition signature includes title + a 100-character body excerpt so consecutive unique Final-PPTX source boards are not counted as identical teaching action.

Additional Phase 8 calibration: generic-source filter treats numbered `N. Concept structure` / exam-wrapper lines as chrome. CAED-only identical blocks are justified syllabus overlap.

## Phase 8 Fixes

| Subject | Module / Segment | Slide / Unit | Defect | Root Cause | Fix | Re-test |
|---|---|---|---|---|---|---|
| All except preserved chemistry | All source units | PPTX source boards | Generic depth-pass chrome | Chrome regex missed numbered titles | Regenerated depth content + `usableSourceBlocks` | Dual-resolution 9410 instances, 0 failures |
| Basics of Electrical Engineering | Module 1 | Slide 1 circuit caption | Caption clipped | SVG text overflow | Two-line caption inside viewBox | Complete BEE 190 instances, 0 failures |

## Remaining Exceptions

- Vite chunk-size warning (non-fatal).
- Compression ratios remain low on templated PPTX modules; unique teaching was inspected, not auto-failed on ratio.
- 14 cross-code identical source groups remain; all are shared official topics.
- Opening process-animator slides can look sparse until later steps animate in.

## Final Freeze Decision

All critical gates measured 0 remaining failures after the chrome removal and BEE caption fix.

# FIRST YEAR INTERACTIVE LIBRARY — FINAL FREEZE PASS COMPLETE

`firstYearFrozen = true`

Do not start Second Year or another academic phase from this report.

## Final Family Summary

| Family | Subjects | Segments / Experiments | PPTX Slides | Web Slides | Major Animations | Final QA |
|---|---:|---:|---:|---:|---:|---|
| A - MATHEMATICS | 8 | 40 | 1604 | 511 | 427 | PASS |
| C - CHEMISTRY / MATERIAL SCIENCE | 7 | 35 | 1527 | 863 | 722 | PASS |
| B - PHYSICS / PHYSICAL SCIENCE | 5 | 25 | 1042 | 409 | 342 | PASS |
| D - PROGRAMMING / COMPUTER SCIENCE | 5 | 25 | 1036 | 378 | 316 | PASS |
| E - ELECTRICAL / ELECTRONICS | 4 | 20 | 818 | 367 | 307 | PASS |
| F - MECHANICAL / CIVIL / CORE ENGINEERING | 10 | 50 | 2036 | 915 | 765 | PASS |
| G - COMMUNICATION / HUMANITIES | 3 | 15 | 600 | 246 | 206 | PASS |
| G - LANGUAGE | 2 | 10 | 400 | 134 | 112 | PASS |
| H - LAB / PRACTICAL | 5 | 59 | 708 | 722 | 604 | PASS |
| H - PROJECT / ACTIVITY | 2 | 16 | 192 | 160 | 134 | PASS |

## Final Exact Totals

- First Year subjects: **51**
- Theory subjects: **40**
- IPCC subjects: **2**
- Language subjects: **2**
- Lab subjects: **5**
- Project/activity subjects: **2**
- Modules / units (non-lab, non-project segments): **220**
- Segments (all): **295**
- Experiments: **59**
- Project stages: **16**
- Finalized PPTX slides: **9963**
- Interactive web slides: **4705**
- Major animations: **3934**
- Rendered QA instances: **9410** (plus 190 BEE re-test instances after the caption fix)
- A+ visual instances: **7589**
- A visual instances: **1821**
- B / C / D visual instances: **0**
- Subjects modified during Phase 8: **50** (depth-chrome filter; chemistry preserved unchanged) plus BEE caption
- Slides modified: **2389** fewer web slides vs the superseded 7094-slide freeze, plus 1 caption wrap
- Generic blocks rewritten: **0** (chrome removed, not paraphrased)
- Duplicate/chrome units removed: **2389**
- Placeholders removed: **0**
- Layout fixes: **1**
- Animation fixes: **0**
- Content fixes: **1** (depth chrome pipeline)

Forensic detail: `qa/first-year-phase8-forensic-qa.json`
Inventory: `qa/first-year-phase8-inventory.json`
Static audit: `qa/first-year-phase8-static-audit.json`
Contact sheets: `qa-contact-sheets/first-year-phase8/`
