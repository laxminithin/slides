/**
 * MongoViz — living MongoDB collection/document flow (Module 3).
 * Reuses hv-* classes + primitives. Application issues MQL CRUD operations
 * (cycling), a BSON document flows into a collection of flexible documents.
 * Structure always painted (pause-safe); reduced-motion safe.
 */
import { Defs, Packet, Link } from './HadoopViz'

const T = { fontFamily: 'inherit' }

const OPS = ['insertOne()', 'find()', 'updateOne()', 'deleteOne()']
const FIELDS = [
  ['_id', 'ObjectId(..)'],
  ['name', '"Asha"'],
  ['dept', '"ISE"'],
  ['cgpa', '8.6'],
  ['skills', '[ "Python", … ]'],
]
const DOCS = [
  { name: 'Asha', dept: 'ISE', cgpa: '8.6', hot: true },
  { name: 'Ravi', dept: 'CSE', cgpa: '7.9' },
  { name: 'Meena', dept: 'ISE', cgpa: '9.1' },
  { name: 'Kiran', dept: 'ECE', cgpa: '7.2' },
]

export function MongoCollectionFlow() {
  return (
    <svg className="hv-svg" viewBox="0 0 640 512" role="img" aria-label="MongoDB application writing BSON documents into a collection">
      <Defs />

      {/* LEFT COLUMN — Application (top) stacked over the BSON document (bottom) */}
      {/* Application + MQL operations (cycling) */}
      <g>
        <rect className="hv-box" x="14" y="30" width="272" height="192" rx="13" />
        <text className="hv-title" x="150" y="58" textAnchor="middle" fontSize="14" style={T}>Application</text>
        <text className="hv-sub" x="150" y="76" textAnchor="middle" fontSize="10.5" style={T}>MongoDB Query Language</text>
        {OPS.map((op, i) => (
          <g key={op} className="hv-op" style={{ animationDelay: `${i * 2}s` }}>
            <rect x="30" y={92 + i * 30} width="240" height="25" rx="7" fill="#eef3ff" stroke="#cddcff" />
            <text x="150" y={109 + i * 30} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#2450c8" style={T}>{op}</text>
          </g>
        ))}
      </g>

      {/* app -> document (build) */}
      <Link x1={150} y1={222} x2={150} y2={258} flow />
      <Packet x={150} y={222} dx={0} dy={36} color="var(--hv-blue)" dur={1.8} />

      {/* BSON document (one record) */}
      <g>
        <rect className="hv-box hv-nn" x="14" y="258" width="272" height="236" rx="13" />
        <text className="hv-title" x="34" y="286" fontSize="14" style={T}>{'{ } document'}</text>
        <text className="hv-sub" x="34" y="304" fontSize="10" style={T}>one record · BSON</text>
        {FIELDS.map(([k, v], i) => (
          <g key={k}>
            <text x="34" y={334 + i * 30} fontSize="12.5" fontWeight="800" fill="#2f6bff" style={T}>{k}</text>
            <text x="120" y={334 + i * 30} fontSize="12.5" fontWeight="700" fill="#46536a" style={T}>{v}</text>
          </g>
        ))}
        <text className="hv-sub" x="34" y="484" fontSize="10" style={T}>field = key : value</text>
      </g>

      {/* document -> collection (insert flows a document in) */}
      <Link x1={286} y1={330} x2={330} y2={250} flow />
      <Packet x={286} y={330} dx={44} dy={-80} color="var(--hv-teal)" dur={2.4} square />

      {/* RIGHT — tall collection of flexible documents (full height) */}
      <g>
        <rect className="hv-box" x="330" y="30" width="296" height="464" rx="14" />
        <g transform="translate(348,52)">
          <rect x="0" y="0" width="18" height="14" rx="2" fill="none" stroke="#2f6bff" strokeWidth="1.7" />
          <path d="M0 4.5 h18 M0 9 h18" stroke="#2f6bff" strokeWidth="1.5" />
        </g>
        <text className="hv-title" x="376" y="66" fontSize="14.5" style={T}>college.students</text>
        <text className="hv-sub" x="348" y="88" fontSize="10.5" style={T}>collection = many flexible documents</text>
        {DOCS.map((d, i) => (
          <g key={d.name}>
            <rect x="348" y={104 + i * 88} width="260" height="76" rx="10"
              fill={d.hot ? '#eef3ff' : '#f7f9fd'} stroke={d.hot ? '#2f6bff' : '#d7e0ee'} strokeWidth={d.hot ? 2 : 1.3} />
            {d.hot && <circle className="hv-led" cx="596" cy={122 + i * 88} r="4" style={{ fill: 'var(--hv-blue)' }} />}
            <text x="366" y={136 + i * 88} fontSize="14" fontWeight="800" fill="#16233b" style={T}>{`{ name: "${d.name}",`}</text>
            <text x="366" y={158 + i * 88} fontSize="12" fontWeight="700" fill="#5b6b82" style={T}>{`dept: "${d.dept}", cgpa: ${d.cgpa} }`}</text>
          </g>
        ))}
        <text className="hv-sub" x="348" y="484" fontSize="9.5" style={T}>documents in one collection can differ in shape</text>
      </g>
      {/* query match highlight ring on the first (matched) document */}
      <circle className="hv-ring" cx="478" cy="142" r="70" style={{ '--dur': '3.4s' }} />
    </svg>
  )
}
