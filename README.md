# Academic Living Presentation Platform

Multi-subject classroom platform powered by **Presentation Engine V7.0** (API frozen).

**Showcase / quality bar:** International Business

## Run

```bash
npm install
npm run dev
```

## Philosophy (V7)

The engine is feature-complete infrastructure.

- **20%** engine — bugs, performance, accessibility, tooling, docs  
- **80%** content — diagrams, storytelling, examples, assessments  

Docs: [`src/cinematic/README.md`](./src/cinematic/README.md)

## Controls

| Input | Action |
| --- | --- |
| `→` / `←` / `Space` | Navigate |
| `Home` / `End` | First / last slide |
| `F` | Fullscreen |
| `R` | Replay |
| Teaching strip | Student / Lecturer / Revision |

## Quality scripts

```bash
npm run qa:animation
npm run qa:animation:ib
npm run qa:overflow
npm run qa:visual:update -- --subject=international-business
npm run qa:visual -- --subject=international-business
```
