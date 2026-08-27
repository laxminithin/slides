/**
 * Parallel Computing Module 3 — full-resolution render of every slide.
 *
 * Usage:
 *   node scripts/pc-m3-render.mjs [baseUrl]
 *
 * Writes:
 *   qa-contact-sheets/pc-m3-frames/1920x1080/01-….png  (all 90)
 *   qa-contact-sheets/pc-module-3-contact-sheet.jpg
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://localhost:5173'
const SUBJECT = 'parallel-computing'
const MOD = 'module-3'
const EXPECTED = 90

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

async function run() {
  console.log(`PC M3 render against ${BASE}`)
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const url = `${BASE}/#/${SUBJECT}/${MOD}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.evaluate(({ subject, mod }) => {
    try { window.sessionStorage.setItem(`presentation:${subject}:${mod}:slide`, '0') } catch { /* ignore */ }
  }, { subject: SUBJECT, mod: MOD })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.slide-frame', { timeout: 20000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(400)

  const outDir = path.join(ROOT, 'qa-contact-sheets', 'pc-m3-frames', '1920x1080')
  await fs.mkdir(outDir, { recursive: true })
  const shots = []
  const titles = []
  let slideNo = 0
  let guard = 0

  while (guard < EXPECTED + 8) {
    guard += 1
    slideNo += 1
    await page.waitForTimeout(220)
    const title = await page.evaluate(() => {
      return document.querySelector('.mpi-head h2, .mpi-divider-copy h2, .slide-title')?.textContent?.trim() || ''
    })
    titles.push(title)
    const safe = (title || `slide-${slideNo}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42)
    const shotPath = path.join(outDir, `${String(slideNo).padStart(2, '0')}-${safe || 'slide'}.png`)
    await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'png', animations: 'disabled' })
    const buf = await fs.readFile(shotPath)
    shots.push(`data:image/png;base64,${buf.toString('base64')}`)
    console.log(`  ${String(slideNo).padStart(2, '0')}  ${title}`)
    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
  }

  const cols = 6
  const cellW = 280
  const cells = shots.map((src, i) => {
    const t = (titles[i] || '').slice(0, 32)
    return `<figure><img src="${src}" /><figcaption>${String(i + 1).padStart(2, '0')} · ${t}</figcaption></figure>`
  }).join('')
  const gridW = cols * cellW + (cols + 1) * 10
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#161b22;font-family:ui-sans-serif,system-ui,sans-serif;padding:14px;width:${gridW}px;color:#e8eef7}
    h1{font-size:18px;margin:0 0 6px;color:#9ec1ff}
    .meta{color:#9aa4b2;font-size:12px;margin:0 0 12px}
    .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:10px}
    figure{margin:0;background:#0d1117;border-radius:6px;overflow:hidden;border:1px solid #2a3342}
    img{display:block;width:100%;height:auto}
    figcaption{font-size:10px;font-weight:700;padding:4px 6px;color:#9aa4b2}
  </style></head><body>
    <h1>Parallel Computing · Module 3 · MPI · ${shots.length} slides</h1>
    <p class="meta">1920×1080 full-resolution contact sheet</p>
    <div class="g">${cells}</div>
  </body></html>`
  const sheetPage = await browser.newPage({ viewport: { width: gridW + 40, height: 1400 } })
  await sheetPage.setContent(html, { waitUntil: 'load' })
  await sheetPage.waitForTimeout(400)
  const sheetOut = path.join(ROOT, 'qa-contact-sheets', 'pc-module-3-contact-sheet.jpg')
  await sheetPage.screenshot({ path: sheetOut, type: 'jpeg', quality: 88, fullPage: true })
  await sheetPage.close()
  await page.close()
  await browser.close()
  console.log(`rendered ${shots.length} / ${EXPECTED}`)
  console.log(`contact sheet → ${sheetOut}`)
  if (shots.length !== EXPECTED) process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
