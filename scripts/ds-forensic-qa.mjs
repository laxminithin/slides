/**
 * Data Structures (1BCS305) — forensic visual QA + contact sheets.
 * Renders EVERY slide across 5 modules, measures overflow / collision / diagram
 * share / tiny text / SVG clipping, grades A+/A/B/C, and writes per-module
 * contact sheets plus a machine-readable JSON report.
 *
 * Usage:
 *   node scripts/ds-forensic-qa.mjs [baseUrl]
 *   DS_VW=1280 DS_VH=720 node scripts/ds-forensic-qa.mjs http://localhost:5175
 *   DS_MODULES="module-1,module-4" node scripts/ds-forensic-qa.mjs
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || process.env.DS_BASE || 'http://localhost:5175'
const VW = Number(process.env.DS_VW || 1920)
const VH = Number(process.env.DS_VH || 1080)
const TAG = `${VW}x${VH}`

const MODULES = [
  ['module-1', 50, 'Memory & Representation'],
  ['module-2', 50, 'Controlled Order'],
  ['module-3', 50, 'Pointer Movement'],
  ['module-4', 58, 'Hierarchy & Path'],
  ['module-5', 50, 'Networks & Priority'],
]

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

const METRICS = () => {
  const frame = document.querySelector('.slide-frame')
  const body = document.querySelector('.slide-body')
  const title = document.querySelector('.slide-title, h1')?.textContent?.trim() || ''
  if (!frame || !body) return { hasFrame: false, title }
  const fr = frame.getBoundingClientRect()
  const stage = document.querySelector('.ds-stage')
  const comp = stage?.getAttribute('data-ds-comp') || ''

  // 1. scroll overflow
  const oy = body.scrollHeight - body.clientHeight
  const ox = body.scrollWidth - body.clientWidth

  // 2. clipping: any meaningful element extending past the frame bounds
  let clipB = 0
  let clipR = 0
  let clipT = 0
  let clipL = 0
  const CONTENT = '.ds-copy, .ds-visual, .ds-visual-b, .ds-footer-band, .ds-lead, .ds-points li, .ds-term-chips span, .ds-definition, .ds-callout, .ds-algo-steps li, .ds-code-panel, .ds-dryrun, text, .ds-tree-node, .ds-ll-node, .ds-stack-cell, .ds-queue-cell'
  body.querySelectorAll(CONTENT).forEach((n) => {
    const r = n.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return
    clipB = Math.max(clipB, r.bottom - fr.bottom)
    clipR = Math.max(clipR, r.right - fr.right)
    clipT = Math.max(clipT, fr.top - r.top)
    clipL = Math.max(clipL, fr.left - r.left)
  })

  // 3. footer-band collision: does copy/visual content overlap the footer band?
  const footer = body.querySelector('.ds-footer-band')
  let footerHit = 0
  if (footer) {
    const fb = footer.getBoundingClientRect()
    body.querySelectorAll('.ds-copy > *, .ds-visual, .ds-visual .ds-svg, .ds-visual svg').forEach((n) => {
      const r = n.getBoundingClientRect()
      if (r.width === 0) return
      const overlapY = Math.min(r.bottom, fb.bottom) - Math.max(r.top, fb.top)
      const overlapX = Math.min(r.right, fb.right) - Math.max(r.left, fb.left)
      if (overlapY > 6 && overlapX > 6) footerHit = Math.max(footerHit, Math.round(overlapY))
    })
  }

  // 4. tiny text
  let tiny = 0
  let tiniest = 99
  body.querySelectorAll('text, .ds-points li, .ds-lead, .ds-term-chips span, .ds-algo-steps li, .ds-callout p, .ds-definition p, .ds-checkpoint-sheet span, .ds-syllabus-audit strong').forEach((n) => {
    if (!n.textContent?.trim()) return
    const fs = Number.parseFloat(getComputedStyle(n).fontSize || '16')
    if (fs > 0) { tiniest = Math.min(tiniest, fs); if (fs < 11) tiny += 1 }
  })

  // 5. diagram share (visual-forward slides)
  const viz = body.querySelector('.ds-visual')
  const vr = viz?.getBoundingClientRect()
  const diagramShare = vr ? Math.min(1, (vr.width * vr.height) / Math.max(1, fr.width * fr.height)) : 0

  // primary svg fill (hero size): largest svg area / stage
  let svgShare = 0
  body.querySelectorAll('.ds-visual svg, .ds-scene svg, svg.ds-svg').forEach((svg) => {
    const sr = svg.getBoundingClientRect()
    svgShare = Math.max(svgShare, (sr.width * sr.height) / Math.max(1, fr.width * fr.height))
  })

  // real screen-space clip: painted diagram elements cut off by the nearest
  // clipping ancestor (overflow:hidden/clip). getBBox() is group-local under
  // transforms, so we measure rendered rects, not viewBox math.
  let svgClip = 0
  const clipAncestor = (el) => {
    let p = el.parentElement
    while (p && p !== body) {
      const cs = getComputedStyle(p)
      if (/hidden|clip/.test(cs.overflow) || /hidden|clip/.test(cs.overflowX) || /hidden|clip/.test(cs.overflowY)) return p
      p = p.parentElement
    }
    return null
  }
  body.querySelectorAll('.ds-visual text, .ds-scene text, .ds-visual [class*="node"], .ds-visual [class*="cell"], .ds-visual rect, .ds-visual circle').forEach((n) => {
    const t = (n.textContent || '').trim()
    const isText = n.tagName.toLowerCase() === 'text'
    if (isText && !t) return
    const r = n.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) return
    const anc = clipAncestor(n)
    if (!anc) return
    const ar = anc.getBoundingClientRect()
    const pad = 1.5
    const over = Math.max(ar.top - r.top, r.bottom - ar.bottom, ar.left - r.left, r.right - ar.right)
    if (over > pad) svgClip += 1
  })

  return {
    hasFrame: true, title, comp,
    oy, ox,
    clipB: Math.round(clipB), clipR: Math.round(clipR), clipT: Math.round(clipT), clipL: Math.round(clipL),
    footerHit, tiny, tiniest: Math.round(tiniest * 10) / 10,
    diagramShare: Number(diagramShare.toFixed(3)),
    svgShare: Number(svgShare.toFixed(3)),
    svgClip,
    hasViz: !!viz,
  }
}

function grade(m) {
  if (!m.hasFrame) return 'C'
  const OV = 8
  // hard fails → C
  if (m.oy > OV || m.ox > OV) return 'C'
  if (m.clipB > OV || m.clipR > OV || m.clipT > OV || m.clipL > OV) return 'C'
  if (m.footerHit > 6) return 'C'
  if (m.svgClip > 0) return 'C'
  if (m.tiny > 0) return 'C'
  // quality tiers
  const heroFill = Math.max(m.svgShare, m.diagramShare)
  if (m.hasViz) {
    if (heroFill >= 0.5 && m.tiniest >= 13) return 'A+'
    if (heroFill >= 0.36) return 'A'
    return 'B'
  }
  // text-only slides (framing): fine but ordinary
  return m.tiniest >= 13 ? 'A' : 'B'
}

async function captureModule(browser, modId, expected, title) {
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const url = `${BASE}/#/data-structures/${modId}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.evaluate((mod) => {
    try { window.sessionStorage.setItem(`presentation:data-structures:${mod}:slide`, '0') } catch { /* ignore */ }
  }, modId)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForSelector('.slide-frame', { timeout: 15000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(400)

  const framesDir = path.join(ROOT, 'qa-contact-sheets', 'ds-frames', TAG, modId)
  await fs.mkdir(framesDir, { recursive: true })

  const shots = []
  const rows = []
  let guard = 0
  let slideNo = 0
  while (guard < expected + 10) {
    guard += 1
    slideNo += 1
    await page.waitForTimeout(220)
    const m = await page.evaluate(METRICS)
    const g = grade(m)
    rows.push({ slide: slideNo, grade: g, ...m })

    const safe = (m.title || `slide-${slideNo}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
    const shotPath = path.join(framesDir, `${String(slideNo).padStart(2, '0')}-${g.replace('+', 'p')}-${safe || 'slide'}.jpg`)
    let shotOK = true
    try {
      await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 80, animations: 'disabled', timeout: 8000 })
    } catch {
      // flaky stability wait — retry once without the disable/stability gate
      shotOK = await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 80, timeout: 8000 }).then(() => true).catch(() => false)
    }
    if (VW >= 1920 && shotOK) {
      const buf = await fs.readFile(shotPath)
      shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
    }
    process.stdout.write(`  ${TAG} ${modId} ${slideNo}/${expected} ${g}   \r`)

    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
    await page.waitForTimeout(120)
  }

  // contact sheet only for the reference resolution (has base64 images)
  if (shots.length) {
    const cols = 5
    const cellW = 340
    const cells = shots.map((src, i) => {
      const r = rows[i]
      const flags = []
      if (r.oy > 8 || r.ox > 8) flags.push('SCROLL')
      if (r.clipB > 8 || r.clipR > 8 || r.clipT > 8 || r.clipL > 8) flags.push('CLIP')
      if (r.footerHit > 6) flags.push('FOOThit')
      if (r.svgClip > 0) flags.push(`svgClip${r.svgClip}`)
      if (r.tiny > 0) flags.push(`tiny${r.tiny}`)
      const t = (r.title || '').slice(0, 34)
      return `<figure data-grade="${r.grade}"><img src="${src}"/><figcaption>${String(i + 1).padStart(2, '0')} · <b>${r.grade}</b> · ${t}<br><i>fill ${Math.round(Math.max(r.svgShare, r.diagramShare) * 100)}% ${flags.join(' ')}</i></figcaption></figure>`
    }).join('')
    const gridW = cols * cellW + (cols + 1) * 12
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#0f141b;font-family:ui-sans-serif,system-ui,sans-serif;padding:16px;width:${gridW}px;color:#e8eef7}
      h1{font-size:17px;margin:0 0 4px;color:#8fd0ff}
      .meta{color:#93a0b2;font-size:12px;margin:0 0 12px}
      .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px}
      figure{margin:0;background:#0a0e14;border-radius:8px;overflow:hidden;border:2px solid #263042}
      figure[data-grade="A+"]{border-color:#22d3a6}
      figure[data-grade="A"]{border-color:#16a34a}
      figure[data-grade="B"]{border-color:#d97706}
      figure[data-grade="C"]{border-color:#dc2626}
      img{display:block;width:100%;height:auto}
      figcaption{font-size:10.5px;padding:5px 7px;color:#9aa8ba;line-height:1.35}
      figcaption i{color:#6f7d90;font-style:normal}
    </style></head><body>
      <h1>DS · ${modId.toUpperCase()} · ${title}</h1>
      <p class="meta">${shots.length} slides · ${TAG} · forensic grade (overflow/clip/footer/svgClip/tiny → C)</p>
      <div class="g">${cells}</div>
    </body></html>`
    const sp = await browser.newPage({ viewport: { width: gridW + 40, height: 1400 } })
    await sp.setContent(html, { waitUntil: 'load' })
    await sp.waitForTimeout(400)
    await sp.screenshot({ path: path.join(ROOT, 'qa-contact-sheets', `ds-${modId}-contact-sheet.jpg`), type: 'jpeg', quality: 84, fullPage: true })
    await sp.close()
  }

  await page.close()
  const c = (x) => rows.filter((r) => r.grade === x).length
  console.log(`\n${modId} @ ${TAG}: ${rows.length}/${expected} · A+=${c('A+')} A=${c('A')} B=${c('B')} C=${c('C')}`)
  return { modId, rendered: rows.length, rows }
}

const run = async () => {
  console.log(`DS forensic QA @ ${TAG} against ${BASE}`)
  const only = (process.env.DS_MODULES || '').split(',').map((s) => s.trim()).filter(Boolean)
  const sel = only.length ? MODULES.filter(([id]) => only.includes(id)) : MODULES
  const browser = await chromium.launch({ headless: true })
  const all = []
  for (const [id, count, title] of sel) all.push(await captureModule(browser, id, count, title))
  await browser.close()

  const flat = all.flatMap((m) => m.rows.map((r) => ({ module: m.modId, ...r })))
  const tally = { 'A+': 0, A: 0, B: 0, C: 0 }
  flat.forEach((r) => { tally[r.grade] += 1 })
  const cFails = flat.filter((r) => r.grade === 'C')
  const report = { tag: TAG, total: flat.length, tally, cFails, rows: flat }
  await fs.mkdir(path.join(ROOT, 'qa-contact-sheets'), { recursive: true })
  await fs.writeFile(path.join(ROOT, 'qa-contact-sheets', `ds-report-${TAG}.json`), JSON.stringify(report, null, 2))

  console.log(`\n===== DS TOTAL @ ${TAG} =====`)
  console.log(`slides ${flat.length} · A+=${tally['A+']} A=${tally.A} B=${tally.B} C=${tally.C}`)
  if (cFails.length) {
    console.log(`\nC-grade slides (${cFails.length}):`)
    cFails.forEach((r) => console.log(`  ${r.module} #${r.slide} "${(r.title || '').slice(0, 30)}" :: oy${r.oy} ox${r.ox} clipB${r.clipB} clipR${r.clipR} foot${r.footerHit} svgClip${r.svgClip} tiny${r.tiny}(${r.tiniest}px) comp=${r.comp}`))
  }
}
run().catch((e) => { console.error(e); process.exit(1) })
