import { useEffect, useMemo, useState } from 'react'
import { C } from './OsMachine.jsx'

const FCFS_JOBS = [
  { id: 'P1', burst: 24, color: '#0891b2' },
  { id: 'P2', burst: 3, color: '#2563eb' },
  { id: 'P3', burst: 3, color: '#7c3aed' },
]

const SJF_JOBS = [
  { id: 'P1', arrival: 0, burst: 6, color: '#0891b2' },
  { id: 'P2', arrival: 2, burst: 8, color: '#2563eb' },
  { id: 'P3', arrival: 4, burst: 7, color: '#7c3aed' },
  { id: 'P4', arrival: 5, burst: 3, color: '#d97706' },
]

export function scheduleFCFS(jobs, order) {
  let t = 0
  return order.map((id) => {
    const job = jobs.find((j) => j.id === id)
    const start = t
    t += job.burst
    return { ...job, start, end: t, wait: start, tat: t }
  })
}

export function scheduleSJF(jobs) {
  const remaining = jobs.map((j) => ({ ...j, left: j.burst, done: false }))
  const segs = []
  let t = 0
  while (segs.length < 20 && remaining.some((j) => !j.done)) {
    const ready = remaining.filter((j) => !j.done && j.arrival <= t)
    if (!ready.length) {
      t = Math.min(...remaining.filter((j) => !j.done).map((j) => j.arrival))
      continue
    }
    ready.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival)
    const job = ready[0]
    const start = t
    t += job.burst
    job.done = true
    segs.push({ ...job, start, end: t, wait: start - job.arrival, tat: t - job.arrival })
  }
  return segs
}

export function scheduleRR(jobs, q = 4) {
  const qe = jobs.map((j) => ({ ...j, left: j.burst }))
  const segs = []
  let t = 0
  let i = 0
  while (qe.some((j) => j.left > 0) && segs.length < 40) {
    const job = qe[i % qe.length]
    if (job.left > 0) {
      const slice = Math.min(q, job.left)
      segs.push({ id: job.id, color: job.color, start: t, end: t + slice, burst: job.burst })
      t += slice
      job.left -= slice
    }
    i += 1
  }
  return segs
}

