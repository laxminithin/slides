/**
 * Parallel Computing Module 3 — forensic animation-state QA.
 *
 * Captures 0/25/50/75/100% of each slide's animation, then checks:
 *   DOM bounding-box collisions, SVG label collisions, title/footer
 *   zone violations, tiny text, overflow, wrapping.
 *
 * Usage:
 *   node scripts/pc-m3-forensic-qa.mjs [baseUrl]
 *
 * Writes:
 *   qa-contact-sheets/pc-m3-forensic/slide-NNN/{00,25,50,75,100}.png
 *   tmp/pc-m3-collision-report.json
 *   qa/pc-m3-forensic.json
 *   qa-contact-sheets/pc-module-3-forensic-contact-sheet.jpg
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://127.0.0.1:4173'
const SUBJECT = 'parallel-computing'
const MOD = 'module-3'
const EXPECTED = 90
const STATES = [0, 0.25, 0.5, 0.75, 1]
const STATE_NAMES = ['00', '25', '50', '75', '100']

const VIEWPORTS = [
  { name: '1280x720', w: 1280, h: 720, shots: true },
  { name: '1366x768', w: 1366, h: 768, shots: true },
  { name: '1600x900', w: 1600, h: 900, shots: true },
  { name: '1920x1080', w: 1920, h: 1080, shots: true },
]

const HIDE = `
.engine-debug, .living-controls, .teaching-controls,
[class*="living-control"], .deck-toolbar, .deck-chrome,
.laser-layer, .ink-layer { display: none !important; opacity: 0 !important; }
.slide-frame { box-shadow: none !important; }
`

const SEEK_JS = `(progress) => {
  const durFallback = 2800
  document.getAnimations().forEach((a) => {
    try {
      a.pause()
      const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : null
      let d = t && t.duration
      if (d === Infinity || d == null || Number.isNaN(Number(d))) d = durFallback
      const delay = (t && t.delay) || 0
      a.currentTime = delay + Number(d) * progress
    } catch { /* ignore */ }
  })
  document.querySelectorAll('.slide-body svg').forEach((svg) => {
    try {
      if (typeof svg.pauseAnimations === 'function') svg.pauseAnimations()
      let max = 2.8
      svg.querySelectorAll('animate, animateMotion, animateTransform').forEach((el) => {
        const raw = el.getAttribute('dur') || ''
        const n = Number.parseFloat(raw)
        if (n > max) max = n
      })
      if (typeof svg.setCurrentTime === 'function') svg.setCurrentTime(max * progress)
    } catch { /* ignore */ }
  })
}`

const MEASURE_JS = `() => {
  const frame = document.querySelector('.slide-frame')
  const body = document.querySelector('.slide-body')
  const titleEl = document.querySelector('.mpi-head h2, .mpi-divider-copy h2, .slide-title')
  const title = titleEl?.textContent?.trim() || ''
  if (!frame || !body) return { hasFrame: false, title, collisions: [], tiny: [], wraps: [], overflow: {}, zones: {} }

  const br = body.getBoundingClientRect()
  const footer = document.querySelector('.slide-footer')
  const nav = document.querySelector('.controls, .nav-group')
  const head = document.querySelector('.mpi-head, .mpi-divider-copy')
  const fr = frame.getBoundingClientRect()
  const footerBox = footer?.getBoundingClientRect()
  const navBox = nav?.getBoundingClientRect()
  const headBox = head?.getBoundingClientRect()

  const overlap = (a, b) => {
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left)
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
    return { w, h, area: w > 0 && h > 0 ? w * h : 0 }
  }
  const areaOf = (r) => Math.max(0, r.width) * Math.max(0, r.height)
  const labelOf = (el) => {
    const t = (el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 48)
    const tag = el.tagName.toLowerCase()
    const cls = (el.getAttribute('class') || '').split(/\\s+/).slice(0, 2).join('.')
    return t ? \`\${tag}\${cls ? '.' + cls : ''} "\${t}"\` : \`\${tag}\${cls ? '.' + cls : ''}\`
  }
  const visible = (el, r) => {
    if (!r || r.width < 2 || r.height < 2) return false
    const s = getComputedStyle(el)
    if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return false
    return true
  }
  const isChrome = (el) => {
    return Boolean(el.closest('.slide-footer, .controls, .nav-group, .living-controls, .engine-debug, .laser-layer, .ink-layer, .slide-header-tools, .pc-m3-roadmap, .mpi-kicker'))
  }

  const collisions = []
  const textNodes = []
  const visualNodes = []

  const clipRect = (el, r) => {
    let out = { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }
    let p = el.parentElement
    while (p && p !== document.body) {
      const cs = getComputedStyle(p)
      if (/auto|scroll|hidden/.test(\`\${cs.overflow}\${cs.overflowX}\${cs.overflowY}\`)) {
        const pr = p.getBoundingClientRect()
        const left = Math.max(out.left, pr.left)
        const top = Math.max(out.top, pr.top)
        const right = Math.min(out.right, pr.right)
        const bottom = Math.min(out.bottom, pr.bottom)
        out = { left, top, right, bottom, width: Math.max(0, right - left), height: Math.max(0, bottom - top) }
      }
      p = p.parentElement
    }
    return out
  }
  const movingSelf = (el) => Boolean(el.querySelector?.(':scope > animate, :scope > animateMotion, :scope > animateTransform'))

  body.querySelectorAll('h2, h3, p, li, code, pre, .rk, .mpi-chip, .mpi-formula, .mpi-q, .mpi-take, .mpi-kicker, .mpi-lead, .mpi-world-label, .mpi-note, text, tspan').forEach((el) => {
    if (isChrome(el)) return
    const r0 = el.getBoundingClientRect()
    const r = clipRect(el, r0)
    if (!visible(el, r)) return
    const fs = Number.parseFloat(getComputedStyle(el).fontSize || '16')
    textNodes.push({ el, r, fs, label: labelOf(el), area: areaOf(r) })
  })

  body.querySelectorAll('.mpi-packet, .mpi-rank, .mpi-cells i, circle, rect, ellipse, path, line, polygon, polyline').forEach((el) => {
    if (isChrome(el)) return
    if (el.closest('defs') || el.tagName === 'marker') return
    const r0 = el.getBoundingClientRect()
    const r = clipRect(el, r0)
    if (!visible(el, r)) return
    const tag = el.tagName.toLowerCase()
    const stroke = tag === 'path' || tag === 'line' || tag === 'polyline'
    visualNodes.push({ el, r, label: labelOf(el), tag, stroke, area: areaOf(r), moving: movingSelf(el) })
  })

  const ancestor = (a, b) => a.contains(b) || b.contains(a)
  const sameGroup = (a, b) => {
    const ga = a.closest('g')
    const gb = b.closest('g')
    return Boolean(ga && gb && ga === gb)
  }
  const center = (r) => ({ x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 })
  const containsPoint = (r, p) => p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom
  const isSvgLabel = (el) => {
    const tag = el.tagName.toLowerCase()
    return tag === 'text' || tag === 'tspan' || tag === 'code' || el.classList?.contains('rk')
  }

  for (const t of textNodes) {
    for (const v of visualNodes) {
      if (t.el === v.el) continue
      if (ancestor(t.el, v.el)) continue
      if (sameGroup(t.el, v.el) && !v.moving) continue
      const o = overlap(t.r, v.r)
      if (o.area < 8) continue
      const frac = o.area / Math.max(1, t.area)
      const sceneBox = (v.el.closest('.mpi-scene') || body).getBoundingClientRect()
      const hugeStroke = v.stroke && v.area > Math.max(1, sceneBox.width * sceneBox.height) * 0.12
      if (hugeStroke) continue
      if (v.stroke && Math.min(v.r.width, v.r.height) > 22) continue
      if (!v.stroke && frac > 0.75 && !v.moving) continue
      if (!v.stroke && frac < 0.12 && o.w < 8 && o.h < 8) continue
      if (v.stroke && o.area < 18) continue
      const inscribed = !v.stroke && isSvgLabel(t.el) && containsPoint(v.r, center(t.r))
        && ['circle', 'rect', 'ellipse'].includes(v.tag)
      if (inscribed) continue
      if (['polygon', 'path'].includes(v.tag) && !v.stroke && isSvgLabel(t.el) && !containsPoint(v.r, center(t.r))) continue
      collisions.push({
        kind: v.stroke ? 'text-connector' : 'text-visual',
        elementA: t.label,
        elementB: v.label,
        intersectionWidth: Math.round(o.w),
        intersectionHeight: Math.round(o.h),
        frac: Number(frac.toFixed(3)),
      })
    }
  }

  for (let i = 0; i < textNodes.length; i++) {
    for (let j = i + 1; j < textNodes.length; j++) {
      const a = textNodes[i]
      const b = textNodes[j]
      if (ancestor(a.el, b.el)) continue
      const ta = (a.el.textContent || '').replace(/\s+/g, ' ').trim()
      const tb = (b.el.textContent || '').replace(/\s+/g, ' ').trim()
      if (ta && ta === tb) continue
      const o = overlap(a.r, b.r)
      if (o.area < 20) continue
      const fracA = o.area / Math.max(1, a.area)
      const fracB = o.area / Math.max(1, b.area)
      if (fracA < 0.18 && fracB < 0.18) continue
      if (fracA > 0.9 || fracB > 0.9) continue
      collisions.push({
        kind: 'text-text',
        elementA: a.label,
        elementB: b.label,
        intersectionWidth: Math.round(o.w),
        intersectionHeight: Math.round(o.h),
        frac: Number(Math.max(fracA, fracB).toFixed(3)),
      })
    }
  }

  const tiny = []
  textNodes.forEach((t) => {
    const important = /rk|rank|formula|mpi-q|h2|code|pre/i.test(t.label) || t.el.tagName === 'H2'
    const floor = important ? 18 : 16
    if (t.fs + 0.2 < floor && (t.el.textContent || '').trim().length > 0) {
      tiny.push({ label: t.label, fontSize: Number(t.fs.toFixed(1)), floor })
    }
  })

  const wraps = []
  body.querySelectorAll('.rk, .mpi-chip, .mpi-world-label, text, .mpi-head h2').forEach((el) => {
    const t = (el.textContent || '').trim()
    if (!t || t.length < 6) return
    const r = el.getBoundingClientRect()
    if (r.height < 2) return
    const fs = Number.parseFloat(getComputedStyle(el).fontSize || '16')
    const lines = r.height / Math.max(12, fs * 1.15)
    if (lines >= 2.35 && t.length < 28) {
      wraps.push({ label: t.slice(0, 40), lines: Number(lines.toFixed(2)) })
    }
  })

  const overflow = {
    ox: body.scrollWidth - body.clientWidth,
    oy: body.scrollHeight - body.clientHeight,
  }

  let footerHit = false
  let titleHit = false
  let navHit = false
  const viz = body.querySelector('.mpi-visual, .mpi-scene, .mpi-full, .mpi-divider')
  if (viz && footerBox) {
    const o = overlap(viz.getBoundingClientRect(), footerBox)
    footerHit = o.w > 8 && o.h > 8
  }
  if (headBox) {
    visualNodes.forEach((v) => {
      if (v.el.closest('.mpi-head, .mpi-divider-copy')) return
      const o = overlap(v.r, headBox)
      if (o.w > 10 && o.h > 8 && o.area / Math.max(1, v.area) > 0.12) titleHit = true
    })
  }
  if (navBox) {
    visualNodes.forEach((v) => {
      const o = overlap(v.r, navBox)
      if (o.w > 8 && o.h > 8) navHit = true
    })
  }

  const seen = new Set()
  const uniq = []
  for (const c of collisions) {
    const k = c.kind + c.elementA + c.elementB
    if (seen.has(k)) continue
    seen.add(k)
    uniq.push(c)
  }

  return {
    hasFrame: true,
    title,
    collisions: uniq.slice(0, 40),
    collisionCount: uniq.length,
    tiny: tiny.slice(0, 20),
    tinyCount: tiny.length,
    wraps: wraps.slice(0, 10),
    overflow,
    zones: { footerHit, titleHit, navHit, frame: { w: Math.round(fr.width), h: Math.round(fr.height) } },
  }
}`

function forensicGrade(m) {
  if (!m.hasFrame) return 'C'
  if ((m.overflow?.ox || 0) > 4 || (m.overflow?.oy || 0) > 8) return 'C'
  if (m.zones?.footerHit || m.zones?.navHit) return 'C'
  if ((m.collisionCount || 0) > 0) return 'C'
  if ((m.tinyCount || 0) > 2) return 'C'
  if ((m.wraps || []).length > 1) return 'B'
  if (m.zones?.titleHit) return 'B'
  if ((m.tinyCount || 0) > 0) return 'B'
  return 'A'
}

async function gotoModule(page) {
  const url = `${BASE}/#/${SUBJECT}/${MOD}?slide=1`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.evaluate(({ subject, mod }) => {
    try { window.sessionStorage.setItem(`presentation:${subject}:${mod}:slide`, '0') } catch { /* ignore */ }
  }, { subject: SUBJECT, mod: MOD })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('.slide-frame', { timeout: 20000 })
  await page.addStyleTag({ content: HIDE }).catch(() => {})
  await page.keyboard.press('Home').catch(() => {})
  await page.waitForTimeout(240)
}

async function captureViewport(browser, vp) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 })
  await gotoModule(page)

  const outRoot = path.join(ROOT, 'qa-contact-sheets', 'pc-m3-forensic')
  await fs.mkdir(outRoot, { recursive: true })
  const settledShots = []
  const grades = []
  const collisions = []
  let slideNo = 0
  let guard = 0
  let frames = 0

  while (guard < EXPECTED + 8) {
    guard += 1
    slideNo += 1
    const slideDir = path.join(outRoot, `slide-${String(slideNo).padStart(3, '0')}`)
    if (vp.shots && vp.name === '1280x720') await fs.mkdir(slideDir, { recursive: true })

    let worst = 'A'
    let title = ''
    const stateHits = []

    for (let i = 0; i < STATES.length; i++) {
      await page.evaluate(new Function('progress', `return (${SEEK_JS})(progress)`), STATES[i])
      await page.waitForTimeout(40)
      const metrics = await page.evaluate(new Function(`return (${MEASURE_JS})()`))
      title = metrics.title || title
      const g = forensicGrade(metrics)
      if (g === 'C' || (g === 'B' && worst === 'A') || (g === 'A+' && worst !== 'C' && worst !== 'B')) {
        /* keep worst: C > B > A */
      }
      if (g === 'C') worst = 'C'
      else if (g === 'B' && worst !== 'C') worst = 'B'
      frames += 1
      if (metrics.collisionCount) {
        for (const c of metrics.collisions) {
          collisions.push({
            slide: slideNo,
            title,
            viewport: vp.name,
            animationState: STATE_NAMES[i],
            ...c,
          })
        }
      }
      stateHits.push({ state: STATE_NAMES[i], grade: g, ...metrics })

      if (vp.shots && vp.name === '1280x720') {
        const shotPath = path.join(slideDir, `${STATE_NAMES[i]}.png`)
        await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'png', animations: 'disabled' })
      }
    }

    if (vp.name === '1600x900') {
      await page.evaluate(new Function('progress', `return (${SEEK_JS})(progress)`), 1)
      await page.waitForTimeout(30)
      const shotPath = path.join(ROOT, 'qa-contact-sheets', 'pc-m3-forensic', `_sheet-${String(slideNo).padStart(2, '0')}.jpg`)
      await page.locator('.slide-frame').screenshot({ path: shotPath, type: 'jpeg', quality: 72, animations: 'disabled' })
      const buf = await fs.readFile(shotPath)
      settledShots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
      await fs.unlink(shotPath).catch(() => {})
    }

    grades.push({ slide: slideNo, grade: worst, title, states: stateHits })

    const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
    if (nextDisabled) break
    await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
      await page.keyboard.press('ArrowRight')
    })
    await page.waitForTimeout(90)
  }

  if (vp.name === '1600x900' && settledShots.length) {
    const cols = 5
    const cellW = 300
    const cells = settledShots.map((src, i) => {
      const row = grades[i]
      const t = (row?.title || '').slice(0, 34)
      return `<figure data-grade="${row?.grade}"><img src="${src}" /><figcaption>${String(i + 1).padStart(2, '0')} · ${row?.grade} · ${t}</figcaption></figure>`
    }).join('')
    const gridW = cols * cellW + (cols + 1) * 12
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#1c2430;font-family:ui-sans-serif,system-ui,sans-serif;padding:16px;width:${gridW}px;color:#e8eef7}
      h1{font-size:18px;margin:0 0 6px;color:#9ec1ff}
      .meta{color:#9aa4b2;font-size:12px;margin:0 0 12px}
      .g{display:grid;grid-template-columns:repeat(${cols},1fr);gap:12px}
      figure{margin:0;background:#0d1117;border-radius:8px;overflow:hidden;border:2px solid #2a3342}
      figure[data-grade="A"]{border-color:#16a34a}
      figure[data-grade="B"]{border-color:#d97706}
      figure[data-grade="C"]{border-color:#dc2626}
      img{display:block;width:100%;height:auto}
      figcaption{font-size:10px;font-weight:700;padding:5px 7px;color:#9aa4b2}
    </style></head><body>
      <h1>Parallel Computing · Module 3 · Forensic contact sheet</h1>
      <p class="meta">${settledShots.length} slides · ${vp.w}×${vp.h} · animation-state QA (settled frame preview)</p>
      <div class="g">${cells}</div>
    </body></html>`
    const sheetPage = await browser.newPage({ viewport: { width: gridW + 40, height: 1200 } })
    await sheetPage.setContent(html, { waitUntil: 'load' })
    await sheetPage.waitForTimeout(280)
    const sheetOut = path.join(ROOT, 'qa-contact-sheets', 'pc-module-3-forensic-contact-sheet.jpg')
    await sheetPage.screenshot({ path: sheetOut, type: 'jpeg', quality: 86, fullPage: true })
    await sheetPage.close()
    console.log(`forensic contact sheet → ${sheetOut}`)
  }

  await page.close()
  const tally = (x) => grades.filter((r) => r.grade === x).length
  console.log(`${vp.name}: ${grades.length} slides  A=${tally('A')} B=${tally('B')} C=${tally('C')}  collisions=${collisions.length}  frames=${frames}`)
  grades.filter((r) => r.grade !== 'A').slice(0, 24).forEach((f) => {
    const hits = f.states.reduce((n, s) => n + (s.collisionCount || 0), 0)
    const tiny = f.states.reduce((n, s) => n + (s.tinyCount || 0), 0)
    console.log(`  ${f.grade}  #${f.slide}  coll=${hits} tiny=${tiny}  ${f.title}`)
  })
  return { vp: vp.name, grades, collisions, frames }
}

const run = async () => {
  console.log(`PC Module 3 FORENSIC QA against ${BASE}`)
  const browser = await chromium.launch({ headless: true })
  const reports = []
  for (const vp of VIEWPORTS) {
    reports.push(await captureViewport(browser, vp))
  }
  await browser.close()

  const allCollisions = reports.flatMap((r) => r.collisions)
  const outJson = path.join(ROOT, 'qa', 'pc-m3-forensic.json')
  await fs.mkdir(path.dirname(outJson), { recursive: true })
  await fs.writeFile(outJson, JSON.stringify({
    generatedAt: new Date().toISOString(),
    expected: EXPECTED,
    animationStates: STATE_NAMES,
    reports: reports.map((r) => ({
      vp: r.vp,
      frames: r.frames,
      grades: r.grades.map((g) => ({ slide: g.slide, grade: g.grade, title: g.title, collisionCount: g.states.reduce((n, s) => n + (s.collisionCount || 0), 0), tinyCount: g.states.reduce((n, s) => n + (s.tinyCount || 0), 0) })),
    })),
  }, null, 2))

  await fs.mkdir(path.join(ROOT, 'tmp'), { recursive: true })
  await fs.writeFile(path.join(ROOT, 'tmp', 'pc-m3-collision-report.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    total: allCollisions.length,
    collisions: allCollisions,
  }, null, 2))

  const anyC = reports.some((r) => r.grades.some((g) => g.grade === 'C'))
  const anyB = reports.some((r) => r.grades.some((g) => g.grade === 'B'))
  console.log(`UNINTENDED COLLISIONS = ${allCollisions.length}`)
  console.log(anyC ? 'RESULT: C-grade slides remain' : anyB ? 'RESULT: B-grade slides remain' : 'RESULT: A-GRADE SLIDES ONLY')
  process.exit(anyC ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
