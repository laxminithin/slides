/**
 * Data Structures — TRUE animation-state forensic QA.
 * Runs with motion ENABLED (no prefers-reduced-motion), freezes every running
 * CSS animation at 0/25/50/75/100% of its own duration via the Web Animations
 * API, and at each phase checks for collisions:
 *   - painted element clipped past its scene / frame
 *   - node/cell ↔ node/cell overlap
 *   - moving element ↔ text label cover
 *   - element ↔ footer band / title
 * Only slides that actually animate are phase-tested; collisions are reported.
 *
 * Usage: DS_VW=1920 DS_VH=1080 node scripts/ds-motion-qa.mjs [baseUrl]
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
const PHASES = [0, 0.25, 0.5, 0.75, 1.0]

const MODULES = [
  ['module-1', 50], ['module-2', 50], ['module-3', 50], ['module-4', 58], ['module-5', 50],
]

// Injected in-page: freeze all animations at fraction f of each one's duration.
const FREEZE = (f) => {
  const list = document.getAnimations ? document.getAnimations() : []
  list.forEach((a) => {
    try {
      const d = a.effect?.getComputedTiming?.().duration || 0
      a.pause()
      a.currentTime = f * (typeof d === 'number' ? d : 0)
    } catch { /* ignore */ }
  })
  return list.length
}

// Injected in-page: collision metrics at the current (frozen) state.
const COLLIDE = () => {
  const frame = document.querySelector('.slide-frame')
  const body = document.querySelector('.slide-body')
  if (!frame || !body) return { anims: 0 }
  const fr = frame.getBoundingClientRect()
  const footer = body.querySelector('.ds-footer-band')?.getBoundingClientRect()
  const title = document.querySelector('.slide-header-copy, .slide-title')?.getBoundingClientRect()

  const clipAncestor = (el) => {
    let p = el.parentElement
    while (p && p !== body) {
      const cs = getComputedStyle(p)
      if (/hidden|clip/.test(cs.overflow + cs.overflowX + cs.overflowY)) return p
      p = p.parentElement
    }
    return null
  }
  const intersect = (a, b) => {
    const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
    const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
    return x * y
  }

  // node/cell groups (the moving teaching objects)
  const nodes = [...body.querySelectorAll('.ds-visual [class*="node"], .ds-visual [class*="cell"], .ds-scene [class*="node"], .ds-scene [class*="cell"], .ds-visual g.ds-ll-node, .ds-visual g.ds-tree-node')]
    .map((n) => ({ n, r: n.getBoundingClientRect() }))
    .filter((o) => o.r.width > 2 && o.r.height > 2)

  let clipPast = 0
  let nodeOverlap = 0
  let textCover = 0
  let footerHit = 0
  let titleHit = 0

  // clip past scene / frame
  body.querySelectorAll('.ds-visual text, .ds-scene text, .ds-visual [class*="node"], .ds-visual [class*="cell"], .ds-visual rect, .ds-visual circle').forEach((n) => {
    const t = (n.textContent || '').trim()
    if (n.tagName.toLowerCase() === 'text' && !t) return
    const r = n.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) return
    const anc = clipAncestor(n)
    const box = anc ? anc.getBoundingClientRect() : fr
    const over = Math.max(box.top - r.top, r.bottom - box.bottom, box.left - r.left, r.right - box.right)
    if (over > 2) clipPast = Math.max(clipPast, Math.round(over))
  })

  // node ↔ node overlap (real overlap = >45% of the smaller box)
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i]; const b = nodes[j]
      if (a.n.contains(b.n) || b.n.contains(a.n)) continue
      const inter = intersect(a.r, b.r)
      const smaller = Math.min(a.r.width * a.r.height, b.r.width * b.r.height)
      if (smaller > 0 && inter / smaller > 0.45) nodeOverlap += 1
    }
  }

  // moving element ↔ text cover. Only TRANSLATE-motion families can slide over
  // a label. And SVG paints in document order, so a mover only *covers* a text
  // that comes BEFORE it (a label drawn on top of a pulsing panel stays legible).
  const MOTION = /dsv-(shift|insert|delete|push|pop|enqueue|dequeue|descend|return|swap|wrap)/
  const movers = [...body.querySelectorAll('.ds-visual [class*="dsv-"], .ds-scene [class*="dsv-"]')]
    .filter((mv) => MOTION.test(mv.getAttribute('class') || ''))
  const texts = [...body.querySelectorAll('.ds-visual text, .ds-scene text')].filter((t) => (t.textContent || '').trim())
  movers.forEach((mv) => {
    const mr = mv.getBoundingClientRect()
    if (mr.width < 2) return
    texts.forEach((tx) => {
      if (mv.contains(tx) || tx.contains(mv)) return
      // mover must paint ON TOP of the text (text earlier in document order)
      const rel = tx.compareDocumentPosition(mv)
      const moverAfter = (rel & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
      if (!moverAfter) return
      const tr = tx.getBoundingClientRect()
      const inter = intersect(mr, tr)
      if (tr.width * tr.height > 0 && inter / (tr.width * tr.height) > 0.5) textCover += 1
    })
  })

  // element ↔ footer / title
  const painted = [...body.querySelectorAll('.ds-visual [class*="node"], .ds-visual [class*="cell"], .ds-visual text')]
  painted.forEach((n) => {
    const r = n.getBoundingClientRect()
    if (r.width < 2) return
    if (footer && intersect(r, footer) > 20) footerHit += 1
    if (title && intersect(r, title) > 20) titleHit += 1
  })

  return { clipPast, nodeOverlap, textCover, footerHit, titleHit }
}

