import './eca.css'
import { auditSignatures } from './EcaKit.jsx'
import { buildEcaModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './EcaScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as ECA_COURSE, MODULES as ECA_MODULES }

export const ecaModule1Slides = buildEcaModuleSlides(1)
export const ecaModule2Slides = buildEcaModuleSlides(2)
export const ecaModule3Slides = buildEcaModuleSlides(3)
export const ecaModule4Slides = buildEcaModuleSlides(4)
export const ecaModule5Slides = buildEcaModuleSlides(5)

export const ECA_SIGNATURE_AUDIT = {
  1: auditSignatures(ecaModule1Slides),
  2: auditSignatures(ecaModule2Slides),
  3: auditSignatures(ecaModule3Slides),
  4: auditSignatures(ecaModule4Slides),
  5: auditSignatures(ecaModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(ECA_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[ECA uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[ECA visual coverage]', Object.fromEntries(gaps))
}
