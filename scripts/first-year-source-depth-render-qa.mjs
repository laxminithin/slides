import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:4173'
const WORKERS = Number(process.env.DEPTH_WORKERS || 8)
const CONTACT = path.join(ROOT, 'qa-contact-sheets/first-year-source-depth')
const inventory = JSON.parse(await fs.readFile(path.join(ROOT, 'qa/first-year-phase8-inventory.json'), 'utf8'))

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
]

const LEAK_RE = /(?:final\s+pptx\s+teaching\s+block|pptx\s+teaching\s+block|pptx\s+teaching\s+depth|pptx\s+depth\s+block|source\s+teaching\s+block|finalized\s+pptx\s+slides|pptx\s+slides\s+\d|teaching\s+block\s+\d+(?:\s*[-–]\s*\d+)?|source\s+block\s+\d+|final\s+source\s+section|teaching\s+source\s+section|pptx\s+source\s+content)/i

const regressionRoutes = [
  '/#/chemistry/module-1?slide=1',
  '/#/differential-calculus-linear-algebra-1bmatc101/module-1?slide=1',
  '/#/quantum-physics-applications-1bphys102-202/module-1?slide=1',
  '/#/python-programming-1bplc105b-205b/module-1?slide=1',
  '/#/basics-electrical-engineering-1bbee105-205/module-1?slide=1',
  '/#/fundamentals-electronics-communication-1bece105-205/module-1?slide=1',
  '/#/computer-aided-engineering-drawing-cv-1bcedc103-203/module-1?slide=1',
  '/#/indian-constitution-engineering-ethics-1bico107-207/module-1?slide=1',
  '/#/balake-kannada-1bkbk109/module-1?slide=1',
  '/#/basic-electrical-lab-1bbeel107/experiment-1?slide=1',
  '/#/c-programming-lab-1bpopl107-207/experiment-1?slide=1',
  '/#/interdisciplinary-project-work-1bprj258/stage-1?slide=1',
  '/#/applied-chemistry-sustainable-structures-1bchec102-202/module-1?slide=1',
  '/#/__first-year-foundation?scene=5',
]

function isLabSubject(subject) {
  return subject.accent === 'first-year-lab' || subject.prefix === 'experiment'
}

function sourceSlideNumbers(subject, segment) {
  const n = Number(segment.sourceBlocks) || 0
  if (!n) return []
  if (isLabSubject(subject)) {
    return Array.from({ length: n }, (_, i) => 3 + i)
  }
  const start = segment.slides - n
  return Array.from({ length: n }, (_, i) => start + i)
}

function samplePositions(numbers) {
  if (!numbers.length) return []
  const picks = new Set([
    numbers[0],
    numbers[Math.floor((numbers.length - 1) * 0.25)],
    numbers[Math.floor((numbers.length - 1) * 0.5)],
    numbers[Math.floor((numbers.length - 1) * 0.75)],
    numbers[numbers.length - 1],
  ])
  return [...picks].filter(Boolean)
}

function sourceJobs(viewportName) {
  const jobs = []
  for (const subject of inventory.subjectsDetail) {
    for (const segment of subject.segments) {
      const numbers = sourceSlideNumbers(subject, segment)
      const samples = new Set(samplePositions(numbers))
      for (const slide of numbers) {
        jobs.push({
          kind: 'source',
          subject,
          segment,
          slide,
          viewportName,
          capture: viewportName === '1920x1080' && samples.has(slide),
        })
      }
    }
  }
  return jobs
}

function moduleFlowJobs(viewportName) {
  const jobs = []
  for (const subject of inventory.subjectsDetail) {
    if (subject.family === 'chemistry-preserved') continue
    for (const segment of subject.segments) {
      if (!segment.sourceBlocks) continue
      jobs.push({ kind: 'module-first', subject, segment, slide: 1, viewportName, capture: false })
      jobs.push({ kind: 'module-last', subject, segment, slide: segment.slides, viewportName, capture: false })
    }
  }
  return jobs
}

