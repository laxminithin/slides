import './ds.css'
import { auditSignatures } from './DsKit.jsx'
import { buildDsModuleSlides } from './buildSlides.jsx'

export const dsModule1Slides = buildDsModuleSlides(1)
export const dsModule2Slides = buildDsModuleSlides(2)
export const dsModule3Slides = buildDsModuleSlides(3)
export const dsModule4Slides = buildDsModuleSlides(4)
export const dsModule5Slides = buildDsModuleSlides(5)

export {
  dsModule1Slides as module1Slides,
  dsModule2Slides as module2Slides,
  dsModule3Slides as module3Slides,
  dsModule4Slides as module4Slides,
  dsModule5Slides as module5Slides,
}

export const DS_SIGNATURE_AUDIT = {
  1: auditSignatures(dsModule1Slides),
  2: auditSignatures(dsModule2Slides),
  3: auditSignatures(dsModule3Slides),
  4: auditSignatures(dsModule4Slides),
  5: auditSignatures(dsModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(DS_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) {
    console.warn('[DS uniqueness]', Object.fromEntries(bad))
  }
}
