#!/usr/bin/env node
/**
 * Presentation Engine V6 — Animation QA
 *
 * Static audit of subject slide film metadata for cinematic regressions.
 * Usage:
 *   node scripts/animation-qa.mjs
 *   node scripts/animation-qa.mjs --subject international-business
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import * as React from 'react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const args = process.argv.slice(2)
const subjectFilter = args.includes('--subject')
  ? args[args.indexOf('--subject') + 1]
  : null

function scenesFromModule(module) {
  return (module.slides || []).map((slide) => {
    const film = slide.film || {}
    const notes = slide.notes || ''
    const cameraMatch = notes.match(/Scene [^/]+\/([^/]+)\//)
    const choreoMatch = notes.match(/Scene ([^/]+)\//)
    return {
      id: slide.id,
      camera: film.camera || cameraMatch?.[1],
      choreo: film.choreo || choreoMatch?.[1],
      rhythm: film.rhythm,
      pace: film.pace,
      hero: Boolean(film.hero || film.finale),
      heroTier: film.heroTier,
      quiet: Boolean(film.quiet),
      finale: Boolean(film.finale),
      callback: film.callback,
      continuity: Boolean(film.continuity),
      ambient: film.ambient !== false,
      wow: Boolean(film.wow || film.hero),
      lineCount: film.lineCount || 4,
      chapterOpener: Boolean(film.chapterOpener),
      chapterPayoff: Boolean(film.chapterPayoff),
    }
  })
}

async function main() {
  console.log('Loading engine + subjects…')
  globalThis.React = React

  const server = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  let qa
  let plugins
  let subjects
  try {
    qa = await server.ssrLoadModule('/src/cinematic/qa.js')
    plugins = await server.ssrLoadModule('/src/cinematic/plugins.js')
    subjects = (await server.ssrLoadModule('/src/data/subjects.jsx')).subjects
  } finally {
    await server.close()
  }

  const filtered = subjectFilter
    ? subjects.filter((s) => s.id === subjectFilter)
    : subjects

  const report = {
    generatedAt: new Date().toISOString(),
    engine: '6.0',
    subjects: [],
  }

  let exitCode = 0

  for (const subject of filtered) {
    const caps = plugins.resolveEngineCapabilities(subject)
    const moduleFindings = []
    let subjectScenes = []

    for (const module of subject.modules || []) {
      const scenes = scenesFromModule(module)
      subjectScenes = subjectScenes.concat(scenes)
      const result = qa.auditAnimationSequence(scenes)
      moduleFindings.push({
        moduleId: module.id,
        ok: result.ok,
        summary: result.summary,
        findings: result.findings,
      })
      if (!result.ok) exitCode = 1
      for (const finding of result.findings) {
        const mark = finding.severity === 'error' ? '✖' : finding.severity === 'warn' ? '⚠' : 'ℹ'
        console.log(`${mark} [${subject.id}/${module.id}] ${finding.code}: ${finding.message}`)
      }
    }

    const showcase = plugins.validateAgainstShowcase(subject)
    if (!showcase.ok) {
      exitCode = 1
      console.log(`✖ [${subject.id}] showcase-contract: ${showcase.message}`)
    } else if (showcase.warnings.length) {
      for (const warning of showcase.warnings) {
        console.log(`⚠ [${subject.id}] showcase: ${warning}`)
      }
    } else if (caps.showcase) {
      console.log(`✓ [${subject.id}] showcase reference — quality bar`)
    }

    report.subjects.push({
      id: subject.id,
      showcase: caps.showcase,
      capabilities: caps,
      showcaseValidation: showcase,
      modules: moduleFindings,
      sceneCount: subjectScenes.length,
    })
  }

  const outDir = path.join(root, 'qa')
  await mkdir(outDir, { recursive: true })
  const outFile = path.join(outDir, 'animation-qa-report.json')
  await writeFile(outFile, JSON.stringify(report, null, 2))
  console.log(`\nWrote ${outFile}`)
  process.exit(exitCode)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
