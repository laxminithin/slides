# FIRST YEAR WEB DEPTH RE-SYNC REPORT

## Source Baseline

- Old PPTX slides: 2,765
- Final PPTX slides: 9,963
- PPTX slides added: 7,198
- Source folder: `First_Year_PPTX/`
- Backup folder used only for comparison: `First_Year_PPTX_BACKUP_BEFORE_DEPTH_PASS/`

## Existing Web Baseline

Phase 3 Math:
- 8 subjects
- 40 modules
- 320 web slides

Phase 4 Science:
- 11 new subjects
- 55 modules
- 603 web slides

Applied Chemistry for Smart Systems:
- 1 preserved subject
- 5 modules
- 305 web slides

## Re-sync Results

- Subjects audited: 20
- Subjects upgraded: 19
- Subjects unchanged: 1
- Modules audited: 100
- Modules upgraded: 95
- Web slides before: 1228
- Web slides after: 3162
- Web slides added: 1934
- Math derivation/source-equation scenes: 436
- Math worked-example scenes: 403
- Science worked numerical/source-example scenes: 513
- Science graph/process/apparatus scenes: 539

## Coverage QA

PASS. Each upgraded module now keeps the original interactive core scenes and adds grouped finalized-PPTX teaching blocks from the module inspection text. Applied Chemistry for Smart Systems was audited as the already-deep 305-slide implementation and left unchanged.

## Correctness QA

PASS. The re-sync preserves finalized PPTX wording for source-specific teaching blocks and keeps provenance labels from the depth finalization report. No unsupported textbook claim was introduced for modules marked as syllabus-only/no local prescribed-textbook match.

## 1920 QA

PASS. Math QA rendered 2244 viewport-slide checks across 1920x1080 and 1280x720 with 0 failures. Science QA rendered 3470 viewport-slide checks with 0 failures.

## 1280 QA

PASS. Covered by the same dual-resolution Math and Science browser QA runs.

## Animation QA

PASS. Existing major animations were preserved; source-block scenes use progressive reveal and existing visual/process/equation components.

## Storytelling QA

PASS. Each module keeps its opening, coverage, visual meaning, derivation/equation, example/numerical, graph/process, source-depth sequence, and recap.

## Repetition QA

PASS. Source-depth scenes are grouped by PPTX slide ranges and alternate explanation, derivation/example, visual/process, and application classifications where supported by source text.

## Regression QA

PASS. Foundation QA rendered 14 foundation scenes, 14 reduced-motion scenes, and 6 regression routes with 0 failures. Math and Science QA regression routes also passed.

## Build Status

PASS. `npm run build` completed successfully; the existing Vite large-chunk warning remains.

## Source Inconsistencies

- Applied Chemistry for Smart Systems does not include finalized `.inspect.ndjson` sidecars in `First_Year_PPTX/`; it was therefore preserved as the already-deep implementation using the finalized report counts.
- Many expanded modules retain the finalization report provenance: official syllabus source with no matched local prescribed-textbook PDF. The web re-sync does not claim prescribed-textbook backing for those cases.

## Phase 5 Readiness

`phase5Ready = true`

## Subject / Module Delta Table

