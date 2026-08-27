/* ============================================================================
   JAVA LIVING-VISUAL KIT  —  V2.2 "Living Software"
   Reusable, phase-aware SVG scenes that show Java executing: classes becoming
   objects, the JVM pipeline, stack/heap memory. 2.5D depth via layered planes +
   extruded glass slabs (no WebGL, no heavy filters). Structure is always
   painted (pause-safe); motion is CSS-driven (see javaViz.css) so it restarts
   on slide remount and freezes under prefers-reduced-motion.

   Depth model: background plane (blueprint grid) < midground (glass slabs) <
   foreground (active packets / reference lines / labels).
   ========================================================================== */

/* ---- shared primitives ---------------------------------------------------- */

// An extruded glass slab: a top face (parallelogram) + front face, giving a
// premium 2.5D "software component" look without real 3D.
function Slab({ x, y, w, h, depth = 12, tone = 'navy', className = '', style, children }) {
  x = +x; y = +y; w = +w; h = +h; depth = +depth
  return (
    <g className={`jlv-slab jlv-slab-${tone} ${className}`} style={style}>
      <path className="jlv-slab-top" d={`M${x} ${y} L${x + depth} ${y - depth} L${x + w + depth} ${y - depth} L${x + w} ${y} Z`} />
      <path className="jlv-slab-side" d={`M${x + w} ${y} L${x + w + depth} ${y - depth} L${x + w + depth} ${y + h - depth} L${x + w} ${y + h} Z`} />
      <rect className="jlv-slab-face" x={x} y={y} width={w} height={h} rx="14" />
      {children}
    </g>
  )
}

function ShadowEllipse({ cx, cy, rx, ry = 10, className = '' }) {
  return <ellipse className={`jlv-shadow ${className}`} cx={cx} cy={cy} rx={rx} ry={ry} />
}

function Chip({ x, y, w = 96, h = 26, tone = 'ghost', className = '', style, children }) {
  x = +x; y = +y; w = +w; h = +h
  return (
    <g className={`jlv-chip jlv-chip-${tone} ${className}`} style={style}>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle">{children}</text>
    </g>
  )
}

/* ============================================================================
   PRIORITY 1 — CLASS  →  OBJECT   (signature visual)
   Blueprint (one definition) --new()--> concrete instance in the heap, with a
   reference connecting a stack variable to the heap object, then a method call.
   ========================================================================== */
export function ClassObjectViz({
  type = 'Student',
  ctor = 'new Student()',
  f1 = ['String name;', 'name = "Asha"'],
  f2 = ['int usn;', 'usn = 101'],
  method = ['String getName()', 'getName()', 'returns "Asha"'],
} = {}) {
  const varName = type.charAt(0).toLowerCase() + type.slice(1)
  return (
    <svg className="jlv-svg jlv-classobject" viewBox="0 0 680 520" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="A class blueprint is instantiated with new into an object that lives in the heap, connected by a reference">
      <defs>
        <linearGradient id="jlvBlueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef4ff" /><stop offset="1" stopColor="#dbe7fb" />
        </linearGradient>
        <linearGradient id="jlvHeapObjGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#fdeeec" />
        </linearGradient>
        <marker id="jlvRefHead" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
          <path d="M0 0 L6.5 3 L0 6 Z" fill="#c23b30" />
        </marker>
      </defs>

      {/* background: blueprint grid + receded HEAP plane */}
      <rect className="jlv-grid" x="0" y="0" width="680" height="520" />
      <g className="jlv-heap-plane">
        <path className="jlv-heap-face" d="M372 96 L400 74 L664 74 L664 452 L400 452 L372 474 Z" />
        <text className="jlv-plane-label" x="648" y="104" textAnchor="end">HEAP · object lives here</text>
      </g>

      {/* ---- the CLASS blueprint (midground, extruded) ---- */}
      <ShadowEllipse cx="182" cy="386" rx="120" />
      <g className="jlv-reveal r1">
        <Slab x="52" y="150" w="230" h="212" depth="14" tone="blueprint">
          <text className="jlv-slab-title" x="74" y="182">class {type}</text>
          <line className="jlv-rule" x1="70" y1="196" x2="262" y2="196" />
          <text className="jlv-field blueprint" x="74" y="228">{f1[0]}</text>
          <text className="jlv-field blueprint" x="74" y="256">{f2[0]}</text>
          <line className="jlv-rule dash" x1="70" y1="276" x2="262" y2="276" />
          <text className="jlv-field blueprint mono" x="74" y="308">{type}(…)</text>
          <text className="jlv-field blueprint mono" x="74" y="336">{method[0]}</text>
        </Slab>
        <text className="jlv-cap blueprint" x="70" y="384">blueprint · written once</text>
      </g>

      {/* ---- constructor beam: new Student() travels to the heap ---- */}
      <g className="jlv-reveal r3">
        <path id="jlvCtorPath" className="jlv-beam" d="M292 250 L452 250" />
        <text className="jlv-beam-label" x="372" y="236" textAnchor="middle">{ctor}</text>
        <g className="jlv-packet-ctor">
          <rect x="-16" y="-13" width="32" height="26" rx="8" />
          <text x="0" y="5" textAnchor="middle">new</text>
        </g>
      </g>

      {/* ---- the OBJECT instance (in heap) ---- */}
      <ShadowEllipse cx="548" cy="392" rx="104" className="jlv-reveal r4" />
      <g className="jlv-reveal r4 jlv-pop">
        <Slab x="448" y="150" w="196" h="212" depth="12" tone="object">
          <text className="jlv-slab-title dark" x="470" y="182">{type}</text>
          <text className="jlv-id-chip" x="626" y="182" textAnchor="end">@7a3f</text>
          <line className="jlv-rule" x1="466" y1="196" x2="626" y2="196" />
          <g className="jlv-reveal r5">
            <text className="jlv-field val" x="470" y="230">{f1[1]}</text>
            <text className="jlv-field val" x="470" y="262">{f2[1]}</text>
          </g>
          <line className="jlv-rule dash" x1="466" y1="284" x2="626" y2="284" />
          <g className="jlv-method-invoke jlv-reveal r7">
            <rect x="466" y="300" width="160" height="46" rx="10" />
            <text className="jlv-field mono dark" x="546" y="322" textAnchor="middle">{method[1]}</text>
            <text className="jlv-field val small" x="546" y="338" textAnchor="middle">{method[2]}</text>
          </g>
        </Slab>
      </g>

      {/* ---- reference: stack variable -> heap object ---- */}
      <g className="jlv-reveal r6">
        <text className="jlv-cap" x="100" y="410">stack · reference variable</text>
        <Chip x="96" y="420" w="150" h="30" tone="ref">{type} {varName} ●</Chip>
        <path className="jlv-ref-line" d="M246 435 C312 435 372 320 452 292" />
      </g>
    </svg>
  )
}

