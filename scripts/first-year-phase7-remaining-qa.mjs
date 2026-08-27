import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:4173'

const subjects = [
  ['Communication Skills', '1BENGL106', 'communication-skills-1bengl106', 'unit', 5, 'theory'],
  ['Indian Constitution and Engineering Ethics', '1BICO107/207', 'indian-constitution-engineering-ethics-1bico107-207', 'module', 5, 'theory'],
  ['Balake Kannada (Kannada for Usage)', '1BKBK109', 'balake-kannada-1bkbk109', 'module', 5, 'language'],
  ['Samskrutika Kannada', '1BKSK109', 'samskrutika-kannada-1bksk109', 'unit', 5, 'language'],
  ['Soft Skills', '1BSKS106/206', 'soft-skills-1bsks106-206', 'module', 5, 'theory'],
  ['Basic Electrical Lab', '1BBEEL107', 'basic-electrical-lab-1bbeel107', 'experiment', 12, 'lab'],
  ['Fundamentals of Electronics and Communication Engineering Lab', '1BECEL107', 'fundamentals-ece-lab-1becel107', 'experiment', 12, 'lab'],
  ['Elements of Mechanical Engineering Lab', '1BEMEL105', 'elements-mechanical-lab-1bemel105', 'experiment', 12, 'lab'],
  ['MECHANICS AND MATERIALS LABORATORY', '1BMEML107/207', 'mechanics-materials-lab-1bmeml107-207', 'experiment', 9, 'lab'],
  ['C Programming Lab', '1BPOPL107/207', 'c-programming-lab-1bpopl107-207', 'experiment', 14, 'clab'],
  ['Innovation & Design Thinking Lab', '1BIDTL158', 'innovation-design-thinking-lab-1bidtl158', 'stage', 8, 'project'],
  ['Interdisciplinary Project Work', '1BPRJ258', 'interdisciplinary-project-work-1bprj258', 'stage', 8, 'project'],
].map(([subject, code, id, prefix, n, kind]) => ({
  subject, code, id, prefix, kind, n,
  counts: Array.from({ length: n }, (_, i) => {
    const blocks = firstYearDepthModules[`${code}|${i + 1}`]?.blocks?.length || 0
    const core = kind === 'theory' ? 10 : kind === 'language' ? 9 : kind === 'clab' ? 9 : kind === 'project' ? 6 : 8
    return core + blocks
  }),
}))

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
]

const regressionRoutes = [
  '/#/chemistry/module-1?slide=1',
  '/#/differential-calculus-linear-algebra-1bmatc101/module-1?slide=1',
  '/#/quantum-physics-applications-1bphys102-202/module-1?slide=1',
  '/#/introduction-ai-applications-1baia103-203/module-1?slide=1',
  '/#/basics-electrical-engineering-1bbee105-205/module-1?slide=1',
  '/#/__first-year-foundation?scene=5',
  '/#/big-data-analytics/module-1?slide=1',
  '/#/analog-electronics-linear-ics/module-1?slide=1',
]