| Subject | Code | Module | PPTX Slides | Web Before | Web After | Added | Coverage |
|---|---|---|---:|---:|---:|---:|---|
| Differential Calculus and Linear Algebra | 1BMATC101 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATC101 | Module 2 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATC101 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATC101 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATC101 | Module 5 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Numerical Methods | 1BMATC201 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Numerical Methods | 1BMATC201 | Module 2 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Numerical Methods | 1BMATC201 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Numerical Methods | 1BMATC201 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Numerical Methods | 1BMATC201 | Module 5 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus & Linear Algebra | 1BMATE101 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus & Linear Algebra | 1BMATE101 | Module 2 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus & Linear Algebra | 1BMATE101 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus & Linear Algebra | 1BMATE101 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus & Linear Algebra | 1BMATE101 | Module 5 | 40 | 8 | 28 | 20 | PASS |
| Calculus, Laplace Transforms and Numerical Techniques | 1BMATE201 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| Calculus, Laplace Transforms and Numerical Techniques | 1BMATE201 | Module 2 | 40 | 8 | 28 | 20 | PASS |
| Calculus, Laplace Transforms and Numerical Techniques | 1BMATE201 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| Calculus, Laplace Transforms and Numerical Techniques | 1BMATE201 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| Calculus, Laplace Transforms and Numerical Techniques | 1BMATE201 | Module 5 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATM101 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATM101 | Module 2 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATM101 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATM101 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| Differential Calculus and Linear Algebra | 1BMATM101 | Module 5 | 42 | 8 | 29 | 21 | PASS |
| Multivariable Calculus and Numerical Methods | 1BMATM201 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| Multivariable Calculus and Numerical Methods | 1BMATM201 | Module 2 | 42 | 8 | 29 | 21 | PASS |
| Multivariable Calculus and Numerical Methods | 1BMATM201 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| Multivariable Calculus and Numerical Methods | 1BMATM201 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| Multivariable Calculus and Numerical Methods | 1BMATM201 | Module 5 | 40 | 8 | 28 | 20 | PASS |
| CALCULUS AND LINEAR ALGEBRA | 1BMATS101 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| CALCULUS AND LINEAR ALGEBRA | 1BMATS101 | Module 2 | 40 | 8 | 28 | 20 | PASS |
| CALCULUS AND LINEAR ALGEBRA | 1BMATS101 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| CALCULUS AND LINEAR ALGEBRA | 1BMATS101 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| CALCULUS AND LINEAR ALGEBRA | 1BMATS101 | Module 5 | 40 | 8 | 28 | 20 | PASS |
| NUMERICAL METHODS | 1BMATS201 | Module 1 | 40 | 8 | 28 | 20 | PASS |
| NUMERICAL METHODS | 1BMATS201 | Module 2 | 40 | 8 | 28 | 20 | PASS |
| NUMERICAL METHODS | 1BMATS201 | Module 3 | 40 | 8 | 28 | 20 | PASS |
| NUMERICAL METHODS | 1BMATS201 | Module 4 | 40 | 8 | 28 | 20 | PASS |
| NUMERICAL METHODS | 1BMATS201 | Module 5 | 40 | 8 | 28 | 20 | PASS |
| Applied Chemistry for Sustainable Structures and Material Design | 1BCHEC102/202 | Module 1 | 40 | 11 | 31 | 20 | PASS |
| Applied Chemistry for Sustainable Structures and Material Design | 1BCHEC102/202 | Module 2 | 40 | 10 | 30 | 20 | PASS |
| Applied Chemistry for Sustainable Structures and Material Design | 1BCHEC102/202 | Module 3 | 40 | 12 | 32 | 20 | PASS |
| Applied Chemistry for Sustainable Structures and Material Design | 1BCHEC102/202 | Module 4 | 42 | 12 | 33 | 21 | PASS |
| Applied Chemistry for Sustainable Structures and Material Design | 1BCHEC102/202 | Module 5 | 42 | 12 | 33 | 21 | PASS |
| Applied Chemistry for Emerging Electronics and Futuristic Devices | 1BCHEE102/202 | Module 1 | 40 | 11 | 31 | 20 | PASS |
| Applied Chemistry for Emerging Electronics and Futuristic Devices | 1BCHEE102/202 | Module 2 | 40 | 11 | 31 | 20 | PASS |
| Applied Chemistry for Emerging Electronics and Futuristic Devices | 1BCHEE102/202 | Module 3 | 42 | 10 | 31 | 21 | PASS |
| Applied Chemistry for Emerging Electronics and Futuristic Devices | 1BCHEE102/202 | Module 4 | 42 | 11 | 32 | 21 | PASS |
| Applied Chemistry for Emerging Electronics and Futuristic Devices | 1BCHEE102/202 | Module 5 | 40 | 12 | 32 | 20 | PASS |
| Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 1BCHEM102/202 | Module 1 | 40 | 12 | 32 | 20 | PASS |
| Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 1BCHEM102/202 | Module 2 | 40 | 10 | 30 | 20 | PASS |
| Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 1BCHEM102/202 | Module 3 | 42 | 11 | 32 | 21 | PASS |
| Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 1BCHEM102/202 | Module 4 | 42 | 10 | 31 | 21 | PASS |
| Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 1BCHEM102/202 | Module 5 | 40 | 11 | 31 | 20 | PASS |
| Elements of Biotechnology and Biomimetics | 1BEBT105/205 | Module 1 | 42 | 12 | 33 | 21 | PASS |
| Elements of Biotechnology and Biomimetics | 1BEBT105/205 | Module 2 | 40 | 12 | 32 | 20 | PASS |
| Elements of Biotechnology and Biomimetics | 1BEBT105/205 | Module 3 | 40 | 12 | 32 | 20 | PASS |
| Elements of Biotechnology and Biomimetics | 1BEBT105/205 | Module 4 | 42 | 12 | 33 | 21 | PASS |
| Elements of Biotechnology and Biomimetics | 1BEBT105/205 | Module 5 | 40 | 12 | 32 | 20 | PASS |
| Elements of Chemical Engineering | 1BECHE105/205 | Module 1 | 40 | 11 | 31 | 20 | PASS |
| Elements of Chemical Engineering | 1BECHE105/205 | Module 2 | 40 | 11 | 31 | 20 | PASS |
| Elements of Chemical Engineering | 1BECHE105/205 | Module 3 | 42 | 11 | 32 | 21 | PASS |
| Elements of Chemical Engineering | 1BECHE105/205 | Module 4 | 42 | 11 | 32 | 21 | PASS |
| Elements of Chemical Engineering | 1BECHE105/205 | Module 5 | 40 | 11 | 31 | 20 | PASS |
| QUANTUM PHYSICS AND ELECTRONIC SENSORS | 1BPHEC102/202 | Module 1 | 42 | 12 | 33 | 21 | PASS |
| QUANTUM PHYSICS AND ELECTRONIC SENSORS | 1BPHEC102/202 | Module 2 | 42 | 10 | 31 | 21 | PASS |
| QUANTUM PHYSICS AND ELECTRONIC SENSORS | 1BPHEC102/202 | Module 3 | 42 | 10 | 31 | 21 | PASS |
| QUANTUM PHYSICS AND ELECTRONIC SENSORS | 1BPHEC102/202 | Module 4 | 42 | 10 | 31 | 21 | PASS |
| QUANTUM PHYSICS AND ELECTRONIC SENSORS | 1BPHEC102/202 | Module 5 | 42 | 11 | 32 | 21 | PASS |
| ELECTRICAL ENGINEERING MATERIALS | 1BPHEE102/102 | Module 1 | 42 | 10 | 31 | 21 | PASS |
| ELECTRICAL ENGINEERING MATERIALS | 1BPHEE102/102 | Module 2 | 42 | 10 | 31 | 21 | PASS |
| ELECTRICAL ENGINEERING MATERIALS | 1BPHEE102/102 | Module 3 | 42 | 10 | 31 | 21 | PASS |
| ELECTRICAL ENGINEERING MATERIALS | 1BPHEE102/102 | Module 4 | 42 | 10 | 31 | 21 | PASS |
| ELECTRICAL ENGINEERING MATERIALS | 1BPHEE102/102 | Module 5 | 42 | 10 | 31 | 21 | PASS |
| PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 1BPHYC102/202 | Module 1 | 40 | 11 | 31 | 20 | PASS |
| PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 1BPHYC102/202 | Module 2 | 42 | 11 | 32 | 21 | PASS |
| PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 1BPHYC102/202 | Module 3 | 42 | 11 | 32 | 21 | PASS |
| PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 1BPHYC102/202 | Module 4 | 40 | 11 | 31 | 20 | PASS |
| PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 1BPHYC102/202 | Module 5 | 42 | 11 | 32 | 21 | PASS |
| PHYSICS OF MATERIALS | 1BPHYM102/202 | Module 1 | 40 | 11 | 31 | 20 | PASS |
| PHYSICS OF MATERIALS | 1BPHYM102/202 | Module 2 | 40 | 11 | 31 | 20 | PASS |
| PHYSICS OF MATERIALS | 1BPHYM102/202 | Module 3 | 42 | 10 | 31 | 21 | PASS |
| PHYSICS OF MATERIALS | 1BPHYM102/202 | Module 4 | 42 | 11 | 32 | 21 | PASS |
| PHYSICS OF MATERIALS | 1BPHYM102/202 | Module 5 | 42 | 11 | 32 | 21 | PASS |
| QUANTUM PHYSICS AND APPLICATIONS | 1BPHYS102/202 | Module 1 | 42 | 10 | 31 | 21 | PASS |
| QUANTUM PHYSICS AND APPLICATIONS | 1BPHYS102/202 | Module 2 | 42 | 10 | 31 | 21 | PASS |
| QUANTUM PHYSICS AND APPLICATIONS | 1BPHYS102/202 | Module 3 | 42 | 10 | 31 | 21 | PASS |
| QUANTUM PHYSICS AND APPLICATIONS | 1BPHYS102/202 | Module 4 | 42 | 10 | 31 | 21 | PASS |
| QUANTUM PHYSICS AND APPLICATIONS | 1BPHYS102/202 | Module 5 | 42 | 10 | 31 | 21 | PASS |
| Principles of Soil Science and Agronomy | 1BSSA105/205 | Module 1 | 42 | 12 | 33 | 21 | PASS |
| Principles of Soil Science and Agronomy | 1BSSA105/205 | Module 2 | 40 | 12 | 32 | 20 | PASS |
| Principles of Soil Science and Agronomy | 1BSSA105/205 | Module 3 | 40 | 12 | 32 | 20 | PASS |
| Principles of Soil Science and Agronomy | 1BSSA105/205 | Module 4 | 40 | 12 | 32 | 20 | PASS |
| Principles of Soil Science and Agronomy | 1BSSA105/205 | Module 5 | 40 | 12 | 32 | 20 | PASS |
| Applied Chemistry for Smart Systems | 1BCHES102/202 | Module 1 | 60 | 60 | 60 | 0 | UNCHANGED - already-deep source/web parity retained |
| Applied Chemistry for Smart Systems | 1BCHES102/202 | Module 2 | 59 | 59 | 59 | 0 | UNCHANGED - already-deep source/web parity retained |
| Applied Chemistry for Smart Systems | 1BCHES102/202 | Module 3 | 61 | 61 | 61 | 0 | UNCHANGED - already-deep source/web parity retained |
| Applied Chemistry for Smart Systems | 1BCHES102/202 | Module 4 | 66 | 66 | 66 | 0 | UNCHANGED - already-deep source/web parity retained |
| Applied Chemistry for Smart Systems | 1BCHES102/202 | Module 5 | 59 | 59 | 59 | 0 | UNCHANGED - already-deep source/web parity retained |
