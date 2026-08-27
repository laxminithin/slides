import React from 'react'

function Frame({ children, label }) {
  return (
    <svg className="rem-svg" viewBox="0 0 1100 520" role="img" aria-label={label} data-slide-content="true" fontSize="24" overflow="hidden">
      <rect width="1100" height="520" rx="22" fill="#fff" />
      {children}
    </svg>
  )
}

export function DialogueScene({ poor, good }) {
  return (
    <div className="rem-dialogue" data-slide-content="true">
      <div className="rem-bubble" data-who="poor"><strong>Poor</strong> {poor}</div>
      <div className="rem-bubble" data-who="good"><strong>Improved</strong> {good}</div>
    </div>
  )
}

export function ChannelScene() {
  return (
    <Frame label="Communication process">
      <rect x="40" y="180" width="160" height="110" rx="16" fill="#ccfbf1" />
      <text x="120" y="245" textAnchor="middle">Sender</text>
      <path d="M210 235 H330" stroke="#0f766e" strokeWidth="8" />
      <text x="270" y="220" textAnchor="middle">Message</text>
      <rect x="340" y="170" width="180" height="130" rx="16" fill="#e0e7ff" />
      <text x="430" y="245" textAnchor="middle">Channel</text>
      <path d="M530 235 H650" stroke="#0f766e" strokeWidth="8" />
      <rect x="660" y="180" width="170" height="110" rx="16" fill="#d1fae5" />
      <text x="745" y="245" textAnchor="middle">Receiver</text>
      <path d="M745 300 C 500 430 300 390 120 300" fill="none" stroke="#b45309" strokeWidth="6" strokeDasharray="10 8" />
      <text x="430" y="400" textAnchor="middle">Feedback</text>
      <text x="80" y="80">Noise in the channel can distort the message.</text>
    </Frame>
  )
}

export function OrgChartScene() {
  return (
    <Frame label="Union structure">
      <rect x="400" y="30" width="300" height="70" rx="12" fill="#ccfbf1" /><text x="550" y="74" textAnchor="middle">Constitution / People</text>
      <rect x="80" y="160" width="240" height="70" rx="12" fill="#e0e7ff" /><text x="200" y="204" textAnchor="middle">Legislature</text>
      <rect x="430" y="160" width="240" height="70" rx="12" fill="#fef3c7" /><text x="550" y="204" textAnchor="middle">Executive</text>
      <rect x="780" y="160" width="240" height="70" rx="12" fill="#fce7f3" /><text x="900" y="204" textAnchor="middle">Judiciary</text>
      <path d="M550 100 V160 M200 160 V130 H900 V160" fill="none" stroke="#0f766e" strokeWidth="4" />
      <rect x="80" y="280" width="240" height="90" rx="12" /><text x="200" y="320" textAnchor="middle">LS + RS</text><text x="200" y="352" textAnchor="middle">law making</text>
      <rect x="430" y="280" width="240" height="90" rx="12" /><text x="550" y="320" textAnchor="middle">President / PM</text><text x="550" y="352" textAnchor="middle">Cabinet</text>
      <rect x="780" y="280" width="240" height="90" rx="12" /><text x="900" y="320" textAnchor="middle">Supreme Court</text><text x="900" y="352" textAnchor="middle">review</text>
      <text x="80" y="498">Roles are related, not three isolated boxes.</text>
    </Frame>
  )
}

export function VocabScene({ items = [] }) {
  return (
    <div className="rem-vocab" data-slide-content="true">
      {items.slice(0, 4).map((item, i) => (
        <article key={item.word} style={{ '--i': i }}>
          <strong>{item.word}</strong>
          <span>{item.meaning}</span>
          <span>{item.usage}</span>
        </article>
      ))}
    </div>
  )
}

export function PassageScene({ author, passage, meaning }) {
  return (
    <div className="rem-passage" data-slide-content="true">
      <strong>{author}</strong>
      <blockquote>{passage}</blockquote>
      <p>{meaning}</p>
    </div>
  )
}

export function LabCircuitScene({ title = 'Ohm verification' }) {
  return (
    <Frame label={title}>
      <circle cx="140" cy="260" r="36" fill="#fee2e2" /><text x="140" y="268" textAnchor="middle">V</text>
      <rect x="280" y="232" width="120" height="56" rx="8" fill="#fef3c7" /><text x="340" y="268" textAnchor="middle">R</text>
      <circle cx="520" cy="260" r="36" fill="#dbeafe" /><text x="520" y="268" textAnchor="middle">A</text>
      <path d="M176 260 H280 M400 260 H484 M556 260 H760 V360 H140 V296" fill="none" stroke="#b91c1c" strokeWidth="7" />
      <text x="80" y="80">{title}</text>
      <text x="80" y="498">Match V and A polarity to the source.</text>
    </Frame>
  )
}

export function MechBenchScene({ title = 'Lathe operation' }) {
  return (
    <Frame label={title}>
      <rect x="120" y="220" width="520" height="70" rx="8" fill="#e2e8f0" />
      <rect x="300" y="180" width="180" height="40" fill="#f59e0b" />
      <rect x="700" y="160" width="40" height="160" fill="#64748b" />
      <text x="390" y="206" textAnchor="middle">work</text>
      <text x="760" y="250">tool</text>
      <text x="80" y="80">{title}</text>
      <text x="80" y="498">Work rotates; the tool feeds.</text>
    </Frame>
  )
}

export function ProjectJourneyScene() {
  return (
    <Frame label="Project journey">
      {['Problem', 'Define', 'Ideate', 'Prototype', 'Test', 'Pitch'].map((label, i) => (
        <g key={label}>
          <rect x={40 + i * 175} y="200" width="150" height="90" rx="14" fill="#ede9fe" />
          <text x={115 + i * 175} y="254" textAnchor="middle">{label}</text>
        </g>
      ))}
      <text x="80" y="80">Activity path, not a theory list.</text>
      <text x="80" y="498">Each stage has a named deliverable.</text>
    </Frame>
  )
}

export function RemainingVisual({ kind }) {
  if (kind === 'channel') return <ChannelScene />
  if (kind === 'org') return <OrgChartScene />
  if (kind === 'circuit') return <LabCircuitScene />
  if (kind === 'bench') return <MechBenchScene />
  if (kind === 'project') return <ProjectJourneyScene />
  if (kind === 'rectifier') return <LabCircuitScene title="Rectifier and load" />
  if (kind === 'gates') return <LabCircuitScene title="Logic-gate trainer" />
  if (kind === 'materials') return <MechBenchScene title="Gauge and specimen" />
  return <ChannelScene />
}
