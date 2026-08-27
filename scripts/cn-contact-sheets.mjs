/**
 * Computer Networks-I contact sheets + full-slide capture.
 * Renders ALL slides across 8 units, writes individual JPEGs and unit contact sheets.
 *
 * Usage:
 *   1. npm run build && npm run preview -- --host 127.0.0.1 --port 4173
 *   2. node scripts/cn-contact-sheets.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://127.0.0.1:4173'
const VW = 1600
const VH = 900

const UNITS = [
  ['unit-1', 40, 'Introduction & Network Models'],
  ['unit-2', 48, 'Physical Layer-I'],
  ['unit-3', 40, 'Physical Layer-II & Switching'],
  ['unit-4', 38, 'Error Detection & Correction'],
  ['unit-5', 43, 'Data Link Control'],
  ['unit-6', 50, 'Multiple Access & Ethernet'],
  ['unit-7', 40, 'Wireless LANs & Cellular'],
  ['unit-8', 48, 'Network Layer'],
]

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

function gradeHeuristic(m) {
  // Geometry-first grade. Visual polish quality beyond overflow is reviewed on contact sheets.
  if (!m.hasFrame) return 'C'
  if (m.oy > 8 || m.ox > 8 || m.maxB > 8 || m.maxR > 8) return 'C'
  if (m.labelTiny) return 'B'
  if (m.oy <= 2 && m.ox <= 2 && m.diagramShare >= 0.28) return 'A'
  return 'B'
}

async function captureUnit(browser, unitId, expected, title) {
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })

  const url = `${BASE}/#/computer-networks/${unitId}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.evaluate((mod) => {
    try {
      window.sessionStorage.setItem(`presentation:computer-networks:${mod}:slide`, '0')
    } catch { /* ignore */ }
  }, unitId)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.slide-frame', { timeout: 15000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(350)

  const outDir = path.join(ROOT, 'qa-contact-sheets', 'cn-frames', unitId)
  await fs.mkdir(outDir, { recursive: true })

  const shots = []
  const grades = []
  let guard = 0
  let slideNo = 0

  while (guard < expected + 5) {
    guard += 1
    slideNo += 1
    await page.waitForTimeout(220)
    const metrics = await page.evaluate(() => {
      const frame = document.querySelector('.slide-frame')
      const body = document.querySelector('.slide-body')
      const title = document.querySelector('.slide-title, h1')?.textContent?.trim() || ''
      if (!frame || !body) return { hasFrame: false, title }
      const br = body.getBoundingClientRect()
      const oy = body.scrollHeight - body.clientHeight
      const ox = body.scrollWidth - body.clientWidth
      let maxB = 0
      let maxR = 0
      let labelTiny = false
      body.querySelectorAll('text, .cnx-osi-row strong, .cnx-ip-row span, .process-node-label').forEach((n) => {
        const r = n.getBoundingClientRect()
        maxB = Math.max(maxB, r.bottom - br.bottom)
        maxR = Math.max(maxR, r.right - br.right)
        const fs = Number.parseFloat(getComputedStyle(n).fontSize || '16')
        if (fs > 0 && fs < 14) labelTiny = true
      })
      const viz = body.querySelector('.layout-visual, .vf-canvas, .cnx-svg-wrap, .cnx-osi-hero, .cnx-ip-header, .cnx-divider-visual')
      const diagramShare = viz ? Math.min(1, (viz.getBoundingClientRect().height * viz.getBoundingClientRect().width) / Math.max(1, br.width * br.height)) : 0.2
      return {
        hasFrame: true,
        title,
        oy,
        ox,
        maxB: Math.round(maxB),
        maxR: Math.round(maxR),
        labelTiny,
        diagramShare: Number(diagramShare.toFixed(3)),
      }
    })

    const grade = gradeHeuristic(metrics)
    grades.push({ slide: slideNo, grade, title: metrics.title, ...metrics })

    const safe = (metrics.title || `slide-${slideNo}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 42)
    const shotPath = path.join(outDir, `${String(slideNo).padStart(2, '0')}-${safe || 'slide'}.jpg`)
    await page.locator('.slide-frame').screenshot({
      path: shotPath,
      type: 'jpeg',
      quality: 82,
      animations: 'disabled',
    })
    const buf = await fs.readFile(shotPath)
    shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)

    process.stdout.write(`  ${unitId} ${slideNo}/${expected}\r`)

    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
    await page.waitForTimeout(100)
  }

  // Contact sheet grid
  const cols = 5
  const cellW = 320
  const cells = shots.map((src, i) => {
    const g = grades[i]?.grade || '?'
    return `<figure data-grade="${g}"><img src="${src}" /><figcaption>${String(i + 1).padStart(2, '0')} · ${g}</figcaption></figure>`
  }).join('')
  const gridW = cols * cellW + (cols + 1) * 14
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#1c2430;font-family:ui-sans-serif,system-ui,sans-serif;padding:18px;width:${gridW}px;color:#e8eef7}
    h1{font-size:18px;letter-spacing:.04em;margin:0 0 6px;color:#9ec1ff}
    .meta{color:#9aa4b2;font-size:12px;margin:0 0 14px}
    .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:14px}
    figure{margin:0;background:#0d1117;border-radius:8px;overflow:hidden;box-shadow:0 8px 22px rgba(0,0,0,.35);border:1px solid #2a3342}
    figure[data-grade="A"]{border-color:#16a34a}
    figure[data-grade="B"]{border-color:#d97706}
    figure[data-grade="C"]{border-color:#dc2626}
    img{display:block;width:100%;height:auto}
    figcaption{font-size:11px;font-weight:700;padding:6px 8px;color:#9aa4b2}
  </style></head><body>
    <h1>CN-I · ${unitId.toUpperCase()} · ${title}</h1>
    <p class="meta">${shots.length} slides · ${VW}×${VH} · heuristic grades A/B/C</p>
    <div class="g">${cells}</div>
  </body></html>`

  const sheetPage = await browser.newPage({ viewport: { width: gridW + 40, height: 1200 } })
  await sheetPage.setContent(html, { waitUntil: 'load' })
  await sheetPage.waitForTimeout(400)
  const sheetOut = path.join(ROOT, 'qa-contact-sheets', `cn-${unitId}-contact-sheet.jpg`)
  await sheetPage.screenshot({ path: sheetOut, type: 'jpeg', quality: 85, fullPage: true })
  await sheetPage.close()
  await page.close()

  const summary = {
    unitId,
    expected,
    rendered: shots.length,
    grades: {
      A: grades.filter((g) => g.grade === 'A').length,
      B: grades.filter((g) => g.grade === 'B').length,
      C: grades.filter((g) => g.grade === 'C').length,
    },
    sheet: sheetOut,
    details: grades,
  }
  console.log(`\n${unitId}: rendered ${shots.length}/${expected} · A=${summary.grades.A} B=${summary.grades.B} C=${summary.grades.C}`)
  return summary
}

const run = async () => {
  console.log(`CN contact sheets against ${BASE}`)
  // Optional focus filter for fast iteration: CN_UNITS="unit-1,unit-2"
  const only = (process.env.CN_UNITS || '').split(',').map((s) => s.trim()).filter(Boolean)
  const selected = only.length ? UNITS.filter(([id]) => only.includes(id)) : UNITS
  const browser = await chromium.launch({ headless: true })
  const reports = []
  for (const [id, count, title] of selected) {
    reports.push(await captureUnit(browser, id, count, title))
  }
  await browser.close()

  const totals = reports.reduce(
    (acc, r) => {
      acc.rendered += r.rendered
      acc.expected += r.expected
      acc.A += r.grades.A
      acc.B += r.grades.B
      acc.C += r.grades.C
      return acc
    },
    { rendered: 0, expected: 0, A: 0, B: 0, C: 0 },
  )

  const reportName = only.length ? 'cn-director-cut-report-partial.json' : 'cn-director-cut-report.json'
  const reportPath = path.join(ROOT, 'qa-contact-sheets', reportName)
  await fs.writeFile(reportPath, JSON.stringify({ totals, units: reports }, null, 2))
  console.log('\nTOTAL', totals)
  console.log('Report →', reportPath)
  if (totals.rendered !== 347 || totals.C > 0) process.exitCode = totals.C > 0 ? 2 : 0
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
