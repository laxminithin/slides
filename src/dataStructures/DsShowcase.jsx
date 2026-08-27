/**
 * DsShowcase — A+ hero scenes for Data Structures.
 * Wide canvas (viewBox 0 0 1200 600), concept-native dsv-* motion.
 * Keyed by slide id for buildSlides showcase layout.
 */
import { DS, L } from './DsScenes.jsx'

const { N, BLUE, RED, AMBER, PURP, GREEN, TEAL, CREAM, SKY, MUTED } = DS
const MOD_HUE = { 1: BLUE, 2: AMBER, 3: PURP, 4: TEAL, 5: GREEN }

function SFrame({ eyebrow, title, hue = BLUE, note, children, vb = '0 0 1200 600' }) {
  return (
    <div className="ds-scene ds-showcase-scene" aria-label={title || 'Data structures showcase'}>
      <svg viewBox={vb} role="img" className="ds-svg">
        <defs>
          <linearGradient id="dsScBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={CREAM} />
          </linearGradient>
          <marker id="dsScArr" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto">
            <path d="M0 0 L11 5 L0 10 Z" fill={N} />
          </marker>
          <marker id="dsScArrH" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto">
            <path d="M0 0 L11 5 L0 10 Z" fill={hue} />
          </marker>
          <marker id="dsScArrP" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto">
            <path d="M0 0 L11 5 L0 10 Z" fill={PURP} />
          </marker>
          <marker id="dsScArrT" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto">
            <path d="M0 0 L11 5 L0 10 Z" fill={TEAL} />
          </marker>
        </defs>
        <rect width="1200" height="600" fill="url(#dsScBg)" rx="10" />
        <rect x="0" y="0" width="1200" height="6" fill={hue} opacity="0.9" />
        {eyebrow ? (
          <text x="54" y="52" fontSize="19" fontWeight="800" letterSpacing="2" fill={hue} fontFamily="system-ui,sans-serif">{eyebrow}</text>
        ) : null}
        {title ? (
          <text x="54" y="92" fontSize="32" fontWeight="800" fill={N} fontFamily="Plus Jakarta Sans, system-ui, sans-serif">{title}</text>
        ) : null}
        {children}
        {note ? (
          <text x="1146" y="566" textAnchor="end" fontSize="17" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">{note}</text>
        ) : null}
      </svg>
    </div>
  )
}

function BigCell({ x, y, w = 100, h = 80, value, idx, fill = SKY, stroke = BLUE, className = '' }) {
  // Position on the outer group, animation on the inner group — a CSS transform
  // animation must never share an element with a positioning transform attr.
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={className}>
        <rect width={w} height={h} rx="12" fill={fill} stroke={stroke} strokeWidth="3.5" />
        <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize="28" fontWeight="800" fill={N} fontFamily="system-ui,sans-serif">{value}</text>
        {idx != null ? (
          <text x={w / 2} y={h + 28} textAnchor="middle" fontSize="18" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">{idx}</text>
        ) : null}
      </g>
    </g>
  )
}

/* ══ MODULE 1 ══════════════════════════════════════════════════════ */
export function ScArrayInsert() {
  return (
    <SFrame eyebrow="MODULE 1 · ARRAY OPS" title="Insert 25 at index 2 — shift right, then write" hue={MOD_HUE[1]} note="contiguous memory forces O(n) moves">
      <L x="120" y="160" size={18} fill={MUTED} anchor="start">base = 1000</L>
      {[10, 20, 30, 40].map((v, i) => {
        // Elements at index ≥ 2 already sit at their post-shift slots (idx+1),
        // so the incoming 25 drops into a genuinely open gap — no cell overlap
        // and no duplicated index during the shift emphasis.
        const shifted = i >= 2
        const idx = shifted ? i + 1 : i
        return (
          <BigCell
            key={`b${i}`}
            x={140 + idx * 130}
            y={200}
            value={v}
            idx={idx}
            className={shifted ? 'dsv-shift' : ''}
          />
        )
      })}
      <path d="M400 190 V200" stroke={AMBER} strokeWidth="4" markerEnd="url(#dsScArrH)" className="dsv-pointer" />
      <g className="dsv-insert">
        <BigCell x={400} y={200} value={25} idx={2} fill="#fff7ed" stroke={AMBER} />
      </g>
      <L x="600" y="360" size={22} fill={AMBER}>[10, 20, 25, 30, 40]</L>
      <L x="600" y="400" size={18} fill={MUTED}>elements at ≥ 2 slide one slot right</L>
    </SFrame>
  )
}

