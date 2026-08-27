import {
  Scene,
  Neuron,
  WeightedEdge,
  ActivationPulse,
  LayerPlane,
  TensorBlock,
  FeatureMap,
  KernelWindow,
  GradientPacket,
  LossMeter,
  WeightUpdater,
  OptimizationPoint,
  SequenceToken,
  HiddenState,
  PredictionPanel,
  TrainingEpoch,
  SoftCard,
  ArrowFlow,
  FormulaStrip,
  Title,
  Label,
  DL,
} from './DlLivingKit.jsx'

const flow = 'dl-anim-flow'
const pulse = 'dl-anim-pulse'
const rise = 'dl-anim-rise'
const scan = 'dl-anim-scan'
const drift = 'dl-anim-drift'
const glow = 'dl-anim-glow'

const palette = [DL.blue, DL.teal, DL.purple, DL.amber, DL.green, DL.indigo, DL.red]

function Sub({ children, x, y, anchor = 'middle', size = 14, fill = DL.muted }) {
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight="700">{children}</text>
}

function Curve({ d, color = DL.blue, width = 5, dashed = false, className = flow, fill = 'none', opacity = 1 }) {
  return (
    <path
      className={className}
      d={d}
      fill={fill}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? '12 10' : undefined}
      opacity={opacity}
    />
  )
}

function Axis({ x = 110, y = 420, w = 680, h = 270, xLabel = 'x1', yLabel = 'x2' }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={DL.navy} strokeWidth="4" />
      <line x1={x} y1={y} x2={x} y2={y - h} stroke={DL.navy} strokeWidth="4" />
      <Label x={x + w + 34} y={y + 6} fill={DL.muted} size="16">{xLabel}</Label>
      <Label x={x - 26} y={y - h - 18} fill={DL.muted} size="16">{yLabel}</Label>
    </g>
  )
}

function Dot({ x, y, color = DL.blue, label, r = 13, className = drift }) {
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={r} fill={color} stroke="#fff" strokeWidth="4" />
      {label ? <Label x={x} y={y + 5} fill="#fff" size="12">{label}</Label> : null}
    </g>
  )
}

function MiniNetwork({ x = 90, y = 95, layers = [3, 5, 3, 2], gap = 170, labels = ['input', 'hidden', 'hidden', 'output'], colors = palette }) {
  const nodes = layers.map((count, i) => {
    const step = Math.min(58, 230 / Math.max(1, count - 1))
    const top = y + 160 - (step * (count - 1)) / 2
    return Array.from({ length: count }, (_, j) => ({
      x: x + i * gap,
      y: top + j * step,
      id: `${i}-${j}`,
      color: colors[i % colors.length],
    }))
  })

  return (
    <g>
      {nodes.slice(0, -1).map((layer, i) => layer.flatMap((a) => nodes[i + 1].map((b) => (
        <line key={`${a.id}-${b.id}`} x1={a.x + 19} y1={a.y} x2={b.x - 19} y2={b.y} stroke={i === nodes.length - 2 ? DL.purple : DL.soft} strokeWidth="3" opacity=".72" />
      ))))}
      {nodes.map((layer, i) => (
        <g key={i}>
          {layer.map((n, j) => <Neuron key={n.id} x={n.x} y={n.y} r={j === 0 && i === layer.length - 1 ? 22 : 18} color={n.color} label={j === 0 && i === layer.length - 1 ? 'y' : ''} />)}
          {labels[i] ? <Sub x={x + i * gap} y={y + 342}>{labels[i]}</Sub> : null}
        </g>
      ))}
    </g>
  )
}

function StageRail({ title, subtitle, steps, formula, color = DL.blue }) {
  const items = steps.slice(0, 6)
  const gap = 780 / Math.max(1, items.length - 1)
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      {subtitle ? <Sub x="480" y="91" size="18">{subtitle}</Sub> : null}
      <path d="M85 296 C190 144 302 353 418 236 S632 124 835 273" fill="none" stroke={DL.soft} strokeWidth="20" strokeLinecap="round" />
      <path d="M85 296 C190 144 302 353 418 236 S632 124 835 273" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray="14 12" className={flow} />
      {items.map((step, i) => {
        const x = 90 + i * gap
        const y = 270 + Math.sin(i * 1.25) * 82
        return (
          <g key={step.title || step}>
            <SoftCard x={x - 60} y={y - 45} w="120" h="90" title={step.title || step} sub={step.sub} color={step.color || palette[i % palette.length]} />
            <ActivationPulse x={x} y={y - 62} color={step.color || palette[i % palette.length]} label={i + 1} />
          </g>
        )
      })}
      {formula ? <FormulaStrip>{formula}</FormulaStrip> : null}
    </Scene>
  )
}

function CompareScene({ title, leftTitle, rightTitle, leftSub, rightSub, leftColor = DL.blue, rightColor = DL.purple, formula, variant = 'split' }) {
  const midY = variant === 'high' ? 174 : 196
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      <SoftCard x="70" y="110" w="340" h="285" title={leftTitle} sub={leftSub} color={leftColor} />
      <SoftCard x="550" y="110" w="340" h="285" title={rightTitle} sub={rightSub} color={rightColor} />
      <ArrowFlow x1="164" y1={midY + 48} x2="316" y2={midY + 48} color={leftColor} />
      <Neuron x="146" y={midY + 48} r="20" color={leftColor} label="x" />
      <Neuron x="335" y={midY + 48} r="20" color={DL.green} label="y" />
      <Neuron x="632" y={midY + 18} r="20" color={rightColor} label="h" />
      <Neuron x="810" y={midY + 18} r="20" color={DL.green} label="y" />
      <ArrowFlow x1="654" y1={midY + 18} x2="788" y2={midY + 18} color={rightColor} />
      <Curve d={`M810 ${midY + 70} C900 ${midY + 45} 900 ${midY - 35} 810 ${midY - 10}`} color={DL.amber} dashed={variant !== 'split'} />
      {formula ? <FormulaStrip color={DL.indigo}>{formula}</FormulaStrip> : null}
    </Scene>
  )
}

function ConceptCardsScene({ title, cards, formula, center, color = DL.teal }) {
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      {center ? <Neuron x="480" y="252" r="46" color={color} label={center} className={glow} /> : null}
      {cards.slice(0, 6).map((card, i) => {
        const a = (Math.PI * 2 * i) / Math.min(6, cards.length) - Math.PI / 2
        const x = center ? 480 + Math.cos(a) * 280 : 76 + (i % 3) * 288
        const y = center ? 252 + Math.sin(a) * 150 : 122 + Math.floor(i / 3) * 170
        return (
          <g key={card.title}>
            {center ? <line x1="480" y1="252" x2={x} y2={y} stroke={DL.soft} strokeWidth="4" /> : null}
            <SoftCard x={x - 96} y={y - 48} w="192" h="96" title={card.title} sub={card.sub} color={card.color || palette[i % palette.length]} />
          </g>
        )
      })}
      {formula ? <FormulaStrip>{formula}</FormulaStrip> : null}
    </Scene>
  )
}

function PlaneScene({ title, mode = 'separable', formula, note }) {
  const green = [[165, 358], [218, 320], [260, 380], [180, 270]]
  const red = [[615, 188], [680, 235], [725, 156], [630, 305]]
  const xor = [[200, 368, DL.red, '0'], [200, 180, DL.green, '1'], [650, 368, DL.green, '1'], [650, 180, DL.red, '0']]
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      <Axis />
      {mode === 'xor'
        ? xor.map(([x, y, c, label]) => <Dot key={`${x}-${y}`} x={x} y={y} color={c} label={label} r="18" />)
        : (
          <>
            {green.map(([x, y], i) => <Dot key={`g${i}`} x={x} y={y} color={DL.green} label="+" />)}
            {red.map(([x, y], i) => <Dot key={`r${i}`} x={x} y={y} color={DL.red} label="-" />)}
          </>
        )}
      {mode === 'multi'
        ? (
          <>
            <Curve d="M230 420 L620 150" color={DL.green} width="6" />
            <Curve d="M285 420 L690 144" color={DL.amber} width="4" dashed />
            <Curve d="M170 420 L560 138" color={DL.purple} width="4" dashed />
          </>
        )
        : <Curve d={mode === 'xor' ? 'M155 310 L714 224' : 'M260 420 L650 132'} color={mode === 'xor' ? DL.red : DL.purple} width="7" dashed={mode === 'xor'} />}
      {mode === 'xor' ? <Label x="480" y="126" fill={DL.red}>one line cannot isolate diagonal positives</Label> : null}
      {note ? <SoftCard x="620" y="58" w="245" h="70" title={note} color={DL.amber} /> : null}
      {formula ? <FormulaStrip>{formula}</FormulaStrip> : null}
    </Scene>
  )
}