function GanttTrack({ segs, total, play, axis = true }) {
  // Always render the COMPLETE Gantt (a lecture chart must be whole even when
  // frozen); a sweeping playhead shows "where we are now" and the currently
  // running segment brightens.
  const ticks = []
  for (const s of segs) if (!ticks.includes(s.start)) ticks.push(s.start)
  if (!ticks.includes(total)) ticks.push(total)
  return (
    <div>
      <div className="os-gantt-track">
        {segs.map((s, i) => {
          const reached = play >= s.end
          const running = play >= s.start && play < s.end
          return (
            <div
              key={`${s.id}-${s.start}-${i}`}
              className={`os-gantt-bar${running ? ' running' : ''}`}
              style={{
                left: `${(s.start / total) * 100}%`,
                width: `${((s.end - s.start) / total) * 100}%`,
                background: s.color,
                opacity: reached || running ? 1 : 0.42,
              }}
            >
              {s.id}
            </div>
          )
        })}
        <div className="os-gantt-head" style={{ left: `${(Math.min(play, total) / total) * 100}%` }} />
      </div>
      {axis && (
        <div className="os-gantt-axis">
          {ticks.sort((a, b) => a - b).map((t) => (
            <span key={t} style={{ left: `${(t / total) * 100}%` }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export function CpuScheduler({ algo = 'fcfs', order = ['P1', 'P2', 'P3'] }) {
  const segs = useMemo(() => {
    if (algo === 'sjf') return scheduleSJF(SJF_JOBS)
    if (algo === 'rr') return scheduleRR(FCFS_JOBS, 4)
    return scheduleFCFS(FCFS_JOBS, order)
  }, [algo, order])
  const total = segs[segs.length - 1]?.end || 30
  const [play, setPlay] = useState(0)
  useEffect(() => {
    setPlay(0)
    const t = setInterval(() => setPlay((x) => (x >= total ? 0 : x + 1)), 280)
    return () => clearInterval(t)
  }, [total, algo, order])
  const running = segs.find((s) => play >= s.start && play < s.end)
  const avgWait = segs[0]?.wait != null ? (segs.reduce((a, s) => a + (s.wait || 0), 0) / segs.length).toFixed(1) : '—'
  return (
    <div className="os-scene os-gantt">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{algo.toUpperCase()} · t = {play}</strong>
        <span className="os-chip os-chip-k">{running ? running.id : 'idle'}</span>
      </div>
      <GanttTrack segs={segs} total={total} play={play + 0.01} />
      <div className="os-ready-row">
        {segs.map((s) => (
          <span key={s.id + s.start} className="os-chip os-chip-p">{s.id} {s.wait != null ? `W=${s.wait}` : ''}</span>
        ))}
      </div>
      <div className="os-scene-hud">
        <span>Average waiting time {avgWait}</span>
        <span>makespan {total}</span>
      </div>
    </div>
  )
}

export function SchedulerRace() {
  const fcfs = scheduleFCFS(FCFS_JOBS, ['P1', 'P2', 'P3'])
  const rr = scheduleRR(FCFS_JOBS, 4)
  const [play, setPlay] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPlay((x) => (x >= 30 ? 0 : x + 1)), 260)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="os-scene os-gantt">
      <strong>Same jobs — FCFS vs Round Robin (q=4)</strong>
      <div>FCFS  avg wait 17</div>
      <GanttTrack segs={fcfs} total={30} play={play} />
      <div>RR  better response, more switches</div>
      <GanttTrack segs={rr} total={30} play={play} />
    </div>
  )
}

const REF = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]

function runReplacement(algo, frames) {
  const mem = []
  const log = []
  let faults = 0
  const clock = []
  REF.forEach((page, idx) => {
    const hit = mem.includes(page)
    let victim = null
    if (!hit) {
      faults += 1
      if (mem.length < frames) {
        mem.push(page)
      } else if (algo === 'fifo') {
        victim = mem.shift()
        mem.push(page)
      } else if (algo === 'opt') {
        const future = (p) => {
          const n = REF.slice(idx + 1).indexOf(p)
          return n === -1 ? 99 : n
        }
        victim = mem.reduce((a, b) => (future(a) >= future(b) ? a : b))
        mem[mem.indexOf(victim)] = page
      } else if (algo === 'lru') {
        victim = mem.reduce((a, b) => (clock[a] < clock[b] ? a : b))
        mem[mem.indexOf(victim)] = page
      } else if (algo === 'clock') {
        let i = 0
        while (i < 12) {
          const p = mem[i % mem.length]
          if (!clock[`ref${p}`]) {
            victim = p
            mem[i % mem.length] = page
            break
          }
          clock[`ref${p}`] = false
          i += 1
        }
      }
    }
    clock[page] = idx
    clock[`ref${page}`] = true
    log.push({ page, hit, frames: [...mem], faults, victim })
  })
  return log
}

// The first step where the frames are full AND this reference faults — the
// most instructive resting frame for a static viewer (a victim is evicted).
function representativeStep(log, frames) {
  const idx = log.findIndex((e) => e.frames.length >= frames && !e.hit && e.victim != null)
  if (idx >= 0) return idx
  const full = log.findIndex((e) => e.frames.length >= frames)
  return full >= 0 ? full : Math.max(0, log.length - 1)
}

export function PageReplacementSimulator({ algo = 'fifo', frames = 3 }) {
  const log = useMemo(() => runReplacement(algo, frames), [algo, frames])
  const start = useMemo(() => representativeStep(log, frames), [log, frames])
  const [i, setI] = useState(start)
  useEffect(() => {
    setI(start)
    const t = setInterval(() => setI((x) => (x + 1) % log.length), 850)
    return () => clearInterval(t)
  }, [log.length, algo, frames, start])
  const cur = log[i] || log[0]
  return (
    <div className="os-scene os-pagesim" style={{ padding: 'clamp(20px,2.6vw,44px)', display: 'grid', alignContent: 'center', gap: 'clamp(14px,2.4vh,26px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: 'clamp(17px,1.5vw,24px)' }}>{algo.toUpperCase()} · {frames} frames</strong>
        <span className={`os-chip ${cur.hit ? 'os-chip-ok' : 'os-chip-f'}`} style={{ fontSize: 'clamp(14px,1.2vw,18px)', height: 'auto', padding: '8px 16px' }}>{cur.hit ? 'HIT' : 'FAULT'}</span>
      </div>
      <div className="os-ready-row" style={{ justifyContent: 'center' }}>
        {REF.map((p, idx) => (
          <span key={idx} className={`os-chip ${idx === i ? 'os-chip-k' : 'os-chip-p'}`} style={{ minWidth: 'clamp(34px,3vw,46px)', height: 'clamp(34px,3vw,44px)', fontSize: 'clamp(14px,1.2vw,18px)' }}>{p}</span>
        ))}
      </div>
      <div className="os-mem-grid" style={{ gridTemplateColumns: `repeat(${frames}, clamp(72px, 9vw, 128px))` }}>
        {Array.from({ length: frames }).map((_, fi) => (
          <div key={fi} className={`os-frame ${cur.frames[fi] ? 'full' : ''} ${!cur.hit && cur.frames[fi] === cur.page ? 'fault' : ''} ${cur.hit && cur.frames[fi] === cur.page ? 'hit' : ''}`}>
            {cur.frames[fi] ?? '—'}
          </div>
        ))}
      </div>
      <div className="os-scene-hud" style={{ position: 'static', justifyContent: 'center', gap: 24, fontSize: 'clamp(14px,1.2vw,18px)' }}>
        <span>page faults {cur.faults}</span>
        {cur.victim != null && <span>victim {cur.victim}</span>}
      </div>
    </div>
  )
}

export function BeladyCompare() {
  return (
    <div className="os-scene" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 10 }}>
      <PageReplacementSimulator algo="fifo" frames={3} />
      <PageReplacementSimulator algo="fifo" frames={4} />
    </div>
  )
}

const DISK_REQ = [98, 183, 37, 122, 14, 124, 65, 67]
const DISK_START = 53
const DISK_MAX = 199

function diskPath(algo) {
  const req = [...DISK_REQ]
  let head = DISK_START
  const path = [head]
  if (algo === 'fcfs') {
    req.forEach((r) => {
      path.push(r)
      head = r
    })
  } else if (algo === 'sstf') {
    const left = [...req]
    while (left.length) {
      left.sort((a, b) => Math.abs(a - head) - Math.abs(b - head))
      head = left.shift()
      path.push(head)
    }
  } else if (algo === 'scan') {
    const up = req.filter((r) => r >= head).sort((a, b) => a - b)
    const down = req.filter((r) => r < head).sort((a, b) => b - a)
    up.forEach((r) => path.push(r))
    path.push(DISK_MAX)
    down.forEach((r) => path.push(r))
  } else if (algo === 'cscan') {
    const up = req.filter((r) => r >= head).sort((a, b) => a - b)
    const wrap = req.filter((r) => r < head).sort((a, b) => a - b)
    up.forEach((r) => path.push(r))
    path.push(DISK_MAX)
    path.push(0)
    wrap.forEach((r) => path.push(r))
  } else if (algo === 'clook') {
    const up = req.filter((r) => r >= head).sort((a, b) => a - b)
    const wrap = req.filter((r) => r < head).sort((a, b) => a - b)
    up.forEach((r) => path.push(r))
    wrap.forEach((r) => path.push(r))
  } else if (algo === 'look') {
    const up = req.filter((r) => r >= head).sort((a, b) => a - b)
    const down = req.filter((r) => r < head).sort((a, b) => b - a)
    up.forEach((r) => path.push(r))
    down.forEach((r) => path.push(r))
  }
  let dist = 0
  for (let i = 1; i < path.length; i += 1) dist += Math.abs(path[i] - path[i - 1])
  return { path, dist }
}

export function DiskHeadScheduler({ algo = 'fcfs' }) {
  const { path, dist } = useMemo(() => diskPath(algo), [algo])
  // Rest mid-journey so a static viewer sees the head en route, not parked.
  const start = Math.min(path.length - 1, Math.max(1, Math.round(path.length / 2)))
  const [i, setI] = useState(start)
  useEffect(() => {
    setI(start)
    const t = setInterval(() => setI((x) => (x + 1) % path.length), 750)
    return () => clearInterval(t)
  }, [path, algo, start])
  const pos = path[i]
  const px = (c) => (c / DISK_MAX) * 100
  const rowH = 100 / (path.length - 1 || 1)
  // Vertical service order as a traced zig-zag (the classic disk-scheduling chart).
  const points = path.map((c, r) => `${px(c)},${r * rowH}`).join(' ')
  const donePoints = path.slice(0, i + 1).map((c, r) => `${px(c)},${r * rowH}`).join(' ')
  return (
    <div className="os-scene" style={{ padding: 'clamp(22px,3vw,44px)', display: 'grid', gridTemplateRows: 'auto auto 1fr', alignContent: 'stretch', gap: 'clamp(10px,1.6vh,18px)' }}>
      <strong style={{ fontSize: 'clamp(18px,1.6vw,26px)' }}>{algo.toUpperCase()} · head {pos} · total movement {dist}</strong>
      <div className="os-disk-scale" style={{ margin: 'clamp(24px,3.4vh,40px) 12px 6px' }}>
        {[0, 53, 99, 199].map((c) => (
          <span key={c} className="os-disk-tick" style={{ left: `${px(c)}%` }}>{c}</span>
        ))}
        {[...DISK_REQ].sort((a, b) => a - b).map((r, idx) => (
          <span key={r} className="os-disk-tick" style={{ left: `${px(r)}%`, top: `calc(100% + ${idx % 2 ? 30 : 8}px)`, color: C.process }}>{r}</span>
        ))}
        <div className="os-disk-head" style={{ left: `calc(${px(pos)}% - 9px)` }} />
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', minHeight: 90 }} aria-hidden>
        <polyline points={points} fill="none" stroke="rgba(27,42,65,.18)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" strokeDasharray="2 2" />
        <polyline points={donePoints} fill="none" stroke={C.navy} strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        {path.map((c, r) => (
          <circle key={r} cx={px(c)} cy={r * rowH} r="1.1" fill={r <= i ? C.process : '#c9c2b6'} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  )
}

export function DiskRace() {
  const algos = ['fcfs', 'sstf', 'scan', 'cscan', 'look', 'clook']
  return (
    <div className="os-scene" style={{ display: 'grid', gap: 6, padding: 10 }}>
      {algos.map((a) => {
        const { dist } = diskPath(a)
        return (
          <div key={a} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 70px', alignItems: 'center', gap: 8 }}>
            <strong>{a.toUpperCase()}</strong>
            <div style={{ height: 10, background: '#efeae1', borderRadius: 99, overflow: 'hidden' }}>
              <div className="os-anim-gantt" style={{ width: `${Math.min(100, (dist / 640) * 100)}%`, height: '100%', background: a === 'fcfs' ? C.fault : C.ok }} />
            </div>
            <span>{dist}</span>
          </div>
        )
      })}
    </div>
  )
}

const BANK = {
  names: ['P0', 'P1', 'P2', 'P3', 'P4'],
  alloc: [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]],
  max: [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]],
  avail: [3, 3, 2],
}

function needOf() {
  return BANK.max.map((m, i) => m.map((v, j) => v - BANK.alloc[i][j]))
}

export function BankersSafetySimulator() {
  const need = needOf()
  const sequence = ['P1', 'P3', 'P4', 'P2', 'P0']
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % (sequence.length + 1)), 1100)
    return () => clearInterval(t)
  }, [])
  const done = sequence.slice(0, i)
  return (
    <div className="os-scene" style={{ padding: 14, display: 'grid', gap: 8, overflow: 'auto' }}>
      <strong>Banker safety · Available A B C = 3 3 2</strong>
      <table className="ans-table" style={{ minWidth: 0, fontSize: 13 }}>
        <thead>
          <tr><th>P</th><th>Alloc</th><th>Max</th><th>Need</th><th></th></tr>
        </thead>
        <tbody>
          {BANK.names.map((n, idx) => (
            <tr key={n} style={{ background: done.includes(n) ? 'rgba(21,128,61,.12)' : 'transparent' }}>
              <td>{n}</td>
              <td>{BANK.alloc[idx].join(' ')}</td>
              <td>{BANK.max[idx].join(' ')}</td>
              <td>{need[idx].join(' ')}</td>
              <td>{done.includes(n) ? 'safe ✓' : i < sequence.length && sequence[i] === n ? 'check' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="os-scene-hud">safe sequence ⟨ {sequence.join(', ')} ⟩</div>
    </div>
  )
}

export const SCHED_FCFS = FCFS_JOBS
export const SCHED_SJF = SJF_JOBS
export const PAGE_REF = REF
export const DISK = { req: DISK_REQ, start: DISK_START }
