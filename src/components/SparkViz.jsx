/**
 * SparkViz — reusable living SVG for Apache Spark (Module 5).
 * Reuses the hv-* animation classes + shared primitives from HadoopViz.
 * Same rules: structure always painted (pause-safe), packets = data/tasks,
 * `phase` spotlights the teaching step, remount restarts, reduced-motion safe.
 */
import { Defs, Packet, Link, ServerGlyph } from './HadoopViz'

const T = { fontFamily: 'inherit' }

/* small task chip with a state (active | waiting | done | failed) */
function TaskChip({ x, y, w = 50, label, state = 'wait' }) {
  return (
    <g>
      <rect className={`hv-task-${state}`} x={x} y={y} width={w} height="22" rx="6" strokeWidth="1.4" />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" fontSize="10" fontWeight="800"
        fill={state === 'active' ? '#0d7a54' : state === 'done' ? '#2f6bff' : state === 'failed' ? '#c0293e' : '#7a8698'} style={T}>{label}</text>
    </g>
  )
}

/* legend of the four task states */
function TaskLegend({ x, y }) {
  const items = [['active', 'active'], ['wait', 'waiting'], ['done', 'completed'], ['fail', 'failed']]
  return (
    <g>
      {items.map(([st, lab], i) => (
        <g key={st} transform={`translate(${x + i * 108}, ${y})`}>
          <rect className={`hv-task-${st}`} x="0" y="0" width="16" height="16" rx="4" strokeWidth="1.4" />
          <text x="22" y="12" fontSize="11" className="hv-sub" fontWeight="700" style={T}>{lab}</text>
        </g>
      ))}
    </g>
  )
}

/* ===========================================================================
   SPARK ARCHITECTURE — full submission→execution flow:
   User/App → Driver (SparkSession/Context) → Cluster Manager → Worker Nodes →
   Executors → Tasks/Partitions/Cache, with status/results flowing back.
   ======================================================================== */