export function ScPointerMemory() {
  return (
    <SFrame eyebrow="MODULE 1 · POINTERS" title="A pointer stores an address — dereference reads the value" hue={MOD_HUE[1]} note="p holds where · *p is what">
      <rect x="100" y="200" width="220" height="140" rx="16" fill="#fff" stroke={PURP} strokeWidth="4" className="dsv-pulse" />
      <L x="210" y="250" size={20} fill={MUTED}>int *p</L>
      <L x="210" y="300" size={32} fill={PURP}>0x2A10</L>
      <path d="M340 270 H480" stroke={PURP} strokeWidth="5" markerEnd="url(#dsScArrP)" className="dsv-pointer" />
      <rect x="500" y="180" width="260" height="180" rx="18" fill={SKY} stroke={BLUE} strokeWidth="4" />
      <L x="630" y="230" size={18} fill={MUTED}>memory @ 0x2A10</L>
      <L x="630" y="300" size={56} fill={BLUE}>42</L>
      <path d="M780 270 H880" stroke={GREEN} strokeWidth="4" markerEnd="url(#dsScArr)" className="dsv-pointer" />
      <rect x="900" y="220" width="180" height="100" rx="14" fill="#f0fdf4" stroke={GREEN} strokeWidth="3.5" />
      <L x="990" y="280" size={28} fill={GREEN}>*p</L>
    </SFrame>
  )
}

export function ScMalloc() {
  return (
    <SFrame eyebrow="MODULE 1 · DYNAMIC MEMORY" title="malloc carves a heap block; free returns it" hue={MOD_HUE[1]} note="lifetime is programmer-managed">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={120}
          y={160 + i * 70}
          width="280"
          height="56"
          rx="10"
          fill={i === 1 ? '#fff7ed' : '#fff'}
          stroke={i === 1 ? AMBER : 'rgba(16,32,51,0.15)'}
          strokeWidth="3"
          className={i === 1 ? 'dsv-allocate' : ''}
        />
      ))}
      <L x="260" y="150" size={18} fill={MUTED}>heap</L>
      <L x="260" y="255" size={22} fill={AMBER}>allocated</L>
      <path d="M420 255 H520" stroke={AMBER} strokeWidth="4" markerEnd="url(#dsScArrH)" className="dsv-pointer" />
      <rect x="540" y="200" width="200" height="110" rx="14" fill={SKY} stroke={BLUE} strokeWidth="3.5" className="dsv-allocate" />
      <L x="640" y="265" size={24} fill={BLUE}>ptr</L>
      <g className="dsv-delete">
        <rect x="820" y="200" width="220" height="110" rx="14" fill="#fef2f2" stroke={RED} strokeWidth="3.5" strokeDasharray="8 5" />
        <L x="930" y="265" size={24} fill={RED}>free</L>
      </g>
    </SFrame>
  )
}

/* ══ MODULE 2 ══════════════════════════════════════════════════════ */
export function ScStackOps() {
  return (
    <SFrame eyebrow="MODULE 2 · STACK" title="PUSH grows the tower; POP removes from TOP" hue={MOD_HUE[2]} note="LIFO — last in, first out">
      <rect x="420" y="130" width="280" height="360" rx="16" fill="#fff" stroke={N} strokeWidth="3.5" />
      {[10, 20, 30].map((v, i) => (
        <g key={v}>
          <rect x="450" y={400 - i * 85} width="220" height="70" rx="12" fill={SKY} stroke={BLUE} strokeWidth="3.5" />
          <L x="560" y={445 - i * 85} size={28}>{v}</L>
        </g>
      ))}
      <g className="dsv-push">
        <rect x="450" y="145" width="220" height="70" rx="12" fill="#fff7ed" stroke={AMBER} strokeWidth="3.5" />
        <L x="560" y="190" size={28} fill={AMBER}>40</L>
      </g>
      <L x="760" y="190" size={22} fill={AMBER} anchor="start">← TOP (push)</L>
      <g className="dsv-pop" style={{ opacity: 0.35 }}>
        <L x="280" y="360" size={20} fill={RED} anchor="end">pop →</L>
      </g>
    </SFrame>
  )
}

