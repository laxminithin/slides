import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:4173'

const baseSubjects = [
  ['Basics of Electrical Engineering', '1BBEE105/205', 'basics-electrical-engineering-1bbee105-205'],
  ['Computer Aided Engineering Drawing for CV Stream', '1BCEDC103/203', 'computer-aided-engineering-drawing-cv-1bcedc103-203'],
  ['Computer Aided Engineering Drawing for EE Stream', '1BCEDE103/203', 'computer-aided-engineering-drawing-ee-1bcede103-203'],
  ['Computer Aided Engineering Drawing for ECE Stream', '1BCEDEC103/203', 'computer-aided-engineering-drawing-ece-1bcedec103-203'],
  ['Computer Aided Engineering Drawing for ME Stream', '1BCEDM103/203', 'computer-aided-engineering-drawing-me-1bcedm103-203'],
  ['Computer Aided Engineering Drawing for CS Stream', '1BCEDS103/203', 'computer-aided-engineering-drawing-cs-1bceds103-203'],
  ['ENGINEERING MECHANICS', '1BCIV105/205', 'engineering-mechanics-1bciv105-205'],
  ['Elements of Aeronautics', '1BEAE105/205', 'elements-of-aeronautics-1beae105-205'],
  ['Fundamentals of Electronics and Communication Engineering', '1BECE105/205', 'fundamentals-electronics-communication-1bece105-205'],
  ['Elements of Mechanical Engineering', '1BEME105/205', 'elements-mechanical-engineering-1beme105-205'],
  ['BUILDING SCIENCE AND MECHANICS', '1BESC104A/204A', 'building-science-mechanics-1besc104a-204a'],
  ['Introduction to Electrical Engineering', '1BESC104B/204B', 'introduction-electrical-engineering-1besc104b-204b'],
  ['Introduction to Electronics and Communication Engineering', '1BESC104C/204C', 'introduction-electronics-communication-1besc104c-204c'],
  ['INTRODUCTION TO MECHANICAL ENGINEERING', '1BESC104D/204D', 'introduction-mechanical-engineering-1besc104d-204d'],
]

function extraSlides(code, moduleNumber) {
  if (code === '1BECE105/205' && moduleNumber === 1) return 1
  if (code === '1BEME105/205' && moduleNumber === 4) return 1
  return 0
}

