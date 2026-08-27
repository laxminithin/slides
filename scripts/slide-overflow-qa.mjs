/**
 * Global presentation overflow QA — all registered subjects / modules / slides.
 *
 * Usage:
 *   1. npm run dev   (or pass a base URL)
 *   2. npm run qa:overflow
 *   3. npm run qa:overflow -- http://127.0.0.1:5173 --screenshots
 *
 * Flags:
 *   --screenshots   write PNGs under qa/<subject>/<module>/<viewport>/
 *   --subject=id    limit to one subject
 *   --viewport=WxH  limit to one viewport (repeatable)
 */

import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DEFAULT_VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1600x900', width: 1600, height: 900 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1280x720', width: 1280, height: 720 },
]

const SUBJECTS = [
  {
    id: 'big-data-analytics',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'information-network-security',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'database-management-systems',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'computer-networks',
    modules: ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5', 'unit-6', 'unit-7', 'unit-8'],
  },
  {
    id: 'theory-of-computation',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'parallel-computing',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'international-business',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5', 'module-6'],
  },
  {
    id: 'artificial-intelligence',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'operating-systems',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'software-engineering-project-management',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'computer-networks-bcs502',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'computer-graphics-visualization',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'unix-system-programming',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
  {
    id: 'distributed-systems',
    modules: ['module-1', 'module-2', 'module-3', 'module-4', 'module-5'],
  },
]

const STAGE_SELECTORS = ['.slide-body']

function parseArgs(argv) {
  const args = {
    base: 'http://127.0.0.1:5173',
    screenshots: false,
    subject: null,
    viewports: [],
  }
  for (const raw of argv.slice(2)) {
    if (raw === '--screenshots') args.screenshots = true
    else if (raw.startsWith('--subject=')) args.subject = raw.slice('--subject='.length)
    else if (raw.startsWith('--viewport=')) {
      const [w, h] = raw.slice('--viewport='.length).split('x').map(Number)
      if (w && h) args.viewports.push({ name: `${w}x${h}`, width: w, height: h })
    } else if (/^https?:\/\//.test(raw) || raw.startsWith('http://') || raw.startsWith('127.')) {
      args.base = raw.startsWith('http') ? raw : `http://${raw}`
    }
  }
  if (!args.viewports.length) args.viewports = DEFAULT_VIEWPORTS
  return args
}

async function dismissOverlays(page) {
  // IB chapter intro / begin buttons
  const candidates = [
    '.ib-intro-begin',
    '.ib-chapter-intro button',
    'button:has-text("Begin")',
    'button:has-text("Continue")',
    'button:has-text("Start")',
  ]
  for (const sel of candidates) {
    try {
      const btn = page.locator(sel).first()
      if (await btn.isVisible({ timeout: 400 })) {
        await btn.click({ timeout: 800 })
        await page.waitForTimeout(350)
        return
      }
    } catch {
      // continue
    }
  }
  try {
    await page.keyboard.press('Enter')
    await page.waitForTimeout(200)
  } catch {
    // ignore
  }
}

async function auditCurrentSlide(page) {
  return page.evaluate((stageSelectors) => {
    const frame = document.querySelector('.slide-frame')
    if (!frame) {
      return {
        ok: false,
        title: null,
        footer: null,
        hits: [{ kind: 'missing', selector: '.slide-frame', detail: 'slide frame not found' }],
      }
    }

    const title =
      document.querySelector('.slide-title, .ib-story-panel h2, .ib-hero-title, .toc-copy h2, .ins-teaching-copy h2, .bda-copy h2')
        ?.textContent
        ?.trim() || ''
    const footer = document.querySelector('.slide-footer')?.textContent?.replace(/\s+/g, ' ').trim() || ''
    const hits = []
    const EPSILON = 3
    const SCROLL_REPORT = 8
    const SCROLL_FAIL = 24

    const isIgnored = (node) =>
      Boolean(node.closest('[data-slide-decorative="true"], [data-overflow-allow="true"], .slide-visual-clip, .laser-dot, .annotation-layer, .slide-overflow-overlay'))

    // Scroll overflow — report modest bleeds; only hard bleeds fail the stage.
    for (const sel of stageSelectors) {
      document.querySelectorAll(sel).forEach((el) => {
        const ox = el.scrollWidth - el.clientWidth
        const oy = el.scrollHeight - el.clientHeight
        if (ox > SCROLL_REPORT || oy > SCROLL_REPORT) {
          hits.push({
            kind: 'scroll',
            selector: sel,
            overflowX: Math.max(0, Math.round(ox)),
            overflowY: Math.max(0, Math.round(oy)),
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          })
        }
      })
    }

    // Bounds overflow — authoritative for academic content vs body stage.
    const body = document.querySelector('.slide-body')
    if (body) {
      const br = body.getBoundingClientRect()
      const nodes = body.querySelectorAll(
        'h1, h2, h3, p, strong, li, table, pre, .takeaway, .ib-takeaway, .bda-takeaway, [data-slide-content="true"]',
      )
      nodes.forEach((node) => {
        if (isIgnored(node)) return
        const style = getComputedStyle(node)
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return
        // Ignore mid-animation entrance poses that are visually fading in
        if (Number(style.opacity) < 0.85) return
        const r = node.getBoundingClientRect()
        if (r.width < 1 || r.height < 1) return
        const bottom = r.bottom - br.bottom
        const right = r.right - br.right
        const top = br.top - r.top
        const left = br.left - r.left
        if (bottom > EPSILON || right > EPSILON || top > EPSILON || left > EPSILON) {
          hits.push({
            kind: 'bounds',
            selector: node.className?.toString?.().split(/\s+/).filter(Boolean).slice(0, 2).join('.') || node.tagName.toLowerCase(),
            bottom: Math.max(0, Math.round(bottom)),
            right: Math.max(0, Math.round(right)),
            top: Math.max(0, Math.round(top)),
            left: Math.max(0, Math.round(left)),
          })
        }
      })
    }

    // Presentation Typography Engine quality gates (V3.3).
    // Hard fail: clip / ellipsis / TITLE_TOO_SMALL / TITLE_TOO_MANY_LINES (>3) /
    // HEADER_TOO_TALL / BODY_TOO_SMALL. Soft: visible 3-line titles.
    const TITLE_MIN_PX = 34
    const TITLE_MAX_LINES = 3
    const HEADER_MAX_SHARE = 0.22
    const BODY_MIN_SHARE = 0.78
    const titleEl = document.querySelector('.slide-title')
    const headerEl = document.querySelector('.slide-header')
    const frameEl = document.querySelector('.slide-frame')
    if (titleEl) {
      const cs = getComputedStyle(titleEl)
      const sw = titleEl.scrollWidth
      const cw = titleEl.clientWidth
      const sh = titleEl.scrollHeight
      const ch = titleEl.clientHeight
      const lineH = parseFloat(cs.lineHeight) || 1
      const lines = Math.max(1, Math.round(sh / lineH))
      const fontPx = parseFloat(cs.fontSize) || 0
      const ellipsis = cs.textOverflow === 'ellipsis'
        && cs.overflow !== 'visible'
        && cs.overflowX !== 'visible'
      if (sw - cw > 1 || sh - ch > 1 || ellipsis) {
        hits.push({
          kind: 'title-clip',
          selector: '.slide-title',
          scrollWidth: sw,
          clientWidth: cw,
          scrollHeight: sh,
          clientHeight: ch,
          lines,
          ellipsis,
        })
      }
      if (fontPx > 0 && fontPx < TITLE_MIN_PX - 0.5) {
        hits.push({
          kind: 'TITLE_TOO_SMALL',
          selector: '.slide-title',
          fontPx: Math.round(fontPx * 10) / 10,
          minimum: TITLE_MIN_PX,
          lines,
        })
      }
      if (lines > TITLE_MAX_LINES) {
        hits.push({
          kind: 'TITLE_TOO_MANY_LINES',
          selector: '.slide-title',
          lines,
          maximum: TITLE_MAX_LINES,
        })
      } else if (lines > 2 && !(sw - cw > 1 || sh - ch > 1 || ellipsis)) {
        hits.push({ kind: 'title-lines', selector: '.slide-title', lines, soft: true })
      }
    }
    if (headerEl && frameEl) {
      const frameH = frameEl.getBoundingClientRect().height || 1
      const headerH = headerEl.getBoundingClientRect().height
      const share = headerH / frameH
      if (share > HEADER_MAX_SHARE + 0.005) {
        hits.push({
          kind: 'HEADER_TOO_TALL',
          selector: '.slide-header',
          headerPx: Math.round(headerH),
          framePx: Math.round(frameH),
          share: Math.round(share * 1000) / 10,
          maximum: HEADER_MAX_SHARE * 100,
        })
      }
    }
    if (body && frameEl) {
      const frameH = frameEl.getBoundingClientRect().height || 1
      const footerEl = document.querySelector('.slide-footer')
      const footerH = footerEl?.getBoundingClientRect().height || 0
      const usable = Math.max(1, frameH - footerH)
      const bodyH = body.getBoundingClientRect().height
      const share = bodyH / usable
      if (share < BODY_MIN_SHARE - 0.005) {
        hits.push({
          kind: 'BODY_TOO_SMALL',
          selector: '.slide-body',
          bodyPx: Math.round(bodyH),
          framePx: Math.round(frameH),
          usablePx: Math.round(usable),
          share: Math.round(share * 1000) / 10,
          minimum: BODY_MIN_SHARE * 100,
        })
      }
    }

    // Fail stage when:
    // - hard scroll overflow (>24px), OR
    // - meaningful bounds overflow of academic text/cards, OR
    // - typography hard gates
    const TYPO_HARD = new Set([
      'title-clip',
      'TITLE_TOO_SMALL',
      'TITLE_TOO_MANY_LINES',
      'HEADER_TOO_TALL',
      'BODY_TOO_SMALL',
    ])
    const hasHardScroll = hits.some((h) => h.kind === 'scroll' && ((h.overflowY || 0) > SCROLL_FAIL || (h.overflowX || 0) > SCROLL_FAIL))
    const hasBounds = hits.some((h) => h.kind === 'bounds' && ((h.bottom || 0) > 6 || (h.right || 0) > 6))
    const hasTypographyFail = hits.some((h) => TYPO_HARD.has(h.kind))
    const stageFail = hasHardScroll || hasBounds || hasTypographyFail || hits.some((h) => h.kind === 'missing' || h.kind === 'nav')

    return { ok: !stageFail, title, footer, hits }
  }, STAGE_SELECTORS)
}

async function ensureQaDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function run() {
  const args = parseArgs(process.argv)
  const subjects = SUBJECTS.filter((s) => !args.subject || s.id === args.subject)
  console.log(`Starting overflow QA against ${args.base}`)
  console.log(`Subjects: ${subjects.map((s) => s.id).join(', ')}`)
  console.log(`Viewports: ${args.viewports.map((v) => v.name).join(', ')}`)

  const browser = await chromium.launch({ headless: true })
  const report = []
  let slidesChecked = 0

  for (const vp of args.viewports) {
    console.log(`\n== Viewport ${vp.name} ==`)
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    page.setDefaultTimeout(15000)

    for (const subject of subjects) {
      for (const mod of subject.modules) {
        const url = `${args.base}/#/${subject.id}/${mod}?slide=1${subject.id === 'international-business' ? '&skipIntro=1' : ''}`
        process.stdout.write(`  ${subject.id}/${mod} ... `)
        const started = Date.now()
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
          await page.evaluate(({ subjectId, moduleId }) => {
            try {
              window.sessionStorage.removeItem(`presentation:${subjectId}:${moduleId}:slide`)
            } catch {
              // ignore
            }
          }, { subjectId: subject.id, moduleId: mod })
          await page.waitForSelector('.slide-frame, .module-cover, .subject-card, .ib-intro-begin', {
            timeout: 12000,
          }).catch(() => {})
        } catch (err) {
          console.log('NAV_FAIL')
          report.push({
            viewport: vp.name,
            subject: subject.id,
            module: mod,
            slide: 1,
            title: 'NAV_FAIL',
            hits: [{ kind: 'nav', detail: String(err.message || err) }],
          })
          continue
        }

        await dismissOverlays(page)
        // Force-dismiss IB cinematic intro if still present
        if (subject.id === 'international-business') {
          for (let i = 0; i < 8; i += 1) {
            const introVisible = await page.locator('.ib-chapter-intro').isVisible().catch(() => false)
            if (!introVisible) break
            await page.locator('.ib-intro-begin').click({ force: true, timeout: 500 }).catch(() => {})
            await page.keyboard.press('Enter').catch(() => {})
            await page.waitForTimeout(350)
          }
        }
        // HashRouter navigations can resolve before React remounts PresentationShell.
        // Wait until this module/unit counter shows slide 1 for the destination.
        const segmentMatch = /^(module|unit)-(\d+)$/.exec(mod)
        const segmentKind = segmentMatch?.[1] || 'module'
        const moduleOrdinal = segmentMatch?.[2] || mod.replace(/^module-/, '').replace(/^unit-/, '')
        try {
          await page.waitForFunction(
            ({ subjectId, moduleOrdinal: ord, segmentKind: kind, modId }) => {
              const frame = document.querySelector('.slide-frame')
              if (!frame) return false
              const footer = document.querySelector('.slide-footer')?.textContent || ''
              const label = kind === 'unit' ? 'Unit' : 'Module'
              const onSegment =
                footer.includes(`${label} ${Number(ord)}`) ||
                footer.includes(`${label} ${ord}`) ||
                footer.includes(`${label} ${String(ord).padStart(2, '0')}`)
              const slideMatch = /Slide\s+(\d+)/.exec(footer)
              const atStart = slideMatch ? Number(slideMatch[1]) === 1 : false
              const hash = location.hash || ''
              const hashOk = hash.includes(`/${subjectId}/${modId}`) || hash.includes(`/${subjectId}/${kind}-${ord}`)
              return Boolean(frame && hashOk && onSegment && atStart)
            },
            { subjectId: subject.id, moduleOrdinal, segmentKind, modId: mod },
            { timeout: 12000 },
          )
        } catch {
          // Fall through — some modules use atypical footer labels
        }
        // If still not on slide 1, force Home / reload with cleared session index.
        const footerNow = await page.locator('.slide-footer').first().textContent().catch(() => '')
        if (!/Slide\s+1\b/.test(footerNow || '')) {
          await page.evaluate(({ subjectId, moduleId }) => {
            try {
              window.sessionStorage.setItem(`presentation:${subjectId}:${moduleId}:slide`, '0')
            } catch {
              // ignore
            }
          }, { subjectId: subject.id, moduleId: mod })
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {})
          await page.waitForSelector('.slide-frame', { timeout: 8000 }).catch(() => {})
          await page.keyboard.press('Home').catch(() => {})
          await page.waitForTimeout(120)
        }
        await page.waitForTimeout(80)
        // Skip modules that are landing-only / empty placeholders
        const hasFrame = await page.locator('.slide-frame').count()
        if (!hasFrame) {
          console.log('no-frame (skipped)')
          continue
        }

        await page.locator('.slide-frame').click({ position: { x: 12, y: 12 }, timeout: 1000 }).catch(() => {})

        let slideNo = 0
        let guard = 0
        let previousFingerprint = ''
        let moduleFindings = 0

        while (guard < 120) {
          guard += 1
          slideNo += 1
          // Wait for entrance animations/transforms to settle so scroll metrics
          // are not polluted by temporary translateY reveals.
          await page.waitForTimeout(480)
          const result = await auditCurrentSlide(page)
          slidesChecked += 1

          const fingerprint = `${result.title}|${result.footer}|${slideNo}`
          if (!result.ok || result.hits.length) {
            if (!result.ok) moduleFindings += 1
            report.push({
              viewport: vp.name,
              subject: subject.id,
              module: mod,
              slide: slideNo,
              title: result.title,
              footer: result.footer,
              ok: result.ok,
              hits: result.hits,
            })
          }

          if (args.screenshots) {
            const dir = path.join(ROOT, 'qa', subject.id, mod, vp.name)
            await ensureQaDir(dir)
            const safeTitle = (result.title || `slide-${slideNo}`)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
              .slice(0, 48)
            await page.locator('.slide-frame').screenshot({
              path: path.join(dir, `${String(slideNo).padStart(2, '0')}-${safeTitle || 'slide'}.png`),
              animations: 'disabled',
            }).catch(() => {})
          }

          // V3.1 removed the header slide-counter; derive position from the
          // footer ("… • Slide N") and terminate via the Next button state.
          const footerText = await page.locator('.slide-footer').first().textContent().catch(() => '')
          const curMatch = /Slide\s+(\d+)/.exec(footerText || '')
          const current = curMatch ? Number(curMatch[1]) : slideNo

          const nextDisabled = await page.locator('.nav-btn[aria-label="Next slide"]').isDisabled().catch(() => true)
          if (nextDisabled) break

          await page.locator('.nav-btn[aria-label="Next slide"]').click({ timeout: 1500 }).catch(async () => {
            await page.keyboard.press('ArrowRight')
          })
          try {
            await page.waitForFunction(
              (prev) => {
                const el = document.querySelector('.slide-footer')
                const m = /Slide\s+(\d+)/.exec(el?.textContent || '')
                return Boolean(m && Number(m[1]) !== prev)
              },
              current,
              { timeout: 2500 },
            )
          } catch {
            await page.locator('.slide-frame').click({ position: { x: 20, y: 20 }, timeout: 500 }).catch(() => {})
            await page.keyboard.press('ArrowRight')
            await page.waitForTimeout(200)
            const retryFooter = await page.locator('.slide-footer').first().textContent().catch(() => '')
            const retryMatch = /Slide\s+(\d+)/.exec(retryFooter || '')
            const retryNo = retryMatch ? Number(retryMatch[1]) : current
            if (retryNo === current) break
          }
        }

        console.log(`${slideNo} slides, ${moduleFindings} findings (${Date.now() - started}ms)`)
      }
    }

    await context.close()
  }

  await browser.close()

  const TYPO_HARD = new Set([
    'title-clip',
    'TITLE_TOO_SMALL',
    'TITLE_TOO_MANY_LINES',
    'HEADER_TOO_TALL',
    'BODY_TOO_SMALL',
  ])
  const stageHits = report.filter((row) =>
    row.ok === false
    || row.hits.some((h) =>
      h.kind === 'nav'
      || h.kind === 'missing'
      || TYPO_HARD.has(h.kind)
      || (h.kind === 'scroll' && ((h.overflowY || 0) > 24 || (h.overflowX || 0) > 24))
      || (h.kind === 'bounds' && ((h.bottom || 0) > 6 || (h.right || 0) > 6)),
    ),
  )
  const boundsOnly = report.filter(
    (row) =>
      row.ok !== false
      && row.hits.some((h) => h.kind === 'bounds'),
  )
  const titleClipCount = report.filter((row) => row.hits.some((h) => h.kind === 'title-clip')).length
  const titleLinesRows = report.filter((row) => row.hits.some((h) => h.kind === 'title-lines'))
  const titleTooSmallCount = report.filter((row) => row.hits.some((h) => h.kind === 'TITLE_TOO_SMALL')).length
  const headerTooTallCount = report.filter((row) => row.hits.some((h) => h.kind === 'HEADER_TOO_TALL')).length
  const bodyTooSmallCount = report.filter((row) => row.hits.some((h) => h.kind === 'BODY_TOO_SMALL')).length

  const summaryPath = path.join(ROOT, 'qa', 'overflow-report.json')
  await ensureQaDir(path.dirname(summaryPath))
  await fs.writeFile(
    summaryPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        base: args.base,
        viewports: args.viewports.map((v) => v.name),
        subjects: subjects.map((s) => s.id),
        slidesChecked,
        stageFindingCount: stageHits.length,
        boundsFindingCount: boundsOnly.length,
        titleClipCount,
        titleLinesCount: titleLinesRows.length,
        titleTooSmallCount,
        headerTooTallCount,
        bodyTooSmallCount,
        findings: report,
      },
      null,
      2,
    ),
  )

  console.log(`\nSLIDE OVERFLOW QA`)
  console.log(`  slides checked : ${slidesChecked}`)
  console.log(`  viewports      : ${args.viewports.map((v) => v.name).join(', ')}`)
  console.log(`  stage findings : ${stageHits.length}`)
  console.log(`  bounds findings: ${boundsOnly.length}`)
  console.log(`  title clips    : ${titleClipCount}`)
  console.log(`  title too small: ${titleTooSmallCount}`)
  console.log(`  header too tall: ${headerTooTallCount}`)
  console.log(`  body too small : ${bodyTooSmallCount}`)
  console.log(`  title 3 lines  : ${titleLinesRows.length} (soft — authoring note)`)
  console.log(`  report         : ${summaryPath}`)

  if (!stageHits.length) {
    console.log('\nPASS — no stage scroll overflow detected.')
    if (boundsOnly.length) {
      console.log(`NOTE — ${boundsOnly.length} bounds-only finding(s) logged for review (not failing).`)
    }
    process.exit(0)
  }

  console.log(`\nFAIL — ${stageHits.length} stage overflow finding(s):\n`)
  for (const row of stageHits.slice(0, 80)) {
    console.log(`[${row.viewport}] ${row.subject} / ${row.module} / slide ${row.slide}`)
    console.log(`  title: ${row.title || '(untitled)'}`)
    for (const h of row.hits.filter((x) => x.kind !== 'bounds' && !x.soft).slice(0, 6)) {
      if (h.kind === 'scroll') {
        console.log(
          `  ${h.selector}  sh=${h.scrollHeight}/${h.clientHeight} (+${h.overflowY}px)  sw=${h.scrollWidth}/${h.clientWidth} (+${h.overflowX}px)`,
        )
      } else if (h.kind === 'title-clip') {
        console.log(
          `  TITLE CLIPPED  sw=${h.scrollWidth}/${h.clientWidth}  sh=${h.scrollHeight}/${h.clientHeight}  lines=${h.lines}${h.ellipsis ? '  ellipsis' : ''}`,
        )
      } else if (h.kind === 'TITLE_TOO_SMALL') {
        console.log(`  TITLE_TOO_SMALL  ${h.fontPx}px < ${h.minimum}px`)
      } else if (h.kind === 'HEADER_TOO_TALL') {
        console.log(`  HEADER_TOO_TALL  ${h.share}% > ${h.maximum}%`)
      } else if (h.kind === 'BODY_TOO_SMALL') {
        console.log(`  BODY_TOO_SMALL  ${h.share}% < ${h.minimum}%`)
      } else if (h.kind === 'TITLE_TOO_MANY_LINES') {
        console.log(`  TITLE_TOO_MANY_LINES  ${h.lines} > ${h.maximum}`)
      } else {
        console.log(`  ${h.kind}: ${h.detail || h.selector}`)
      }
    }
    console.log('')
  }

  process.exit(1)
}

run().catch((err) => {
  console.error(err)
  process.exit(2)
})
