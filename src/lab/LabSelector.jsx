import { Link } from 'react-router-dom'
import { LAB_PROGRAMS } from './catalog'
import { getModuleProgress } from '../lib/progress'

function Mini({ tone }) {
  if (tone === 'hdfs') {
    return (
      <svg viewBox="0 0 220 72" aria-hidden="true">
        <rect x="12" y="18" width="70" height="40" rx="8" fill="#dbeafe" stroke="#2563eb" />
        <text x="47" y="43" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1d4ed8">LOCAL</text>
        <text x="110" y="40" textAnchor="middle" fontSize="16" fill="#0f766e">→</text>
        <rect x="138" y="18" width="70" height="40" rx="8" fill="#ccfbf1" stroke="#0f766e" />
        <text x="173" y="43" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f766e">HDFS</text>
      </svg>
    )
  }
  if (tone === 'mr') {
    return (
      <svg viewBox="0 0 220 72" aria-hidden="true">
        <rect x="10" y="16" width="36" height="40" rx="6" fill="#fff" stroke="#cbd5e1" />
        <rect x="18" y="24" width="8" height="8" fill="#2563eb" />
        <rect x="30" y="24" width="8" height="8" fill="#2563eb" />
        <rect x="18" y="36" width="8" height="8" fill="#2563eb" />
        <rect x="30" y="36" width="8" height="8" fill="#2563eb" />
        <text x="78" y="42" fontSize="11" fontWeight="800" fill="#2563eb">MAP</text>
        <text x="118" y="42" fontSize="11" fill="#94a3b8">→</text>
        <text x="148" y="42" fontSize="11" fontWeight="800" fill="#d97706">RED</text>
        <rect x="184" y="22" width="26" height="28" rx="4" fill="#ecfdf5" stroke="#0f766e" />
      </svg>
    )
  }
  if (tone === 'weather') {
    return (
      <svg viewBox="0 0 220 72" aria-hidden="true">
        <text x="24" y="44" fontSize="22">☀</text>
        <text x="70" y="32" fontSize="11" fontWeight="800" fill="#d97706">MAX &gt; 35</text>
        <text x="70" y="50" fontSize="11" fontWeight="800" fill="#2563eb">MIN &lt; 10</text>
        <text x="176" y="44" fontSize="22">❄</text>
      </svg>
    )
  }
  if (tone === 'movie') {
    return (
      <svg viewBox="0 0 220 72" aria-hidden="true">
        <rect x="12" y="20" width="80" height="32" rx="8" fill="#ede9fe" stroke="#7c3aed" />
        <text x="52" y="41" textAnchor="middle" fontSize="10" fontWeight="800" fill="#5b21b6">movieId</text>
        <text x="110" y="42" fontSize="14" fill="#7c3aed">⋈</text>
        <rect x="128" y="20" width="80" height="32" rx="8" fill="#fae8ff" stroke="#a21caf" />
        <text x="168" y="41" textAnchor="middle" fontSize="10" fontWeight="800" fill="#86198f">tags</text>
      </svg>
    )
  }
  if (tone === 'pig') {
    return (
      <svg viewBox="0 0 220 72" aria-hidden="true">
        {['LOAD', 'FILTER', 'GROUP'].map((w, i) => (
          <g key={w}>
            <rect x={12 + i * 68} y="22" width="60" height="28" rx="8" fill={i === 1 ? '#111827' : '#fff'} stroke="#c2410c" />
            <text x={42 + i * 68} y="41" textAnchor="middle" fontSize="10" fontWeight="800" fill={i === 1 ? '#fff' : '#9a3412'}>{w}</text>
          </g>
        ))}
      </svg>
    )
  }
  if (tone === 'hive') {
    return (
      <svg viewBox="0 0 220 72" aria-hidden="true">
        <text x="18" y="42" fontSize="12" fontWeight="800" fill="#ca8a04">hive&gt;</text>
        <rect x="78" y="18" width="52" height="16" rx="4" fill="#fef3c7" />
        <rect x="78" y="38" width="118" height="16" rx="4" fill="#fff" stroke="#eab308" />
        <text x="88" y="50" fontSize="9" fontWeight="700" fill="#854d0e">employee</text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 220 72" aria-hidden="true">
      {['line', 'word', '(w,1)', 'count'].map((w, i) => (
        <g key={w}>
          <rect x={8 + i * 53} y="22" width="48" height="28" rx="8" fill={i === 3 ? '#e11d48' : '#fff'} stroke="#e11d48" />
          <text x={32 + i * 53} y="41" textAnchor="middle" fontSize="9" fontWeight="800" fill={i === 3 ? '#fff' : '#9f1239'}>{w}</text>
        </g>
      ))}
    </svg>
  )
}

export default function LabSelector({ subject }) {
  return (
    <main className="lab-selector">
      <div className="lab-selector-inner">
        <Link className="lab-crumb" to={`/${subject.id}`}><span aria-hidden="true">←</span> Big Data Analytics</Link>
        <header className="lab-selector-hero">
          <p className="lab-hero-kicker">Practical laboratory</p>
          <h1>Big Data Analytics Laboratory</h1>
          <p>Choose a program to learn. Each experiment walks from the problem and input, through the code and a visual dry run, to output, errors and viva.</p>
        </header>
        <div className="lab-prog-grid">
          {LAB_PROGRAMS.map((p) => {
            const record = getModuleProgress(subject.id, p.id)
            const pct = record?.total ? Math.round(((Math.min(record.total - 1, record.furthest) + 1) / record.total) * 100) : 0
            return (
              <Link
                key={p.id}
                className="lab-prog-card"
                to={`/${subject.id}/${p.id}`}
                style={{ '--card-accent': p.accent }}
              >
                <div className="lab-prog-num">Program {p.number}{pct > 0 ? ` · ${pct}%` : ''}</div>
                <div className="lab-mini"><Mini tone={p.tone} /></div>
                <h2>{p.title}</h2>
                <span className="lab-pill tone-teal">{p.tech}</span>
                <p className="lab-prog-obj">{p.objective}</p>
                <div className="lab-prog-meta">
                  <span className="lab-pill">{p.difficulty}</span>
                  <span className="lab-pill">{p.time}</span>
                </div>
                <span className="lab-prog-go">Start learning →</span>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