/* ============================================================================
   PRIORITY 2 — JVM EXECUTION PIPELINE (cinematic)
   .java -> javac -> .class -> Loader -> Verifier -> JVM(JIT) -> CPU -> Output
   with bytecode packets streaming through and the JVM core heart-beating.
   ========================================================================== */
const JVM_STAGES = [
  { k: '.java', s: 'source', tone: 'source' },
  { k: 'javac', s: 'compiler', tone: 'amber' },
  { k: '.class', s: 'bytecode', tone: 'navy' },
  { k: 'Loader', s: 'class loader', tone: 'navy' },
  { k: 'Verify', s: 'verifier', tone: 'navy' },
  { k: 'JVM', s: 'interpreter · JIT', tone: 'core' },
  { k: 'CPU', s: 'machine code', tone: 'teal' },
  { k: 'Output', s: 'result', tone: 'object' },
]
export function JvmPipelineViz() {
  const x0 = 30, top = 150, sw = 96, gap = 14, sh = 108
  const centerY = top + sh / 2
  return (
    <svg className="jlv-svg jlv-jvm" viewBox="0 0 920 400" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="Java source is compiled to bytecode, loaded, verified and executed by the JVM into machine code and output">
      <rect className="jlv-grid" x="0" y="0" width="920" height="400" />
      <text className="jlv-plane-label dark" x="30" y="70">JVM EXECUTION ENGINE</text>

      {/* connecting rail */}
      <line className="jlv-rail" x1={x0 + sw} y1={centerY} x2={x0 + JVM_STAGES.length * (sw + gap) - gap} y2={centerY} />

      {JVM_STAGES.map((st, i) => {
        const x = x0 + i * (sw + gap)
        const isCore = st.tone === 'core'
        const y = isCore ? top - 16 : top
        const h = isCore ? sh + 32 : sh
        return (
          <g key={st.k} className="jlv-reveal jlv-stage" style={{ '--i': i }}>
            <ShadowEllipse cx={x + sw / 2} cy={top + sh + 24} rx={sw / 2} />
            <Slab x={x} y={y} w={sw} h={h} depth={isCore ? 14 : 10} tone={st.tone} className={isCore ? 'jlv-jvm-core' : ''}>
              <text className={`jlv-stage-k ${isCore ? 'big' : ''}`} x={x + sw / 2} y={y + (isCore ? h / 2 - 2 : 46)} textAnchor="middle">{st.k}</text>
            </Slab>
            <text className="jlv-stage-s" x={x + sw / 2} y={top + sh + 46} textAnchor="middle">{st.s}</text>
            {i < JVM_STAGES.length - 1 && <path className="jlv-arrow" d={`M${x + sw + 2} ${centerY} l8 0`} />}
          </g>
        )
      })}

      {/* bytecode packets streaming across the whole pipeline */}
      <g className="jlv-bytestream">
        {[0, 1, 2, 3, 4].map((n) => (
          <g key={n} className="jlv-byte" style={{ '--d': `${n * 1.4}s` }}>
            <rect x="-14" y="-11" width="28" height="22" rx="5" />
            <text x="0" y="5" textAnchor="middle">{['1B', '3E', 'B6', '2A', 'AC'][n]}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ============================================================================
   PRIORITY 3 — STACK  &  HEAP  (split memory, 2.5D)
   Foreground stack frames (push/pop) on the left; receded heap plane on the
   right; references cross from stack variables to shared heap objects.
   mode="objects" (main + greet share an object)  |  "recursion" (fact frames)
   ========================================================================== */
export function StackHeapViz({ mode = 'objects' }) {
  const recursion = mode === 'recursion'
  // stack frames render bottom -> top (main at the bottom)
  const frames = recursion
    ? [
        { name: 'main()', local: 'n = 3', ref: null },
        { name: 'fact(3)', local: 'n = 3', ref: null },
        { name: 'fact(2)', local: 'n = 2', ref: null },
        { name: 'fact(1)', local: 'n = 1', ref: null, top: true },
      ]
    : [
        { name: 'main()', local: 'Student student', ref: true },
        { name: 'greet(s)', local: 'Student s', ref: true, top: true },
      ]
  const fh = 74, fgap = 14, baseY = 452
  return (
    <svg className="jlv-svg jlv-stackheap" viewBox="0 0 700 520" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="Local variables and method frames live on the stack; objects live on the heap; references point from the stack into the heap">
      <defs>
        <marker id="jlvRefHead" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
          <path d="M0 0 L6.5 3 L0 6 Z" fill="#c23b30" />
        </marker>
        <marker id="jlvArrowHead" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6.5 3 L0 6 Z" fill="rgba(22,35,60,.45)" />
        </marker>
      </defs>
      <rect className="jlv-grid" x="0" y="0" width="700" height="520" />

      {/* receded HEAP plane */}
      <g className="jlv-heap-plane">
        <path className="jlv-heap-face" d="M372 92 L400 70 L672 70 L672 470 L400 470 L372 492 Z" />
        <text className="jlv-plane-label" x="536" y="100">HEAP</text>
      </g>
      <text className="jlv-plane-label dark" x="150" y="100" textAnchor="middle">STACK</text>
      <path className="jlv-grow-arrow" d="M40 452 L40 150" />
      <text className="jlv-grow-label" x="30" y="150" transform="rotate(-90 30 150)" textAnchor="middle">grows on each call</text>

      {/* stack frames (push in with stagger, bottom -> top) */}
      {frames.map((f, i) => {
        const y = baseY - (i + 1) * fh - i * fgap
        return (
          <g key={f.name} className={`jlv-reveal jlv-frame ${f.top ? 'jlv-frame-top' : ''}`} style={{ '--i': i }}>
            <ShadowEllipse cx="196" cy={y + fh + 6} rx="118" ry="7" />
            <Slab x="70" y={y} w="252" h={fh} depth="10" tone={f.top ? 'active' : 'frame'}>
              <text className="jlv-frame-name" x="90" y={y + 30}>{f.name}</text>
              <text className="jlv-field mono" x="90" y={y + 54}>{f.local}</text>
              {f.ref && <circle className="jlv-ref-dot" cx="300" cy={y + fh / 2} r="6" />}
            </Slab>
          </g>
        )
      })}

      {/* heap object(s) */}
      {!recursion && (
        <g className="jlv-reveal r-heap jlv-pop">
          <ShadowEllipse cx="536" cy="300" rx="96" />
          <Slab x="440" y="150" w="196" h="132" depth="12" tone="object">
            <text className="jlv-slab-title dark" x="462" y="182">Student</text>
            <text className="jlv-id-chip" x="614" y="182" textAnchor="end">@7a3f</text>
            <line className="jlv-rule" x1="458" y1="196" x2="618" y2="196" />
            <text className="jlv-field val" x="462" y="228">name = "Asha"</text>
            <text className="jlv-field val" x="462" y="258">usn  = 101</text>
          </Slab>
        </g>
      )}
      {recursion && (
        <g className="jlv-reveal r-heap">
          <text className="jlv-note" x="536" y="250" textAnchor="middle">no objects —</text>
          <text className="jlv-note" x="536" y="276" textAnchor="middle">primitives live</text>
          <text className="jlv-note" x="536" y="302" textAnchor="middle">in the frames</text>
          <text className="jlv-note strong" x="536" y="352" textAnchor="middle">return unwinds</text>
          <text className="jlv-note strong" x="536" y="378" textAnchor="middle">1 · 1 · 2 · 6</text>
        </g>
      )}

      {/* references: stack ref dots -> heap object */}
      {!recursion && frames.map((f, i) => {
        if (!f.ref) return null
        const y = baseY - (i + 1) * fh - i * fgap + fh / 2
        return <path key={`ref${i}`} className="jlv-ref-line" style={{ '--i': i }} d={`M300 ${y} C360 ${y} 400 220 440 216`} />
      })}
    </svg>
  )
}

/* ---- member row (used by InheritanceTree) --------------------------------- */
function MemberRow({ x, y, w, tone, tag, children }) {
  x = +x; y = +y; w = +w
  return (
    <g className={`jlv-mrow jlv-mrow-${tone}`}>
      <rect className="jlv-mrow-bg" x={x} y={y} width={w} height="36" rx="9" />
      <rect className="jlv-mrow-bar" x={x + 2} y={y + 3} width="4" height="30" rx="2" />
      <text className="jlv-mrow-text" x={x + 18} y={y + 23}>{children}</text>
      <text className="jlv-mrow-tag" x={x + w - 12} y={y + 23} textAnchor="end">{tag}</text>
    </g>
  )
}

/* ============================================================================
   PRIORITY 4 — INHERITANCE   (structure + reuse; overrides replace behavior)
   A superclass blueprint; behavior flows DOWN into child blueprints; each child
   reuses inherited members, adds its own, and one member is OVERRIDDEN.
   ========================================================================== */
export function InheritanceTree() {
  const children = [
    { name: 'Dog', cx: 194, x: 56, px: 332, over: 'sound() → "Woof!"', add: 'fetch()' },
    { name: 'Cat', cx: 546, x: 408, px: 408, over: 'sound() → "Meow!"', add: 'scratch()' },
  ]
  const childY = 306, childW = 276, childH = 210
  return (
    <svg className="jlv-svg jlv-inherit" viewBox="0 0 740 540" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="A superclass blueprint whose behavior is inherited by child classes; each child reuses inherited members, adds new ones, and overrides one method">
      <defs>
        <marker id="jlvIsaHead" markerWidth="16" markerHeight="14" refX="7" refY="10" orient="auto">
          <path d="M7 0 L14 12 L0 12 Z" fill="#fff" stroke="#5a7fc0" strokeWidth="1.4" />
        </marker>
      </defs>
      <rect className="jlv-grid" x="0" y="0" width="740" height="540" />

      {/* connectors: child --is-a--> parent (hollow triangle at the parent) */}
      {children.map((c) => (
        <g key={`edge-${c.name}`} className="jlv-reveal r3">
          <path className="jlv-isa" d={`M${c.cx} ${childY} L${c.cx} 250 L${c.px} 250 L${c.px} 188`} markerEnd="url(#jlvIsaHead)" />
          <text className="jlv-isa-label" x={c.cx} y={286} textAnchor="middle">extends</text>
          {/* behaviour flows DOWN from the parent into the child */}
          <circle className="jlv-inherit-packet" cx={c.cx} cy="254" r="5" style={{ '--cy0': '196px', '--cy1': `${childY}px`, '--cx': `${c.cx}px` }} />
        </g>
      ))}

      {/* superclass blueprint */}
      <ShadowEllipse cx="370" cy="196" rx="120" ry="9" />
      <g className="jlv-reveal r1">
        <Slab x="260" y="62" w="220" h="124" depth="13" tone="blueprint">
          <text className="jlv-slab-title" x="282" y="92">class Animal</text>
          <line className="jlv-rule" x1="278" y1="106" x2="462" y2="106" />
          <text className="jlv-field blueprint" x="282" y="132">String name;</text>
          <text className="jlv-field blueprint" x="282" y="158">void eat()</text>
          <text className="jlv-field blueprint" x="282" y="184">void sound()</text>
        </Slab>
        <text className="jlv-cap blueprint" x="370" y="208" textAnchor="middle">superclass · one shared blueprint</text>
      </g>

      {/* child blueprints */}
      {children.map((c, i) => (
        <g key={c.name} className="jlv-reveal" style={{ animationDelay: `${1.0 + i * 0.25}s` }}>
          <ShadowEllipse cx={c.cx} cy={childY + childH + 8} rx="132" ry="8" />
          <Slab x={c.x} y={childY} w={childW} h={childH} depth="12" tone="frame">
            <text className="jlv-slab-title dark" x={c.x + 20} y={childY + 34}>class {c.name}</text>
            <text className="jlv-cap" x={c.x + 20} y={childY + 54}>extends Animal</text>
            <MemberRow x={c.x + 18} y={childY + 68} w={childW - 36} tone="inherited" tag="inherited">name · eat()</MemberRow>
            <MemberRow x={c.x + 18} y={childY + 112} w={childW - 36} tone="override" tag="overrides">{c.over}</MemberRow>
            <MemberRow x={c.x + 18} y={childY + 156} w={childW - 36} tone="added" tag="new">{c.add}</MemberRow>
          </Slab>
        </g>
      ))}
    </svg>
  )
}

/* ============================================================================
   PRIORITY 5 — POLYMORPHISM   (signature: runtime dynamic dispatch)
   One Animal reference, one a.sound() call, three runtime objects (Dog/Cat/Cow);
   the JVM picks the actual object's override → different behaviour. A spotlight
   cycles the three so students SEE "same call, different result".
   ========================================================================== */
const POLY = [
  { name: 'Dog', out: '"Woof!"', tone: 'blue' },
  { name: 'Cat', out: '"Meow!"', tone: 'purple' },
  { name: 'Cow', out: '"Moo!"', tone: 'teal' },
]
export function PolymorphicDispatch() {
  const cardX = 442, cardW = 288, cardH = 104
  const ys = [104, 224, 344]
  const nodeRight = 400, nodeMidY = 278
  return (
    <svg className="jlv-svg jlv-poly" viewBox="0 0 760 540" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="One Animal reference calls sound(); the JVM dispatches to the actual runtime object — Dog, Cat or Cow — each running its own overridden behaviour">
      <rect className="jlv-grid" x="0" y="0" width="760" height="540" />
      <text className="jlv-poly-src" x="34" y="60">Animal a;  a.sound();</text>
      <text className="jlv-poly-src dim" x="250" y="60">// same source line — any Animal</text>

      {/* the single reference (left) */}
      <ShadowEllipse cx="120" cy="352" rx="86" ry="9" />
      <g className="jlv-reveal r1">
        <Slab x="40" y="248" w="160" h="92" depth="12" tone="ref">
          <text className="jlv-poly-ref" x="120" y="298" textAnchor="middle">a</text>
          <text className="jlv-cap light" x="120" y="322" textAnchor="middle">Animal reference</text>
        </Slab>
        <text className="jlv-cap" x="120" y="372" textAnchor="middle">one variable · static type</text>
      </g>

      {/* call travels to the dispatcher */}
      <g className="jlv-reveal r2">
        <path className="jlv-beam" d="M200 294 L250 294" />
        <text className="jlv-beam-label" x="225" y="284" textAnchor="middle">.sound()</text>
      </g>

      {/* dynamic-dispatch engine (centre) */}
      <ShadowEllipse cx="325" cy="462" rx="86" ry="8" />
      <g className="jlv-reveal r3">
        <Slab x="250" y="104" w="150" h="344" depth="14" tone="core" className="jlv-jvm-core">
          <text className="jlv-stage-k big" x="325" y="258" textAnchor="middle">DYNAMIC</text>
          <text className="jlv-stage-k big" x="325" y="286" textAnchor="middle">DISPATCH</text>
          <text className="jlv-cap" x="325" y="312" textAnchor="middle">JVM inspects the</text>
          <text className="jlv-cap" x="325" y="330" textAnchor="middle">actual object</text>
        </Slab>
      </g>

      {/* candidate runtime objects (right) */}
      {POLY.map((p, i) => {
        const y = ys[i], cy = y + cardH / 2
        return (
          <g key={p.name} className="jlv-reveal" style={{ animationDelay: `${0.9 + i * 0.18}s` }}>
            <path className="jlv-dispatch-beam" d={`M${nodeRight} ${nodeMidY} C420 ${nodeMidY} 420 ${cy} ${cardX} ${cy}`} />
            <Slab x={cardX} y={y} w={cardW} h={cardH} depth="10" tone="frame">
              <text className="jlv-poly-obj" x={cardX + 20} y={y + 36}>new {p.name}()</text>
              <text className="jlv-cap" x={cardX + 20} y={y + 60}>overrides sound()</text>
              <g className="jlv-poly-outbase">
                <rect x={cardX + cardW - 108} y={y + 30} width="92" height="44" rx="13" />
                <text x={cardX + cardW - 62} y={y + 58} textAnchor="middle">{p.out}</text>
              </g>
            </Slab>
            {/* spotlight overlay: brightens while the JVM dispatches to THIS object */}
            <g className="jlv-poly-hi" style={{ '--d': `${i * 1.7}s` }}>
              <rect className="jlv-poly-ring" x={cardX - 5} y={y - 5} width={cardW + 10} height={cardH + 10} rx="18" />
              <path className="jlv-dispatch-beam hi" d={`M${nodeRight} ${nodeMidY} C420 ${nodeMidY} 420 ${cy} ${cardX} ${cy}`} />
              <g className={`jlv-poly-out jlv-poly-out-${p.tone}`}>
                <rect x={cardX + cardW - 108} y={y + 30} width="92" height="44" rx="13" />
                <text x={cardX + cardW - 62} y={y + 58} textAnchor="middle">{p.out}</text>
              </g>
              <text className="jlv-poly-aref" x="120" y="352" textAnchor="middle">a = new {p.name}()</text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}

/* ============================================================================
   PRIORITY 6 — ENCAPSULATION
   Private state inside a protective shell; direct external access is BLOCKED;
   public methods are the only doors, and they guard the invariant.
   ========================================================================== */
export function EncapsulationShell() {
  return (
    <svg className="jlv-svg jlv-encap" viewBox="0 0 700 520" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="Private fields live inside a protected object shell; direct external access is blocked while public methods provide controlled, validated access that protects the object's invariant">
      <defs>
        <marker id="jlvOkHead" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6.5 3 L0 6 Z" fill="#0f857a" /></marker>
      </defs>
      <rect className="jlv-grid" x="0" y="0" width="700" height="520" />

      {/* protective object shell */}
      <g className="jlv-reveal r1">
        <rect className="jlv-shell" x="292" y="82" width="386" height="378" rx="30" />
        <rect className="jlv-shell-inner" x="304" y="94" width="362" height="354" rx="24" />
        <text className="jlv-encap-title" x="485" y="126" textAnchor="middle">BankAccount object</text>
      </g>

      {/* private-state vault */}
      <g className="jlv-reveal r4">
        <rect className="jlv-vault" x="452" y="166" width="196" height="216" rx="16" />
        <rect className="jlv-lock" x="536" y="150" width="28" height="24" rx="5" />
        <path className="jlv-lock-shackle" d="M543 150 v-6 a7 7 0 0 1 14 0 v6" />
        <text className="jlv-vault-label" x="550" y="200" textAnchor="middle">PRIVATE STATE</text>
        <text className="jlv-field val" x="472" y="242">balance = 5000</text>
        <text className="jlv-field val" x="472" y="276">pin = 1234</text>
        <line className="jlv-rule dash" x1="470" y1="300" x2="630" y2="300" />
        <text className="jlv-vault-note" x="550" y="336" textAnchor="middle">invariant protected</text>
        <text className="jlv-vault-note strong" x="550" y="360" textAnchor="middle">balance ≥ 0 always</text>
      </g>

      {/* public method gate — the only door through the wall */}
      <g className="jlv-reveal r3">
        <rect className="jlv-gate" x="286" y="318" width="152" height="60" rx="13" />
        <text className="jlv-gate-label" x="362" y="342" textAnchor="middle">deposit(amt)</text>
        <text className="jlv-gate-label" x="362" y="364" textAnchor="middle">getBalance()</text>
        <text className="jlv-gate-cap" x="362" y="400" textAnchor="middle">public methods · the only doors</text>
      </g>

      {/* external caller */}
      <g className="jlv-reveal r2">
        <ShadowEllipse cx="108" cy="322" rx="76" />
        <Slab x="32" y="234" w="150" h="94" depth="12" tone="ref">
          <text className="jlv-encap-caller" x="107" y="280" textAnchor="middle">caller</text>
          <text className="jlv-cap light" x="107" y="306" textAnchor="middle">outside the object</text>
        </Slab>
      </g>

      {/* BLOCKED: direct field access hits the wall */}
      <g className="jlv-reveal r5">
        <path className="jlv-block-line" d="M186 196 L284 196" />
        <g className="jlv-block-x" transform="translate(292,196)">
          <circle r="15" />
          <path d="M-6 -6 L6 6 M6 -6 L-6 6" />
        </g>
        <text className="jlv-block-label" x="186" y="176">account.balance</text>
        <text className="jlv-block-label sub" x="318" y="180">private access ✗</text>
      </g>

      {/* ALLOWED: through a public method, validated */}
      <g className="jlv-reveal r6">
        <path className="jlv-ok-line" d="M198 348 L282 348" markerEnd="url(#jlvOkHead)" />
        <circle className="jlv-flow-packet" cx="198" cy="348" r="5" />
        <text className="jlv-ok-label" x="240" y="334" textAnchor="middle">deposit(500) ✓</text>
        <path className="jlv-ok-line" d="M438 348 C452 348 452 300 452 268" markerEnd="url(#jlvOkHead)" />
        <text className="jlv-ok-label small" x="470" y="316">checks rules</text>
      </g>
    </svg>
  )
}

/* ============================================================================
   PRIORITY 7 — EXCEPTIONS
   normal call chain -> throw -> STACK UNWIND (hero) -> matching catch ->
   finally -> recovery. An exception token propagates up the stack looking for
   a handler; frames without one are unwound.
   ========================================================================== */
export function ExceptionFlow() {
  // call stack: deepest (divide, throws) on top, main (has the handler) at bottom
  const frames = [
    { name: 'divide()', note: 'throws ArithmeticException', tone: 'throw', y: 132 },
    { name: 'compute()', note: 'no catch — unwind', tone: 'unwind', y: 224 },
    { name: 'main()', note: 'catch(ArithmeticException e)', tone: 'catch', y: 316 },
  ]
  const fx = 56, fw = 288, fh = 76
  return (
    <svg className="jlv-svg jlv-exc" viewBox="0 0 720 540" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="An exception thrown deep in the call stack unwinds frame by frame until a matching catch is found, then finally runs and the program recovers">
      <rect className="jlv-grid" x="0" y="0" width="720" height="540" />
      <text className="jlv-plane-label dark" x="56" y="96">CALL STACK</text>
      <path className="jlv-unwind-arrow" d="M34 150 L34 330" markerEnd="url(#jlvUnwindHead)" />
      <text className="jlv-grow-label" x="24" y="240" transform="rotate(-90 24 240)" textAnchor="middle">exception unwinds toward the caller</text>
      <defs>
        <marker id="jlvUnwindHead" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6.5 3 L0 6 Z" fill="#c23b30" /></marker>
      </defs>

      {frames.map((f, i) => (
        <g key={f.name} className={`jlv-reveal jlv-exc-frame jlv-exc-${f.tone}`} style={{ animationDelay: `${0.15 + i * 0.18}s` }}>
          <ShadowEllipse cx={fx + fw / 2} cy={f.y + fh + 6} rx="132" ry="7" />
          <Slab x={fx} y={f.y} w={fw} h={fh} depth="10" tone={f.tone === 'catch' ? 'active' : 'frame'}>
            <text className="jlv-frame-name" x={fx + 20} y={f.y + 30}>{f.name}</text>
            <text className="jlv-exc-note" x={fx + 20} y={f.y + 54}>{f.note}</text>
            <text className={`jlv-exc-mark jlv-exc-mark-${f.tone}`} x={fx + fw - 18} y={f.y + fh / 2 + 6} textAnchor="end">
              {f.tone === 'throw' ? '⚡' : f.tone === 'catch' ? '✓' : '✗'}
            </text>
          </Slab>
        </g>
      ))}

      {/* the exception token propagates down the stack toward the caller */}
      <g className="jlv-exc-token">
        <circle r="19" />
        <text x="0" y="5" textAnchor="middle">exc</text>
      </g>

      {/* handler + finally + recovery (right) */}
      <g className="jlv-reveal" style={{ animationDelay: '1.9s' }}>
        <rect className="jlv-exc-block catch" x="404" y="316" width="262" height="76" rx="14" />
        <text className="jlv-exc-block-t" x="424" y="346">catch (ArithmeticException e)</text>
        <text className="jlv-exc-block-s" x="424" y="370">handle the error, no crash</text>
      </g>
      <g className="jlv-reveal" style={{ animationDelay: '2.2s' }}>
        <rect className="jlv-exc-block finally" x="404" y="404" width="262" height="56" rx="14" />
        <text className="jlv-exc-block-t amber" x="424" y="430">finally { '{ cleanup() }' }</text>
        <text className="jlv-exc-block-s" x="424" y="450">always runs — release resources</text>
      </g>
      <g className="jlv-reveal" style={{ animationDelay: '2.5s' }}>
        <text className="jlv-exc-recover" x="404" y="486">→ program recovers and continues</text>
      </g>
    </svg>
  )
}

/* ============================================================================
   PRIORITY 8 — MULTITHREADING (thread lifecycle + scheduler)
   NEW -> RUNNABLE -> RUNNING -> (WAITING/BLOCKED) -> TERMINATED, with a
   scheduler that time-slices the single RUNNING slot between threads.
   ========================================================================== */
const THREAD_STATES = ['NEW', 'RUNNABLE', 'RUNNING', 'WAITING', 'TERMINATED']
const THREADS = [
  { id: 'T1', tone: 'blue' },
  { id: 'T2', tone: 'purple' },
  { id: 'T3', tone: 'teal' },
]
export function ThreadLifecycle() {
  const cols = THREAD_STATES.length
  const boxW = 118, gap = 20, x0 = 40, boxY = 150, boxH = 210
  const colX = (i) => x0 + i * (boxW + gap)
  return (
    <svg className="jlv-svg jlv-threads" viewBox="0 0 730 520" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="Threads move through NEW, RUNNABLE, RUNNING, WAITING and TERMINATED states; a scheduler time-slices the single RUNNING slot between the runnable threads">
      <rect className="jlv-grid" x="0" y="0" width="730" height="520" />
      <text className="jlv-plane-label dark" x="40" y="96">THREAD LIFECYCLE</text>

      {/* state stations */}
      {THREAD_STATES.map((s, i) => (
        <g key={s} className="jlv-reveal jlv-state" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
          <rect className={`jlv-state-box ${s === 'RUNNING' ? 'is-running' : ''}`} x={colX(i)} y={boxY} width={boxW} height={boxH} rx="16" />
          <text className="jlv-state-label" x={colX(i) + boxW / 2} y={boxY + 28} textAnchor="middle">{s}</text>
          {i < cols - 1 && <path className="jlv-trans-arrow" d={`M${colX(i) + boxW + 2} ${boxY + boxH / 2} l${gap - 4} 0`} markerEnd="url(#jlvTransHead)" />}
        </g>
      ))}
      <defs>
        <marker id="jlvTransHead" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6.5 3 L0 6 Z" fill="rgba(22,35,60,.5)" /></marker>
      </defs>

      {/* scheduler under the RUNNABLE<->RUNNING boundary */}
      <g className="jlv-reveal" style={{ animationDelay: '0.7s' }}>
        <rect className="jlv-sched" x={colX(1) + 30} y={boxY + boxH + 26} width={boxW + gap + 58} height="52" rx="13" />
        <text className="jlv-sched-t" x={colX(1) + boxW + gap / 2 + 30} y={boxY + boxH + 58} textAnchor="middle">SCHEDULER · time-slices the CPU</text>
        <path className="jlv-sched-arrow" d={`M${colX(2) + 30} ${boxY + boxH + 24} q0 -14 -18 -18`} markerEnd="url(#jlvTransHead)" />
      </g>

      {/* transition captions */}
      <text className="jlv-trans-cap" x={colX(0) + boxW + gap / 2} y={boxY - 8} textAnchor="middle">start()</text>
      <text className="jlv-trans-cap" x={colX(3) + boxW + gap / 2} y={boxY - 8} textAnchor="middle">run() ends</text>
      <text className="jlv-trans-cap" x={colX(2) + boxW + gap / 2} y={boxY - 8} textAnchor="middle">wait()/IO</text>

      {/* three thread tokens: 2 wait in RUNNABLE, the scheduler cycles who RUNS */}
      {THREADS.map((t, i) => (
        <g key={t.id} className={`jlv-thread-token jlv-tt-${t.tone}`} style={{ '--d': `${i * 1.6}s` }}>
          <g className="jlv-tt-run">
            <circle cx={colX(2) + boxW / 2} cy={boxY + 96} r="20" />
            <text x={colX(2) + boxW / 2} y={boxY + 101} textAnchor="middle">{t.id}</text>
          </g>
          <g className="jlv-tt-wait">
            <circle cx={colX(1) + boxW / 2} cy={boxY + 70 + i * 46} r="18" />
            <text x={colX(1) + boxW / 2} y={boxY + 75 + i * 46} textAnchor="middle">{t.id}</text>
          </g>
        </g>
      ))}
    </svg>
  )
}

/* ============================================================================
   PRIORITY 8b — RACE CONDITION & SYNCHRONIZATION
   Two threads increment a shared counter. Unsynchronized = interleaved read/
   write = lost update (wrong). A synchronized lock serializes them = correct.
   ========================================================================== */
export function RaceSyncScene() {
  return (
    <svg className="jlv-svg jlv-race" viewBox="0 0 720 540" preserveAspectRatio="xMidYMid meet" role="img"
         aria-label="Two threads increment a shared counter; without synchronization their reads and writes interleave and an update is lost, but a synchronized lock serializes access and produces the correct result">
      <rect className="jlv-grid" x="0" y="0" width="720" height="540" />

      {/* LEFT: race (no lock) */}
      <g className="jlv-reveal r1">
        <text className="jlv-race-h bad" x="30" y="70">WITHOUT SYNCHRONIZATION</text>
        <rect className="jlv-race-panel bad" x="24" y="88" width="316" height="410" rx="18" />
        <rect className="jlv-shared" x="96" y="112" width="172" height="52" rx="12" />
        <text className="jlv-shared-t" x="182" y="144" textAnchor="middle">counter = 0 (shared)</text>

        <g className="jlv-race-lane"><text className="jlv-tlabel blue" x="60" y="212">T1</text>
          <text className="jlv-race-op" x="92" y="212">reads 0</text>
          <text className="jlv-race-op" x="92" y="250">writes 1</text></g>
        <g className="jlv-race-lane"><text className="jlv-tlabel purple" x="60" y="300">T2</text>
          <text className="jlv-race-op" x="92" y="300">reads 0</text>
          <text className="jlv-race-op" x="92" y="338">writes 1</text></g>

        <text className="jlv-race-interleave" x="182" y="392" textAnchor="middle">both read 0 → one update lost</text>
        <rect className="jlv-result bad" x="96" y="418" width="172" height="56" rx="14" />
        <text className="jlv-result-t bad" x="182" y="452" textAnchor="middle">counter = 1 ✗</text>
      </g>

      {/* RIGHT: synchronized */}
      <g className="jlv-reveal" style={{ animationDelay: '0.5s' }}>
        <text className="jlv-race-h good" x="388" y="70">WITH synchronized</text>
        <rect className="jlv-race-panel good" x="380" y="88" width="316" height="410" rx="18" />
        <rect className="jlv-shared" x="452" y="112" width="172" height="52" rx="12" />
        <text className="jlv-shared-t" x="538" y="144" textAnchor="middle">counter = 0 (shared)</text>

        <rect className="jlv-lock-gate" x="452" y="188" width="172" height="150" rx="14" />
        <rect className="jlv-lock" x="524" y="176" width="28" height="24" rx="5" />
        <path className="jlv-lock-shackle" d="M531 176 v-6 a7 7 0 0 1 14 0 v6" />
        <text className="jlv-lock-label" x="538" y="224" textAnchor="middle">synchronized</text>
        <text className="jlv-race-op good" x="538" y="258" textAnchor="middle">T1 locks · 0 → 1 · unlocks</text>
        <text className="jlv-race-op good" x="538" y="292" textAnchor="middle">T2 locks · 1 → 2 · unlocks</text>
        <text className="jlv-race-op good sub" x="538" y="322" textAnchor="middle">one at a time</text>

        <rect className="jlv-result good" x="452" y="418" width="172" height="56" rx="14" />
        <text className="jlv-result-t good" x="538" y="452" textAnchor="middle">counter = 2 ✓</text>
      </g>
    </svg>
  )
}
