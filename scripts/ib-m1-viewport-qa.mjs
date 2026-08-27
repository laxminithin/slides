/**
 * Module 1 multi-viewport overflow + label QA.
 * Usage: node scripts/ib-m1-viewport-qa.mjs [baseUrl]
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv[2] || 'http://127.0.0.1:4206'
const SLIDES = 21
const VIEWPORTS = [
  { w: 1920, h: 1080 },
  { w: 1600, h: 900 },
  { w: 1440, h: 900 },
  { w: 1366, h: 768 },
  { w: 1280, h: 720 },
]

const run = async () => {
  const browser = await chromium.launch()
  const failures = []
  const rows = []

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (let n = 1; n <= SLIDES; n++) {
      await page.goto(`${BASE}/#/international-business/module-1?slide=${n}&skipIntro=1`, { waitUntil: 'domcontentloaded' })
      await page.waitForSelector('.slide-frame', { timeout: 8000 })
      await page.waitForTimeout(500)
      const m = await page.evaluate(() => {
        const body = document.querySelector('.slide-body')
        if (!body) return { oy: 999, ox: 999, title: '', labels: 0, markers: 0 }
        const br = body.getBoundingClientRect()
        const oy = body.scrollHeight - body.clientHeight
        const ox = body.scrollWidth - body.clientWidth
        let maxB = 0
        let maxR = 0
        body.querySelectorAll('h1,h2,h3,p,strong,li,[data-slide-content="true"],.wm-name,.ib-takeaway').forEach((el) => {
          if (el.closest('[data-slide-decorative="true"],[data-overflow-allow="true"]')) return
          const r = el.getBoundingClientRect()
          maxB = Math.max(maxB, r.bottom - br.bottom)
          maxR = Math.max(maxR, r.right - br.right)
        })
        /* crude label collision: bounding boxes of .wm-name that overlap > 40% */
        const names = [...document.querySelectorAll('.wm-name')].map((t) => {
          const r = t.getBoundingClientRect()
          return { t: t.textContent, x: r.x, y: r.y, w: r.width, h: r.height }
        })
        let collisions = 0
        for (let i = 0; i < names.length; i++) {
          for (let j = i + 1; j < names.length; j++) {
            const a = names[i]; const b = names[j]
            const overlapX = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x))
            const overlapY = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y))
            if (overlapX > 8 && overlapY > 6) collisions++
          }
        }
        return {
          oy, ox, maxB: Math.round(maxB), maxR: Math.round(maxR),
          title: document.querySelector('.slide-title')?.textContent?.slice(0, 48) || '',
          labels: names.length,
          markers: document.querySelectorAll('.wm-marker').length,
          collisions,
        }
      })
      const fail = m.oy > 24 || m.ox > 24 || m.maxB > 8 || m.maxR > 8 || m.collisions > 0
      const key = `${vp.w}x${vp.h}#${n}`
      rows.push({ key, ...m, fail })
      if (fail) failures.push({ key, ...m })
      process.stdout.write(`${fail ? 'FAIL' : 'ok  '} ${key} oy=${m.oy} col=${m.collisions} ${m.title}\n`)
    }
    await page.close()
  }

  await browser.close()
  const report = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    slides: SLIDES,
    viewports: VIEWPORTS,
    failCount: failures.length,
    failures,
    sample: rows.filter((r) => r.labels > 0).slice(0, 12),
  }
  const out = path.join(ROOT, 'qa', 'ib-m1-viewport-qa.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify(report, null, 2))
  console.log(`\nReport → ${out}`)
  console.log(failures.length === 0 ? 'PASS — Module 1 clear across all viewports' : `FAIL — ${failures.length} issues`)
  process.exit(failures.length === 0 ? 0 : 1)
}

run().catch((e) => { console.error(e); process.exit(1) })