function OptimizationScene({ title, mode = 'gd', formula }) {
  const contours = Array.from({ length: 7 }, (_, i) => ({ rx: 340 - i * 38, ry: mode === 'ill' ? 130 - i * 12 : 180 - i * 19, op: 0.16 + i * 0.07 }))
  const path = {
    gd: 'M735 136 C670 176 610 218 552 250 S430 328 360 386',
    ill: 'M224 180 L338 356 L420 176 L500 326 L590 210 L662 286 L720 238',
    plateau: 'M130 178 C260 266 330 326 470 332 H690 C760 328 802 264 842 180',
    saddle: 'M130 370 C280 178 410 220 480 272 C540 318 660 292 820 162',
    local: 'M120 220 C230 80 275 438 382 318 S552 94 648 318 S770 452 842 160',
    flat: 'M120 180 C230 250 290 326 420 330 H650 C745 326 790 245 840 176',
  }[mode] || 'M735 136 C670 176 610 218 552 250 S430 328 360 386'

  return (
    <Scene title={title}>
      <Title>{title}</Title>
      <g transform={mode === 'ill' ? 'rotate(-13 480 260)' : undefined}>
        {contours.map((c, i) => <ellipse key={i} cx="480" cy="272" rx={c.rx} ry={c.ry} fill="none" stroke={mode === 'saddle' ? DL.purple : DL.indigo} strokeWidth="4" opacity={c.op} />)}
      </g>
      <Curve d={path} color={mode === 'local' ? DL.purple : mode === 'plateau' ? DL.amber : DL.green} width="7" dashed={mode === 'ill' || mode === 'plateau'} />
      {mode === 'local' ? <><OptimizationPoint x="382" y="318" label="L" color={DL.amber} /><OptimizationPoint x="648" y="318" label="G" color={DL.green} /></> : null}
      {mode === 'saddle' ? <OptimizationPoint x="480" y="272" label="S" color={DL.amber} /> : null}
      {mode === 'plateau' || mode === 'flat' ? <Label x="600" y="306" fill={DL.amber}>tiny gradient</Label> : null}
      {formula ? <FormulaStrip>{formula}</FormulaStrip> : null}
    </Scene>
  )
}

function CnnMatrixScene({ title, mode = 'conv', formula }) {
  const imageHot = [1, 2, 7, 12, 17, 22, 18, 24]
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      {mode === 'pipeline'
        ? (
          <>
            <TensorBlock x="70" y="170" w="90" h="130" depth={3} label="image volume" color={DL.blue} />
            <ArrowFlow x1="230" y1="235" x2="315" y2="235" color={DL.amber} />
            <TensorBlock x="325" y="150" w="86" h="120" depth={5} label="conv maps" color={DL.teal} />
            <ArrowFlow x1="500" y1="235" x2="585" y2="235" color={DL.amber} />
            <TensorBlock x="600" y="175" w="76" h="96" depth={4} label="pooled" color={DL.purple} />
            <ArrowFlow x1="742" y1="235" x2="820" y2="235" color={DL.green} />
            <PredictionPanel x="800" y="185" value="class" label="prediction" />
          </>
        )
        : (
          <>
            <FeatureMap x="82" y="130" rows={5} cols={5} cell={42} hot={imageHot} color={DL.blue} />
            <KernelWindow x={mode === 'stride' ? 166 : 124} y={mode === 'stride' ? 214 : 172} size="122" label={mode === 'pool' ? '2x2' : '3x3'} color={DL.amber} />
            <ArrowFlow x1="330" y1="235" x2="430" y2="235" color={DL.amber} />
            <FeatureMap x="438" y="172" rows={3} cols={3} cell={42} values={mode === 'math' ? ['2', '-1', '3', '0', '5', '1', '2', '4', '6'] : []} hot={[0, 1, 4, 8]} color={DL.purple} />
            <ArrowFlow x1="598" y1="235" x2="708" y2="235" color={DL.teal} />
            <FeatureMap x="720" y="152" rows={4} cols={4} cell={38} hot={mode === 'pool' ? [0, 1, 4, 5] : [0, 1, 5, 10, 15]} color={DL.teal} />
            <Label x="184" y="382" fill={DL.blue}>{mode === 'pool' ? 'activation map' : 'input image'}</Label>
            <Label x="506" y="382" fill={DL.purple}>{mode === 'math' ? 'multiply + sum' : 'shared kernel'}</Label>
            <Label x="795" y="382" fill={DL.teal}>{mode === 'pool' ? 'pooled map' : 'feature map'}</Label>
          </>
        )}
      {formula ? <FormulaStrip>{formula}</FormulaStrip> : null}
    </Scene>
  )
}

function SequenceScene({ title, mode = 'rnn', formula }) {
  const xs = [150, 320, 490, 660, 830]
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      {mode === 'domains'
        ? (
          <ConceptCardsScene title={title} center="order" cards={[
            { title: 'text', sub: 'word order', color: DL.blue },
            { title: 'audio', sub: 'time signal', color: DL.teal },
            { title: 'markets', sub: 'time series', color: DL.amber },
            { title: 'trees', sub: 'structure', color: DL.purple },
          ]} />
        )
        : (
          <>
            {xs.map((x, i) => (
              <g key={i}>
                <SequenceToken x={x - 34} y="340" text={`x${i + 1}`} color={DL.blue} />
                <HiddenState x={x} y="250" label={mode === 'lstm' ? 'cell' : `h${i + 1}`} color={mode === 'lstm' ? DL.indigo : DL.teal} />
                {mode !== 'memory' ? <PredictionPanel x={x - 55} y="112" value={mode === 'io' && i < 3 ? '' : `y${i + 1}`} label={mode === 'io' ? (i === 4 ? 'many-to-one' : 'output') : 'output'} color={DL.green} /> : null}
                <ArrowFlow x1={x} y1="340" x2={x} y2="278" color={DL.blue} width="4" />
                {mode !== 'memory' ? <ArrowFlow x1={x} y1="222" x2={x} y2="200" color={DL.green} width="4" /> : null}
                {i < xs.length - 1 ? <ArrowFlow x1={x + 30} y1="250" x2={xs[i + 1] - 32} y2="250" color={DL.indigo} dashed={mode === 'bptt'} /> : null}
              </g>
            ))}
            {mode === 'bptt' ? xs.slice(1).reverse().map((x, i) => <GradientPacket key={x} x={x - 42} y={420 - i * 18} label="grad" />) : null}
            {mode === 'memory' ? <Curve d="M128 320 C285 470 675 470 850 320" color={DL.amber} dashed /> : null}
            {mode === 'lstm' ? <Curve d="M115 208 H865" color={DL.green} width="9" /> : null}
          </>
        )}
      {formula ? <FormulaStrip>{formula}</FormulaStrip> : null}
    </Scene>
  )
}

function LstmGateDiagram({ title = 'LSTM gates control memory', compact = false }) {
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      <rect x="125" y="120" width="710" height="260" rx="34" fill="var(--dl-glass)" stroke={DL.indigo} strokeWidth="4" style={{ filter: 'var(--dl-shadow)' }} />
      <Curve d="M158 188 H804" color={DL.green} width="10" />
      <Label x="480" y="172" fill={DL.green}>cell state: long-term memory highway</Label>
      {[
        ['forget', DL.red, 'erase?'],
        ['input', DL.blue, 'write?'],
        ['candidate', DL.purple, 'new content'],
        ['output', DL.amber, 'reveal?'],
      ].map(([name, color, sub], i) => (
        <SoftCard key={name} x={174 + i * 152} y={compact ? 245 : 238} w="126" h="82" title={name} sub={sub} color={color} className={i % 2 ? pulse : glow} />
      ))}
      <ArrowFlow x1="58" y1="320" x2="125" y2="320" color={DL.blue} label="x_t,h_{t-1}" />
      <ArrowFlow x1="835" y1="320" x2="902" y2="320" color={DL.green} label="h_t" />
      <FormulaStrip>f_t, i_t, o_t are learned gates in [0,1]</FormulaStrip>
    </Scene>
  )
}

export function SceneModuleOpener({ steps = ['DATA', 'NEURON', 'NETWORK', 'LOSS', 'UPDATE', 'PREDICT'], module = 'DL' }) {
  return <StageRail title={`${module} learning journey`} subtitle="watch information become computation" steps={steps.map((s, i) => ({ title: s, color: palette[i % palette.length] }))} formula="data → representation → loss → better weights" color={DL.blue} />
}

export function SceneJourneyMap({ items = ['Define', 'Draw', 'Compute', 'Train', 'Diagnose', 'Apply'] }) {
  return <ConceptCardsScene title="Journey map" center="DL" cards={items.map((title, i) => ({ title, sub: `checkpoint ${i + 1}`, color: palette[i % palette.length] }))} />
}

export function SceneExamCards() {
  return <ConceptCardsScene title="Exam answer cards" cards={[
    { title: 'Define', sub: 'state the model' },
    { title: 'Draw', sub: 'show signal flow' },
    { title: 'Equation', sub: 'name variables' },
    { title: 'Algorithm', sub: 'show updates' },
    { title: 'Limit', sub: 'when it fails' },
    { title: 'Compare', sub: 'choose the right tool' },
  ]} formula="good answer = definition + diagram + equation + consequence" />
}

export function SceneVocabMap() {
  return <ConceptCardsScene title="Vocabulary map" center="terms" cards={[
    { title: 'weights', sub: 'learned influence' },
    { title: 'bias', sub: 'shift threshold' },
    { title: 'activation', sub: 'nonlinear gate' },
    { title: 'loss', sub: 'error signal' },
    { title: 'gradient', sub: 'direction to change' },
    { title: 'epoch', sub: 'one data pass' },
  ]} />
}

