/**
 * Parallel Computing Module 1 — screenshots, contact sheet, overflow + A/B/C grade.
 *
 * Usage:
 *   npm run build && npm run preview -- --host 127.0.0.1 --port 4173
 *   node scripts/pc-m1-qa.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://127.0.0.1:4173'
const SUBJECT = 'parallel-computing'
const MOD = 'module-1'
const EXPECTED = 88

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

function grade(m) {
  if (!m.hasFrame) return 'C'
  if (m.ox > 4 || m.oy > 8 || m.maxB > 8 || m.maxR > 8) return 'C'
  if (m.tinyHtml > 0) return 'C'
  if (m.footerHit) return 'C'
  if (m.diagramShare < 0.28 && !m.examish) return 'B'
  return 'A'
}

async function measure(page) {
  return page.evaluate(() => {
    const frame = document.querySelector('.slide-frame')
    const body = document.querySelector('.slide-body')
    const title = document.querySelector('.fo-head h2, .fo-divider-copy h2, .slide-title')?.textContent?.trim() || ''
    if (!frame || !body) return { hasFrame: false, title }
    const br = body.getBoundingClientRect()
    const oy = body.scrollHeight - body.clientHeight
    const ox = body.scrollWidth - body.clientWidth
    let maxB = 0
    let maxR = 0
    let tinyHtml = 0
    body.querySelectorAll('h2, .fo-lead, .fo-points li, .fo-formula, .fo-q, .fo-take, .fo-code').forEach((n) => {
      const r = n.getBoundingClientRect()
      if (r.width < 2 || r.height < 2) return
      maxB = Math.max(maxB, r.bottom - br.bottom)
      maxR = Math.max(maxR, r.right - br.right)
      const fs = Number.parseFloat(getComputedStyle(n).fontSize || '16')
      if (fs > 0 && fs < 16) tinyHtml += 1
    })
    const viz = body.querySelector('.fo-visual, .found-scene, .fo-full, .fo-divider, .fo-resource')
    const vr = viz?.getBoundingClientRect()
    const diagramShare = vr ? (vr.width * vr.height) / Math.max(1, br.width * br.height) : 0
    const footer = document.querySelector('.slide-footer')
    let footerHit = false
    if (footer && viz) {
      const a = footer.getBoundingClientRect()
      const b = viz.getBoundingClientRect()
      const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left)
      footerHit = overlapY > 6 && overlapX > 6
    }
    return {
      hasFrame: true,
      title,
      oy,
      ox,
      maxB: Math.round(maxB),
      maxR: Math.round(maxR),
      tinyHtml,
      diagramShare: Number(diagramShare.toFixed(3)),
      footerHit,
      examish: /viva|two-mark|five-mark|ten-mark|revision|resources|exam|checklist|shortcuts/i.test(title),
    }
  })
}

async function captureViewport(browser, vp) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const url = `${BASE}/#/${SUBJECT}/${MOD}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.evaluate(({ subject, mod }) => {
    try { window.sessionStorage.setItem(`presentation:${subject}:${mod}:slide`, '0') } catch { /* ignore */ }
  }, { subject: SUBJECT, mod: MOD })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.slide-frame', { timeout: 15000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(280)

  const outDir = path.join(ROOT, 'qa-contact-sheets', 'pc-m1-frames', vp.name)
  await fs.mkdir(outDir, { recursive: true })
  const shots = []
  const grades = []
  let slideNo = 0
  let guard = 0

  while (guard < EXPECTED + 12) {
    guard += 1
    slideNo += 1
    await page.waitForTimeout(180)
    const metrics = await measure(page)
    const g = grade(metrics)
    grades.push({ slide: slideNo, grade: g, ...metrics })

    if (vp.name === '1600x900') {
      const safe = (metrics.title || `slide-${slideNo}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42)
      const shotPath = path.join(outDir, `${String(slideNo).padStart(2, '0')}-${safe || 'slide'}.jpg`)
      await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 80, animations: 'disabled' })
      const buf = await fs.readFile(shotPath)
      shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
    }

    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
  }

  if (vp.name === '1600x900' && shots.length) {
    const cols = 5
    const cellW = 300
    const cells = shots.map((src, i) => {
      const row = grades[i]
      const t = (row?.title || '').slice(0, 36)
      return `<figure data-grade="${row?.grade}"><img src="${src}" /><figcaption>${String(i + 1).padStart(2, '0')} · ${row?.grade} · ${t}</figcaption></figure>`
    }).join('')
    const gridW = cols * cellW + (cols + 1) * 12
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#1c2430;font-family:ui-sans-serif,system-ui,sans-serif;padding:16px;width:${gridW}px;color:#e8eef7}
      h1{font-size:18px;margin:0 0 6px;color:#a5b4fc}
      .meta{color:#9aa4b2;font-size:12px;margin:0 0 12px}
      .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px}
      figure{margin:0;background:#0d1117;border-radius:8px;overflow:hidden;border:2px solid #2a3342}
      figure[data-grade="A"]{border-color:#16a34a}
      figure[data-grade="B"]{border-color:#d97706}
      figure[data-grade="C"]{border-color:#dc2626}
      img{display:block;width:100%;height:auto}
      figcaption{font-size:10px;font-weight:700;padding:5px 7px;color:#9aa4b2}
    </style></head><body>
      <h1>Parallel Computing · Module 1 · Foundations</h1>
      <p class="meta">${shots.length} slides · ${vp.w}×${vp.h}</p>
      <div class="g">${cells}</div>
    </body></html>`
    const sheetPage = await browser.newPage({ viewport: { width: gridW + 40, height: 1200 } })
    await sheetPage.setContent(html, { waitUntil: 'load' })
    await sheetPage.waitForTimeout(300)
    const sheetOut = path.join(ROOT, 'qa-contact-sheets', 'pc-module-1-contact-sheet.jpg')
    await sheetPage.screenshot({ path: sheetOut, type: 'jpeg', quality: 85, fullPage: true })
    await sheetPage.close()
    console.log(`contact sheet → ${sheetOut}`)
  }

  await page.close()
  const tally = (x) => grades.filter((r) => r.grade === x).length
  const fails = grades.filter((r) => r.grade === 'C')
  console.log(`${vp.name}: ${grades.length} slides  A=${tally('A')} B=${tally('B')} C=${tally('C')}`)
  if (fails.length) {
    fails.forEach((f) => console.log(`  C  #${f.slide}  oy=${f.oy} ox=${f.ox} b=${f.maxB} r=${f.maxR} tiny=${f.tinyHtml}  ${f.title}`))
  }
  return { vp: vp.name, grades }
}

const run = async () => {
  console.log(`PC Module 1 QA against ${BASE}`)
  const browser = await chromium.launch({ headless: true })
  const reports = []
  for (const vp of VIEWPORTS) {
    reports.push(await captureViewport(browser, vp))
  }
  await browser.close()
  const out = path.join(ROOT, 'qa', 'pc-m1-qa.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify({ generatedAt: new Date().toISOString(), reports }, null, 2))
  const anyC = reports.some((r) => r.grades.some((g) => g.grade === 'C'))
  console.log(anyC ? 'RESULT: C-grade slides remain' : 'RESULT: C-GRADE SLIDES = 0')
  process.exit(anyC ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
