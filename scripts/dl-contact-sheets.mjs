/**
 * Deep Learning (BCA701) contact sheets + full-slide capture.
 * Renders ALL slides across 5 modules.
 *
 * Usage:
 *   npm run build && npm run preview -- --host 127.0.0.1 --port 4173
 *   node scripts/dl-contact-sheets.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://127.0.0.1:4173'
const SUBJECT = 'deep-learning'
const OUT = path.join(ROOT, 'qa-contact-sheets', 'deep-learning')

const VIEWPORTS = [
  { name: '1920x1080', w: 1920, h: 1080 },
  { name: '1600x900', w: 1600, h: 900 },
  { name: '1366x768', w: 1366, h: 768 },
  { name: '1280x720', w: 1280, h: 720 },
]

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

function gradeHeuristic(m) {
  if (!m.hasFrame) return 'C'
  if (m.overflowX > 2 || m.overflowY > 2 || m.clippedText > 0) return 'C'
  if (m.tinyText > 2 || m.footerCollision) return 'B'
  if (m.visualRatio < 0.28 && !m.isRevision && !m.isHero) return 'B'
  return 'A'
}

async function measure(page) {
  return page.evaluate(() => {
    const frame = document.querySelector('.slide-frame')
    if (!frame) return { hasFrame: false }
    const fr = frame.getBoundingClientRect()
    const visual = document.querySelector('.dl-visual')
    const vr = visual?.getBoundingClientRect()
    const copy = document.querySelector('.dl-copy')
    // HTML teaching text only — ignore SVG <text> nodes used in diagrams
    const texts = [...document.querySelectorAll('.dl-copy p, .dl-copy li, .dl-copy strong, .dl-takeaway span, .slide-header-copy h1')]
    let tinyText = 0
    let clippedText = 0
    for (const el of texts) {
      const cs = getComputedStyle(el)
      const fs = parseFloat(cs.fontSize || '0')
      if (fs && fs < 12) tinyText += 1
      if (el.scrollWidth - el.clientWidth > 4 || el.scrollHeight - el.clientHeight > 8) clippedText += 1
    }
    const footer = document.querySelector('.slide-footer, .deck-footer, .presentation-footer')
    let footerCollision = false
    if (footer && visual) {
      const a = footer.getBoundingClientRect()
      const b = visual.getBoundingClientRect()
      footerCollision = !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom)
    }
    return {
      hasFrame: true,
      overflowX: Math.max(0, frame.scrollWidth - frame.clientWidth),
      overflowY: Math.max(0, frame.scrollHeight - frame.clientHeight),
      visualRatio: vr ? (vr.width * vr.height) / (fr.width * fr.height) : 0,
      tinyText,
      clippedText,
      footerCollision,
      isRevision: /revision|exam|resources|coverage|vocabulary/i.test(document.body.innerText.slice(0, 500)),
      isHero: !!document.querySelector('.dl-board.hero'),
      copyLen: copy?.innerText?.length || 0,
    }
  })
}

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
  await page.addStyleTag({ content: HIDE }).catch(() => {})

  // Discover module slide counts from the subject landing
  await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)

  // Probe each module by walking until URL/slide stabilizes at end
  // Exact counts from JSON content + trailing Study resources slide
  const MODULES = [
    ['module-1', 32],
    ['module-2', 32],
    ['module-3', 32],
    ['module-4', 31],
    ['module-5', 30],
  ]
  const report = {
    subject: SUBJECT,
    generatedAt: new Date().toISOString(),
    modules: {},
    grades: { A: 0, B: 0, C: 0 },
    responsive: {},
    regressionSubjects: [],
  }

  for (const [mod, count] of MODULES) {
    const modDir = path.join(OUT, mod)
    await fs.mkdir(modDir, { recursive: true })
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto(`${BASE}/#/${SUBJECT}/${mod}?slide=1`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)
    await page.addStyleTag({ content: HIDE }).catch(() => {})

    const slides = []
    for (let i = 1; i <= count; i += 1) {
      await page.goto(`${BASE}/#/${SUBJECT}/${mod}?slide=${i}`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(220)
      await page.addStyleTag({ content: HIDE }).catch(() => {})
      const frame = page.locator('.slide-frame').first()
      if (!(await frame.count())) break
      const m = await measure(page)
      if (!m.hasFrame) break
      const grade = gradeHeuristic(m)
      report.grades[grade] += 1
      const file = path.join(modDir, `slide-${String(i).padStart(2, '0')}.jpg`)
      await frame.screenshot({ path: file, type: 'jpeg', quality: 72 })
      slides.push({ i, grade, ...m, file: path.relative(ROOT, file) })
    }

    // Contact sheet montage via HTML canvas in page for first N thumbs is heavy;
    // instead write a simple index HTML.
    const sheet = `<!doctype html><meta charset=utf-8><title>${mod} contact</title>
<style>body{font:14px/1.4 system-ui;background:#f7f3eb;color:#132238;padding:16px}
grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
figure{margin:0;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(19,34,56,.08)}
img{width:100%;display:block} figcaption{padding:8px 10px;font-weight:700}</style>
<h1>Deep Learning · ${mod}</h1><grid>
${slides.map((s) => `<figure><img src="./slide-${String(s.i).padStart(2, '0')}.jpg"/><figcaption>${s.i} · ${s.grade}</figcaption></figure>`).join('')}
</grid>`
    await fs.writeFile(path.join(modDir, 'contact-sheet.html'), sheet)
    report.modules[mod] = { count: slides.length, slides }
    console.log(`${mod}: captured ${slides.length} slides`)
  }

  // Responsive spot-check: module-1 slides 1, mid, last at each viewport
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.w, height: vp.h })
    const samples = [1, 8, 16]
    const rows = []
    for (const i of samples) {
      await page.goto(`${BASE}/#/${SUBJECT}/module-1?slide=${i}`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(250)
      await page.addStyleTag({ content: HIDE }).catch(() => {})
      const m = await measure(page)
      rows.push({ slide: i, grade: gradeHeuristic(m), ...m })
      const shot = path.join(OUT, `responsive-${vp.name}-m1-s${i}.jpg`)
      const frame = page.locator('.slide-frame').first()
      if (await frame.count()) await frame.screenshot({ path: shot, type: 'jpeg', quality: 70 })
    }
    report.responsive[vp.name] = rows
  }

  // Regression: subject selector still lists known subjects
  await page.setViewportSize({ width: 1600, height: 900 })
  await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const listed = await page.evaluate(() => {
    const text = document.body.innerText
    const names = [
      'Chemistry',
      'Computer Networks',
      'Big Data',
      'Parallel Computing',
      'DBMS',
      'Theory of Computation',
      'Research Methodology',
      'Deep Learning',
      'Information',
      'Java',
    ]
    return names.filter((n) => text.includes(n))
  })
  report.regressionSubjects = listed

  await fs.writeFile(path.join(OUT, 'dl-qa-report.json'), JSON.stringify(report, null, 2))
  await browser.close()
  console.log('Report:', path.join(OUT, 'dl-qa-report.json'))
  console.log('Grades:', report.grades)
  console.log('Regression subjects found:', listed.join(', '))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