export function SceneCoverageGrid() {
  return <ConceptCardsScene title="Coverage grid" cards={['Neuron', 'Perceptron', 'MLP', 'Backprop', 'Regularize', 'Optimize'].map((title, i) => ({ title, sub: i % 2 ? 'derive + explain' : 'diagram + use', color: palette[i] }))} />
}

export function SceneBookPanel() {
  return <ConceptCardsScene title="Book panel" cards={[
    { title: 'Definition', sub: 'copy exact condition' },
    { title: 'Figure', sub: 'redraw cleanly' },
    { title: 'Formula', sub: 'state symbols' },
    { title: 'Example', sub: 'one worked case' },
  ]} formula="read → redraw → explain without looking" />
}

export function SceneActivityBoard({ kind = 'boundary' }) {
  const cards = {
    boundary: ['plot points', 'try a line', 'test mistakes', 'shift boundary'],
    xor: ['mark XOR', 'try one line', 'add hidden split', 'combine regions'],
    cnn: ['choose kernel', 'slide window', 'predict map', 'name prior'],
    match: ['read task', 'find structure', 'choose model', 'justify'],
  }[kind] || ['observe', 'predict', 'test', 'explain']
  return <StageRail title="Class activity board" subtitle={kind} steps={cards.map((title, i) => ({ title, color: palette[i] }))} />
}

export function SceneRevisionChain({ steps = ['data', 'model', 'loss', 'gradient', 'update', 'generalize'] }) {
  return <StageRail title="Revision chain" steps={steps.map((title, i) => ({ title, color: palette[i] }))} color={DL.green} />
}

export function SceneNnDefinition() {
  return (
    <Scene title="Neural network definition">
      <Title>Neural network = weighted adaptive signal system</Title>
      <MiniNetwork x="125" y="95" layers={[3, 4, 3, 2]} gap={220} labels={['data', 'weighted sums', 'representations', 'prediction']} />
      <FormulaStrip>network learns weights so outputs fit examples</FormulaStrip>
    </Scene>
  )
}

export function SceneBrainBridge() {
  return (
    <Scene title="Biology metaphor to artificial neuron">
      <Title>Brain metaphor → artificial computation</Title>
      <Curve d="M95 264 C138 130 278 118 318 224 C356 323 248 405 144 358 C100 338 78 302 95 264" color={DL.teal} width="6" />
      {[[92, 262], [128, 158], [170, 388], [260, 142], [270, 360]].map(([x, y], i) => <Curve key={i} d={`M${x} ${y} q${i % 2 ? 82 : -70} ${i < 2 ? -66 : 64} ${i % 2 ? 150 : -128} ${i < 2 ? -74 : 78}`} color={DL.teal} width="4" />)}
      <Neuron x="215" y="266" r="45" color={DL.teal} label="soma" sub="collects signals" />
      <ArrowFlow x1="326" y1="266" x2="450" y2="266" color={DL.amber} />
      <SoftCard x="480" y="110" w="160" h="80" title="inputs x" sub="dendrites" color={DL.blue} />
      <SoftCard x="480" y="220" w="160" h="80" title="sum + bias" sub="soma" color={DL.teal} />
      <SoftCard x="480" y="330" w="160" h="80" title="output y" sub="axon" color={DL.green} />
      <WeightedEdge x1="650" y1="150" x2="784" y2="230" weight="w1" />
      <WeightedEdge x1="650" y1="260" x2="784" y2="260" weight="w2" />
      <WeightedEdge x1="650" y1="370" x2="784" y2="292" weight="w3" />
      <Neuron x="820" y="260" r="38" color={DL.purple} label="phi" sub="learned unit" />
    </Scene>
  )
}

export function SceneNeuronExploded() {
  return (
    <Scene title="Neuron exploded computation">
      <Title>One neuron: x*w → sum → bias → phi → y</Title>
      {[
        ['x1=.7', 96, 132, DL.blue, 'w1=.4'],
        ['x2=.2', 96, 246, DL.blue, 'w2=-.8'],
        ['x3=.9', 96, 360, DL.blue, 'w3=.6'],
      ].map(([label, x, y, color, w], i) => (
        <g key={label}>
          <Neuron x={x} y={y} r="28" color={color} label={label} />
          <WeightedEdge x1={128} y1={y} x2={256} y2={246} weight={w} color={DL.purple} />
          <ActivationPulse x={185 + i * 10} y={y + (246 - y) * 0.5} color={i === 1 ? DL.red : DL.blue} label="x*w" />
        </g>
      ))}
      <SoftCard x="248" y="188" w="150" h="116" title="sum" sub="0.28 - .16 + .54" color={DL.teal} />
      <ArrowFlow x1="402" y1="246" x2="496" y2="246" color={DL.teal} />
      <SoftCard x="502" y="188" w="126" h="116" title="+ b" sub="+0.10" color={DL.amber} />
      <ArrowFlow x1="630" y1="246" x2="700" y2="246" color={DL.amber} />
      <Neuron x="744" y="246" r="40" color={DL.indigo} label="phi" sub="activation" />
      <ArrowFlow x1="786" y1="246" x2="850" y2="246" color={DL.green} />
      <PredictionPanel x="812" y="322" value="0.68" label="output y" color={DL.green} />
      <FormulaStrip>y = phi(sum_i x_i w_i + b)</FormulaStrip>
    </Scene>
  )
}

export function SceneNeuronEquation() {
  return (
    <Scene title="Neuron equation linked to parts">
      <Title>Every symbol has a place in the diagram</Title>
      <FormulaStrip x="80" y="90" w="800" h="70" color={DL.indigo}>y = phi( w1x1 + w2x2 + w3x3 + b )</FormulaStrip>
      <Neuron x="140" y="285" r="28" color={DL.blue} label="x" sub="features" />
      <SoftCard x="260" y="238" w="145" h="94" title="w*x" sub="weighted inputs" color={DL.purple} />
      <Neuron x="500" y="285" r="42" color={DL.teal} label="sum" sub="combine" />
      <Neuron x="622" y="210" r="28" color={DL.amber} label="b" sub="shift" />
      <Neuron x="710" y="285" r="38" color={DL.indigo} label="phi" sub="nonlinear" />
      <PredictionPanel x="802" y="238" value="y" label="answer" />
      <ArrowFlow x1="172" y1="285" x2="260" y2="285" color={DL.blue} label="x_i" />
      <ArrowFlow x1="405" y1="285" x2="456" y2="285" color={DL.purple} label="w_i" />
      <ArrowFlow x1="540" y1="285" x2="672" y2="285" color={DL.teal} label="z" />
      <ArrowFlow x1="622" y1="238" x2="565" y2="267" color={DL.amber} label="+b" />
      <ArrowFlow x1="750" y1="285" x2="802" y2="285" color={DL.green} />
    </Scene>
  )
}

export function SceneActivationCurves() {
  return (
    <Scene title="Activation curves">
      <Title>Activation functions reshape the signal</Title>
      {[
        ['sigmoid', 70, DL.blue, 'M95 330 C175 326 212 168 310 164 C375 164 395 156 430 150'],
        ['tanh', 350, DL.purple, 'M375 330 C432 330 460 160 535 160 C610 160 630 112 710 110'],
        ['ReLU', 630, DL.green, 'M655 330 L760 330 L875 136'],
      ].map(([name, x, color, d]) => (
        <g key={name}>
          <line x1={x} y1="330" x2={x + 250} y2="330" stroke={DL.navy} strokeWidth="3" />
          <line x1={x + 35} y1="365" x2={x + 35} y2="125" stroke={DL.navy} strokeWidth="3" />
          <Curve d={d} color={color} width="7" />
          <Label x={x + 125} y="410" fill={color}>{name}</Label>
        </g>
      ))}
      <FormulaStrip>nonlinearity lets layers bend decision boundaries</FormulaStrip>
    </Scene>
  )
}

export function SceneDirectedGraph() {
  return (
    <Scene title="Directed weighted graph">
      <Title>Neural networks are directed weighted graphs</Title>
      <MiniNetwork x="120" y="90" layers={[2, 3, 2, 1]} gap={220} labels={['input', 'hidden', 'hidden', 'output']} />
      <WeightedEdge x1="140" y1="191" x2="340" y2="142" weight="+.8" />
      <WeightedEdge x1="140" y1="307" x2="340" y2="250" weight="-.3" />
      <WeightedEdge x1="360" y1="365" x2="560" y2="307" weight="+1.1" color={DL.green} />
      <FormulaStrip>nodes hold activations; arrows carry weighted signals</FormulaStrip>
    </Scene>
  )
}

export function SceneFeedbackCompare() {
  return <CompareScene title="Feedforward vs feedback networks" leftTitle="Feedforward" leftSub="signal moves once left to right" rightTitle="Feedback" rightSub="state loops back and changes next step" formula="feedforward: acyclic inference | feedback: recurrent state" variant="loop" />
}

export function SceneArchOverview() {
  return <ConceptCardsScene title="Architecture overview" cards={[
    { title: 'Single layer', sub: 'linear boundary', color: DL.blue },
    { title: 'Multilayer', sub: 'hidden features', color: DL.teal },
    { title: 'Recurrent', sub: 'memory over time', color: DL.indigo },
  ]} formula="architecture chooses what structure the computation can express" />
}

