/**
 * DsScenes — Data Structures classroom SVG visuals.
 * Cream/navy theme; CSS hooks: dsv-allocate, dsv-shift, dsv-insert, dsv-delete,
 * dsv-push, dsv-pop, dsv-enqueue, dsv-dequeue, dsv-wrap, dsv-pointer, dsv-rewire,
 * dsv-traverse, dsv-search, dsv-swap, dsv-pulse, dsv-wave, dsv-descend, dsv-return.
 */
const N = '#102033'
const BLUE = '#2563eb'
const RED = '#dc2626'
const AMBER = '#d97706'
const PURP = '#7c3aed'
const GREEN = '#16a34a'
const TEAL = '#0d9488'
const CREAM = '#fffaf0'
const SKY = '#eaf2ff'
const MUTED = '#526079'
export const DS = { N, BLUE, RED, AMBER, PURP, GREEN, TEAL, CREAM, SKY, MUTED }

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`ds-scene ${className}`} aria-label={caption || 'Data structures diagram'}>
      <svg viewBox={vb} role="img" className="ds-svg">
        <defs>
          <marker id="dsArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="dsArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="dsArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="dsArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="dsArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="502" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">{caption}</text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 18, fill = N, anchor = 'middle', weight = 800 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily="system-ui,sans-serif">
      {children}
    </text>
  )
}

function Cell({ x, y, w = 72, h = 56, value, idx, fill = SKY, stroke = BLUE, className = '', idxColor = MUTED }) {
  // Position on the OUTER group (transform attr); animation on the INNER group
  // (CSS transform) so the two never overwrite each other.
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={className}>
        <rect width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="2.5" />
        {value != null ? <L x={w / 2} y={h / 2 + 7} size={20} fill={N}>{value}</L> : null}
        {idx != null ? <L x={w / 2} y={h + 22} size={14} fill={idxColor}>{idx}</L> : null}
      </g>
    </g>
  )
}

function LlNode({ x, y, data, next = '→', w = 110, h = 58, stroke = BLUE, className = '', label }) {
  const mid = w * 0.55
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={`ds-ll-node ${className}`}>
        <rect width={w} height={h} rx="10" fill="#fff" stroke={stroke} strokeWidth="3" />
        <line x1={mid} y1="0" x2={mid} y2={h} stroke={stroke} strokeWidth="2.5" />
        <L x={mid / 2} y={h / 2 + 7} size={20} fill={N}>{data}</L>
        <L x={(mid + w) / 2} y={h / 2 + 7} size={16} fill={PURP}>{next}</L>
        {label ? <L x={w / 2} y={-12} size={14} fill={AMBER}>{label}</L> : null}
      </g>
    </g>
  )
}

/* ─── 1. ArrayMemoryStrip ───────────────────────────────────────── */
export function ArrayMemoryStrip({ mode = 'static', caption }) {
  const base = [10, 20, 30, 40]
  const isIns = mode === 'insert'
  const isDel = mode === 'delete'
  const isAcc = mode === 'access'
  const vals = isIns ? [10, 20, null, 30, 40] : base
  const x0 = 90
  const gap = 88
  return (
    <Scene caption={caption || (isIns ? 'Insert 25 at index 2 — shift right, then place' : isDel ? 'Delete at index 1 — remove, then shift left' : 'Contiguous array: index → address')}>
      <L x="450" y="42" size={22}>Array in memory</L>
      <L x="90" y="88" size={15} fill={MUTED} anchor="start">base = 1000</L>
      {vals.map((v, i) => {
        const addr = 1000 + i * 4
        const shifting = (isIns && i >= 2) || (isDel && i >= 1)
        const insertSlot = isIns && i === 2
        const deleteSlot = isDel && i === 1
        return (
          <g key={i}>
            <Cell
              x={x0 + i * gap}
              y={140}
              value={insertSlot ? 25 : deleteSlot ? '·' : v}
              idx={i}
              fill={insertSlot ? '#fff7ed' : deleteSlot ? '#fef2f2' : isAcc && i === 2 ? '#fff7ed' : SKY}
              stroke={insertSlot ? AMBER : deleteSlot ? RED : isAcc && i === 2 ? AMBER : BLUE}
              className={
                insertSlot ? 'dsv-insert'
                  : deleteSlot ? 'dsv-delete'
                    : shifting ? 'dsv-shift'
                      : isAcc && i === 2 ? 'dsv-pulse'
                        : ''
              }
            />
            <L x={x0 + i * gap + 36} y={250} size={13} fill={MUTED}>{addr}</L>
          </g>
        )
      })}
      {isIns && <L x="450" y="300" size={17} fill={AMBER}>shift → then write 25 at [2]</L>}
      {isDel && <L x="450" y="300" size={17} fill={RED}>clear [1], then shift ← to close gap</L>}
      {isAcc && (
        <>
          <path d="M266 120 L266 140" stroke={AMBER} strokeWidth="3" markerEnd="url(#dsArr)" className="dsv-pointer" />
          <L x="266" y="108" size={16} fill={AMBER}>A[2]</L>
        </>
      )}
      <rect x="120" y="340" width="660" height="70" rx="12" fill="#fff" stroke="rgba(16,32,51,0.12)" strokeWidth="2" />
      <L x="450" y="370" size={16} fill={MUTED}>addr(i) = base + i × sizeof(elem)</L>
      <L x="450" y="396" size={15} fill={BLUE}>O(1) random access · insert/delete need shifts</L>
    </Scene>
  )
}

/* ─── 2. PointerMemory ──────────────────────────────────────────── */
export function PointerMemory({ caption }) {
  return (
    <Scene caption={caption || 'A pointer stores an address, not the value'}>
      <L x="450" y="40" size={22}>Pointer → memory</L>
      <rect x="80" y="160" width="160" height="90" rx="12" fill="#fff" stroke={PURP} strokeWidth="3" className="dsv-pulse" />
      <L x="160" y="195" size={16} fill={MUTED}>int *p</L>
      <L x="160" y="228" size={22} fill={PURP}>0x2A10</L>
      <path d="M250 205 H360" stroke={PURP} strokeWidth="4" markerEnd="url(#dsArrP)" className="dsv-pointer" />
      <L x="305" y="188" size={14} fill={PURP}>stores address</L>
      <rect x="380" y="130" width="200" height="160" rx="14" fill={SKY} stroke={BLUE} strokeWidth="3" />
      <L x="480" y="165" size={15} fill={MUTED}>@ 0x2A10</L>
      <L x="480" y="220" size={36} fill={BLUE}>42</L>
      <L x="480" y="265" size={15} fill={MUTED}>int x</L>
      <rect x="640" y="160" width="180" height="90" rx="12" fill="#fff" stroke={N} strokeWidth="2.5" />
      <L x="730" y="195" size={16} fill={MUTED}>*p</L>
      <L x="730" y="228" size={22} fill={GREEN}>42</L>
      <path d="M580 210 H630" stroke={GREEN} strokeWidth="3" markerEnd="url(#dsArr)" className="dsv-pointer" />
      <L x="450" y="360" size={17} fill={MUTED}>p holds where · *p reads what</L>
    </Scene>
  )
}