async function run() {
  console.log(`DS MOTION QA @ ${TAG} against ${BASE} (motion ENABLED)`)
  const browser = await chromium.launch({ headless: true })
  const findings = []
  let animatedSlides = 0
  let framesCaptured = 0
  const outDir = path.join(ROOT, 'qa-contact-sheets', 'ds-motion', TAG)
  await fs.mkdir(outDir, { recursive: true })

  for (const [modId, expected] of MODULES) {
    const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 })
    // NOTE: no reducedMotion — we want real motion
    const url = `${BASE}/#/data-structures/${modId}?slide=1`
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.evaluate((m) => { try { window.sessionStorage.setItem(`presentation:data-structures:${m}:slide`, '0') } catch { /* noop */ } }, modId)
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForSelector('.slide-frame', { timeout: 15000 })
    await page.addStyleTag({ content: '.engine-debug,.living-controls,.teaching-controls,[class*="living-control"],.deck-toolbar,.deck-chrome{display:none!important}' }).catch(() => {})
    await page.keyboard.press('Home').catch(() => {})
    await page.waitForTimeout(300)

    let slideNo = 0
    let guard = 0
    while (guard < expected + 8) {
      guard += 1
      slideNo += 1
      await page.waitForTimeout(160)
      const title = await page.evaluate(() => document.querySelector('.slide-title, h1')?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 40) || '')
      const worst = { clipPast: 0, nodeOverlap: 0, textCover: 0, footerHit: 0, titleHit: 0 }
      let anims = 0
      for (const ph of PHASES) {
        anims = await page.evaluate(FREEZE, ph)
        if (!anims) break
        await page.waitForTimeout(60)
        const m = await page.evaluate(COLLIDE)
        worst.clipPast = Math.max(worst.clipPast, m.clipPast || 0)
        worst.nodeOverlap = Math.max(worst.nodeOverlap, m.nodeOverlap || 0)
        worst.textCover = Math.max(worst.textCover, m.textCover || 0)
        worst.footerHit = Math.max(worst.footerHit, m.footerHit || 0)
        worst.titleHit = Math.max(worst.titleHit, m.titleHit || 0)
      }
      if (anims > 0) {
        animatedSlides += 1
        const bad = worst.clipPast > 4 || worst.nodeOverlap > 0 || worst.textCover > 0 || worst.footerHit > 0 || worst.titleHit > 0
        if (bad) {
          findings.push({ module: modId, slide: slideNo, title, anims, ...worst })
          // capture the offending phases for evidence
          for (const ph of PHASES) {
            await page.evaluate(FREEZE, ph)
            await page.waitForTimeout(60)
            await page.locator('.slide-frame').screenshot({ path: path.join(outDir, `${modId}-${String(slideNo).padStart(2, '0')}-p${Math.round(ph * 100)}.jpg`), type: 'jpeg', quality: 78, timeout: 8000 }).catch(() => {})
            framesCaptured += 1
          }
        }
      }
      // resume + advance
      await page.evaluate(() => { (document.getAnimations ? document.getAnimations() : []).forEach((a) => { try { a.play() } catch { /* noop */ } }) })
      process.stdout.write(`  ${TAG} ${modId} ${slideNo}/${expected} anims=${anims}   \r`)
      const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
      if (nextDisabled) break
      await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => { await page.keyboard.press('ArrowRight') })
      await page.waitForTimeout(100)
    }
    console.log(`\n${modId}: scanned ${slideNo}`)
    await page.close()
  }
  await browser.close()

  const report = { tag: TAG, animatedSlides, framesCaptured, collisionFindings: findings }
  await fs.writeFile(path.join(ROOT, 'qa-contact-sheets', `ds-motion-report-${TAG}.json`), JSON.stringify(report, null, 2))
  console.log(`\n===== DS MOTION QA @ ${TAG} =====`)
  console.log(`animated slides: ${animatedSlides} · collision findings: ${findings.length}`)
  if (findings.length) {
    findings.forEach((f) => console.log(`  ${f.module} #${f.slide} "${f.title.slice(0, 28)}" clipPast=${f.clipPast} nodeOverlap=${f.nodeOverlap} textCover=${f.textCover} foot=${f.footerHit} title=${f.titleHit}`))
  } else {
    console.log('  no animation-phase collisions detected')
  }
}
run().catch((e) => { console.error(e); process.exit(1) })
