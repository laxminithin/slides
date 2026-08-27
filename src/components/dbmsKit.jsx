/**
 * DBMS teaching kit — reusable, step-animated components shared by all five
 * DBMS modules. Every visual is built so that each animation step produces a
 * clearly VISIBLE change (highlight, fade, insert, delete, before→after,
 * drawn connector) rather than an invisible reveal.
 */

/* ---------- reveal + step helpers ---------- */
export function Reveal({ show = true, dim = false, children, className = '' }) {
  const state = !show ? 'is-hidden' : dim ? 'is-dim' : ''
  return <div className={`db-reveal ${state} ${className}`.trim()}>{children}</div>
}

/** SVG-native reveal: a <g> with an opacity transition (valid inside <svg>). */
function SReveal({ show = true, children }) {
  return <g style={{ opacity: show ? 1 : 0, transition: 'opacity .42s ease' }}>{children}</g>
}

export function StepNote({ step, notes }) {
  // notes: array of { at, text, tone }
  const active = [...notes].reverse().find((n) => step >= n.at)
  return <div className={`db-step-note ${active?.tone || ''}`.trim()}>{active?.text || notes[0]?.text || ''}</div>
}

export function Fig({ title, children, caption }) {
  return (
    <div className="db-fig">
      {title && <p className="db-fig-title">{title}</p>}
      {children}
      {caption && <p className="db-caption">{caption}</p>}
    </div>
  )
}

export function Legend({ items }) {
  return (
    <div className="db-legend">
      {items.map(([color, label]) => (
        <span key={label}><i style={{ background: color }} />{label}</span>
      ))}
    </div>
  )
}

/* ---------- animated data table ----------
 * columns: [{ label, tag?: 'pk'|'fk' }]
 * rows: [{ cells: (string | {was, now})[], state?: 'hot'|'in'|'del'|'dim' }]
 * hotCols: number[]  (column indices to highlight)
 */