async function audit(page, job) {
  const route = `/#/${job.subject.id}/${job.segment.id}?slide=${job.slide}`
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
  try {
    await page.waitForSelector('.slide-frame, .fy-frame, .subject-cover', { timeout: 14000 })
  } catch (error) {
    return { ...job, route, ok: false, hits: [{ kind: 'route-load-timeout', detail: error.message }] }
  }
  const row = await page.evaluate(({ route, leakSource, expectedSlide, expectSource, moduleKind }) => {
    const leakRe = new RegExp(leakSource, 'i')
    const frame = document.querySelector('.slide-frame, .fy-frame')
    const body = document.querySelector('.slide-body, .fy-body')
    const footerEl = [...document.querySelectorAll('.slide-footer, .fy-footer')]
      .find((el) => {
        const cs = getComputedStyle(el)
        return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getBoundingClientRect().height > 4
      })
    const source = document.querySelector('.fy-source-block')
    const title = document.querySelector('.slide-title, .fy-header h1, .fy-source-block h2')?.textContent?.trim() || ''
    const subtitle = document.querySelector('.slide-subtitle, .fy-subtitle')?.textContent?.trim() || ''
    const lead = document.querySelector('.fy-source-lead')?.textContent?.trim() || ''
    const points = [...document.querySelectorAll('.fy-source-grid p')].map((n) => n.textContent.trim()).filter(Boolean)
    const visible = `${title}\n${subtitle}\n${lead}\n${points.join('\n')}\n${body?.innerText || ''}`
    const hits = []
    const fail = (kind, detail) => hits.push({ kind, detail })
    if (!frame) fail('missing-frame', 'No slide frame')
    if (leakRe.test(visible) || leakRe.test(footerEl?.textContent || '')) {
      fail('placeholder-leak', visible.replace(/\s+/g, ' ').trim().slice(0, 160))
    }
    if (/\bslides?\s+\d+\s*[-–]\s*\d+\b/i.test(`${title}\n${subtitle}\n${lead}`) && /pptx|source|teaching block/i.test(`${title}\n${subtitle}`)) {
      fail('source-range-visible', `${title} | ${subtitle}`.slice(0, 120))
    }
    if (expectSource && !source) fail('missing-source-block', `expected source-depth at slide ${expectedSlide}`)
    if (expectSource && source && !source.getAttribute('data-source-slides')) fail('missing-source-range-metadata', 'data-source-slides absent')
    if (moduleKind === 'module-last') {
      const footer = footerEl?.textContent || ''
      if (footer && /slide\s+\d+/i.test(footer) && !new RegExp(`Slide\\s+${expectedSlide}`, 'i').test(footer)) {
        fail('wrong-slide', footer.trim().slice(0, 80))
      }
    }
    if (frame && (frame.scrollWidth - frame.clientWidth > 28 || frame.scrollHeight - frame.clientHeight > 28)) {
      fail('frame-overflow', `${frame.scrollWidth}x${frame.scrollHeight}`)
    }
    if (body && (body.scrollWidth - body.clientWidth > 32 || body.scrollHeight - body.clientHeight > 32)) {
      fail('body-overflow', `${body.scrollWidth}x${body.scrollHeight}`)
    }
    const br = body?.getBoundingClientRect()
    const fr = footerEl?.getBoundingClientRect()
    const content = source || document.querySelector('[data-slide-content="true"]')
    const cr = content?.getBoundingClientRect()
    if (br && fr && cr && cr.bottom - fr.top > 14) fail('footer-collision', `${Math.round(cr.bottom - fr.top)}px into footer`)
    const textNodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,strong,span,td,th,blockquote,code')] : []
    for (const node of textNodes) {
      const r = node.getBoundingClientRect()
      if (!r || r.width < 2 || r.height < 2) continue
      const px = Number.parseFloat(getComputedStyle(node).fontSize)
      if (px > 0 && px < 11) {
        fail('tiny-text', `${(node.textContent || '').trim().slice(0, 40)} ${px}px`)
        break
      }
    }
    const bodyArea = br ? br.width * br.height : 1
    const visualShare = cr && br ? (cr.width * cr.height) / bodyArea : 0
    if (expectSource && cr && br && visualShare < 0.18) fail('space-utilization', `visualShare ${visualShare.toFixed(3)}`)
    return {
      route,
      title,
      sourceRange: source?.getAttribute('data-source-slides') || '',
      pointCount: points.length,
      lead: lead.slice(0, 160),
      visualShare: Number(visualShare.toFixed(3)),
      ok: hits.length === 0,
      hits,
    }
  }, {
    route,
    leakSource: LEAK_RE.source,
    expectedSlide: job.slide,
    expectSource: job.kind === 'source',
    moduleKind: job.kind,
  })

  if (job.capture && row.ok) {
    const name = `${job.subject.id}__${job.segment.id}__s${job.slide}.jpg`
    try {
      const shot = (await page.$('.slide-frame, .fy-frame')) || page
      await shot.screenshot({ path: path.join(CONTACT, name), type: 'jpeg', quality: 52 })
      row.contact = name
    } catch {
      row.contact = null
    }
  }
  return row
}