/* ─── 3. MallocHeap ─────────────────────────────────────────────── */
export function MallocHeap({ caption }) {
  return (
    <Scene caption={caption || 'malloc reserves a heap block; free returns it'}>
      <L x="450" y="40" size={22}>Heap allocate / free</L>
      <L x="160" y="100" size={16} fill={MUTED}>heap</L>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={80} y={120 + i * 52} width={200} height={44} rx="8" fill={i === 2 ? '#fff7ed' : '#fff'} stroke={i === 2 ? AMBER : 'rgba(16,32,51,0.15)'} strokeWidth="2.5" className={i === 2 ? 'dsv-allocate' : ''} />
      ))}
      <L x="180" y="250" size={18} fill={AMBER}>block</L>
      <path d="M300 240 H380" stroke={AMBER} strokeWidth="3.5" markerEnd="url(#dsArr)" className="dsv-pointer" />
      <rect x="400" y="200" width="160" height="80" rx="12" fill={SKY} stroke={BLUE} strokeWidth="3" className="dsv-allocate">
      </rect>
      <L x="480" y="235" size={16} fill={MUTED}>ptr</L>
      <L x="480" y="262" size={18} fill={BLUE}>0xH…</L>
      <g className="dsv-delete" style={{ transformOrigin: '720px 240px' }}>
        <rect x="640" y="200" width="160" height="80" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="3" strokeDasharray="6 4" />
        <L x="720" y="248" size={18} fill={RED}>free(ptr)</L>
      </g>
      <L x="450" y="400" size={16} fill={MUTED}>live block → usable · freed block → back to allocator</L>
    </Scene>
  )
}

/* ─── 4. StackTower ─────────────────────────────────────────────── */
export function StackTower({ mode = 'static', caption }) {
  const items = mode === 'underflow' ? [] : mode === 'pop' ? [10, 20] : [10, 20, 30]
  const overflow = mode === 'overflow'
  const push = mode === 'push'
  const pop = mode === 'pop'
  const yBase = 420
  return (
    <Scene caption={caption || (push ? 'PUSH: grow toward higher addresses' : pop ? 'POP: remove from TOP' : overflow ? 'OVERFLOW: stack is full' : 'LIFO stack with TOP')}>
      <L x="450" y="40" size={22}>Stack (LIFO)</L>
      <rect x="320" y="80" width="260" height="360" rx="14" fill="#fff" stroke={N} strokeWidth="3" />
      {items.map((v, i) => {
        const y = yBase - 70 - i * 70
        const isTop = i === items.length - 1
        return (
          <g key={`${v}-${i}`}>
            <rect
              x="340"
              y={y}
              width="220"
              height="58"
              rx="10"
              fill={isTop ? '#fff7ed' : SKY}
              stroke={isTop ? AMBER : BLUE}
              strokeWidth="3"
              className={push && isTop ? 'dsv-push' : pop && isTop ? 'dsv-pop' : ''}
            />
            <L x="450" y={y + 38} size={22} fill={N}>{v}</L>
          </g>
        )
      })}
      {push && (
        <g className="dsv-push">
          <rect x="340" y="90" width="220" height="58" rx="10" fill="#fff7ed" stroke={AMBER} strokeWidth="3" />
          <L x="450" y="128" size={22} fill={AMBER}>40</L>
        </g>
      )}
      {overflow && (
        <g className="dsv-pulse">
          <rect x="340" y="90" width="220" height="58" rx="10" fill="#fef2f2" stroke={RED} strokeWidth="3" strokeDasharray="5 4" />
          <L x="450" y="128" size={18} fill={RED}>OVERFLOW</L>
        </g>
      )}
      {mode === 'underflow' && <L x="450" y="260" size={22} fill={RED} className="dsv-pulse">UNDERFLOW</L>}
      <L x="610" y={items.length ? yBase - 70 - (items.length - 1) * 70 + 38 : 200} size={18} fill={AMBER} anchor="start">← TOP</L>
      <L x="450" y="470" size={15} fill={MUTED}>grow ↑ · access only at TOP</L>
    </Scene>
  )
}

/* ─── 5. QueueLane ──────────────────────────────────────────────── */
export function QueueLane({ mode = 'static', caption }) {
  const enq = mode === 'enqueue'
  const deq = mode === 'dequeue'
  const cells = enq ? [11, 22, 33, 44] : deq ? [22, 33] : [11, 22, 33]
  return (
    <Scene caption={caption || (enq ? 'ENQUEUE at REAR' : deq ? 'DEQUEUE from FRONT' : 'FIFO queue: FRONT → REAR')}>
      <L x="450" y="40" size={22}>Queue (FIFO)</L>
      <L x="140" y="160" size={18} fill={AMBER}>FRONT</L>
      <L x="760" y="160" size={18} fill={PURP}>REAR</L>
      {cells.map((v, i) => (
        <Cell
          key={`${v}-${i}`}
          x={160 + i * 100}
          y={200}
          w={84}
          h={70}
          value={v}
          fill={deq && i === 0 ? '#fef2f2' : enq && i === cells.length - 1 ? '#fff7ed' : SKY}
          stroke={deq && i === 0 ? RED : enq && i === cells.length - 1 ? AMBER : BLUE}
          className={deq && i === 0 ? 'dsv-dequeue' : enq && i === cells.length - 1 ? 'dsv-enqueue' : deq ? 'dsv-shift' : ''}
        />
      ))}
      <path d="M140 235 H155" stroke={AMBER} strokeWidth="3" markerEnd="url(#dsArr)" />
      <path d={`M${160 + cells.length * 100 - 10} 235 H${160 + cells.length * 100 + 20}`} stroke={PURP} strokeWidth="3" markerEnd="url(#dsArrP)" />
      <L x="450" y="360" size={17} fill={MUTED}>enter at REAR · leave from FRONT</L>
    </Scene>
  )
}

/* ─── 6. CircularQueueRing ──────────────────────────────────────── */
export function CircularQueueRing({ caption }) {
  const n = 6
  const cx = 450
  const cy = 250
  const r = 140
  const filled = [0, 1, 2, 4]
  const rear = 4
  return (
    <Scene caption={caption || 'Circular queue: REAR wraps with modulo'}>
      <L x="450" y="40" size={22}>Circular buffer</L>
      <circle cx={cx} cy={cy} r={r + 36} fill="none" stroke="rgba(16,32,51,0.1)" strokeWidth="2" strokeDasharray="6 8" />
      {Array.from({ length: n }, (_, i) => {
        const a = (-Math.PI / 2) + (i / n) * Math.PI * 2
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        const on = filled.includes(i)
        const isRear = i === rear
        return (
          <g key={i} className={isRear ? 'dsv-wrap' : on ? 'dsv-pulse' : ''}>
            <circle cx={x} cy={y} r="32" fill={isRear ? '#fff7ed' : on ? SKY : '#fff'} stroke={isRear ? AMBER : on ? BLUE : MUTED} strokeWidth="3" />
            <L x={x} y={y + 6} size={16} fill={N}>{on ? (i === 4 ? 55 : 10 + i * 10) : '·'}</L>
            <L x={x} y={y + 48} size={13} fill={MUTED}>{i}</L>
          </g>
        )
      })}
      <L x="450" y="250" size={16} fill={PURP}>REAR → (REAR+1) % N</L>
      <L x="200" y="450" size={15} fill={AMBER} anchor="start">FRONT</L>
      <L x="700" y="450" size={15} fill={PURP} anchor="end">REAR wraps</L>
    </Scene>
  )
}

