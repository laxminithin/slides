import './cg.css'
import { auditSignatures } from './CgKit.jsx'
import { buildCgModuleSlides } from './buildSlides.jsx'

export const cgModule1Slides = buildCgModuleSlides(1)
export const cgModule2Slides = buildCgModuleSlides(2)
export const cgModule3Slides = buildCgModuleSlides(3)
export const cgModule4Slides = buildCgModuleSlides(4)
export const cgModule5Slides = buildCgModuleSlides(5)

export const CG_SIGNATURE_AUDIT = {
  1: auditSignatures(cgModule1Slides),
  2: auditSignatures(cgModule2Slides),
  3: auditSignatures(cgModule3Slides),
  4: auditSignatures(cgModule4Slides),
  5: auditSignatures(cgModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(CG_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[CGV uniqueness]', Object.fromEntries(bad))
}
