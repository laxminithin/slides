import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:4173'
const CONTACT = path.join(ROOT, 'qa-contact-sheets/first-year-phase8')
const WORKERS = Number(process.env.PHASE8_WORKERS || 6)

const inventory = JSON.parse(await fs.readFile(path.join(ROOT, 'qa/first-year-phase8-inventory.json'), 'utf8'))

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
]

const regressionRoutes = [
  '/#/chemistry/module-1?slide=1',
  '/#/big-data-analytics/module-1?slide=1',
  '/#/database-management-systems/module-1?slide=1',
  '/#/theory-of-computation/module-1?slide=1',
  '/#/artificial-intelligence/module-1?slide=1',
  '/#/computer-networks/unit-1?slide=1',
  '/#/computer-networks-bcs502/module-1?slide=1',
  '/#/analog-electronics-linear-ics/module-1?slide=1',
  '/#/__first-year-foundation?scene=5',
  '/#/operating-systems/module-1?slide=1',
]

function jobsFor(viewportName) {
  const jobs = []
  for (const subject of inventory.subjectsDetail) {
    for (const segment of subject.segments) {
      for (let slide = 1; slide <= segment.slides; slide += 1) {
        jobs.push({ subject, segment, slide, viewportName })
      }
    }
  }
  return jobs
}