export function SceneArchSingle() {
  return <PlaneScene title="Single-layer architecture: one linear cut" mode="separable" formula="y = step(w dot x + b)" />
}

export function SceneArchMulti() {
  return (
    <Scene title="Multilayer architecture adds hidden representations">
      <Title>Multilayer: hidden layers transform the space</Title>
      {[0, 1, 2].map((i) => <LayerPlane key={i} x={130 + i * 230} y={128 - i * 20} w="140" h="250" label={['input space', 'hidden space', 'output space'][i]} color={palette[i]} />)}
      <ArrowFlow x1="292" y1="242" x2="372" y2="218" color={DL.amber} />
      <ArrowFlow x1="522" y1="218" x2="602" y2="198" color={DL.amber} />
      <FormulaStrip>hidden layers make new coordinates where the answer is simpler</FormulaStrip>
    </Scene>
  )
}

export function ScenePerceptronHero() {
  return <StageRail title="Perceptron: trainable binary classifier" steps={[
    { title: 'features x', color: DL.blue },
    { title: 'w dot x + b', color: DL.purple },
    { title: 'threshold', color: DL.amber },
    { title: 'class 0/1', color: DL.green },
  ]} formula="if w dot x + b >= 0 then class 1 else class 0" />
}

export function ScenePerceptronMath() {
  return <StageRail title="Perceptron math stage" steps={[
    { title: 'dot product', sub: 'w^T x', color: DL.purple },
    { title: 'add bias', sub: 'shift line', color: DL.amber },
    { title: 'sign', sub: 'choose side', color: DL.green },
  ]} formula="y = sign(w^T x + b)" />
}

export function SceneDecisionPlane() {
  return <PlaneScene title="Decision plane: w dot x + b = 0" mode="separable" formula="points on one side → +1, other side → -1" />
}

export function ScenePerceptronUpdate() {
  return <StageRail title="Perceptron update only after a mistake" steps={[
    { title: 'predict', color: DL.blue },
    { title: 'compare d-y', color: DL.red },
    { title: 'move w', color: DL.amber },
    { title: 'retry', color: DL.green },
  ]} formula="w <- w + eta(d-y)x , b <- b + eta(d-y)" />
}

export function ScenePerceptronLoop() {
  return <StageRail title="Perceptron training loop" steps={['sample', 'score', 'threshold', 'mistake?', 'update', 'next epoch'].map((title, i) => ({ title, color: palette[i] }))} formula="repeat until no mistakes or limit reached" />
}

export function SceneConvergence() {
  return <PlaneScene title="Convergence condition: linear separability" mode="separable" note="stable separator" formula="if separable, perceptron converges in finite updates" />
}

export function SceneConvergenceNuance() {
  return <PlaneScene title="Convergence nuance: many valid separators" mode="multi" note="not necessarily best" formula="perceptron finds a separator, not the maximum-margin separator" />
}

export function SceneNonseparable() {
  return <PlaneScene title="Nonseparable data keeps causing mistakes" mode="xor" formula="no single line can solve this pattern" />
}

export function SceneBayesIntro() {
  return <ConceptCardsScene title="Bayes classifier chooses maximum posterior" center="P(C|x)" cards={[
    { title: 'class A', sub: '0.72', color: DL.green },
    { title: 'class B', sub: '0.21', color: DL.blue },
    { title: 'class C', sub: '0.07', color: DL.amber },
  ]} formula="choose class argmax_c P(c | x)" />
}

export function SceneBayesGaussian() {
  return (
    <Scene title="Gaussian Bayes boundary">
      <Title>Gaussian Bayes: densities meet at a boundary</Title>
      <Axis x="95" y="420" w="760" h="260" xLabel="feature" yLabel="density" />
      <path d="M115 420 C170 408 225 172 305 172 C385 172 420 408 478 420" fill={DL.blue} opacity=".18" stroke={DL.blue} strokeWidth="6" />
      <path d="M372 420 C442 404 488 188 585 188 C678 188 720 406 838 420" fill={DL.red} opacity=".16" stroke={DL.red} strokeWidth="6" />
      <Curve d="M480 420 L480 132" color={DL.green} width="6" />
      <Label x="480" y="112" fill={DL.green}>Bayes boundary</Label>
      <FormulaStrip>equal covariance Gaussians can produce a linear boundary</FormulaStrip>
    </Scene>
  )
}

export function SceneBayesVsPerceptron() {
  return <CompareScene title="Bayes vs perceptron" leftTitle="Bayes" leftSub="asks which class is most probable" rightTitle="Perceptron" rightSub="asks which side of a learned line" leftColor={DL.green} rightColor={DL.purple} formula="probabilistic decision vs discriminative linear rule" />
}

export function SceneAndXor() {
  return (
    <Scene title="AND is separable, XOR is not">
      <Title>AND vs XOR motivates hidden layers</Title>
      <g transform="translate(-30 0) scale(.78)"><PlaneScene title="AND" mode="separable" /></g>
      <g transform="translate(455 0) scale(.78)"><PlaneScene title="XOR" mode="xor" /></g>
      <FormulaStrip>AND: one line works | XOR: needs composed hidden regions</FormulaStrip>
    </Scene>
  )
}

export function SceneMlpNeed() {
  return <CompareScene title="Why MLP? one line fails, hidden features help" leftTitle="single line" leftSub="limited geometry" rightTitle="hidden layer" rightSub="two learned cuts compose a curve" leftColor={DL.red} rightColor={DL.teal} formula="hidden units create intermediate features" />
}

export function SceneMlpGraph() {
  return (
    <Scene title="MLP layered computation graph">
      <Title>MLP: layered graph of differentiable units</Title>
      <MiniNetwork x="105" y="80" layers={[4, 6, 5, 2]} gap={240} labels={['input x', 'hidden a1', 'hidden a2', 'output y']} />
      <FormulaStrip>each layer transforms activations for the next layer</FormulaStrip>
    </Scene>
  )
}

export function SceneMlpLayerEq() {
  return <StageRail title="Layer equation" steps={[
    { title: 'a^(l-1)', color: DL.blue },
    { title: 'W a + b', color: DL.purple },
    { title: 'phi', color: DL.indigo },
    { title: 'a^(l)', color: DL.green },
  ]} formula="a^(l) = phi(W^(l) a^(l-1) + b^(l))" />
}

export function SceneBatchVsOnline() {
  return <CompareScene title="Batch vs online learning" leftTitle="Batch" leftSub="many samples → one update" rightTitle="Online" rightSub="one sample → immediate update" leftColor={DL.blue} rightColor={DL.teal} formula="difference is update timing" />
}

export function SceneBatchAgg() {
  return <StageRail title="Batch aggregates errors before updating" steps={[
    { title: 'sample 1', color: DL.blue },
    { title: 'sample 2', color: DL.blue },
    { title: 'sample 3', color: DL.blue },
    { title: 'mean grad', color: DL.red },
    { title: 'one update', color: DL.green },
  ]} formula="Delta w uses the batch average gradient" />
}

export function SceneOnlineStream() {
  return <StageRail title="Online stream updates as data arrives" steps={[
    { title: 'x1 update', color: DL.teal },
    { title: 'x2 update', color: DL.teal },
    { title: 'x3 update', color: DL.teal },
    { title: 'x4 update', color: DL.teal },
  ]} formula="fast adaptation, noisier path" />
}

export function SceneBackpropOverview() {
  return <StageRail title="Backpropagation overview" steps={[
    { title: 'forward', color: DL.blue },
    { title: 'loss', color: DL.red },
    { title: 'backward', color: DL.purple },
    { title: 'update', color: DL.green },
  ]} formula="efficient gradient descent by reusing the chain rule" />
}

export function SceneForwardPass() {
  return (
    <Scene title="Forward pass values">
      <Title>Forward pass: numbers move left to right</Title>
      <MiniNetwork x="110" y="85" layers={[3, 4, 4, 2]} gap={235} labels={['x', 'z1,a1', 'z2,a2', 'y_hat']} />
      {[230, 465, 700].map((x, i) => <ActivationPulse key={x} x={x} y={238 + i * 16} color={palette[i]} label={`a${i + 1}`} />)}
      <FormulaStrip>compute every activation before measuring loss</FormulaStrip>
    </Scene>
  )
}

export function SceneLossError() {
  return (
    <Scene title="Loss turns prediction into error">
      <Title>Loss: compare prediction with target</Title>
      <PredictionPanel x="130" y="185" value="0.62" label="prediction y_hat" color={DL.green} />
      <PredictionPanel x="400" y="185" value="1.00" label="target d" color={DL.blue} />
      <ArrowFlow x1="280" y1="230" x2="398" y2="230" color={DL.red} label="difference" />
      <LossMeter x="670" y="178" loss=".144" />
      <FormulaStrip>error e = d - y_hat; loss L measures how bad it is</FormulaStrip>
    </Scene>
  )
}

export function SceneBackpropReverse() {
  return (
    <Scene title="Backpropagation sends responsibility backward">
      <Title>Backward pass: gradients travel from loss to weights</Title>
      <MiniNetwork x="110" y="85" layers={[3, 4, 4, 2]} gap={235} labels={['input', 'hidden', 'hidden', 'loss']} />
      <GradientPacket x="730" y="100" label="dL/dy" />
      <ArrowFlow x1="760" y1="178" x2="575" y2="212" color={DL.red} dashed />
      <ArrowFlow x1="560" y1="248" x2="350" y2="248" color={DL.purple} dashed />
      <ArrowFlow x1="330" y1="292" x2="150" y2="270" color={DL.purple} dashed />
      <FormulaStrip>backprop assigns credit/blame to earlier weights</FormulaStrip>
    </Scene>
  )
}

