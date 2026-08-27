import {
  Callout,
  CodeTeach,
  ErrorCard,
  Flow,
  KV,
  LabGrid,
  LabStage,
  MapperNode,
  MatrixGrid,
  Recap,
  ReducerNode,
  ShuffleLane,
  Terminal,
  TitleHero,
  VivaList,
  slide,
  useDryRun,
} from '../LabKit'
import { MATRIX } from '../data'

const mapperLines = [
  'String[] t = line.split(",");',
  'if (t[0].equals("M")) {',
  '  for (int k = 0; k < p; k++) {',
  '    outputKey.set(t[1] + "," + k);',
  '    outputValue.set("M," + t[2] + "," + t[3]);',
  '    context.write(outputKey, outputValue);',
  '  }',
  '} else {',
  '  for (int i = 0; i < m; i++) {',
  '    outputKey.set(i + "," + t[2]);',
  '    outputValue.set("N," + t[1] + "," + t[3]);',
  '    context.write(outputKey, outputValue);',
  '  }',
  '}',
]

const reducerLines = [
  'HashMap<Integer,Float> hashA = new HashMap<>();',
  'HashMap<Integer,Float> hashB = new HashMap<>();',
  'for (Text val : values) {',
  '  String[] v = val.toString().split(",");',
  '  if (v[0].equals("M")) hashA.put(Integer.parseInt(v[1]), Float.parseFloat(v[2]));',
  '  else hashB.put(Integer.parseInt(v[1]), Float.parseFloat(v[2]));',
  '}',
  'float result = 0;',
  'for (int j = 0; j < n; j++)',
  '  result += hashA.getOrDefault(j, 0f) * hashB.getOrDefault(j, 0f);',
  'context.write(null, new Text(key + "," + result));',
]

function Title() {
  return (
    <LabStage>
      <TitleHero
        number="2"
        title="Matrix Multiplication using MapReduce"
        tech="Hadoop MapReduce"
        question="How can two small matrices be multiplied when each cell is just a line of text on HDFS?"
        chips={['m=2', 'n=2', 'p=2', 'MatMul']}
      />
    </LabStage>
  )
}

function Problem() {
  return (
    <LabStage>
      <p className="lab-lead">Ordinary matrix multiplication computes every result cell as a dot product of a row of M and a column of N. MapReduce must do the same work using keys, not nested loops in one JVM.</p>
      <LabGrid>
        <MatrixGrid label="M (2×2)" rows={MATRIX.M} />
        <MatrixGrid label="N (2×2)" rows={MATRIX.N} />
      </LabGrid>
      <Callout label="Goal">Emit C = M × N as lines `row,col,value` on HDFS.</Callout>
    </LabStage>
  )
}

function Reconstruct() {
  return (
    <LabStage>
      <p className="lab-lead">The input file is not a grid. Each line is `Name,row,col,value`. Rebuild the two matrices before touching Java.</p>
      <LabGrid cols={3}>
        <Terminal
          prompt="[cloudera@quickstart Desktop]$"
          lines={[
            { kind: 'cmd', text: 'hdfs dfs -cat /user/root/matin/matrix.txt' },
            ...MATRIX.inputLines.map((t) => ({ kind: 'out', text: t })),
          ]}
        />
        <MatrixGrid label="M" rows={MATRIX.M} />
        <MatrixGrid label="N" rows={MATRIX.N} />
      </LabGrid>
    </LabStage>
  )
}