async function auditSlide(page, subject, moduleNumber, slideNumber, viewportName, reducedMotion = false) {
  const route = `/#/${subject.id}/${subject.prefix}-${moduleNumber}?slide=${slideNumber}`
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
  try {
    await page.waitForSelector('.slide-frame', { timeout: 12000 })
  } catch (error) {
    return { subject: subject.subject, code: subject.code, route, module: moduleNumber, slide: slideNumber, viewport: viewportName, reducedMotion, ok: false, hits: [{ kind: 'route-load-timeout', detail: error.message }] }
  }
  await page.waitForTimeout(reducedMotion ? 40 : 70)
  return page.evaluate(({ subject, route, moduleNumber, slideNumber, viewportName, reducedMotion, kind }) => {
    const frame = document.querySelector('.slide-frame')
    const body = document.querySelector('.slide-body')
    const title = document.querySelector('.slide-title')?.textContent?.trim() || ''
    const footer = document.querySelector('.slide-footer')?.textContent || ''
    const content = [...document.querySelectorAll('[data-slide-content="true"], .rem-svg, .fy-source-block, .fy-process, .fy-comparison, .fy-timeline, .fy-experiment, .fy-concept-map, .fy-execution-trace, svg, table')]
      .map((el) => ({ el, rect: el.getBoundingClientRect() }))
      .filter((item) => item.rect.width > 8 && item.rect.height > 8)
      .sort((a, b) => (b.rect.width * b.rect.height) - (a.rect.width * a.rect.height))[0]?.el
    const animated = [...document.querySelectorAll('.slide-frame *')].filter((el) => {
      const cs = getComputedStyle(el)
      return cs.animationName !== 'none' && Number.parseFloat(cs.animationDuration) > 0
    })
    const hits = []
    const fail = (kindName, detail) => hits.push({ kind: kindName, detail })
    if (!frame || !body) fail('missing-frame', 'No slide frame/body')
    if (!title) fail('missing-title', 'No slide title')
    if (!footer.includes(`Slide ${slideNumber}`)) fail('wrong-slide', footer.trim())
    if (!content) fail('missing-teaching-surface', 'No teaching surface')
    if (frame && (frame.scrollWidth - frame.clientWidth > 26 || frame.scrollHeight - frame.clientHeight > 26)) fail('frame-overflow', `${frame.scrollWidth}x${frame.scrollHeight}`)
    if (body && (body.scrollWidth - body.clientWidth > 30 || body.scrollHeight - body.clientHeight > 30)) fail('body-overflow', `${body.scrollWidth}x${body.scrollHeight}`)
    const br = body?.getBoundingClientRect()
    const textNodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,strong,span,td,th,blockquote,text')] : []
    for (const node of textNodes) {
      const r = node.getBoundingClientRect()
      if (!r || r.width < 2 || r.height < 2) continue
      const px = Number.parseFloat(getComputedStyle(node).fontSize)
      if (px > 0 && px < 12) { fail('tiny-text', `${node.textContent?.trim()?.slice(0, 40)} ${px}px`); break }
      if (br && (r.right - br.right > 22 || r.bottom - br.bottom > 22 || br.left - r.left > 22 || br.top - r.top > 22)) {
        fail('text-out-of-bounds', node.textContent?.trim()?.slice(0, 60)); break
      }
      if (/\uFFFD/.test(node.textContent || '')) { fail('native-script-tofu', node.textContent.trim().slice(0, 40)); break }
    }
    if (kind === 'language' && slideNumber <= 8) {
      const kannada = (body?.innerText || '').match(/[\u0C80-\u0CFF]/g) || []
      if (kannada.length < 4) fail('native-script-missing', `only ${kannada.length} Kannada glyphs`)
    }
    if (!reducedMotion && [1, 2, 3, 4, 5, 6, 7].includes(slideNumber) && animated.length < 1) fail('animation-too-thin', `${animated.length} animated elements`)
    return { subject: subject.subject, code: subject.code, route, module: moduleNumber, slide: slideNumber, viewport: viewportName, reducedMotion, ok: hits.length === 0, title, animatedElements: animated.length, hits }
  }, { subject, route, moduleNumber, slideNumber, viewportName, reducedMotion, kind: subject.kind })
}

async function auditRegression(page, route, viewportName) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.slide-frame, .fy-frame', { timeout: 12000 })
  await page.waitForTimeout(70)
  return page.evaluate(({ route, viewportName }) => {
    const frame = document.querySelector('.slide-frame, .fy-frame')
    const hits = []
    if (!frame) hits.push({ kind: 'missing-frame' })
    if (frame && (frame.scrollWidth - frame.clientWidth > 36 || frame.scrollHeight - frame.clientHeight > 36)) hits.push({ kind: 'overflow' })
    return { route, viewport: viewportName, ok: hits.length === 0, hits }
  }, { route, viewportName })
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const report = { generatedAt: new Date().toISOString(), base: BASE, subjects, remainingSlides: [], reducedMotion: [], regression: [] }
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)
    for (const subject of subjects) {
      for (let m = 1; m <= subject.counts.length; m += 1) {
        for (let s = 1; s <= subject.counts[m - 1]; s += 1) {
          report.remainingSlides.push(await auditSlide(page, subject, m, s, vp.name))
        }
      }
    }
    for (const route of regressionRoutes) report.regression.push(await auditRegression(page, route, vp.name))
    await context.close()
    const reduced = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' })
    const reducedPage = await reduced.newPage()
    for (const subject of subjects) report.reducedMotion.push(await auditSlide(reducedPage, subject, 1, 2, vp.name, true))
    await reduced.close()
  }
  await browser.close()
  const failures = [...report.remainingSlides, ...report.reducedMotion, ...report.regression].filter((row) => !row.ok)
  const out = path.join(ROOT, 'qa', 'first-year-phase7-remaining-report.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify({ ...report, failures }, null, 2))
  console.log(JSON.stringify({ subjects: subjects.length, renderedSlides: report.remainingSlides.length, reducedMotion: report.reducedMotion.length, regressionRoutes: report.regression.length, failures: failures.length, out }, null, 2))
  process.exit(failures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
