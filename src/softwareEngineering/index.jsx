import './se.css'
import { auditSignatures } from './SeKit.jsx'
import { buildSeModuleSlides } from './buildSlides.jsx'

export const seModule1Slides = buildSeModuleSlides(1)
export const seModule2Slides = buildSeModuleSlides(2)
export const seModule3Slides = buildSeModuleSlides(3)
export const seModule4Slides = buildSeModuleSlides(4)
export const seModule5Slides = buildSeModuleSlides(5)

export {
  seModule1Slides as module1Slides,
  seModule2Slides as module2Slides,
  seModule3Slides as module3Slides,
  seModule4Slides as module4Slides,
  seModule5Slides as module5Slides,
}

export const SE_SIGNATURE_AUDIT = {
  1: auditSignatures(seModule1Slides),
  2: auditSignatures(seModule2Slides),
  3: auditSignatures(seModule3Slides),
  4: auditSignatures(seModule4Slides),
  5: auditSignatures(seModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(SE_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) {
    console.warn('[SEPM uniqueness]', Object.fromEntries(bad))
  }
}