async function worker(browser, jobs, vp, shared) {
  const context = await browser.newContext({ viewport: vp })
  context.setDefaultTimeout(16000)
  const page = await context.newPage()
  for (const job of jobs) {
    let row
    try {
      row = await audit(page, job)
    } catch (error) {
      row = { ...job, ok: false, hits: [{ kind: 'audit-exception', detail: error.message }] }
    }
    shared.rendered += 1
    if (job.kind === 'source') shared.sourceRendered += 1
    else shared.moduleFlowRendered += 1
    if (!row.ok) {
      shared.failures.push({
        subject: job.subject.title,
        code: job.subject.code,
        family: job.subject.family,
        segment: job.segment.id,
        slide: job.slide,
        viewport: vp.name,
        jobKind: job.kind,
        ...row,
      })
      for (const hit of row.hits || []) shared.byKind[hit.kind] = (shared.byKind[hit.kind] || 0) + 1
    }
    if (shared.rendered % 200 === 0) {
      console.log(JSON.stringify({
        checkpoint: true,
        viewport: vp.name,
        rendered: shared.rendered,
        failures: shared.failures.length,
        kinds: shared.byKind,
      }))
    }
  }
  await context.close()
}

async function auditRegression(page, route, viewportName) {
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('.slide-frame, .fy-frame, .subject-cover, h1', { timeout: 14000 })
  } catch (error) {
    return { route, viewport: viewportName, ok: false, hits: [{ kind: 'route-load-timeout', detail: error.message }] }
  }
  return page.evaluate(({ route, viewportName, leakSource }) => {
    const leakRe = new RegExp(leakSource, 'i')
    const frame = document.querySelector('.slide-frame, .fy-frame, .subject-cover')
    const text = document.body?.innerText || ''
    const hits = []
    if (!frame && !document.querySelector('h1')) hits.push({ kind: 'missing-frame' })
    if (leakRe.test(text)) hits.push({ kind: 'placeholder-leak', detail: text.replace(/\s+/g, ' ').slice(0, 140) })
    if (frame && (frame.scrollWidth - frame.clientWidth > 28 || frame.scrollHeight - frame.clientHeight > 28)) {
      hits.push({ kind: 'frame-overflow', detail: `${frame.scrollWidth}x${frame.scrollHeight}` })
    }
    return { route, viewport: viewportName, title: document.querySelector('h1')?.textContent?.trim() || '', ok: hits.length === 0, hits }
  }, { route, viewportName, leakSource: LEAK_RE.source })
}