export function SceneWeightDelta() {
  return (
    <Scene title="Weight delta on one edge">
      <Title>Weight update: one edge gets nudged</Title>
      <Neuron x="230" y="260" r="38" color={DL.blue} label="a_i" />
      <WeightedEdge x1="272" y1="260" x2="560" y2="260" weight="w_ij" color={DL.purple} width="8" />
      <Neuron x="610" y="260" r="42" color={DL.teal} label="delta_j" />
      <GradientPacket x="430" y="150" label="Delta w" />
      <WeightUpdater x="375" y="340" label="w <- w - eta dL/dw" />
      <FormulaStrip>Delta w_ij = - eta delta_j a_i</FormulaStrip>
    </Scene>
  )
}

export function SceneBackpropAlgo() {
  return <StageRail title="Backprop algorithm" steps={['initialize', 'forward pass', 'compute loss', 'reverse gradients', 'update weights', 'next epoch'].map((title, i) => ({ title, color: palette[i] }))} formula="repeat until validation says stop" />
}

export function SceneXorFail() {
  return <PlaneScene title="XOR failure for one perceptron" mode="xor" formula="linear model cannot separate diagonals" />
}

export function SceneXorHidden() {
  return (
    <Scene title="Hidden layer solves XOR">
      <Title>Hidden features split XOR into two simpler regions</Title>
      <PlaneScene title="" mode="xor" />
      <Curve d="M160 286 L740 286" color={DL.teal} width="6" />
      <Curve d="M425 420 L425 150" color={DL.indigo} width="6" />
      <SoftCard x="640" y="74" w="230" h="82" title="two hidden units" sub="combine two cuts" color={DL.green} />
      <FormulaStrip>XOR becomes separable after hidden transformation</FormulaStrip>
    </Scene>
  )
}

export function SceneLearningRateTri() {
  return <ConceptCardsScene title="Learning rate: too small, good, too large" cards={[
    { title: 'too small', sub: 'slow crawl', color: DL.blue },
    { title: 'good eta', sub: 'steady descent', color: DL.green },
    { title: 'too large', sub: 'overshoots', color: DL.red },
  ]} formula="eta controls step size" />
}

export function SceneMomentum() {
  return <CompareScene title="Momentum smooths zig-zag updates" leftTitle="plain GD" leftSub="zig-zag in valleys" rightTitle="momentum" rightSub="velocity carries direction" leftColor={DL.red} rightColor={DL.indigo} formula="v <- beta v + grad; w <- w - eta v" />
}

export function SceneInitSymmetry() {
  return <CompareScene title="Initialization breaks symmetry" leftTitle="same weights" leftSub="neurons learn same feature" rightTitle="random small weights" rightSub="neurons specialize" leftColor={DL.red} rightColor={DL.green} formula="do not initialize all hidden units identically" />
}

export function SceneSaturation() {
  return <ConceptCardsScene title="Saturation: flat tails kill gradients" cards={[
    { title: 'large z', sub: 'activation flat', color: DL.red },
    { title: 'tiny phi prime', sub: 'weak gradient', color: DL.amber },
    { title: 'slow update', sub: 'learning stalls', color: DL.purple },
  ]} formula="when derivative is near zero, backprop signal fades" />
}

export function SceneScaling() {
  return <CompareScene title="Feature scaling balances learning" leftTitle="unscaled" leftSub="one feature dominates gradient" rightTitle="scaled" rightSub="features move together" leftColor={DL.red} rightColor={DL.green} formula="normalize inputs before training" />
}

export function SceneEarlyStop() {
  return (
    <Scene title="Early stopping">
      <Title>Early stopping watches validation loss</Title>
      <Axis x="105" y="410" w="720" h="260" xLabel="epochs" yLabel="loss" />
      <Curve d="M130 365 C270 280 430 210 790 150" color={DL.green} width="7" />
      <Curve d="M130 365 C260 232 398 176 510 210 S686 342 790 380" color={DL.red} width="7" />
      <Curve d="M510 410 L510 132" color={DL.amber} dashed />
      <Label x="510" y="112" fill={DL.amber}>stop here</Label>
      <FormulaStrip>stop when validation worsens while training still improves</FormulaStrip>
    </Scene>
  )
}

export function SceneChainRule() {
  return <StageRail title="Chain rule through a computation graph" steps={['x', 'z = wx+b', 'a = phi(z)', 'L(a)', 'dL/dw'].map((title, i) => ({ title, color: palette[i] }))} formula="dL/dw = dL/da * da/dz * dz/dw" />
}

export function SceneDiffActivations() {
  return <CompareScene title="Differentiable activations enable gradients" leftTitle="hard step" leftSub="no useful slope" rightTitle="smooth phi" rightSub="gradient can flow" leftColor={DL.red} rightColor={DL.green} formula="backprop needs derivatives almost everywhere" />
}

export function SceneScaleChain() {
  return <StageRail title="Chain rule scales across layers" steps={['layer 4 grad', 'layer 3 grad', 'layer 2 grad', 'layer 1 grad', 'input influence'].map((title, i) => ({ title, color: palette[i] }))} formula="deep networks multiply many local derivatives" />
}

export function SceneOverfitGap() {
  return <SceneEarlyStop />
}

export function SceneNormPenalty() {
  return <StageRail title="Regularized objective adds a penalty" steps={[
    { title: 'fit loss J', color: DL.red },
    { title: 'penalty Omega', color: DL.purple },
    { title: 'alpha dial', color: DL.amber },
    { title: 'simpler model', color: DL.green },
  ]} formula="J_total = J_data + alpha Omega(w)" />
}

export function SceneL2Norm() {
  return <ConceptCardsScene title="L2 norm penalizes large weights" cards={[
    { title: 'w1^2', sub: 'squares magnitude' },
    { title: 'sum', sub: 'all weights count' },
    { title: 'shrink', sub: 'large weights costly' },
  ]} formula="Omega(w) = 1/2 ||w||^2" />
}

export function SceneWeightDecay() {
  return <StageRail title="Weight decay shrinks before learning signal" steps={[
    { title: 'old w', color: DL.purple },
    { title: 'multiply small', color: DL.amber },
    { title: 'apply grad', color: DL.red },
    { title: 'new w', color: DL.green },
  ]} formula="w <- (1 - eta alpha)w - eta grad" />
}

export function SceneL2Smooth() {
  return <CompareScene title="L2 favors smoother functions" leftTitle="large weights" leftSub="sharp boundary" rightTitle="small weights" rightSub="smooth boundary" leftColor={DL.red} rightColor={DL.green} formula="penalizing magnitude discourages wiggly fits" />
}

export function SceneAlphaTradeoff() {
  return <ConceptCardsScene title="Alpha tradeoff" center="alpha" cards={[
    { title: 'low alpha', sub: 'fit strongly', color: DL.red },
    { title: 'medium alpha', sub: 'balance', color: DL.green },
    { title: 'high alpha', sub: 'underfit risk', color: DL.amber },
  ]} formula="regularization strength controls bias-variance tradeoff" />
}

export function SceneAugmentIdea() {
  return <ConceptCardsScene title="Data augmentation creates label-preserving views" cards={[
    { title: 'rotate', sub: 'same label' },
    { title: 'crop', sub: 'same object' },
    { title: 'noise', sub: 'robustness' },
    { title: 'flip', sub: 'if valid' },
  ]} formula="more valid variation → better generalization" />
}

export function SceneAugmentFlow() {
  return <StageRail title="Augmentation flow" steps={['original', 'transform 1', 'transform 2', 'same label', 'train robust'].map((title, i) => ({ title, color: palette[i] }))} formula="teach invariance by showing many valid views" />
}

export function SceneAugmentGoodBad() {
  return <CompareScene title="Good vs bad augmentation" leftTitle="good transform" leftSub="preserves label" rightTitle="bad transform" rightSub="changes meaning" leftColor={DL.green} rightColor={DL.red} formula="augmentation is safe only when labels remain true" />
}

export function SceneSemiIntro() {
  return <ConceptCardsScene title="Semi-supervised learning" center="representation" cards={[
    { title: 'few labeled', sub: 'direct supervision', color: DL.green },
    { title: 'many unlabeled', sub: 'shape data space', color: DL.muted },
    { title: 'classifier', sub: 'uses both', color: DL.blue },
  ]} formula="labels guide; unlabeled data reveals structure" />
}

export function SceneSemiRepr() {
  return <StageRail title="Unlabeled data shapes representation" steps={['raw points', 'clusters', 'shared features', 'small label head'].map((title, i) => ({ title, color: palette[i] }))} formula="learn representation first, classify with fewer labels" />
}

export function SceneRegToolkit() {
  return <ConceptCardsScene title="Regularization toolkit" cards={[
    { title: 'L2', sub: 'small weights' },
    { title: 'augmentation', sub: 'valid variation' },
    { title: 'early stop', sub: 'validation guard' },
    { title: 'semi-supervised', sub: 'use structure' },
  ]} formula="different overfitting symptoms need different tools" />
}

