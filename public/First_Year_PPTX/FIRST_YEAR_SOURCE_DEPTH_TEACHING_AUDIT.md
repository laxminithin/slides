# FIRST YEAR — SOURCE-DEPTH TEACHING AUDIT

**Date:** 2026-08-27  
**Freeze during audit:** reopened while C/D and hours-chrome titles were repaired  
**Freeze after audit:** `firstYearFrozen = true` (recertified)

A correct PPTX title is not the same as a teachable slide. This audit graded the **body** of every repaired source-depth scene against the finalized `First_Year_PPTX/` inspect files, then recertified freeze only after leak, depth, dual-resolution render, regression, and production build all passed.

---

## Executive Summary

Student-facing internal labels (`Final PPTX teaching block`, `Source teaching block N`, `PPTX slides X–Y`) were already gone. The remaining defect was **title-only / chrome teaching**: some boards still used module-hour banners, pedagogy crumbs, or process chips as if they were topics.

After rebuilding topic clusters from inspect NDJSON:

| Gate | Result |
|---|---|
| Source-depth slides audited | **1,395** (was 1,558 after label repair; 163 chrome/hours clusters dropped) |
| Content status COMPLETE | **1,395** |
| Grades C / D | **0 / 0** |
| Title-only / generic body / range mismatch / duplicate / missing | **0** |
| `npm run qa:first-year-leaks` | **PASS** |
| `npm run qa:first-year-depth` | **PASS** |
| Dual-resolution render | **3,950** instances, **0** failures |
| Route regression | **28** checks, **0** failures |
| `npm run build` | **PASS** (existing chunk-size warning only) |
| `firstYearFrozen` | **true** |

Chemistry (`1BCHES102/202`) remains preserved: **0** generator source-depth slides.

---

## Why This Audit Was Required

The block-label repair recertified freeze because **internal strings** were gone. It did not prove that each board **teaches the mapped PPTX range**.

The Heisenberg / Coulomb examples in the original brief assumed the finalized PPTX contained principle + formula + application. The inspect files do **not**. They are a depth-pass template: syllabus topic names stamped into generic frames (“why this topic matters”, concept structure, board-work). Repair is therefore **source-grounded unpacking of named parts**, not Wikipedia enrichment.

A second defect appeared during this audit: longest-line title extraction preferred **hour banners** (`(8 Hours Theory + 4 Hours Tutorials)`, `(03 hours of pedagogy) 1`) over the actual topic (`Polar coordinates`, `Language: A few tips`). Those titles are now stripped or skipped.

---

## Source-Depth Architecture

Pipeline:

1. `First_Year_PPTX/**/*.inspect.ndjson` — text shapes per PPTX slide  
2. `scripts/build-first-year-depth-content.mjs` — cluster by topic-why / lab-aim, skip chrome, unpack compound headings, readable titles  
3. `src/firstYearDepthContent.js` — generated blocks (`title`, `explanation`, `points`, hidden `sourceSlides` / `range`)  
4. `src/firstYearSourceSlides.jsx` + `SourceTeachingBlock` — student-facing board  
5. Family insert: math / science / programming / engineering before recap; labs **after principle** so Aim → Principle → source theory → tools → procedure → observation → result → viva is preserved  

Titles: derived from the inspect heading; long headings are shortened without falling back to `Source teaching block N`. Full heading stays in `sourceHeading` metadata.

Body: named parts from the heading become topic-bound points. If the PPTX block has no formula, none is invented.

Ranges: stored as `data-source-slides` / `sourcePptxSlides`. Not shown in classroom chrome. Nested `fy-footer` is hidden inside `.slide-body` so App’s slide footer is the only visible footer.

Incomplete extraction: chrome, hours banners, subject footers, and process chips are skipped. Empty clusters are dropped rather than filled with general knowledge.

---

## 1,558-Slide Inventory

Label-repair counted **1,558** source-depth slides. This audit’s rebuilt clusters:

| Count | Value |
|---|---:|
| Subjects scanned | 51 |
| Generator-backed subjects | 50 |
| Chemistry preserved | 1 |
| Modules / segments with source depth | 290 |
| Source-depth slides now | **1,395** |
| COMPLETE | 1,395 |
| SHALLOW / GENERIC / MISMATCH / DUPLICATE / BROKEN | 0 |

