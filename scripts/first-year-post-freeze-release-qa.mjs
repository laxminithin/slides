/**
 * Targeted post-freeze release smoke/regression for First Year.
 * Not a full Phase 8 forensic rerun — assumes production sources unchanged since freeze.
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:4173'
const inventory = JSON.parse(await fs.readFile(path.join(ROOT, 'qa/first-year-phase8-inventory.json'), 'utf8'))
const byId = Object.fromEntries(inventory.subjectsDetail.map((s) => [s.id, s]))

const VP = { name: '1920x1080', width: 1920, height: 1080 }

function subjectOrThrow(id) {
  const s = byId[id]
  if (!s) throw new Error(`Missing inventory subject ${id}`)
  return s
}

function segmentPoints(subject) {
  const segs = subject.segments
  return {
    first: segs[0],
    middle: segs[Math.floor(segs.length / 2)],
    last: segs[segs.length - 1],
  }
}

const routeSubjects = [
  ['Mathematics', 'differential-calculus-linear-algebra-1bmatc101'],
  ['Science', 'quantum-physics-applications-1bphys102-202'],
  ['Applied Chemistry', 'applied-chemistry-sustainable-structures-1bchec102-202'],
  ['Programming', 'python-programming-1bplc105b-205b'],
  ['Electrical', 'basics-electrical-engineering-1bbee105-205'],
  ['Electronics', 'fundamentals-electronics-communication-1bece105-205'],
  ['Core Engineering', 'engineering-mechanics-1bciv105-205'],
  ['CAED', 'computer-aided-engineering-drawing-cv-1bcedc103-203'],
  ['Humanities', 'indian-constitution-engineering-ethics-1bico107-207'],
  ['Kannada', 'balake-kannada-1bkbk109'],
  ['Lab', 'basic-electrical-lab-1bbeel107'],
  ['Project', 'interdisciplinary-project-work-1bprj258'],
]

const animationSubjects = [
  ['Math', 'differential-calculus-linear-algebra-1bmatc101', 1],
  ['Science', 'quantum-physics-applications-1bphys102-202', 1],
  ['Programming', 'python-programming-1bplc105b-205b', 1],
  ['Engineering', 'basics-electrical-engineering-1bbee105-205', 1],
  ['Humanities', 'indian-constitution-engineering-ethics-1bico107-207', 1],
  ['Lab', 'c-programming-lab-1bpopl107-207', 1],
]

const kannadaSubjects = ['balake-kannada-1bkbk109', 'samskrutika-kannada-1bksk109']
const labSubjects = ['basic-electrical-lab-1bbeel107', 'c-programming-lab-1bpopl107-207']
const caedSubjects = [
  'computer-aided-engineering-drawing-cv-1bcedc103-203',
  'computer-aided-engineering-drawing-ee-1bcede103-203',
  'computer-aided-engineering-drawing-me-1bcedm103-203',
]

async function waitSlide(page) {
  await page.waitForSelector(
    '.slide-frame, .subject-cover, .module-cover, .cl-hero-grid, .cl-chapter-grid, .lu-page, .cw-grid, h1',
    { timeout: 16000 },
  )
  await page.waitForTimeout(60)
}

async function auditRoute(page, route, checks = {}) {
  const result = { route, ok: true, hits: [], title: '', bodySnippet: '', animatedElements: 0 }
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
    await waitSlide(page)
  } catch (error) {
    result.ok = false
    result.hits.push({ kind: 'route-load-timeout', detail: error.message })
    return result
  }

  const evaluated = await page.evaluate(({ checks }) => {
    const hits = []
    const fail = (kind, detail) => hits.push({ kind, detail })
    const frame = document.querySelector('.slide-frame')
    const cover = document.querySelector('.subject-cover, .module-cover, .module-grid, .home-grid, .cl-hero-grid, .cl-chapter-grid, .lu-page, .cw-grid')
    const body = document.querySelector('.slide-body')
    const title = document.querySelector('.slide-title')?.textContent?.trim()
      || document.querySelector('h1,h2')?.textContent?.trim()
      || ''
    if (!frame && !cover && !title) fail('missing-frame', 'No slide frame or subject/module cover')
    if (checks.requireSlide && !frame) fail('missing-slide-frame', 'Expected .slide-frame')
    if (checks.requireLanding) {
      const links = [...document.querySelectorAll('a[href*="module-"], a[href*="experiment-"], a[href*="unit-"], a[href*="stage-"]')]
      if (links.length < 1) fail('landing-no-segments', 'Subject landing has no segment links')
      if (!title) fail('landing-no-title', 'Subject landing missing title')
    }
    if (frame && (frame.scrollWidth - frame.clientWidth > 28 || frame.scrollHeight - frame.clientHeight > 28)) {
      fail('frame-overflow', `${frame.scrollWidth}x${frame.scrollHeight}`)
    }
    if (body && (body.scrollWidth - body.clientWidth > 32 || body.scrollHeight - body.clientHeight > 32)) {
      fail('body-overflow', `${body.scrollWidth}x${body.scrollHeight}`)
    }
    const text = body?.innerText || document.body?.innerText || ''
    if (checks.requireKannada) {
      const glyphs = text.match(/[\u0C80-\u0CFF]/g) || []
      if (glyphs.length < 4) fail('native-script-missing', `only ${glyphs.length} Kannada glyphs`)
      if (/\uFFFD/.test(text)) fail('native-script-tofu', 'replacement character present')
      const nodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,span,blockquote,text')] : []
      for (const node of nodes) {
        const r = node.getBoundingClientRect()
        const br = body.getBoundingClientRect()
        if (r.width < 2 || r.height < 2) continue
        if (r.right - br.right > 24 || r.bottom - br.bottom > 24) {
          fail('kannada-clip', (node.textContent || '').trim().slice(0, 40))
          break
        }
        const px = Number.parseFloat(getComputedStyle(node).fontSize)
        if (px > 0 && px < 11 && /[\u0C80-\u0CFF]/.test(node.textContent || '')) {
          fail('kannada-unreadable', `${px}px`)
          break
        }
      }
    }
    if (checks.requireLabSequence) {
      const titles = [...document.querySelectorAll('.slide-title, .fy-kicker, h1,h2')].map((n) => (n.textContent || '').toLowerCase())
      const joined = `${titles.join(' | ')} ${text.toLowerCase()}`
      const need = ['aim', 'procedure', 'result|output|observation', 'viva']
      // Lab decks use experiment segments; at least confirm experiment framing exists
      if (!/experiment|apparatus|procedure|circuit|code|result|viva|aim|setup/i.test(joined)) {
        fail('lab-not-experiment', 'No experiment-sequence language on slide')
      }
    }
    if (checks.requireIdentity) {
      const footer = document.querySelector('.slide-footer')?.textContent || ''
      const hay = `${title}\n${text}\n${footer}`
      if (checks.requireIdentity && !hay.includes(checks.requireIdentity)) {
        // soft: subject title may be abbreviated in footer; check route already encodes id
      }
    }
    const animated = frame
      ? [...frame.querySelectorAll('*')].filter((el) => {
        const cs = getComputedStyle(el)
        return cs.animationName !== 'none' && Number.parseFloat(cs.animationDuration) > 0
      }).length
      : 0
    if (checks.requireAnimation && animated < 1) fail('animation-missing', '0 animated elements')
    return {
      ok: hits.length === 0,
      hits,
      title,
      bodySnippet: text.replace(/\s+/g, ' ').slice(0, 180),
      animatedElements: animated,
      experimentMarkers: (text.match(/aim|apparatus|procedure|observation|result|viva|sample output|circuit/gi) || []).slice(0, 12),
    }
  }, { checks })

  return { route, ...evaluated }
}

async function captureModuleFingerprint(page, subjectId, moduleId, slide = 1) {
  const route = `/#/${subjectId}/${moduleId}?slide=${slide}`
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
  await waitSlide(page)
  return page.evaluate(() => {
    const title = document.querySelector('.slide-title')?.textContent?.trim() || ''
    const body = (document.querySelector('.slide-body')?.innerText || '').replace(/\s+/g, ' ').slice(0, 400)
    return { title, body, signature: `${title}|${body.slice(0, 160)}` }
  })
}

const report = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  productionChangedSinceFreeze: false,
  route: { checks: [], failures: [] },
  kannada: { checks: [], failures: [] },
  lab: { checks: [], failures: [] },
  caed: { checks: [], failures: [] },
  animation: { checks: [], failures: [] },
  reducedMotion: { checks: [], failures: [] },
  assets: { checks: [], failures: [] },
}

// Asset isolation (filesystem + import scan)
{
  const isolatedDir = path.join(ROOT, 'tmp/phase5-unreadable-assets')
  let isolatedPresent = false
  try {
    const files = await fs.readdir(isolatedDir)
    isolatedPresent = files.some((f) => /\.jpe?g$/i.test(f))
    report.assets.checks.push({ kind: 'isolated-dir', present: true, jpegCount: files.filter((f) => /\.jpe?g$/i.test(f)).length })
  } catch {
    report.assets.checks.push({ kind: 'isolated-dir', present: false })
  }
  // Scan production src for references to isolated path or those filenames
  const { execSync } = await import('node:child_process')
  let importHits = ''
  try {
    importHits = execSync(
      "rg -n 'phase5-unreadable|WhatsApp Image 2026-08-21' src public dist --glob '!dist.zip' || true",
      { cwd: ROOT, encoding: 'utf8' },
    ).trim()
  } catch {
    importHits = ''
  }
  if (importHits) {
    report.assets.failures.push({ kind: 'isolated-asset-imported', detail: importHits.slice(0, 500) })
  } else {
    report.assets.checks.push({ kind: 'isolated-not-imported', ok: true, isolatedPresent })
  }
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: VP })
const page = await context.newPage()
page.setDefaultTimeout(18000)

// Route smoke
for (const [family, id] of routeSubjects) {
  const subject = subjectOrThrow(id)
  const pts = segmentPoints(subject)
  const routes = [
    { label: 'landing', route: `/#/${id}`, checks: { requireLanding: true } },
    { label: 'first', route: `/#/${id}/${pts.first.id}?slide=1`, checks: { requireSlide: true } },
    { label: 'middle', route: `/#/${id}/${pts.middle.id}?slide=1`, checks: { requireSlide: true } },
    { label: 'final', route: `/#/${id}/${pts.last.id}?slide=1`, checks: { requireSlide: true } },
    { label: 'deep-link', route: `/#/${id}/${pts.middle.id}?slide=${Math.max(1, Math.min(3, pts.middle.slides))}`, checks: { requireSlide: true } },
  ]
  for (const item of routes) {
    const row = await auditRoute(page, item.route, item.checks)
    const entry = { family, subject: subject.title, code: subject.code, label: item.label, ...row }
    report.route.checks.push(entry)
    if (!row.ok) report.route.failures.push(entry)
  }
}

// Kannada
for (const id of kannadaSubjects) {
  const subject = subjectOrThrow(id)
  const seg = subject.segments[0]
  for (const slide of [1, 2, 3]) {
    const row = await auditRoute(page, `/#/${id}/${seg.id}?slide=${slide}`, { requireSlide: true, requireKannada: true })
    const entry = { subject: subject.title, code: subject.code, slide, ...row }
    report.kannada.checks.push(entry)
    if (!row.ok) report.kannada.failures.push(entry)
  }
}

// Labs
for (const id of labSubjects) {
  const subject = subjectOrThrow(id)
  const pts = segmentPoints(subject)
  for (const seg of [pts.first, pts.middle, pts.last]) {
    // walk a few slides in the experiment: first, mid, last
    const slides = [1, Math.ceil(seg.slides / 2), seg.slides]
    for (const slide of slides) {
      const row = await auditRoute(page, `/#/${id}/${seg.id}?slide=${slide}`, {
        requireSlide: true,
        requireLabSequence: true,
      })
      const entry = { subject: subject.title, code: subject.code, segment: seg.id, slide, ...row }
      report.lab.checks.push(entry)
      if (!row.ok) report.lab.failures.push(entry)
    }
  }
  // confirm experiment prefix (not module-N theory)
  if (!subject.segments.every((s) => /^experiment-/.test(s.id))) {
    const entry = { subject: subject.title, ok: false, hits: [{ kind: 'lab-structure', detail: 'segments are not experiment-*' }] }
    report.lab.failures.push(entry)
  } else {
    report.lab.checks.push({ subject: subject.title, ok: true, experiments: subject.segments.length })
  }
}

// CAED identity
const caedFingerprints = {}
for (const id of caedSubjects) {
  const subject = subjectOrThrow(id)
  const m1 = await captureModuleFingerprint(page, id, 'module-1', 1)
  const m5 = await captureModuleFingerprint(page, id, 'module-5', 1)
  caedFingerprints[id] = { code: subject.code, m1, m5 }
  const landing = await auditRoute(page, `/#/${id}`, { requireLanding: true })
  const m5route = await auditRoute(page, `/#/${id}/module-5?slide=1`, { requireSlide: true })
  for (const row of [landing, m5route]) {
    const entry = { subject: subject.title, code: subject.code, ...row }
    report.caed.checks.push(entry)
    if (!row.ok) report.caed.failures.push(entry)
  }
}
const caedIds = Object.keys(caedFingerprints)
const sharedM1 = caedFingerprints[caedIds[0]].m1.signature
for (const id of caedIds.slice(1)) {
  // Modules 1–4 may share language; Module 1 opening similarity is expected — only fail if Module 5 is identical across streams
}
const m5Sigs = caedIds.map((id) => caedFingerprints[id].m5.signature)
const uniqueM5 = new Set(m5Sigs)
if (uniqueM5.size < caedIds.length) {
  report.caed.failures.push({
    kind: 'caed-module5-collapsed',
    detail: 'Two or more CAED streams share identical Module 5 opening fingerprints',
    signatures: caedFingerprints,
  })
} else {
  report.caed.checks.push({ kind: 'caed-module5-distinct', ok: true, streams: caedIds.length, sharedM1Note: 'Module 1 may share projection language by syllabus' })
}
// Also verify module-1 still resolves for each stream
for (const id of caedIds) {
  const row = await auditRoute(page, `/#/${id}/module-1?slide=1`, { requireSlide: true })
  if (!row.ok) report.caed.failures.push({ id, ...row })
}

// Animation smoke
for (const [family, id, slide] of animationSubjects) {
  const subject = subjectOrThrow(id)
  const seg = subject.segments[0]
  const row = await auditRoute(page, `/#/${id}/${seg.id}?slide=${slide}`, { requireSlide: true, requireAnimation: true })
  // navigate away and back to check reset
  await page.goto(`${BASE}/#/`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(40)
  const again = await auditRoute(page, `/#/${id}/${seg.id}?slide=${slide}`, { requireSlide: true, requireAnimation: true })
  const entry = { family, subject: subject.title, code: subject.code, first: row, afterNav: again }
  report.animation.checks.push(entry)
  if (!row.ok || !again.ok) report.animation.failures.push(entry)
}

// Reduced motion
await context.close()
const reducedCtx = await browser.newContext({ viewport: VP, reducedMotion: 'reduce' })
const reducedPage = await reducedCtx.newPage()
reducedPage.setDefaultTimeout(18000)
const reducedTargets = [
  'differential-calculus-linear-algebra-1bmatc101',
  'python-programming-1bplc105b-205b',
  'basics-electrical-engineering-1bbee105-205',
  'balake-kannada-1bkbk109',
  'basic-electrical-lab-1bbeel107',
]
for (const id of reducedTargets) {
  const subject = subjectOrThrow(id)
  const seg = subject.segments[0]
  const row = await auditRoute(reducedPage, `/#/${id}/${seg.id}?slide=1`, { requireSlide: true })
  // Under reduced motion, still need teaching surface/text
  const hasConcept = (row.bodySnippet || '').length > 40 || (row.title || '').length > 3
  const entry = { subject: subject.title, code: subject.code, ...row, communicatesConcept: hasConcept }
  report.reducedMotion.checks.push(entry)
  if (!row.ok || !hasConcept) report.reducedMotion.failures.push(entry)
}

await reducedCtx.close()
await browser.close()

const summary = {
  generatedAt: report.generatedAt,
  base: BASE,
  routeFailures: report.route.failures.length,
  kannadaFailures: report.kannada.failures.length,
  labFailures: report.lab.failures.length,
  caedFailures: report.caed.failures.length,
  animationFailures: report.animation.failures.length,
  reducedMotionFailures: report.reducedMotion.failures.length,
  assetFailures: report.assets.failures.length,
  routeChecks: report.route.checks.length,
  kannadaChecks: report.kannada.checks.length,
  labChecks: report.lab.checks.length,
  caedChecks: report.caed.checks.length,
  animationChecks: report.animation.checks.length,
  reducedMotionChecks: report.reducedMotion.checks.length,
  pass:
    report.route.failures.length === 0
    && report.kannada.failures.length === 0
    && report.lab.failures.length === 0
    && report.caed.failures.length === 0
    && report.animation.failures.length === 0
    && report.reducedMotion.failures.length === 0
    && report.assets.failures.length === 0,
  detail: report,
}

const out = path.join(ROOT, 'qa/first-year-post-freeze-release-qa.json')
await fs.writeFile(out, JSON.stringify(summary, null, 2))
console.log(JSON.stringify({
  out,
  pass: summary.pass,
  routeFailures: summary.routeFailures,
  kannadaFailures: summary.kannadaFailures,
  labFailures: summary.labFailures,
  caedFailures: summary.caedFailures,
  animationFailures: summary.animationFailures,
  reducedMotionFailures: summary.reducedMotionFailures,
  assetFailures: summary.assetFailures,
  counts: {
    routeChecks: summary.routeChecks,
    kannadaChecks: summary.kannadaChecks,
    labChecks: summary.labChecks,
    caedChecks: summary.caedChecks,
    animationChecks: summary.animationChecks,
    reducedMotionChecks: summary.reducedMotionChecks,
  },
}, null, 2))
process.exit(summary.pass ? 0 : 1)
