# Course Authoring Guide — Presentation Engine V7

The engine is frozen. Your job is to **teach brilliantly** with the platform you already have.

> How can we best teach this topic using the engine we already have?  
> — not —  
> What new engine feature should we build?

---

## 1. Start from the Subject SDK

Use `createSubjectManifest()` (see `sdk.js`). Supply only:

- Subject identity + theme
- Visual motifs
- Module / chapter metadata
- Hero scenes (tiered)
- Film metadata
- Memory anchors + callbacks
- Custom diagrams when needed

The engine already provides landing pages, cinematic flow, motion, adaptive behavior, teaching/revision modes, analytics, QA, accessibility, and completion flow.

---

## 2. Writing slide narratives

- One teaching idea per scene.
- Lead with a hook line students can remember.
- Prefer short narrative beats over paragraphs of dense prose.
- End dense sequences with a quiet settle or payoff.

Projector rule: if you can’t read it from the back row, split the slide.

---

## 3. Choosing scene types

Match choreography to teaching intent:

| Intent | Prefer |
|--------|--------|
| History / eras | `timeline` |
| Systems / geography | `world` |
| Definitions | `boardroom` |
| Choices | `decision` |
| Frameworks | `blueprint` |
| Expansion / growth | `growth` |
| Long reading | `documentary` |
| Contrast | `comparison` |
| Pipelines | `process` |
| Structures | `org` |
| Markets / signals | `pulse` |
| Stories | `story` |

Do not invent a new motion language per subject.

---

## 4. Selecting hero moments

- Tier 1: course-defining — rare (usually the finale).
- Tier 2: module openers, planned chapter peaks, payoffs.
- Tier 3: supporting elevation only.

Every hero needs a nearby valley (quiet / reflective). Consecutive heroes are a defect.

---

## 5. Splitting dense content

When source material is long:

1. Detect title + body chunks.
2. Keep conceptual continuity across parts (`part 1/2`).
3. Elevate only the lead chunk as hero.
4. Move tables and diagrams to scenes with breathing room.

---

## 6. Designing memory anchors

- Give major concepts a stable identity and symbol.
- Reuse the identity later so students recognize it.
- Evolve motif stage by chapter when the idea matures.

Ask: *What should students remember visually from this chapter?*

---

## 7. Creating callbacks

- Sparse echoes, not constant callbacks.
- Prefer one meaningful return per conceptual thread.
- Stamp callbacks on the lead chunk only.
- Label what is being remembered and from which chapter.

---

## 8. Balancing quiet and dramatic sections

Rhythm is pedagogy:

`establish → teach → elevate → rest → teach → payoff`

Too much wow becomes noise. Quiet slides are part of the film grammar.

---

## 9. Projector readability

- Respect slide geometry tokens.
- Prefer high-contrast text on soft surfaces.
- Keep icon sizing on `--icon-*` tokens.
- Run overflow QA on classroom viewports (1366×768 and up).

---

## 10. Release path

Follow the 10-step content pipeline in `CONTENT.md` / `quality.js`.  
A subject ships only when academic, visual, motion, and performance gates pass — and when it can stand next to **International Business** without feeling unfinished.