export function DataTable({ caption, columns, rows, hotCols = [] }) {
  return (
    <div className="db-table-wrap">
      <table className="db-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col, i) => {
              const c = typeof col === 'string' ? { label: col } : col
              const cls = [hotCols.includes(i) ? 'col-hot' : '', c.tag ? `col-${c.tag}` : ''].filter(Boolean).join(' ')
              return (
                <th key={c.label} className={cls}>
                  {c.label}
                  {c.tag && <span className={`db-badge ${c.tag}`}>{c.tag.toUpperCase()}</span>}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={row.key || r} className={row.state ? `row-${row.state}` : ''}>
              {row.cells.map((cell, c) => (
                <td key={c} className={hotCols.includes(c) ? 'col-hot' : ''}>
                  {cell && typeof cell === 'object'
                    ? (<><span className="db-cell-was">{cell.was}</span><span className="db-cell-now">{cell.now}</span></>)
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- SVG primitives ---------- */
function EntityBox({ x, y, w = 150, h = 60, label, weak = false, fill = 'var(--db-entity)' }) {
  return (
    <g>
      {weak && <rect x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx="8" fill="none" stroke={fill} strokeWidth="2.5" />}
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} />
      <text x={x + w / 2} y={y + h / 2} className="db-svg-entity">{label}</text>
    </g>
  )
}

function Diamond({ cx, cy, w = 132, h = 66, label, identifying = false }) {
  const pts = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`
  return (
    <g>
      {identifying && <polygon points={`${cx},${cy - h / 2 - 5} ${cx + w / 2 + 6},${cy} ${cx},${cy + h / 2 + 5} ${cx - w / 2 - 6},${cy}`} fill="none" stroke="var(--db-rel)" strokeWidth="2.5" />}
      <polygon points={pts} fill="var(--db-rel)" />
      <text x={cx} y={cy} className="db-svg-rel">{label}</text>
    </g>
  )
}

function Attr({ cx, cy, rx = 52, ry = 22, label, kind }) {
  // kind: 'key' | 'multi' | 'derived' | undefined
  const dash = kind === 'derived' ? '5 4' : undefined
  return (
    <g>
      {kind === 'multi' && <ellipse cx={cx} cy={cy} rx={rx + 5} ry={ry + 5} fill="#fff" stroke="var(--db-entity)" strokeWidth="2" />}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" stroke="var(--db-entity)" strokeWidth="2" strokeDasharray={dash} />
      <text x={cx} y={cy} className="db-svg-attr" style={kind === 'key' ? { textDecoration: 'underline' } : undefined}>{label}</text>
    </g>
  )
}

/* ---------- Module 1 diagrams ---------- */

/** Scattered department files all repeating the same student — the redundancy problem. */
export function FileChaos({ step = 0 }) {
  const files = [
    ['Admissions.xls', '#4338ca'],
    ['Attendance.xls', '#0e7490'],
    ['Marks.xls', '#7c3aed'],
    ['Fees.xls', '#b45309'],
    ['Library.xls', '#be123c'],
  ]
  return (
    <Fig title="Five departments, five separate files">
      <svg viewBox="0 0 680 300" role="img" aria-label="Duplicate student data across department files">
        {files.map(([name, color], i) => {
          const x = 20 + i * 132
          const dup = step >= 1
          return (
            <g key={name}>
              <rect x={x} y="40" width="112" height="150" rx="10" fill="#fff" stroke={color} strokeWidth="2.5" />
              <rect x={x} y="40" width="112" height="30" rx="10" fill={color} />
              <text x={x + 56} y="55" className="db-svg-rel" style={{ fontSize: '12px' }}>{name}</text>
              <text x={x + 56} y="92" className="db-svg-attr" style={{ fontSize: '12px', fontWeight: 800, fill: dup ? '#b91c1c' : '#334155' }}>Asha</text>
              <text x={x + 56} y="112" className="db-svg-attr" style={{ fontSize: '11px', fill: dup ? '#b91c1c' : '#64748b' }}>1AB23IS001</text>
              <line x1={x + 16} y1="128" x2={x + 96} y2="128" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1={x + 16} y1="146" x2={x + 96} y2="146" stroke="#e2e8f0" strokeWidth="1.5" />
              <line x1={x + 16} y1="164" x2={x + 96} y2="164" stroke="#e2e8f0" strokeWidth="1.5" />
              {step >= 2 && i === 3 && (
                <g>
                  <rect x={x + 8} y="80" width="96" height="24" rx="6" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1.5" />
                  <text x={x + 56} y="92" className="db-svg-attr" style={{ fontSize: '11px', fill: '#b91c1c', fontWeight: 800 }}>Aasha ✗</text>
                </g>
              )}
            </g>
          )
        })}
        {step >= 1 && <text x="340" y="230" className="db-svg-note" style={{ fill: '#b91c1c', fontWeight: 800 }}>Same student typed 5 times → redundancy</text>}
        {step >= 2 && <text x="340" y="256" className="db-svg-note" style={{ fill: '#b91c1c', fontWeight: 800 }}>One file spells it “Aasha” → inconsistency</text>}
        {step >= 3 && <text x="340" y="282" className="db-svg-note" style={{ fill: '#334155', fontWeight: 800 }}>Update, security and integrity all break down</text>}
      </svg>
    </Fig>
  )
}

/** Applications talking to one shared database THROUGH the DBMS. */
export function DbmsEnvironment({ step = 0 }) {
  const apps = ['Student portal', 'Faculty app', 'Library', 'Accounts']
  return (
    <Fig title="One database, accessed through the DBMS">
      <svg viewBox="0 0 680 320" role="img" aria-label="DBMS environment">
        {apps.map((a, i) => (
          <SReveal key={a} show={step >= 0}>
            <g>
              <rect x={30 + i * 158} y="20" width="140" height="46" rx="9" fill="#eef2ff" stroke="#4338ca" strokeWidth="2" />
              <text x={100 + i * 158} y="43" className="db-svg-attr" style={{ fill: '#3730a3', fontWeight: 800 }}>{a}</text>
              {step >= 1 && <line x1={100 + i * 158} y1="66" x2="340" y2="118" stroke="#94a3b8" strokeWidth="2" />}
            </g>
          </SReveal>
        ))}
        <rect x="210" y="120" width="260" height="60" rx="12" fill="#4338ca" />
        <text x="340" y="150" className="db-svg-entity">DBMS software</text>
        {step >= 2 && <line x1="340" y1="180" x2="340" y2="216" stroke="#94a3b8" strokeWidth="2.5" />}
        <g>
          <ellipse cx="340" cy="228" rx="92" ry="16" fill="#c7d2fe" />
          <rect x="248" y="228" width="184" height="60" fill="#c7d2fe" />
          <ellipse cx="340" cy="288" rx="92" ry="16" fill="#a5b4fc" />
          <text x="340" y="258" className="db-svg-attr" style={{ fill: '#312e81', fontWeight: 800 }}>Database</text>
        </g>
        {step >= 3 && (
          <g>
            <rect x="486" y="210" width="170" height="70" rx="10" fill="#fff7ea" stroke="#b45309" strokeWidth="2" />
            <text x="571" y="234" className="db-svg-attr" style={{ fill: '#92400e', fontWeight: 800 }}>Catalog / metadata</text>
            <text x="571" y="256" className="db-svg-note" style={{ fill: '#92400e' }}>schema, types,</text>
            <text x="571" y="272" className="db-svg-note" style={{ fill: '#92400e' }}>constraints</text>
          </g>
        )}
      </svg>
    </Fig>
  )
}

/** Three-schema architecture with a request travelling down and data back up. */
export function ThreeSchema({ step = 0 }) {
  const levels = [
    ['External level', 'Student view · Faculty view · Accounts view', '#7c3aed'],
    ['Conceptual level', 'Entities, relationships and constraints for the whole college', '#4338ca'],
    ['Internal level', 'Files, indexes, pages and storage paths', '#0e7490'],
  ]
  return (
    <Fig title="What users see vs. what the database means vs. how it is stored">
      <svg viewBox="0 0 680 300" role="img" aria-label="Three schema architecture">
        {levels.map(([title, sub, color], i) => {
          const y = 24 + i * 88
          const active = step === i + 1
          return (
            <g key={title}>
              <rect x="70" y={y} width="470" height="66" rx="12" fill={active ? color : '#fff'} stroke={color} strokeWidth="2.5" />
              <text x="305" y={y + 26} className="db-svg-attr" style={{ fill: active ? '#fff' : color, fontWeight: 800, fontSize: '15px' }}>{title}</text>
              <text x="305" y={y + 47} className="db-svg-note" style={{ fill: active ? '#e0e7ff' : '#64748b' }}>{sub}</text>
              {i < 2 && <text x="560" y={y + 84} className="db-svg-note" style={{ fill: '#94a3b8' }}>mapping</text>}
            </g>
          )
        })}
        {step >= 1 && (
          <g>
            <line x1="30" y1="40" x2="30" y2={step >= 3 ? 250 : 24 + step * 88 - 4} stroke="#b45309" strokeWidth="3" markerEnd="url(#db-down)" />
            <text x="30" y="20" className="db-svg-note" style={{ fill: '#b45309', fontWeight: 800 }}>request</text>
          </g>
        )}
        {step >= 3 && (
          <g>
            <line x1="580" y1="250" x2="580" y2="46" stroke="#15803d" strokeWidth="3" markerEnd="url(#db-up)" />
            <text x="580" y="272" className="db-svg-note" style={{ fill: '#15803d', fontWeight: 800 }}>data</text>
          </g>
        )}
        <defs>
          <marker id="db-down" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,0 L5,10 z" fill="#b45309" /></marker>
          <marker id="db-up" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,10 L10,10 L5,0 z" fill="#15803d" /></marker>
        </defs>
      </svg>
    </Fig>
  )
}

/** Attribute types on the STUDENT entity, revealed one kind at a time. */
export function AttributeShapes({ step = 0 }) {
  return (
    <Fig title="Attribute types on the STUDENT entity">
      <svg viewBox="0 0 680 340" role="img" aria-label="Attribute types">
        <EntityBox x={265} y={150} w={150} h={56} label="STUDENT" />
        {/* key (simple) */}
        <SReveal show={step >= 1}><line x1="265" y1="178" x2="120" y2="70" stroke="#94a3b8" strokeWidth="1.8" /></SReveal>
        <SReveal show={step >= 1}><Attr cx={90} cy={56} label="USN" kind="key" /></SReveal>
        {/* composite */}
        <SReveal show={step >= 2}><line x1="300" y1="150" x2="300" y2="60" stroke="#94a3b8" strokeWidth="1.8" /></SReveal>
        <SReveal show={step >= 2}><Attr cx={300} cy={44} label="Name" /></SReveal>
        <SReveal show={step >= 2}><line x1="270" y1="44" x2="210" y2="20" stroke="#cbd5e1" strokeWidth="1.5" /></SReveal>
        <SReveal show={step >= 2}><Attr cx={182} cy={16} rx={40} ry={15} label="First" /></SReveal>
        <SReveal show={step >= 2}><line x1="330" y1="44" x2="392" y2="20" stroke="#cbd5e1" strokeWidth="1.5" /></SReveal>
        <SReveal show={step >= 2}><Attr cx={420} cy={16} rx={40} ry={15} label="Last" /></SReveal>
        {/* multivalued */}
        <SReveal show={step >= 3}><line x1="415" y1="178" x2="580" y2="90" stroke="#94a3b8" strokeWidth="1.8" /></SReveal>
        <SReveal show={step >= 3}><Attr cx={606} cy={74} label="Phone" kind="multi" /></SReveal>
        {/* derived */}
        <SReveal show={step >= 4}><line x1="340" y1="206" x2="560" y2="280" stroke="#94a3b8" strokeWidth="1.8" /></SReveal>
        <SReveal show={step >= 4}><Attr cx={594} cy={292} label="Age" kind="derived" /></SReveal>
        <SReveal show={step >= 4}><line x1="300" y1="206" x2="300" y2="284" stroke="#94a3b8" strokeWidth="1.8" /></SReveal>
        <SReveal show={step >= 4}><Attr cx={300} cy={300} label="Semester" /></SReveal>
      </svg>
      <Legend items={[['#334155', 'underline = key'], ['#4338ca', 'double = multivalued'], ['#94a3b8', 'dashed = derived']]} />
    </Fig>
  )
}

/** Cardinality figure for a given ratio between STUDENT and COURSE. */
export function Cardinality({ ratio = '1:N', left = 'STUDENT', mid = 'ENROLLS', right = 'COURSE' }) {
  const [l, r] = ratio.split(':')
  return (
    <Fig title={`${ratio} relationship`}>
      <svg viewBox="0 0 680 180" role="img" aria-label={`${ratio} relationship`}>
        <EntityBox x={40} y={60} w={160} h={62} label={left} />
        <Diamond cx={340} cy={91} label={mid} />
        <EntityBox x={480} y={60} w={160} h={62} label={right} />
        <line x1="200" y1="91" x2="274" y2="91" stroke="#475569" strokeWidth="2.5" />
        <line x1="406" y1="91" x2="480" y2="91" stroke="#475569" strokeWidth="2.5" />
        <text x="237" y="78" className="db-svg-card">{l}</text>
        <text x="443" y="78" className="db-svg-card">{r}</text>
      </svg>
    </Fig>
  )
}

/** Weak entity: DEPENDENT identified through STUDENT. */
export function WeakEntity() {
  return (
    <Fig title="Weak entity depends on its owner for identity">
      <svg viewBox="0 0 680 180" role="img" aria-label="Weak entity">
        <EntityBox x={40} y={58} w={160} h={64} label="STUDENT" />
        <Diamond cx={340} cy={90} label="HAS" identifying />
        <EntityBox x={478} y={58} w={162} h={64} label="DEPENDENT" weak />
        <line x1="200" y1="90" x2="274" y2="90" stroke="#475569" strokeWidth="2.5" />
        <line x1="406" y1="90" x2="478" y2="90" stroke="#475569" strokeWidth="2.5" />
        <text x="237" y="77" className="db-svg-card">1</text>
        <text x="443" y="77" className="db-svg-card">N</text>
        <text x="559" y="140" className="db-svg-note">partial key: Dep_Name</text>
      </svg>
    </Fig>
  )
}

/** Progressive University academic ER diagram. */
export function UniversityER({ step = 0 }) {
  return (
    <Fig title="Building the University academic ER diagram">
      <svg viewBox="0 0 680 340" role="img" aria-label="University ER diagram">
        {/* STUDENT */}
        <SReveal show={step >= 0}><EntityBox x={40} y={140} w={150} h={60} label="STUDENT" /></SReveal>
        <SReveal show={step >= 1}><line x1="70" y1="140" x2="55" y2="86" stroke="#94a3b8" strokeWidth="1.6" /></SReveal>
        <SReveal show={step >= 1}><Attr cx={52} cy={70} rx={40} ry={17} label="USN" kind="key" /></SReveal>
        <SReveal show={step >= 1}><line x1="150" y1="140" x2="170" y2="86" stroke="#94a3b8" strokeWidth="1.6" /></SReveal>
        <SReveal show={step >= 1}><Attr cx={178} cy={70} rx={42} ry={17} label="Name" /></SReveal>
        {/* COURSE */}
        <SReveal show={step >= 2}><EntityBox x={490} y={140} w={150} h={60} label="COURSE" /></SReveal>
        <SReveal show={step >= 2}><line x1="520" y1="140" x2="505" y2="86" stroke="#94a3b8" strokeWidth="1.6" /></SReveal>
        <SReveal show={step >= 2}><Attr cx={502} cy={70} rx={44} ry={17} label="Code" kind="key" /></SReveal>
        <SReveal show={step >= 2}><line x1="612" y1="140" x2="628" y2="86" stroke="#94a3b8" strokeWidth="1.6" /></SReveal>
        <SReveal show={step >= 2}><Attr cx={630} cy={70} rx={44} ry={17} label="Title" /></SReveal>
        {/* relationship */}
        <SReveal show={step >= 3}><Diamond cx={340} cy={170} label="ENROLLS" /></SReveal>
        <SReveal show={step >= 3}><line x1="190" y1="170" x2="274" y2="170" stroke="#475569" strokeWidth="2.5" /></SReveal>
        <SReveal show={step >= 3}><line x1="406" y1="170" x2="490" y2="170" stroke="#475569" strokeWidth="2.5" /></SReveal>
        {/* cardinality */}
        <SReveal show={step >= 4}><text x="235" y="158" className="db-svg-card">M</text></SReveal>
        <SReveal show={step >= 4}><text x="445" y="158" className="db-svg-card">N</text></SReveal>
        <SReveal show={step >= 4}><line x1="340" y1="203" x2="340" y2="250" stroke="#94a3b8" strokeWidth="1.6" /></SReveal>
        <SReveal show={step >= 4}><Attr cx={340} cy={266} rx={52} ry={18} label="Marks" /></SReveal>
        {/* note */}
        <SReveal show={step >= 5}><text x="340" y="316" className="db-svg-note" style={{ fill: '#3730a3', fontWeight: 800 }}>A student takes many courses; a course enrols many students (M:N)</text></SReveal>
      </svg>
    </Fig>
  )
}

/** EER generalization/specialization hierarchy. */
export function EERTree({ step = 0 }) {
  const subs = [['STUDENT', 60], ['FACULTY', 290], ['STAFF', 520]]
  return (
    <Fig title="Generalization: shared attributes rise to a superclass">
      <svg viewBox="0 0 680 300" role="img" aria-label="EER hierarchy">
        <EntityBox x={265} y={30} w={150} h={58} label="PERSON" />
        <SReveal show={step >= 1}><line x1="285" y1="88" x2="180" y2="140" stroke="#94a3b8" strokeWidth="1.6" /></SReveal>
        <SReveal show={step >= 1}><Attr cx={150} cy={126} rx={46} ry={17} label="ID, Name" /></SReveal>
        <SReveal show={step >= 2}>
          <g>
            <circle cx="340" cy="140" r="20" fill="#fff" stroke="var(--db-rel)" strokeWidth="2.5" />
            <text x="340" y="140" className="db-svg-attr" style={{ fill: 'var(--db-rel)', fontWeight: 900 }}>d</text>
            <line x1="340" y1="88" x2="340" y2="120" stroke="#475569" strokeWidth="2" />
          </g>
        </SReveal>
        {step >= 3 && subs.map(([label, x], i) => (
          <g key={label}>
            <line x1="340" y1="160" x2={x + 75} y2="220" stroke="#475569" strokeWidth="2" />
            <EntityBox x={x} y={220} w={150} h={54} label={label} fill="#6366f1" />
            {i === 0 && <text x={x + 75} y="300" className="db-svg-note">+ USN, Semester</text>}
            {i === 1 && <text x={x + 75} y="300" className="db-svg-note">+ Designation</text>}
          </g>
        ))}
      </svg>
    </Fig>
  )
}