const subjects = baseSubjects.map(([subject, code, id]) => ({
  subject,
  code,
  id,
  counts: [1, 2, 3, 4, 5].map((moduleNumber) => 12 + (firstYearDepthModules[`${code}|${moduleNumber}`]?.blocks?.length || 0) + extraSlides(code, moduleNumber)),
  pptxSlides: [1, 2, 3, 4, 5].map((moduleNumber) => firstYearDepthModules[`${code}|${moduleNumber}`]?.pptxSlides || 0),
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
  '/#/__first-year-foundation?scene=5',
  '/#/big-data-analytics/module-1?slide=1',
  '/#/database-management-systems/module-1?slide=1',
  '/#/analog-electronics-linear-ics/module-1?slide=1',
]

async function auditSlide(page, subject, moduleNumber, slideNumber, viewportName, reducedMotion = false) {
  const route = `/#/${subject.id}/module-${moduleNumber}?slide=${slideNumber}`
  const url = `${BASE}${route}`
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  try {
    await page.waitForSelector('.slide-frame', { timeout: 12000 })
  } catch (error) {
    return { subject: subject.subject, code: subject.code, route, module: moduleNumber, slide: slideNumber, viewport: viewportName, reducedMotion, ok: false, hits: [{ kind: 'route-load-timeout', detail: error.message }] }
  }
  await page.waitForTimeout(reducedMotion ? 40 : 70)
  return page.evaluate(({ subject, route, moduleNumber, slideNumber, viewportName, reducedMotion }) => {
    const frame = document.querySelector('.slide-frame')
    const body = document.querySelector('.slide-body')
    const title = document.querySelector('.slide-title')?.textContent?.trim() || ''
    const footer = document.querySelector('.slide-footer')?.textContent || ''
    const candidates = [...document.querySelectorAll('[data-slide-content="true"], .eng-svg, .eng-hero, .eng-topic-map, .eng-sequence, .eng-truth, .fy-source-block, .fy-numerical-board, .fy-equation-stepper, .fy-process, .fy-comparison, .fy-waveform, .fy-graph, .fy-concept-map, svg, table')]
      .map((el) => ({ el, rect: el.getBoundingClientRect() }))
      .filter((item) => item.rect.width > 8 && item.rect.height > 8)
      .sort((a, b) => (b.rect.width * b.rect.height) - (a.rect.width * a.rect.height))
    const content = candidates[0]?.el
    const animated = [...document.querySelectorAll('.slide-frame *')].filter((el) => {
      const cs = getComputedStyle(el)
      return cs.animationName !== 'none' && Number.parseFloat(cs.animationDuration) > 0
    })
    const hits = []
    const fail = (kind, detail) => hits.push({ kind, detail })

    if (!frame || !body) fail('missing-frame', 'No slide frame/body')
    if (!title) fail('missing-title', 'No slide title')
    if (!footer.includes(`Slide ${slideNumber}`)) fail('wrong-slide', footer.trim())
    if (!content) fail('missing-teaching-surface', 'No engineering teaching surface found')
    if (frame && (frame.scrollWidth - frame.clientWidth > 26 || frame.scrollHeight - frame.clientHeight > 26)) fail('frame-overflow', `${frame.scrollWidth}x${frame.scrollHeight} vs ${frame.clientWidth}x${frame.clientHeight}`)
    if (body && (body.scrollWidth - body.clientWidth > 30 || body.scrollHeight - body.clientHeight > 30)) fail('body-overflow', `${body.scrollWidth}x${body.scrollHeight} vs ${body.clientWidth}x${body.clientHeight}`)

    const br = body?.getBoundingClientRect()
    const cr = content?.getBoundingClientRect()
    const contentShare = br && cr ? (cr.width * cr.height) / (br.width * br.height) : 0
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(slideNumber) && contentShare < 0.24) fail('teaching-object-too-small', `${Math.round(contentShare * 100)}%`)

    const textNodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,strong,span,td,th,code,small,b,text')] : []
    for (const node of textNodes) {
      const r = node.getBoundingClientRect()
      if (!r || r.width < 2 || r.height < 2) continue
      const cs = getComputedStyle(node)
      const px = Number.parseFloat(cs.fontSize)
      if (px > 0 && px < 12) {
        fail('tiny-text', `${node.textContent?.trim()?.slice(0, 44)} ${px}px`)
        break
      }
      if (br && (r.right - br.right > 22 || r.bottom - br.bottom > 22 || br.left - r.left > 22 || br.top - r.top > 22)) {
        fail('text-out-of-bounds', node.textContent?.trim()?.slice(0, 60))
        break
      }
    }
    if (!reducedMotion && [1, 2, 3, 4, 5, 6, 7, 9, 10, 11].includes(slideNumber) && animated.length < 1) fail('animation-too-thin', `${animated.length} animated elements`)
    if (reducedMotion && !content) fail('reduced-motion-blank', 'No stable teaching surface visible')

    return {
      subject: subject.subject,
      code: subject.code,
      route,
      module: moduleNumber,
      slide: slideNumber,
      viewport: viewportName,
      reducedMotion,
      ok: hits.length === 0,
      title,
      contentShare: Math.round(contentShare * 1000) / 10,
      animatedElements: animated.length,
      hits,
    }
  }, { subject, route, moduleNumber, slideNumber, viewportName, reducedMotion })
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
  const report = { generatedAt: new Date().toISOString(), base: BASE, subjects, engineeringSlides: [], reducedMotion: [], regression: [] }
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)
    for (const subject of subjects) {
      for (let m = 1; m <= subject.counts.length; m += 1) {
        for (let s = 1; s <= subject.counts[m - 1]; s += 1) {
          report.engineeringSlides.push(await auditSlide(page, subject, m, s, vp.name))
        }
      }
    }
    for (const route of regressionRoutes) report.regression.push(await auditRegression(page, route, vp.name))
    await context.close()

    const reduced = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' })
    const reducedPage = await reduced.newPage()
    for (const subject of subjects) report.reducedMotion.push(await auditSlide(reducedPage, subject, 1, 4, vp.name, true))
    await reduced.close()
  }
  await browser.close()
  const failures = [...report.engineeringSlides, ...report.reducedMotion, ...report.regression].filter((row) => !row.ok)
  const out = path.join(ROOT, 'qa', 'first-year-phase6-engineering-report.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify({ ...report, failures }, null, 2))
  console.log(JSON.stringify({ subjects: subjects.length, renderedSlides: report.engineeringSlides.length, reducedMotion: report.reducedMotion.length, regressionRoutes: report.regression.length, failures: failures.length, out }, null, 2))
  process.exit(failures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
