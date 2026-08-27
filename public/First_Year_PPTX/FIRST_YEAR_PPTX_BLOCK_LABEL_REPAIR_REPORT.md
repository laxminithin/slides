# FIRST YEAR — PPTX BLOCK LABEL REPAIR REPORT

**Date:** 2026-08-27  
**Freeze during repair:** `STALE / REOPENED FOR DEFECT REPAIR`  
**Freeze after repair:** `firstYearFrozen = true` (recertified)

Student-facing First Year slides were showing internal source-mapping labels such as `Final PPTX teaching block 9-10`. Those strings are gone. Source-depth slides now use topic titles extracted from the finalized PPTX inspection files, and PPTX slide ranges stay in hidden metadata only.

---

## Root Cause

The leak was shared, not subject-specific.

1. **Scene builders stamped mapping labels as titles/subtitles**
   - Engineering / Remaining: `title: Final PPTX teaching block ${block.range}`
   - Programming: `subtitle: Final PPTX teaching block ${block.range}` plus nested `title="PPTX depth block"`
   - Math / Science: `title: Source Teaching Block ${index + 1}` and `subtitle: Finalized PPTX slides ${block.range}`
2. **`SourceTeachingBlock` rendered `PPTX slides {range}` and internal action verbs** (`ADD CODE EXECUTION`, `EXPAND`, …) in the student-facing header.
3. **`scripts/build-first-year-depth-content.mjs` `titleFrom()` rejected PPTX headings longer than 96 characters** and fell back to `Source teaching block N`. That fallback was then shown as the board heading.

The first several core scenes were authored and looked correct. The defect appeared once source-depth slides were inserted after the core (around slide 9–12 depending on family).

Chemistry (`1BCHES102/202`) does not use this generator and was not leaking.

---

## Affected Subjects

| Count | Value |
|---|---:|
| First Year subjects scanned | **51** |
| Subjects affected | **50** (all generator-backed subjects) |
| Chemistry preserved (not leaking) | **1** |
| Modules / segments affected | **290** |
| Source-depth slides affected | **1558** |
| Source blocks | **1558** |
| Depth-content fallback titles `Source teaching block N` | **233** |

Family breakdown of affected source-depth slides:

| Family | Subjects | Source slides before |
|---|---:|---:|
| Mathematics | 8 | 191 |
| Science | 11 | 359 |
| Programming | 5 | 128 |
| Engineering (incl. some lab codes classified in depth JSON) | 17 | 584 |
| Remaining humanities / language / lab / project | 9 | 296 |

---

## Internal Labels Found

Student-facing strings that were leaking:

- `Final PPTX teaching block {range}`
- `Source Teaching Block N`
- `Finalized PPTX slides {range} of {n}`
- `PPTX slides {range}`
- `PPTX depth block` / `PPTX teaching depth`
- Takeaways of the form `finalized PPTX slides {range} remain a grouped teaching scene`

These remain allowed only in QA JSON, inspect files, and `sourcePptxSlides` / `sourceBlockId` metadata.

---

## Source PPTX Blocks Re-read

Every usable source block was rebuilt from `First_Year_PPTX/**/*.inspect.ndjson`:

- Heading / topic line from the grouped PPTX slides becomes `title`
- Bullet and body lines become `points`
- Scaffold chrome (`Concept structure`, `Application, confusion, exam view`, textbook hour maps, process-only boards) is skipped
- `sourceSlides` / `sourceBlockId` stored as metadata, not rendered

Examples after repair (rendered DOM, 1920×1080):

| Subject | Slide | Before | After |
|---|---:|---|---|
| Basics of Electrical Engineering | 14 | `Final PPTX teaching block 9-10` | `Electrostatics: Coulomb's law, definitions of absolute and relative permittivity` |
| Fundamentals of ECE | 15 | `Final PPTX teaching block …` | `Diodes and their Application: Introduction` |
| Introduction to AI | 10 | `Final PPTX teaching block 1-2` | `Introduction to Artificial Intelligence: Artificial Intelligence, How Does AI Work?` |
| Differential Calculus (1BMATC101) | 10 | `Source Teaching Block N` | `angle between the radius vector and the tangent` |
| Indian Constitution | 12 | `Final PPTX teaching block …` | `Introduction to the Indian constitution, The Making of the Constitution` |
| Quantum Physics | 12 | `Source Teaching Block N` | `Heisenberg's Uncertainty Principle and its application` |

