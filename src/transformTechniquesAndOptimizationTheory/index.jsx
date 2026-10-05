import './tta.css'
import { auditSignatures } from './TtaKit.jsx'
import { buildTtaModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './TtaScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as TTA_COURSE, MODULES as TTA_MODULES }

export const ttaModule1Slides = buildTtaModuleSlides(1)
export const ttaModule2Slides = buildTtaModuleSlides(2)
export const ttaModule3Slides = buildTtaModuleSlides(3)
export const ttaModule4Slides = buildTtaModuleSlides(4)
export const ttaModule5Slides = buildTtaModuleSlides(5)

export const TTA_SIGNATURE_AUDIT = {
  1: auditSignatures(ttaModule1Slides),
  2: auditSignatures(ttaModule2Slides),
  3: auditSignatures(ttaModule3Slides),
  4: auditSignatures(ttaModule4Slides),
  5: auditSignatures(ttaModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(TTA_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[TTA uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[TTA visual coverage]', Object.fromEntries(gaps))
}
