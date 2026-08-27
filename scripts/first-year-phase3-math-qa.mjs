import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:5173'

const phase1 = JSON.parse(await fs.readFile(path.join(ROOT, 'FIRST_YEAR_WEB_PHASE1_AUDIT.json'), 'utf8'))
const phase2 = JSON.parse(await fs.readFile(path.join(ROOT, 'FIRST_YEAR_WEB_PHASE2_FOUNDATION_REPORT.json'), 'utf8'))

const idByCode = {
  '1BMATC101': 'differential-calculus-linear-algebra-1bmatc101',
  '1BMATC201': 'differential-calculus-numerical-methods-1bmatc201',
  '1BMATE101': 'differential-calculus-linear-algebra-1bmate101',
  '1BMATE201': 'calculus-laplace-transforms-numerical-techniques-1bmate201',
  '1BMATM101': 'differential-calculus-linear-algebra-1bmatm101',
  '1BMATM201': 'multivariable-calculus-numerical-methods-1bmatm201',
  '1BMATS101': 'calculus-linear-algebra-1bmats101',
  '1BMATS201': 'numerical-methods-1bmats201',
}

const expected = phase1.phaseAllocation['3'].subjects.map((entry) => {
  const match = entry.match(/^(.*) \(([^()]+)\)$/)
  const subject = match ? match[1] : entry
  const code = match ? match[2] : ''
  return { subject, code, id: idByCode[code] }
})

if (!phase2.phase3Ready) {
  throw new Error('Phase 2 report does not mark phase3Ready=true')
}

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
]

const regressionRoutes = [
  '/#/chemistry/module-1?slide=1',
  '/#/big-data-analytics/module-1?slide=1',
  '/#/database-management-systems/module-1?slide=1',
  '/#/__first-year-foundation?scene=1',
]

function route(subject, moduleNumber, slideNumber) {
  return `/#/${subject.id}/module-${moduleNumber}?slide=${slideNumber}`
}

async function auditMathSlide(page, subject, moduleNumber, slideNumber, viewportName) {
  const url = `${BASE}${route(subject, moduleNumber, slideNumber)}`
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  try {
    await page.waitForSelector('.slide-frame', { timeout: 12000 })
  } catch (error) {
    return {
      subject: subject.subject,
      code: subject.code,
      id: subject.id,
      module: moduleNumber,
      slide: slideNumber,
      viewport: viewportName,
      ok: false,
      title: '',
      contentShare: 0,
      animatedElements: 0,
      hits: [{ kind: 'route-load-timeout', detail: `${url} / ${error.message}` }],
    }
  }
  await page.waitForTimeout(50)
  return page.evaluate(({ subject, moduleNumber, slideNumber, viewportName }) => {
    const frame = document.querySelector('.slide-frame')
    const body = document.querySelector('.slide-body')
    const footer = document.querySelector('.slide-footer')?.textContent || ''
    const title = document.querySelector('.slide-title')?.textContent?.trim() || ''
    const contentCandidates = [...document.querySelectorAll('[data-slide-content="true"], svg, table, .math-topic-grid, .math-opening, .math-visual-pair')]
    const content = contentCandidates
      .map((el) => ({ el, rect: el.getBoundingClientRect() }))
      .filter((item) => item.rect.width > 4 && item.rect.height > 4)
      .sort((a, b) => (b.rect.width * b.rect.height) - (a.rect.width * a.rect.height))[0]?.el
    const foundationObjects = document.querySelectorAll('.fy-equation-stepper,.fy-numerical-board,.fy-graph,.fy-geometry,.fy-process,.fy-comparison,.fy-concept-map,.fy-source-block,.math-topic-grid,.math-opening,.math-visual-pair,.math-iteration-table,.math-matrix-board')
    const animated = [...document.querySelectorAll('.slide-frame *')].filter((el) => {
      const cs = getComputedStyle(el)
      return cs.animationName !== 'none' && Number.parseFloat(cs.animationDuration) > 0
    })
    const hits = []
    const fail = (kind, detail) => hits.push({ kind, detail })
    if (!frame || !body) fail('missing-frame', 'No slide frame/body')
    if (!footer.includes(`Slide ${slideNumber}`)) fail('wrong-slide', footer.trim())
    if (!title) fail('missing-title', 'Slide title absent')
    if (!content) fail('missing-teaching-surface', 'No teaching surface found')
    if (foundationObjects.length < 1) fail('foundation-not-used', 'Expected Phase 2 teaching component on slide')
    if (frame && (frame.scrollWidth - frame.clientWidth > 24 || frame.scrollHeight - frame.clientHeight > 24)) {
      fail('frame-overflow', `${frame.scrollWidth}x${frame.scrollHeight} vs ${frame.clientWidth}x${frame.clientHeight}`)
    }
    if (body && (body.scrollWidth - body.clientWidth > 28 || body.scrollHeight - body.clientHeight > 28)) {
      fail('body-overflow', `${body.scrollWidth}x${body.scrollHeight} vs ${body.clientWidth}x${body.clientHeight}`)
    }
    const br = body?.getBoundingClientRect()
    const cr = content?.getBoundingClientRect()
    const contentShare = br && cr ? (cr.width * cr.height) / (br.width * br.height) : 0
    if ([3, 4, 5, 6, 8].includes(slideNumber) && contentShare < 0.28) {
      fail('teaching-object-too-small', `${Math.round(contentShare * 100)}%`)
    }
    const textNodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,strong,span,td,th')] : []
    for (const node of textNodes) {
      const r = node.getBoundingClientRect()
      if (!r || r.width < 2 || r.height < 2) continue
      const cs = getComputedStyle(node)
      const px = Number.parseFloat(cs.fontSize)
      if (node.tagName.toLowerCase() !== 'text' && px > 0 && px < 12) {
        fail('tiny-text', `${node.textContent?.trim()?.slice(0, 42)} ${px}px`)
        break
      }
      if (br && (r.right - br.right > 16 || r.bottom - br.bottom > 16 || br.left - r.left > 16 || br.top - r.top > 16)) {
        fail('text-out-of-bounds', node.textContent?.trim()?.slice(0, 60))
        break
      }
    }
    if ([4, 5, 6].includes(slideNumber) && animated.length < 2) {
      fail('animation-too-thin', `${animated.length} animated elements`)
    }
    return {
      subject: subject.subject,
      code: subject.code,
      id: subject.id,
      module: moduleNumber,
      slide: slideNumber,
      viewport: viewportName,
      ok: hits.length === 0,
      title,
      contentShare: Math.round(contentShare * 1000) / 10,
      animatedElements: animated.length,
      hits,
    }
  }, { subject, moduleNumber, slideNumber, viewportName })
}

