/**
 * PageRankViz — animated directed web graph that explains PageRank (Module 5).
 * Reuses hv-* classes + primitives. Structure always painted (pause-safe);
 * packets = rank contribution flowing along out-links; node size + glow scale
 * with rank; an iteration indicator shows convergence. Reduced-motion safe.
 */
import { Defs, Packet } from './HadoopViz'

const T = { fontFamily: 'inherit' }

/* 5 web pages. rank values are an illustrative converged example (sum ≈ 1). */
const NODES = {
  A: { label: 'University', x: 150, y: 132, rank: 0.20, color: '#0f9d94' },
  B: { label: 'Government', x: 348, y: 96, rank: 0.30, color: '#2f6bff' },
  C: { label: 'News', x: 540, y: 150, rank: 0.26, color: '#7c5cff' },
  D: { label: 'Blog', x: 150, y: 300, rank: 0.10, color: '#7a8698' },
  E: { label: 'Spam', x: 424, y: 316, rank: 0.14, color: '#e07a86', dangling: true },
}
/* directed hyperlinks (source → target) */
const EDGES = [['A', 'B'], ['C', 'B'], ['D', 'A'], ['D', 'C'], ['B', 'C'], ['D', 'E']]

const radius = (rank, showRanks) => (showRanks ? 17 + rank * 66 : 26)

export function PageRankGraph({ showRanks = true }) {
  const nodes = Object.fromEntries(
    Object.entries(NODES).map(([k, n]) => [k, { ...n, r: radius(n.rank, showRanks) }]),
  )
  return (
    <svg className="hv-svg" viewBox="0 0 640 400" role="img" aria-label="PageRank directed web graph">
      <Defs />

      {/* directed edges with arrowheads + rank-contribution packets */}
      {EDGES.map(([s, t], i) => {
        const a = nodes[s]
        const b = nodes[t]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const len = Math.hypot(dx, dy) || 1
        const ux = dx / len
        const uy = dy / len
        const x1 = a.x + ux * a.r
        const y1 = a.y + uy * a.r
        const x2 = b.x - ux * (b.r + 8)
        const y2 = b.y - uy * (b.r + 8)
        return (
          <g key={`${s}${t}`}>
            <line className="hv-conn hv-flow" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#hvArrow)" />
            {showRanks && <Packet x={x1} y={y1} dx={x2 - x1} dy={y2 - y1} r={4.5} color={a.color} dur={2.6} delay={i * 0.35} />}
          </g>
        )
      })}

      {/* nodes: size + glow scale with rank */}
      {Object.entries(nodes).map(([k, n]) => (
        <g key={k}>
          {showRanks && <circle className="hv-rank-glow" cx={n.x} cy={n.y} r={n.r + 12} fill={n.color} />}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.94" />
          {showRanks && <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" style={T}>{n.rank.toFixed(2)}</text>}
          <text x={n.x} y={n.y + n.r + 16} textAnchor="middle" fontSize="12" fontWeight="800" fill="#16233b" style={T}>{n.label}</text>
          {showRanks && n.dangling && (
            <text x={n.x} y={n.y + n.r + 30} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#c0293e" style={T}>dangling · rank redistributed</text>
          )}
        </g>
      ))}

      {showRanks && (
        <g>
          {/* numeric example + formula */}
          <rect x="12" y="12" width="212" height="70" rx="10" fill="#ffffffcc" stroke="#d7e0ee" />
          <text x="24" y="32" fontSize="11" fontWeight="800" fill="#16233b" style={T}>Start: every page = 0.20</text>
          <text x="24" y="50" fontSize="10.5" fontWeight="700" fill="#5b6b82" style={T}>PR = 0.15 + 0.85 · Σ PR(in) / out</text>
          <text x="24" y="68" fontSize="10.5" fontWeight="700" fill="#5b6b82" style={T}>rank flows through out-links</text>

          {/* iteration / convergence indicator */}
          <g transform="translate(430, 26)">
            <text x="0" y="4" fontSize="11" fontWeight="800" fill="#16233b" style={T}>iterations</text>
            {[0, 1, 2].map((i) => (
              <circle key={i} className="hv-led" cx={78 + i * 20} cy="0" r="5" style={{ '--delay': `${i * 0.5}s` }} />
            ))}
            <circle cx="150" cy="0" r="9" fill="#eafaf2" stroke="#17a06b" />
            <path d="M145 0 l4 4 l7 -8" fill="none" stroke="#17a06b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="0" y="22" fontSize="10" fontWeight="700" fill="#0d7a54" style={T}>converged: ranks stop changing</text>
          </g>
        </g>
      )}
    </svg>
  )
}
