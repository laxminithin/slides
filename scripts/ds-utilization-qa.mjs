/**
 * Data Structures — space-utilization / composition audit.
 * For every slide measures, against the teaching stage (.ds-stage, else body):
 *   - primaryVisualShare : largest drawn SVG-content bbox / stage
 *   - combinedUtil       : union bbox of (copy text + visual content + footer) / stage
 *   - emptyQuadrants     : # of 2x2 stage quadrants with < 4% painted coverage
 *   - textCornered       : main copy text group sits < 80px from a stage edge AND small
 * Flags (heuristics, not blind rules):
 *   primaryVisualShare < 0.45 · combinedUtil < 0.65 · emptyQuadrants >= 1 (with a visual)
 * Writes qa-contact-sheets/ds-util-report-<tag>.json ranked worst-first.
 *
 * Usage: DS_VW=1920 DS_VH=1080 node scripts/ds-utilization-qa.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://localhost:5175'
const VW = Number(process.env.DS_VW || 1920)
const VH = Number(process.env.DS_VH || 1080)
const TAG = `${VW}x${VH}`
const MODULES = [['module-1', 50], ['module-2', 50], ['module-3', 50], ['module-4', 58], ['module-5', 50]]

const HIDE = '.engine-debug,.living-controls,.teaching-controls,[class*="living-control"],.deck-toolbar,.deck-chrome{display:none!important}'

const METRICS = () => {
  const body = document.querySelector('.slide-body')
  const stageEl = document.querySelector('.ds-stage') || body
  if (!stageEl) return { ok: false }
  const st = stageEl.getBoundingClientRect()
  const title = document.querySelector('.slide-title, h1')?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 40) || ''
  const comp = document.querySelector('.ds-stage')?.getAttribute('data-ds-comp') || 'hero'
  const stArea = Math.max(1, st.width * st.height)
  const U = (r) => ({ l: r.left, t: r.top, r: r.right, b: r.bottom })
  const area = (b) => Math.max(0, b.r - b.l) * Math.max(0, b.b - b.t)
  const merge = (a, b) => a ? { l: Math.min(a.l, b.l), t: Math.min(a.t, b.t), r: Math.max(a.r, b.r), b: Math.max(a.b, b.b) } : b

  // drawn SVG content bbox (largest svg), excluding full-bg rects
  let visBox = null
  let bestVisArea = 0
  body.querySelectorAll('.ds-visual svg, .ds-scene svg, svg.ds-svg').forEach((svg) => {
    const sr = svg.getBoundingClientRect()
    let bb = null
    svg.querySelectorAll('rect,circle,line,path,text,image').forEach((n) => {
      const r = n.getBoundingClientRect()
      if (r.width < 1 || r.height < 1) return
      if (n.tagName === 'rect' && r.width > sr.width * 0.9 && r.height > sr.height * 0.9) return // bg
      bb = merge(bb, U(r))
    })
    if (bb && area(bb) > bestVisArea) { bestVisArea = area(bb); visBox = bb }
  })
  const primaryVisualShare = Number((bestVisArea / stArea).toFixed(3))

  // union of all teaching content within stage
  let allBox = visBox
  const copy = body.querySelector('.ds-copy')
  let copyBox = null
  if (copy) {
    copy.querySelectorAll('.ds-lead, .ds-points li, .ds-definition, .ds-callout, .ds-algo-steps li, .ds-dryrun section, .ds-term-chips, .ds-checkpoint-sheet article, .ds-code-line, .ds-syllabus-audit article, .ds-roadmap article, .ds-practice-list li').forEach((n) => {
      const r = n.getBoundingClientRect()
      if (r.width < 2 || r.height < 2) return
      copyBox = merge(copyBox, U(r))
    })
    if (copyBox) allBox = merge(allBox, copyBox)
  }
  const footer = body.querySelector('.ds-footer-band')
  if (footer) { const r = footer.getBoundingClientRect(); if (r.width > 2) allBox = merge(allBox, U(r)) }
  const combinedUtil = allBox ? Number((area(allBox) / stArea).toFixed(3)) : 0

  // empty quadrants of the stage
  const qs = [
    { l: st.left, t: st.top, r: st.left + st.width / 2, b: st.top + st.height / 2 },
    { l: st.left + st.width / 2, t: st.top, r: st.right, b: st.top + st.height / 2 },
    { l: st.left, t: st.top + st.height / 2, r: st.left + st.width / 2, b: st.bottom },
    { l: st.left + st.width / 2, t: st.top + st.height / 2, r: st.right, b: st.bottom },
  ]
  const paints = []
  body.querySelectorAll('.ds-visual svg rect, .ds-visual svg circle, .ds-visual svg path, .ds-visual svg text, .ds-visual svg line, .ds-copy .ds-lead, .ds-copy .ds-points li, .ds-copy .ds-definition, .ds-copy .ds-callout, .ds-copy .ds-algo-steps li, .ds-copy .ds-dryrun section, .ds-copy .ds-checkpoint-sheet article, .ds-copy .ds-code-line').forEach((n) => {
    const r = n.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return
    if (n.tagName === 'rect') { const sr = n.ownerSVGElement?.getBoundingClientRect(); if (sr && r.width > sr.width * 0.9 && r.height > sr.height * 0.9) return }
    paints.push(U(r))
  })
  const inter = (a, b) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l)) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t))
  const qArea = (st.width / 2) * (st.height / 2)
  const quadCover = qs.map((q) => Math.min(1, paints.reduce((s, p) => s + inter(p, q), 0) / Math.max(1, qArea)))
  const emptyQuadrants = quadCover.filter((c) => c < 0.04).length

  // cornered copy text
  let textCornered = false
  if (copyBox) {
    const gap = Math.min(copyBox.l - st.left, st.right - copyBox.r, copyBox.t - st.top, st.bottom - copyBox.b)
    const cArea = area(copyBox) / stArea
    textCornered = gap > 80 && cArea < 0.14
  }

  const hasViz = !!body.querySelector('.ds-visual svg, .ds-scene svg')
  return {
    ok: true, title, comp, hasViz,
    primaryVisualShare, combinedUtil, emptyQuadrants,
    quadCover: quadCover.map((c) => Number(c.toFixed(2))),
    textCornered,
  }
}

async function run() {
  console.log(`DS UTILIZATION QA @ ${TAG}`)
  const browser = await chromium.launch({ headless: true })
  const rows = []
  for (const [modId, expected] of MODULES) {
    const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const url = `${BASE}/#/data-structures/${modId}?slide=1`
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.evaluate((m) => { try { sessionStorage.setItem(`presentation:data-structures:${m}:slide`, '0') } catch { /* noop */ } }, modId)
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForSelector('.slide-frame', { timeout: 15000 })
    await page.addStyleTag({ content: HIDE }).catch(() => {})
    await page.keyboard.press('Home').catch(() => {})
    await page.waitForTimeout(300)
    let slideNo = 0; let guard = 0
    while (guard < expected + 8) {
      guard += 1; slideNo += 1
      await page.waitForTimeout(150)
      const m = await page.evaluate(METRICS)
      if (m.ok) {
        const flags = []
        if (m.hasViz && m.primaryVisualShare < 0.45) flags.push('SMALL_VIS')
        if (m.combinedUtil < 0.65) flags.push('LOW_UTIL')
        if (m.hasViz && m.emptyQuadrants >= 1) flags.push(`EMPTYQ${m.emptyQuadrants}`)
        if (m.textCornered) flags.push('TEXT_CORNER')
        rows.push({ module: modId, slide: slideNo, flags, ...m })
      }
      const nd = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
      if (nd) break
      await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => { await page.keyboard.press('ArrowRight') })
      await page.waitForTimeout(90)
    }
    await page.close()
    console.log(`${modId}: ${slideNo}`)
  }
  await browser.close()
  await fs.writeFile(path.join(ROOT, 'qa-contact-sheets', `ds-util-report-${TAG}.json`), JSON.stringify(rows, null, 2))
  const flagged = rows.filter((r) => r.flags.length)
  console.log(`\n===== UTILIZATION @ ${TAG} =====\ntotal ${rows.length} · flagged ${flagged.length}`)
  const byFlag = {}
  flagged.forEach((r) => r.flags.forEach((f) => { const k = f.replace(/\d+$/, ''); byFlag[k] = (byFlag[k] || 0) + 1 }))
  console.log('by flag:', JSON.stringify(byFlag))
  // worst 40 by primaryVisualShare among viz slides
  const worst = rows.filter((r) => r.hasViz).sort((a, b) => a.primaryVisualShare - b.primaryVisualShare).slice(0, 40)
  console.log('\nworst primary-visual-share (viz slides):')
  worst.forEach((r) => console.log(`  ${r.module} #${String(r.slide).padStart(2)} pv=${r.primaryVisualShare} util=${r.combinedUtil} eq=${r.emptyQuadrants} ${r.flags.join(',')} · ${r.comp} · ${r.title.slice(0, 30)}`))
}
run().catch((e) => { console.error(e); process.exit(1) })