/* ─── 7. LinkedListChain ────────────────────────────────────────── */
export function LinkedListChain({ mode = 'static', caption }) {
  const ins = mode === 'insert'
  const del = mode === 'delete'
  return (
    <Scene caption={caption || (ins ? 'Insert X between A and B' : del ? 'Delete CURRENT — PREV.next = NEXT' : 'Singly linked: DATA | NEXT')}>
      <L x="450" y="36" size={22}>Linked list</L>
      <LlNode x={60} y={200} data="A" next="→" label={del ? 'PREV' : 'HEAD'} stroke={del ? AMBER : BLUE} />
      <path d="M170 229 H230" stroke={N} strokeWidth="4" markerEnd="url(#dsArr)" className={ins || del ? 'dsv-rewire' : ''} />
      {ins ? (
        <>
          <LlNode x={250} y={90} data="X" next="→" label="NEW" stroke={AMBER} className="dsv-allocate" />
          <path d="M305 148 V190" stroke={AMBER} strokeWidth="3.5" markerEnd="url(#dsArr)" className="dsv-pointer" />
          <path d="M360 119 H430" stroke={AMBER} strokeWidth="3.5" markerEnd="url(#dsArr)" className="dsv-rewire" />
          <LlNode x={440} y={200} data="B" next="→" stroke={BLUE} />
          <path d="M550 229 H610" stroke={N} strokeWidth="4" markerEnd="url(#dsArr)" />
          <LlNode x={620} y={200} data="C" next="∅" stroke={BLUE} />
          <L x="450" y="340" size={16} fill={AMBER}>1) X.next = B   2) A.next = X</L>
        </>
      ) : del ? (
        <>
          <LlNode x={250} y={200} data="B" next="→" label="CURRENT" stroke={RED} className="dsv-delete" />
          <path d="M360 229 H420" stroke={RED} strokeWidth="3" strokeDasharray="6 5" className="dsv-delete" />
          <LlNode x={440} y={200} data="C" next="∅" label="NEXT" stroke={GREEN} />
          <path d="M170 260 C250 340, 380 340, 440 258" fill="none" stroke={GREEN} strokeWidth="4" markerEnd="url(#dsArr)" className="dsv-rewire" />
          <L x="450" y="400" size={16} fill={GREEN}>bypass: PREV.next → NEXT</L>
        </>
      ) : (
        <>
          <LlNode x={250} y={200} data="B" next="→" stroke={BLUE} />
          <path d="M360 229 H420" stroke={N} strokeWidth="4" markerEnd="url(#dsArr)" />
          <LlNode x={440} y={200} data="C" next="→" stroke={BLUE} />
          <path d="M550 229 H610" stroke={N} strokeWidth="4" markerEnd="url(#dsArr)" />
          <LlNode x={620} y={200} data="D" next="∅" stroke={MUTED} />
        </>
      )}
    </Scene>
  )
}

/* ─── 8. DoublyLinkedChain ──────────────────────────────────────── */
export function DoublyLinkedChain({ caption }) {
  return (
    <Scene caption={caption || 'Doubly linked: NEXT → and ← PREV'}>
      <L x="450" y="36" size={22}>Doubly linked list</L>
      {[
        { x: 80, d: 'A' },
        { x: 340, d: 'B' },
        { x: 600, d: 'C' },
      ].map(({ x, d }, i) => (
        <g key={d}>
          <rect x={x} y={200} width={140} height={70} rx="12" fill="#fff" stroke={BLUE} strokeWidth="3" className="ds-ll-node" />
          <line x1={x + 46} y1={200} x2={x + 46} y2={270} stroke={BLUE} strokeWidth="2" />
          <line x1={x + 94} y1={200} x2={x + 94} y2={270} stroke={BLUE} strokeWidth="2" />
          <L x={x + 23} y={242} size={14} fill={PURP}>P</L>
          <L x={x + 70} y={242} size={20} fill={N}>{d}</L>
          <L x={x + 117} y={242} size={14} fill={PURP}>N</L>
          {i < 2 && (
            <>
              <path d={`M${x + 140} 220 H${x + 200}`} stroke={BLUE} strokeWidth="3.5" markerEnd="url(#dsArrB)" className="dsv-pointer" />
              <path d={`M${x + 200} 250 H${x + 140}`} stroke={PURP} strokeWidth="3.5" markerEnd="url(#dsArrP)" className="dsv-rewire" />
              <L x={x + 170} y={208} size={12} fill={BLUE}>NEXT</L>
              <L x={x + 170} y={272} size={12} fill={PURP}>PREV</L>
            </>
          )}
        </g>
      ))}
      <L x="450" y="360" size={16} fill={MUTED}>bidirectional walk · O(1) neighbor rewire with both links</L>
    </Scene>
  )
}

/* ─── 9. InfixPostfixBoard ─────────────────────────────────────── */
export function InfixPostfixBoard({ caption }) {
  return (
    <Scene caption={caption || 'Infix → postfix: scan tokens, stack operators'}>
      <L x="450" y="36" size={22}>Infix to postfix</L>
      <L x="450" y="78" size={20} fill={BLUE}>( A + B ) * C</L>
      <rect x="60" y="120" width="280" height="200" rx="14" fill="#fff" stroke={AMBER} strokeWidth="2.5" />
      <L x="200" y="155" size={15} fill={AMBER}>operator stack</L>
      {/* cells sit clear of the heading so the push rise (-40) never covers it */}
      <rect x="110" y="206" width="160" height="48" rx="8" fill="#fff7ed" stroke={AMBER} strokeWidth="2.5" className="dsv-push" />
      <L x="190" y="238" size={22} fill={AMBER}>*</L>
      <rect x="110" y="262" width="160" height="48" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
      <L x="190" y="294" size={22}>+</L>
      <rect x="380" y="120" width="200" height="200" rx="14" fill="#fff" stroke={TEAL} strokeWidth="2.5" />
      <L x="480" y="155" size={15} fill={TEAL}>current token</L>
      <L x="480" y="230" size={42} fill={TEAL} className="dsv-pulse">C</L>
      <rect x="620" y="120" width="220" height="200" rx="14" fill="#fff" stroke={GREEN} strokeWidth="2.5" />
      <L x="730" y="155" size={15} fill={GREEN}>output</L>
      <L x="730" y="220" size={22} fill={N}>A B +</L>
      <L x="730" y="260" size={18} fill={MUTED} className="dsv-wave">… then C *</L>
      <L x="450" y="380" size={16} fill={MUTED}>operands → output · ops wait on stack by precedence</L>
    </Scene>
  )
}

/* ─── 10. PostfixEvalBoard ─────────────────────────────────────── */
export function PostfixEvalBoard({ caption }) {
  return (
    <Scene caption={caption || 'Postfix eval: operands push; op pops two'}>
      <L x="450" y="36" size={22}>Postfix evaluation</L>
      <L x="450" y="78" size={20} fill={BLUE}>5  3  2  *  +</L>
      <rect x="80" y="130" width="240" height="220" rx="14" fill="#fff" stroke={AMBER} strokeWidth="2.5" />
      <L x="200" y="165" size={15} fill={AMBER}>operand stack</L>
      {/* cells sit clear of the heading so the push rise (-40) never covers it */}
      <rect x="120" y="218" width="160" height="50" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2.5" className="dsv-push" />
      <L x="200" y="252" size={22}>5</L>
      <rect x="120" y="282" width="160" height="50" rx="8" fill="#fff7ed" stroke={AMBER} strokeWidth="2.5" className="dsv-pop" />
      <L x="200" y="316" size={20} fill={AMBER}>3 · 2 → *</L>
      <rect x="380" y="160" width="180" height="120" rx="14" fill={SKY} stroke={TEAL} strokeWidth="2.5" className="dsv-pulse" />
      <L x="470" y="210" size={16} fill={TEAL}>token</L>
      <L x="470" y="250" size={32} fill={TEAL}>*</L>
      <rect x="620" y="160" width="200" height="120" rx="14" fill="#f0fdf4" stroke={GREEN} strokeWidth="2.5" />
      <L x="720" y="210" size={16} fill={GREEN}>partial</L>
      <L x="720" y="250" size={26} fill={GREEN}>6</L>
      <L x="450" y="420" size={16} fill={MUTED}>see * → pop 2,3 · push 6 · then + → 11</L>
    </Scene>
  )
}