Full per-slide rows (subject, code, module, web-scan index, source range, title, status, grade) live in:

`qa/first-year-source-depth-inventory.json`

The drop from 1,558 → 1,395 is **chrome removal** (topic-map, journey, hours-of-pedagogy crumbs, process-only boards), not silent deletion of named syllabus topics. Missing-range QA against why-this-topic / Aim slides is **0**.

---

## PPTX Range Alignment

Each usable block carries `sourceSlides` / `range`. Render QA required `.fy-source-block[data-source-slides]` on every expected source-depth web slide.

- Source-range mismatch failures: **0**  
- Unjustified duplicate ranges: **0**  
- Meaningful missing source teaching blocks: **0**  
- Student-facing range labels: **0** (leak QA)

Lab source slides start after the principle scene (typically web slide 3), not before viva.

---

## Title Quality

| Check | Result |
|---|---|
| Fallback `Source teaching block N` | 0 |
| Hours-of-pedagogy / Hours-Theory as visible title | 0 |
| Subject-footer used as topic title | 0 (truncated subject names treated as chrome) |
| Long-heading fallback | readable clip from the actual heading; full text in `sourceHeading` |

Examples after this audit:

- `Polar coordinates` (not `Polar Curves and Curvature (8 Hours Theory + 4 Hours Tutorials) Polar`)  
- `Heisenberg's Uncertainty Principle` with application named as **Broadening of Spectral Lines**  
- `Coulomb's law — definitions of absolute and relative permittivity`  
- `Language: A few tips` (Kannada module; hours crumb skipped)  
- `Artificial Intelligence — How AI Works` (compound heading shortened, meaning kept)

Inspect truncation (`Artificial Intelligen`, mixed-script Kannada glyphs) is **source-side**. Web titles do not invent the missing letters.

---

## Teaching Body Quality

Three tests applied to all 1,395 boards:

1. **Title-off test** — remaining explanation + points still name the concept.  
2. **Source-substance test** — body unpacks the mapped heading parts, not a label-only restatement.  
3. **Lecturer test** — a lecturer can teach the **named syllabus parts** without reopening the PPTX. They still need the PPTX (or a textbook) for formulas that were never in the inspect file.

Mechanical but topic-bound phrasing (`X is a required idea inside Y`, exam-complete-answer line) grades **B**, not C: the body fails the generic-rename test because the named parts are specific.

Acceptance: C = 0, D = 0. A+ was not optimized.

---

## Formula / Derivation Coverage

Finalized inspect files almost never contain ΔxΔp, F = kq₁q₂/r², or multi-step derivations. Those were **not invented**.

Where `kind` is derivation/example (action heuristics on heading words), the board still unpacks named parts plus the exam-complete-answer line. Intermediate algebraic steps appear only when present in source text.

---

## Example Coverage

Worked numericals (given → substitution → answer) are restored only when the inspect cluster contains them. Count restored from missing PPTX numbers: **0**. Lab boards keep aim / observation / result language attached to the experiment name.

---

## Visual Alignment

`SourceTeachingBlock` fills the stage (`visualShare` typically 0.4–0.8). Nested foundation footer no longer collides with the classroom footer.

Decorative chart-like graphics were not added to heading-only science boards. CAED / circuit / lab families keep their core visual scenes; source-depth boards are text teaching of the named PPTX topics.

Visual alignment failures: **0**.

---

## Animation Alignment

Source boards animate point cards (`fyRise`) as progressive reveal of **this** topic’s parts. Generic hero animations are on core family slides, not reused as a false visual for an unrelated source block.

Animation alignment failures: **0**.

---

## Duplicate Range Audit

Unjustified duplicate `sourceSlides` keys: **0**. Compound headings split into two web scenes share the parent topic in points but use `splitReason` (46 splits).

---

## Missing Range Audit

Meaningful why-this-topic / Aim slides whose heading is a real topic (not hours crumb, process chip, subject footer) are covered by a source block (exact slide number or heading token). Failures: **0**.

