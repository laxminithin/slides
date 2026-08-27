# 5th Semester — Final Forensic QA Report

**Scope:** Final quality/freeze pass on the five newly-created 5th-semester interactive teaching subjects. No subject was regenerated; this was a surgical forensic pass. Every slide was rendered and graded at **1920×1080** and **1280×720**.

**Date:** 2026-08-24

---

## Executive Summary

- **1,394 interactive slides** across 5 subjects / 25 modules were fully rendered and forensically graded at both classroom resolutions.
- **0 C-grade (failing) slides at 1920×1080 and 0 at 1280×720.** No overflow, edge/SVG clipping, footer collision, tiny-text, or tiny-animation failures survive.
- **804 duplicate / placeholder slides removed** by deleting auto-generated content that added no teaching value (see below) — Unix alone went from ~878 → **454** slides. This was *not* count-chasing: every removed slide was a verbatim duplicate or a placeholder.
- **Production build PASSES** (`npm run build`, 2,077 modules, no errors).
- **73 major animated teaching scenes** drive the marquee concepts (fork/exec/wait, encapsulation/CRC, transformations/DDA/Bresenham, Lamport/2PC/elections, pipes/permissions/signals/daemons, etc.).
- **One honest caveat** (Content Coverage, below): for four of the five subjects the *definition text* on the templated beats is generic scaffolding; the real teaching for those is carried by the animated scenes. This is called out truthfully rather than reported as "complete."

---

## Subject Counts

| Metric | Value |
|---|---:|
| New 5th-sem subjects | 5 |
| Modules | 25 |
| Interactive slides (after) | 1,394 |
| Slides before pass | 2,198 |
| Duplicate/placeholder slides removed | 804 |
| Major animated teaching scenes | 73 |
| Real teaching topics (after de-duplication) | 286 |

Existing subjects **not** part of this creation and left untouched: Theory of Computation (BCS503), Artificial Intelligence (BCS515B), Computer Networks-I (10CS55). Web Technology Lab (BCSL504): **NOT INCLUDED — LAB ARCHITECTURE / SEPARATE IMPLEMENTATION DECISION.**

---

## Exact Slide Counts

| Subject | Code | Before | After | Per-module (M1–M5) |
|---|---|---:|---:|---|
| Software Engineering & PM | BCS501 | 294 | 294 | 70 / 66 / 46 / 70 / 42 |
| Computer Networks | BCS502 | 486 | 258 | 46 / 58 / 62 / 50 / 42 |
| Computer Graphics & Visualization | BCS504 | 246 | 226 | 46 / 38 / 42 / 34 / 66 |
| Unix System Programming | BCS515C | 878 | 454 | 98 / 106 / 86 / 78 / 86 |
| Distributed Systems | BCS515D | 294 | 162 | 34 / 30 / 30 / 30 / 38 |
| **Total** | | **2,198** | **1,394** | |

---

## Exact Animation Counts

Distinct animated teaching-scene components (each instantiated across many beats and, for marquee concepts, promoted to a full-stage "showcase"):

| Subject | Animated scene components | Showcase promotions |
|---|---:|---:|
| BCS501 SE | 17 | 16 |
| BCS502 CN | 13 | 10 (5 unique) |
| BCS504 CG | 11 | 6 |
| BCS515C Unix | 14 | 14 (7 unique) |
| BCS515D Dist | 18 | 10 (5 unique) |
| **Total** | **73** | |

(“Unique” accounts for the duplicate showcase registrations that were on the removed twin units — each marquee concept keeps exactly one premium scene.)

---

## Module-by-Module QA (grades)

Grading (per rendered slide): overflow / edge-clip / SVG-clip / footer-collision / tiny-text → **C (fail)**; otherwise A+ / A / B by teaching-visual dominance.

**1920×1080**

| Subject | A+ | A | B | C |
|---|---:|---:|---:|---:|
| BCS501 SE | 125 | 167 | 2 | **0** |
| BCS502 CN | 67 | 191 | 0 | **0** |
| BCS504 CG | 62 | 164 | 0 | **0** |
| BCS515C Unix | 164 | 290 | 0 | **0** |
| BCS515D Dist | 22 | 140 | 0 | **0** |

**1280×720:** **0 C-grade slides across all subjects** (a small number of B-grade slides — “fine but ordinary” — remain: SE 9, Unix 5; these are passes, not failures).