/* ─── 11. TreeCanvas ────────────────────────────────────────────── */
const TREE = {
  A: { x: 450, y: 90, L: 'B', R: 'C' },
  B: { x: 260, y: 200, L: 'D', R: 'E' },
  C: { x: 640, y: 200, L: 'F', R: null },
  D: { x: 160, y: 320, L: null, R: null },
  E: { x: 360, y: 320, L: null, R: null },
  F: { x: 640, y: 320, L: null, R: null },
}
const BST = {
  50: { x: 450, y: 90, L: 30, R: 70 },
  30: { x: 280, y: 200, L: 20, R: 40 },
  70: { x: 620, y: 200, L: 60, R: 80 },
  20: { x: 200, y: 310, L: null, R: null },
  40: { x: 360, y: 310, L: null, R: null },
  60: { x: 560, y: 310, L: null, R: null },
  80: { x: 700, y: 310, L: null, R: null },
}

function drawTree(nodes, opts = {}) {
  const { visit = [], current, path = [], insertVal, searchVal, deleteVal } = opts
  const edges = []
  Object.entries(nodes).forEach(([k, n]) => {
    ;[['L', n.L], ['R', n.R]].forEach(([, child]) => {
      if (child != null && nodes[child]) {
        const onPath = path.includes(String(k)) && path.includes(String(child))
        edges.push(
          <line
            key={`${k}-${child}`}
            x1={n.x}
            y1={n.y + 22}
            x2={nodes[child].x}
            y2={nodes[child].y - 22}
            stroke={onPath ? TEAL : N}
            strokeWidth={onPath ? 4 : 2.5}
            className={onPath ? 'dsv-traverse' : ''}
          />,
        )
      }
    })
  })
  const verts = Object.entries(nodes).map(([k, n]) => {
    const visited = visit.includes(String(k)) || visit.includes(Number(k))
    const cur = String(current) === String(k)
    const del = String(deleteVal) === String(k)
    return (
      <g key={k} className={cur ? 'dsv-pulse' : visited ? 'dsv-traverse' : del ? 'dsv-delete' : ''}>
        <circle cx={n.x} cy={n.y} r="28" fill={del ? '#fef2f2' : cur ? '#fff7ed' : visited ? '#ccfbf1' : SKY} stroke={del ? RED : cur ? AMBER : visited ? TEAL : BLUE} strokeWidth="3" />
        <L x={n.x} y={n.y + 7} size={18} fill={N}>{k}</L>
      </g>
    )
  })
  return (
    <>
      {edges}
      {verts}
      {insertVal != null && (
        <g className="dsv-descend">
          <circle cx={450} cy={50} r="22" fill="#fff7ed" stroke={AMBER} strokeWidth="3" />
          <L x={450} y={56} size={16} fill={AMBER}>{insertVal}</L>
        </g>
      )}
      {searchVal != null && <L x="780" y="80" size={16} fill={PURP} anchor="end">find {searchVal}</L>}
    </>
  )
}

export function TreeCanvas({ mode = 'terms', caption }) {
  const titles = {
    terms: 'Binary tree terms',
    preorder: 'Preorder: Root → L → R',
    inorder: 'Inorder: L → Root → R',
    postorder: 'Postorder: L → R → Root',
    'bst-insert': 'BST insert: walk L/R then link',
    'bst-search': 'BST search: compare & descend',
    'bst-delete': 'BST delete cases',
  }
  let body
  if (mode === 'terms') {
    body = (
      <>
        {drawTree(TREE)}
        <L x="450" y="70" size={14} fill={AMBER}>ROOT</L>
        <L x="120" y="360" size={14} fill={MUTED} anchor="start">leaf</L>
        <L x="780" y="200" size={14} fill={MUTED} anchor="end">internal</L>
      </>
    )
  } else if (mode === 'preorder') {
    body = (
      <>
        {drawTree(TREE, { visit: ['A', 'B', 'D'], current: 'D', path: ['A', 'B', 'D'] })}
        <L x="450" y="420" size={18} fill={TEAL} className="dsv-wave">A → B → D …</L>
      </>
    )
  } else if (mode === 'inorder') {
    body = (
      <>
        {drawTree(TREE, { visit: ['D', 'B', 'E'], current: 'E', path: ['B', 'E'] })}
        <L x="450" y="420" size={18} fill={TEAL} className="dsv-wave">D → B → E …</L>
      </>
    )
  } else if (mode === 'postorder') {
    body = (
      <>
        {drawTree(TREE, { visit: ['D', 'E', 'B'], current: 'B', path: ['B'] })}
        <L x="450" y="420" size={18} fill={TEAL} className="dsv-wave">D → E → B …</L>
      </>
    )
  } else if (mode === 'bst-insert') {
    body = (
      <>
        {drawTree(BST, { path: ['50', '70'], current: 70, insertVal: 65 })}
        <L x="450" y="420" size={16} fill={AMBER}>65 &gt; 50 → right · 65 &lt; 70 → left</L>
      </>
    )
  } else if (mode === 'bst-search') {
    body = (
      <>
        {drawTree(BST, { path: ['50', '30', '40'], current: 40, searchVal: 40 })}
        <L x="450" y="420" size={16} fill={PURP} className="dsv-search">compare · descend · found</L>
      </>
    )
  } else {
    body = (
      <>
        {drawTree(BST, { deleteVal: 30, path: ['50', '30'] })}
        <L x="200" y="420" size={14} fill={MUTED} anchor="start">0 child · 1 child · 2 children (successor)</L>
      </>
    )
  }
  return (
    <Scene caption={caption || titles[mode] || 'Tree'}>
      <L x="450" y="36" size={20}>{titles[mode] || 'Tree'}</L>
      {body}
    </Scene>
  )
}

/* ─── 12. GraphExplore ──────────────────────────────────────────── */
export function GraphExplore({ mode = 'bfs', caption }) {
  const nodes = [
    { id: 'S', x: 200, y: 250 },
    { id: 'A', x: 380, y: 150 },
    { id: 'B', x: 380, y: 350 },
    { id: 'C', x: 560, y: 150 },
    { id: 'D', x: 560, y: 350 },
    { id: 'E', x: 720, y: 250 },
  ]
  const edges = [['S', 'A'], ['S', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'E']]
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const bfs = mode === 'bfs'
  const wave = bfs ? ['S', 'A', 'B'] : ['S', 'A', 'C', 'E']
  return (
    <Scene caption={caption || (bfs ? 'BFS: wave by layers via queue' : 'DFS: deep path via stack')}>
      <L x="450" y="36" size={22}>{bfs ? 'BFS wave' : 'DFS path'}</L>
      {edges.map(([a, b]) => {
        const on = wave.includes(a) && wave.includes(b)
        return (
          <line
            key={`${a}${b}`}
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
            stroke={on ? TEAL : MUTED}
            strokeWidth={on ? 4 : 2}
            className={on ? (bfs ? 'dsv-wave' : 'dsv-descend') : ''}
          />
        )
      })}
      {nodes.map((n) => {
        const hit = wave.includes(n.id)
        return (
          <g key={n.id} className={hit ? (bfs ? 'dsv-wave' : 'dsv-traverse') : ''}>
            <circle cx={n.x} cy={n.y} r="28" fill={hit ? '#ccfbf1' : SKY} stroke={hit ? TEAL : BLUE} strokeWidth="3" />
            <L x={n.x} y={n.y + 7} size={18}>{n.id}</L>
          </g>
        )
      })}
      <rect x="60" y="420" width="780" height="60" rx="12" fill="#fff" stroke="rgba(16,32,51,0.12)" strokeWidth="2" />
      <L x="450" y="458" size={16} fill={bfs ? AMBER : PURP}>
        {bfs ? 'QUEUE:  A  B  |  frontier expands level by level' : 'STACK:  E  C  A  S  |  go deep, then backtrack'}
      </L>
    </Scene>
  )
}