async function auditSlide(page, subject, segment, slideNumber, viewportName, reducedMotion = false) {
  const route = `/#/${subject.id}/${segment.id}?slide=${slideNumber}`
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
  try {
    await page.waitForSelector('.slide-frame', { timeout: 16000 })
  } catch (error) {
    return {
      subject: subject.title, code: subject.code, id: subject.id, family: subject.family,
      route, segment: segment.id, slide: slideNumber, viewport: viewportName, reducedMotion,
      ok: false, grade: 'C', hits: [{ kind: 'route-load-timeout', detail: error.message }],
    }
  }
  await page.waitForTimeout(reducedMotion ? 30 : 55)
  const row = await page.evaluate(({ subject, segment, slideNumber, viewportName, reducedMotion, route }) => {
    const frame = document.querySelector('.slide-frame')
    const body = document.querySelector('.slide-body')
    const footerEl = document.querySelector('.slide-footer')
    const title = document.querySelector('.slide-title')?.textContent?.trim() || ''
    const footer = footerEl?.textContent || ''
    const hits = []
    const fail = (kind, detail) => hits.push({ kind, detail })
    if (!frame || !body) fail('missing-frame', 'No slide frame/body')
    if (!title && !document.querySelector('[data-title-kind], .chem-opener, .fy-kicker')) fail('missing-title', 'No slide title')
    if (footer && !footer.includes(`Slide ${slideNumber}`)) fail('wrong-slide', footer.trim().slice(0, 80))
    const candidates = [...document.querySelectorAll('[data-slide-content="true"], .fy-source-block, .fy-process, .fy-comparison, .fy-timeline, .fy-experiment, .fy-concept-map, .fy-execution-trace, .fy-numerical-board, .fy-equation-stepper, .math-topic-grid, .science-hero-visual, .eng-svg, .rem-svg, svg, table')]
      .map((el) => ({ el, rect: el.getBoundingClientRect() }))
      .filter((item) => item.rect.width > 8 && item.rect.height > 8)
      .sort((a, b) => (b.rect.width * b.rect.height) - (a.rect.width * b.rect.height))
    const content = candidates[0]
    if (!content) fail('missing-teaching-surface', 'No teaching surface')
    if (frame && (frame.scrollWidth - frame.clientWidth > 28 || frame.scrollHeight - frame.clientHeight > 28)) fail('frame-overflow', `${frame.scrollWidth}x${frame.scrollHeight}`)
    if (body && (body.scrollWidth - body.clientWidth > 32 || body.scrollHeight - body.clientHeight > 32)) fail('body-overflow', `${body.scrollWidth}x${body.scrollHeight}`)
    const br = body?.getBoundingClientRect()
    const fr = footerEl?.getBoundingClientRect()
    if (br && fr && content && content.rect.bottom - fr.top > 10) fail('footer-collision', `${Math.round(content.rect.bottom - fr.top)}px into footer`)
    const textNodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,strong,span,td,th,blockquote,text,code')] : []
    for (const node of textNodes) {
      const r = node.getBoundingClientRect()
      if (!r || r.width < 2 || r.height < 2) continue
      const px = Number.parseFloat(getComputedStyle(node).fontSize)
      if (px > 0 && px < 11) { fail('tiny-text', `${(node.textContent || '').trim().slice(0, 40)} ${px}px`); break }
      if (br && (r.right - br.right > 24 || r.bottom - br.bottom > 24 || br.left - r.left > 24 || br.top - r.top > 24)) {
        const svg = node.ownerSVGElement
        const sr = svg?.getBoundingClientRect()
        const ghost = svg && sr && (Math.abs(r.top - sr.top) > 400 || Math.abs(r.bottom - sr.bottom) > 400)
          && sr.bottom - br.bottom <= 24 && br.top - sr.top <= 24 && sr.right - br.right <= 24 && br.left - sr.left <= 24
        if (!ghost) {
          fail('text-out-of-bounds', (node.textContent || '').trim().slice(0, 60)); break
        }
      }
      if (/\uFFFD/.test(node.textContent || '')) { fail('native-script-tofu', (node.textContent || '').trim().slice(0, 40)); break }
    }
    const language = subject.code === '1BKBK109' || subject.code === '1BKSK109'
    if (language && slideNumber <= 8) {
      const kannada = (body?.innerText || '').match(/[\u0C80-\u0CFF]/g) || []
      if (kannada.length < 4) fail('native-script-missing', `only ${kannada.length} Kannada glyphs`)
    }
    const animated = [...document.querySelectorAll('.slide-frame *')].filter((el) => {
      const cs = getComputedStyle(el)
      return cs.animationName !== 'none' && Number.parseFloat(cs.animationDuration) > 0
    })
    const skipMotion = /study resources|coverage|learning route|syllabus coverage|topic map|recap|resources/i.test(title)
    if (!reducedMotion && slideNumber <= 3 && !skipMotion && animated.length < 1) fail('animation-too-thin', `${animated.length} animated elements`)
    const bodyArea = br ? br.width * br.height : 1
    const visualShare = content && br ? (content.rect.width * content.rect.height) / bodyArea : 0
    if (content && br && visualShare < 0.10 && !skipMotion) fail('space-utilization', `visualShare ${visualShare.toFixed(3)}`)
    if (content && br) {
      const cx = content.rect.left + content.rect.width / 2
      const cy = content.rect.top + content.rect.height / 2
      const left = cx < br.left + br.width * 0.18
      const right = cx > br.right - br.width * 0.18
      const top = cy < br.top + br.height * 0.18
      const bottom = cy > br.bottom - br.height * 0.18
      if ((left || right) && (top || bottom) && visualShare < 0.22) fail('cornering', `share ${visualShare.toFixed(3)}`)
    }
    const svg = body?.querySelector('svg')
    if (svg && br) {
      const sr = svg.getBoundingClientRect()
      if (sr.width > 40 && sr.width / br.width < 0.16 && sr.height / br.height < 0.16) fail('tiny-animation', `svg ${Math.round(sr.width)}x${Math.round(sr.height)}`)
    }
    const leakRe = /(?:final\s+pptx\s+teaching\s+block|pptx\s+teaching\s+block|pptx\s+teaching\s+depth|pptx\s+depth\s+block|source\s+teaching\s+block|finalized\s+pptx\s+slides|pptx\s+slides\s+\d|teaching\s+block\s+\d+(?:\s*[-–]\s*\d+)?|source\s+block\s+\d+|final\s+source\s+section|teaching\s+source\s+section|pptx\s+source\s+content)/i
    const renderedText = `${title}\n${document.querySelector('.slide-subtitle')?.textContent || ''}\n${body?.innerText || ''}`
    if (leakRe.test(renderedText)) fail('placeholder-leak', renderedText.replace(/\s+/g, ' ').trim().slice(0, 140))
    const bodyText = (body?.innerText || '').replace(/\s+/g, ' ').slice(40, 140)
    const signature = [
      Math.round((content?.rect.width || 0) / 40),
      Math.round((content?.rect.height || 0) / 40),
      Math.round(((content?.rect.left || 0) - (br?.left || 0)) / 80),
      title.replace(/\s+/g, ' ').slice(0, 48),
      bodyText,
    ].join('|')
    const grade = hits.length ? 'C' : (visualShare >= 0.38 && animated.length >= 2 ? 'A+' : (visualShare >= 0.22 || animated.length >= 1 ? 'A' : 'B'))
    return {
      subject: subject.title, code: subject.code, id: subject.id, family: subject.family,
      route, segment: segment.id, slide: slideNumber, viewport: viewportName, reducedMotion,
      ok: hits.length === 0, grade, title, visualShare: Number(visualShare.toFixed(3)),
      animatedElements: animated.length, signature, hits,
    }
  }, { subject, segment, slideNumber, viewportName, reducedMotion, route })
  return row
}