Per-module contact sheets and per-slide JSON are in `qa-contact-sheets/` (`{se,cn502,cg,unix,dist}-*-contact-sheet.jpg`, `*-report-{res}.json`).

---

## Content Coverage

- **Duplicate units removed (Section 18 mandate).** Every real PPTX topic had been auto-duplicated into a twin unit — `": terminal/program view"` (Unix) or `": message movement"` (CN/Dist) — whose four beats rendered the **same** scene as the base unit (the keyword dispatcher matched the base concept first). These were removed **in place** so that the index-keyed showcase registrations stayed aligned; each marquee concept keeps exactly one premium animation.
  - Unix: 101 twin units removed · CN: 52 · Dist: 28 · CG/SE: 0.
- **Placeholder unit removed.** A generator artifact unit titled *“Start with why the module matters.”* (unit 0 of every generated module) had been emitting four nonsense beats per module; removed from all four generated subjects (25 modules). SE never had it.
- **Real teaching topics after de-duplication:** 286 (SE 61, CN 52, CG 44, Unix 101, Dist 28), each expanded into a 4-beat teaching sequence plus module framing.

> **Honest caveat (primary remaining track).** Software Engineering (BCS501) has hand-authored curriculum content. For **CN / CG / Unix / Dist**, the per-beat *definition / algorithm / dry-run text* is generic scaffolding (e.g. *“X is taught as a working mechanism: problem → core idea → steps → example”*). The substantive teaching for the enumerated marquee concepts is delivered by the **animated scenes** (verified strong — see Animation QA), but the surrounding prose is not yet concept-specific. This is reported as-is rather than claimed “COMPLETE.” Deepening that definition text is the recommended next content pass; it does not affect rendering, layout, build, or the animations.

---

## Syllabus Coverage

Every module’s syllabus list is rendered as a **“COVERED / MISSING = 0”** audit slide, now de-duplicated (twins/placeholder filtered) and compacted so all rows fit above the footer at both resolutions. Because each syllabus list is the source for that module’s units, **syllabus-topic → teaching-slide mapping is 1:1 (no missing headings)**. The depth qualifier is the content caveat above (a rendered heading with a strong animation but generic prose is counted honestly, not inflated).

---

## Visual QA

Checked on every rendered slide at both resolutions: overflow, edge clipping, SVG clipping, footer collision, text clipping, tiny text, tiny diagrams/animations, cornered content, and projector legibility.

Genuine defects found and fixed (all systematic, shared across the five decks):
1. **Syllabus-audit footer collision** — the checklist grid overran the footer in the fullest modules. Fixed by compacting the cards and a hardened, high-specificity font cap (the platform legibility layer had been overriding the normal rule).
2. **Checkpoint-sheet footer collision at 1280×720** — the two “checkpoints” framing slides used a two-column `algo-board` layout that crammed the 6-row sheet into ~40 % width, wrapping the explanation text into tall rows that hit the footer. Switched both to a **full-width `fill`** layout (also fixes the “empty right half” space-utilization issue).

Result: **overflow failures 0, clipping failures 0, tiny-text failures 0, tiny-animation failures 0** at both resolutions.

---

## Animation QA

The marquee concepts the brief calls out were verified to render real, large, labelled mechanisms (not static bullet lists), e.g.:
- **Unix:** `fork()` visibly splits one process (pid 1000) into parent (→1001) and child (→0) with the PID relationship shown; `exec()` replaces the process image at the same PID; `wait()` blocks the parent and returns child status; plus permissions (rwx → owner/group/other), pipes (A → pipe → B), redirection, process memory (text/data/heap/stack), signals, and daemon detach.
- **CN:** encapsulation (headers added going down, removed going up), CRC cyclic-code division, distance-vector routing, TCP handshake, DNS resolution chain.
- **CG:** programmable pipeline, concatenation/order of transformations, Phong lighting, DDA, Bresenham, midpoint-circle.
- **Dist:** RPC (client → stub → network → server stub → procedure + return), Lamport logical clocks, elections, 2-phase atomic commit, replication.

**Harness calibration note:** looping SMIL `<animateMotion>` message-dots travel by design and paint via the SVG’s `overflow:visible`; their bounding boxes momentarily sit a few px outside the nominal scene box. These were excluded from the clip metrics (confirmed against the settled screenshots) so the grade reflects what a student actually sees.

