/**
 * International Business — Shared Slide Kit (V9.0 "MBA Content Excellence")
 *
 * Central component library + helpers for the IB course. Every module file
 * (module1.jsx … module6.jsx) imports from here. The visual/cinematic engine,
 * composition (ibComposition.css) and design tokens (internationalBusiness.css)
 * are unchanged — V9 adds CONTENT DEPTH: full explanations, managerial
 * interpretation, engagement beats and exam framing, split one-concept-per-slide.
 */

import {
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Compass,
  Factory,
  Globe2,
  Handshake,
  Landmark,
  Lightbulb,
  LineChart,
  Network,
  Scale,
  ShieldCheck,
  Ship,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  WorldMap as PremiumWorldMap, MapMarker, MapRoute, MARKETS,
} from './worldmap'

export const icon = { size: 25, strokeWidth: 1.7, 'aria-hidden': true }
export const ibIcons = {
  BadgeCheck, BarChart3, Boxes, Building2, Compass, Factory, Globe2, Handshake,
  Landmark, Lightbulb, LineChart, Network, Scale, ShieldCheck, Ship, Sparkles,
  TrendingUp, Users,
}

export const sourceNote =
  'Primary academic reference: PPTs in public/International Buisness/. V9 delivers full MBA-depth explanation, business cases and VTU exam framing for every syllabus topic.'

export const moduleThemes = {
  1: { title: 'The Birth of Global Commerce', emotion: 'Opportunity', motif: 'Global routes become business strategy.' },
  2: { title: 'Understanding the World’s Business Climate', emotion: 'Judgment', motif: 'Country climate determines market success.' },
  3: { title: 'The Hall of Business Thinkers', emotion: 'Insight', motif: 'Trade theory explains modern strategy.' },
  4: { title: 'Who Runs Global Trade?', emotion: 'Governance', motif: 'Rules, institutions and blocs shape opportunity.' },
  5: { title: 'Building a Global Company', emotion: 'Ambition', motif: 'Going global creates reach. Building capability creates competitiveness.' },
  6: { title: 'Running the World Business Machine', emotion: 'Command', motif: 'Marketing, people, capital and production operate together.' },
}

export function slide({ id, module, title, content, notes, film, composition, tone, density, hideTitle = true }) {
  return {
    id,
    kicker: `International Business 22MBA401 | Module ${module}`,
    title,
    hideTitle,
    // tone drives the palette-rhythm class on .slide-frame (see ibChapter1.css)
    tone: `ib-slide${tone ? ` ${tone}` : ''}`,
    // composition drives data-composition on .slide-frame → distinct per-slide layout
    ...(composition ? { composition } : {}),
    ...(density ? { density } : {}),
    content,
    notes: notes || sourceNote,
    ...(film ? { film } : {}),
  }
}

/**
 * buildModule — first entry is the module title scene, the rest are content
 * slides. Each content item: { id, title, content, labels?, film? }.
 * `film` metadata drives the cinematic engine's hero tier, quiet rests and
 * finale (see src/App.jsx). Hero/quiet moments are placed ~every 4–5 slides.
 */
export function buildModule(module, slides, { opener } = {}) {
  return [
    slide({
      id: `ib-m${module}-title`,
      module,
      title: moduleThemes[module].title,
      content: opener || <TitleScene module={module} labels={slides[0].labels} />,
      composition: 'opener',
      tone: 'ib-scene-dark',
      film: { chapterOpener: true, hero: true, heroTier: '1', camera: 'aerial', identity: true },
    }),
    ...slides.map((item, index) =>
      slide({
        id: `ib-m${module}-${String(index + 1).padStart(2, '0')}-${item.id}`,
        module,
        title: item.title,
        content: item.content,
        notes: `${sourceNote} Covers syllabus topic: ${item.title}.`,
        film: item.film,
        composition: item.composition,
        tone: item.tone,
        density: item.density,
      }),
    ),
  ]
}

/* ============================================================= WORLD MAP === */