export function SceneOptHard() { return <OptimizationScene title="Optimization is hard in deep loss surfaces" mode="gd" formula="many parameters create curved high-dimensional landscapes" /> }
export function SceneGdStep() { return <OptimizationScene title="Gradient descent step" mode="gd" formula="theta <- theta - eta grad J(theta)" /> }
export function SceneIllCond() { return <OptimizationScene title="Ill-conditioning makes zig-zags" mode="ill" formula="steep across valley, shallow along valley" /> }
export function SceneValleyClose() { return <OptimizationScene title="Narrow valley close-up" mode="ill" formula="gradient points across the valley more than down it" /> }
export function SceneLocalMin() { return <OptimizationScene title="Local minimum vs global minimum" mode="local" formula="local minimum is lower than neighbors, not necessarily best overall" /> }
export function SceneStationary() {
  return <ConceptCardsScene title="Stationary points: zero gradient has many meanings" cards={[
    { title: 'minimum', sub: 'bowl bottom', color: DL.green },
    { title: 'saddle', sub: 'mixed curvature', color: DL.amber },
    { title: 'flat', sub: 'weak signal', color: DL.purple },
  ]} formula="grad J = 0 does not always mean solved" />
}
export function ScenePlateau() { return <OptimizationScene title="Plateau: optimizer stalls" mode="plateau" formula="small gradient → tiny update" /> }
export function SceneSaddle() { return <OptimizationScene title="Saddle point slows first-order methods" mode="saddle" formula="one direction down, another direction up" /> }
export function SceneFlat() { return <OptimizationScene title="Flat region: movement becomes ambiguous" mode="flat" formula="almost zero slope gives little guidance" /> }
export function SceneOptSymptoms() {
  return <ConceptCardsScene title="Optimization symptoms" cards={[
    { title: 'zig-zag', sub: 'ill-conditioning' },
    { title: 'stalled', sub: 'plateau or saturation' },
    { title: 'unstable', sub: 'eta too large' },
    { title: 'slow', sub: 'eta too small' },
    { title: 'overfit', sub: 'regularize' },
    { title: 'bad start', sub: 'initialization' },
  ]} />
}
export function SceneRegVsOpt() {
  return <CompareScene title="Regularization vs optimization" leftTitle="Regularization" leftSub="will the model generalize?" rightTitle="Optimization" rightSub="can we find good weights?" leftColor={DL.purple} rightColor={DL.amber} formula="one controls behavior; one controls search" />
}
export function SceneTrainWorkflow() {
  return <StageRail title="Training workflow" steps={['scale data', 'augment', 'initialize', 'optimize', 'validate', 'regularize'].map((title, i) => ({ title, color: palette[i] }))} formula="practical training is a loop, not one command" />
}

export function SceneConvDemo() {
  return <CnnMatrixScene title="Convolution demo: kernel slides and feature map builds" mode="conv" formula="each output cell = sum of image patch times shared kernel" />
}
export function SceneConvMath() { return <CnnMatrixScene title="Convolution math: multiply patch then sum" mode="math" formula="S(i,j) = sum_m sum_n I(i+m,j+n) K(m,n)" /> }
export function SceneReceptive() { return <CnnMatrixScene title="Receptive field: one neuron sees a local patch" mode="conv" formula="local connections reduce parameters and preserve spatial structure" /> }
export function SceneCnnMotivation() {
  return <ConceptCardsScene title="CNN motivation" cards={[
    { title: 'locality', sub: 'near pixels relate' },
    { title: 'sharing', sub: 'same detector repeats' },
    { title: 'equivariance', sub: 'shift moves map' },
    { title: 'hierarchy', sub: 'edges to objects' },
  ]} formula="CNNs encode image-like assumptions" />
}
export function SceneDenseVsConv() {
  return <CompareScene title="Dense vs convolution parameters" leftTitle="Dense" leftSub="new weight for every pixel link" rightTitle="Convolution" rightSub="small shared kernel everywhere" leftColor={DL.red} rightColor={DL.green} formula="shared filters drastically reduce parameters" />
}
export function SceneFeatureHierarchy() {
  return <StageRail title="Feature hierarchy" steps={['edges', 'textures', 'parts', 'objects', 'decision'].map((title, i) => ({ title, color: palette[i] }))} formula="later layers combine earlier detectors" />
}
export function ScenePoolIdea() { return <CnnMatrixScene title="Pooling summarizes neighborhoods" mode="pool" formula="pooling keeps a compact summary of local activation" /> }
export function SceneMaxPool() { return <CnnMatrixScene title="Max pooling picks the strongest response" mode="pool" formula="max pool: output = max values in each window" /> }
export function SceneStrongPrior() {
  return <ConceptCardsScene title="CNN as a strong prior" center="CNN" cards={[
    { title: 'local', sub: 'small fields' },
    { title: 'shared', sub: 'same kernel' },
    { title: 'spatial', sub: 'map output' },
    { title: 'hierarchical', sub: 'stacked features' },
  ]} formula="the architecture assumes spatial structure before seeing data" />
}
export function ScenePriorRisk() {
  return <CompareScene title="Strong prior helps and hurts" leftTitle="matches data" leftSub="learns faster with less data" rightTitle="wrong prior" rightSub="misses non-spatial relations" leftColor={DL.green} rightColor={DL.red} formula="priors are powerful when assumptions are true" />
}
export function SceneStridePad() { return <CnnMatrixScene title="Stride and padding change output size" mode="stride" formula="stride jumps; padding protects borders" /> }
export function SceneChannels() {
  return (
    <Scene title="Channels combine depth">
      <Title>Multi-channel kernels read across depth</Title>
      <TensorBlock x="120" y="170" w="120" h="150" depth={3} label="RGB input" color={DL.blue} />
      <ArrowFlow x1="310" y1="242" x2="430" y2="242" color={DL.amber} />
      <TensorBlock x="440" y="182" w="86" h="120" depth={3} label="3D kernel" color={DL.purple} />
      <ArrowFlow x1="600" y1="242" x2="720" y2="242" color={DL.teal} />
      <FeatureMap x="735" y="172" rows={4} cols={4} cell={38} hot={[0, 1, 5, 10, 15]} color={DL.teal} />
      <FormulaStrip>one filter has weights for every input channel</FormulaStrip>
    </Scene>
  )
}
export function SceneCnnVariants() {
  return <ConceptCardsScene title="CNN variants reorganize computation" cards={[
    { title: 'stride', sub: 'sample positions' },
    { title: 'padding', sub: 'control borders' },
    { title: 'dilation', sub: 'wider context' },
    { title: '1x1 conv', sub: 'mix channels' },
    { title: 'depthwise', sub: 'cheap filters' },
    { title: 'transposed', sub: 'upsample' },
  ]} />
}
export function SceneStructuredOut() {
  return <CompareScene title="Classification vs structured output" leftTitle="class label" leftSub="one answer for whole image" rightTitle="spatial map" rightSub="answer per pixel or cell" leftColor={DL.green} rightColor={DL.teal} formula="some tasks need outputs with structure" />
}
export function SceneDensePred() { return <CnnMatrixScene title="Dense prediction preserves spatial answers" mode="pipeline" formula="image → feature maps → heatmap or segmentation" /> }
export function SceneDataTypes() {
  return <ConceptCardsScene title="CNN-friendly data types" cards={[
    { title: '1D', sub: 'signals/text' },
    { title: '2D', sub: 'images/maps' },
    { title: '3D', sub: 'video/medical' },
    { title: 'grid', sub: 'spatial arrays' },
  ]} />
}
export function SceneDataLayout() {
  return <CompareScene title="Data layout: channels first or last" leftTitle="NCHW" leftSub="batch, channel, height, width" rightTitle="NHWC" rightSub="batch, height, width, channel" leftColor={DL.indigo} rightColor={DL.teal} formula="layout affects memory and hardware efficiency" />
}
export function SceneEfficientConv() {
  return <CompareScene title="Efficient convolution reuses work" leftTitle="direct conv" leftSub="many multiply-adds" rightTitle="optimized conv" rightSub="tiling, FFT, hardware kernels" leftColor={DL.amber} rightColor={DL.green} formula="speed depends on algorithm + memory + hardware" />
}
export function SceneEfficiencyFactors() {
  return <ConceptCardsScene title="Convolution efficiency factors" center="speed" cards={[
    { title: 'kernel size', sub: 'k x k' },
    { title: 'feature maps', sub: 'H x W' },
    { title: 'channels', sub: 'depth' },
    { title: 'batch', sub: 'parallelism' },
    { title: 'memory', sub: 'layout' },
    { title: 'hardware', sub: 'GPU/CPU' },
  ]} />
}
export function SceneCnnPipeline() { return <CnnMatrixScene title="CNN pipeline as a 2.5D stack" mode="pipeline" formula="conv → activation → pool → deeper maps → prediction" /> }
export function SceneCnnHistory() {
  return <StageRail title="CNN history timeline" steps={['Neocognitron', 'LeNet', 'AlexNet', 'VGG/ResNet', 'modern CNNs'].map((title, i) => ({ title, color: palette[i] }))} formula="progress followed data, compute, and architecture scale" />
}
export function SceneHistoryScale() {
  return <ConceptCardsScene title="History of scale" cards={[
    { title: 'more data', sub: 'ImageNet era' },
    { title: 'more compute', sub: 'GPU training' },
    { title: 'deeper nets', sub: 'residual paths' },
    { title: 'better tools', sub: 'libraries + kernels' },
  ]} formula="scale changed what CNNs could learn" />
}

