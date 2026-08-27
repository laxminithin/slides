/**
 * HadoopViz — reusable living SVG architectures for Big Data Module 2.
 *
 * Design rules (see hadoopViz.css):
 *  - Structure is always painted; only packets/links/LEDs/rings animate, so a
 *    frozen frame (paused / throttled / reduced-motion) still reads correctly.
 *  - Every moving element is instructional: packet = data unit, marching dash =
 *    live link, green LED = healthy node, red = failure, ring = recovery.
 *  - `phase` (a number) spotlights the current teaching step; earlier segments
 *    keep flowing, later ones are dimmed but visible. Components remount on
 *    slide navigation (App.jsx replayKey), so animations restart on revisit.
 */

const T = { fontFamily: 'inherit' }

export function Defs() {
  return (
    <defs>
      <marker id="hvArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill="#9fb2cf" />
      </marker>
    </defs>
  )
}

export function Packet({ x, y, dx, dy, r = 5, color = 'var(--hv-blue)', dur = 2.4, delay = 0, square = false }) {
  const style = { '--dx': `${dx}px`, '--dy': `${dy}px`, '--dur': `${dur}s`, '--delay': `${delay}s` }
  if (square) {
    return <rect className="hv-packet" x={x - r} y={y - r} width={r * 2} height={r * 2} rx="2" fill={color} style={style} />
  }
  return <circle className="hv-packet" cx={x} cy={y} r={r} fill={color} style={style} />
}

export function Link({ x1, y1, x2, y2, flow = false, dim = false, arrow = true }) {
  return (
    <line
      className={`hv-conn ${flow ? 'hv-flow' : ''} ${dim ? 'hv-dim' : ''}`.trim()}
      x1={x1} y1={y1} x2={x2} y2={y2}
      markerEnd={arrow ? 'url(#hvArrow)' : undefined}
    />
  )
}

export function ServerGlyph({ x, y, color = '#2f6bff' }) {
  return (
    <g transform={`translate(${x},${y})`} stroke={color} strokeWidth="1.6" fill="none">
      <rect x="0" y="0" width="24" height="9" rx="2" />
      <rect x="0" y="12" width="24" height="9" rx="2" />
      <circle cx="5" cy="4.5" r="1.3" fill={color} stroke="none" />
      <circle cx="5" cy="16.5" r="1.3" fill={color} stroke="none" />
    </g>
  )
}

/* Stage caption strip shared by pipeline diagrams. */
function Captions({ items, phase, y, width }) {
  const step = width / items.length
  return (
    <g>
      {items.map((label, i) => {
        const cx = step * i + step / 2
        const on = phase >= (i + 1) * 0
        return (
          <g key={label}>
            <circle className={`hv-cap-dot ${phase >= i ? 'is-on' : ''}`} cx={cx} cy={y} r="4" />
            <text className={`hv-cap ${phase >= i ? 'is-on' : ''}`} x={cx} y={y + 20} textAnchor="middle" fontSize="12" style={T}>{label}</text>
          </g>
        )
      })}
    </g>
  )
}

/* ===========================================================================
   1. HADOOP CLUSTER — NameNode brain + DataNodes across racks. DataNodes send
      heartbeats/block-reports up to the NameNode (living link); NameNode is the
      coordinating metadata brain. Healthy nodes blink green.
   ======================================================================== */
