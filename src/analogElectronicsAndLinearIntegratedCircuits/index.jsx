import './aea.css'
import { auditSignatures } from './AeaKit.jsx'
import { buildAeaModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './AeaScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as AEA_COURSE, MODULES as AEA_MODULES }

export const aeaModule1Slides = buildAeaModuleSlides(1)
export const aeaModule2Slides = buildAeaModuleSlides(2)
export const aeaModule3Slides = buildAeaModuleSlides(3)
export const aeaModule4Slides = buildAeaModuleSlides(4)
export const aeaModule5Slides = buildAeaModuleSlides(5)

export const AEA_SIGNATURE_AUDIT = {
  1: auditSignatures(aeaModule1Slides),
  2: auditSignatures(aeaModule2Slides),
  3: auditSignatures(aeaModule3Slides),
  4: auditSignatures(aeaModule4Slides),
  5: auditSignatures(aeaModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(AEA_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[AEA uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[AEA visual coverage]', Object.fromEntries(gaps))
}
