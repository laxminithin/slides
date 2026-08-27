# Content Quality & Review — Presentation Engine V7

A subject is **complete only if it passes every category**.

## Checklist

### Academic
- 100% source parity
- no missing concepts
- no missing examples
- no missing diagrams
- no omitted tables
- syllabus complete

### Visual
- no overflow
- no clipped text
- no empty layouts
- no placeholder graphics
- no stretched illustrations

### Motion
- no repeated scene patterns
- hero distribution balanced
- pacing balanced
- callbacks meaningful
- memory anchors consistent

### Performance
- build clean
- QA clean
- acceptable animation performance
- no layout instability

Use `validateContentRelease()` for the automated motion gate; academic / visual / performance still require human attestation.

---

## Production pipeline (standard)

1. Import source material  
2. Verify content parity  
3. Build layouts  
4. Add diagrams  
5. Configure cinematic metadata  
6. Run automated QA (`qa:animation`, `qa:overflow`, `qa:visual`)  
7. Manual teaching review  
8. Performance review  
9. Final polish  
10. Release  

Do not skip steps to “save time.” Incomplete subjects erode the platform’s quality bar.

---

## Subject identity guidelines

Every subject must answer:

1. What is the emotional tone?  
2. What is the central visual metaphor?  
3. What are the recurring motifs?  
4. What are the hero scenes?  
5. What is the final payoff?  
6. What should students remember visually?  

No two subjects should feel interchangeable.

Validate with `validateSubjectIdentity()` / the Subject SDK identity block.
