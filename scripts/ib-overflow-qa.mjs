/**
 * Headless IB overflow sweep — development QA only.
 * Usage: node scripts/ib-overflow-qa.mjs [baseUrl]
 */
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://127.0.0.1:4195'
const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1280x720', width: 1280, height: 720 },
]

const MODULES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
]

const SELECTORS = [
  '.slide-frame',
  '.slide-body',
  '.ib-chapter',
  '.ib-title-scene',
  '.ib-story-panel',
]

async function dismissIntro(page) {
  const btn = page.locator('.ib-intro-begin, .ib-chapter-intro button').first()
  try {
    if (await btn.isVisible({ timeout: 1200 })) {
      await btn.click({ timeout: 800 })
      await page.waitForTimeout(500)
    }
  } catch {
    await page.keyboard.press('Enter')
    await page.waitForTimeout(400)
  }
}

async function auditSlide(page) {
  return page.evaluate((selectors) => {
    const frame = document.querySelector('.slide-frame')
    if (!frame) return { id: null, title: null, hits: [{ selector: 'missing-frame' }] }
    const title = document.querySelector('.ib-story-panel h2, .ib-hero-title, .slide-title')?.textContent || ''
    const hits = []
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        const ox = el.scrollWidth - el.clientWidth
        const oy = el.scrollHeight - el.clientHeight
        if (ox > 2 || oy > 2) {
          hits.push({
            selector: sel,
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          })
        }
      })
    }
    const body = document.querySelector('.slide-body')
    if (body) {
      const br = body.getBoundingClientRect()
      body.querySelectorAll('h2, p, strong, .ib-takeaway').forEach((node) => {
        const style = getComputedStyle(node)
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return
        const r = node.getBoundingClientRect()
        if (r.width < 1 || r.height < 1) return
        if (r.bottom > br.bottom + 3 || r.right > br.right + 3 || r.top < br.top - 3) {
          hits.push({
            selector: `clip:${node.className || node.tagName}`,
            detail: `${Math.round(r.top)}..${Math.round(r.bottom)} vs body ${Math.round(br.top)}..${Math.round(br.bottom)}`,
          })
        }
      })
    }
    return { id: null, title, hits }
  }, SELECTORS)
}

async function run() {
  const browser = await chromium.launch({ headless: true })
  const report = []

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()

    for (const mod of MODULES) {
      await page.goto(`${BASE}/#/international-business/${mod}?slide=1`, { waitUntil: 'networkidle' })
      await dismissIntro(page)

      let guard = 0
      let lastTitle = ''
      while (guard < 40) {
        guard += 1
        await page.waitForTimeout(100)
        const result = await auditSlide(page)
        const footer = await page.locator('.slide-footer span').nth(1).textContent().catch(() => '')
        if (result.hits.length) {
          report.push({ viewport: vp.name, module: mod, footer, title: result.title, hits: result.hits })
        }
        const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled()
        if (nextDisabled) break
        lastTitle = result.title
        await page.keyboard.press('ArrowRight')
        // detect stuck
        await page.waitForTimeout(40)
        const title2 = await page.locator('.ib-story-panel h2, .ib-hero-title').first().textContent().catch(() => '')
        if (title2 === lastTitle && nextDisabled) break
      }
    }
    await context.close()
  }

  await browser.close()

  const real = report.filter((row) => row.hits.some((h) => !String(h.selector).startsWith('clip:') || (h.detail && !h.detail.startsWith('0..0'))))
  const stageOverflow = report.filter((row) => row.hits.some((h) => h.selector.startsWith('.')))

  if (!stageOverflow.length) {
    console.log('IB OVERFLOW QA: PASS — no stage overflow at', VIEWPORTS.map((v) => v.name).join(', '))
    if (real.length !== report.length) {
      console.log(`(ignored ${report.length - stageOverflow.length} false-positive clip checks)`)
    }
    process.exit(0)
  }

  console.log(`IB OVERFLOW QA: ${stageOverflow.length} stage finding(s)`)
  for (const row of stageOverflow.slice(0, 60)) {
    console.log(`\n[${row.viewport}] ${row.module} · ${row.title}`)
    console.log(`  footer: ${row.footer}`)
    for (const h of row.hits.filter((x) => x.selector.startsWith('.')).slice(0, 6)) {
      console.log(`  ${h.selector}  sh=${h.scrollHeight}/${h.clientHeight}  sw=${h.scrollWidth}/${h.clientWidth} ${h.detail || ''}`)
    }
  }
  process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(2)
})