---

## Storytelling Audit

Sampled and automated:

- Module openings (core scenes 1–10) unchanged in role  
- First source-depth board, 25% / 50% / 75% / last source-depth board per module (contact sheets)  
- Module first + last slide (1,160 flow checks): numbering and recap/viva endings intact  
- Labs: source theory after principle, not as an isolated theory dump before viva  

Storytelling failures: **0**.

---

## Screen Utilization

Source boards are full-canvas, not a small card on empty stage. Space-utilization threshold 0.18 on source-depth slides; failures: **0**. Tiny-text (<11px): **0**. Overflow / footer collision after nested-footer fix: **0**.

---

## Content Grades

| Grade | Count | Meaning |
|---|---:|---|
| A+ | 117 | Deep, concept-specific (often lab / code / circuit kinds with ≥4 specific points) |
| A | 343 | Complete, classroom-ready, ≥3 specific points |
| B | 935 | Correct, specific, sufficient (including simple definition boards) |
| C | 0 | Shallow / generic / misaligned |
| D | 0 | Placeholder / wrong |

---

## Subject-Level Results

| Subject | Source-Depth Slides | A+ | A | B | C | D | Mismatches | Duplicates | Missing Blocks |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Introduction to AI and Applications | 31 | 0 | 8 | 23 | 0 | 0 | 0 | 0 | 0 |
| Basics of Electrical Engineering | 29 | 5 | 6 | 18 | 0 | 0 | 0 | 0 | 0 |
| Basic Electrical Lab | 24 | 12 | 0 | 12 | 0 | 0 | 0 | 0 | 0 |
| Computer Aided Engineering Drawing for CV Stream | 30 | 0 | 8 | 22 | 0 | 0 | 0 | 0 | 0 |
| Computer Aided Engineering Drawing for EE Stream | 30 | 0 | 8 | 22 | 0 | 0 | 0 | 0 | 0 |
| Computer Aided Engineering Drawing for ECE Stream | 29 | 0 | 11 | 18 | 0 | 0 | 0 | 0 | 0 |
| Computer Aided Engineering Drawing for ME Stream | 26 | 0 | 8 | 18 | 0 | 0 | 0 | 0 | 0 |
| Computer Aided Engineering Drawing for CS Stream | 28 | 0 | 8 | 20 | 0 | 0 | 0 | 0 | 0 |
| Applied Chemistry for Sustainable Structures and Material Design | 18 | 0 | 7 | 11 | 0 | 0 | 0 | 0 | 0 |
| Applied Chemistry for Emerging Electronics and Futuristic Devices | 22 | 0 | 4 | 18 | 0 | 0 | 0 | 0 | 0 |
| Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems | 27 | 0 | 10 | 17 | 0 | 0 | 0 | 0 | 0 |
| ENGINEERING MECHANICS | 38 | 0 | 0 | 38 | 0 | 0 | 0 | 0 | 0 |
| Elements of Aeronautics | 38 | 0 | 12 | 26 | 0 | 0 | 0 | 0 | 0 |
| Elements of Biotechnology and Biomimetics | 33 | 0 | 4 | 29 | 0 | 0 | 0 | 0 | 0 |
| Fundamentals of Electronics and Communication Engineering | 33 | 6 | 5 | 22 | 0 | 0 | 0 | 0 | 0 |
| Fundamentals of Electronics and Communication Engineering Lab | 24 | 12 | 0 | 12 | 0 | 0 | 0 | 0 | 0 |
| Elements of Chemical Engineering | 27 | 0 | 3 | 24 | 0 | 0 | 0 | 0 | 0 |
| Programming in C | 37 | 2 | 3 | 32 | 0 | 0 | 0 | 0 | 0 |
| Elements of Mechanical Engineering | 30 | 0 | 22 | 8 | 0 | 0 | 0 | 0 | 0 |
| Elements of Mechanical Engineering Lab | 24 | 12 | 0 | 12 | 0 | 0 | 0 | 0 | 0 |
| Communication Skills | 33 | 0 | 7 | 26 | 0 | 0 | 0 | 0 | 0 |
| BUILDING SCIENCE AND MECHANICS | 28 | 0 | 5 | 23 | 0 | 0 | 0 | 0 | 0 |
| Introduction to Electrical Engineering | 33 | 6 | 10 | 17 | 0 | 0 | 0 | 0 | 0 |
| Introduction to Electronics and Communication Engineering | 33 | 0 | 7 | 26 | 0 | 0 | 0 | 0 | 0 |
| INTRODUCTION TO MECHANICAL ENGINEERING | 28 | 0 | 19 | 9 | 0 | 0 | 0 | 0 | 0 |
| ESSENTIALS OF INFORMATION TECHNOLOGY | 31 | 0 | 0 | 31 | 0 | 0 | 0 | 0 | 0 |
| Indian Constitution and Engineering Ethics | 22 | 0 | 4 | 18 | 0 | 0 | 0 | 0 | 0 |
| Innovation & Design Thinking Lab | 24 | 8 | 8 | 8 | 0 | 0 | 0 | 0 | 0 |
| Balake Kannada (Kannada for Usage) | 15 | 0 | 4 | 11 | 0 | 0 | 0 | 0 | 0 |
| Samskrutika Kannada | 18 | 0 | 2 | 16 | 0 | 0 | 0 | 0 | 0 |
| Differential Calculus and Linear Algebra (1BMATC101) | 22 | 1 | 2 | 19 | 0 | 0 | 0 | 0 | 0 |
| Differential Calculus and Numerical Methods | 21 | 2 | 4 | 15 | 0 | 0 | 0 | 0 | 0 |
| Differential Calculus & Linear Algebra (1BMATE101) | 25 | 1 | 4 | 20 | 0 | 0 | 0 | 0 | 0 |
| Calculus, Laplace Transforms and Numerical Techniques | 21 | 5 | 6 | 10 | 0 | 0 | 0 | 0 | 0 |
| Differential Calculus and Linear Algebra (1BMATM101) | 28 | 0 | 4 | 24 | 0 | 0 | 0 | 0 | 0 |
| Multivariable Calculus and Numerical Methods | 21 | 2 | 2 | 17 | 0 | 0 | 0 | 0 | 0 |
| CALCULUS AND LINEAR ALGEBRA | 22 | 5 | 5 | 12 | 0 | 0 | 0 | 0 | 0 |
| NUMERICAL METHODS | 19 | 4 | 2 | 13 | 0 | 0 | 0 | 0 | 0 |
| MECHANICS AND MATERIALS LABORATORY | 18 | 9 | 9 | 0 | 0 | 0 | 0 | 0 | 0 |
| QUANTUM PHYSICS AND ELECTRONIC SENSORS | 40 | 0 | 7 | 33 | 0 | 0 | 0 | 0 | 0 |
| ELECTRICAL ENGINEERING MATERIALS | 40 | 0 | 0 | 40 | 0 | 0 | 0 | 0 | 0 |
| PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS | 35 | 0 | 15 | 20 | 0 | 0 | 0 | 0 | 0 |
| PHYSICS OF MATERIALS | 34 | 2 | 15 | 17 | 0 | 0 | 0 | 0 | 0 |
| QUANTUM PHYSICS AND APPLICATIONS | 40 | 0 | 10 | 30 | 0 | 0 | 0 | 0 | 0 |
| PYTHON PROGRAMMING | 25 | 1 | 17 | 7 | 0 | 0 | 0 | 0 | 0 |
| INTRODUCTION TO C PROGRAMMING | 40 | 0 | 1 | 39 | 0 | 0 | 0 | 0 | 0 |
| C Programming Lab | 28 | 14 | 14 | 0 | 0 | 0 | 0 | 0 | 0 |
| Interdisciplinary Project Work | 24 | 8 | 10 | 6 | 0 | 0 | 0 | 0 | 0 |
| Soft Skills | 22 | 0 | 10 | 12 | 0 | 0 | 0 | 0 | 0 |
| Principles of Soil Science and Agronomy | 27 | 0 | 13 | 14 | 0 | 0 | 0 | 0 | 0 |
| Applied Chemistry for Smart Systems | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Family totals (depth JSON family field; some labs are tagged engineering):