/* ─── 13. HashTableProbe ────────────────────────────────────────── */
export function HashTableProbe({ caption }) {
  const table = [null, 'cat', 'dog', null, 'elk', null, null]
  return (
    <Scene caption={caption || 'Hash → index; collision → linear probe'}>
      <L x="450" y="36" size={22}>Hash table probe</L>
      <rect x="60" y="100" width="140" height="70" rx="12" fill="#fff7ed" stroke={AMBER} strokeWidth="2.5" className="dsv-pulse" />
      <L x="130" y="130" size={14} fill={AMBER}>KEY</L>
      <L x="130" y="158" size={20}>fox</L>
      <path d="M210 135 H280" stroke={N} strokeWidth="3" markerEnd="url(#dsArr)" className="dsv-pointer" />
      <rect x="290" y="100" width="160" height="70" rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
      <L x="370" y="130" size={14} fill={BLUE}>hash(k)</L>
      <L x="370" y="158" size={20}>h % 7 = 1</L>
      <path d="M460 135 H520" stroke={N} strokeWidth="3" markerEnd="url(#dsArr)" />
      <L x="700" y="90" size={15} fill={MUTED}>table[7]</L>
      {table.map((v, i) => (
        <g key={i}>
          <Cell
            x={540}
            y={110 + i * 48}
            w={200}
            h={42}
            value={v == null ? '∅' : v}
            idx={i}
            fill={i === 1 || i === 2 ? '#fef2f2' : i === 3 ? '#fff7ed' : SKY}
            stroke={i === 3 ? AMBER : i === 1 || i === 2 ? RED : BLUE}
            /* target slot pulses (opacity) instead of rising into the slot above */
            className={i === 3 ? 'dsv-pulse' : i === 1 || i === 2 ? 'dsv-search' : ''}
          />
        </g>
      ))}
      <L x="200" y="280" size={16} fill={RED} anchor="start">collision at 1,2</L>
      <L x="200" y="320" size={16} fill={AMBER} anchor="start" className="dsv-search">probe → index 3</L>
    </Scene>
  )
}

/* ─── 14. HeapTreeArray ─────────────────────────────────────────── */
export function HeapTreeArray({ mode = 'insert', caption }) {
  const arr = mode === 'insert' ? [90, 70, 80, 40, 50, 60, 85] : [90, 70, 80, 40, 50, 60, 20]
  const coords = [
    [450, 90], [300, 180], [600, 180], [220, 280], [380, 280], [520, 280], [680, 280],
  ]
  return (
    <Scene caption={caption || (mode === 'insert' ? 'Heap insert: append then bubble up' : 'Heapify: sift down')}>
      <L x="450" y="32" size={20}>{mode === 'insert' ? 'Max-heap insert' : 'Heapify / sift-down'}</L>
      {[[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]].map(([a, b]) => (
        <line key={`${a}-${b}`} x1={coords[a][0]} y1={coords[a][1] + 20} x2={coords[b][0]} y2={coords[b][1] - 20} stroke={N} strokeWidth="2.5" />
      ))}
      {arr.map((v, i) => (
        <g key={i} className={i === 6 && mode === 'insert' ? 'dsv-push' : mode === 'heapify' && i === 0 ? 'dsv-swap' : ''}>
          <circle cx={coords[i][0]} cy={coords[i][1]} r="26" fill={i === 6 && mode === 'insert' ? '#fff7ed' : SKY} stroke={i === 6 ? AMBER : BLUE} strokeWidth="3" />
          <L x={coords[i][0]} y={coords[i][1] + 6} size={16}>{v}</L>
        </g>
      ))}
      {arr.map((v, i) => (
        <Cell key={`a${i}`} x={80 + i * 100} y={380} w={84} h={48} value={v} idx={i} className={i === 6 ? 'dsv-insert' : ''} fill={i === 6 ? '#fff7ed' : SKY} stroke={i === 6 ? AMBER : BLUE} />
      ))}
      <L x="450" y="360" size={14} fill={MUTED}>parent(i)=⌊(i−1)/2⌋ · left=2i+1 · right=2i+2</L>
    </Scene>
  )
}

/* ─── 15. SparseTripleBoard ─────────────────────────────────────── */
export function SparseTripleBoard({ caption }) {
  return (
    <Scene caption={caption || 'Sparse matrix → triples; transpose swaps row/col'}>
      <L x="450" y="36" size={20}>Sparse → triple · transpose</L>
      {[[0, 5], [1, 0], [2, 8], [0, 0], [0, 0], [3, 0], [0, 0], [0, 0], [0, 0]].map(([_r, v], i) => {
        const c = i % 3
        const row = Math.floor(i / 3)
        return (
          <rect key={i} x={80 + c * 70} y={100 + row * 70} width={60} height={60} rx="8" fill={v ? SKY : '#fff'} stroke={v ? BLUE : 'rgba(16,32,51,0.12)'} strokeWidth="2" />
        )
      })}
      <L x="185" y="90" size={14} fill={MUTED}>matrix</L>
      {[5, 8, 3].map((v, i) => (
        <L key={v} x={110 + (i === 0 ? 0 : i === 1 ? 140 : 70)} y={140 + (i === 0 ? 0 : i === 1 ? 140 : 70)} size={18} fill={BLUE}>{v}</L>
      ))}
      <path d="M310 200 H370" stroke={N} strokeWidth="3" markerEnd="url(#dsArr)" className="dsv-pointer" />
      <rect x="390" y="100" width="220" height="220" rx="12" fill="#fff" stroke={TEAL} strokeWidth="2.5" />
      <L x="500" y="130" size={14} fill={TEAL}>row col val</L>
      {[[0, 1, 5], [1, 0, 8], [2, 0, 3]].map((t, i) => (
        <L key={i} x="500" y={170 + i * 40} size={18} fill={N}>{`${t[0]}   ${t[1]}   ${t[2]}`}</L>
      ))}
      <path d="M620 210 H680" stroke={AMBER} strokeWidth="3" markerEnd="url(#dsArr)" className="dsv-swap" />
      <rect x="700" y="100" width="160" height="220" rx="12" fill="#fff7ed" stroke={AMBER} strokeWidth="2.5" className="dsv-swap" />
      <L x="780" y="130" size={14} fill={AMBER}>transpose</L>
      {[[1, 0, 5], [0, 1, 8], [0, 2, 3]].map((t, i) => (
        <L key={i} x="780" y={170 + i * 40} size={16}>{`${t[0]} ${t[1]} ${t[2]}`}</L>
      ))}
    </Scene>
  )
}

/* ─── 16. PolyArrayBoard ────────────────────────────────────────── */
export function PolyArrayBoard({ caption }) {
  const terms = [
    { c: 3, e: 4 },
    { c: -2, e: 2 },
    { c: 5, e: 0 },
  ]
  return (
    <Scene caption={caption || 'Polynomial as array of (coeff, exp)'}>
      <L x="450" y="40" size={22}>Polynomial terms</L>
      <L x="450" y="90" size={24} fill={BLUE}>3x⁴ − 2x² + 5</L>
      {terms.map((t, i) => (
        <g key={i}>
          <rect x={120 + i * 220} y={160} width="180" height="120" rx="14" fill="#fff" stroke={BLUE} strokeWidth="3" className="dsv-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          <L x={210 + i * 220} y={205} size={15} fill={MUTED}>coeff | exp</L>
          <L x={210 + i * 220} y={250} size={24} fill={N}>{`${t.c} | ${t.e}`}</L>
        </g>
      ))}
      <L x="450" y="360" size={16} fill={MUTED}>term[i] = (aᵢ , eᵢ) · degree = max exp</L>
    </Scene>
  )
}

