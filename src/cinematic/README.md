# Presentation Engine V7.0 — Platform Lockdown

**Status: STABLE / FEATURE COMPLETE**

The cinematic engine is infrastructure. No new framework features unless they solve a demonstrated problem across multiple subjects.

International Business is the **showcase / quality bar**.

> Does this subject reach the International Business quality bar?  
> If not, it isn’t finished.

---

## Quick links

| Doc | Purpose |
|-----|---------|
| [PLATFORM.md](./PLATFORM.md) | Non-negotiable rules + freeze |
| [AUTHORING.md](./AUTHORING.md) | How to create course content |
| [CONTENT.md](./CONTENT.md) | Quality checklist + review workflow |
| [SHOWCASE.md](./SHOWCASE.md) | IB gold standard |
| [ROADMAP.md](./ROADMAP.md) | 20% engine / 80% content |

---

## Subject SDK

```js
import { createSubjectManifest, validateContentRelease } from './cinematic'

const manifest = createSubjectManifest({
  id: 'my-subject',
  title: 'My Subject',
  accent: 'my-subject',
  identity: {
    tone: '…',
    metaphor: '…',
    motifs: ['…'],
    heroScenes: ['…'],
    finale: '…',
    rememberVisually: '…',
  },
  theme: { /* palette / typography */ },
  modules: [/* module metadata + slides */],
})
```

**Authors supply:** manifest, theme, motifs, modules, heroes, film meta, memory, callbacks, diagrams.  
**Engine provides:** landings, cinematic flow, motion, adaptive behavior, teaching/revision modes, analytics, insights, QA, a11y, completion.

---

## Frozen API surface

See `stable.js` → `STABLE_CONTRACTS` / `getEngineLock()`.

Major exports remain under `src/cinematic/index.js`. Additive only.

---

## Architecture (unchanged contracts)

```
tokens → motion → timeline → hero tiers → adaptive → modes
plugin/SDK → PresentationEngine → FilmContinuity → TeachingControls
analytics → insights/recommendations
qa + visual regression + debug inspector
```

---

## Tooling

```bash
npm run qa:animation
npm run qa:animation:ib
npm run qa:overflow
npm run qa:visual:update   # freeze baselines (dev server required)
npm run qa:visual          # compare against baselines
```

---

## Final principle

Ask how to teach with the engine you have — not what new engine feature to build.