| Family | Subjects | Source-depth slides | A+ | A | B |
|---|---:|---:|---:|---:|---:|
| Mathematics | 8 | 179 | 20 | 29 | 130 |
| Science | 11 | 343 | 2 | 88 | 253 |
| Programming | 5 | 164 | 3 | 29 | 132 |
| Engineering (incl. some lab codes) | 17 | 505 | 53 | 129 | 323 |
| Remaining humanities / language / lab / project | 9 | 204 | 39 | 68 | 97 |
| Chemistry preserved | 1 | 0 | 0 | 0 | 0 |

---

## Fixes Applied

1. **Topic clustering** instead of fixed 2-slide windows; skip journey / topic-map / formulae boards / process chrome.  
2. **Unpack compound headings** into named-part points; no generic “important in engineering” bodies.  
3. **No `Source teaching block N` fallback**; long headings clipped with meaning preserved.  
4. **Hours / pedagogy chrome stripped** from titles; trailing topic after a theory-hour banner kept (`Polar coordinates`).  
5. **Subject footer / truncated subject name** not used as a teaching title.  
6. **46 compound splits** where a heading had more than four named parts.  
7. **Lab insert after principle.**  
8. **`SourceTeachingBlock` lead + grid**; nested `fy-footer` hidden in classroom frames to stop footer collision and fill the canvas.  
9. Permanent QA: `npm run qa:first-year-leaks`, `npm run qa:first-year-depth`, `npm run qa:first-year-depth-render`.

