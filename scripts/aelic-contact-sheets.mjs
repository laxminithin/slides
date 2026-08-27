/**
 * AELIC (Analog Electronics 1BEC304) contact sheets + full-slide capture.
 * Renders ALL slides across 5 modules, writes individual JPEGs, module contact
 * sheets, and a metrics JSON for forensic grading.
 *
 * Usage:
 *   node scripts/aelic-contact-sheets.mjs [baseUrl]
 *   AE_VW=1280 AE_VH=720 node scripts/aelic-contact-sheets.mjs
 *   AE_MODULES=module-1 node scripts/aelic-contact-sheets.mjs
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://localhost:5173'
const VW = Number(process.env.AE_VW || 1280)
const VH = Number(process.env.AE_VH || 720)
const SUBJECT = 'analog-electronics-linear-ics'

const MODULES = [
  ['module-1', 'BJT AC Models and Voltage Amplifiers'],
  ['module-2', 'MOSFET Biasing and Amplifier Configurations'],
  ['module-3', 'Negative Feedback, Oscillators, 555'],
  ['module-4', 'Power Amplifiers and Active Filters'],
  ['module-5', 'Op-Amp Applications and DC Regulators'],
]

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

async function captureModule(browser, modId, title) {
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })

  const url = `${BASE}/#/${SUBJECT}/${modId}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.evaluate(({ mod, subject }) => {
    try { window.sessionStorage.setItem(`presentation:${subject}:${mod}:slide`, '0') } catch { /* ignore */ }
  }, { mod: modId, subject: SUBJECT })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.slide-frame', { timeout: 15000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(350)

  const outDir = path.join(ROOT, 'qa-contact-sheets', 'aelic-frames', `${modId}-${VW}x${VH}`)
  await fs.mkdir(outDir, { recursive: true })

  const shots = []
  const grades = []
  let guard = 0
  let slideNo = 0

  while (guard < 70) {
    guard += 1
    slideNo += 1
    await page.waitForTimeout(220)
    const metrics = await page.evaluate(() => {
      const frame = document.querySelector('.slide-frame')
      const body = document.querySelector('.slide-body')
      const titleEl = document.querySelector('.slide-title, h1')
      const title = titleEl?.textContent?.trim() || ''
      if (!frame || !body) return { hasFrame: false, title }
      const br = body.getBoundingClientRect()
      const oy = body.scrollHeight - body.clientHeight
      const ox = body.scrollWidth - body.clientWidth
      let maxB = 0
      let maxR = 0
      let tiny = 0
      const readables = body.querySelectorAll('text, .ae-lead, .ae-points li, .ae-term-chips span, .ae-definition p, .ae-formula-eq, .ae-numerical li, .ae-takeaway span, .ae-exam span, .ae-syllabus-audit strong, .ae-roadmap strong')
      readables.forEach((n) => {
        const r = n.getBoundingClientRect()
        if (r.width === 0 && r.height === 0) return
        maxB = Math.max(maxB, r.bottom - br.bottom)
        maxR = Math.max(maxR, r.right - br.right)
        const fs = Number.parseFloat(getComputedStyle(n).fontSize || '16')
        if (fs > 0 && fs < 13) tiny += 1
      })
      const viz = body.querySelector('.ae-scene, .ae-visual')
      let diagramShare = 0
      if (viz) {
        const vr = viz.getBoundingClientRect()
        diagramShare = Math.min(1, (vr.height * vr.width) / Math.max(1, br.width * br.height))
      }
      const comp = body.querySelector('[data-ae-comp]')?.getAttribute('data-ae-comp') || ''
      return {
        hasFrame: true, title, comp,
        oy, ox, maxB: Math.round(maxB), maxR: Math.round(maxR),
        tiny, diagramShare: Number(diagramShare.toFixed(3)),
      }
    })

    const overflow = !metrics.hasFrame || metrics.oy > 8 || metrics.ox > 8 || metrics.maxB > 8 || metrics.maxR > 8
    const grade = overflow ? 'C' : metrics.tiny > 2 ? 'B' : (metrics.diagramShare >= 0.4 ? 'A' : 'B')
    grades.push({ slide: slideNo, grade, overflow, ...metrics })

    const safe = (metrics.title || `slide-${slideNo}`)
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42)
    const shotPath = path.join(outDir, `${String(slideNo).padStart(2, '0')}-${safe || 'slide'}.jpg`)
    await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 80, animations: 'disabled' })
    const buf = await fs.readFile(shotPath)
    shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
    process.stdout.write(`  ${modId} ${slideNo}\r`)

    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
    await page.waitForTimeout(110)
  }

  const cols = 5
  const cellW = 320
  const cells = shots.map((src, i) => {
    const g = grades[i]?.grade || '?'
    const t = (grades[i]?.title || '').slice(0, 38)
    const c = grades[i]?.comp || ''
    return `<figure data-grade="${g}"><img src="${src}" /><figcaption>${String(i + 1).padStart(2, '0')} · ${g} · ${c}<br>${t}</figcaption></figure>`
  }).join('')
  const gridW = cols * cellW + (cols + 1) * 12
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#1c2430;font-family:ui-sans-serif,system-ui,sans-serif;padding:16px;width:${gridW}px;color:#e8eef7}
    h1{font-size:18px;letter-spacing:.04em;margin:0 0 6px;color:#9ec1ff}
    .meta{color:#9aa4b2;font-size:12px;margin:0 0 14px}
    .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px}
    figure{margin:0;background:#0d1117;border-radius:8px;overflow:hidden;border:2px solid #2a3342}
    figure[data-grade="A"]{border-color:#16a34a}
    figure[data-grade="B"]{border-color:#d97706}
    figure[data-grade="C"]{border-color:#dc2626}
    img{display:block;width:100%;height:auto}
    figcaption{font-size:10px;font-weight:700;padding:5px 6px;color:#9aa4b2;line-height:1.3}
  </style></head><body>
    <h1>AELIC · ${modId.toUpperCase()} · ${title}</h1>
    <p class="meta">${shots.length} slides · ${VW}×${VH} · A/B/C heuristic (overflow + tiny-text + diagram share)</p>
    <div class="g">${cells}</div>
  </body></html>`
  const sheetPage = await browser.newPage({ viewport: { width: gridW + 40, height: 1200 } })
  await sheetPage.setContent(html, { waitUntil: 'load' })
  await sheetPage.waitForTimeout(400)
  const sheetOut = path.join(ROOT, 'qa-contact-sheets', `aelic-${modId}-${VW}x${VH}.jpg`)
  await sheetPage.screenshot({ path: sheetOut, type: 'jpeg', quality: 84, fullPage: true })
  await sheetPage.close()
  await page.close()

  const g = (x) => grades.filter((r) => r.grade === x).length
  console.log(`\n${modId}: ${shots.length} slides · A=${g('A')} B=${g('B')} C=${g('C')} · ${sheetOut}`)
  return { modId, rendered: shots.length, grades }
}

const run = async () => {
  console.log(`AELIC contact sheets against ${BASE} @ ${VW}x${VH}`)
  const only = (process.env.AE_MODULES || '').split(',').map((s) => s.trim()).filter(Boolean)
  const selected = only.length ? MODULES.filter(([id]) => only.includes(id)) : MODULES
  const browser = await chromium.launch({ headless: true })
  const all = []
  for (const [id, title] of selected) {
    all.push(await captureModule(browser, id, title))
  }
  await browser.close()
  const metricsOut = path.join(ROOT, 'qa-contact-sheets', `aelic-metrics-${VW}x${VH}.json`)
  await fs.writeFile(metricsOut, JSON.stringify(all, null, 2))
  const total = all.reduce((n, m) => n + m.rendered, 0)
  const gAll = (x) => all.reduce((n, m) => n + m.grades.filter((r) => r.grade === x).length, 0)
  console.log(`\nTOTAL ${total} slides · A=${gAll('A')} B=${gAll('B')} C=${gAll('C')} · ${metricsOut}`)
}

run().catch((err) => { console.error(err); process.exit(1) })
