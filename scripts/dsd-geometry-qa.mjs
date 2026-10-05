#!/usr/bin/env node
/**
 * 1BEC302 Digital System Design Using Verilog — SVG geometry QA.
 *
 * Every scene in src/digitalSystemDesignUsingVerilog/ draws into a 900x520
 * viewBox. JSX passes attributes as strings, so a helper doing `y + 11` on
 * `y="200"` produces "20011" instead of 211 and throws a line thousands of
 * units off the canvas, where the viewBox silently clips it. Nothing crashes
 * and nothing looks obviously wrong in a thumbnail — so this check exists.
 *
 * It renders every slide of all five modules to static markup and fails on any
 * coordinate outside a generous bound around the viewBox.
 *
 * Usage: node scripts/dsd-geometry-qa.mjs
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

// 900x520 viewBox; allow generous bleed for ribbons and wave paths that run
// past the edge on purpose.
const MIN = -600
const MAX = 2400

const COORD_ATTRS = ['x', 'y', 'cx', 'cy', 'x1', 'y1', 'x2', 'y2', 'width', 'height']

function badCoords(markup) {
  const bad = []
  // A NaN coordinate is invisible to the range checks below -- it matches no
  // number pattern -- but the browser rejects the whole path and the shape
  // silently vanishes. Caught only as a console error until this existed.
  for (const m of markup.matchAll(/([a-zA-Z_-]+)="([^"]*(?:NaN|Infinity)[^"]*)"/g)) {
    bad.push({ attr: m[1], value: m[2].includes("NaN") ? "NaN" : "Infinity", near: m[2].slice(0, 70) })
  }
  // path/polyline data
  for (const m of markup.matchAll(/\b(?:d|points)="([^"]*)"/g)) {
    for (const numText of m[1].match(/-?\d+(?:\.\d+)?/g) || []) {
      const v = Number(numText)
      if (v < MIN || v > MAX) bad.push({ attr: 'd', value: v, near: m[1].slice(0, 70) })
    }
  }
  for (const attr of COORD_ATTRS) {
    for (const m of markup.matchAll(new RegExp(`\\b${attr}="(-?\\d+(?:\\.\\d+)?)"`, 'g'))) {
      const v = Number(m[1])
      if (v < MIN || v > MAX) bad.push({ attr, value: v, near: '' })
    }
  }
  return bad
}

async function main() {
  globalThis.React = React

  const server = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  let buildDsdModuleSlides
  try {
    ;({ buildDsdModuleSlides } = await server.ssrLoadModule('/src/digitalSystemDesignUsingVerilog/buildSlides.jsx'))
  } finally {
    await server.close()
  }

  let checked = 0
  const failures = []

  for (let m = 1; m <= 5; m += 1) {
    for (const slide of buildDsdModuleSlides(m)) {
      let markup
      try {
        markup = renderToStaticMarkup(React.createElement(MemoryRouter, null, slide.content))
      } catch (error) {
        failures.push({ slide: slide.id, module: m, error: error.message })
        continue
      }
      checked += 1
      const bad = badCoords(markup)
      if (bad.length) {
        failures.push({ slide: slide.id, module: m, count: bad.length, sample: bad.slice(0, 3) })
      }
    }
  }

  console.log('1BEC302 GEOMETRY QA')
  console.log(`  slides rendered : ${checked}`)
  console.log(`  bounds          : ${MIN}..${MAX} (viewBox 900x520)`)
  console.log(`  failing slides  : ${failures.length}`)

  if (!failures.length) {
    console.log('\nPASS — every drawn coordinate is on or near the canvas.')
    process.exit(0)
  }

  console.log('\nFAIL — off-canvas geometry (usually string concatenation on a coordinate prop):\n')
  for (const f of failures.slice(0, 20)) {
    console.log(`[module-${f.module}] ${f.slide}`)
    if (f.error) console.log(`  render error: ${f.error}`)
    for (const b of f.sample || []) {
      console.log(`  ${b.attr}=${b.value}${b.near ? `  in "${b.near}…"` : ''}`)
    }
  }
  process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