export function SceneSeqDomains() {
  return <ConceptCardsScene title="Sequence domains: order carries meaning" cards={[
    { title: 'text', sub: 'word order' },
    { title: 'speech', sub: 'time waveform' },
    { title: 'finance', sub: 'time series' },
    { title: 'events', sub: 'logs and clicks' },
  ]} formula="sequence model input has memory of position and time" />
}
export function SceneRnnUnroll() { return <SequenceScene title="RNN unroll: one cell repeated through time" mode="rnn" formula="unrolling turns recurrence into a timeline graph" /> }
export function SceneRnnEquation() { return <SequenceScene title="RNN equation shares weights over time" mode="rnn" formula="h_t = phi(W_xh x_t + W_hh h_{t-1} + b)" /> }
export function SceneBptt() { return <SequenceScene title="BPTT: backpropagation through time" mode="bptt" formula="gradients flow backward across the unrolled timeline" /> }
export function SceneRnnMemory() { return <SequenceScene title="RNN memory is the hidden state" mode="memory" formula="h_t carries compressed context from earlier tokens" /> }
export function SceneRnnIo() { return <SequenceScene title="RNN input-output patterns" mode="io" formula="one-to-many, many-to-one, and many-to-many share the same recurrent idea" /> }
export function SceneLongDepFail() {
  return <SequenceScene title="Long dependency failure: influence fades" mode="bptt" formula="many small derivatives can make old information vanish" />
}
export function SceneBiRnn() {
  return <CompareScene title="Bidirectional RNN combines two directions" leftTitle="forward" leftSub="past context" rightTitle="backward" rightSub="future context" leftColor={DL.blue} rightColor={DL.purple} formula="use when the full sequence is available" />
}
export function SceneBiUse() {
  return <ConceptCardsScene title="Bidirectional RNN use cases" cards={[
    { title: 'tagging', sub: 'word needs both sides' },
    { title: 'speech', sub: 'offline context' },
    { title: 'DNA', sub: 'motifs around point' },
    { title: 'not streaming', sub: 'future unavailable' },
  ]} />
}
export function SceneEncDec() {
  return <StageRail title="Encoder-decoder sequence model" steps={['source tokens', 'encoder', 'context vector', 'decoder', 'target tokens'].map((title, i) => ({ title, color: palette[i] }))} formula="variable input sequence → context → variable output sequence" />
}
export function SceneSeq2SeqLen() {
  return <CompareScene title="Seq2seq handles unequal lengths" leftTitle="input length 4" leftSub="read all source tokens" rightTitle="output length 2" rightSub="generate until stop token" leftColor={DL.blue} rightColor={DL.green} formula="encoder-decoder decouples input and output lengths" />
}
export function SceneDeepRnn() {
  return (
    <Scene title="Deep RNN stacks recurrence">
      <Title>Deep RNN: depth across layers and time</Title>
      {[0, 1, 2, 3].map((t) => [0, 1, 2].map((l) => (
        <g key={`${t}-${l}`}>
          <HiddenState x={190 + t * 170} y={365 - l * 105} label="h" color={palette[l]} />
          {t < 3 ? <ArrowFlow x1={218 + t * 170} y1={365 - l * 105} x2={332 + t * 170} y2={365 - l * 105} color={palette[l]} /> : null}
          {l < 2 ? <ArrowFlow x1={190 + t * 170} y1={337 - l * 105} x2={190 + t * 170} y2={292 - l * 105} color={DL.amber} dashed /> : null}
        </g>
      )))}
      <FormulaStrip>time depth repeats; layer depth stacks features</FormulaStrip>
    </Scene>
  )
}
export function SceneDepthKinds() {
  return <CompareScene title="Kinds of depth in sequence models" leftTitle="time depth" leftSub="unrolled steps t1...tn" rightTitle="layer depth" rightSub="stacked transformations per step" leftColor={DL.indigo} rightColor={DL.teal} formula="do not confuse recurrence length with stacked layers" />
}
export function SceneRecursive() {
  return (
    <Scene title="Recursive neural network composes a tree">
      <Title>Recursive net: child representations build parents</Title>
      {[[180, 380, 'a'], [330, 380, 'b'], [630, 380, 'c'], [780, 380, 'd']].map(([x, y, label]) => <Neuron key={label} x={x} y={y} r="28" color={DL.blue} label={label} />)}
      <HiddenState x="255" y="270" label="h" color={DL.teal} />
      <HiddenState x="705" y="270" label="h" color={DL.teal} />
      <HiddenState x="480" y="150" label="root" color={DL.purple} />
      <ArrowFlow x1="180" y1="350" x2="238" y2="292" color={DL.teal} /><ArrowFlow x1="330" y1="350" x2="272" y2="292" color={DL.teal} />
      <ArrowFlow x1="630" y1="350" x2="688" y2="292" color={DL.teal} /><ArrowFlow x1="780" y1="350" x2="722" y2="292" color={DL.teal} />
      <ArrowFlow x1="280" y1="250" x2="450" y2="170" color={DL.purple} /><ArrowFlow x1="680" y1="250" x2="510" y2="170" color={DL.purple} />
      <FormulaStrip>same composition function is reused at each tree node</FormulaStrip>
    </Scene>
  )
}
export function SceneRecursiveUse() {
  return <ConceptCardsScene title="Recursive nets use compositional structure" cards={[
    { title: 'parse trees', sub: 'phrases compose' },
    { title: 'programs', sub: 'syntax trees' },
    { title: 'scenes', sub: 'parts form whole' },
    { title: 'hierarchies', sub: 'child to parent' },
  ]} />
}
export function SceneLstmHero() { return <LstmGateDiagram title="LSTM hero: gates protect long-term memory" /> }
export function SceneLstmGates() { return <LstmGateDiagram title="Forget, input, candidate, output gates" compact /> }
export function SceneGatedVsPlain() {
  return <CompareScene title="Gated vs plain recurrence" leftTitle="plain RNN" leftSub="state overwritten every step" rightTitle="gated RNN" rightSub="learns what to keep" leftColor={DL.red} rightColor={DL.green} formula="gates create controllable memory paths" />
}
export function SceneOtherGated() {
  return <ConceptCardsScene title="Other gated recurrent models" cards={[
    { title: 'GRU', sub: 'reset + update gates' },
    { title: 'peephole LSTM', sub: 'gates see cell' },
    { title: 'minimal gated', sub: 'fewer gates' },
    { title: 'attention', sub: 'direct access path' },
  ]} />
}
export function SceneChooseSeq() {
  return <ConceptCardsScene title="Choose a sequence model by task" center="task" cards={[
    { title: 'streaming', sub: 'plain/GRU RNN' },
    { title: 'long context', sub: 'LSTM/gated' },
    { title: 'full context', sub: 'BiRNN' },
    { title: 'translate', sub: 'enc-dec' },
    { title: 'tree data', sub: 'recursive' },
  ]} />
}
export function SceneTrainSeq() {
  return <StageRail title="Training sequence models carefully" steps={['unroll', 'BPTT', 'clip gradients', 'mask lengths', 'validate sequence'].map((title, i) => ({ title, color: palette[i] }))} formula="long timelines need stable gradients and careful batching" />
}

const moduleSteps = {
  1: ['DATA', 'NEURON', 'GRAPH', 'PERCEPTRON', 'BAYES', 'REVISE'],
  2: ['MLP', 'FORWARD', 'LOSS', 'BACKPROP', 'XOR', 'HEURISTICS'],
  3: ['OVERFIT', 'L2', 'AUGMENT', 'OPTIMIZE', 'DIAGNOSE', 'WORKFLOW'],
  4: ['IMAGE', 'KERNEL', 'FEATURE MAP', 'POOL', 'CNN', 'HISTORY'],
  5: ['SEQUENCE', 'RNN', 'BPTT', 'BIRNN', 'LSTM', 'CHOOSE'],
}

