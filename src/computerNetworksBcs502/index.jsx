import './cn502.css'
import { auditSignatures } from './Cn502Kit.jsx'
import { buildCn502ModuleSlides } from './buildSlides.jsx'

export const cn502Module1Slides = buildCn502ModuleSlides(1)
export const cn502Module2Slides = buildCn502ModuleSlides(2)
export const cn502Module3Slides = buildCn502ModuleSlides(3)
export const cn502Module4Slides = buildCn502ModuleSlides(4)
export const cn502Module5Slides = buildCn502ModuleSlides(5)

export const CN502_SIGNATURE_AUDIT = {
  1: auditSignatures(cn502Module1Slides),
  2: auditSignatures(cn502Module2Slides),
  3: auditSignatures(cn502Module3Slides),
  4: auditSignatures(cn502Module4Slides),
  5: auditSignatures(cn502Module5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(CN502_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[CN uniqueness]', Object.fromEntries(bad))
}