export function SparkArchitecture({ phase = 9 }) {
  const on = (n) => phase >= n
  const workers = [{ y: 16, id: 1, part: 'P1' }, { y: 220, id: 2, part: 'P2' }]
  return (
    <svg className="hv-svg" viewBox="0 0 660 430" role="img" aria-label="Apache Spark driver-executor architecture">
      <Defs />

      {/* User / Application */}
      <g className={on(0) ? '' : 'hv-dim'}>
        <rect className="hv-box" x="12" y="24" width="130" height="60" rx="12" />
        <text className="hv-title" x="77" y="50" textAnchor="middle" fontSize="13.5" style={T}>User / App</text>
        <text className="hv-sub" x="77" y="69" textAnchor="middle" fontSize="10.5" style={T}>submits job</text>
      </g>

      {/* Driver Program */}
      <g>
        <rect className="hv-box hv-nn hv-pulse" x="12" y="166" width="176" height="140" rx="13" />
        <circle className="hv-led" cx="30" cy="184" r="3.6" />
        <text className="hv-title" x="100" y="192" textAnchor="middle" fontSize="14" style={T}>Driver Program</text>
        <rect x="26" y="206" width="148" height="34" rx="8" fill="#dfe9ff" stroke="#b9ccff" />
        <text x="100" y="222" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#2450c8" style={T}>SparkSession /</text>
        <text x="100" y="234" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#2450c8" style={T}>SparkContext</text>
        <text className="hv-sub" x="100" y="258" textAnchor="middle" fontSize="10.5" style={T}>builds DAG</text>
        <text className="hv-sub" x="100" y="274" textAnchor="middle" fontSize="10.5" style={T}>schedules &amp; coordinates tasks</text>
        <text className="hv-sub" x="100" y="292" textAnchor="middle" fontSize="10.5" style={T}>collects results</text>
      </g>
      {/* user -> driver */}
      <Link x1={77} y1={84} x2={90} y2={166} flow={on(1)} dim={!on(1)} />
      {on(1) && <Packet x={77} y={84} dx={13} dy={82} color="var(--hv-blue)" dur={2} />}

      {/* Cluster Manager */}
      <g className={on(2) ? '' : 'hv-dim'}>
        <rect className="hv-box hv-rm" x="230" y="120" width="170" height="96" rx="13" />
        <text className="hv-title" x="315" y="146" textAnchor="middle" fontSize="13.5" style={T}>Cluster Manager</text>
        <text className="hv-sub" x="315" y="165" textAnchor="middle" fontSize="10.5" style={T}>allocates resources</text>
        <g>
          {['standalone', 'YARN', 'K8s'].map((m, i) => (
            <g key={m}>
              <rect x={244 + i * 50} y="180" width="46" height="22" rx="6" fill="#f1ecff" stroke="#cabfff" />
              <text x={267 + i * 50} y="195" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#5a45c8" style={T}>{m}</text>
            </g>
          ))}
        </g>
      </g>
      {/* driver <-> cluster manager (resource request + grant) */}
      <Link x1={188} y1={188} x2={230} y2={168} flow={on(2)} dim={!on(2)} />
      {on(2) && <>
        <Packet x={188} y={188} dx={42} dy={-20} color="var(--hv-purple)" dur={2} />
        <Packet x={230} y={168} dx={-42} dy={20} color="var(--hv-green)" dur={2} delay={1} />
      </>}

      {/* Worker Nodes with Executors */}
      {workers.map((w, wi) => (
        <g key={w.id}>
          {/* cluster manager -> worker (launch executor) */}
          <Link x1={400} y1={168} x2={448} y2={w.y + 96} flow={on(3)} dim={!on(3)} />
          {on(3) && <Packet x={400} y={168} dx={48} dy={w.y + 96 - 168} color="var(--hv-orange)" dur={2.4} delay={wi * 0.4} square />}
          {/* driver -> executor tasks + status back */}
          <Link x1={188} y1={266} x2={456} y2={w.y + 150} flow={on(4)} dim={!on(4)} arrow={false} />
          {on(4) && <Packet x={188} y={266} dx={268} dy={w.y + 150 - 266} color="var(--hv-blue)" dur={2.6} delay={wi * 0.5} square />}
          {on(5) && <Packet x={456} y={w.y + 150} dx={-268} dy={266 - (w.y + 150)} color="var(--hv-teal)" dur={2.6} delay={wi * 0.5 + 1.3} />}

          <rect className="hv-box" x="448" y={w.y} width="200" height="188" rx="13" />
          <ServerGlyph x="464" y={w.y + 14} />
          <circle className="hv-led" cx="636" cy={w.y + 20} r="3.6" style={{ '--delay': `${wi * 0.4}s` }} />
          <text className="hv-title" x="498" y={w.y + 30} fontSize="13" style={T}>{`Worker Node ${w.id}`}</text>

          {/* Executor */}
          <rect x="462" y={w.y + 46} width="172" height="128" rx="10" fill="#f7f9fd" stroke="#d7e0ee" />
          <text className="hv-title" x="474" y={w.y + 66} fontSize="12.5" style={T}>Executor</text>
          <circle className="hv-led" cx="622" cy={w.y + 62} r="3" style={{ '--delay': `${wi * 0.3}s` }} />
          {/* tasks (states) */}
          <TaskChip x="474" y={w.y + 74} w={48} label="T1" state="done" />
          <TaskChip x="526" y={w.y + 74} w={48} label="T2" state="active" />
          <TaskChip x="578" y={w.y + 74} w={48} label="T3" state="wait" />
          {/* partition + cache */}
          <rect x="474" y={w.y + 104} width="86" height="26" rx="7" fill="#eef3ff" stroke="#cddcff" />
          <text x="517" y={w.y + 121} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#2f6bff" style={T}>{`partition ${w.part}`}</text>
          <rect className="hv-cache" x="566" y={w.y + 104} width="60" height="26" rx="7" fill="#eafaf2" stroke="#a9e6cd" />
          <text x="596" y={w.y + 121} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0d7a54" style={T}>cache</text>
          <text className="hv-sub" x="474" y={w.y + 150} fontSize="9.5" style={T}>task runs on a partition, in memory</text>
        </g>
      ))}

      <TaskLegend x={16} y={352} />
    </svg>
  )
}

/* ===========================================================================
   SPARK EXECUTORS — parallel task execution across partitions, executor-to-
   driver status, in-memory cache, and executor failure with task rescheduling.
   ======================================================================== */
