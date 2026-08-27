import './aelic.css'
import { auditSignatures } from './AelicKit.jsx'
import { buildAelicModuleSlides } from './buildSlides.jsx'

export const aelicModule1Slides = buildAelicModuleSlides(1)
export const aelicModule2Slides = buildAelicModuleSlides(2)
export const aelicModule3Slides = buildAelicModuleSlides(3)
export const aelicModule4Slides = buildAelicModuleSlides(4)
export const aelicModule5Slides = buildAelicModuleSlides(5)

export {
  aelicModule1Slides as module1Slides,
  aelicModule2Slides as module2Slides,
  aelicModule3Slides as module3Slides,
  aelicModule4Slides as module4Slides,
  aelicModule5Slides as module5Slides,
}

export const AELIC_SIGNATURE_AUDIT = {
  1: auditSignatures(aelicModule1Slides),
  2: auditSignatures(aelicModule2Slides),
  3: auditSignatures(aelicModule3Slides),
  4: auditSignatures(aelicModule4Slides),
  5: auditSignatures(aelicModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(AELIC_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) {
    console.warn('[AELIC uniqueness]', Object.fromEntries(bad))
  }
}