export function ScInfixPostfix() {
  return (
    <SFrame eyebrow="MODULE 2 · POLISH" title="Scan infix tokens — operators wait on a stack" hue={MOD_HUE[2]} note="precedence + parentheses decide when to pop">
      <L x="600" y="150" size={28} fill={BLUE}>( A + B ) * C</L>
      <rect x="80" y="200" width="320" height="260" rx="16" fill="#fff" stroke={AMBER} strokeWidth="3" />
      <L x="240" y="245" size={18} fill={AMBER}>operator stack</L>
      <rect x="130" y="280" width="220" height="60" rx="10" fill="#fff7ed" stroke={AMBER} strokeWidth="3" className="dsv-push" />
      <L x="240" y="320" size={28} fill={AMBER}>*</L>
      <rect x="130" y="360" width="220" height="60" rx="10" fill={SKY} stroke={BLUE} strokeWidth="3" />
      <L x="240" y="400" size={28}>+</L>
      <rect x="460" y="220" width="240" height="200" rx="16" fill={SKY} stroke={TEAL} strokeWidth="3" className="dsv-pulse" />
      <L x="580" y="300" size={18} fill={TEAL}>token</L>
      <L x="580" y="360" size={48} fill={TEAL}>C</L>
      <rect x="760" y="220" width="320" height="200" rx="16" fill="#f0fdf4" stroke={GREEN} strokeWidth="3" />
      <L x="920" y="300" size={18} fill={GREEN}>output</L>
      <L x="920" y="360" size={28} fill={N} className="dsv-wave">A B + … C *</L>
    </SFrame>
  )
}

export function ScPostfixEval() {
  return (
    <SFrame eyebrow="MODULE 2 · EVAL" title="Postfix: push operands; an operator pops two" hue={MOD_HUE[2]} note="5 3 2 * +  →  11">
      <L x="600" y="150" size={28} fill={BLUE}>5   3   2   *   +</L>
      <rect x="100" y="200" width="300" height="260" rx="16" fill="#fff" stroke={AMBER} strokeWidth="3" />
      <L x="250" y="245" size={18} fill={AMBER}>operand stack</L>
      <rect x="150" y="290" width="200" height="60" rx="10" fill={SKY} stroke={BLUE} strokeWidth="3" className="dsv-push" />
      <L x="250" y="330" size={28}>5</L>
      <rect x="150" y="370" width="200" height="60" rx="10" fill="#fff7ed" stroke={AMBER} strokeWidth="3" className="dsv-pop" />
      <L x="250" y="410" size={22} fill={AMBER}>3 × 2</L>
      <rect x="480" y="240" width="220" height="160" rx="16" fill={SKY} stroke={TEAL} strokeWidth="3" className="dsv-pulse" />
      <L x="590" y="310" size={18} fill={TEAL}>op</L>
      <L x="590" y="360" size={42} fill={TEAL}>*</L>
      <rect x="780" y="240" width="280" height="160" rx="16" fill="#f0fdf4" stroke={GREEN} strokeWidth="3" className="dsv-allocate" />
      <L x="920" y="310" size={18} fill={GREEN}>push result</L>
      <L x="920" y="360" size={36} fill={GREEN}>6</L>
    </SFrame>
  )
}

export function ScQueueOps() {
  return (
    <SFrame eyebrow="MODULE 2 · QUEUE" title="ENQUEUE at REAR · DEQUEUE from FRONT" hue={MOD_HUE[2]} note="FIFO — first in, first out">
      <L x="160" y="200" size={22} fill={AMBER}>FRONT</L>
      <L x="980" y="200" size={22} fill={PURP}>REAR</L>
      {[11, 22, 33].map((v, i) => (
        <BigCell key={v} x={200 + i * 160} y={240} value={v} className={i === 0 ? 'dsv-dequeue' : ''} fill={i === 0 ? '#fef2f2' : SKY} stroke={i === 0 ? RED : BLUE} />
      ))}
      <g className="dsv-enqueue">
        <BigCell x={680} y={240} value={44} fill="#fff7ed" stroke={AMBER} />
      </g>
      <path d="M160 280 H190" stroke={AMBER} strokeWidth="4" markerEnd="url(#dsScArrH)" />
      <path d="M800 280 H860" stroke={PURP} strokeWidth="4" markerEnd="url(#dsScArrP)" />
    </SFrame>
  )
}

