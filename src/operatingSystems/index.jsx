import './os.css'
import { auditSignatures } from './OsKit.jsx'
import { osModule1Slides } from './module1.jsx'
import { osModule2Slides } from './module2.jsx'
import { osModule3Slides } from './module3.jsx'
import { osModule4Slides } from './module4.jsx'
import { osModule5Slides } from './module5.jsx'

export {
  osModule1Slides,
  osModule2Slides,
  osModule3Slides,
  osModule4Slides,
  osModule5Slides,
}

export const OS_SIGNATURE_AUDIT = {
  1: auditSignatures(osModule1Slides),
  2: auditSignatures(osModule2Slides),
  3: auditSignatures(osModule3Slides),
  4: auditSignatures(osModule4Slides),
  5: auditSignatures(osModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(OS_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length,
  )
  if (bad.length) {
    console.warn('[OS uniqueness]', Object.fromEntries(bad))
  }
}
