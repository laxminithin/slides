/**
 * International Business — Showcase Subject Manifest (V7 reference)
 *
 * This file documents the gold-standard identity block for IB.
 * Engine changes must prove against this showcase before platform rollout.
 *
 * The live registry entry lives in data/subjects.jsx; this module is the
 * SDK-shaped reference authors should copy when starting a new subject.
 */

import { createSubjectManifest } from './sdk'
import { SHOWCASE_SUBJECT_ID } from './plugins'

export const internationalBusinessShowcaseManifest = createSubjectManifest({
  id: SHOWCASE_SUBJECT_ID,
  title: 'International Business',
  shortTitle: 'IB',
  accent: 'international-business',
  description:
    'Gold-standard showcase for the frozen Presentation Engine — one adaptive executive documentary of global commerce.',
  program: {
    edition: 'Presentation Engine V7.0 — Showcase',
    code: '22MBA401',
    tagline: 'Gold standard — the quality bar for every future course',
    pillars: ['Trade', 'Strategy', 'Finance', 'Leadership'],
  },
  identity: {
    tone: 'Executive curiosity evolving into mastery',
    metaphor: 'Global commerce as one continuous documentary film',
    motifs: [
      'trade-routes',
      'climate-scan',
      'strategy-room',
      'command-center',
      'company-expand',
      'ops-machine',
    ],
    heroScenes: ['chapter openers', 'planned module peaks', 'chapter payoffs', 'course finale'],
    finale: 'The world connects into one operating ecosystem',
    rememberVisually: 'Routes → climate → theory → governance → MNC → machine',
  },
  theme: {
    colorTokens: {
      navy: '#132a4a',
      gold: '#b8923a',
      parchment: '#fbfaf7',
    },
    cssModules: ['internationalBusiness.css', 'ibComposition.css'],
  },
  motifs: {
    list: ['trade-routes', 'climate-scan', 'strategy-room', 'command-center', 'company-expand', 'ops-machine'],
  },
  heroes: {
    courseFinale: true,
    list: ['chapter openers', 'planned module peaks', 'chapter payoffs', 'course finale'],
  },
  engine: {
    showcase: true,
    qualityBar: 'reference',
    apiFrozen: true,
  },
})
