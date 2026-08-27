import './dist.css'
import { auditSignatures } from './DistKit.jsx'
import { buildDistModuleSlides } from './buildSlides.jsx'

export const distModule1Slides = buildDistModuleSlides(1)
export const distModule2Slides = buildDistModuleSlides(2)
export const distModule3Slides = buildDistModuleSlides(3)
export const distModule4Slides = buildDistModuleSlides(4)
export const distModule5Slides = buildDistModuleSlides(5)

export const DIST_SIGNATURE_AUDIT = {
  1: auditSignatures(distModule1Slides),
  2: auditSignatures(distModule2Slides),
  3: auditSignatures(distModule3Slides),
  4: auditSignatures(distModule4Slides),
  5: auditSignatures(distModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(DIST_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[DIST uniqueness]', Object.fromEntries(bad))
}
