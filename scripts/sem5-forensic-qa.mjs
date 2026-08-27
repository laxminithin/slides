/**
 * 5th-Semester interactive subjects — forensic visual QA + contact sheets.
 * Renders EVERY slide across all 5 modules of a subject, measures overflow /
 * clipping / footer collision / diagram share / tiny text / SVG clipping,
 * grades A+/A/B/C, writes per-module contact sheets + machine-readable JSON.
 *
 * Auto-counts slides (walks Next until disabled) — no hardcoded counts.
 *
 * Usage:
 *   node scripts/sem5-forensic-qa.mjs <subjectKey> [baseUrl]
 *   SEM5_VW=1280 SEM5_VH=720 node scripts/sem5-forensic-qa.mjs unix http://localhost:5178
 *   SEM5_MODULES="module-1,module-4" node scripts/sem5-forensic-qa.mjs unix
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const SUBJECTS = {
  se: { id: 'software-engineering-project-management', prefix: 'se', code: 'BCS501', name: 'Software Engineering & PM' },
  cn502: { id: 'computer-networks-bcs502', prefix: 'cn502', code: 'BCS502', name: 'Computer Networks' },
  cg: { id: 'computer-graphics-visualization', prefix: 'cg', code: 'BCS504', name: 'Computer Graphics' },
  unix: { id: 'unix-system-programming', prefix: 'unix', code: 'BCS515C', name: 'Unix System Programming' },
  dist: { id: 'distributed-systems', prefix: 'dist', code: 'BCS515D', name: 'Distributed Systems' },
}

const KEY = process.argv[2]
const SUB = SUBJECTS[KEY]
if (!SUB) { console.error(`Unknown subject "${KEY}". Use one of: ${Object.keys(SUBJECTS).join(', ')}`); process.exit(1) }
const BASE = process.argv[3] || process.env.SEM5_BASE || 'http://localhost:5178'
const VW = Number(process.env.SEM5_VW || 1920)
const VH = Number(process.env.SEM5_VH || 1080)
const TAG = `${VW}x${VH}`
const P = SUB.prefix
const GUARD = Number(process.env.SEM5_GUARD || 400)

const MODULES = ['module-1', 'module-2', 'module-3', 'module-4', 'module-5']

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

const METRICS = (P) => {
  const frame = document.querySelector('.slide-frame')
  const body = document.querySelector('.slide-body')
  const title = document.querySelector('.slide-title, h1')?.textContent?.trim() || ''
  if (!frame || !body) return { hasFrame: false, title }
  const fr = frame.getBoundingClientRect()
  const stage = document.querySelector(`.${P}-stage`)
  const comp = stage?.getAttribute(`data-${P}-comp`) || ''

  const oy = body.scrollHeight - body.clientHeight
  const ox = body.scrollWidth - body.clientWidth

  // Elements driven along a path by SMIL <animateMotion> (message dots + their
  // labels) travel by design and paint via the SVG's overflow:visible; their
  // bounding box sits outside the nominal scene box at path phases/endpoints
  // but is never a visible cut — the screenshots confirm. Exclude from every
  // clip metric; grade only static structure.
  const inMotion = (n) => {
    let p = n
    while (p && p.tagName && p.tagName.toLowerCase() !== 'svg') {
      if (p.querySelector && p.querySelector(':scope > animateMotion, :scope > animate[attributeName="transform"]')) return true
      p = p.parentElement
    }
    return false
  }

  let clipB = 0, clipR = 0, clipT = 0, clipL = 0
  const CONTENT = `.${P}-copy, .${P}-visual, .${P}-visual-b, .${P}-footer-band, .${P}-lead, .${P}-points li, .${P}-term-chips span, .${P}-definition, .${P}-callout, .${P}-algo-steps li, .${P}-code-panel, .${P}-dryrun, text`
  body.querySelectorAll(CONTENT).forEach((n) => {
    if (inMotion(n)) return
    const r = n.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) return
    clipB = Math.max(clipB, r.bottom - fr.bottom)
    clipR = Math.max(clipR, r.right - fr.right)
    clipT = Math.max(clipT, fr.top - r.top)
    clipL = Math.max(clipL, fr.left - r.left)
  })

  const footer = body.querySelector(`.${P}-footer-band`)
  let footerHit = 0
  if (footer) {
    const fb = footer.getBoundingClientRect()
    body.querySelectorAll(`.${P}-copy > *, .${P}-visual, .${P}-visual svg`).forEach((n) => {
      const r = n.getBoundingClientRect()
      if (r.width === 0) return
      const overlapY = Math.min(r.bottom, fb.bottom) - Math.max(r.top, fb.top)
      const overlapX = Math.min(r.right, fb.right) - Math.max(r.left, fb.left)
      if (overlapY > 6 && overlapX > 6) footerHit = Math.max(footerHit, Math.round(overlapY))
    })
  }

  let tiny = 0, tiniest = 99
  body.querySelectorAll(`text, .${P}-points li, .${P}-lead, .${P}-term-chips span, .${P}-algo-steps li, .${P}-callout p, .${P}-definition p`).forEach((n) => {
    if (!n.textContent?.trim()) return
    const fs = Number.parseFloat(getComputedStyle(n).fontSize || '16')
    if (fs > 0) { tiniest = Math.min(tiniest, fs); if (fs < 11) tiny += 1 }
  })

  const viz = body.querySelector(`.${P}-visual`)
  const vr = viz?.getBoundingClientRect()
  const diagramShare = vr ? Math.min(1, (vr.width * vr.height) / Math.max(1, fr.width * fr.height)) : 0

  let svgShare = 0
  body.querySelectorAll(`.${P}-visual svg, .${P}-scene svg, svg.${P}-svg`).forEach((svg) => {
    const sr = svg.getBoundingClientRect()
    svgShare = Math.max(svgShare, (sr.width * sr.height) / Math.max(1, fr.width * fr.height))
  })

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
  body.querySelectorAll(`.${P}-visual text, .${P}-scene text, .${P}-visual [class*="node"], .${P}-visual rect, .${P}-visual circle`).forEach((n) => {
    const t = (n.textContent || '').trim()
    const isText = n.tagName.toLowerCase() === 'text'
    if (isText && !t) return
    if (inMotion(n)) return
    const r = n.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) return
    const anc = clipAncestor(n)
    if (!anc) return
    const ar = anc.getBoundingClientRect()
    const over = Math.max(ar.top - r.top, r.bottom - ar.bottom, ar.left - r.left, r.right - ar.right)
    if (over > 4) svgClip += 1
  })

  return {
    hasFrame: true, title, comp, oy, ox,
    clipB: Math.round(clipB), clipR: Math.round(clipR), clipT: Math.round(clipT), clipL: Math.round(clipL),
    footerHit, tiny, tiniest: Math.round(tiniest * 10) / 10,
    diagramShare: Number(diagramShare.toFixed(3)),
    svgShare: Number(svgShare.toFixed(3)),
    svgClip, hasViz: !!viz,
  }
}

function grade(m) {
  if (!m.hasFrame) return 'C'
  const OV = 8
  if (m.oy > OV || m.ox > OV) return 'C'
  if (m.clipB > OV || m.clipR > OV || m.clipT > OV || m.clipL > OV) return 'C'
  if (m.footerHit > 6) return 'C'
  if (m.svgClip > 0) return 'C'
  if (m.tiny > 0) return 'C'
  const heroFill = Math.max(m.svgShare, m.diagramShare)
  if (m.hasViz) {
    if (heroFill >= 0.5 && m.tiniest >= 13) return 'A+'
    if (heroFill >= 0.36) return 'A'
    return 'B'
  }
  return m.tiniest >= 13 ? 'A' : 'B'
}

async function captureModule(browser, modId) {
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const url = `${BASE}/#/${SUB.id}/${modId}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.evaluate((arg) => {
    try { window.sessionStorage.setItem(`presentation:${arg.id}:${arg.mod}:slide`, '0') } catch { /* ignore */ }
  }, { id: SUB.id, mod: modId })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForSelector('.slide-frame', { timeout: 15000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(400)

  const framesDir = path.join(ROOT, 'qa-contact-sheets', `${P}-frames`, TAG, modId)
  await fs.mkdir(framesDir, { recursive: true })

  const shots = []
  const rows = []
  let guard = 0, slideNo = 0
  while (guard < GUARD) {
    guard += 1
    slideNo += 1
    // Let entrance animations settle so svgClip measures the same completed
    // frame the screenshot captures — not a transient in-flight transform.
    await page.waitForTimeout(700)
    const m = await page.evaluate(METRICS, P)
    const g = grade(m)
    rows.push({ slide: slideNo, grade: g, ...m })

    const safe = (m.title || `slide-${slideNo}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
    const shotPath = path.join(framesDir, `${String(slideNo).padStart(3, '0')}-${g.replace('+', 'p')}-${safe || 'slide'}.jpg`)
    let shotOK = true
    try {
      await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 78, animations: 'disabled', timeout: 8000 })
    } catch {
      shotOK = await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 78, timeout: 8000 }).then(() => true).catch(() => false)
    }
    if (VW >= 1920 && shotOK) {
      const buf = await fs.readFile(shotPath)
      shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
    }
    process.stdout.write(`  ${TAG} ${P} ${modId} ${slideNo} ${g}   \r`)

    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
    await page.waitForTimeout(110)
  }

  if (shots.length) {
    const cols = 6
    const cellW = 300
    const cells = shots.map((src, i) => {
      const r = rows[i]
      const flags = []
      if (r.oy > 8 || r.ox > 8) flags.push('SCROLL')
      if (r.clipB > 8 || r.clipR > 8 || r.clipT > 8 || r.clipL > 8) flags.push('CLIP')
      if (r.footerHit > 6) flags.push('FOOThit')
      if (r.svgClip > 0) flags.push(`svgClip${r.svgClip}`)
      if (r.tiny > 0) flags.push(`tiny${r.tiny}`)
      const t = (r.title || '').slice(0, 34)
      return `<figure data-grade="${r.grade}"><img src="${src}"/><figcaption>${String(i + 1).padStart(3, '0')} · <b>${r.grade}</b> · ${t}<br><i>fill ${Math.round(Math.max(r.svgShare, r.diagramShare) * 100)}% ${flags.join(' ')}</i></figcaption></figure>`
    }).join('')
    const gridW = cols * cellW + (cols + 1) * 10
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#0f141b;font-family:ui-sans-serif,system-ui,sans-serif;padding:14px;width:${gridW}px;color:#e8eef7}
      h1{font-size:16px;margin:0 0 4px;color:#8fd0ff}
      .meta{color:#93a0b2;font-size:12px;margin:0 0 10px}
      .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:10px}
      figure{margin:0;background:#0a0e14;border-radius:7px;overflow:hidden;border:2px solid #263042}
      figure[data-grade="A+"]{border-color:#22d3a6}
      figure[data-grade="A"]{border-color:#16a34a}
      figure[data-grade="B"]{border-color:#d97706}
      figure[data-grade="C"]{border-color:#dc2626}
      img{display:block;width:100%;height:auto}
      figcaption{font-size:10px;padding:4px 6px;color:#9aa8ba;line-height:1.3}
      figcaption i{color:#6f7d90;font-style:normal}
    </style></head><body>
      <h1>${SUB.code} ${SUB.name} · ${modId.toUpperCase()}</h1>
      <p class="meta">${shots.length} slides · ${TAG} · forensic grade (overflow/clip/footer/svgClip/tiny → C)</p>
      <div class="g">${cells}</div>
    </body></html>`
    const sp = await browser.newPage({ viewport: { width: gridW + 40, height: 1400 } })
    await sp.setContent(html, { waitUntil: 'load' })
    await sp.waitForTimeout(400)
    await sp.screenshot({ path: path.join(ROOT, 'qa-contact-sheets', `${P}-${modId}-contact-sheet.jpg`), type: 'jpeg', quality: 82, fullPage: true })
    await sp.close()
  }

  await page.close()
  const c = (x) => rows.filter((r) => r.grade === x).length
  console.log(`\n${P} ${modId} @ ${TAG}: ${rows.length} slides · A+=${c('A+')} A=${c('A')} B=${c('B')} C=${c('C')}`)
  return { modId, rendered: rows.length, rows }
}

const run = async () => {
  console.log(`SEM5 forensic QA · ${SUB.code} ${SUB.name} @ ${TAG} against ${BASE}`)
  const only = (process.env.SEM5_MODULES || '').split(',').map((s) => s.trim()).filter(Boolean)
  const sel = only.length ? MODULES.filter((id) => only.includes(id)) : MODULES
  const browser = await chromium.launch({ headless: true })
  const all = []
  for (const id of sel) all.push(await captureModule(browser, id))
  await browser.close()

  const flat = all.flatMap((m) => m.rows.map((r) => ({ module: m.modId, ...r })))
  const tally = { 'A+': 0, A: 0, B: 0, C: 0 }
  flat.forEach((r) => { tally[r.grade] += 1 })
  const cFails = flat.filter((r) => r.grade === 'C')
  const perModule = all.map((m) => ({ module: m.modId, slides: m.rendered }))
  const report = { subject: SUB.code, name: SUB.name, tag: TAG, total: flat.length, perModule, tally, cFails, rows: flat }
  await fs.mkdir(path.join(ROOT, 'qa-contact-sheets'), { recursive: true })
  await fs.writeFile(path.join(ROOT, 'qa-contact-sheets', `${P}-report-${TAG}.json`), JSON.stringify(report, null, 2))

  console.log(`\n===== ${SUB.code} TOTAL @ ${TAG} =====`)
  console.log(`slides ${flat.length} · A+=${tally['A+']} A=${tally.A} B=${tally.B} C=${tally.C}`)
  console.log(`per-module: ${perModule.map((p) => `${p.module}=${p.slides}`).join(' ')}`)
  if (cFails.length) {
    console.log(`\nC-grade slides (${cFails.length}):`)
    cFails.slice(0, 60).forEach((r) => console.log(`  ${r.module} #${r.slide} "${(r.title || '').slice(0, 30)}" :: oy${r.oy} ox${r.ox} clipB${r.clipB} clipR${r.clipR} clipT${r.clipT} foot${r.footerHit} svgClip${r.svgClip} tiny${r.tiny}(${r.tiniest}px) comp=${r.comp}`))
  }
}
run().catch((e) => { console.error(e); process.exit(1) })
