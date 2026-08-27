/**
 * Chapter 1 contact sheet — captures every Module 1 slide in its settled
 * final state and composes them into a single review grid.
 * Usage: node scripts/ib-m1-contact-sheet.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://localhost:5173'
const SLIDES = 21
const VW = 1600
const VH = 900

const HIDE = `.engine-debug{display:none!important}
.teaching-controls,.living-controls,[class*="teaching-control"],[class*="deck-controls"]{opacity:0!important}`

const run = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const shots = []
  for (let n = 1; n <= SLIDES; n++) {
    await page.goto(`${BASE}/#/international-business/module-1?slide=${n}&skipIntro=1`, { waitUntil: 'networkidle' })
    try {
      const begin = page.locator('.ib-intro-begin, .ib-chapter-intro button').first()
      if (await begin.isVisible({ timeout: 600 })) {
        await begin.click({ timeout: 500 })
      }
    } catch { /* no intro */ }
    await page.addStyleTag({ content: HIDE }).catch(() => {})
    await page.waitForTimeout(900)
    const buf = await page.screenshot({ type: 'jpeg', quality: 84 })
    shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
    process.stdout.write(`captured ${n}/${SLIDES}\r`)
  }

  const cells = shots.map((src, i) => `
    <figure>
      <img src="${src}" />
      <figcaption>${String(i + 1).padStart(2, '0')}</figcaption>
    </figure>`).join('')
  const gridW = 4 * 400 + 5 * 16
  const grid = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;background:#20242c;font-family:system-ui,sans-serif;padding:20px;width:${gridW}px}
    h1{color:#e8c884;font-size:18px;letter-spacing:.06em;margin:4px 0 14px}
    .meta{color:#9aa4b2;font-size:12px;margin:0 0 18px}
    .g{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
    figure{margin:0;background:#0d1117;border-radius:6px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.4)}
    img{display:block;width:100%;height:auto}
    figcaption{color:#9aa4b2;font-size:12px;font-weight:700;padding:6px 10px}
  </style></head><body>
    <h1>IB MODULE 1 — VISUAL REFERENCE · CONTACT SHEET</h1>
    <p class="meta">${SLIDES} slides · settled final frames · ${VW}×${VH}</p>
    <div class="g">${cells}</div>
  </body></html>`
  const grpage = await browser.newPage({ viewport: { width: gridW + 40, height: 1200 } })
  await grpage.setContent(grid, { waitUntil: 'load' })
  await grpage.waitForTimeout(300)
  const outDir = path.join(ROOT, 'qa-contact-sheets')
  await fs.mkdir(outDir, { recursive: true })
  const out = path.join(outDir, 'ib-m1-contact-sheet.png')
  await grpage.screenshot({ path: out, fullPage: true })
  await browser.close()
  console.log(`\nContact sheet → ${out}`)
}

run().catch((e) => { console.error(e); process.exit(1) })
