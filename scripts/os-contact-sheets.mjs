/**
 * Operating Systems contact sheets + full-slide capture.
 * Renders ALL slides across 5 modules, writes individual JPEGs and module contact sheets.
 *
 * Usage:
 *   node scripts/os-contact-sheets.mjs [baseUrl]
 *   OS_MODULES="module-1,module-2" node scripts/os-contact-sheets.mjs http://localhost:5173
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://localhost:5173'
const VW = Number(process.env.OS_VW || 1600)
const VH = Number(process.env.OS_VH || 900)

const MODULES = [
  ['module-1', 36, 'Inside the Machine'],
  ['module-2', 32, 'The Battle for the CPU'],
  ['module-3', 28, 'When Processes Collide'],
  ['module-4', 34, 'Memory Is an Illusion'],
  ['module-5', 30, 'Where Data Lives'],
]

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

async function captureModule(browser, modId, expected, title) {
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })

  const url = `${BASE}/#/operating-systems/${modId}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.evaluate((mod) => {
    try {
      window.sessionStorage.setItem(`presentation:operating-systems:${mod}:slide`, '0')
    } catch { /* ignore */ }
  }, modId)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.slide-frame', { timeout: 15000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(350)

  const outDir = path.join(ROOT, 'qa-contact-sheets', 'os-frames', modId)
  await fs.mkdir(outDir, { recursive: true })

  const shots = []
  const grades = []
  let guard = 0
  let slideNo = 0

  while (guard < expected + 8) {
    guard += 1
    slideNo += 1
    await page.waitForTimeout(240)
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
      body.querySelectorAll('text, .os-chip, .os-points li, .os-lead').forEach((n) => {
        const r = n.getBoundingClientRect()
        maxB = Math.max(maxB, r.bottom - br.bottom)
        maxR = Math.max(maxR, r.right - br.right)
        const fs = Number.parseFloat(getComputedStyle(n).fontSize || '16')
        if (fs > 0 && fs < 12) labelTiny = true
      })
      const viz = body.querySelector('.os-visual, .os-scene')
      const diagramShare = viz ? Math.min(1, (viz.getBoundingClientRect().height * viz.getBoundingClientRect().width) / Math.max(1, br.width * br.height)) : 0.2
      return {
        hasFrame: true, title, oy, ox,
        maxB: Math.round(maxB), maxR: Math.round(maxR),
        labelTiny, diagramShare: Number(diagramShare.toFixed(3)),
      }
    })

    const grade = (!metrics.hasFrame || metrics.oy > 8 || metrics.ox > 8 || metrics.maxB > 8 || metrics.maxR > 8)
      ? 'C' : metrics.labelTiny ? 'B' : (metrics.diagramShare >= 0.34 ? 'A' : 'B')
    grades.push({ slide: slideNo, grade, ...metrics })

    const safe = (metrics.title || `slide-${slideNo}`)
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42)
    const shotPath = path.join(outDir, `${String(slideNo).padStart(2, '0')}-${safe || 'slide'}.jpg`)
    await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 82, animations: 'disabled' })
    const buf = await fs.readFile(shotPath)
    shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)

    process.stdout.write(`  ${modId} ${slideNo}/${expected}\r`)

    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
    await page.waitForTimeout(120)
  }

  const cols = 4
  const cellW = 360
  const cells = shots.map((src, i) => {
    const g = grades[i]?.grade || '?'
    const t = (grades[i]?.title || '').slice(0, 40)
    return `<figure data-grade="${g}"><img src="${src}" /><figcaption>${String(i + 1).padStart(2, '0')} · ${g} · ${t}</figcaption></figure>`
  }).join('')
  const gridW = cols * cellW + (cols + 1) * 14
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#1c2430;font-family:ui-sans-serif,system-ui,sans-serif;padding:18px;width:${gridW}px;color:#e8eef7}
    h1{font-size:18px;letter-spacing:.04em;margin:0 0 6px;color:#9ec1ff}
    .meta{color:#9aa4b2;font-size:12px;margin:0 0 14px}
    .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:14px}
    figure{margin:0;background:#0d1117;border-radius:8px;overflow:hidden;box-shadow:0 8px 22px rgba(0,0,0,.35);border:2px solid #2a3342}
    figure[data-grade="A"]{border-color:#16a34a}
    figure[data-grade="B"]{border-color:#d97706}
    figure[data-grade="C"]{border-color:#dc2626}
    img{display:block;width:100%;height:auto}
    figcaption{font-size:11px;font-weight:700;padding:6px 8px;color:#9aa4b2}
  </style></head><body>
    <h1>OS · ${modId.toUpperCase()} · ${title}</h1>
    <p class="meta">${shots.length} slides · ${VW}×${VH} · A/B/C heuristic (diagram share)</p>
    <div class="g">${cells}</div>
  </body></html>`
  const sheetPage = await browser.newPage({ viewport: { width: gridW + 40, height: 1200 } })
  await sheetPage.setContent(html, { waitUntil: 'load' })
  await sheetPage.waitForTimeout(400)
  const sheetOut = path.join(ROOT, 'qa-contact-sheets', `os-${modId}-contact-sheet.jpg`)
  await sheetPage.screenshot({ path: sheetOut, type: 'jpeg', quality: 85, fullPage: true })
  await sheetPage.close()
  await page.close()

  const g = (x) => grades.filter((r) => r.grade === x).length
  console.log(`\n${modId}: rendered ${shots.length}/${expected} · A=${g('A')} B=${g('B')} C=${g('C')} · ${sheetOut}`)
  return { modId, rendered: shots.length, grades }
}

const run = async () => {
  console.log(`OS contact sheets against ${BASE} @ ${VW}x${VH}`)
  const only = (process.env.OS_MODULES || '').split(',').map((s) => s.trim()).filter(Boolean)
  const selected = only.length ? MODULES.filter(([id]) => only.includes(id)) : MODULES
  const browser = await chromium.launch({ headless: true })
  for (const [id, count, title] of selected) {
    await captureModule(browser, id, count, title)
  }
  await browser.close()
  console.log('Done.')
}

run().catch((err) => { console.error(err); process.exit(1) })
