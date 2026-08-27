import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:4173'
const WORKERS = Number(process.env.LEAK_WORKERS || 8)
const inventory = JSON.parse(await fs.readFile(path.join(ROOT, 'qa/first-year-phase8-inventory.json'), 'utf8'))

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
]

const LEAK_RE = /(?:final\s+pptx\s+teaching\s+block|pptx\s+teaching\s+block|pptx\s+teaching\s+depth|pptx\s+depth\s+block|source\s+teaching\s+block|finalized\s+pptx\s+slides|pptx\s+slides\s+\d|teaching\s+block\s+\d+(?:\s*[-–]\s*\d+)?|source\s+block\s+\d+|final\s+source\s+section|teaching\s+source\s+section|pptx\s+source\s+content)/i

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

async function audit(page, job) {
  const route = `/#/${job.subject.id}/${job.segment.id}?slide=${job.slide}`
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
  try {
    await page.waitForSelector('.slide-frame, .fy-frame', { timeout: 12000 })
  } catch (error) {
    return { ...job, route, ok: false, hits: [{ kind: 'route-load-timeout', detail: error.message }] }
  }
  return page.evaluate(({ route, leakSource }) => {
    const leakRe = new RegExp(leakSource, 'i')
    const frame = document.querySelector('.slide-frame, .fy-frame')
    const body = document.querySelector('.slide-body, .fy-body')
    const title = document.querySelector('.slide-title, .fy-header h1')?.textContent?.trim() || ''
    const subtitle = document.querySelector('.slide-subtitle, .fy-subtitle')?.textContent?.trim() || ''
    const text = `${title}\n${subtitle}\n${body?.innerText || ''}`
    const hits = []
    if (!frame) hits.push({ kind: 'missing-frame' })
    if (leakRe.test(text)) hits.push({ kind: 'placeholder-leak', detail: text.replace(/\s+/g, ' ').trim().slice(0, 160) })
    if (frame && (frame.scrollWidth - frame.clientWidth > 28 || frame.scrollHeight - frame.clientHeight > 28)) {
      hits.push({ kind: 'frame-overflow', detail: `${frame.scrollWidth}x${frame.scrollHeight}` })
    }
    return { route, title, ok: hits.length === 0, hits }
  }, { route, leakSource: LEAK_RE.source })
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
    if (!row.ok) {
      shared.failures.push({
        subject: job.subject.title,
        code: job.subject.code,
        family: job.subject.family,
        segment: job.segment.id,
        slide: job.slide,
        viewport: vp.name,
        ...row,
      })
      for (const hit of row.hits || []) shared.byKind[hit.kind] = (shared.byKind[hit.kind] || 0) + 1
    }
  }
  await context.close()
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const shared = { rendered: 0, failures: [], byKind: {} }
  for (const vp of viewports) {
    const jobs = jobsFor(vp.name)
    const chunks = Array.from({ length: WORKERS }, () => [])
    jobs.forEach((job, index) => chunks[index % WORKERS].push(job))
    await Promise.all(chunks.filter((chunk) => chunk.length).map((chunk) => worker(browser, chunk, vp, shared)))
    console.log(JSON.stringify({ viewportComplete: vp.name, rendered: shared.rendered, failures: shared.failures.length, kinds: shared.byKind }))
  }
  const payload = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    renderedInstances: shared.rendered,
    placeholderLeakFailures: (shared.byKind['placeholder-leak'] || 0),
    render1920Failures: shared.failures.filter((row) => row.viewport === '1920x1080').length,
    render1280Failures: shared.failures.filter((row) => row.viewport === '1280x720').length,
    failureKinds: shared.byKind,
    failureSamples: shared.failures.slice(0, 60),
  }
  const out = path.join(ROOT, 'qa/first-year-placeholder-leak-render-qa.json')
  await fs.writeFile(out, JSON.stringify(payload, null, 2))
  await browser.close()
  console.log(JSON.stringify({ ...payload, failureSamples: payload.failureSamples.length, out }, null, 2))
  process.exit(shared.failures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