async function writeContactIndex(files) {
  const bySubject = {}
  for (const file of files) {
    const id = file.split('__')[0]
    if (!bySubject[id]) bySubject[id] = []
    bySubject[id].push(file)
  }
  const page = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<style>
body{font:15px/1.45 "Source Sans 3",system-ui,sans-serif;margin:24px;background:#0f172a;color:#e2e8f0}
a{color:#7dd3fc} h1,h2{font-weight:800}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
figure{margin:0;background:#1e293b;border-radius:12px;overflow:hidden;outline:3px solid #38bdf8}
img{width:100%;display:block;background:#020617}
figcaption{padding:8px 10px;font-size:12px}
.note{color:#94a3b8;max-width:52rem}
</style></head><body>${body}</body></html>`
  await fs.writeFile(path.join(CONTACT, 'index.html'), page('Source-depth contact sheets (QA only)', `
<h1>Source-depth contact sheets</h1>
<p class="note">QA-only. Production slides do not mark source-depth boards. Cyan outline is the QA contact-sheet cue.</p>
<p>${inventory.subjects} subjects · ${files.length} captured source-depth frames (first / 25% / 50% / 75% / last per affected module).</p>
<ul>${inventory.subjectsDetail.filter((s) => s.segments.some((seg) => seg.sourceBlocks)).map((s) => `<li><a href="${s.id}.html">${s.title} (${s.code})</a></li>`).join('')}</ul>
`))
  for (const subject of inventory.subjectsDetail) {
    const images = bySubject[subject.id] || []
    await fs.writeFile(path.join(CONTACT, `${subject.id}.html`), page(subject.title, `
<p><a href="index.html">All sheets</a></p>
<h1>${subject.title}</h1>
<p>${subject.code} · ${images.length} sampled source-depth frames</p>
<div class="grid">${images.map((file) => `<figure><img src="${file}" alt=""><figcaption>${file}</figcaption></figure>`).join('') || '<p>No source-depth slides.</p>'}</div>
`))
  }
}

async function main() {
  await fs.mkdir(CONTACT, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const shared = {
    rendered: 0,
    sourceRendered: 0,
    moduleFlowRendered: 0,
    failures: [],
    byKind: {},
  }

  for (const vp of viewports) {
    const jobs = [...sourceJobs(vp.name), ...moduleFlowJobs(vp.name)]
    const chunks = Array.from({ length: WORKERS }, () => [])
    jobs.forEach((job, index) => chunks[index % WORKERS].push(job))
    await Promise.all(chunks.filter((chunk) => chunk.length).map((chunk) => worker(browser, chunk, vp, shared)))
    const regressionPage = await (await browser.newContext({ viewport: vp })).newPage()
    for (const route of regressionRoutes) {
      const row = await auditRegression(regressionPage, route, vp.name)
      shared.regression = shared.regression || []
      shared.regression.push(row)
      if (!row.ok) {
        shared.failures.push({ jobKind: 'regression', viewport: vp.name, ...row })
        for (const hit of row.hits || []) shared.byKind[hit.kind] = (shared.byKind[hit.kind] || 0) + 1
      }
    }
    await regressionPage.context().close()
    console.log(JSON.stringify({
      viewportComplete: vp.name,
      rendered: shared.rendered,
      failures: shared.failures.length,
      kinds: shared.byKind,
    }))
  }

  const files = (await fs.readdir(CONTACT)).filter((name) => name.endsWith('.jpg'))
  await writeContactIndex(files)

  const sourceJobs1920 = sourceJobs('1920x1080').length
  const payload = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    workers: WORKERS,
    sourceDepthSlides: sourceJobs1920,
    renderedInstances: shared.rendered,
    sourceRendered: shared.sourceRendered,
    moduleFlowRendered: shared.moduleFlowRendered,
    regressionRoutes: (shared.regression || []).length,
    contactFrames: files.length,
    contactIndex: path.join(CONTACT, 'index.html'),
    failureKinds: shared.byKind,
    failures: shared.failures.length,
    failureSamples: shared.failures.slice(0, 80),
    qa: {
      placeholderLeakFailures: shared.failures.filter((row) => (row.hits || []).some((h) => h.kind === 'placeholder-leak')).length,
      render1920Failures: shared.failures.filter((row) => row.viewport === '1920x1080').length,
      render1280Failures: shared.failures.filter((row) => row.viewport === '1280x720').length,
      tinyTextFailures: shared.failures.filter((row) => (row.hits || []).some((h) => h.kind === 'tiny-text')).length,
      spaceUtilizationFailures: shared.failures.filter((row) => (row.hits || []).some((h) => h.kind === 'space-utilization')).length,
      regressionFailures: (shared.regression || []).filter((row) => !row.ok).length,
    },
  }
  const out = path.join(ROOT, 'qa/first-year-source-depth-render-qa.json')
  await fs.writeFile(out, JSON.stringify(payload, null, 2))
  await browser.close()
  console.log(JSON.stringify({ ...payload, failureSamples: payload.failureSamples.length, out }, null, 2))
  process.exit(shared.failures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
