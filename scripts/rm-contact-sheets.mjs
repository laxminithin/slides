/**
 * Research Methodology & IPR (BRMK557) — full-deck capture + contact sheets.
 * Renders EVERY slide of every module in its settled final state, saves each
 * frame as an individual JPEG, and composes a per-module review grid.
 *
 * Usage:
 *   node scripts/rm-contact-sheets.mjs [baseUrl] [moduleNum] [--w=1600 --h=900]
 *   (no moduleNum → all 5 modules)
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const args = process.argv.slice(2)
const BASE = args.find((a) => a.startsWith('http')) || 'http://localhost:5173'
const only = args.find((a) => /^[1-5]$/.test(a))
const wArg = args.find((a) => a.startsWith('--w='))
const hArg = args.find((a) => a.startsWith('--h='))
const VW = wArg ? Number(wArg.slice(4)) : 1600
const VH = hArg ? Number(hArg.slice(4)) : 900

const MODULES = [
  { n: 1, count: 35 },
  { n: 2, count: 41 },
  { n: 3, count: 60 },
  { n: 4, count: 52 },
  { n: 5, count: 50 },
].filter((m) => !only || String(m.n) === only)

const HIDE = `.engine-debug{display:none!important}
.teaching-controls,.living-controls,[class*="teaching-control"],[class*="deck-controls"],[class*="engine-debug"]{opacity:0!important;pointer-events:none!important}`

const run = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const outDir = path.join(ROOT, 'qa-contact-sheets')
  await fs.mkdir(outDir, { recursive: true })

  for (const mod of MODULES) {
    const framesDir = path.join(outDir, `rm-m${mod.n}-frames`)
    await fs.mkdir(framesDir, { recursive: true })
    const shots = []
    for (let s = 1; s <= mod.count; s++) {
      await page.goto(`${BASE}/#/research-methodology-ipr/module-${mod.n}?slide=${s}&skipIntro=1`, {
        waitUntil: 'networkidle',
      })
      await page.addStyleTag({ content: HIDE }).catch(() => {})
      await page.waitForTimeout(850)
      const buf = await page.screenshot({ type: 'jpeg', quality: 82 })
      await fs.writeFile(path.join(framesDir, `slide-${String(s).padStart(2, '0')}.jpg`), buf)
      shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
      process.stdout.write(`M${mod.n}: captured ${s}/${mod.count}   \r`)
    }

    const COLS = 5
    const CELL = 360
    const cells = shots
      .map(
        (src, i) => `
      <figure>
        <img src="${src}" />
        <figcaption>${String(i + 1).padStart(2, '0')}</figcaption>
      </figure>`,
      )
      .join('')
    const gridW = COLS * CELL + (COLS + 1) * 14
    const grid = `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#20242c;font-family:system-ui,sans-serif;padding:18px;width:${gridW}px}
      h1{color:#e8c884;font-size:18px;letter-spacing:.06em;margin:4px 0 12px}
      .meta{color:#9aa4b2;font-size:12px;margin:0 0 16px}
      .g{display:grid;grid-template-columns:repeat(${COLS},1fr);gap:14px}
      figure{margin:0;background:#0d1117;border-radius:6px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,.4);position:relative}
      img{display:block;width:100%;height:auto}
      figcaption{position:absolute;top:6px;left:6px;color:#fff;background:rgba(0,0,0,.6);font-size:13px;font-weight:800;padding:2px 8px;border-radius:4px}
    </style></head><body>
      <h1>RM/IPR · MODULE ${mod.n} — CONTACT SHEET (${mod.count} slides · ${VW}×${VH})</h1>
      <div class="g">${cells}</div>
    </body></html>`
    const grpage = await browser.newPage({ viewport: { width: gridW + 36, height: 1200 } })
    await grpage.setContent(grid, { waitUntil: 'load' })
    await grpage.waitForTimeout(250)
    const out = path.join(outDir, `rm-m${mod.n}-contact-sheet.png`)
    await grpage.screenshot({ path: out, fullPage: true })
    await grpage.close()
    console.log(`\nModule ${mod.n} → ${out}  (frames in rm-m${mod.n}-frames/)`)
  }
  await browser.close()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
