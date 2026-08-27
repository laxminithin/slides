# International Business — Module 1 Visual Reference Chapter

**Status:** LOCKED benchmark (visual reference)  
**Subject:** International Business (22MBA401)  
**Chapter:** Module 1 — Introduction to International Business  
**Date locked:** 2026-08-11

> All later IB modules (and other subjects seeking the IB quality bar) should be judged against this chapter.

---

## Standards

### Content
- MBA depth + VTU syllabus alignment
- Definition → explanation → business meaning → modern example → exam framing
- One concept per slide
- Approved examples and cases retained (Apple, Amazon, spice trade, etc.)

### Composition
- Concept-specific layouts (`quiet`, `world-canvas`, `corridor`, `definition`, `timeline`, …)
- No generic card walls as the primary teaching visual
- Story panel + visual panel remain overflow-safe

### Visuals
- Every important node has a **name**
- Every important connection has a **business reason**
- Roles attach to places (e.g. `INDIA · Home Market · HQ`)
- Conceptual diagrams kept conceptual when geography would not help:
  - Entry ladder / entry pathway
  - Force field (changing scenario)
  - Orbit (scope / market scan)

### Geography
- Real world-map canvas wherever geography teaches the concept
- Simplified, projector-readable continents (recognisable before labels)
- Ivory land · navy outlines · gold/emerald accents
- Curved routes; labelled teaching flows; legend for secondary lines
- Leader lines keep label ↔ location association unambiguous

### Motion (concept-driven)
| Scene | Grammar |
| --- | --- |
| World Opens | Local (India) → aerial pull-back → global network |
| Globalization | World establishes → markets activate → flows bloom by type |
| Internationalization | India focus → Domestic → International → MNC → Global → Transnational |
| Border Crossing | Value moves outward from India; destinations react |
| Spice Route | Historical directional travel India → Arabia → Europe |

Settled final frame must work as a **static MBA infographic**.  
`prefers-reduced-motion` jumps to that settled frame.

### Glamour
- Executive / boardroom — ivory · navy · graphite · gold · emerald
- Soft land shadow, restrained motion, no gamey glow stacks

### Readability
- Projector-safe from **1280×720** upward
- Verified also at 1366×768, 1440×900, 1600×900, 1920×1080
- Zero overflow, no label collisions, no blank animation end-states

---

## Signature scenes (do not regress)

1. `WorldOpensScene` — opener
2. `GlobalizationNetwork` — memory-anchor slide (Goods · Services · Capital · Technology · Information · People)
3. `InternationalizationMap` — stage-gated expansion from India
4. `BorderCrossing` — meaning of IB
5. Kit `WorldMap` — hook / title support map

Implementation: `src/ib/worldmap.jsx`, `src/ib/scenes.jsx`, `src/ibChapter1.css`.

## Rule of thumb

> If geography explains the concept better, use the map.  
> If relationships, forces, hierarchy or decisions explain it better, use a conceptual diagram.