/* ══ MODULE 3 ══════════════════════════════════════════════════════ */
export function ScCircularWrap() {
  const n = 8
  const cx = 520
  const cy = 320
  const r = 160
  const filled = new Set([0, 1, 2, 6, 7])
  const rear = 2
  return (
    <SFrame eyebrow="MODULE 3 · CIRCULAR QUEUE" title="REAR wraps: (REAR + 1) mod N" hue={MOD_HUE[3]} note="no shifting — indices circle">
      {Array.from({ length: n }, (_, i) => {
        const a = (-Math.PI / 2) + (i / n) * Math.PI * 2
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        const on = filled.has(i)
        const isRear = i === rear
        return (
          <g key={i} className={isRear ? 'dsv-wrap' : ''}>
            <circle cx={x} cy={y} r="38" fill={isRear ? '#fff7ed' : on ? SKY : '#fff'} stroke={isRear ? AMBER : on ? BLUE : MUTED} strokeWidth="3.5" />
            <L x={x} y={y + 8} size={20} fill={N}>{on ? 10 + i : '·'}</L>
            <L x={x} y={y + 58} size={16} fill={MUTED}>{i}</L>
          </g>
        )
      })}
      <L x="980" y="280" size={22} fill={AMBER}>REAR</L>
      <L x="200" y="280" size={22} fill={TEAL}>FRONT</L>
      <path d="M700 220 Q820 260 740 360" fill="none" stroke={AMBER} strokeWidth="4" markerEnd="url(#dsScArrH)" className="dsv-wrap" />
    </SFrame>
  )
}

export function ScListInsert() {
  return (
    <SFrame eyebrow="MODULE 3 · LINKED LIST" title="Allocate X · X.next = B · A.next = X" hue={MOD_HUE[3]} note="rewire two pointers — no shifting">
      {[
        { x: 80, d: 'A', label: 'HEAD' },
        { x: 520, d: 'B', label: '' },
        { x: 820, d: 'C', label: '' },
      ].map(({ x, d, label }) => (
        <g key={d}>
          <rect x={x} y={280} width="160" height="90" rx="14" fill="#fff" stroke={BLUE} strokeWidth="4" />
          <line x1={x + 90} y1={280} x2={x + 90} y2={370} stroke={BLUE} strokeWidth="3" />
          <L x={x + 45} y={340} size={28}>{d}</L>
          <L x={x + 125} y={340} size={22} fill={PURP}>→</L>
          {label ? <L x={x + 80} y={260} size={18} fill={AMBER}>{label}</L> : null}
        </g>
      ))}
      <path d="M240 325 H300" stroke={N} strokeWidth="4" markerEnd="url(#dsScArr)" />
      <path d="M680 325 H800" stroke={N} strokeWidth="4" markerEnd="url(#dsScArr)" />
      <g className="dsv-allocate">
        <rect x="320" y="140" width="160" height="90" rx="14" fill="#fff7ed" stroke={AMBER} strokeWidth="4" />
        <line x1={410} y1={140} x2={410} y2={230} stroke={AMBER} strokeWidth="3" />
        <L x="365" y="200" size={28} fill={AMBER}>X</L>
        <L x="445" y="200" size={22} fill={PURP}>→</L>
        <L x="400" y="120" size={18} fill={AMBER}>NEW</L>
      </g>
      <path d="M400 230 V270" stroke={AMBER} strokeWidth="4" markerEnd="url(#dsScArrH)" className="dsv-pointer" />
      <path d="M480 185 H520" stroke={AMBER} strokeWidth="4" markerEnd="url(#dsScArrH)" className="dsv-rewire" />
      <path d="M240 360 C300 420, 360 420, 400 370" fill="none" stroke={GREEN} strokeWidth="4" markerEnd="url(#dsScArr)" className="dsv-rewire" />
    </SFrame>
  )
}