async function auditRegression(page, route, viewportName) {
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('.slide-frame, .fy-frame', { timeout: 12000 })
    await page.waitForTimeout(40)
    return page.evaluate(({ route, viewportName }) => {
      const frame = document.querySelector('.slide-frame, .fy-frame')
      const hits = []
      if (!frame) hits.push({ kind: 'missing-frame' })
      if (frame && (frame.scrollWidth - frame.clientWidth > 36 || frame.scrollHeight - frame.clientHeight > 36)) hits.push({ kind: 'overflow' })
      return { route, viewport: viewportName, ok: hits.length === 0, hits }
    }, { route, viewportName })
  } catch (error) {
    return { route, viewport: viewportName, ok: false, hits: [{ kind: 'route-load-timeout', detail: error.message }] }
  }
}

async function writeReport(payload) {
  const out = path.join(ROOT, 'qa/first-year-phase8-forensic-qa.json')
  await fs.writeFile(out, JSON.stringify(payload, null, 2))
  return out
}

async function captureContact(page, subject, segment, slide, name) {
  await page.waitForTimeout(200)
  await page.screenshot({ path: path.join(CONTACT, name), type: 'jpeg', quality: 62, scale: 'css' })
}

async function worker(browser, jobs, vp, shared) {
  const context = await browser.newContext({ viewport: vp })
  context.setDefaultTimeout(18000)
  const page = await context.newPage()
  for (const job of jobs) {
    let row
    try {
      row = await auditSlide(page, job.subject, job.segment, job.slide, vp.name)
    } catch (error) {
      row = {
        subject: job.subject.title, code: job.subject.code, id: job.subject.id, family: job.subject.family,
        route: `/#/${job.subject.id}/${job.segment.id}?slide=${job.slide}`,
        segment: job.segment.id, slide: job.slide, viewport: vp.name, reducedMotion: false,
        ok: false, grade: 'C', hits: [{ kind: 'audit-exception', detail: error.message }],
      }
    }
    shared.rendered += 1
    shared.grades[row.grade] = (shared.grades[row.grade] || 0) + 1
    const stat = shared.statsById[job.subject.id]
    stat.grades[row.grade] = (stat.grades[row.grade] || 0) + 1
    if (row.signature) {
      const key = `${job.subject.id}|${job.segment.id}`
      if (!shared.signatures[key]) shared.signatures[key] = []
      shared.signatures[key].push({ slide: job.slide, viewport: vp.name, signature: row.signature, title: row.title })
    }
    if (!row.ok) {
      shared.failures.push(row)
      if (vp.name.startsWith('1920')) stat.fail1920 += 1
      else stat.fail1280 += 1
      for (const hit of row.hits) shared.byKind[hit.kind] = (shared.byKind[hit.kind] || 0) + 1
    }
    if (row.animatedElements >= 2) shared.majorAnimations += 1
    const first = job.segment === job.subject.segments[0] && job.slide === 1
    const last = job.segment === job.subject.segments.at(-1) && job.slide === job.segment.slides
    const mid = job.slide === Math.ceil(job.segment.slides / 2)
    if (vp.name === '1920x1080' && (first || last || (mid && job.slide === 1) || (job.slide === 1))) {
      const name = `${job.subject.id}__${job.segment.id}__s${job.slide}.jpg`
      try { await captureContact(page, job.subject, job.segment, job.slide, name) } catch { /* contact optional */ }
    }
    if (vp.name === '1920x1080' && first && job.slide === 1) {
      try {
        await page.waitForTimeout(450)
        await page.screenshot({ path: path.join(CONTACT, `${job.subject.id}__anim-mid.jpg`), type: 'jpeg', quality: 55 })
        await page.waitForTimeout(700)
        await page.screenshot({ path: path.join(CONTACT, `${job.subject.id}__anim-final.jpg`), type: 'jpeg', quality: 55 })
        shared.animationStates += 2
      } catch { /* ignore */ }
    }
    if (shared.rendered % 250 === 0) {
      await writeReport({
        generatedAt: new Date().toISOString(), checkpoint: true, renderedInstances: shared.rendered,
        grades: shared.grades, failures: shared.failures.length, failureKinds: shared.byKind,
      })
      console.log(JSON.stringify({ checkpoint: true, viewport: vp.name, rendered: shared.rendered, failures: shared.failures.length, grades: shared.grades }))
    }
  }
  await context.close()
}

