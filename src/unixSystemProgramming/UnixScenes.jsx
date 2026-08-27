/**
 * UnixScenes — BCS515C Unix System Programming classroom SVG visuals.
 * Instructional motion (unixv-*) shows shell/kernel/process mechanisms.
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
const TERM = '#0b1220'
export const PALETTE = { N, BLUE, RED, AMBER, PURP, GREEN, TEAL, CREAM, SKY, MUTED, TERM }
export const UNIX = PALETTE

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`unix-scene ${className}`} aria-label={caption || 'Unix System Programming diagram'}>
      <svg viewBox={vb} role="img" className="unix-svg">
        <defs>
          <marker id="unixArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="unixArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="unixArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="unixArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="unixArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="unixArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="unixArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="502" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 18, fill = N, anchor = 'middle', weight = 800, family = 'system-ui,sans-serif' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily={family}>
      {children}
    </text>
  )
}

function Box({ x, y, w, h, label, sub, stroke = BLUE, fill = '#fff', className = '', labelSize = 16 }) {
  return (
    <g transform={`translate(${x},${y})`} className={className}>
      <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <L x={w / 2} y={h / 2 + (sub ? -2 : 6)} size={sub ? 14 : labelSize}>
        {label}
      </L>
      {sub ? (
        <L x={w / 2} y={h / 2 + 18} size={12} fill={MUTED} weight={700}>
          {sub}
        </L>
      ) : null}
    </g>
  )
}

function Mono({ x, y, children, size = 16, fill = '#e2e8f0', anchor = 'start', weight = 650 }) {
  return (
    <L x={x} y={y} size={size} fill={fill} anchor={anchor} weight={weight} family="ui-monospace,Menlo,Consolas,monospace">
      {children}
    </L>
  )
}

/** Reusable terminal chrome — SVG group or full Scene via `standalone`. */
export function UnixTerminal({
  x = 60,
  y = 50,
  w = 780,
  h = 360,
  title = 'unix@vviet:~',
  lines = [],
  prompt = '$',
  cursor = true,
  className = '',
  standalone = false,
  caption,
}) {
  const body = (
    <g transform={`translate(${x},${y})`} className={`unix-terminal ${className}`}>
      <rect width={w} height={h} rx="14" fill={TERM} stroke={N} strokeWidth="2" />
      <rect width={w} height="36" rx="14" fill="#1e293b" />
      <rect y="18" width={w} height="18" fill="#1e293b" />
      <circle cx="22" cy="18" r="6" fill="#ef4444" />
      <circle cx="42" cy="18" r="6" fill="#f59e0b" />
      <circle cx="62" cy="18" r="6" fill="#22c55e" />
      <L x={w / 2} y="24" size={13} fill="#94a3b8" weight={700}>
        {title}
      </L>
      {lines.map((line, i) => {
        const text = typeof line === 'string' ? line : line.text
        const color = typeof line === 'string' ? '#e2e8f0' : line.color || '#e2e8f0'
        const cls = typeof line === 'string' ? '' : line.className || ''
        const isPrompt = typeof line === 'object' && line.prompt
        return (
          <g key={i} className={cls}>
            {isPrompt ? (
              <>
                <Mono x={18} y={58 + i * 28} fill={GREEN}>
                  {prompt}
                </Mono>
                <Mono x={36} y={58 + i * 28} fill={color}>
                  {text}
                </Mono>
              </>
            ) : (
              <Mono x={18} y={58 + i * 28} fill={color}>
                {text}
              </Mono>
            )}
          </g>
        )
      })}
      {cursor ? (
        <rect
          className="unixv-term-cursor"
          x={36 + (lines.length ? 0 : 0)}
          y={42 + lines.length * 28}
          width="10"
          height="18"
          fill={GREEN}
          opacity="0.9"
        />
      ) : null}
    </g>
  )

  if (standalone) {
    return <Scene caption={caption || title}>{body}</Scene>
  }
  return body
}

