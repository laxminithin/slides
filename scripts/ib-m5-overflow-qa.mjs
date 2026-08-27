/**
 * Module 5–only overflow sweep across required viewports.
 * Usage: node scripts/ib-m5-overflow-qa.mjs [baseUrl]
 */
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://127.0.0.1:5173'
const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1600x900', width: 1600, height: 900 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1280x720', width: 1280, height: 720 },
]
const SLIDES = 48
const SELECTORS = ['.slide-frame', '.slide-body', '.ib-chapter', '.ib-title-scene', '.ib-story-panel', '.ib-visual-panel']

async function dismissIntro(page) {
  try {
    const btn = page.locator('.ib-intro-begin, .ib-chapter-intro button').first()
    if (await btn.isVisible({ timeout: 800 })) await btn.click({ timeout: 500 })
  } catch { /* none */ }
}

async function audit(page) {
  return page.evaluate((selectors) => {
    const hits = []
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        const ox = el.scrollWidth - el.clientWidth
        const oy = el.scrollHeight - el.clientHeight
        if (ox > 2 || oy > 2) {
          hits.push({ selector: sel, ox, oy, scrollHeight: el.scrollHeight, clientHeight: el.clientHeight })
        }
      })
    }
    return hits
  }, SELECTORS)
}

const run = async () => {
  const browser = await chromium.launch({ headless: true })
  const report = []
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (let n = 1; n <= SLIDES; n++) {
      await page.goto(`${BASE}/#/international-business/module-5?slide=${n}&skipIntro=1`, { waitUntil: 'networkidle' })
      await dismissIntro(page)
      await page.waitForTimeout(350)
      const hits = await audit(page)
      const title = await page.locator('.ib-story-panel h2, .m5o-title, .ib-hero-emotion').first().textContent().catch(() => '')
      if (hits.length) report.push({ viewport: vp.name, slide: n, title: title?.trim(), hits })
      process.stdout.write(`${vp.name} ${n}/${SLIDES}   \r`)
    }
    await context.close()
  }
  await browser.close()
  console.log(`\nModule 5 overflow hits: ${report.length}`)
  if (report.length) {
    console.log(JSON.stringify(report.slice(0, 40), null, 2))
    process.exitCode = 1
  } else {
    console.log('PASS — no overflow at required viewports')
  }
}

run().catch((e) => { console.error(e); process.exit(1) })
