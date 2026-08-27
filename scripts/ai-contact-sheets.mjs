/**
 * Artificial Intelligence (BCS515B) contact sheets + full-slide capture.
 * Renders ALL slides across 5 modules.
 *
 * Usage:
 *   npm run build && npm run preview -- --host 127.0.0.1 --port 4173
 *   node scripts/ai-contact-sheets.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://127.0.0.1:4173'
const SUBJECT = 'artificial-intelligence'
const OUT = path.join(ROOT, 'qa-contact-sheets', 'artificial-intelligence')

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
    const visual = document.querySelector('.ai-visual, .ai-scene')
    const vr = visual?.getBoundingClientRect()
    const copy = document.querySelector('.ai-copy')
    const texts = [...document.querySelectorAll('.ai-copy p, .ai-copy li, .ai-copy strong, .ai-takeaway span, .slide-header-copy h1')]
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
      isRevision: /revision|exam|resources|confusions|one picture/i.test(document.body.innerText.slice(0, 800)),
      isHero: !!document.querySelector('.ai-hero-open, .ai-opener'),
      copyLen: copy?.innerText?.length || 0,
    }
  })
}

const MODULES = [
  ['module-1', 35],
  ['module-2', 30],
  ['module-3', 23],
  ['module-4', 22],
  ['module-5', 23],
]

async function main() {
  await fs.mkdir(OUT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })

  const report = {
    subject: SUBJECT,
    generatedAt: new Date().toISOString(),
    modules: {},
    grades: { A: 0, B: 0, C: 0 },
    responsive: {},
  }

  for (const [mod, count] of MODULES) {
    const modDir = path.join(OUT, mod)
    await fs.mkdir(modDir, { recursive: true })
    const context = await browser.newContext({ viewport: { width: 1600, height: 900 } })
    const modPage = await context.newPage()
    const url = `${BASE}/#/${SUBJECT}/${mod}?slide=1`
    await modPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await modPage.evaluate((moduleId) => {
      try { window.sessionStorage.setItem(`presentation:artificial-intelligence:${moduleId}:slide`, '0') } catch { /* ignore */ }
    }, mod)
    await modPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await modPage.waitForSelector('.slide-frame', { timeout: 20000 })
    await modPage.addStyleTag({ content: HIDE }).catch(() => {})

    const slides = []
    for (let i = 1; i <= count; i += 1) {
      await modPage.evaluate((hash) => { window.location.hash = hash }, `/${SUBJECT}/${mod}?slide=${i}`)
      try {
        await modPage.waitForFunction(
          ({ moduleId, n }) => {
            const frame = document.querySelector('.slide-frame')
            if (!frame) return false
            const h = decodeURIComponent(window.location.hash || '')
            return h.includes(`${moduleId}?slide=${n}`)
          },
          { moduleId: mod, n: i },
          { timeout: 18000 },
        )
      } catch {
        const dump = path.join(modDir, `FAIL-slide-${String(i).padStart(2, '0')}.jpg`)
        await modPage.screenshot({ path: dump, type: 'jpeg', quality: 60 }).catch(() => {})
        console.log(`\n${mod} slide ${i}: timeout (see ${path.relative(ROOT, dump)})`)
        report.grades.C += 1
        slides.push({ i, grade: 'C', hasFrame: false, file: path.relative(ROOT, dump) })
        continue
      }
      await modPage.waitForTimeout(160)
      await modPage.addStyleTag({ content: HIDE }).catch(() => {})
      const frame = modPage.locator('.slide-frame').first()
      const m = await measure(modPage)
      if (!m.hasFrame) {
        console.log(`${mod} slide ${i}: no frame`)
        report.grades.C += 1
        slides.push({ i, grade: 'C', hasFrame: false })
        continue
      }
      const grade = gradeHeuristic(m)
      report.grades[grade] += 1
      const file = path.join(modDir, `slide-${String(i).padStart(2, '0')}.jpg`)
      await frame.screenshot({ path: file, type: 'jpeg', quality: 72, animations: 'disabled' })
      slides.push({ i, grade, ...m, file: path.relative(ROOT, file) })
      process.stdout.write(`  ${mod} ${i}/${count}\r`)
    }
    console.log(`${mod}: captured ${slides.length}/${count} slides`)
    await context.close()

    const sheet = `<!doctype html><meta charset=utf-8><title>${mod} contact</title>
<style>body{font:14px/1.4 system-ui;background:#fffaf0;color:#0b1f3a;padding:16px}
grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
figure{margin:0;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(11,31,58,.08)}
img{width:100%;display:block} figcaption{padding:8px 10px;font-weight:700}</style>
<h1>Artificial Intelligence · ${mod}</h1><grid>
${slides.map((s) => `<figure><img src="./slide-${String(s.i).padStart(2, '0')}.jpg"/><figcaption>${s.i} · ${s.grade}</figcaption></figure>`).join('')}
</grid>`
    await fs.writeFile(path.join(modDir, 'contact-sheet.html'), sheet)
    report.modules[mod] = { count: slides.length, slides }
    console.log(`${mod}: captured ${slides.length} slides`)
  }

  try {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.w, height: vp.h })
      const samples = [1, 8, 16]
      const rows = []
      for (const i of samples) {
        await page.goto(`${BASE}/#/${SUBJECT}/module-1?slide=${i}`, { waitUntil: 'domcontentloaded', timeout: 20000 })
        await page.waitForTimeout(200)
        await page.addStyleTag({ content: HIDE }).catch(() => {})
        const m = await measure(page)
        rows.push({ slide: i, grade: gradeHeuristic(m), overflowX: m.overflowX, overflowY: m.overflowY })
      }
      report.responsive[vp.name] = rows
      console.log(`responsive ${vp.name}`, rows.map((r) => r.grade).join(' '))
    }
  } catch (err) {
    report.responsiveError = String(err)
    console.log('responsive check skipped:', err.message)
  }

  await fs.writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2))
  console.log('grades', report.grades)
  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