function Ordinary() {
  const { step, bar } = useDryRun(4, { labels: MATRIX.cells.map((c) => c.label) })
  const cell = MATRIX.cells[step]
  return (
    <LabStage>
      <p className="lab-lead">Dry-run each result cell as school-level multiplication. MapReduce is only a distributed way to compute these four numbers.</p>
      <LabGrid cols={3}>
        <MatrixGrid label="M" rows={MATRIX.M} highlight={[Number(cell.key[0]), 0]} />
        <div className="lab-pane">
          <h3>{cell.label}</h3>
          <p>{cell.parts.join('  +  ')}</p>
          <p>{cell.values.join(' + ')} = <strong>{cell.result}</strong></p>
        </div>
        <MatrixGrid label="C so far" rows={MATRIX.C.map((row, r) => row.map((v, c) => (r * 2 + c <= step ? v : '·')))} highlight={[Number(cell.key[0]), Number(cell.key[2])]} />
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function WhyMR() {
  return (
    <LabStage>
      <p className="lab-lead">One machine can multiply 2×2 easily. The lab is teaching the pattern used when M and N are huge: send each input cell to every output coordinate that needs it.</p>
      <Flow items={['Input split', 'Mapper', 'Intermediate (i,k)', 'Shuffle', 'Reducer dot product', 'HDFS output']} />
      <Callout label="Key idea">The output coordinate `(i,k)` is the MapReduce key. All M row-i values and N column-k values meet at that reducer.</Callout>
    </LabStage>
  )
}

function FanOut() {
  const { step, bar } = useDryRun(3, { labels: ['M[0,0]=1 fans out', 'N[0,0]=5 fans out', 'Both target (0,0)'] })
  return (
    <LabStage>
      <p className="lab-lead">`M[i,j]` is sent to every result cell in row i. `N[j,k]` is sent to every result cell in column k.</p>
      <LabGrid cols={3}>
        <MapperNode hot={step === 0} label="M[0,0] = 1">
          <p>Needs every C in row 0.</p>
          <KV k="0,0" v="M,0,1" tone="teal" ghost={step < 0} />
          <KV k="0,1" v="M,0,1" tone="teal" />
        </MapperNode>
        <MapperNode hot={step === 1} label="N[0,0] = 5">
          <p>Needs every C in column 0.</p>
          <KV k="0,0" v="N,0,5" tone="amber" />
          <KV k="1,0" v="N,0,5" tone="amber" />
        </MapperNode>
        <ReducerNode hot={step >= 2} label="Reducer (0,0)">
          <p>Receives matching j indices and multiplies.</p>
          <KV k="M j=0" v="1" />
          <KV k="N j=0" v="5" />
        </ReducerNode>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function MapperCode() {
  return (
    <LabStage>
      <CodeTeach
        caption="MatrixMapper — fan-out"
        lines={mapperLines}
        highlight={[1, 2, 3, 4, 5]}
        what="If the line is from M, loop over every result column k and emit key (row, k) with value M,col,value."
        why="Row i of M is needed by every cell C[i,*]. The mapper copies the cell to each of those keys."
        data="M,0,0,1  →  keys 0,0 and 0,1  with value M,0,1"
      />
    </LabStage>
  )
}

function MapperCodeN() {
  return (
    <LabStage>
      <CodeTeach
        caption="MatrixMapper — N branch"
        lines={mapperLines}
        highlight={[7, 8, 9, 10, 11]}
        what="If the line is from N, loop over every result row i and emit key (i, col) with value N,row,value."
        why="Column k of N is needed by every cell C[*,k]."
        data="N,0,0,5  →  keys 0,0 and 1,0  with value N,0,5"
      />
    </LabStage>
  )
}

function MapperDry() {
  const records = MATRIX.inputLines
  const { step, bar } = useDryRun(records.length, { labels: records })
  const line = records[step]
  const [name, r, c, v] = line.split(',')
  const emits = name === 'M'
    ? [0, 1].map((k) => [`${r},${k}`, `M,${c},${v}`])
    : [0, 1].map((i) => [`${i},${c}`, `N,${r},${v}`])
  return (
    <LabStage>
      <p className="lab-lead">Step through each input line. Watch the mapper emit two intermediate pairs — because p = 2 and m = 2.</p>
      <LabGrid>
        <div>
          <p className="lab-lead" style={{ marginBottom: 8 }}>Input line</p>
          <KV k={name} v={`${r},${c} = ${v}`} tone={name === 'M' ? 'teal' : 'amber'} />
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {emits.map(([k, val]) => <KV key={k + val} k={k} v={val} />)}
          </div>
        </div>
        <CodeTeach
          lines={['String line = value.toString();', name === 'M' ? 'for (k = 0; k < p; k++) write((i,k), M,j,v);' : 'for (i = 0; i < m; i++) write((i,k), N,j,v);']}
          highlight={[1]}
          what="One input record becomes two output records."
          data={emits.map(([k, val]) => `(${k}) → ${val}`).join('   ')}
        />
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function ShuffleScene() {
  const { step, bar } = useDryRun(4, { labels: MATRIX.cells.map((c) => `Group ${c.key}`) })
  const cell = MATRIX.cells[step]
  const grouped = {
    '0,0': ['M,0,1', 'M,1,2', 'N,0,5', 'N,1,7'],
    '0,1': ['M,0,1', 'M,1,2', 'N,0,6', 'N,1,8'],
    '1,0': ['M,0,3', 'M,1,4', 'N,0,5', 'N,1,7'],
    '1,1': ['M,0,3', 'M,1,4', 'N,0,6', 'N,1,8'],
  }
  return (
    <LabStage>
      <p className="lab-lead">After map, Hadoop groups every pair that shares the same output coordinate. That grouping is shuffle and sort.</p>
      <ShuffleLane keys={['0,0', '0,1', '1,0', '1,1']} active={cell.key} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {grouped[cell.key].map((v) => <KV key={v} k={cell.key} v={v} tone={v.startsWith('M') ? 'teal' : 'amber'} />)}
      </div>
      {bar}
    </LabStage>
  )
}

function ReducerCode() {
  return (
    <LabStage>
      <CodeTeach
        caption="MatrixReducer — HashMaps then dot product"
        lines={reducerLines}
        highlight={[0, 1, 4, 5, 8, 9]}
        what="M values go into hashA keyed by j. N values go into hashB keyed by j. Then sum hashA[j] * hashB[j] for j = 0..n-1."
        why="The two HashMaps align the inner dimension j so each pair M[i,j] and N[j,k] can be multiplied."
        data="For key 0,0: hashA={0:1, 1:2}  hashB={0:5, 1:7}  →  1×5 + 2×7 = 19"
      />
    </LabStage>
  )
}

function ReducerDry() {
  const { step, bar } = useDryRun(4, { labels: MATRIX.cells.map((c) => `${c.label} → ${c.result}`) })
  const cell = MATRIX.cells[step]
  return (
    <LabStage>
      <p className="lab-lead">Each reducer task is one result cell. It multiplies matching j indices and writes `row,col,result`.</p>
      <LabGrid cols={3}>
        <ReducerNode hot label={`Key ${cell.key}`}>
          {cell.parts.map((p) => <div key={p}>{p}</div>)}
        </ReducerNode>
        <div className="lab-pane">
          <h3>Accumulate</h3>
          <p>{cell.values.join(' + ')}</p>
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{cell.result}.0</p>
        </div>
        <MatrixGrid
          label="C"
          rows={MATRIX.C.map((row, r) => row.map((v, c) => (r * 2 + c <= step ? `${v}.0` : '·')))}
          highlight={[Number(cell.key[0]), Number(cell.key[2])]}
        />
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function Driver() {
  return (
    <LabStage>
      <CodeTeach
        caption="Driver — matrix sizes live in Configuration"
        lines={[
          'Configuration conf = new Configuration();',
          'conf.set("m", "2");  // rows of M',
          'conf.set("n", "2");  // inner dimension',
          'conf.set("p", "2");  // columns of N',
          'Job job = Job.getInstance(conf, "MatrixMultiplication");',
          'job.setMapperClass(MatrixMapper.class);',
          'job.setReducerClass(MatrixReducer.class);',
          'FileInputFormat.addInputPath(job, new Path(args[0]));',
          'FileOutputFormat.setOutputPath(job, new Path(args[1]));',
        ]}
        highlight={[1, 2, 3]}
        what="m, n and p are broadcast to every mapper and reducer through Configuration."
        why="The mapper needs p (how many result columns) and m (how many result rows). The reducer needs n (how far to walk j)."
        data="This lab: M is 2×2, N is 2×2, so m = n = p = 2."
      />
    </LabStage>
  )
}

function Output() {
  return (
    <LabStage>
      <p className="lab-lead">The reducer writes a null key, so HDFS lines are just the text value. That matches the manual output file.</p>
      <LabGrid>
        <MatrixGrid label="C = M × N" rows={MATRIX.C} />
        <Terminal
          lines={[
            { kind: 'cmd', text: 'hdfs dfs -cat /user/root/matout/part-r-00000' },
            ...MATRIX.outputLines.map((t) => ({ kind: 'ok', text: t })),
          ]}
        />
      </LabGrid>
    </LabStage>
  )
}

function Procedure() {
  return (
    <LabStage>
      <p className="lab-lead">Input lives at `/user/root/matin/matrix.txt`. Output must be a new directory — Hadoop will not overwrite `matout`.</p>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'hdfs dfs -cat /user/root/matin/matrix.txt' },
          { kind: 'cmd', text: 'hadoop jar MatMul.jar MatMul /user/root/matin /user/root/matout' },
          { kind: 'cmd', text: 'hdfs dfs -ls /user/root/matout/' },
          { kind: 'out', text: '_SUCCESS' },
          { kind: 'out', text: 'part-r-00000' },
          { kind: 'cmd', text: 'hdfs dfs -cat /user/root/matout/part-r-00000' },
        ]}
      />
    </LabStage>
  )
}

function Errors() {
  return (
    <LabStage>
      <ErrorCard
        command="hadoop jar MatMul.jar MatMul /user/root/matin /user/root/matout"
        error="org.apache.hadoop.mapred.FileAlreadyExistsException: Output directory already exists"
        cause="MapReduce refuses to overwrite an output path. A previous run already created /user/root/matout."
        fix="hdfs dfs -rm -r /user/root/matout   then rerun the job, or choose a new output path."
      />
    </LabStage>
  )
}

function Viva() {
  return (
    <LabStage>
      <VivaList
        items={[
          { q: 'What is the role of the Mapper?', a: 'It fans each M or N cell out to every output coordinate that needs that cell.' },
          { q: 'Why is the output matrix coordinate used as a key?', a: 'So shuffle groups all factors of C[i,k] onto one reducer.' },
          { q: 'What happens during shuffle and sort?', a: 'All values with the same (i,k) key travel to the same reducer, sorted/grouped by key.' },
          { q: 'Why are HashMaps used in the Reducer?', a: 'To store M and N values indexed by the inner dimension j so they can be multiplied in order.' },
          { q: 'What does n represent?', a: 'The shared inner dimension: columns of M and rows of N.' },
          { q: 'What is the Mapper output?', a: 'Key = "i,k". Value = "M,j,v" or "N,j,v".' },
          { q: 'What is the Reducer output?', a: 'A single text line i,k,result — for example 0,0,19.0.' },
        ]}
      />
    </LabStage>
  )
}

function RecapSlide() {
  return (
    <LabStage>
      <Recap
        flow={['matrix.txt', 'Mapper fan-out', '(i,k) keys', 'Shuffle', 'Dot product', '19 22 / 43 50']}
        skills={[
          'Rebuild M and N from CSV lines',
          'Compute each C cell by hand',
          'Explain why M fans across a row',
          'Explain why N fans across a column',
          'Dry-run reducer HashMaps',
          'Read part-r-00000',
        ]}
      />
    </LabStage>
  )
}

export const program2Slides = [
  slide({ id: 'p2-title', hideTitle: true, kicker: 'Lab · Program 2', content: <Title /> }),
  slide({ id: 'p2-problem', kicker: 'Lab · Program 2', title: 'What are we trying to solve?', content: <Problem /> }),
  slide({ id: 'p2-input', kicker: 'Lab · Program 2', title: 'Input data is cells, not a printed matrix', content: <Reconstruct /> }),
  slide({ id: 'p2-ordinary', kicker: 'Lab · Program 2', title: 'Ordinary multiplication first', content: <Ordinary /> }),
  slide({ id: 'p2-why', kicker: 'Lab · Program 2', title: 'Connect the arithmetic to MapReduce', content: <WhyMR /> }),
  slide({ id: 'p2-fan', kicker: 'Lab · Program 2', title: 'Mapper emits toward result coordinates', content: <FanOut /> }),
  slide({ id: 'p2-map-m', kicker: 'Lab · Program 2', title: 'Mapper code — the M branch', content: <MapperCode /> }),
  slide({ id: 'p2-map-n', kicker: 'Lab · Program 2', title: 'Mapper code — the N branch', content: <MapperCodeN /> }),
  slide({ id: 'p2-map-dry', kicker: 'Lab · Program 2', title: 'Mapper dry run — one line at a time', content: <MapperDry /> }),
  slide({ id: 'p2-shuffle', kicker: 'Lab · Program 2', title: 'Shuffle groups by output cell', content: <ShuffleScene /> }),
  slide({ id: 'p2-red-code', kicker: 'Lab · Program 2', title: 'Reducer code — multiply then add', content: <ReducerCode /> }),
  slide({ id: 'p2-red-dry', kicker: 'Lab · Program 2', title: 'Reducer dry run — four cells', content: <ReducerDry /> }),
  slide({ id: 'p2-driver', kicker: 'Lab · Program 2', title: 'Driver — m, n and p', content: <Driver /> }),
  slide({ id: 'p2-out', kicker: 'Lab · Program 2', title: 'Final output', content: <Output /> }),
  slide({ id: 'p2-run', kicker: 'Lab · Program 2', title: 'Commands and procedure', content: <Procedure /> }),
  slide({ id: 'p2-err', kicker: 'Lab · Program 2', title: 'Common lab errors', content: <Errors /> }),
  slide({ id: 'p2-viva', kicker: 'Lab · Program 2', title: 'Viva check', content: <Viva /> }),
  slide({ id: 'p2-recap', kicker: 'Lab · Program 2', title: 'Program recap', content: <RecapSlide /> }),
]