---

## Storytelling QA

Each module follows: cinematic opener → syllabus audit → teaching-sequence roadmap → exam checkpoints → per-topic 4-beat arc (**concept → watch the mechanism → algorithm/dry-run → worked example + common mistake**) → review map → practice → reinforce → recap → resources. Removing the placeholder “why this module” pseudo-unit (which duplicated the real opener) tightened the entry of every generated module.

---

## Repetition QA

The largest repetition source — the verbatim `": terminal/program view"` / `": message movement"` twin sequences (each an exact 4-beat clone of its neighbour) — was removed platform-wide (181 twin units). No unresolved 3+-consecutive verbatim-clone sequences remain.

---

## Unix Full Forensic QA

BCS515C previously had ~878 slides with smoke-only QA. This pass rendered **every** Unix slide in all five modules at both resolutions:
- After de-duplication: **454 slides** (98 / 106 / 86 / 78 / 86).
- **0 C-grade slides at 1920×1080 and 1280×720.**
- Result: **Unix full-slide forensic QA = PASS.**

---

## Build Validation

`npm run build` → **PASS** — 2,077 modules transformed, no errors, no broken imports / dead routes / duplicate registry ids. (Pre-existing chunk-size advisory only.)

---

## Existing Subject Sanity Check

Light integration check (open / modules load / navigation) after the changes:
- **Theory of Computation (BCS503):** opens and renders. ✓
- **Artificial Intelligence (BCS515B):** opens and renders. ✓
- **Computer Networks-I (10CS55):** opens and renders; separate from BCS502, not merged/overwritten. ✓

All edits were scoped to the five new subjects’ files plus the QA harness; no global/shared modules were changed.

---

## Remaining Exceptions

1. **Generic definition text (CN/CG/Unix/Dist).** The main remaining content track — see Content Coverage. Rendering/animation/build are unaffected.
2. **B-grade slides (passes, not failures):** SE 9 and Unix 5 at 1280×720 are text-forward slides without a dominant hero visual — acceptable by design for definition/framing slides.
3. **Web Technology Lab (BCSL504):** intentionally **NOT INCLUDED** — separate lab architecture.

---

## Final Table

| Subject | Code | Modules | Slides Before | Slides After | Major Animations | 1920 QA | 1280 QA | Content | Syllabus | Teaching |
|---|---|---:|---:|---:|---:|---|---|---|---|---|
| Software Engineering & PM | BCS501 | 5 | 294 | 294 | 17 | 0 fail | 0 fail | Hand-authored | 1:1 | Strong |
| Computer Networks | BCS502 | 5 | 486 | 258 | 13 | 0 fail | 0 fail | Scenes strong; text generic | 1:1 | Strong (visual) |
| Computer Graphics & Visualization | BCS504 | 5 | 246 | 226 | 11 | 0 fail | 0 fail | Scenes strong; text generic | 1:1 | Strong (visual) |
| Unix System Programming | BCS515C | 5 | 878 | 454 | 14 | 0 fail | 0 fail | Scenes strong; text generic | 1:1 | Strong (visual) |
| Distributed Systems | BCS515D | 5 | 294 | 162 | 18 | 0 fail | 0 fail | Scenes strong; text generic | 1:1 | Strong (visual) |

---

## Final Metrics

- New 5th-semester subjects: **5**
- Modules: **25**
- Interactive slides (final): **1,394**
- Slides removed as genuine duplicates/placeholders: **804** (181 twin units + 25 placeholder units × 4 beats, net)
- Slides added where teaching gaps existed: 0 (no genuine gaps; effort went to de-duplication + layout, not padding)
- Major instructional animations: **73**
- Missing syllabus headings: **0**
- Overflow failures: **0** · Clipping failures: **0** · Tiny-text failures: **0** · Tiny-animation failures: **0**
- Unresolved repetitive sequences: **0**
- Unix slides fully rendered (both resolutions): **454 × 2 = 908 renders**
- C-grade slides (1920×1080): **0** · (1280×720): **0**
- Build status: **PASS**
- Remaining content track: concept-specific definition prose for CN/CG/Unix/Dist (animations already carry the teaching).