---

## Architecture Fix

Shared production path:

- `scripts/build-first-year-depth-content.mjs` — never emits `Source teaching block N`; ranks real PPTX topic lines; stores `sourceSlides`
- `src/firstYearSourceLabels.js` — leak regex, title clipping, student-facing title/subtitle/takeaway
- `src/firstYearSourceSlides.jsx` — single builder used by all five First Year families
- `src/firstYearFoundation` `SourceTeachingBlock` — pedagogical kind only (`Circuit`, `Derivation`, …); range on `data-source-slides` only; textbook provenance only in `import.meta.env.DEV`
- Family packages no longer construct mapping titles

Production fallback is **fail QA**, not render an internal label.

---

## QA Rule Added

Permanent checks:

- `scripts/first-year-placeholder-leak-qa.mjs` (`npm run qa:first-year-leaks`)
- `scripts/first-year-placeholder-leak-render-qa.mjs` (rendered DOM at 1920×1080 and 1280×720)
- Forensic QA (`scripts/first-year-phase8-forensic-qa.mjs`) now fails `placeholder-leak` on rendered text
- Static audit records `placeholderLeaks`

Patterns: `Final PPTX teaching block`, `PPTX teaching block`, `source teaching block`, `teaching block \d+-\d+`, `PPTX slides \d`, `final source section`, `teaching source section`, `PPTX source content`.

---

## Content-Specificity QA

Generic replacement failures: **0**.  
Titles are PPTX topic lines (Ohm/KVL, Coulomb, diodes, Heisenberg, constitution, polar tangent, …), not “this section explains the important concept.”

PPTX depth-pass decks themselves still contain truncated TOC lines (`C circuits:` for `DC circuits:`). Those are source-text truncations, not mapping labels.

---

## Render QA

| Check | Result |
|---|---|
| Rendered First Year instances | **9410** (4705 × 1920 + 4705 × 1280) |
| `placeholder-leak` | **0** |
| Frame overflow in leak harness | **0** |
| 1920 failures | **0** |
| 1280 failures | **0** |

---

## Storytelling QA

Source-depth slides keep PPTX block order. Titles now name the actual next topic instead of a range, so core → source-depth → recap follows the finalized deck sequence. Adjacent identical source boards: **0**.

---

## Duplicate QA

| Check | Result |
|---|---|
| Adjacent identical source blocks | **0** |
| Cross-stream shared syllabus topics (math/chemistry variants; CAED justified) | Pre-existing stream overlap, not this defect |

---

## Build

`npm run build` — **PASS** (Vite large-chunk warning unchanged and non-fatal).

Non-First-Year regression routes (chemistry opener, BDA, DBMS, ToC, AI, CN, analog, OS, foundation playground) — **0** failures at both viewports.

---

## Subject table (internal block labels)