export function ScListDelete() {
  return (
    <SFrame eyebrow="MODULE 3 · LIST DELETE" title="PREV · CURRENT · NEXT — then bypass" hue={MOD_HUE[3]} note="PREV.next = NEXT removes CURRENT">
      {[
        { x: 100, d: 'A', lab: 'PREV', c: AMBER },
        { x: 420, d: 'B', lab: 'CURRENT', c: RED },
        { x: 740, d: 'C', lab: 'NEXT', c: GREEN },
      ].map(({ x, d, lab, c }) => (
        <g key={d} className={d === 'B' ? 'dsv-delete' : ''}>
          <rect x={x} y={250} width="180" height="100" rx="14" fill={d === 'B' ? '#fef2f2' : '#fff'} stroke={c} strokeWidth="4" />
          <line x1={x + 100} y1={250} x2={x + 100} y2={350} stroke={c} strokeWidth="3" />
          <L x={x + 50} y={315} size={30}>{d}</L>
          <L x={x + 140} y={315} size={22} fill={PURP}>→</L>
          <L x={x + 90} y={230} size={18} fill={c}>{lab}</L>
        </g>
      ))}
      <path d="M280 300 H400" stroke={RED} strokeWidth="3" strokeDasharray="8 6" className="dsv-delete" />
      <path d="M600 300 H720" stroke={RED} strokeWidth="3" strokeDasharray="8 6" className="dsv-delete" />
      <path d="M280 380 C420 480, 600 480, 740 350" fill="none" stroke={GREEN} strokeWidth="5" markerEnd="url(#dsScArr)" className="dsv-rewire" />
      <L x="600" y="500" size={20} fill={GREEN}>bypass link</L>
    </SFrame>
  )
}

export function ScDoubly() {
  return (
    <SFrame eyebrow="MODULE 3 · DOUBLY LINKED" title="NEXT → on top · ← PREV underneath" hue={MOD_HUE[3]} note="bidirectional rewiring">
      {[0, 1, 2].map((i) => {
        const x = 140 + i * 320
        const d = ['A', 'B', 'C'][i]
        return (
          <g key={d}>
            <rect x={x} y={240} width="200" height="100" rx="14" fill="#fff" stroke={BLUE} strokeWidth="4" />
            <line x1={x + 66} y1={240} x2={x + 66} y2={340} stroke={BLUE} strokeWidth="2.5" />
            <line x1={x + 134} y1={240} x2={x + 134} y2={340} stroke={BLUE} strokeWidth="2.5" />
            <L x={x + 33} y={305} size={18} fill={PURP}>P</L>
            <L x={x + 100} y={305} size={28}>{d}</L>
            <L x={x + 167} y={305} size={18} fill={PURP}>N</L>
            {i < 2 && (
              <>
                <path d={`M${x + 200} 270 H${x + 300}`} stroke={BLUE} strokeWidth="4" markerEnd="url(#dsScArr)" className="dsv-pointer" />
                <path d={`M${x + 300} 310 H${x + 200}`} stroke={PURP} strokeWidth="4" markerEnd="url(#dsScArrP)" className="dsv-rewire" />
                <L x={x + 250} y={255} size={14} fill={BLUE}>NEXT</L>
                <L x={x + 250} y={340} size={14} fill={PURP}>PREV</L>
              </>
            )}
          </g>
        )
      })}
    </SFrame>
  )
}

/* ══ MODULE 4 ══════════════════════════════════════════════════════ */
const SHOW_TREE = {
  A: { x: 600, y: 160 },
  B: { x: 380, y: 280 },
  C: { x: 820, y: 280 },
  D: { x: 260, y: 420 },
  E: { x: 500, y: 420 },
  F: { x: 820, y: 420 },
}
const SHOW_EDGES = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F']]

function TreeHero({ visit, current, seq, titleHue }) {
  return (
    <>
      {SHOW_EDGES.map(([a, b]) => {
        const on = visit.includes(a) && visit.includes(b)
        return (
          <line
            key={`${a}${b}`}
            x1={SHOW_TREE[a].x}
            y1={SHOW_TREE[a].y + 28}
            x2={SHOW_TREE[b].x}
            y2={SHOW_TREE[b].y - 28}
            stroke={on ? TEAL : N}
            strokeWidth={on ? 5 : 3}
            className={on ? 'dsv-traverse' : ''}
          />
        )
      })}
      {Object.entries(SHOW_TREE).map(([k, p]) => {
        const hit = visit.includes(k)
        const cur = current === k
        return (
          <g key={k} className={cur ? 'dsv-pulse' : hit ? 'dsv-traverse' : ''}>
            <circle cx={p.x} cy={p.y} r="36" fill={cur ? '#fff7ed' : hit ? '#ccfbf1' : SKY} stroke={cur ? AMBER : hit ? TEAL : BLUE} strokeWidth="4" />
            <L x={p.x} y={p.y + 10} size={24}>{k}</L>
          </g>
        )
      })}
      <rect x="80" y="500" width="500" height="50" rx="12" fill="#fff" stroke={titleHue} strokeWidth="2.5" />
      <L x="330" y="534" size={20} fill={TEAL} className="dsv-wave">{seq}</L>
    </>
  )
}