async function auditRegression(page, url, viewportName) {
  await page.goto(`${BASE}${url}`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.slide-frame, .fy-frame', { timeout: 12000 })
  await page.waitForTimeout(70)
  return page.evaluate(({ url, viewportName }) => {
    const frame = document.querySelector('.slide-frame, .fy-frame')
    const hits = []
    if (!frame) hits.push({ kind: 'missing-frame' })
    if (frame && (frame.scrollWidth - frame.clientWidth > 36 || frame.scrollHeight - frame.clientHeight > 36)) hits.push({ kind: 'overflow' })
    return { route: url, viewport: viewportName, ok: hits.length === 0, hits }
  }, { url, viewportName })
}

async function main() {
  const missingIds = expected.filter((subject) => !subject.id)
  if (missingIds.length) throw new Error(`Missing route ids: ${missingIds.map((s) => s.code).join(', ')}`)

  const browser = await chromium.launch({ headless: true })
  const report = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    expected,
    mathSlides: [],
    regression: [],
  }

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)
    for (const subject of expected) {
      for (let moduleNumber = 1; moduleNumber <= 5; moduleNumber += 1) {
        const depth = firstYearDepthModules[`${subject.code}|${moduleNumber}`]
        const slideCount = 8 + (depth?.blocks?.length || 0)
        for (let slideNumber = 1; slideNumber <= slideCount; slideNumber += 1) {
          report.mathSlides.push(await auditMathSlide(page, subject, moduleNumber, slideNumber, vp.name))
        }
      }
    }
    for (const regressionRoute of regressionRoutes) {
      report.regression.push(await auditRegression(page, regressionRoute, vp.name))
    }
    await context.close()
  }
  await browser.close()

  const failures = [...report.mathSlides, ...report.regression].filter((row) => !row.ok)
  const out = path.join(ROOT, 'qa', 'first-year-phase3-math-report.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify({ ...report, failures }, null, 2))
  console.log(JSON.stringify({
    subjects: expected.length,
    renderedSlides: report.mathSlides.length,
    regressionRoutes: report.regression.length,
    failures: failures.length,
    out,
  }, null, 2))
  process.exit(failures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
