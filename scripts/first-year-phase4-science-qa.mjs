import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:4173'

const baseSubjects = [
  ['Applied Chemistry for Sustainable Structures and Material Design', '1BCHEC102/202', 'applied-chemistry-sustainable-structures-1bchec102-202', [11, 10, 12, 12, 12]],
  ['Applied Chemistry for Emerging Electronics and Futuristic Devices', '1BCHEE102/202', 'applied-chemistry-emerging-electronics-1bchee102-202', [11, 11, 10, 11, 12]],
  ['Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems', '1BCHEM102/202', 'applied-chemistry-metal-protection-energy-1bchem102-202', [12, 10, 11, 10, 11]],
  ['Elements of Biotechnology and Biomimetics', '1BEBT105/205', 'elements-biotechnology-biomimetics-1bebt105-205', [12, 12, 12, 12, 12]],
  ['Elements of Chemical Engineering', '1BECHE105/205', 'elements-chemical-engineering-1beche105-205', [11, 11, 11, 11, 11]],
  ['QUANTUM PHYSICS AND ELECTRONIC SENSORS', '1BPHEC102/202', 'quantum-physics-electronic-sensors-1bphec102-202', [12, 10, 10, 10, 11]],
  ['ELECTRICAL ENGINEERING MATERIALS', '1BPHEE102/102', 'electrical-engineering-materials-1bphee102-102', [10, 10, 10, 10, 10]],
  ['PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS', '1BPHYC102/202', 'physics-sustainable-structural-systems-1bphyc102-202', [11, 11, 11, 11, 11]],
  ['PHYSICS OF MATERIALS', '1BPHYM102/202', 'physics-of-materials-1bphym102-202', [11, 11, 10, 11, 11]],
  ['QUANTUM PHYSICS AND APPLICATIONS', '1BPHYS102/202', 'quantum-physics-applications-1bphys102-202', [10, 10, 10, 10, 10]],
  ['Principles of Soil Science and Agronomy', '1BSSA105/205', 'principles-soil-science-agronomy-1bssa105-205', [12, 12, 12, 12, 12]],
]

const subjects = baseSubjects.map(([subject, code, id, counts]) => ({
  subject,
  code,
  id,
  counts: counts.map((count, index) => count + (firstYearDepthModules[`${code}|${index + 1}`]?.blocks?.length || 0)),
}))

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
]

const regressionRoutes = [
  '/#/chemistry/module-1?slide=1',
  '/#/differential-calculus-linear-algebra-1bmatc101/module-1?slide=1',
  '/#/numerical-methods-1bmats201/module-1?slide=1',
  '/#/__first-year-foundation?scene=1',
  '/#/big-data-analytics/module-1?slide=1',
  '/#/database-management-systems/module-1?slide=1',
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
  await page.waitForTimeout(reducedMotion ? 40 : 55)
  return page.evaluate(({ subject, route, moduleNumber, slideNumber, viewportName, reducedMotion }) => {
    const frame = document.querySelector('.slide-frame')
    const body = document.querySelector('.slide-body')
    const title = document.querySelector('.slide-title')?.textContent?.trim() || ''
    const footer = document.querySelector('.slide-footer')?.textContent || ''
    const candidates = [...document.querySelectorAll('[data-slide-content="true"], .science-svg, svg, table, .fy-equation-stepper, .fy-numerical-board, .fy-process, .fy-comparison, .fy-callout, .science-topic-map, .science-hero-visual')]
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
    if (!content) fail('missing-teaching-surface', 'No science teaching surface found')
    if (frame && (frame.scrollWidth - frame.clientWidth > 26 || frame.scrollHeight - frame.clientHeight > 26)) fail('frame-overflow', `${frame.scrollWidth}x${frame.scrollHeight} vs ${frame.clientWidth}x${frame.clientHeight}`)
    if (body && (body.scrollWidth - body.clientWidth > 30 || body.scrollHeight - body.clientHeight > 30)) fail('body-overflow', `${body.scrollWidth}x${body.scrollHeight} vs ${body.clientWidth}x${body.clientHeight}`)

    const br = body?.getBoundingClientRect()
    const cr = content?.getBoundingClientRect()
    const contentShare = br && cr ? (cr.width * cr.height) / (br.width * br.height) : 0
    if ([1, 4, 5, 6, 7, 8, 10, 11, 12].includes(slideNumber) && contentShare < 0.28) fail('teaching-object-too-small', `${Math.round(contentShare * 100)}%`)

    const textNodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,strong,span,td,th')] : []
    for (const node of textNodes) {
      const r = node.getBoundingClientRect()
      if (!r || r.width < 2 || r.height < 2) continue
      const cs = getComputedStyle(node)
      const px = Number.parseFloat(cs.fontSize)
      if (px > 0 && px < 12) {
        fail('tiny-text', `${node.textContent?.trim()?.slice(0, 44)} ${px}px`)
        break
      }
      if (br && (r.right - br.right > 18 || r.bottom - br.bottom > 18 || br.left - r.left > 18 || br.top - r.top > 18)) {
        fail('text-out-of-bounds', node.textContent?.trim()?.slice(0, 60))
        break
      }
    }
    if (!reducedMotion && !/Common Misconception|Module Recap/i.test(title) && [1, 4, 5, 7, 10, 12].includes(slideNumber) && animated.length < 1) fail('animation-too-thin', `${animated.length} animated elements`)
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
  const report = { generatedAt: new Date().toISOString(), base: BASE, subjects, scienceSlides: [], reducedMotion: [], regression: [] }
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)
    for (const subject of subjects) {
      for (let m = 1; m <= subject.counts.length; m += 1) {
        for (let s = 1; s <= subject.counts[m - 1]; s += 1) {
          report.scienceSlides.push(await auditSlide(page, subject, m, s, vp.name))
        }
      }
    }
    for (const route of regressionRoutes) report.regression.push(await auditRegression(page, route, vp.name))
    await context.close()

    const reduced = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' })
    const reducedPage = await reduced.newPage()
    for (const subject of subjects) report.reducedMotion.push(await auditSlide(reducedPage, subject, 1, 1, vp.name, true))
    await reduced.close()
  }
  await browser.close()
  const failures = [...report.scienceSlides, ...report.reducedMotion, ...report.regression].filter((row) => !row.ok)
  const out = path.join(ROOT, 'qa', 'first-year-phase4-science-report.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify({ ...report, failures }, null, 2))
  console.log(JSON.stringify({ subjects: subjects.length, renderedSlides: report.scienceSlides.length, reducedMotion: report.reducedMotion.length, regressionRoutes: report.regression.length, failures: failures.length, out }, null, 2))
  process.exit(failures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