export function HadoopCluster({ highlight = null }) {
  const racks = [
    { x: 12, label: 'Rack 1', nodes: [{ id: 'DN1', blocks: ['B1', 'B3'] }, { id: 'DN2', blocks: ['B2'] }] },
    { x: 212, label: 'Rack 2', nodes: [{ id: 'DN3', blocks: ['B4', 'B1'] }, { id: 'DN4', blocks: ['B2', 'B3'] }] },
    { x: 412, label: 'Rack 3', nodes: [{ id: 'DN5', blocks: ['B3'] }, { id: 'DN6', blocks: ['B1', 'B4'] }] },
  ]
  return (
    <svg className="hv-svg" viewBox="0 0 600 412" role="img" aria-label="Hadoop cluster: NameNode coordinating DataNodes across racks">
      <Defs />
      {/* NameNode */}
      <g>
        <rect className="hv-box hv-nn hv-pulse" x="184" y="10" width="232" height="72" rx="13" />
        <circle className="hv-led" cx="202" cy="27" r="3.8" />
        <text className="hv-title" x="300" y="37" textAnchor="middle" fontSize="16" style={T}>NameNode</text>
        <text className="hv-sub" x="300" y="55" textAnchor="middle" fontSize="11" style={T}>metadata brain · file → blocks → locations</text>
        <text className="hv-sub" x="300" y="71" textAnchor="middle" fontSize="11" style={T}>namespace · block map · rack awareness</text>
      </g>

      {racks.map((rack, ri) => {
        const topX = rack.x + 88
        return (
          <g key={rack.label}>
            {/* heartbeat / block-report link up to NameNode */}
            <Link x1={topX} y1={158} x2={300} y2={84} flow />
            <Packet x={topX} y={158} dx={300 - topX} dy={-74} color="var(--hv-green)" dur={2.6} delay={ri * 0.5} />
            <Packet x={topX} y={158} dx={300 - topX} dy={-74} color="var(--hv-green)" dur={2.6} delay={ri * 0.5 + 1.3} />
            {/* rack container */}
            <rect className="hv-box hv-rack" x={rack.x} y="162" width="176" height="242" rx="12" />
            <text className="hv-sub" x={rack.x + 88} y="181" textAnchor="middle" fontSize="12" fontWeight="800" style={T}>{rack.label}</text>
            {rack.nodes.map((node, ni) => {
              const ny = 192 + ni * 104
              const hot = highlight === node.id
              return (
                <g key={node.id}>
                  <rect className="hv-box" x={rack.x + 14} y={ny} width="148" height="92" rx="10"
                    style={hot ? { stroke: 'var(--hv-blue)', strokeWidth: 2.4 } : undefined} />
                  <ServerGlyph x={rack.x + 26} y={ny + 14} />
                  <circle className="hv-led" cx={rack.x + 150} cy={ny + 13} r="3.6" style={{ '--delay': `${ni * 0.4 + ri * 0.2}s` }} />
                  <text className="hv-title" x={rack.x + 62} y={ny + 28} fontSize="14" style={T}>{node.id}</text>
                  <text className="hv-sub" x={rack.x + 26} y={ny + 49} fontSize="10.5" style={T}>DataNode · stores blocks</text>
                  {node.blocks.map((b, bi) => (
                    <g key={b}>
                      <rect className="hv-tag" x={rack.x + 26 + bi * 42} y={ny + 58} width="36" height="22" rx="5" />
                      <text className="hv-tag-t" x={rack.x + 44 + bi * 42} y={ny + 73} textAnchor="middle" fontSize="11" style={T}>{b}</text>
                    </g>
                  ))}
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

/* ===========================================================================
   2. HDFS FLOW — write (split → metadata → land → replicate) or read
      (lookup → stream → reconstruct). Optional node-failure + auto-recovery.
   ======================================================================== */
export function HdfsFlow({ mode = 'write', phase = 9, failure = false }) {
  const on = (n) => phase >= n
  const dn = [
    { y: 40, id: 'DN1' },
    { y: 168, id: 'DN2' },
    { y: 296, id: 'DN3' },
  ]
  const write = mode === 'write'
  return (
    <svg className="hv-svg" viewBox="0 0 620 460" role="img" aria-label={`HDFS ${mode} data flow`}>
      <Defs />

      {/* NameNode */}
      <g className={on(write ? 2 : 1) ? '' : 'hv-dim'}>
        <rect className="hv-box hv-nn" x="232" y="14" width="176" height="78" rx="13" />
        <circle className="hv-led" cx="250" cy="32" r="3.6" />
        <text className="hv-title" x="320" y="42" textAnchor="middle" fontSize="15" style={T}>NameNode</text>
        <text className="hv-sub" x="320" y="62" textAnchor="middle" fontSize="11" style={T}>metadata only</text>
        <text className="hv-sub" x="320" y="78" textAnchor="middle" fontSize="11" style={T}>/campus/events → B1 B2 B3 B4</text>
      </g>

      {/* Client */}
      <g>
        <rect className="hv-box" x="14" y="168" width="140" height="128" rx="13" />
        <text className="hv-title" x="84" y="196" textAnchor="middle" fontSize="15" style={T}>Client</text>
        <text className="hv-sub" x="84" y="216" textAnchor="middle" fontSize="11" style={T}>{write ? 'campus-events.log' : 'read /campus/events'}</text>
        {/* blocks appear once split (write) */}
        {write && [0, 1, 2, 3].map((i) => (
          <g key={i} className={on(1) ? '' : 'hv-dim'}>
            <rect className="hv-tag" x={26 + i * 30} y="236" width="26" height="24" rx="5" />
            <text className="hv-tag-t" x={39 + i * 30} y="252" textAnchor="middle" fontSize="10" style={T}>{`B${i + 1}`}</text>
          </g>
        ))}
        {/* reconstructed file (read) */}
        {!write && (
          <g className={on(4) ? '' : 'hv-dim'}>
            <rect x="26" y="236" width="116" height="44" rx="8" fill="#eafaf2" stroke="#a9e6cd" />
            <text x="84" y="256" textAnchor="middle" className="hv-title" fontSize="11" style={T}>reconstructed</text>
            <text x="84" y="271" textAnchor="middle" className="hv-sub" fontSize="10" style={T}>original file</text>
          </g>
        )}
      </g>

      {/* metadata link client <-> NameNode */}
      <Link x1={150} y1={196} x2={236} y2={70} flow={write ? on(2) : on(1)} dim={!(write ? on(2) : on(1))} />
      {write
        ? on(2) && <Packet x={150} y={196} dx={86} dy={-126} color="var(--hv-purple)" dur={2.2} />
        : <>
            {on(1) && <Packet x={150} y={196} dx={86} dy={-126} color="var(--hv-purple)" dur={2} />}
            {on(2) && <Packet x={236} y={70} dx={-86} dy={126} color="var(--hv-blue)" dur={2} />}
          </>}

      {/* DataNodes */}
      {dn.map((d, i) => {
        const failing = failure && d.id === 'DN2'
        return (
          <g key={d.id}>
            <rect
              className={`hv-box ${failing ? 'hv-fail-box' : ''}`.trim()}
              x="470" y={d.y} width="134" height="96" rx="12"
              style={{ '--dur': '6.5s' }}
            />
            <g className={failing ? 'hv-fail' : ''} style={{ '--dur': '6.5s' }}>
              <ServerGlyph x="486" y={d.y + 16} />
              {!failing && <circle className="hv-led" cx="590" cy={d.y + 16} r="3.6" style={{ '--delay': `${i * 0.5}s` }} />}
              <text className="hv-title" x="522" y={d.y + 30} fontSize="14" style={T}>{d.id}</text>
              <text className="hv-sub" x="486" y={d.y + 52} fontSize="10.5" style={T}>DataNode</text>
              <rect className="hv-tag" x="486" y={d.y + 62} width="36" height="22" rx="5" />
              <text className="hv-tag-t" x="504" y={d.y + 77} textAnchor="middle" fontSize="11" style={T}>{`B${i + 1}`}</text>
              {write && on(4) && <>
                <rect x="528" y={d.y + 62} width="34" height="22" rx="5" fill="#eafaf2" stroke="#a9e6cd" />
                <text x="545" y={d.y + 77} textAnchor="middle" fontSize="10" fill="var(--hv-green)" fontWeight="800" style={T}>×3</text>
              </>}
            </g>
            {/* failure X + recovery on the failing node */}
            {failing && <>
              <g className="hv-fail-x" style={{ '--dur': '6.5s' }} stroke="var(--hv-red)" strokeWidth="3" strokeLinecap="round">
                <line x1="556" y1={d.y + 10} x2="574" y2={d.y + 28} />
                <line x1="574" y1={d.y + 10} x2="556" y2={d.y + 28} />
              </g>
            </>}
          </g>
        )
      })}

      {/* write: block-placement links client -> each DataNode */}
      {write && dn.map((d, i) => (
        <g key={`w${d.id}`}>
          <Link x1={154} y1={250} x2={470} y2={d.y + 48} flow={on(3)} dim={!on(3)} />
          {on(3) && <Packet x={154} y={250} dx={316} dy={d.y + 48 - 250} color="var(--hv-blue)" dur={2.4} delay={i * 0.4} square />}
        </g>
      ))}
      {/* write: replication pipeline DN1 -> DN2 -> DN3 */}
      {write && on(4) && <>
        <Link x1={537} y1={136} x2={537} y2={168} flow />
        <Link x1={537} y1={264} x2={537} y2={296} flow />
        <Packet x={537} y={136} dx={0} dy={32} color="var(--hv-green)" dur={1.8} square />
        <Packet x={537} y={264} dx={0} dy={32} color="var(--hv-green)" dur={1.8} delay={0.6} square />
      </>}

      {/* read: request + streaming back */}
      {!write && dn.map((d, i) => (
        <g key={`r${d.id}`}>
          <Link x1={154} y1={232} x2={470} y2={d.y + 48} flow={on(3)} dim={!on(3)} />
          {on(3) && <Packet x={470} y={d.y + 48} dx={154 - 470} dy={232 - (d.y + 48)} color="var(--hv-teal)" dur={2.4} delay={i * 0.4} square />}
        </g>
      ))}

      {/* recovery narration: ring + re-replication after failure */}
      {failure && write && <>
        <circle className="hv-ring" cx="537" cy={dn[2].y + 48} r="60" style={{ '--dur': '6.5s' }} />
        <g className="hv-recover">
          <rect x="528" y={dn[2].y + 62} width="34" height="22" rx="5" fill="#eafaf2" stroke="#17a06b" />
          <text x="545" y={dn[2].y + 77} textAnchor="middle" fontSize="10" fill="var(--hv-green)" fontWeight="800" style={T}>new</text>
        </g>
        <text x="537" y={445} textAnchor="middle" className="hv-sub" fontSize="11" fontWeight="800" fill="var(--hv-green)" style={T}>
          NameNode re-replicates the lost block automatically
        </text>
      </>}

      {/* confirm (write) */}
      {write && on(5) && !failure && (
        <g>
          <circle cx="84" cy="330" r="15" fill="#eafaf2" stroke="#17a06b" />
          <path d="M77 330 l5 5 l9 -11" fill="none" stroke="var(--hv-green)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="84" y="368" textAnchor="middle" className="hv-sub" fontSize="11" fontWeight="800" style={T}>write complete</text>
        </g>
      )}
    </svg>
  )
}

/* ===========================================================================
   3. YARN WORKFLOW — ResourceManager (authority) allocates an ApplicationMaster
      then containers across NodeManagers; tasks run inside containers.
   ======================================================================== */
export function YarnWorkflow({ phase = 9 }) {
  const on = (n) => phase >= n
  const nms = [
    { x: 24, id: 'NM1', am: true },
    { x: 232, id: 'NM2', am: false },
    { x: 440, id: 'NM3', am: false },
  ]
  return (
    <svg className="hv-svg" viewBox="0 0 620 442" role="img" aria-label="YARN resource allocation workflow">
      <Defs />

      {/* ResourceManager */}
      <g>
        <rect className="hv-box hv-rm hv-pulse" x="220" y="12" width="200" height="76" rx="14" />
        <circle className="hv-led" cx="240" cy="30" r="3.8" style={{ fill: 'var(--hv-purple)' }} />
        <text className="hv-title" x="320" y="40" textAnchor="middle" fontSize="15" style={T}>ResourceManager</text>
        <text className="hv-sub" x="320" y="60" textAnchor="middle" fontSize="11" style={T}>cluster authority</text>
        <text className="hv-sub" x="320" y="76" textAnchor="middle" fontSize="11" style={T}>scheduler + applications manager</text>
      </g>

      {/* Client */}
      <g className={on(0) ? '' : 'hv-dim'}>
        <rect className="hv-box" x="12" y="112" width="120" height="78" rx="12" />
        <text className="hv-title" x="72" y="143" textAnchor="middle" fontSize="14" style={T}>Client</text>
        <text className="hv-sub" x="72" y="163" textAnchor="middle" fontSize="11" style={T}>submits</text>
        <text className="hv-sub" x="72" y="177" textAnchor="middle" fontSize="11" style={T}>word-count job</text>
      </g>
      <Link x1={132} y1={145} x2={220} y2={66} flow={on(1)} dim={!on(1)} />
      {on(1) && <Packet x={132} y={145} dx={88} dy={-79} color="var(--hv-blue)" dur={2.2} />}

      {/* NodeManagers with containers */}
      {nms.map((nm, ni) => {
        const showAM = nm.am && on(2)
        return (
          <g key={nm.id}>
            {/* allocation link RM -> NM */}
            <Link x1={320} y1={88} x2={nm.x + 78} y2={284} flow={on(nm.am ? 2 : 4)} dim={!on(nm.am ? 2 : 4)} />
            {on(nm.am ? 2 : 4) && <Packet x={320} y={88} dx={nm.x + 78 - 320} dy={196} color={nm.am ? 'var(--hv-purple)' : 'var(--hv-orange)'} dur={2.4} delay={ni * 0.4} square />}

            <rect className="hv-box" x={nm.x} y="284" width="156" height="140" rx="12" />
            <ServerGlyph x={nm.x + 14} y="296" />
            <circle className="hv-led" cx={nm.x + 140} cy="304" r="3.6" style={{ '--delay': `${ni * 0.35}s` }} />
            <text className="hv-title" x={nm.x + 48} y="312" fontSize="13.5" style={T}>{nm.id}</text>
            <text className="hv-sub" x={nm.x + 14} y="333" fontSize="10.5" style={T}>NodeManager</text>

            {/* container slots */}
            {[0, 1].map((ci) => {
              const isAM = showAM && ci === 0
              const active = on(6) || isAM
              return (
                <g key={ci}>
                  <rect
                    x={nm.x + 14 + ci * 72} y="344" width="62" height="66" rx="9"
                    fill={isAM ? '#f1ecff' : '#f4f7fb'}
                    stroke={isAM ? '#7c5cff' : '#d7e0ee'}
                    strokeWidth={isAM ? 2 : 1.4}
                  />
                  {active && <circle className="hv-led" cx={nm.x + 45 + ci * 72} cy="356" r="3" style={{ fill: isAM ? 'var(--hv-purple)' : 'var(--hv-green)', '--delay': `${ci * 0.3}s` }} />}
                  <text x={nm.x + 45 + ci * 72} y="382" textAnchor="middle" className="hv-sub" fontSize="10" fontWeight="800" style={T}>{isAM ? 'App' : 'task'}</text>
                  <text x={nm.x + 45 + ci * 72} y="396" textAnchor="middle" className="hv-sub" fontSize="10" fontWeight="800" style={T}>{isAM ? 'Master' : 'cntr'}</text>
                </g>
              )
            })}
          </g>
        )
      })}

      <Captions items={['submit', 'RM', 'AppMaster', 'containers', 'run']} phase={phase} y={432} width={620} />
    </svg>
  )
}

/* ===========================================================================
   4. MAPREDUCE PIPELINE — input split → map (emit k,v) → shuffle+sort (group
      same keys) → reduce (aggregate) → output. Colored key tokens flow through.
   ======================================================================== */
export function MapReducePipeline({ phase = 9 }) {
  const on = (n) => phase >= n
  const C = { big: 'var(--hv-blue)', data: 'var(--hv-teal)', analytics: 'var(--hv-orange)' }
  return (
    <svg className="hv-svg" viewBox="0 0 640 520" role="img" aria-label="MapReduce map, shuffle, sort, reduce pipeline">
      <Defs />
      {/* stage headers */}
      {[['Input', 64], ['Map', 194], ['Shuffle + Sort', 338], ['Reduce', 486], ['Output', 596]].map(([label, x], i) => (
        <text key={label} className={`hv-cap ${on(i) ? 'is-on' : ''}`} x={x} y="30" textAnchor="middle" fontSize="13" fontWeight="800" style={T}>{label}</text>
      ))}

      {/* INPUT split — tall block of records */}
      <g className={on(0) ? '' : 'hv-dim'}>
        <rect className="hv-box" x="14" y="60" width="100" height="404" rx="12" />
        <text className="hv-sub" x="64" y="88" textAnchor="middle" fontSize="10.5" style={T}>block B1</text>
        {['big data', 'big', 'analytics'].map((w, i) => (
          <g key={w + i}>
            <rect x="24" y={112 + i * 104} width="80" height="76" rx="9" fill="#f4f7fb" stroke="#d7e0ee" />
            <text x="64" y={156 + i * 104} textAnchor="middle" className="hv-title" fontSize="12.5" style={T}>{w}</text>
          </g>
        ))}
      </g>

      {/* MAP — two tall mappers spread vertically */}
      {[[96, 0], [296, 1]].map(([my, mi]) => (
        <g key={my} className={on(1) ? '' : 'hv-dim'}>
          <rect className="hv-box" x="140" y={my} width="108" height="150" rx="12" style={on(1) ? { stroke: '#b9ccff' } : undefined} />
          <text className="hv-title" x="194" y={my + 52} textAnchor="middle" fontSize="14" style={T}>{`Mapper ${mi + 1}`}</text>
          <text className="hv-sub" x="194" y={my + 80} textAnchor="middle" fontSize="11" style={T}>reads records</text>
          <text className="hv-sub" x="194" y={my + 102} textAnchor="middle" fontSize="11" style={T}>emit (word, 1)</text>
        </g>
      ))}
      {/* input -> map */}
      <Link x1={114} y1={180} x2={140} y2={171} dim={!on(1)} />
      <Link x1={114} y1={340} x2={140} y2={371} dim={!on(1)} />

      {/* emitted pairs map -> shuffle */}
      {on(2) && ['big', 'data', 'big', 'analytics'].map((w, i) => (
        <Packet key={`p${i}`} x={248} y={171 + (i % 2) * 200} dx={24} dy={i < 2 ? 100 : -100} color={C[w]} r={5.5} dur={2.2} delay={i * 0.3} square />
      ))}

      {/* SHUFFLE + SORT — tall panel, grouped keys spread */}
      <g className={on(3) ? '' : 'hv-dim'}>
        <rect className="hv-box" x="272" y="60" width="132" height="404" rx="12" />
        <text className="hv-sub" x="338" y="88" textAnchor="middle" fontSize="10.5" style={T}>same keys meet · sorted</text>
        {[['big', '[1,1]', 'big'], ['data', '[1]', 'data'], ['analytics', '[1]', 'analytics']].map(([k, v, c], i) => (
          <g key={k} className={on(4) ? '' : 'hv-dim'}>
            <rect x="286" y={112 + i * 104} width="104" height="76" rx="9" fill="#f4f7fb" stroke="#d7e0ee" />
            <circle cx="306" cy={140 + i * 104} r="6" fill={C[c]} />
            <text x="320" y={145 + i * 104} className="hv-title" fontSize="13" style={T}>{k}</text>
            <text x="300" y={172 + i * 104} className="hv-sub" fontSize="11.5" style={T}>{v}</text>
          </g>
        ))}
      </g>

      {/* shuffle -> reduce */}
      {on(5) && [0, 1].map((i) => (
        <Packet key={`sr${i}`} x={404} y={171 + i * 200} dx={28} dy={0} color={i === 0 ? C.big : C.data} r={5.5} dur={2} delay={i * 0.4} square />
      ))}

      {/* REDUCE — two tall reducers spread */}
      {[[96, 0], [296, 1]].map(([ry, ri]) => (
        <g key={ry} className={on(5) ? '' : 'hv-dim'}>
          <rect className="hv-box" x="432" y={ry} width="108" height="150" rx="12" style={on(5) ? { stroke: '#b9ccff' } : undefined} />
          <text className="hv-title" x="486" y={ry + 52} textAnchor="middle" fontSize="14" style={T}>{`Reducer ${ri + 1}`}</text>
          <text className="hv-sub" x="486" y={ry + 80} textAnchor="middle" fontSize="11" style={T}>groups a key</text>
          <text className="hv-sub" x="486" y={ry + 102} textAnchor="middle" fontSize="11" style={T}>sum values</text>
        </g>
      ))}

      {/* reduce -> output */}
      <Link x1={540} y1={171} x2={560} y2={228} dim={!on(6)} />
      <Link x1={540} y1={371} x2={560} y2={292} dim={!on(6)} />

      {/* OUTPUT — final counts */}
      <g className={on(6) ? '' : 'hv-dim'}>
        <rect className="hv-box" x="558" y="184" width="74" height="152" rx="12" fill="#eafaf2" stroke="#a9e6cd" />
        <text x="595" y="220" textAnchor="middle" className="hv-title" fontSize="14" fill="var(--hv-blue)" style={T}>big:2</text>
        <text x="595" y="252" textAnchor="middle" className="hv-title" fontSize="14" fill="var(--hv-teal)" style={T}>data:1</text>
        <text x="595" y="284" textAnchor="middle" className="hv-title" fontSize="13" fill="var(--hv-orange)" style={T}>anal:1</text>
        <text x="595" y="314" textAnchor="middle" className="hv-sub" fontSize="9.5" style={T}>→ HDFS</text>
      </g>
    </svg>
  )
}