/* ─── 17. ComplexityCard ────────────────────────────────────────── */
export function ComplexityCard({ bigO = 'O(n)', reason = 'Must visit each element once', caption }) {
  return (
    <Scene caption={caption || 'Complexity tied to a visual reason'}>
      <L x="450" y="54" size={26}>Why this Big-O?</L>
      <rect x="80" y="130" width="330" height="300" rx="20" fill="#fff" stroke={BLUE} strokeWidth="3.5" className="dsv-pulse" />
      <L x="245" y="210" size={22} fill={MUTED}>growth</L>
      <L x="245" y="310" size={68} fill={BLUE}>{bigO}</L>
      <path d="M420 280 H500" stroke={N} strokeWidth="5" markerEnd="url(#dsArr)" />
      <rect x="510" y="130" width="360" height="300" rx="20" fill={SKY} stroke={TEAL} strokeWidth="3.5" />
      <L x="690" y="205" size={20} fill={TEAL}>because</L>
      <foreignObject x="536" y="230" width="308" height="180">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: 'system-ui,sans-serif', fontSize: '26px', fontWeight: 700, color: N, textAlign: 'center', lineHeight: 1.35, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {reason}
        </div>
      </foreignObject>
    </Scene>
  )
}

/* ─── 18. CodeWithViz ───────────────────────────────────────────── */
export function CodeWithViz({
  lines = ['for (i = n; i > pos; i--)', '  a[i] = a[i-1];', 'a[pos] = val;'],
  current = 1,
  hint = 'shift right, then write',
  caption,
}) {
  return (
    <Scene caption={caption || 'Code + side visual'}>
      <L x="450" y="36" size={20}>Code with live hint</L>
      <foreignObject x="50" y="70" width="420" height="360">
        <div xmlns="http://www.w3.org/1999/xhtml" className="ds-code-panel">
          {lines.map((ln, i) => (
            <div key={i} className={`ds-code-line${i === current ? ' is-current' : ''}`}>{ln}</div>
          ))}
        </div>
      </foreignObject>
      <rect x="520" y="120" width="320" height="220" rx="14" fill="#fff" stroke={AMBER} strokeWidth="2.5" />
      <L x="680" y="180" size={16} fill={AMBER}>visual</L>
      <Cell x={560} y={210} value={10} />
      <Cell x={640} y={210} value={20} className="dsv-shift" />
      <Cell x={720} y={210} value={25} fill="#fff7ed" stroke={AMBER} className="dsv-insert" />
      <L x="680" y="320" size={15} fill={MUTED}>{hint}</L>
    </Scene>
  )
}

/* ─── 19. StructUnionBoard ──────────────────────────────────────── */
export function StructUnionBoard({ caption }) {
  return (
    <Scene caption={caption || 'struct: fields side-by-side · union: shared storage'}>
      <L x="450" y="36" size={22}>struct vs union</L>
      <rect x="60" y="100" width="360" height="280" rx="14" fill="#fff" stroke={BLUE} strokeWidth="3" />
      <L x="240" y="140" size={18} fill={BLUE}>struct Point</L>
      {['int x', 'int y', 'char tag'].map((f, i) => (
        <rect key={f} x={100} y={170 + i * 60} width="280" height="48" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" className="dsv-allocate" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      {['int x', 'int y', 'char tag'].map((f, i) => (
        <L key={`l${f}`} x={240} y={202 + i * 60} size={18}>{f}</L>
      ))}
      <rect x="480" y="100" width="360" height="280" rx="14" fill="#fff" stroke={PURP} strokeWidth="3" />
      <L x="660" y="140" size={18} fill={PURP}>union Data</L>
      <rect x={520} y={180} width="280" height="140" rx="12" fill="#f5f3ff" stroke={PURP} strokeWidth="3" className="dsv-pulse" />
      <L x="660" y="240" size={18} fill={PURP}>shared bytes</L>
      <L x="660" y="275" size={15} fill={MUTED}>int / float / bytes</L>
      <L x="240" y="420" size={14} fill={MUTED}>sum of sizes</L>
      <L x="660" y="420" size={14} fill={MUTED}>size of largest</L>
    </Scene>
  )
}

/* ─── 20. MultiStackShared ──────────────────────────────────────── */
export function MultiStackShared({ caption }) {
  return (
    <Scene caption={caption || 'Two stacks share one array from opposite ends'}>
      <L x="450" y="40" size={22}>Multiple stacks in one array</L>
      {[10, 20, 30, null, null, null, 70, 80].map((v, i) => (
        <Cell
          key={i}
          x={80 + i * 95}
          y={200}
          w={84}
          h={70}
          value={v == null ? '·' : v}
          idx={i}
          fill={v == null ? '#fff' : i < 3 ? SKY : '#f5f3ff'}
          stroke={v == null ? MUTED : i < 3 ? BLUE : PURP}
          className={i === 2 || i === 6 ? 'dsv-pulse' : ''}
        />
      ))}
      <L x="200" y="160" size={16} fill={BLUE}>Stack A →</L>
      <L x="700" y="160" size={16} fill={PURP}>← Stack B</L>
      <L x="450" y="360" size={16} fill={MUTED}>tops grow toward each other · collide = overflow</L>
    </Scene>
  )
}

/* ─── 21. ClassificationTree ────────────────────────────────────── */
export function ClassificationTree({ caption }) {
  return (
    <Scene caption={caption || 'Primitive vs non-primitive · linear vs non-linear'}>
      <L x="450" y="36" size={20}>Data structure classification</L>
      <rect x="320" y="70" width="260" height="56" rx="12" fill={SKY} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="106" size={18}>Data structures</L>
      <path d="M450 126 V160" stroke={N} strokeWidth="3" />
      <path d="M220 160 H680" stroke={N} strokeWidth="3" />
      <path d="M220 160 V190" stroke={N} strokeWidth="3" />
      <path d="M680 160 V190" stroke={N} strokeWidth="3" />
      <rect x="100" y="190" width="240" height="50" rx="10" fill="#fff" stroke={GREEN} strokeWidth="2.5" />
      <L x="220" y="222" size={16} fill={GREEN}>Primitive</L>
      <rect x="560" y="190" width="240" height="50" rx="10" fill="#fff" stroke={AMBER} strokeWidth="2.5" />
      <L x="680" y="222" size={16} fill={AMBER}>Non-primitive</L>
      <path d="M680 240 V270" stroke={N} strokeWidth="2.5" />
      <path d="M400 270 H800" stroke={N} strokeWidth="2.5" />
      <path d="M400 270 V300" stroke={N} strokeWidth="2.5" />
      <path d="M800 270 V300" stroke={N} strokeWidth="2.5" />
      <rect x="300" y="300" width="200" height="70" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.5" className="dsv-pulse" />
      <L x="400" y="330" size={15} fill={BLUE}>Linear</L>
      <L x="400" y="355" size={13} fill={MUTED}>array · list · stack · queue</L>
      <rect x="700" y="300" width="180" height="70" rx="10" fill="#f5f3ff" stroke={PURP} strokeWidth="2.5" className="dsv-pulse" />
      <L x="790" y="330" size={15} fill={PURP}>Non-linear</L>
      <L x="790" y="355" size={13} fill={MUTED}>tree · graph</L>
      <L x="220" y="320" size={14} fill={MUTED}>int · float · char</L>
    </Scene>
  )
}