export function ScPreorder() {
  return (
    <SFrame eyebrow="MODULE 4 · PREORDER" title="Root → Left → Right — token walks the same tree" hue={MOD_HUE[4]} note="visit root before children">
      <TreeHero visit={['A', 'B', 'D']} current="D" seq="A → B → D → E → C → F" titleHue={TEAL} />
    </SFrame>
  )
}

export function ScInorder() {
  return (
    <SFrame eyebrow="MODULE 4 · INORDER" title="Left → Root → Right — growing visited sequence" hue={MOD_HUE[4]} note="BST inorder yields sorted keys">
      <TreeHero visit={['D', 'B', 'E']} current="E" seq="D → B → E → A → F → C" titleHue={TEAL} />
    </SFrame>
  )
}

export function ScBstInsert() {
  const nodes = {
    50: { x: 600, y: 170 },
    30: { x: 400, y: 300 },
    70: { x: 800, y: 300 },
    20: { x: 300, y: 430 },
    40: { x: 500, y: 430 },
    60: { x: 720, y: 430 },
    80: { x: 900, y: 430 },
  }
  return (
    <SFrame eyebrow="MODULE 4 · BST INSERT" title="65 walks right of 50, left of 70 — then links" hue={MOD_HUE[4]} note="each compare is one edge down">
      {[[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80]].map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y + 26} x2={nodes[b].x} y2={nodes[b].y - 26} stroke={a === 50 && b === 70 ? TEAL : N} strokeWidth={a === 50 && b === 70 ? 5 : 3} className={a === 50 && b === 70 ? 'dsv-descend' : ''} />
      ))}
      {Object.entries(nodes).map(([k, p]) => (
        <g key={k} className={k === '70' ? 'dsv-pulse' : ''}>
          <circle cx={p.x} cy={p.y} r="32" fill={k === '70' ? '#fff7ed' : SKY} stroke={k === '70' ? AMBER : BLUE} strokeWidth="3.5" />
          <L x={p.x} y={p.y + 8} size={20}>{k}</L>
        </g>
      ))}
      <g className="dsv-descend">
        <circle cx="760" cy="200" r="28" fill="#fff7ed" stroke={AMBER} strokeWidth="3.5" />
        <L x="760" y="208" size={20} fill={AMBER}>65</L>
      </g>
      <L x="200" y="520" size={20} fill={AMBER} anchor="start">65 &gt; 50 → R · 65 &lt; 70 → L</L>
    </SFrame>
  )
}

export function ScBstDelete() {
  return (
    <SFrame eyebrow="MODULE 4 · BST DELETE" title="Three cases: leaf · one child · two children" hue={MOD_HUE[4]} note="two-child → replace with inorder successor">
      {[
        { x: 120, t: '0 child', d: 'leaf', c: GREEN },
        { x: 440, t: '1 child', d: 'promote', c: AMBER },
        { x: 760, t: '2 children', d: 'successor', c: RED },
      ].map(({ x, t, d, c }, i) => (
        <g key={t} className={i === 2 ? 'dsv-delete' : 'dsv-pulse'} style={{ animationDelay: `${i * 0.25}s` }}>
          <rect x={x} y={180} width="280" height="280" rx="18" fill="#fff" stroke={c} strokeWidth="4" />
          <L x={x + 140} y={230} size={22} fill={c}>{t}</L>
          <circle cx={x + 140} cy={320} r="40" fill={i === 2 ? '#fef2f2' : SKY} stroke={c} strokeWidth="3.5" />
          <L x={x + 140} y={328} size={22}>{i === 0 ? 'X' : i === 1 ? 'P' : 'N'}</L>
          <L x={x + 140} y={420} size={18} fill={MUTED}>{d}</L>
        </g>
      ))}
    </SFrame>
  )
}