/** Named geographic world map for hooks / title scenes. */
export function WorldMap({ routes = 5, pulse = 'trade' }) {
  const { usa, india, china, germany, singapore, uae, japan } = MARKETS
  const corridor = [
    { from: [india.lon, india.lat], to: [uae.lon, uae.lat], flow: 'goods', label: 'Goods' },
    { from: [india.lon, india.lat], to: [germany.lon, germany.lat], flow: 'goods', label: 'Exports' },
    { from: [usa.lon, usa.lat], to: [india.lon, india.lat], flow: 'capital', label: 'Capital' },
    { from: [japan.lon, japan.lat], to: [india.lon, india.lat], flow: 'technology', label: 'Technology' },
    { from: [china.lon, china.lat], to: [usa.lon, usa.lat], flow: 'goods', label: 'Supply' },
    { from: [singapore.lon, singapore.lat], to: [germany.lon, germany.lat], flow: 'information', label: 'Information' },
  ].slice(0, routes)
  return (
    <PremiumWorldMap className={`ib-world ib-world-premium ${pulse}`} showGraticule={false}>
      {corridor.map((r, i) => (
        <MapRoute key={`${r.label}-${i}`} from={r.from} to={r.to} flow={r.flow} label={r.label} i={i} bow={0.14 + (i % 3) * 0.04} />
      ))}
      <MapMarker lon={india.lon} lat={india.lat} name="India" role="Home Market · HQ" kind="hq" side="bottom" i={0} />
      <MapMarker lon={uae.lon} lat={uae.lat} name="UAE" role="Middle East Market" side="top" i={1} />
      <MapMarker lon={germany.lon} lat={germany.lat} name="Germany" role="European Market" side="top-right" i={2} />
      <MapMarker lon={usa.lon} lat={usa.lat} name="United States" role="Capital & Market" side="left" i={3} />
      <MapMarker lon={china.lon} lat={china.lat} name="China" role="Production" side="top" i={4} />
      <MapMarker lon={japan.lon} lat={japan.lat} name="Japan" role="Strategic Market" side="right" i={5} />
      <MapMarker lon={singapore.lon} lat={singapore.lat} name="Singapore" role="Regional Hub" kind="regional" side="bottom" i={6} />
    </PremiumWorldMap>
  )
}

/* ============================================================ TITLE SCENE === */

export function TitleScene({ module, labels }) {
  const theme = moduleThemes[module]
  return (
    <div className="ib-title-scene ib-v8-title">
      <div className="ib-hero-copy">
        <p className="slide-kicker">INTERNATIONAL BUSINESS | 22MBA401 · EXECUTIVE COURSE</p>
        <h1>Module {module}</h1>
        <div className="ib-hero-emotion">{theme.emotion}</div>
        <p className="ib-hero-title">{theme.title}</p>
        <p className="ib-hero-subtitle">{theme.motif}</p>
        <div className="ib-terminal-strip">{labels.map((label, i) => <span key={label} style={{ '--i': i }}>{label}</span>)}</div>
      </div>
      <div className="ib-hero-visual">
        <WorldMap routes={6} pulse={`m${module}`} />
        <div className="ib-glass-ticker"><span>VTU</span><b>+</b><span>Industry</span><b>+</b><span>Exam Ready</span></div>
      </div>
    </div>
  )
}

/* ================================================================= FRAME === */

export function Frame({ label, title, lead, visual, children, takeaway, mode = 'standard' }) {
  return (
    <div className={`ib-chapter ib-v8-frame compose-${mode}`} data-slide-content="true">
      <section className="ib-story-panel">
        <span className="ib-section-label">{label}</span>
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
        {children}
        {takeaway && <div className="ib-takeaway">{takeaway}</div>}
      </section>
      <section className="ib-visual-panel">{visual}</section>
    </div>
  )
}

/* ================================================================== HOOK === */
/* Opening / hero question that frames a chapter or concept as a story. */
export function Hook({ eyebrow, question, sub, visual, mode = 'standard' }) {
  return (
    <div className={`ib-chapter ib-v9-hook compose-${mode}`} data-slide-content="true">
      <section className="ib-story-panel">
        <span className="ib-section-label">{eyebrow}</span>
        <h2 className="ib-v9-hook-q">{question}</h2>
        {sub && <p>{sub}</p>}
      </section>
      <section className="ib-visual-panel">{visual}</section>
    </div>
  )
}

/* ================================================= GRID / FLOW PRIMITIVES === */

