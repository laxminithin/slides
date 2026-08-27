#!/usr/bin/env node
/**
 * Presentation Engine V7 — Visual Regression Suite
 *
 * Captures layout fingerprints (+ optional screenshots) for subjects and
 * compares them to a frozen baseline. Protects spacing / overflow / layout
 * quality as the platform grows.
 *
 * Usage (dev server must be running):
 *   npm run qa:visual:update -- --subject=international-business
 *   npm run qa:visual -- --subject=international-business
 *   npm run qa:visual -- --screenshots
 *
 * Gold-standard showcase: international-business
 */

import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASELINE_DIR = path.join(ROOT, 'qa', 'visual-baselines')
const CURRENT_DIR = path.join(ROOT, 'qa', 'visual-current')

const DEFAULT_VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
]

const SUBJECTS = [
  {
    id: 'international-business',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5', 'module-6'],
    showcase: true,
  },
  {
    id: 'big-data-analytics',
    modules: ['module-1'],
  },
]

function parseArgs(argv) {
  const args = {
    base: 'http://127.0.0.1:5173',
    screenshots: false,
    update: false,
    subject: null,
    maxSlides: 12,
    viewports: [],
  }
  for (const raw of argv.slice(2)) {
    if (raw === '--screenshots') args.screenshots = true
    else if (raw === '--update' || raw === '--update-baselines') args.update = true
    else if (raw.startsWith('--subject=')) args.subject = raw.slice('--subject='.length)
    else if (raw.startsWith('--max-slides=')) args.maxSlides = Number(raw.slice('--max-slides='.length)) || 12
    else if (raw.startsWith('--viewport=')) {
      const [w, h] = raw.slice('--viewport='.length).split('x').map(Number)
      if (w && h) args.viewports.push({ name: `${w}x${h}`, width: w, height: h })
    } else if (/^https?:\/\//.test(raw)) args.base = raw
  }
  if (!args.viewports.length) args.viewports = DEFAULT_VIEWPORTS
  return args
}

async function dismissOverlays(page) {
  const candidates = ['.ib-intro-begin', 'button:has-text("Begin")', 'button:has-text("Continue")']
  for (const sel of candidates) {
    try {
      const btn = page.locator(sel).first()
      if (await btn.isVisible({ timeout: 350 })) {
        await btn.click({ timeout: 600 })
        await page.waitForTimeout(250)
        return
      }
    } catch {
      /* continue */
    }
  }
}

async function fingerprintSlide(page) {
  return page.evaluate(() => {
    const frame = document.querySelector('.slide-frame')
    const body = document.querySelector('.slide-body')
    if (!frame || !body) return null

    const br = body.getBoundingClientRect()
    const title = document.querySelector('.slide-title, .ib-hero-title, .ib-story-panel h2')
    const tr = title?.getBoundingClientRect()
    const contentNodes = body.querySelectorAll('[data-slide-content="true"], .ib-source-line, p, li, table')
    let overflowY = Math.max(0, body.scrollHeight - body.clientHeight)
    let overflowX = Math.max(0, body.scrollWidth - body.clientWidth)

    return {
      title: title?.textContent?.trim()?.slice(0, 80) || '',
      frame: {
        w: Math.round(frame.getBoundingClientRect().width),
        h: Math.round(frame.getBoundingClientRect().height),
      },
      body: {
        w: Math.round(br.width),
        h: Math.round(br.height),
        overflowX: Math.round(overflowX),
        overflowY: Math.round(overflowY),
      },
      titleBox: tr
        ? { x: Math.round(tr.x), y: Math.round(tr.y), w: Math.round(tr.width), h: Math.round(tr.height) }
        : null,
      contentCount: contentNodes.length,
      heroTier: document.querySelector('[data-hero-tier]')?.getAttribute('data-hero-tier') || 'none',
      density: frame.getAttribute('data-density') || 'normal',
    }
  })
}

function fingerprintHash(fp) {
  const stable = {
    frame: fp.frame,
    body: { w: fp.body.w, h: fp.body.h, overflowX: fp.body.overflowX, overflowY: fp.body.overflowY },
    titleBox: fp.titleBox,
    contentCount: fp.contentCount,
    heroTier: fp.heroTier,
    density: fp.density,
  }
  return crypto.createHash('sha1').update(JSON.stringify(stable)).digest('hex').slice(0, 12)
}

function compareFingerprints(baseline, current) {
  const diffs = []
  if (!baseline) {
    diffs.push({ kind: 'missing-baseline' })
    return diffs
  }
  if (Math.abs((baseline.body?.overflowY || 0) - (current.body?.overflowY || 0)) > 8) {
    diffs.push({
      kind: 'overflow-y',
      baseline: baseline.body.overflowY,
      current: current.body.overflowY,
    })
  }
  if (Math.abs((baseline.body?.overflowX || 0) - (current.body?.overflowX || 0)) > 8) {
    diffs.push({
      kind: 'overflow-x',
      baseline: baseline.body.overflowX,
      current: current.body.overflowX,
    })
  }
  if (Math.abs((baseline.contentCount || 0) - (current.contentCount || 0)) > 2) {
    diffs.push({
      kind: 'content-count',
      baseline: baseline.contentCount,
      current: current.contentCount,
    })
  }
  if (baseline.heroTier !== current.heroTier) {
    diffs.push({ kind: 'hero-tier', baseline: baseline.heroTier, current: current.heroTier })
  }
  if (baseline.titleBox && current.titleBox) {
    if (Math.abs(baseline.titleBox.y - current.titleBox.y) > 12) {
      diffs.push({ kind: 'title-drift-y', baseline: baseline.titleBox.y, current: current.titleBox.y })
    }
    if (Math.abs(baseline.titleBox.h - current.titleBox.h) > 10) {
      diffs.push({ kind: 'title-height', baseline: baseline.titleBox.h, current: current.titleBox.h })
    }
  }
  if (fingerprintHash(baseline) !== fingerprintHash(current) && diffs.length === 0) {
    diffs.push({ kind: 'layout-fingerprint', baseline: fingerprintHash(baseline), current: fingerprintHash(current) })
  }
  return diffs
}

async function countSlides(page) {
  const text = await page.locator('.slide-counter').first().textContent().catch(() => '')
  const match = String(text || '').match(/(\d+)\s*\/\s*(\d+)/)
  return match ? Number(match[2]) : 1
}

async function run() {
  const args = parseArgs(process.argv)
  const subjects = SUBJECTS.filter((s) => !args.subject || s.id === args.subject)
  const mode = args.update ? 'UPDATE BASELINES' : 'COMPARE'
  console.log(`Visual regression (${mode}) against ${args.base}`)
  console.log(`Subjects: ${subjects.map((s) => s.id).join(', ')}`)

  await fs.mkdir(args.update ? BASELINE_DIR : CURRENT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const report = {
    generatedAt: new Date().toISOString(),
    engine: '7.0',
    mode: args.update ? 'update' : 'compare',
    subjects: [],
  }
  let exitCode = 0

  for (const subject of subjects) {
    const subjectReport = { id: subject.id, showcase: Boolean(subject.showcase), modules: [], regressions: 0 }

    for (const moduleId of subject.modules) {
      const moduleReport = { moduleId, slides: [], regressions: 0 }

      for (const vp of args.viewports) {
        const context = await browser.newContext({
          viewport: vp,
          reducedMotion: 'reduce',
        })
        const page = await context.newPage()
        const url = `${args.base}/#/${subject.id}/${moduleId}?slide=1&debug=0`
        await page.goto(url, { waitUntil: 'networkidle' })
        await dismissOverlays(page)
        await page.waitForTimeout(400)

        const total = Math.min(await countSlides(page), args.maxSlides)

        for (let i = 1; i <= total; i += 1) {
          if (i > 1) {
            await page.goto(`${args.base}/#/${subject.id}/${moduleId}?slide=${i}&debug=0`, {
              waitUntil: 'domcontentloaded',
            })
            await dismissOverlays(page)
            await page.waitForTimeout(280)
          }

          const fp = await fingerprintSlide(page)
          if (!fp) continue

          const key = `${subject.id}/${moduleId}/${vp.name}/slide-${String(i).padStart(3, '0')}`
          const jsonName = `${key.replaceAll('/', '__')}.json`
          const pngName = `${key.replaceAll('/', '__')}.png`
          const record = {
            key,
            subjectId: subject.id,
            moduleId,
            viewport: vp.name,
            slideIndex: i,
            fingerprint: fp,
            hash: fingerprintHash(fp),
          }

          if (args.update) {
            const out = path.join(BASELINE_DIR, jsonName)
            await fs.mkdir(path.dirname(out), { recursive: true })
            await fs.writeFile(out, JSON.stringify(record, null, 2))
            if (args.screenshots) {
              await page.locator('.slide-frame').screenshot({ path: path.join(BASELINE_DIR, pngName) })
            }
            moduleReport.slides.push({ ...record, status: 'baseline-written' })
          } else {
            const baselinePath = path.join(BASELINE_DIR, jsonName)
            let baseline = null
            try {
              baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8'))
            } catch {
              baseline = null
            }
            const diffs = compareFingerprints(baseline?.fingerprint, fp)
            const status = diffs.length ? 'regress' : baseline ? 'ok' : 'no-baseline'
            if (status === 'regress') {
              exitCode = 1
              moduleReport.regressions += 1
              subjectReport.regressions += 1
              console.log(`✖ ${key}: ${diffs.map((d) => d.kind).join(', ')}`)
            } else if (status === 'no-baseline') {
              console.log(`⚠ ${key}: no baseline (run qa:visual:update)`)
            }

            const currentOut = path.join(CURRENT_DIR, jsonName)
            await fs.mkdir(path.dirname(currentOut), { recursive: true })
            await fs.writeFile(currentOut, JSON.stringify({ ...record, diffs, status }, null, 2))
            if (args.screenshots) {
              await page.locator('.slide-frame').screenshot({
                path: path.join(CURRENT_DIR, pngName),
              })
            }
            moduleReport.slides.push({ key, status, diffs })
          }
        }

        await context.close()
      }

      subjectReport.modules.push(moduleReport)
    }

    report.subjects.push(subjectReport)
    if (subject.showcase) {
      console.log(`★ Showcase subject ${subject.id}: ${subjectReport.regressions} regressions`)
    }
  }

  await browser.close()
  const outFile = path.join(ROOT, 'qa', 'visual-regression-report.json')
  await fs.writeFile(outFile, JSON.stringify(report, null, 2))
  console.log(`\nWrote ${outFile}`)
  process.exit(exitCode)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