/* ══ MODULE 5 ══════════════════════════════════════════════════════ */
export function ScBfsDfs() {
  const nodes = [
    { id: 'S', x: 200, y: 300 },
    { id: 'A', x: 400, y: 180 },
    { id: 'B', x: 400, y: 420 },
    { id: 'C', x: 620, y: 180 },
    { id: 'D', x: 620, y: 420 },
    { id: 'E', x: 840, y: 300 },
  ]
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const edges = [['S', 'A'], ['S', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'E']]
  const wave = ['S', 'A', 'B']
  return (
    <SFrame eyebrow="MODULE 5 · GRAPH TRAVERSAL" title="BFS expands a wave — queue holds the frontier" hue={MOD_HUE[5]} note="DFS would dive a deep stack path instead">
      {edges.map(([a, b]) => {
        const on = wave.includes(a) && wave.includes(b)
        return (
          <line key={`${a}${b}`} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke={on ? TEAL : MUTED} strokeWidth={on ? 5 : 2.5} className={on ? 'dsv-wave' : ''} />
        )
      })}
      {nodes.map((n) => {
        const hit = wave.includes(n.id)
        return (
          <g key={n.id} className={hit ? 'dsv-wave' : ''}>
            <circle cx={n.x} cy={n.y} r="34" fill={hit ? '#ccfbf1' : SKY} stroke={hit ? TEAL : BLUE} strokeWidth="4" />
            <L x={n.x} y={n.y + 8} size={22}>{n.id}</L>
          </g>
        )
      })}
      <rect x="80" y="500" width="700" height="48" rx="12" fill="#fff" stroke={AMBER} strokeWidth="2.5" />
      <L x="430" y="532" size={20} fill={AMBER}>QUEUE frontier:  A   B</L>
    </SFrame>
  )
}

export function ScHashProbe() {
  const table = [null, 'cat', 'dog', null, null, null, null]
  return (
    <SFrame eyebrow="MODULE 5 · HASHING" title="KEY → hash → index · collision walks linearly" hue={MOD_HUE[5]} note="probe until an empty slot">
      <rect x="80" y="180" width="180" height="100" rx="14" fill="#fff7ed" stroke={AMBER} strokeWidth="3.5" className="dsv-pulse" />
      <L x="170" y="225" size={18} fill={AMBER}>KEY</L>
      <L x="170" y="260" size={28}>fox</L>
      <path d="M280 230 H360" stroke={N} strokeWidth="4" markerEnd="url(#dsScArr)" className="dsv-pointer" />
      <rect x="380" y="180" width="200" height="100" rx="14" fill={SKY} stroke={BLUE} strokeWidth="3.5" />
      <L x="480" y="225" size={18} fill={BLUE}>hash % 7</L>
      <L x="480" y="260" size={28}>1</L>
      <path d="M600 230 H680" stroke={N} strokeWidth="4" markerEnd="url(#dsScArr)" />
      {table.map((v, i) => (
        <g key={i} className={i === 1 || i === 2 ? 'dsv-search' : i === 3 ? 'dsv-insert' : ''}>
          <rect
            x={700}
            y={140 + i * 52}
            width="360"
            height={46}
            rx="10"
            fill={i === 3 ? '#fff7ed' : i === 1 || i === 2 ? '#fef2f2' : SKY}
            stroke={i === 3 ? AMBER : i === 1 || i === 2 ? RED : BLUE}
            strokeWidth="3"
          />
          <L x={780} y={170 + i * 52} size={18} fill={MUTED} anchor="start">{i}</L>
          <L x={920} y={170 + i * 52} size={20}>{v == null ? (i === 3 ? 'fox' : '∅') : v}</L>
        </g>
      ))}
    </SFrame>
  )
}

export function ScHeapPrio() {
  const arr = [90, 70, 80, 40, 50, 60, 85]
  const coords = [
    [600, 160], [420, 280], [780, 280], [320, 400], [520, 400], [700, 400], [900, 400],
  ]
  return (
    <SFrame eyebrow="MODULE 5 · PRIORITY / HEAP" title="Tree shape ↔ array indices — insert bubbles up" hue={MOD_HUE[5]} note="parent(i)=⌊(i−1)/2⌋">
      {[[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]].map(([a, b]) => (
        <line key={`${a}-${b}`} x1={coords[a][0]} y1={coords[a][1] + 24} x2={coords[b][0]} y2={coords[b][1] - 24} stroke={N} strokeWidth="3" />
      ))}
      {arr.map((v, i) => (
        <g key={i} className={i === 6 ? 'dsv-push' : i === 0 ? 'dsv-pulse' : ''}>
          <circle cx={coords[i][0]} cy={coords[i][1]} r="34" fill={i === 6 ? '#fff7ed' : SKY} stroke={i === 6 ? AMBER : BLUE} strokeWidth="3.5" />
          <L x={coords[i][0]} y={coords[i][1] + 8} size={20}>{v}</L>
        </g>
      ))}
      {arr.map((v, i) => (
        <g key={`a${i}`} className={i === 6 ? 'dsv-insert' : ''}>
          <rect x={100 + i * 110} y={500} width={96} height={50} rx="10" fill={i === 6 ? '#fff7ed' : SKY} stroke={i === 6 ? AMBER : BLUE} strokeWidth="3" />
          <L x={148 + i * 110} y={534} size={20}>{v}</L>
        </g>
      ))}
    </SFrame>
  )
}