export function Cards({ items, icon: Icon = Sparkles }) {
  return (
    <div className="ib-card-grid ib-v8-cards">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <Icon {...icon} />
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

export function Flow({ steps }) {
  return (
    <div className="ib-stage-pipeline ib-v8-flow">
      {steps.map((step, i) => (
        <article key={step.title} style={{ '--i': i }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{step.title}</strong>
          <p>{step.text}</p>
        </article>
      ))}
    </div>
  )
}

export function Compare({ items }) {
  return (
    <div className="ib-v8-compare">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

export function Orbit({ center, items }) {
  return (
    <div className="ib-orbit ib-v8-orbit">
      <div className="orbit-center">{center}</div>
      {items.map((item, index) => <span key={item} className={`o${index + 1}`} style={{ '--i': index }}>{item}</span>)}
    </div>
  )
}

/* ============================================================== CALLOUTS === */

export function Insight({ children }) {
  return <div className="ib-v8-callout insight"><strong>Business Insight</strong><p>{children}</p></div>
}
export function ExamTip({ children }) {
  return <div className="ib-v8-callout exam"><strong>Exam Tip</strong><p>{children}</p></div>
}
export function Update({ children }) {
  return <div className="ib-v8-callout update"><strong>Current Context</strong><p>{children}</p></div>
}
/* V9 engagement beats */
export function ManagerView({ children }) {
  return <div className="ib-v8-callout manager"><strong>Manager’s View</strong><p>{children}</p></div>
}
export function RealWorld({ children }) {
  return <div className="ib-v8-callout realworld"><strong>Real World</strong><p>{children}</p></div>
}
export function Think({ children }) {
  return <div className="ib-v8-callout think"><strong>Think</strong><p>{children}</p></div>
}
export function DidYouKnow({ children }) {
  return <div className="ib-v8-callout fact"><strong>Did You Know?</strong><p>{children}</p></div>
}

export function Case({ title, children }) {
  return <div className="ib-v8-case"><strong>{title}</strong><p>{children}</p></div>
}

export function Definition({ term, children, keywords = [] }) {
  return (
    <div className="ib-v8-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
      {keywords.length > 0 && <div>{keywords.map((keyword) => <em key={keyword}>{keyword}</em>)}</div>}
    </div>
  )
}

/* =============================================================== EXPLAIN === */
/* The core "expand the explanation" primitive — labeled What / Why / How /
   Business-importance blocks. Pass 2–4 items. */
export function Explain({ items }) {
  return (
    <div className={`ib-v9-explain cols-${items.length}`}>
      {items.map((item, i) => (
        <article key={item.k} style={{ '--i': i }}>
          <span>{item.k}</span>
          <p>{item.v}</p>
        </article>
      ))}
    </div>
  )
}

/* ============================================================== TIMELINE === */
/* Animated horizontal timeline with a progressively drawn rail. */
export function Timeline({ items }) {
  return (
    <div className="ib-v9-timeline" style={{ '--count': items.length }}>
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <span className="ib-v9-node" aria-hidden="true">{i + 1}</span>
          <em>{item.era}</em>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ============================================================ THEORY GRID === */
export function TheoryCanvas({ theory }) {
  return (
    <div className="ib-v8-theory">
      <article><span>What it says</span><p>{theory.what}</p></article>
      <article><span>Why proposed</span><p>{theory.why}</p></article>
      <article><span>Example</span><p>{theory.example}</p></article>
      <article><span>Modern relevance</span><p>{theory.relevance}</p></article>
      <article><span>Limitation</span><p>{theory.limitation}</p></article>
    </div>
  )
}

/* =========================================================== ENTRY LADDER === */
/* Commitment / control ladder. rows: {mode, desc, control, risk}. */
export function EntryLadder({ rows }) {
  return (
    <div className="ib-v9-ladder">
      <header aria-hidden="true"><b>Entry mode</b><b>What it means</b><b>Control</b><b>Risk / cost</b></header>
      {rows.map((row, i) => (
        <article key={row.mode} style={{ '--i': i }}>
          <b>{row.mode}</b>
          <span>{row.desc}</span>
          <em className={`lvl lvl-${row.control}`}>{row.control}</em>
          <em className={`lvl lvl-${row.risk}`}>{row.risk}</em>
        </article>
      ))}
    </div>
  )
}

/* ============================================================== MINI CASE === */
/* Full-slide business-case spotlight. Reuses the chapter grid for composition
   + overflow safety, with a distinctive case treatment. */
export function MiniCase({ company, sector, headline, situation, moves, result, lesson, mode = 'standard', canvas }) {
  return (
    <div className={`ib-chapter ib-v9-minicase compose-${mode}`} data-slide-content="true">
      <section className="ib-story-panel">
        <span className="ib-section-label">Business Case · {company}</span>
        <h2>{headline}</h2>
        <p>{situation}</p>
        <div className="ib-v9-case-lesson"><strong>Lesson for managers</strong><p>{lesson}</p></div>
      </section>
      <section className="ib-visual-panel">
        {canvas || (
          <div className="ib-v9-case-track">
            <span className="ib-v9-case-sector">{sector}</span>
            <ol>
              {moves.map((m, i) => <li key={m} style={{ '--i': i }}>{m}</li>)}
            </ol>
            <div className="ib-v9-case-result"><span>Result</span><p>{result}</p></div>
          </div>
        )}
      </section>
    </div>
  )
}

/* =============================================================== EXAM PACK === */
/* End-of-module revision slide: key definitions, likely 10-mark questions,
   comparisons asked in VTU, and a memory tip. */
export function ExamPack({ title = 'Exam Pack — Module Revision', definitions = [], tenMark = [], comparisons = [], memory }) {
  return (
    <div className="ib-chapter ib-v9-exampack compose-standard" data-slide-content="true">
      <section className="ib-story-panel">
        <span className="ib-section-label">VTU Exam Pack</span>
        <h2>{title}</h2>
        <div className="ib-v9-exam-defs">
          {definitions.map((d) => (
            <article key={d.term}><strong>{d.term}</strong><p>{d.text}</p></article>
          ))}
        </div>
      </section>
      <section className="ib-visual-panel">
        <div className="ib-v9-exam-side">
          <div className="ib-v9-exam-block">
            <span>Likely 10-mark questions</span>
            <ul>{tenMark.map((q) => <li key={q}>{q}</li>)}</ul>
          </div>
          {comparisons.length > 0 && (
            <div className="ib-v9-exam-block compare">
              <span>Comparisons asked</span>
              <ul>{comparisons.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          )}
          {memory && <div className="ib-v9-exam-memory"><strong>Memory tip</strong><p>{memory}</p></div>}
        </div>
      </section>
    </div>
  )
}