export function ModuleHero({ module = 1, title, question, hours }) {
  return (
    <Scene caption={question || 'USP visual journey'}>
      <rect x="40" y="40" width="820" height="400" rx="16" fill="#fff" stroke={GREEN} strokeWidth="3" />
      <L x="450" y="110" size={18} fill={GREEN}>{`MODULE ${module} · BCS515C`}</L>
      <L x="450" y="170" size={26}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="220" size={15} fill={MUTED} weight={700}>
        {question || 'Watch the concept execute'}
      </L>
      {['Problem', 'Model', 'Mechanism', 'Example', 'Exam'].map((t, i) => (
        <Box key={t} x={70 + i * 150} y={280} w={130} h={70} label={t} stroke={GREEN} className={`unixv-pulse unixv-delay-${i}`} />
      ))}
      {hours ? (
        <L x="450" y="420" size={14} fill={MUTED}>
          {`${hours} teaching hours`}
        </L>
      ) : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the map — then attempt the PYQs">
      <L x="450" y="80" size={24}>{`Module ${module} closed`}</L>
      <L x="450" y="120" size={16} fill={MUTED}>
        {title}
      </L>
      <Box x="120" y="200" w="200" h="120" label="Definitions" sub="precise terms" stroke={BLUE} />
      <Box x="350" y="200" w="200" h="120" label="Diagrams" sub="labelled flows" stroke={TEAL} />
      <Box x="580" y="200" w="200" h="120" label="Practice" sub="10-mark answers" stroke={AMBER} />
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const pts = points.length ? points : ['Context', 'Mechanism', 'Example', 'Exam point']
  return (
    <Scene caption={title}>
      <Box x="250" y="40" w="400" h="80" label={title} stroke={PURP} className="unixv-pulse" />
      {pts.slice(0, 8).map((p, i) => (
        <Box
          key={`${p}-${i}`}
          x={60 + (i % 4) * 210}
          y={180 + Math.floor(i / 4) * 120}
          w="190"
          h="90"
          label={p}
          className={`unixv-fade-in unixv-delay-${i % 5}`}
        />
      ))}
    </Scene>
  )
}

/* ── Architecture: User → Shell → Kernel → Hardware ── */
export function ArchitectureScene() {
  const layers = [
    { label: 'User', sub: 'programs & scripts', color: BLUE },
    { label: 'Shell', sub: 'command interpreter', color: TEAL },
    { label: 'Kernel', sub: 'syscalls & resources', color: AMBER },
    { label: 'Hardware', sub: 'CPU · memory · I/O', color: PURP },
  ]
  return (
    <Scene caption="Unix architecture — request flows downward">
      {layers.map((layer, i) => (
        <g key={layer.label}>
          <Box
            x={200}
            y={40 + i * 105}
            w={500}
            h={78}
            label={layer.label}
            sub={layer.sub}
            stroke={layer.color}
            className={`unixv-arch-layer unixv-delay-${i}`}
          />
          {i < layers.length - 1 ? (
            <line
              x1="450"
              y1={118 + i * 105}
              x2="450"
              y2={145 + i * 105}
              stroke={layer.color}
              strokeWidth="3"
              markerEnd="url(#unixArrB)"
              className="unixv-arch-flow"
            />
          ) : null}
        </g>
      ))}
    </Scene>
  )
}

/* ── Terminal $ ls -l with annotated fields ── */
export function LsLongScene() {
  const fields = [
    { x: 70, label: 'type+mode', sample: '-rwxr-xr--', color: AMBER },
    { x: 220, label: 'links', sample: '1', color: TEAL },
    { x: 290, label: 'owner', sample: 'alice', color: BLUE },
    { x: 390, label: 'group', sample: 'staff', color: PURP },
    { x: 500, label: 'size', sample: '4096', color: GREEN },
    { x: 590, label: 'mtime', sample: 'Aug 24 10:02', color: MUTED },
    { x: 760, label: 'name', sample: 'notes.txt', color: N },
  ]
  return (
    <Scene caption="$ ls -l — each column is a file attribute">
      <UnixTerminal
        x={50}
        y={36}
        w={800}
        h={200}
        title="alice@unix:~"
        cursor={false}
        lines={[
          { text: 'ls -l', prompt: true, className: 'unixv-term-type' },
          { text: 'total 8', color: '#94a3b8' },
          { text: '-rwxr-xr--  1 alice staff 4096 Aug 24 10:02 notes.txt', color: '#f8fafc', className: 'unixv-annotate' },
        ]}
      />
      {fields.map((f, i) => (
        <g key={f.label} className={`unixv-annotate unixv-delay-${i % 5}`}>
          <rect x={f.x} y={270} width={Math.max(70, f.sample.length * 9 + 20)} height={70} rx="8" fill="#fff" stroke={f.color} strokeWidth="2" />
          <L x={f.x + 12} y={298} size={12} fill={f.color} anchor="start" weight={800}>
            {f.label}
          </L>
          <L x={f.x + 12} y={322} size={13} fill={N} anchor="start" weight={700} family="ui-monospace,Menlo,Consolas,monospace">
            {f.sample}
          </L>
        </g>
      ))}
      <line x1="120" y1="236" x2="120" y2="270" stroke={AMBER} strokeWidth="2" className="unixv-annotate" />
    </Scene>
  )
}

/* ── Filesystem tree + cd ── */
export function FilesystemCdScene() {
  const nodes = [
    { x: 420, y: 60, label: '/', id: 'root' },
    { x: 220, y: 160, label: 'home', id: 'home' },
    { x: 420, y: 160, label: 'etc', id: 'etc' },
    { x: 620, y: 160, label: 'usr', id: 'usr' },
    { x: 140, y: 280, label: 'alice', id: 'alice' },
    { x: 300, y: 280, label: 'bob', id: 'bob' },
  ]
  return (
    <Scene caption="Filesystem tree — cwd moves with cd">
      <line x1="420" y1="100" x2="220" y2="160" stroke={N} strokeWidth="2.5" />
      <line x1="420" y1="100" x2="420" y2="160" stroke={N} strokeWidth="2.5" />
      <line x1="420" y1="100" x2="620" y2="160" stroke={N} strokeWidth="2.5" />
      <line x1="220" y1="200" x2="140" y2="280" stroke={N} strokeWidth="2.5" />
      <line x1="220" y1="200" x2="300" y2="280" stroke={N} strokeWidth="2.5" />
      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x - 48},${n.y})`}>
          <rect width="96" height="44" rx="10" fill="#fff" stroke={BLUE} strokeWidth="2.5" />
          <L x="48" y="28" size={16}>
            {n.label}
          </L>
        </g>
      ))}
      <g className="unixv-cd-move">
        <rect x="92" y="276" width="96" height="52" rx="12" fill={SKY} stroke={AMBER} strokeWidth="3" />
        <L x="140" y="308" size={14} fill={AMBER}>
          cwd
        </L>
      </g>
      <UnixTerminal
        x={480}
        y={250}
        w={360}
        h={180}
        title="cd path"
        cursor
        lines={[
          { text: 'pwd', prompt: true },
          { text: '/home/alice', color: '#94a3b8' },
          { text: 'cd /home/bob', prompt: true, className: 'unixv-term-type' },
          { text: 'pwd', prompt: true },
          { text: '/home/bob', color: GREEN },
        ]}
      />
    </Scene>
  )
}

/* ── PATH lookup ── */
export function PathLookupScene() {
  const dirs = ['/bin', '/usr/bin', '/usr/local/bin', './']
  return (
    <Scene caption="PATH lookup — shell searches left → right">
      <L x="450" y="55" size={18} fill={BLUE}>
        echo $PATH
      </L>
      {dirs.map((d, i) => (
        <g key={d}>
          <Box
            x={40 + i * 220}
            y={100}
            w={190}
            h={90}
            label={d}
            sub={i === 1 ? 'found!' : 'search…'}
            stroke={i === 1 ? GREEN : BLUE}
            fill={i === 1 ? '#ecfdf5' : '#fff'}
            className={`unixv-path-scan unixv-delay-${i}`}
          />
          {i < dirs.length - 1 ? (
            <line
              x1={230 + i * 220}
              y1="145"
              x2={260 + i * 220}
              y2="145"
              stroke={TEAL}
              strokeWidth="3"
              markerEnd="url(#unixArrT)"
              className="unixv-arch-flow"
            />
          ) : null}
        </g>
      ))}
      <g className="unixv-path-probe">
        <circle cx="355" cy="145" r="10" fill={AMBER} />
        <L x="355" y="190" size={13} fill={AMBER}>
          probe
        </L>
      </g>
      <UnixTerminal
        x={120}
        y={250}
        w={660}
        h={180}
        title="which ls"
        cursor={false}
        lines={[
          { text: 'type ls', prompt: true, className: 'unixv-term-type' },
          { text: 'ls is /bin/ls', color: GREEN },
          { text: 'command -v gcc', prompt: true },
          { text: '/usr/bin/gcc', color: '#94a3b8' },
        ]}
      />
    </Scene>
  )
}

/* ── Permissions rwx Owner/Group/Others ── */
export function PermissionsScene() {
  const triad = [
    { who: 'Owner', bits: 'rwx', oct: '7', color: BLUE },
    { who: 'Group', bits: 'r-x', oct: '5', color: TEAL },
    { who: 'Others', bits: 'r--', oct: '4', color: AMBER },
  ]
  return (
    <Scene caption="Permissions — rwx for Owner · Group · Others">
      <L x="450" y="50" size={22} family="ui-monospace,Menlo,Consolas,monospace">
        rwxr-xr--
      </L>
      <L x="450" y="80" size={14} fill={MUTED}>
        mode 754 · three classes × three bits
      </L>
      {triad.map((t, i) => (
        <g key={t.who} transform={`translate(${80 + i * 280},120)`}>
          <rect width="240" height="200" rx="14" fill="#fff" stroke={t.color} strokeWidth="3" className={`unixv-perm-box unixv-delay-${i}`} />
          <L x="120" y="40" size={18} fill={t.color}>
            {t.who}
          </L>
          <L x="120" y="95" size={36} family="ui-monospace,Menlo,Consolas,monospace" fill={N}>
            {t.bits}
          </L>
          <L x="120" y="145" size={14} fill={MUTED}>
            octal {t.oct}
          </L>
          <g className="unixv-perm-bit">
            {t.bits.split('').map((b, bi) => (
              <rect
                key={bi}
                x={40 + bi * 55}
                y={160}
                width="44"
                height="28"
                rx="6"
                fill={b === '-' ? '#f1f5f9' : t.color}
                opacity={b === '-' ? 0.5 : 0.85}
              />
            ))}
          </g>
        </g>
      ))}
      <L x="450" y="360" size={15} fill={MUTED}>
        r = read · w = write · x = execute
      </L>
    </Scene>
  )
}

/* ── Pipe data flow command1 | command2 ── */
export function PipeFlowScene() {
  return (
    <Scene caption="Pipe — stdout of left becomes stdin of right">
      <Box x="60" y="160" w="220" h="120" label="command1" sub="stdout writer" stroke={BLUE} className="unixv-pulse" />
      <g className="unixv-pipe-flow">
        <rect x="310" y="195" width="280" height="50" rx="25" fill={SKY} stroke={TEAL} strokeWidth="3" />
        <L x="450" y="226" size={16} fill={TEAL}>
          pipe buffer
        </L>
        <circle cx="340" cy="220" r="8" fill={AMBER} className="unixv-pipe-packet" />
      </g>
      <Box x="620" y="160" w="220" h="120" label="command2" sub="stdin reader" stroke={PURP} className="unixv-pulse unixv-delay-2" />
      <line x1="280" y1="220" x2="310" y2="220" stroke={BLUE} strokeWidth="3" markerEnd="url(#unixArrB)" className="unixv-arch-flow" />
      <line x1="590" y1="220" x2="620" y2="220" stroke={PURP} strokeWidth="3" markerEnd="url(#unixArrP)" className="unixv-arch-flow" />
      <UnixTerminal
        x={120}
        y={330}
        w={660}
        h={120}
        title="pipeline"
        cursor={false}
        lines={[{ text: 'ps aux | grep nginx', prompt: true, className: 'unixv-term-type', color: '#f8fafc' }]}
      />
      <L x="450" y="100" size={20} family="ui-monospace,Menlo,Consolas,monospace" fill={N}>
        cmd1 | cmd2
      </L>
    </Scene>
  )
}

/* ── Redirection ── */
export function RedirectionScene() {
  return (
    <Scene caption="Redirection — bind fds to files">
      <Box x="80" y="140" w="180" h="100" label="process" sub="fd 0 1 2" stroke={BLUE} className="unixv-pulse" />
      <g>
        <line x1="260" y1="170" x2="360" y2="120" stroke={GREEN} strokeWidth="3" markerEnd="url(#unixArrG)" className="unixv-redir-arrow" />
        <line x1="260" y1="190" x2="360" y2="190" stroke={AMBER} strokeWidth="3" markerEnd="url(#unixArrA)" className="unixv-redir-arrow" />
        <line x1="260" y1="210" x2="360" y2="260" stroke={RED} strokeWidth="3" markerEnd="url(#unixArrR)" className="unixv-redir-arrow" />
      </g>
      <Box x="370" y="70" w="200" h="70" label="< in.txt" sub="stdin 0" stroke={GREEN} />
      <Box x="370" y="155" w="200" h="70" label="> out.txt" sub="stdout 1" stroke={AMBER} />
      <Box x="370" y="240" w="200" h="70" label="2> err.txt" sub="stderr 2" stroke={RED} />
      <UnixTerminal
        x={600}
        y={100}
        w={260}
        h={220}
        title="redir"
        cursor={false}
        lines={[
          { text: 'cmd <in', prompt: true, color: '#86efac' },
          { text: 'cmd >out', prompt: true, color: '#fcd34d' },
          { text: 'cmd 2>err', prompt: true, color: '#fca5a5' },
          { text: 'cmd >>log', prompt: true, color: '#94a3b8' },
        ]}
      />
      <L x="450" y="360" size={15} fill={MUTED}>
        &gt; truncates · &gt;&gt; appends · 2&gt;&amp;1 merges stderr
      </L>
    </Scene>
  )
}

/* ── Process memory text/data/heap/stack ── */
export function ProcessMemoryScene() {
  const segs = [
    { label: 'high addr', sub: 'stack ↓', color: PURP, h: 70 },
    { label: 'heap ↑', sub: 'malloc', color: AMBER, h: 90 },
    { label: 'data / BSS', sub: 'globals', color: TEAL, h: 70 },
    { label: 'text', sub: 'code (RO)', color: BLUE, h: 90 },
  ]
  let y = 70
  return (
    <Scene caption="Process address space — text · data · heap · stack">
      {segs.map((s, i) => {
        const top = y
        y += s.h + 8
        return (
          <g key={s.label} className={`unixv-mem-region unixv-delay-${i}`}>
            <rect x="280" y={top} width="340" height={s.h} rx="10" fill="#fff" stroke={s.color} strokeWidth="3" />
            <L x="450" y={top + s.h / 2 - 4} size={18} fill={s.color}>
              {s.label}
            </L>
            <L x="450" y={top + s.h / 2 + 18} size={13} fill={MUTED}>
              {s.sub}
            </L>
          </g>
        )
      })}
      <L x="150" y="120" size={14} fill={PURP} anchor="end">
        grows down
      </L>
      <L x="150" y="280" size={14} fill={AMBER} anchor="end">
        grows up
      </L>
      <line x1="170" y1="140" x2="170" y2="200" stroke={PURP} strokeWidth="2" markerEnd="url(#unixArrP)" className="unixv-arch-flow" />
      <line x1="170" y1="300" x2="170" y2="240" stroke={AMBER} strokeWidth="2" markerEnd="url(#unixArrA)" className="unixv-arch-flow" />
      <L x="720" y="200" size={14} fill={MUTED} anchor="start">
        low → high
      </L>
    </Scene>
  )
}

/* ── fork() Parent / Child with PIDs ── */
export function ForkScene() {
  return (
    <Scene caption="fork() — parent continues; child is a copy">
      <Box x="340" y="40" w="220" h="80" label="Parent" sub="pid 1000" stroke={BLUE} className="unixv-pulse" />
      <line x1="450" y1="120" x2="280" y2="200" stroke={BLUE} strokeWidth="3" className="unixv-fork-split" markerEnd="url(#unixArrB)" />
      <line x1="450" y1="120" x2="620" y2="200" stroke={GREEN} strokeWidth="3" className="unixv-fork-split" markerEnd="url(#unixArrG)" />
      <L x="450" y="165" size={16} fill={AMBER}>
        fork()
      </L>
      <Box x="160" y="210" w="240" h="130" label="Parent" sub="pid 1000 · fork→1001" stroke={BLUE} className="unixv-fork-parent" />
      <Box x="500" y="210" w="240" h="130" label="Child" sub="pid 1001 · fork→0" stroke={GREEN} className="unixv-fork-child" />
      <L x="450" y="390" size={15} fill={MUTED}>
        Same memory image at split — then diverge
      </L>
    </Scene>
  )
}

/* ── exec() image replace ── */
export function ExecScene() {
  return (
    <Scene caption="exec() — replace process image in place">
      <Box x="80" y="140" w="260" h="160" label="old image" sub="shell / a.out" stroke={MUTED} fill="#f1f5f9" className="unixv-exec-old" />
      <g className="unixv-exec-swap">
        <polygon points="380,200 440,220 380,240" fill={AMBER} />
        <L x="450" y="270" size={16} fill={AMBER}>
          execve()
        </L>
      </g>
      <Box x="520" y="140" w="280" h="160" label="new image" sub="ls / vim / script" stroke={GREEN} fill="#ecfdf5" className="unixv-exec-new" />
      <L x="450" y="360" size={15} fill={MUTED}>
        Same PID — code, data, heap, stack replaced
      </L>
      <L x="450" y="80" size={18} fill={BLUE}>
        pid stays · image changes
      </L>
    </Scene>
  )
}

/* ── wait() ── */
export function WaitScene() {
  return (
    <Scene caption="wait() — parent blocks until child exits">
      <Box x="100" y="120" w="260" h="140" label="Parent" sub="wait(&status)" stroke={BLUE} className="unixv-wait-block" />
      <Box x="540" y="120" w="260" h="140" label="Child" sub="running → exit" stroke={GREEN} className="unixv-pulse" />
      <line x1="360" y1="190" x2="540" y2="190" stroke={TEAL} strokeWidth="3" strokeDasharray="8 6" className="unixv-wait-link" />
      <g className="unixv-wait-status">
        <rect x="360" y="280" width="180" height="50" rx="10" fill="#fff" stroke={AMBER} strokeWidth="2.5" />
        <L x="450" y="312" size={14} fill={AMBER}>
          status → parent
        </L>
      </g>
      <L x="450" y="80" size={16} fill={MUTED}>
        Zombie avoided when parent collects exit status
      </L>
    </Scene>
  )
}

/* ── Shared memory two processes ── */
export function SharedMemoryScene() {
  return (
    <Scene caption="Shared memory — both processes map one segment">
      <Box x="80" y="100" w="220" h="120" label="Process A" sub="attach" stroke={BLUE} className="unixv-pulse" />
      <Box x="600" y="100" w="220" h="120" label="Process B" sub="attach" stroke={PURP} className="unixv-pulse unixv-delay-2" />
      <rect x="250" y="280" width="400" height="90" rx="14" fill={SKY} stroke={TEAL} strokeWidth="3" className="unixv-shm-seg" />
      <L x="450" y="320" size={18} fill={TEAL}>
        shared segment
      </L>
      <L x="450" y="348" size={13} fill={MUTED}>
        shmat / mmap
      </L>
      <line x1="190" y1="220" x2="320" y2="280" stroke={BLUE} strokeWidth="3" markerEnd="url(#unixArrB)" className="unixv-shm-link" />
      <line x1="710" y1="220" x2="580" y2="280" stroke={PURP} strokeWidth="3" markerEnd="url(#unixArrP)" className="unixv-shm-link" />
      <g className="unixv-shm-packet">
        <circle cx="450" cy="300" r="9" fill={AMBER} />
      </g>
    </Scene>
  )
}

/* ── Signal A → SIGTERM → B ── */
export function SignalScene() {
  return (
    <Scene caption="Signal — asynchronous notification A → B">
      <Box x="80" y="160" w="200" h="120" label="Process A" sub="kill(pid, sig)" stroke={BLUE} className="unixv-pulse" />
      <g className="unixv-signal-fly">
        <rect x="340" y="195" width="200" height="50" rx="12" fill="#fef2f2" stroke={RED} strokeWidth="3" />
        <L x="440" y="226" size={16} fill={RED}>
          SIGTERM
        </L>
      </g>
      <Box x="620" y="160" w="200" h="120" label="Process B" sub="handler / default" stroke={PURP} className="unixv-signal-target" />
      <line x1="280" y1="220" x2="340" y2="220" stroke={RED} strokeWidth="3" markerEnd="url(#unixArrR)" className="unixv-arch-flow" />
      <line x1="540" y1="220" x2="620" y2="220" stroke={RED} strokeWidth="3" markerEnd="url(#unixArrR)" className="unixv-arch-flow" />
      <L x="450" y="100" size={16} fill={MUTED}>
        Delivered by kernel — not a normal function call
      </L>
      <L x="450" y="360" size={14} fill={MUTED}>
        Default · Ignore · Catch with handler
      </L>
    </Scene>
  )
}

/* ── Daemon fork → detach → background ── */
export function DaemonScene() {
  const steps = [
    { label: '1. fork()', sub: 'child continues', color: BLUE },
    { label: '2. setsid()', sub: 'new session', color: TEAL },
    { label: '3. detach', sub: 'close tty fds', color: AMBER },
    { label: '4. background', sub: 'no controlling terminal', color: PURP },
  ]
  return (
    <Scene caption="Daemon — fork, detach, run without a terminal">
      {steps.map((s, i) => (
        <g key={s.label}>
          <Box
            x={40 + i * 220}
            y={140}
            w={200}
            h={120}
            label={s.label}
            sub={s.sub}
            stroke={s.color}
            className={`unixv-daemon-step unixv-delay-${i}`}
          />
          {i < steps.length - 1 ? (
            <line
              x1={240 + i * 220}
              y1="200"
              x2={260 + i * 220}
              y2="200"
              stroke={s.color}
              strokeWidth="3"
              markerEnd="url(#unixArrB)"
              className="unixv-daemon-flow"
            />
          ) : null}
        </g>
      ))}
      <g className="unixv-daemon-detach">
        <rect x="300" y="320" width="300" height="60" rx="12" fill="#fff" stroke={GREEN} strokeWidth="2.5" />
        <L x="450" y="356" size={15} fill={GREEN}>
          service runs independently
        </L>
      </g>
      <L x="450" y="80" size={16} fill={MUTED}>
        Parent may exit after first fork — orphan → init/systemd
      </L>
    </Scene>
  )
}

function hay(unit) {
  return `${unit?.topic || ''} ${unit?.visual || ''} ${(unit?.terms || []).join(' ')}`.toLowerCase()
}

function pickScene(unit, beatIndex = 0) {
  const h = hay(unit)

  if (/architecture|components and architecture|environment and structure/.test(h)) return <ArchitectureScene />
  if (/ls options|file attributes|basic unix commands/.test(h) && /ls|attribute|command/.test(h)) {
    if (/permission|attribute/.test(h)) return <PermissionsScene />
    if (/ls/.test(h)) return <LsLongScene />
  }
  if (/permission|rwx|chmod|file attributes/.test(h)) return <PermissionsScene />
  if (/path variable|path lookup|internal and external|type command/.test(h)) return <PathLookupScene />
  if (/organization of files|standard directories|pwd|mkdir|pathnames|hidden files|home directory|dot and double/.test(h)) {
    return <FilesystemCdScene />
  }
  if (/pipe/.test(h)) return <PipeFlowScene />
  if (/redirect|standard files/.test(h)) return <RedirectionScene />
  if (/memory layout|memory allocation|process environment/.test(h)) return <ProcessMemoryScene />
  if (/fork|vfork/.test(h)) return <ForkScene />
  if (/exec/.test(h)) return <ExecScene />
  if (/wait|waitpid|exit wait/.test(h)) return <WaitScene />
  if (/shared memory/.test(h)) return <SharedMemoryScene />
  if (/signal|sigterm|sigaction|kill and raise|sigprocmask|sigqueue|job-control/.test(h)) return <SignalScene />
  if (/daemon/.test(h)) return <DaemonScene />
  if (/combining commands/.test(h)) return beatIndex % 2 === 0 ? <PipeFlowScene /> : <RedirectionScene />
  if (/ls -l|command structure|arguments and options/.test(h)) return <LsLongScene />
  if (/unix environment|features of unix|posix/.test(h)) return <ArchitectureScene />
  if (/c program memory/.test(h)) return <ProcessMemoryScene />

  // Terminal/program view beats prefer a live terminal chrome
  if (/terminal/.test(h) || /terminal-program/.test(unit?.visual || '')) {
    return (
      <UnixTerminal
        standalone
        caption={unit?.topic || 'Terminal view'}
        lines={[
          { text: (unit?.topic || 'unix').slice(0, 48), prompt: true, className: 'unixv-term-type' },
          { text: '# watch the mechanism', color: '#94a3b8' },
          { text: (unit?.terms || []).slice(0, 3).join(' · ') || 'shell → kernel → hardware', color: GREEN },
        ]}
      />
    )
  }

  return null
}

export function beatVisual(unit, beatIndex = 0) {
  const scene = pickScene(unit, beatIndex)
  if (scene) return scene
  return <ConceptBoard title={unit?.topic || 'Concept'} points={unit?.terms || []} />
}