/* ── Registry ───────────────────────────────────────────────────── */
const S = (scene, extra = {}) => ({ scene, family: 'showcase', object: 'hero', camera: 'wide-structure', ...extra })

export const SHOWCASE = {
  'm1-u5-ops': S(<ScArrayInsert />, { title: 'Array insert with shift', takeaway: 'Insert at index 2 shifts later elements right, then writes 25.' }),
  'm1-u3-ops': S(<ScPointerMemory />, { title: 'Pointer stores an address', takeaway: 'p holds where the value lives; *p reads what is there.' }),
  'm1-u4-ops': S(<ScMalloc />, { title: 'malloc and free on the heap', takeaway: 'malloc reserves a block; free returns it to the allocator.' }),
  'm2-u2-ops': S(<ScStackOps />, { title: 'Stack push and pop', takeaway: 'All growth and shrink happens at TOP — LIFO.' }),
  'm2-u6-ops': S(<ScInfixPostfix />, { title: 'Infix to postfix', takeaway: 'Operands go to output; operators wait on a precedence stack.' }),
  'm2-u7-ops': S(<ScPostfixEval />, { title: 'Postfix evaluation', takeaway: 'An operator pops two operands, pushes one result.' }),
  'm2-u9-ops': S(<ScQueueOps />, { title: 'Queue enqueue and dequeue', takeaway: 'Enter at REAR, leave from FRONT — FIFO.' }),
  'm3-u1-ops': S(<ScCircularWrap />, { title: 'Circular queue wrap', takeaway: 'REAR = (REAR + 1) mod N reuses empty slots.' }),
  'm3-u5-ops': S(<ScListInsert />, { title: 'Linked-list insert', takeaway: 'Allocate X, point X→B, then A→X — no array shift.' }),
  'm3-u9-ops': S(<ScListDelete />, { title: 'List delete rewire', takeaway: 'PREV.next = NEXT bypasses CURRENT in O(1).' }),
  'm3-u10-ops': S(<ScDoubly />, { title: 'Doubly linked NEXT/PREV', takeaway: 'Two links enable walks and rewires in both directions.' }),
  'm4-u6-ops': S(<ScPreorder />, { title: 'Preorder traversal', takeaway: 'Visit root, then left subtree, then right — same tree, growing sequence.' }),
  'm4-u7-ops': S(<ScInorder />, { title: 'Inorder traversal', takeaway: 'Left, root, right — on a BST this yields sorted order.' }),
  'm4-u10-ops': S(<ScBstInsert />, { title: 'BST insert path', takeaway: 'Compare and descend left/right until a null child link.' }),
  'm4-u11-ops': S(<ScBstDelete />, { title: 'BST delete cases', takeaway: 'Leaf, one child, or two children (successor) — three rewires.' }),
  'm5-u4-ops': S(<ScBfsDfs />, { title: 'BFS wave with queue', takeaway: 'The frontier expands level by level from a queue.' }),
  'm5-u6-ops': S(<ScHashProbe />, { title: 'Hash collision linear probe', takeaway: 'On collision, walk i+1, i+2, … until an empty slot.' }),
  'm5-u8-ops': S(<ScHeapPrio />, { title: 'Heap tree ↔ array', takeaway: 'Append in the array, then bubble up to restore heap order.' }),
}

const SC_CAM = ['wide-structure', 'close-node', 'follow-pointer', 'side-by-side', 'overhead-tree', 'memory-strip']
Object.keys(SHOWCASE).forEach((id, i) => {
  SHOWCASE[id].object = id
  SHOWCASE[id].camera = SC_CAM[i % SC_CAM.length]
  SHOWCASE[id].family = `showcase-${i % 6}`
})

export function getShowcase(slideId) {
  return SHOWCASE[slideId] || null
}
