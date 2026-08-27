import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.argv.find((arg) => arg.startsWith('http')) || 'http://127.0.0.1:5173'

const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1280x720', width: 1280, height: 720 },
]

const smokeRoutes = [
  '/#/chemistry/module-1?slide=1',
  '/#/big-data-analytics/module-1?slide=1',
  '/#/database-management-systems/module-1?slide=1',
]

async function auditFoundationScene(page, scene, viewportName, reducedMotion = false) {
  const url = `${BASE}/#/__first-year-foundation?scene=${scene}`
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.fy-frame', { timeout: 10000 })
  await page.waitForTimeout(reducedMotion ? 120 : 1200)

  return page.evaluate(({ scene, viewportName, reducedMotion }) => {
    const frame = document.querySelector('.fy-frame')
    const body = document.querySelector('.fy-body')
    const visual = document.querySelector('.fy-visual-zone')
    const title = document.querySelector('.fy-header h1')
    const animated = [...document.querySelectorAll('.fy-frame *')].filter((el) => {
      const cs = getComputedStyle(el)
      return cs.animationName !== 'none' && Number.parseFloat(cs.animationDuration) > 0
    })
    const rect = (el) => el?.getBoundingClientRect?.()
    const fr = rect(frame)
    const br = rect(body)
    const vr = rect(visual)
    const titleCs = title ? getComputedStyle(title) : null
    const hits = []
    const fail = (kind, detail) => hits.push({ kind, detail })

    if (!frame || !body) fail('missing-frame', 'Foundation frame/body missing')
    if (frame && (frame.scrollWidth - frame.clientWidth > 4 || frame.scrollHeight - frame.clientHeight > 4)) {
      fail('frame-scroll', `${frame.scrollWidth}x${frame.scrollHeight} vs ${frame.clientWidth}x${frame.clientHeight}`)
    }
    if (body && (body.scrollWidth - body.clientWidth > 8 || body.scrollHeight - body.clientHeight > 8)) {
      fail('body-scroll', `${body.scrollWidth}x${body.scrollHeight} vs ${body.clientWidth}x${body.clientHeight}`)
    }
    if (title && titleCs && Number.parseFloat(titleCs.fontSize) < 34) {
      fail('title-too-small', titleCs.fontSize)
    }
    const textNodes = body ? [...body.querySelectorAll('h1,h2,h3,p,li,strong,span,code,text')] : []
    for (const node of textNodes) {
      const r = rect(node)
      if (!r || r.width < 2 || r.height < 2) continue
      if (br && (r.right - br.right > 12 || r.bottom - br.bottom > 12 || br.left - r.left > 12 || br.top - r.top > 12)) {
        fail('text-bounds', node.textContent?.trim()?.slice(0, 60) || node.tagName)
        break
      }
      const cs = getComputedStyle(node)
      const px = Number.parseFloat(cs.fontSize)
      if (node.tagName.toLowerCase() !== 'text' && px > 0 && px < 13) {
        fail('tiny-text', `${node.textContent?.trim()?.slice(0, 40)} ${px}px`)
        break
      }
    }
    const visualShare = br && vr ? (vr.width * vr.height) / (br.width * br.height) : 0
    if ([1, 2, 3, 5, 7].includes(scene) && visualShare < 0.37) {
      fail('visual-too-small', `${Math.round(visualShare * 100)}%`)
    }
    if (!reducedMotion && animated.length < 4) {
      fail('animation-missing', `animated elements: ${animated.length}`)
    }
    if (reducedMotion && document.querySelectorAll('svg,pre,.fy-equation-stepper,.fy-numerical-board,.fy-experiment').length < 1) {
      fail('reduced-motion-blank', 'No teaching surface visible')
    }
    return {
      viewport: viewportName,
      scene,
      reducedMotion,
      ok: hits.length === 0,
      title: title?.textContent?.trim() || '',
      visualShare: Math.round(visualShare * 1000) / 10,
      animatedElements: animated.length,
      hits,
    }
  }, { scene, viewportName, reducedMotion })
}

async function screenshot(page, name) {
  const dir = path.join(ROOT, 'qa', 'first-year-foundation')
  await fs.mkdir(dir, { recursive: true })
  await page.locator('.fy-frame, .slide-frame').first().screenshot({
    path: path.join(dir, `${name}.png`),
    animations: 'disabled',
  }).catch(() => {})
}

async function smokeExistingRoute(page, route, viewportName) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.slide-frame', { timeout: 12000 })
  await page.waitForTimeout(700)
  return page.evaluate(({ route, viewportName }) => {
    const frame = document.querySelector('.slide-frame')
    const footer = document.querySelector('.slide-footer')?.textContent || ''
    const title = document.querySelector('.slide-title')?.textContent || ''
    const hits = []
    if (!frame) hits.push({ kind: 'missing-frame' })
    if (frame && (frame.scrollWidth - frame.clientWidth > 30 || frame.scrollHeight - frame.clientHeight > 30)) {
      hits.push({ kind: 'frame-scroll' })
    }
    if (!footer.includes('Slide 1')) hits.push({ kind: 'not-slide-1', footer })
    return { route, viewport: viewportName, ok: hits.length === 0, title: title.trim(), footer: footer.trim(), hits }
  }, { route, viewportName })
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const report = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    foundation: [],
    reducedMotion: [],
    regression: [],
  }

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)
    for (let scene = 1; scene <= 7; scene += 1) {
      const result = await auditFoundationScene(page, scene, vp.name)
      report.foundation.push(result)
      await screenshot(page, `${vp.name}-scene-${scene}`)
    }
    for (const route of smokeRoutes) {
      report.regression.push(await smokeExistingRoute(page, route, vp.name))
    }
    await context.close()

    const reduced = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' })
    const reducedPage = await reduced.newPage()
    for (let scene = 1; scene <= 7; scene += 1) {
      report.reducedMotion.push(await auditFoundationScene(reducedPage, scene, vp.name, true))
    }
    await reduced.close()
  }

  await browser.close()

  const allRows = [...report.foundation, ...report.reducedMotion, ...report.regression]
  const failures = allRows.filter((row) => !row.ok)
  const out = path.join(ROOT, 'qa', 'first-year-foundation-report.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify({ ...report, failures }, null, 2))
  console.log(JSON.stringify({
    foundationScenes: report.foundation.length,
    reducedMotionScenes: report.reducedMotion.length,
    regressionRoutes: report.regression.length,
    failures: failures.length,
    out,
  }, null, 2))
  process.exit(failures.length ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})
