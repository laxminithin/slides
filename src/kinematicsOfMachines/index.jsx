import './kom.css'
import { auditSignatures } from './KomKit.jsx'
import { buildKomModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './KomScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as KOM_COURSE, MODULES as KOM_MODULES }

export const komModule1Slides = buildKomModuleSlides(1)
export const komModule2Slides = buildKomModuleSlides(2)
export const komModule3Slides = buildKomModuleSlides(3)
export const komModule4Slides = buildKomModuleSlides(4)
export const komModule5Slides = buildKomModuleSlides(5)

export const KOM_SIGNATURE_AUDIT = {
  1: auditSignatures(komModule1Slides),
  2: auditSignatures(komModule2Slides),
  3: auditSignatures(komModule3Slides),
  4: auditSignatures(komModule4Slides),
  5: auditSignatures(komModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(KOM_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[KOM uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[KOM visual coverage]', Object.fromEntries(gaps))
}