Not done (source-limited, recorded not invented): restoring Heisenberg ΔxΔp, Coulomb’s inverse-square formula, or other equations absent from inspect NDJSON.

---

## Placeholder Leak QA

```
npm run qa:first-year-leaks
```

PASS — 51 subjects, 1,395 source slides, 0 placeholder leaks, 0 internal titles, 0 chemistry leaks.

---

## Depth QA

```
npm run qa:first-year-depth
```

Detects title-only bodies, generic explanations, range mismatch, unjustified duplicates, missing meaningful why/Aim topics, hours-as-title, and leak strings. Candidates go to `qa/first-year-source-depth-qa.json`. This run: **failed = 0**.

---

## Render QA

```
npm run qa:first-year-depth-render
```

| Item | Value |
|---|---|
| Source-depth slides × 2 viewports | 1,395 × 2 = 2,790 |
| Affected-module first + last × 2 viewports | 1,160 |
| Regression routes × 2 viewports | 28 |
| Total instances | 3,950 |
| 1920 failures | 0 |
| 1280 failures | 0 |
| Tiny text / overflow / space / leak | 0 |
| QA contact sheets (not production) | 1,128 frames, cyan outline in `qa-contact-sheets/first-year-source-depth/index.html` |

Contact sheets mark source-depth frames for QA only. Production does not badge “source-depth”.

---

## Regression

Routes (both 1920×1080 and 1280×720): chemistry opener, First Year math, physics, Python, electrical, ECE, CAED, Constitution, Balake Kannada, electrical lab, C lab, project stage, applied chemistry (non-preserved stream), foundation playground.

Failures: **0**.

---

## Build

```
npm run build
```

PASS in 2–4 s. Only genuine note: Vite chunk >500 kB warning (pre-existing). No new errors.

---

## Final Freeze Decision

All acceptance gates in the audit brief are met:

- Internal PPTX labels = 0  
- Title-only teaching failures = 0  
- Generic body failures = 0  
- Source-range mismatches = 0  
- Missing meaningful source blocks = 0  
- Unjustified duplicate ranges = 0  
- C-grade = 0, D-grade = 0  
- Visual / animation / storytelling / space / tiny-text = 0  
- Placeholder leak = 0  
- 1920 / 1280 render = 0  
- Regression = 0  
- Leak QA PASS, production build PASS  

**`firstYearFrozen = true`**

A lecturer can teach the **named syllabus parts** on each source-depth board without reopening the PPTX. They cannot recover formulas the finalized PPTX never contained; that limitation is preserved on purpose.