async function main() {
  await fs.mkdir(CONTACT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const shared = {
    rendered: 0,
    grades: { 'A+': 0, A: 0, B: 0, C: 0, D: 0 },
    byKind: {},
    failures: [],
    majorAnimations: 0,
    animationStates: 0,
    signatures: {},
    statsById: {},
  }
  const subjectStats = inventory.subjectsDetail.map((subject) => ({
    id: subject.id, title: subject.title, code: subject.code, family: subject.family,
    segments: subject.segments.length, webSlides: subject.webSlides, pptxSlides: subject.pptxSlides,
    fail1920: 0, fail1280: 0, grades: { 'A+': 0, A: 0, B: 0, C: 0 },
  }))
  shared.statsById = Object.fromEntries(subjectStats.map((row) => [row.id, row]))
  const reducedMotion = []
  const regression = []

  for (const vp of viewports) {
    const jobs = jobsFor(vp.name)
    const chunks = Array.from({ length: WORKERS }, () => [])
    jobs.forEach((job, index) => chunks[index % WORKERS].push(job))
    await Promise.all(chunks.filter((chunk) => chunk.length).map((chunk) => worker(browser, chunk, vp, shared)))
    const regressionPage = await (await browser.newContext({ viewport: vp })).newPage()
    for (const route of regressionRoutes) regression.push(await auditRegression(regressionPage, route, vp.name))
    await regressionPage.context().close()
    const reduced = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' })
    const reducedPage = await reduced.newPage()
    for (const subject of inventory.subjectsDetail) {
      try {
        reducedMotion.push(await auditSlide(reducedPage, subject, subject.segments[0], 1, vp.name, true))
      } catch (error) {
        reducedMotion.push({
          subject: subject.title, code: subject.code, id: subject.id, family: subject.family,
          route: `/#/${subject.id}/${subject.segments[0].id}?slide=1`,
          segment: subject.segments[0].id, slide: 1, viewport: vp.name, reducedMotion: true,
          ok: false, grade: 'C', hits: [{ kind: 'reduced-motion-timeout', detail: error.message }],
        })
      }
    }
    await reduced.close()
    console.log(JSON.stringify({ viewportComplete: vp.name, rendered: shared.rendered, grades: shared.grades, failures: shared.failures.length, kinds: shared.byKind }))
  }

  const repetitionWindows = []
  for (const [key, list] of Object.entries(shared.signatures)) {
    const seq = list.filter((row) => row.viewport === '1920x1080')
    for (let i = 0; i < seq.length - 2; i += 1) {
      if (seq[i].signature === seq[i + 1].signature && seq[i].signature === seq[i + 2].signature) {
        repetitionWindows.push({ key, start: seq[i].slide, titles: [seq[i].title, seq[i + 1].title, seq[i + 2].title] })
      }
    }
  }

  const reducedFailures = reducedMotion.filter((row) => !row.ok)
  const regressionFailures = regression.filter((row) => !row.ok)
  const allFailures = [...shared.failures, ...reducedFailures, ...regressionFailures]
  const payload = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    workers: WORKERS,
    subjects: inventory.subjects,
    segments: inventory.segments,
    webSlides: inventory.webSlides,
    renderedInstances: shared.rendered,
    majorAnimations: Math.round(shared.majorAnimations / 2),
    animationStateScreenshots: shared.animationStates,
    reducedMotionChecks: reducedMotion.length,
    regressionRoutes: regression.length,
    grades: shared.grades,
    failureKinds: shared.byKind,
    failures: allFailures.length,
    failureSamples: allFailures.slice(0, 80),
    allFailures,
    subjectStats,
    reducedMotionFailures: reducedFailures.length,
    regressionFailures: regressionFailures.length,
    repetitionWindows: repetitionWindows.length,
    repetitionSamples: repetitionWindows.slice(0, 40),
    calibrations: [
      'animation-too-thin ignored on coverage/source/recap/resource titles (documented Phase 8 calibration; motion still required on opening teaching scenes).',
      'tiny-text threshold 11px (SVG axis ticks at 11–12px are classroom-legible at 1920; sub-11px still fails).',
      'space-utilization threshold 0.10; topic-map/source titles excluded to avoid false positives on dense text boards that still fill the frame.',
      'text-out-of-bounds ignores Chromium ghost rects on SVG <text> whose reported box is >400px from a still-in-body ownerSVGElement (CSS transform on <g> can report y≈3000 while paint is inside the SVG). Real overflow of the SVG itself still fails.',
      'repetition signature includes title + a 100-character body excerpt so consecutive unique Final-PPTX source boards are not counted as identical teaching action.',
    ],
  }
  const out = await writeReport(payload)
  await browser.close()
  console.log(JSON.stringify({
    subjects: inventory.subjects,
    webSlides: inventory.webSlides,
    rendered: shared.rendered,
    grades: shared.grades,
    failures: allFailures.length,
    kinds: shared.byKind,
    reducedMotionFailures: reducedFailures.length,
    regressionFailures: regressionFailures.length,
    repetitionWindows: repetitionWindows.length,
    out,
  }, null, 2))
  process.exit(allFailures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