/* ─── 22. DryRunBoard ───────────────────────────────────────────── */
export function DryRunBoard({
  input = 'a=[10,20,30,40], pos=2, val=25',
  current = 'i = 3',
  operation = 'a[i] = a[i-1]',
  updated = 'a=[10,20,30,30,40]',
  result = 'a=[10,20,25,30,40]',
  caption,
}) {
  const panels = [
    { t: 'INPUT', v: input, c: BLUE },
    { t: 'CURRENT', v: current, c: AMBER },
    { t: 'OPERATION', v: operation, c: PURP },
    { t: 'UPDATED', v: updated, c: TEAL },
    { t: 'RESULT', v: result, c: GREEN },
  ]
  return (
    <Scene caption={caption || 'Dry-run board'}>
      <L x="450" y="36" size={20}>Algorithm dry-run</L>
      {panels.map((p, i) => (
        <g key={p.t} className={i === 1 ? 'dsv-pulse' : i === 4 ? 'dsv-allocate' : ''}>
          <rect x={40 + (i % 3) * 290} y={i < 3 ? 90 : 280} width="270" height={i < 3 ? 140 : 130} rx="14" fill="#fff" stroke={p.c} strokeWidth="2.5" />
          <L x={175 + (i % 3) * 290} y={i < 3 ? 125 : 315} size={14} fill={p.c}>{p.t}</L>
          <foreignObject x={55 + (i % 3) * 290} y={i < 3 ? 140 : 330} width="240" height={i < 3 ? 70 : 60}>
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '15px', fontWeight: 700, color: N, textAlign: 'center', lineHeight: 1.3 }}>
              {p.v}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

/* ─── Module hero / outro ───────────────────────────────────────── */
export function ModuleHero({ module = 1, caption, title, question, hours }) {
  const themes = {
    1: { title: 'Introduction to Data Structures', hue: BLUE, label: 'arrays · pointers · memory' },
    2: { title: 'Stacks and Queues', hue: AMBER, label: 'LIFO · FIFO · polish notation' },
    3: { title: 'Linked Lists & Circular Structures', hue: PURP, label: 'nodes · rewiring · multi-stacks' },
    4: { title: 'Trees and BST', hue: TEAL, label: 'traversals · search trees' },
    5: { title: 'Graphs, Hashing & Heaps', hue: GREEN, label: 'BFS/DFS · collisions · priority' },
  }
  const t = themes[module] || themes[1]
  const headline = title || t.title
  return (
    <Scene caption={caption || null} className="ds-hero">
      <defs>
        <radialGradient id={`dsHero${module}`} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor={SKY} />
          <stop offset="100%" stopColor={CREAM} />
        </radialGradient>
      </defs>
      <rect width="900" height="520" fill={`url(#dsHero${module})`} rx="8" />
      <L x="450" y="48" size={18} fill={t.hue}>{`MODULE ${module}${hours ? `  ·  ${hours} teaching hours` : ''}`}</L>
      <circle cx="450" cy="190" r="100" fill="none" stroke={t.hue} strokeWidth="3" opacity="0.35" className="dsv-pulse" />
      <circle cx="450" cy="190" r="58" fill={SKY} stroke={t.hue} strokeWidth="4" className="dsv-allocate" />
      <L x="450" y="198" size={28} fill={t.hue}>{`M${module}`}</L>
      <L x="450" y="280" size={15} fill={MUTED}>{t.label}</L>
      <foreignObject x="80" y="310" width="740" height="170">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', fontFamily: 'Plus Jakarta Sans, Source Sans 3, sans-serif' }}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#102033', lineHeight: 1.2 }}>{headline}</div>
          {question ? (
            <div style={{ marginTop: '14px', fontSize: '19px', color: '#475569', lineHeight: 1.35 }}>{question}</div>
          ) : null}
        </div>
      </foreignObject>
    </Scene>
  )
}

export function ModuleOutro({ module = 1, story = [], title }) {
  const hues = { 1: BLUE, 2: AMBER, 3: PURP, 4: TEAL, 5: GREEN }
  const hue = hues[module] || BLUE
  const beats = story.length ? story : ['Idea', 'Structure', 'Ops', 'Code', 'Complexity']
  const n = beats.length
  const x0 = 90
  const x1 = 810
  const step = n > 1 ? (x1 - x0) / (n - 1) : 0
  const y = 240
  return (
    <Scene caption={null} className="ds-outro">
      <defs>
        <linearGradient id={`dsOut${module}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={hue} stopOpacity="0.25" />
          <stop offset="100%" stopColor={GREEN} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="900" height="520" fill={CREAM} rx="8" />
      <L x="450" y="70" size={22} fill={hue}>{`MODULE ${module} — COMPLETE`}</L>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={`url(#dsOut${module})`} strokeWidth="10" strokeLinecap="round" />
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={GREEN} strokeWidth="3" strokeDasharray="10 12" className="dsv-traverse" />
      {beats.map((b, i) => {
        const x = x0 + i * step
        return (
          <g key={b}>
            <circle cx={x} cy={y} r="16" fill="#fff" stroke={GREEN} strokeWidth="3.5" className="dsv-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
            <path d={`M${x - 7} ${y} l5 6 l9 -11`} stroke={GREEN} strokeWidth="3" fill="none" />
            <L x={x} y={i % 2 ? y + 52 : y - 34} size={16} fill={N}>{b}</L>
          </g>
        )
      })}
      <foreignObject x="120" y="330" width="660" height="140">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', fontFamily: 'Plus Jakarta Sans, Source Sans 3, sans-serif' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#102033', lineHeight: 1.2 }}>{title || 'Structures first, then operations, then cost.'}</div>
          <div style={{ marginTop: '12px', fontSize: '17px', color: '#16a34a', fontWeight: 700 }}>Syllabus mapped · memory → ADT → algorithm.</div>
        </div>
      </foreignObject>
    </Scene>
  )
}

/* ─── beatVisual routing ────────────────────────────────────────── */
const STATIC = {
  'ds-intro': () => <ClassificationTree />,
  classify: () => <ClassificationTree />,
  pointer: () => <PointerMemory />,
  malloc: () => <MallocHeap />,
  array: () => <ArrayMemoryStrip mode="static" />,
  'dyn-array': () => <ArrayMemoryStrip mode="access" />,
  struct: () => <StructUnionBoard />,
  poly: () => <PolyArrayBoard />,
  sparse: () => <SparseTripleBoard />,
  transpose: () => <SparseTripleBoard />,
  'stack-adt': () => <StackTower mode="static" />,
  'stack-ops': () => <StackTower mode="static" />,
  'array-stack': () => <StackTower mode="static" />,
  'dyn-stack': () => <StackTower mode="push" />,
  polish: () => <InfixPostfixBoard />,
  'infix-postfix': () => <InfixPostfixBoard />,
  'postfix-eval': () => <PostfixEvalBoard />,
  'queue-adt': () => <QueueLane mode="static" />,
  'array-queue': () => <QueueLane mode="static" />,
  'queue-ops': () => <QueueLane mode="enqueue" />,
  'circ-queue': () => <CircularQueueRing />,
  'dyn-circ': () => <CircularQueueRing />,
  'multi-stack': () => <MultiStackShared />,
  'multi-queue': () => <QueueLane mode="static" />,
  sll: () => <LinkedListChain mode="static" />,
  'chains-c': () => <LinkedListChain mode="static" />,
  'linked-stack': () => <StackTower mode="static" />,
  'linked-queue': () => <QueueLane mode="static" />,
  'list-ops': () => <LinkedListChain mode="insert" />,
  dll: () => <DoublyLinkedChain />,
  'tree-terms': () => <TreeCanvas mode="terms" />,
  bintree: () => <TreeCanvas mode="terms" />,
  'bt-props': () => <TreeCanvas mode="terms" />,
  'array-tree': () => <HeapTreeArray mode="insert" />,
  'linked-tree': () => <TreeCanvas mode="terms" />,
  preorder: () => <TreeCanvas mode="preorder" />,
  inorder: () => <TreeCanvas mode="inorder" />,
  postorder: () => <TreeCanvas mode="postorder" />,
  threaded: () => <TreeCanvas mode="inorder" />,
  bst: () => <TreeCanvas mode="bst-search" />,
  'bst-update': () => <TreeCanvas mode="bst-insert" />,
  'count-bt': () => <TreeCanvas mode="terms" />,
  'graph-adt': () => <GraphExplore mode="bfs" />,
  'graph-rep': () => <GraphExplore mode="bfs" />,
  'graph-ops': () => <GraphExplore mode="dfs" />,
  'graph-trav': () => <GraphExplore mode="bfs" />,
  'hash-intro': () => <HashTableProbe />,
  'hash-static': () => <HashTableProbe />,
  'hash-dyn': () => <HashTableProbe />,
  'prio-q': () => <HeapTreeArray mode="insert" />,
  depq: () => <HeapTreeArray mode="heapify" />,
  leftist: () => <HeapTreeArray mode="insert" />,
}

const OPS = {
  'ds-intro': () => <ClassificationTree />,
  classify: () => <ClassificationTree />,
  pointer: () => <PointerMemory />,
  malloc: () => <MallocHeap />,
  array: () => <ArrayMemoryStrip mode="insert" />,
  'dyn-array': () => <ArrayMemoryStrip mode="delete" />,
  struct: () => <StructUnionBoard />,
  poly: () => <PolyArrayBoard />,
  sparse: () => <SparseTripleBoard />,
  transpose: () => <SparseTripleBoard />,
  'stack-adt': () => <StackTower mode="push" />,
  'stack-ops': () => <StackTower mode="pop" />,
  'array-stack': () => <StackTower mode="overflow" />,
  'dyn-stack': () => <StackTower mode="underflow" />,
  polish: () => <InfixPostfixBoard />,
  'infix-postfix': () => <InfixPostfixBoard />,
  'postfix-eval': () => <PostfixEvalBoard />,
  'queue-adt': () => <QueueLane mode="enqueue" />,
  'array-queue': () => <QueueLane mode="dequeue" />,
  'queue-ops': () => <QueueLane mode="enqueue" />,
  'circ-queue': () => <CircularQueueRing />,
  'dyn-circ': () => <CircularQueueRing />,
  'multi-stack': () => <MultiStackShared />,
  'multi-queue': () => <QueueLane mode="dequeue" />,
  sll: () => <LinkedListChain mode="insert" />,
  'chains-c': () => <LinkedListChain mode="insert" />,
  'linked-stack': () => <StackTower mode="push" />,
  'linked-queue': () => <QueueLane mode="enqueue" />,
  'list-ops': () => <LinkedListChain mode="delete" />,
  dll: () => <DoublyLinkedChain />,
  'tree-terms': () => <TreeCanvas mode="terms" />,
  bintree: () => <TreeCanvas mode="preorder" />,
  'bt-props': () => <TreeCanvas mode="terms" />,
  'array-tree': () => <HeapTreeArray mode="insert" />,
  'linked-tree': () => <TreeCanvas mode="inorder" />,
  preorder: () => <TreeCanvas mode="preorder" />,
  inorder: () => <TreeCanvas mode="inorder" />,
  postorder: () => <TreeCanvas mode="postorder" />,
  threaded: () => <TreeCanvas mode="inorder" />,
  bst: () => <TreeCanvas mode="bst-insert" />,
  'bst-update': () => <TreeCanvas mode="bst-delete" />,
  'count-bt': () => <TreeCanvas mode="postorder" />,
  'graph-adt': () => <GraphExplore mode="bfs" />,
  'graph-rep': () => <GraphExplore mode="dfs" />,
  'graph-ops': () => <GraphExplore mode="bfs" />,
  'graph-trav': () => <GraphExplore mode="dfs" />,
  'hash-intro': () => <HashTableProbe />,
  'hash-static': () => <HashTableProbe />,
  'hash-dyn': () => <HashTableProbe />,
  'prio-q': () => <HeapTreeArray mode="insert" />,
  depq: () => <HeapTreeArray mode="heapify" />,
  leftist: () => <HeapTreeArray mode="heapify" />,
}

const ALGO = {
  array: () => <CodeWithViz />,
  'dyn-array': () => <DryRunBoard />,
  'stack-ops': () => <DryRunBoard input="push(40)" current="TOP++" operation="S[TOP]=40" updated="TOP=3" result="40 on top" />,
  'infix-postfix': () => <InfixPostfixBoard />,
  'postfix-eval': () => <PostfixEvalBoard />,
  'queue-ops': () => <DryRunBoard input="enqueue(44)" current="REAR++" operation="Q[REAR]=44" updated="REAR=3" result="44 at rear" />,
  'circ-queue': () => <CircularQueueRing />,
  sll: () => <LinkedListChain mode="insert" />,
  'list-ops': () => <LinkedListChain mode="delete" />,
  preorder: () => <TreeCanvas mode="preorder" />,
  inorder: () => <TreeCanvas mode="inorder" />,
  postorder: () => <TreeCanvas mode="postorder" />,
  bst: () => <TreeCanvas mode="bst-search" />,
  'bst-update': () => <TreeCanvas mode="bst-delete" />,
  'graph-trav': () => <GraphExplore mode="bfs" />,
  'hash-static': () => <HashTableProbe />,
  'prio-q': () => <HeapTreeArray mode="heapify" />,
  malloc: () => <MallocHeap />,
  pointer: () => <PointerMemory />,
  sparse: () => <SparseTripleBoard />,
  transpose: () => <SparseTripleBoard />,
}

const EXAMPLE = {
  array: () => <ComplexityCard bigO="O(n)" reason="Insert/delete may shift every later element" />,
  'dyn-array': () => <ComplexityCard bigO="O(1)" reason="Index arithmetic: base + i × size" />,
  'stack-ops': () => <ComplexityCard bigO="O(1)" reason="Push/pop only touch TOP" />,
  'queue-ops': () => <ComplexityCard bigO="O(1)" reason="FRONT and REAR move by one" />,
  'circ-queue': () => <ComplexityCard bigO="O(1)" reason="Modulo wrap avoids shifting" />,
  sll: () => <ComplexityCard bigO="O(n)" reason="Find node is linear; rewire is O(1)" />,
  'list-ops': () => <ComplexityCard bigO="O(1)" reason="Given PREV, bypass is constant time" />,
  preorder: () => <ComplexityCard bigO="O(n)" reason="Each node visited exactly once" />,
  inorder: () => <ComplexityCard bigO="O(n)" reason="Each node visited exactly once" />,
  postorder: () => <ComplexityCard bigO="O(n)" reason="Each node visited exactly once" />,
  bst: () => <ComplexityCard bigO="O(h)" reason="Height decides comparisons" />,
  'bst-update': () => <ComplexityCard bigO="O(h)" reason="Search path + local rewire" />,
  'graph-trav': () => <ComplexityCard bigO="O(V+E)" reason="Each vertex and edge once" />,
  'hash-static': () => <ComplexityCard bigO="O(1)*" reason="Average probe; worst is O(n)" />,
  'prio-q': () => <ComplexityCard bigO="O(log n)" reason="Bubble up / sift down the height" />,
  malloc: () => <ComplexityCard bigO="—" reason="Allocator cost depends on heap policy" />,
  poly: () => <ComplexityCard bigO="O(n)" reason="n terms to add/multiply carefully" />,
  sparse: () => <ComplexityCard bigO="O(t)" reason="t non-zeros, not full m×n" />,
}

/**
 * Beat cameras: 0 concept static · 1 animated op · 2 algorithm/dry-run · 3 example + complexity
 */
export function beatVisual(unit, beat) {
  const key = unit?.visual
  if (!key) return null
  if (beat === 0) return (STATIC[key] || (() => <ClassificationTree />))()
  if (beat === 1) return (OPS[key] || STATIC[key] || (() => <ClassificationTree />))()
  if (beat === 2) return (ALGO[key] || OPS[key] || STATIC[key] || (() => <DryRunBoard />))()
  if (beat === 3) return (EXAMPLE[key] || (() => <ComplexityCard />))()
  return (STATIC[key] || (() => null))()
}