const sceneMap = {
  'dl-m1-opener': [SceneModuleOpener, { module: 'Module 1', steps: moduleSteps[1] }],
  'dl-m1-map-basics': [SceneJourneyMap, { items: ['definition', 'brain bridge', 'neuron math', 'activation', 'graph'] }],
  'dl-m1-map-perceptron': [SceneJourneyMap, { items: ['architectures', 'perceptron', 'convergence', 'Bayes', 'AND/XOR'] }],
  'dl-nn-definition': SceneNnDefinition,
  'dl-brain-bridge': SceneBrainBridge,
  'dl-neuron-exploded': SceneNeuronExploded,
  'dl-neuron-equation': SceneNeuronEquation,
  'dl-activation-curves': SceneActivationCurves,
  'dl-directed-graph': SceneDirectedGraph,
  'dl-feedback-compare': SceneFeedbackCompare,
  'dl-arch-overview': SceneArchOverview,
  'dl-arch-single': SceneArchSingle,
  'dl-arch-multi': SceneArchMulti,
  'dl-perceptron-hero': ScenePerceptronHero,
  'dl-perceptron-math': ScenePerceptronMath,
  'dl-decision-plane': SceneDecisionPlane,
  'dl-perceptron-update': ScenePerceptronUpdate,
  'dl-perceptron-loop': ScenePerceptronLoop,
  'dl-convergence-condition': SceneConvergence,
  'dl-convergence-nuance': SceneConvergenceNuance,
  'dl-nonseparable': SceneNonseparable,
  'dl-bayes-intro': SceneBayesIntro,
  'dl-bayes-gaussian': SceneBayesGaussian,
  'dl-bayes-vs-perceptron': SceneBayesVsPerceptron,
  'dl-and-xor': SceneAndXor,
  'dl-exam-m1': [SceneExamCards, { module: 1 }],
  'dl-vocab-m1': SceneVocabMap,
  'dl-activity-boundary': [SceneActivityBoard, { kind: 'boundary' }],
  'dl-close-m1': [SceneRevisionChain, { steps: ['brain', 'neuron', 'graph', 'perceptron', 'Bayes'] }],
  'dl-coverage-m1': SceneCoverageGrid,
  'dl-book-m1': SceneBookPanel,

  'dl-m2-opener': [SceneModuleOpener, { module: 'Module 2', steps: moduleSteps[2] }],
  'dl-m2-map': [SceneJourneyMap, { items: ['MLP need', 'layer equation', 'batch/online', 'backprop', 'XOR', 'heuristics'] }],
  'dl-mlp-need': SceneMlpNeed,
  'dl-mlp-graph': SceneMlpGraph,
  'dl-mlp-layer-eq': SceneMlpLayerEq,
  'dl-batch-vs-online': SceneBatchVsOnline,
  'dl-batch-agg': SceneBatchAgg,
  'dl-online-stream': SceneOnlineStream,
  'dl-backprop-overview': SceneBackpropOverview,
  'dl-forward-pass': SceneForwardPass,
  'dl-loss-error': SceneLossError,
  'dl-backprop-reverse': SceneBackpropReverse,
  'dl-weight-delta': SceneWeightDelta,
  'dl-backprop-algo': SceneBackpropAlgo,
  'dl-xor-fail': SceneXorFail,
  'dl-xor-hidden': SceneXorHidden,
  'dl-lr-heuristic': SceneLearningRateTri,
  'dl-momentum': SceneMomentum,
  'dl-init-symmetry': SceneInitSymmetry,
  'dl-saturation': SceneSaturation,
  'dl-scaling': SceneScaling,
  'dl-early-stop': SceneEarlyStop,
  'dl-chain-rule': SceneChainRule,
  'dl-diff-activations': SceneDiffActivations,
  'dl-scale-chain': SceneScaleChain,
  'dl-exam-m2': [SceneExamCards, { module: 2 }],
  'dl-vocab-m2': SceneVocabMap,
  'dl-activity-xor': [SceneActivityBoard, { kind: 'xor' }],
  'dl-close-m2': [SceneRevisionChain, { steps: ['MLP', 'forward', 'loss', 'backprop', 'XOR', 'tune'] }],
  'dl-coverage-m2': SceneCoverageGrid,
  'dl-book-m2': SceneBookPanel,

  'dl-m3-opener': [SceneModuleOpener, { module: 'Module 3', steps: moduleSteps[3] }],
  'dl-m3-map': [SceneJourneyMap, { items: ['overfit gap', 'norm penalty', 'augmentation', 'semi-supervised', 'landscape', 'workflow'] }],
  'dl-overfit-gap': SceneOverfitGap,
  'dl-norm-penalty': SceneNormPenalty,
  'dl-l2-norm': SceneL2Norm,
  'dl-weight-decay': SceneWeightDecay,
  'dl-l2-smooth': SceneL2Smooth,
  'dl-alpha-tradeoff': SceneAlphaTradeoff,
  'dl-augment-idea': SceneAugmentIdea,
  'dl-augment-flow': SceneAugmentFlow,
  'dl-augment-good-bad': SceneAugmentGoodBad,
  'dl-semi-intro': SceneSemiIntro,
  'dl-semi-repr': SceneSemiRepr,
  'dl-reg-toolkit': SceneRegToolkit,
  'dl-opt-hard': SceneOptHard,
  'dl-gd-step': SceneGdStep,
  'dl-ill-cond': SceneIllCond,
  'dl-valley-close': SceneValleyClose,
  'dl-local-min': SceneLocalMin,
  'dl-stationary': SceneStationary,
  'dl-plateau': ScenePlateau,
  'dl-saddle': SceneSaddle,
  'dl-flat': SceneFlat,
  'dl-opt-symptoms': SceneOptSymptoms,
  'dl-reg-vs-opt': SceneRegVsOpt,
  'dl-train-workflow': SceneTrainWorkflow,
  'dl-exam-m3': [SceneExamCards, { module: 3 }],
  'dl-vocab-m3': SceneVocabMap,
  'dl-activity-diagnose': [SceneActivityBoard, { kind: 'diagnose' }],
  'dl-coverage-m3': SceneCoverageGrid,
  'dl-book-m3': SceneBookPanel,

  'dl-m4-opener': [SceneModuleOpener, { module: 'Module 4', steps: moduleSteps[4] }],
  'dl-m4-map-a': [SceneJourneyMap, { items: ['conv demo', 'conv math', 'motivation', 'pooling', 'priors'] }],
  'dl-m4-map-b': [SceneJourneyMap, { items: ['stride/pad', 'channels', 'outputs', 'efficiency', 'history'] }],
  'dl-conv-demo': SceneConvDemo,
  'dl-conv-math': SceneConvMath,
  'dl-receptive': SceneReceptive,
  'dl-cnn-motivation': SceneCnnMotivation,
  'dl-dense-vs-conv': SceneDenseVsConv,
  'dl-feature-hierarchy': SceneFeatureHierarchy,
  'dl-pool-idea': ScenePoolIdea,
  'dl-maxpool': SceneMaxPool,
  'dl-strong-prior': SceneStrongPrior,
  'dl-prior-risk': ScenePriorRisk,
  'dl-stride-pad': SceneStridePad,
  'dl-channels': SceneChannels,
  'dl-cnn-variants': SceneCnnVariants,
  'dl-structured-out': SceneStructuredOut,
  'dl-dense-pred': SceneDensePred,
  'dl-data-types': SceneDataTypes,
  'dl-data-layout': SceneDataLayout,
  'dl-efficient-conv': SceneEfficientConv,
  'dl-efficiency-factors': SceneEfficiencyFactors,
  'dl-cnn-pipeline': SceneCnnPipeline,
  'dl-cnn-history': SceneCnnHistory,
  'dl-history-scale': SceneHistoryScale,
  'dl-exam-m4': [SceneExamCards, { module: 4 }],
  'dl-vocab-m4': SceneVocabMap,
  'dl-activity-cnn': [SceneActivityBoard, { kind: 'cnn' }],
  'dl-coverage-m4': SceneCoverageGrid,
  'dl-book-m4': SceneBookPanel,

  'dl-m5-opener': [SceneModuleOpener, { module: 'Module 5', steps: moduleSteps[5] }],
  'dl-m5-map': [SceneJourneyMap, { items: ['sequence domains', 'RNN unroll', 'BPTT', 'BiRNN', 'encoder-decoder', 'LSTM'] }],
  'dl-seq-domains': SceneSeqDomains,
  'dl-rnn-unroll': SceneRnnUnroll,
  'dl-rnn-equation': SceneRnnEquation,
  'dl-bptt': SceneBptt,
  'dl-rnn-memory': SceneRnnMemory,
  'dl-rnn-io': SceneRnnIo,
  'dl-long-dep-fail': SceneLongDepFail,
  'dl-bi-rnn': SceneBiRnn,
  'dl-bi-use': SceneBiUse,
  'dl-encdec': SceneEncDec,
  'dl-seq2seq-len': SceneSeq2SeqLen,
  'dl-deep-rnn': SceneDeepRnn,
  'dl-depth-kinds': SceneDepthKinds,
  'dl-recursive': SceneRecursive,
  'dl-recursive-use': SceneRecursiveUse,
  'dl-lstm-hero': SceneLstmHero,
  'dl-lstm-gates': SceneLstmGates,
  'dl-gated-vs-plain': SceneGatedVsPlain,
  'dl-other-gated': SceneOtherGated,
  'dl-choose-seq': SceneChooseSeq,
  'dl-train-seq': SceneTrainSeq,
  'dl-exam-m5': [SceneExamCards, { module: 5 }],
  'dl-vocab-m5': SceneVocabMap,
  'dl-activity-match': [SceneActivityBoard, { kind: 'match' }],
  'dl-close-m5': [SceneRevisionChain, { steps: ['sequence', 'RNN', 'BPTT', 'BiRNN', 'encoder-decoder', 'LSTM'] }],
  'dl-coverage-m5': SceneCoverageGrid,
  'dl-book-m5': SceneBookPanel,
}

export function pickDlScene(key, opts = {}) {
  const entry = sceneMap[key]
  if (!entry) return <SceneJourneyMap items={opts.items || ['unknown key', key || 'missing', 'fallback scene']} />

  if (Array.isArray(entry)) {
    const [Component, defaults] = entry
    return <Component {...defaults} {...opts} />
  }

  const Component = entry
  return <Component {...opts} />
}