export function SparkExecutors({ failure = true }) {
  const execs = [
    { x: 18, id: 1, set: 'Page Set A', fail: false },
    { x: 240, id: 2, set: 'Page Set B', fail: true },
    { x: 462, id: 3, set: 'Page Set C', fail: false },
  ]
  return (
    <svg className="hv-svg" viewBox="0 0 660 520" role="img" aria-label="Spark executors processing partitions in parallel with failure recovery">
      <Defs />

      {/* Driver */}
      <g>
        <rect className="hv-box hv-nn hv-pulse" x="238" y="14" width="184" height="72" rx="13" />
        <circle className="hv-led" cx="256" cy="34" r="3.6" />
        <text className="hv-title" x="330" y="42" textAnchor="middle" fontSize="14.5" style={T}>Driver</text>
        <text className="hv-sub" x="330" y="64" textAnchor="middle" fontSize="10.5" style={T}>schedules &amp; reschedules tasks</text>
      </g>

      {execs.map((e, ei) => {
        const failing = failure && e.fail
        return (
          <g key={e.id}>
            {/* driver -> executor task dispatch + status back */}
            <Link x1={330} y1={86} x2={e.x + 90} y2={140} flow={!failing} dim={false} />
            {!failing && <Packet x={330} y={86} dx={e.x + 90 - 330} dy={54} color="var(--hv-blue)" dur={2.4} delay={ei * 0.4} square />}
            {!failing && <Packet x={e.x + 90} y={140} dx={330 - (e.x + 90)} dy={-54} color="var(--hv-teal)" dur={2.4} delay={ei * 0.4 + 1.2} />}

            {/* worker + executor box (tall) */}
            <rect className={`hv-box ${failing ? 'hv-fail-box' : ''}`.trim()} x={e.x} y="140" width="180" height="340" rx="14" style={{ '--dur': '7s' }} />
            <g className={failing ? 'hv-fail' : ''} style={{ '--dur': '7s' }}>
              <ServerGlyph x={e.x + 16} y="160" />
              {!failing && <circle className="hv-led" cx={e.x + 166} cy="166" r="3.8" style={{ '--delay': `${ei * 0.3}s` }} />}
              <text className="hv-title" x={e.x + 52} y="178" fontSize="14" style={T}>{`Executor ${e.id}`}</text>
              <text className="hv-sub" x={e.x + 16} y="202" fontSize="10.5" style={T}>{`Worker Node ${e.id}`}</text>
              {/* partition it reads */}
              <rect x={e.x + 16} y="216" width="148" height="34" rx="8" fill="#eef3ff" stroke="#cddcff" />
              <text x={e.x + 90} y="238" textAnchor="middle" fontSize="11" fontWeight="800" fill="#2f6bff" style={T}>{`partition · ${e.set}`}</text>
              {/* tasks running on partitions */}
              <text className="hv-sub" x={e.x + 16} y="278" fontSize="10" style={T}>parallel tasks</text>
              <TaskChip x={e.x + 16} y="286" w={44} label="task" state="done" />
              <TaskChip x={e.x + 64} y="286" w={44} label="task" state="active" />
              <TaskChip x={e.x + 112} y="286" w={44} label="task" state="wait" />
              {/* cache */}
              <rect className="hv-cache" x={e.x + 16} y="332" width="148" height="42" rx="9" fill="#eafaf2" stroke="#a9e6cd" />
              <text x={e.x + 90} y="350" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0d7a54" style={T}>cached partition</text>
              <text x={e.x + 90} y="366" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0d7a54" style={T}>reused across stages</text>
              <text className="hv-sub" x={e.x + 16} y="404" fontSize="10" style={T}>results → Driver</text>
            </g>

            {/* failure marker + rescheduling */}
            {failing && <>
              <g className="hv-fail-x" style={{ '--dur': '7s' }} stroke="var(--hv-red)" strokeWidth="3" strokeLinecap="round">
                <line x1={e.x + 78} y1="164" x2={e.x + 100} y2="186" />
                <line x1={e.x + 100} y1="164" x2={e.x + 78} y2="186" />
              </g>
              <text className="hv-recover" x={e.x + 90} y="446" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="var(--hv-red)" style={{ '--dur': '7s' }}>failed → tasks rescheduled</text>
            </>}
          </g>
        )
      })}

      {/* rescheduled task travels from failed Executor 2 to healthy Executor 3 */}
      {failure && <>
        <path className="hv-recover" d="M330 104 C 440 250, 520 250, 552 250" fill="none" stroke="var(--hv-green)" strokeWidth="2" strokeDasharray="6 6" style={{ '--dur': '7s' }} />
        <Packet x={330} y={104} dx={222} dy={146} color="var(--hv-green)" dur={2.2} square />
      </>}

      <TaskLegend x={120} y={500} />
    </svg>
  )
}