| Subject | Code | Before | After |
|---|---|---:|---:|
| Introduction to AI and Applications | 1BAIA103/203 | 25 | 0 |
| Basics of Electrical Engineering | 1BBEE105/205 | 35 | 0 |
| Basic Electrical Lab | 1BBEEL107 | 48 | 0 |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | 32 | 0 |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | 31 | 0 |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | 33 | 0 |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | 30 | 0 |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | 31 | 0 |
| Applied Chemistry for Sustainable Structures and Material Design | 1BCHEC102/202 | 36 | 0 |
| Applied Chemistry for Emerging Electronics and Futuristic Devices | 1BCHEE102/202 | 43 | 0 |
| Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 1BCHEM102/202 | 41 | 0 |
| ENGINEERING MECHANICS | 1BCIV105/205 | 28 | 0 |
| Elements of Aeronautics | 1BEAE105/205 | 34 | 0 |
| Elements of Biotechnology and Biomimetics | 1BEBT105/205 | 34 | 0 |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | 30 | 0 |
| Fundamentals of Electronics and Communication Engineering Lab | 1BECEL107 | 48 | 0 |
| Elements of Chemical Engineering | 1BECHE105/205 | 31 | 0 |
| Programming in C | 1BEIT105/205 | 24 | 0 |
| Elements of Mechanical Engineering | 1BEME105/205 | 35 | 0 |
| Elements of Mechanical Engineering Lab | 1BEMEL105 | 48 | 0 |
| Communication Skills | 1BENGL106 | 38 | 0 |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | 26 | 0 |
| Introduction to Electrical Engineering | 1BESC104B/204B | 34 | 0 |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | 27 | 0 |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | 34 | 0 |
| ESSENTIALS OF INFORMATION TECHNOLOGY | 1BESC104E | 26 | 0 |
| Indian Constitution and Engineering Ethics | 1BICO107/207 | 21 | 0 |
| Innovation & Design Thinking Lab | 1BIDTL158 | 32 | 0 |
| Balake Kannada (Kannada for Usage) | 1BKBK109 | 22 | 0 |
| Samskrutika Kannada | 1BKSK109 | 22 | 0 |
| Differential Calculus and Linear Algebra | 1BMATC101 | 24 | 0 |
| Differential Calculus and Numerical Methods | 1BMATC201 | 21 | 0 |
| Differential Calculus & Linear Algebra | 1BMATE101 | 30 | 0 |
| Calculus, Laplace Transforms and Numerical Techniques | 1BMATE201 | 24 | 0 |
| Differential Calculus and Linear Algebra | 1BMATM101 | 25 | 0 |
| Multivariable Calculus and Numerical Methods | 1BMATM201 | 17 | 0 |
| CALCULUS AND LINEAR ALGEBRA | 1BMATS101 | 21 | 0 |
| NUMERICAL METHODS | 1BMATS201 | 29 | 0 |
| MECHANICS AND MATERIALS LABORATORY | 1BMEML107/207 | 36 | 0 |
| QUANTUM PHYSICS AND ELECTRONIC SENSORS | 1BPHEC102/202 | 29 | 0 |
| ELECTRICAL ENGINEERING MATERIALS | 1BPHEE102/102 | 28 | 0 |
| PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 1BPHYC102/202 | 30 | 0 |
| PHYSICS OF MATERIALS | 1BPHYM102/202 | 31 | 0 |
| QUANTUM PHYSICS AND APPLICATIONS | 1BPHYS102/202 | 29 | 0 |
| PYTHON PROGRAMMING | 1BPLC105B/205B | 28 | 0 |
| INTRODUCTION TO C PROGRAMMING | 1BPLC205E/105E | 25 | 0 |
| C Programming Lab | 1BPOPL107/207 | 56 | 0 |
| Interdisciplinary Project Work | 1BPRJ258 | 32 | 0 |
| Soft Skills | 1BSKS106/206 | 37 | 0 |
| Principles of Soil Science and Agronomy | 1BSSA105/205 | 27 | 0 |
| Applied Chemistry for Smart Systems | 1BCHES102/202 | 0 | 0 |

**After = 0 for every subject.**

---

## Freeze Status

The previous Phase 8 `firstYearFrozen = true` was **stale** while mapping labels were student-facing. Freeze was reopened for this repair.

Recertified `firstYearFrozen = true` because:

- Internal block labels visible = 0
- Placeholder leak failures = 0
- Generic replacement content = 0
- Missing PPTX teaching blocks = 0 (blocks kept and rebuilt, not deleted)
- Structural duplicates (adjacent) = 0
- Storytelling failures = 0
- 1920 failures = 0
- 1280 failures = 0
- Regression failures = 0
- Build = PASS
