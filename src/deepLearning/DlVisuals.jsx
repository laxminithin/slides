import { useId } from 'react';

const C = {
  navy: '#132238',
  muted: '#5a6b7d',
  cream: '#f7f3eb',
  paper: '#fffcf7',
  blue: '#2563eb',
  teal: '#0d9488',
  purple: '#7c3aed',
  red: '#dc2626',
  green: '#15803d',
  amber: '#d97706',
  indigo: '#4338ca',
  soft: '#e2e8f0',
};

const flow = 'dl-anim-flow';
const pulse = 'dl-anim-pulse';
const rise = 'dl-anim-rise';
const scan = 'dl-anim-scan';
const drift = 'dl-anim-drift';
const glow = 'dl-anim-glow';

function Scene({ children, title = 'Deep learning visual', viewBox = '0 0 520 360' }) {
  const id = `dl-${useId().replace(/:/g, '')}`;
  return (
    <svg className="dl-scene" viewBox={viewBox} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" stopOpacity=".96" />
          <stop offset="1" stopColor={C.cream} stopOpacity=".86" />
        </linearGradient>
        <linearGradient id={`${id}-flow`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor={C.blue} />
          <stop offset=".48" stopColor={C.teal} />
          <stop offset="1" stopColor={C.purple} />
        </linearGradient>
        <linearGradient id={`${id}-err`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor={C.red} />
          <stop offset="1" stopColor={C.purple} />
        </linearGradient>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor="#ffffff" stopOpacity=".95" />
          <stop offset=".35" stopColor={C.teal} stopOpacity=".38" />
          <stop offset="1" stopColor={C.teal} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor={C.navy} floodOpacity=".14" />
        </filter>
        <filter id={`${id}-softGlow`} x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="520" height="360" rx="28" fill={C.cream} />
      <circle cx="442" cy="64" r="116" fill={C.blue} opacity=".055" />
      <circle cx="72" cy="307" r="106" fill={C.amber} opacity=".06" />
      <path d="M0 306 C105 275 160 339 264 302 S420 265 520 298 V360 H0z" fill="#fff" opacity=".46" />
      <g style={{
        '--dl-glass': `url(#${id}-glass)`,
        '--dl-flow': `url(#${id}-flow)`,
        '--dl-error': `url(#${id}-err)`,
        '--dl-halo': `url(#${id}-halo)`,
        '--dl-shadow': `url(#${id}-shadow)`,
        '--dl-soft-glow': `url(#${id}-softGlow)`,
      }}>
        {children}
      </g>
    </svg>
  );
}

function Title({ children, x = 28, y = 36, size = 18, fill = C.navy, anchor = 'start' }) {
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight="850">{children}</text>;
}

function Label({ children, x, y, size = 12, fill = C.navy, anchor = 'middle', weight = 700 }) {
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight={weight}>{children}</text>;
}

function Sub({ children, x, y, anchor = 'middle', size = 10 }) {
  return <text x={x} y={y} textAnchor={anchor} fill={C.muted} fontSize={size} fontWeight="650">{children}</text>;
}

function Arrow({ x1, y1, x2, y2, color = C.blue, dashed = false, className = flow, width = 4 }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - 11 * Math.cos(a - 0.52)},${y2 - 11 * Math.sin(a - 0.52)}`;
  const p3 = `${x2 - 11 * Math.cos(a + 0.52)},${y2 - 11 * Math.sin(a + 0.52)}`;
  return (
    <g className={className}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '8 8' : undefined} />
      <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
    </g>
  );
}

function SoftCard({ x, y, w, h, title, sub, color = C.blue, className = rise }) {
  return (
    <g className={className} style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x} y={y} width={w} height={h} rx="16" fill="var(--dl-glass)" stroke={color} strokeOpacity=".45" strokeWidth="2" />
      <rect x={x + 10} y={y + 10} width={w - 20} height="5" rx="3" fill={color} opacity=".28" />
      <Label x={x + w / 2} y={y + h / 2 - (sub ? 3 : -4)} fill={color} size={13}>{title}</Label>
      {sub && <Sub x={x + w / 2} y={y + h / 2 + 17}>{sub}</Sub>}
    </g>
  );
}

function Node({ x, y, r = 17, color = C.teal, label, sub, className = pulse }) {
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={r + 10} fill={color} opacity=".11" />
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={color} strokeWidth="4" style={{ filter: 'var(--dl-shadow)' }} />
      {label && <Label x={x} y={y + 4} fill={color} size={Math.min(14, r)}>{label}</Label>}
      {sub && <Sub x={x} y={y + r + 20}>{sub}</Sub>}
    </g>
  );
}

function MiniNeuron({ x, y, color = C.teal }) {
  return <circle cx={x} cy={y} r="10" fill="#fff" stroke={color} strokeWidth="3" className={pulse} />;
}

function LayerNet({ xs = [90, 210, 330, 450], counts = [3, 5, 4, 2], colors = [C.blue, C.teal, C.purple, C.green], labels = [] }) {
  const layers = xs.map((x, i) => {
    const n = counts[i];
    const gap = Math.min(50, 178 / Math.max(1, n - 1));
    const top = 180 - gap * (n - 1) / 2;
    return Array.from({ length: n }, (_, j) => ({ x, y: top + j * gap, color: colors[i] || C.teal, id: `${i}-${j}` }));
  });
  return (
    <g>
      {layers.slice(0, -1).map((layer, i) => layer.flatMap((a) => layers[i + 1].map((b) => (
        <line key={`${a.id}-${b.id}`} x1={a.x + 12} y1={a.y} x2={b.x - 12} y2={b.y} stroke={i === layers.length - 2 ? C.purple : C.soft} strokeWidth="2" opacity=".85" />
      ))))}
      {layers.map((layer, i) => (
        <g key={xs[i]}>
          {layer.map((n) => <MiniNeuron key={n.id} {...n} />)}
          {labels[i] && <Sub x={xs[i]} y="318">{labels[i]}</Sub>}
        </g>
      ))}
    </g>
  );
}

function Axis({ x = 62, y = 286, w = 390, h = 210, labelX = 'x1', labelY = 'x2' }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={C.navy} strokeWidth="3" />
      <line x1={x} y1={y} x2={x} y2={y - h} stroke={C.navy} strokeWidth="3" />
      <Label x={x + w + 18} y={y + 4} fill={C.muted} size={10}>{labelX}</Label>
      <Label x={x - 12} y={y - h - 8} fill={C.muted} size={10}>{labelY}</Label>
    </g>
  );
}

function Point({ x, y, color = C.blue, mark = '' }) {
  return <g className={drift}><circle cx={x} cy={y} r="9" fill={color} stroke="#fff" strokeWidth="3" /><Label x={x} y={y + 4} fill="#fff" size="9">{mark}</Label></g>;
}

function Curve({ d, color = C.blue, width = 5, dashed = false, className = flow }) {
  return <path className={className} d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? '9 8' : undefined} />;
}

function MiniMatrix({ x, y, size = 22, rows = 4, cols = 4, hot = [], color = C.blue }) {
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const on = hot.includes(i);
        return <rect key={i} x={x + c * size} y={y + r * size} width={size - 3} height={size - 3} rx="4" fill={on ? color : '#fff'} opacity={on ? '.78' : '.95'} stroke={on ? color : C.soft} strokeWidth="2" />;
      })}
    </g>
  );
}

function ProcessStrip({ items, y = 176 }) {
  const gap = 448 / Math.max(1, items.length - 1);
  return (
    <g>
      {items.map((it, i) => {
        const x = 36 + i * gap;
        return (
          <g key={it[0]}>
            <Node x={x} y={y + Math.sin(i * 1.3) * 28} r="20" color={it[1]} label={i + 1} />
            <Sub x={x} y={y + 58}>{it[0]}</Sub>
            {i < items.length - 1 && <Arrow x1={x + 28} y1={y} x2={x + gap - 28} y2={y} color={C.amber} dashed />}
          </g>
        );
      })}
    </g>
  );
}

export function MasterStory() {
  const steps = ['DATA', 'NEURON', 'NETWORK', 'LEARN', 'BACKPROP', 'REG', 'OPT', 'CNN', 'RNN', 'LSTM', 'PREDICT'];
  return (
    <Scene title="Deep learning master story">
      <Title>Deep Learning BCA701: complete journey</Title>
      <path d="M36 196 C92 88 158 104 198 186 S318 290 368 172 S444 78 488 160" fill="none" stroke="var(--dl-flow)" strokeWidth="7" strokeLinecap="round" strokeDasharray="11 9" className={flow} />
      {steps.map((s, i) => {
        const x = 38 + (i % 6) * 89;
        const y = i < 6 ? 128 + Math.sin(i) * 34 : 242 + Math.sin(i) * 28;
        return <SoftCard key={s} x={x - 34} y={y - 24} w="68" h="48" title={s} color={[C.blue, C.teal, C.purple, C.amber, C.red, C.green, C.amber, C.indigo, C.blue, C.purple, C.green][i]} />;
      })}
      <Label x="260" y="330" fill={C.muted}>from data representation to intelligent prediction</Label>
    </Scene>
  );
}

export function JourneyPath({ steps = ['Basics', 'Perceptron', 'MLP', 'Backprop', 'Regularize', 'CNN', 'RNN'] }) {
  const items = steps.slice(0, 8);
  return (
    <Scene title="Deep learning journey path">
      <Title>Module journey</Title>
      <path d="M48 248 C112 84 184 264 248 156 S396 98 470 224" fill="none" stroke={C.soft} strokeWidth="18" strokeLinecap="round" />
      <path d="M48 248 C112 84 184 264 248 156 S396 98 470 224" fill="none" stroke={C.amber} strokeWidth="5" strokeDasharray="10 10" strokeLinecap="round" className={flow} />
      {items.map((step, i) => {
        const t = i / Math.max(1, items.length - 1);
        const x = 48 + t * 422;
        const y = 190 + Math.sin(i * 1.72 + 1) * 72;
        return <g key={step}><Node x={x} y={y} r="21" color={i % 2 ? C.purple : C.teal} label={i + 1} /><Sub x={x} y={y + 48}>{step}</Sub></g>;
      })}
    </Scene>
  );
}

export function NeuralBrainBridge() {
  return (
    <Scene title="Biological to artificial neuron bridge">
      <Title>Brain metaphor → artificial computation</Title>
      <Curve d="M58 180 C88 118 138 116 160 158 C182 196 138 236 90 224 C64 218 52 198 58 180" color={C.teal} width="4" />
      {[[58,180],[80,124],[106,238],[146,132],[142,224]].map(([x, y], i) => <Curve key={i} d={`M${x} ${y} q${i % 2 ? 42 : -38} ${i < 2 ? -34 : 32} ${i % 2 ? 78 : -72} ${i < 2 ? -42 : 42}`} color={C.teal} width="3" />)}
      <Node x="118" y="182" r="28" color={C.teal} label="soma" />
      <Arrow x1="178" y1="182" x2="244" y2="182" color={C.amber} />
      <SoftCard x="258" y="78" w="100" h="58" title="inputs" sub="dendrites" color={C.blue} />
      <SoftCard x="258" y="154" w="100" h="58" title="Σ + b" sub="soma" color={C.teal} />
      <SoftCard x="258" y="230" w="100" h="58" title="output" sub="axon" color={C.green} />
      <Arrow x1="358" y1="107" x2="430" y2="164" color={C.purple} />
      <Arrow x1="358" y1="183" x2="430" y2="183" color={C.purple} />
      <Arrow x1="358" y1="259" x2="430" y2="202" color={C.purple} />
      <Node x="456" y="183" r="25" color={C.purple} label="w" sub="synaptic weights" />
    </Scene>
  );
}

export function ArtificialNeuron() {
  return (
    <Scene title="Artificial neuron equation visual">
      <Title>Artificial neuron: weighted sum and activation</Title>
      {['x₁', 'x₂', 'x₃'].map((x, i) => <Node key={x} x="70" y={118 + i * 58} r="18" color={C.blue} label={x} />)}
      {[0, 1, 2].map((_, i) => <Arrow key={i} x1="92" y1={118 + i * 58} x2="184" y2="176" color={C.purple} />)}
      <SoftCard x="134" y="70" w="82" h="44" title="wᵢ" sub="weights" color={C.purple} />
      <Node x="230" y="176" r="36" color={C.teal} label="Σ" sub="sum" />
      <Node x="315" y="96" r="18" color={C.amber} label="+b" sub="bias" />
      <Arrow x1="251" y1="176" x2="332" y2="176" color={C.teal} />
      <Arrow x1="315" y1="116" x2="315" y2="148" color={C.amber} />
      <Node x="370" y="176" r="32" color={C.indigo} label="φ" sub="activation" />
      <Arrow x1="402" y1="176" x2="462" y2="176" color={C.green} />
      <Node x="480" y="176" r="22" color={C.green} label="y" sub="output" />
      <circle cx="120" cy="176" r="8" fill={C.blue} className={flow} />
    </Scene>
  );
}

export function DirectedNeuralGraph() {
  const nodes = [[88,110,C.blue,'x1'],[88,235,C.blue,'x2'],[244,86,C.teal,'h1'],[244,178,C.teal,'h2'],[244,270,C.teal,'h3'],[430,178,C.green,'y']];
  const edges = [[0,2,.8],[0,3,-.2],[1,3,.5],[1,4,.7],[2,5,1.2],[3,5,-.6],[4,5,.4]];
  return (
    <Scene title="Directed weighted neural graph">
      <Title>Directed graph: signals follow weighted edges</Title>
      {edges.map(([a, b, w]) => <g key={`${a}-${b}`}><Arrow x1={nodes[a][0] + 20} y1={nodes[a][1]} x2={nodes[b][0] - 22} y2={nodes[b][1]} color={w < 0 ? C.red : C.purple} width="3" /><Sub x={(nodes[a][0] + nodes[b][0]) / 2} y={(nodes[a][1] + nodes[b][1]) / 2 - 8}>{w}</Sub></g>)}
      {nodes.map(([x, y, c, l]) => <Node key={l} x={x} y={y} color={c} label={l} />)}
    </Scene>
  );
}

export function FeedbackCompare() {
  return (
    <Scene title="Feedforward and feedback networks comparison">
      <Title>Feedforward vs feedback</Title>
      <SoftCard x="35" y="82" w="200" h="220" title="Feedforward" sub="one-way inference" color={C.blue} />
      <SoftCard x="285" y="82" w="200" h="220" title="Feedback" sub="state loops back" color={C.indigo} />
      {[74,132,190].map((y) => <><Node key={`f${y}`} x="78" y={y} r="12" color={C.blue} /><Node key={`g${y}`} x="188" y={y} r="12" color={C.teal} /><Arrow key={`a${y}`} x1="92" y1={y} x2="174" y2={y} color={C.blue} /></>)}
      {[128,190,252].map((y) => <><Node key={`r${y}`} x="342" y={y} r="13" color={C.indigo} /><Node key={`s${y}`} x="428" y={y} r="13" color={C.purple} /><Arrow key={`ra${y}`} x1="356" y1={y} x2="414" y2={y} color={C.indigo} /></>)}
      <Curve d="M428 252 C476 232 476 148 428 128" color={C.amber} dashed />
      <Arrow x1="428" y1="128" x2="385" y2="128" color={C.amber} />
    </Scene>
  );
}

export function NetworkArchitectures() {
  return (
    <Scene title="Network architectures">
      <Title>Architectures at a glance</Title>
      <SoftCard x="30" y="80" w="136" h="220" title="Single-layer" color={C.blue} />
      <SoftCard x="192" y="80" w="136" h="220" title="Multi-layer" color={C.teal} />
      <SoftCard x="354" y="80" w="136" h="220" title="Recurrent" color={C.indigo} />
      {[110,165,220].map((y) => <><Node key={`s1${y}`} x="62" y={y} r="10" color={C.blue} /><Node key={`s2${y}`} x="134" y={y} r="10" color={C.green} /><Arrow key={`sa${y}`} x1="74" y1={y} x2="122" y2={y} color={C.blue} /></>)}
      <g transform="translate(132 8) scale(.58)"><LayerNet xs={[118,220,322]} counts={[3,4,2]} labels={['', '', '']} /></g>
      {[132,190,248].map((y) => <Node key={`rr${y}`} x="420" y={y} r="12" color={C.indigo} />)}
      <Curve d="M420 248 C468 220 468 160 420 132" color={C.amber} dashed />
    </Scene>
  );
}

export function PerceptronClassifier() {
  return (
    <Scene title="Perceptron classifier">
      <Title>Perceptron classifier</Title>
      <MiniMatrix x="46" y="122" rows="3" cols="3" hot={[0,2,4,6,8]} color={C.blue} />
      <Label x="82" y="235" fill={C.blue}>input vector x</Label>
      <Arrow x1="136" y1="156" x2="206" y2="156" color={C.purple} />
      <SoftCard x="204" y="120" w="100" h="74" title="w · x + b" sub="weighted sum" color={C.purple} />
      <Arrow x1="304" y1="156" x2="370" y2="156" color={C.amber} />
      <SoftCard x="368" y="120" w="92" h="74" title="step()" sub="threshold" color={C.amber} />
      <Node x="442" y="258" r="25" color={C.green} label="1" sub="class" />
      <Arrow x1="414" y1="194" x2="436" y2="234" color={C.green} />
      <Sub x="260" y="312">linear decision rule: if activation ≥ 0 choose positive class</Sub>
    </Scene>
  );
}

export function DecisionBoundary() {
  return (
    <Scene title="Decision boundary visual">
      <Title>Decision boundary separates classes</Title>
      <Axis />
      {[110,150,185,150].map((x, i) => <Point key={`b${i}`} x={x} y={[230,202,238,160][i]} color={C.green} />)}
      {[320,362,398,335].map((x, i) => <Point key={`r${i}`} x={x} y={[132,164,106,210][i]} color={C.red} />)}
      <Curve d="M126 275 L384 82" color={C.purple} width="6" className={scan} />
      <Label x="390" y="100" fill={C.purple}>w · x + b = 0</Label>
    </Scene>
  );
}

export function PerceptronLearningLoop() {
  return (
    <Scene title="Perceptron learning loop">
      <Title>Learning loop: mistake drives update</Title>
      <ProcessStrip items={[['predict', C.blue], ['compare', C.red], ['update w,b', C.amber], ['shift line', C.purple], ['retry', C.green]]} />
      <Axis x="80" y="292" w="360" h="74" labelX="" labelY="" />
      <Curve d="M118 286 L390 235" color={C.red} dashed />
      <Curve d="M126 270 L405 222" color={C.green} />
      <Point x="214" y="246" color={C.red} mark="!" />
    </Scene>
  );
}

export function ConvergenceViz() {
  return (
    <Scene title="Perceptron convergence">
      <Title>Linearly separable data converges</Title>
      <Axis />
      {[120,146,170,196].map((x, i) => <Point key={`g${i}`} x={x} y={244 - i * 20} color={C.green} />)}
      {[314,346,380,412].map((x, i) => <Point key={`r${i}`} x={x} y={106 + i * 26} color={C.red} />)}
      {['M116 108 L356 272', 'M112 150 L382 258', 'M112 194 L410 238'].map((d, i) => <Curve key={d} d={d} color={i === 2 ? C.green : C.amber} width={i === 2 ? 6 : 3} dashed={i < 2} />)}
      <SoftCard x="330" y="60" w="130" h="54" title="stable" sub="no mistakes" color={C.green} />
    </Scene>
  );
}

export function GaussianBayesScene() {
  return (
    <Scene title="Gaussian Bayes and perceptron boundary">
      <Title>Gaussian Bayes vs perceptron boundary</Title>
      <Axis x="54" y="286" w="410" h="190" labelX="feature" labelY="density" />
      <path d="M75 286 C112 280 132 116 176 116 C220 116 236 280 278 286" fill={C.blue} opacity=".18" stroke={C.blue} strokeWidth="4" />
      <path d="M190 286 C232 282 262 126 315 126 C370 126 392 280 444 286" fill={C.red} opacity=".15" stroke={C.red} strokeWidth="4" />
      <Curve d="M246 286 L246 94" color={C.green} dashed={false} />
      <Curve d="M286 286 L286 94" color={C.purple} dashed />
      <Label x="230" y="88" fill={C.green} size="11">Bayes</Label>
      <Label x="304" y="88" fill={C.purple} size="11">perceptron</Label>
    </Scene>
  );
}

export function MlpScene() {
  return (
    <Scene title="Multilayer perceptron">
      <Title>MLP: nonlinear mapping by hidden layers</Title>
      <LayerNet xs={[70,188,310,446]} counts={[4,6,5,2]} labels={['input', 'hidden 1', 'hidden 2', 'output']} />
      <path d="M166 78 C240 42 325 44 394 78" fill="none" stroke={C.teal} strokeWidth="14" opacity=".08" />
    </Scene>
  );
}

export function BatchOnlineViz() {
  return (
    <Scene title="Batch and online learning">
      <Title>Batch vs online learning</Title>
      <SoftCard x="35" y="82" w="210" h="220" title="Batch" sub="many examples → one update" color={C.blue} />
      <SoftCard x="275" y="82" w="210" h="220" title="Online" sub="streaming updates" color={C.teal} />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={72 + (i % 4) * 34} cy={142 + Math.floor(i / 4) * 34} r="8" fill={C.blue} opacity=".75" />)}
      <Arrow x1="182" y1="176" x2="215" y2="176" color={C.amber} />
      {[0,1,2,3].map((i) => <g key={i}><circle cx={324 + i * 32} cy="154" r="8" fill={C.teal} /><Arrow x1={326 + i * 32} y1="184" x2={348 + i * 32} y2="218" color={C.amber} width="3" /></g>)}
      <Curve d="M315 250 C360 218 404 278 452 228" color={C.green} />
    </Scene>
  );
}

export function ForwardPass() {
  return (
    <Scene title="Forward pass">
      <Title>Forward pass: activations move left to right</Title>
      <LayerNet xs={[78,204,330,450]} counts={[3,4,4,2]} labels={['x', 'z¹,a¹', 'z²,a²', 'ŷ']} />
      {[118,244,370].map((x) => <circle key={x} cx={x} cy="174" r="9" fill={C.blue} className={flow} style={{ filter: 'var(--dl-soft-glow)' }} />)}
      <Label x="260" y="66" fill={C.muted}>compute values layer by layer</Label>
    </Scene>
  );
}

export function BackpropFlow() {
  return (
    <Scene title="Backpropagation flow">
      <Title>Backpropagation: error sends credit backward</Title>
      <LayerNet xs={[78,204,330,450]} counts={[3,4,4,2]} labels={['input', 'hidden', 'hidden', 'loss']} />
      <Arrow x1="460" y1="92" x2="342" y2="130" color={C.red} width="5" />
      <Arrow x1="330" y1="176" x2="216" y2="176" color={C.purple} width="5" />
      <Arrow x1="204" y1="230" x2="90" y2="210" color={C.purple} width="5" />
      <SoftCard x="372" y="54" w="112" h="48" title="loss L" color={C.red} />
      <Label x="260" y="324" fill={C.red}>red error gradients become purple weight updates</Label>
    </Scene>
  );
}

export function GradientGraph() {
  const nodes = [[80,190,'x',C.blue],[178,122,'w',C.purple],[178,248,'b',C.amber],[286,190,'z',C.teal],[398,190,'L',C.red]];
  return (
    <Scene title="Computational graph gradients">
      <Title>Computational graph: forward values, backward derivatives</Title>
      <Arrow x1="100" y1="190" x2="262" y2="190" color={C.blue} />
      <Arrow x1="194" y1="132" x2="270" y2="174" color={C.purple} />
      <Arrow x1="194" y1="238" x2="270" y2="206" color={C.amber} />
      <Arrow x1="310" y1="190" x2="374" y2="190" color={C.teal} />
      <Arrow x1="378" y1="212" x2="306" y2="236" color={C.red} dashed />
      <Arrow x1="266" y1="238" x2="196" y2="256" color={C.purple} dashed />
      {nodes.map(([x, y, l, c]) => <Node key={l} x={x} y={y} r="25" color={c} label={l} />)}
      <Label x="252" y="316" fill={C.muted}>forward: numbers, backward: partial derivatives</Label>
    </Scene>
  );
}

export function XorBoundaryViz() {
  return (
    <Scene title="XOR boundary visual">
      <Title>XOR: one line fails, hidden layer succeeds</Title>
      <Axis x="70" y="285" w="210" h="205" />
      <Point x="105" y="252" color={C.red} mark="0" /><Point x="235" y="122" color={C.red} mark="0" />
      <Point x="105" y="122" color={C.green} mark="1" /><Point x="235" y="252" color={C.green} mark="1" />
      <Curve d="M84 204 L266 140" color={C.red} dashed />
      <Arrow x1="300" y1="180" x2="350" y2="180" color={C.purple} />
      <SoftCard x="355" y="105" w="112" h="56" title="hidden unit 1" color={C.teal} />
      <SoftCard x="355" y="198" w="112" h="56" title="hidden unit 2" color={C.teal} />
      <Curve d="M350 104 C395 82 448 86 480 122" color={C.green} />
      <Curve d="M350 258 C396 284 448 278 480 238" color={C.green} />
    </Scene>
  );
}

export function HeuristicsViz() {
  return (
    <Scene title="Training heuristics">
      <Title>Heuristics that make training behave</Title>
      <SoftCard x="42" y="106" w="126" h="150" title="Learning rate" sub="step size η" color={C.amber} />
      <SoftCard x="197" y="106" w="126" h="150" title="Momentum" sub="smooth velocity" color={C.indigo} />
      <SoftCard x="352" y="106" w="126" h="150" title="Initialization" sub="start scale" color={C.purple} />
      <Curve d="M70 212 C94 132 126 245 150 158" color={C.amber} />
      <Curve d="M218 210 C250 190 272 164 302 142" color={C.indigo} width="7" />
      {[382,416,450].map((x, i) => <circle key={x} cx={x} cy={158 + i * 26} r={6 + i * 3} fill={C.purple} opacity=".7" />)}
    </Scene>
  );
}

export function OverfitCurve() {
  return (
    <Scene title="Overfitting curve">
      <Title>Overfitting: validation loss turns upward</Title>
      <Axis x="70" y="284" w="380" h="200" labelX="epochs" labelY="loss" />
      <Curve d="M82 250 C150 192 220 148 430 112" color={C.green} />
      <Curve d="M82 250 C150 178 218 136 286 150 S376 228 430 260" color={C.red} />
      <Curve d="M286 284 L286 92" color={C.amber} dashed />
      <Label x="232" y="132" fill={C.green}>train</Label>
      <Label x="376" y="234" fill={C.red}>validation</Label>
      <Sub x="286" y="72">early stopping region</Sub>
    </Scene>
  );
}

export function L2WeightViz() {
  return (
    <Scene title="L2 regularization">
      <Title>L2 regularization shrinks large weights</Title>
      <SoftCard x="44" y="112" w="126" h="130" title="large w" sub="wiggly model" color={C.red} />
      {[70,94,118,142].map((x, i) => <rect key={x} x={x} y={205 - i * 26} width="14" height={35 + i * 26} rx="5" fill={C.red} opacity=".75" />)}
      <Arrow x1="180" y1="178" x2="256" y2="178" color={C.amber} />
      <Node x="280" y="178" r="32" color={C.amber} label="λΣw²" sub="penalty" />
      <Arrow x1="314" y1="178" x2="390" y2="178" color={C.green} />
      <SoftCard x="394" y="112" w="86" h="130" title="small w" sub="smooth" color={C.green} />
      {[412,432,452].map((x) => <rect key={x} x={x} y="180" width="13" height="42" rx="5" fill={C.green} opacity=".75" />)}
    </Scene>
  );
}

export function AugmentationScene() {
  return (
    <Scene title="Data augmentation">
      <Title>Augmentation: many views, same label</Title>
      <SoftCard x="34" y="124" w="88" h="100" title="original" color={C.blue} />
      <MiniMatrix x="56" y="152" size="13" rows="4" cols="4" hot={[1,4,5,10,14]} color={C.blue} />
      <Arrow x1="128" y1="174" x2="180" y2="174" color={C.amber} />
      {['rotate', 'crop', 'flip', 'noise'].map((t, i) => <SoftCard key={t} x={188 + (i % 2) * 120} y={82 + Math.floor(i / 2) * 112} w="92" h="72" title={t} color={[C.teal,C.purple,C.indigo,C.amber][i]} />)}
      <Arrow x1="400" y1="174" x2="454" y2="174" color={C.green} />
      <Node x="472" y="174" r="26" color={C.green} label="cat" sub="same label" />
    </Scene>
  );
}

export function SemiSupervisedViz() {
  return (
    <Scene title="Semi-supervised learning">
      <Title>Semi-supervised learning: labels guide unlabeled data</Title>
      {[0,1,2].map((i) => <Point key={`l${i}`} x={62 + i * 34} y={154 + i * 24} color={C.green} mark="L" />)}
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={72 + (i % 5) * 30} cy={228 + Math.floor(i / 5) * 24} r="7" fill={C.muted} opacity=".35" className={drift} />)}
      <Arrow x1="190" y1="190" x2="250" y2="190" color={C.teal} />
      <SoftCard x="252" y="134" w="112" h="104" title="shared rep" sub="cluster structure" color={C.teal} />
      <Arrow x1="364" y1="190" x2="430" y2="190" color={C.green} />
      <SoftCard x="418" y="134" w="74" h="104" title="classifier" color={C.green} />
    </Scene>
  );
}

export function LossLandscape() {
  return (
    <Scene title="Loss landscape">
      <Title>Loss landscape: optimize downhill</Title>
      {Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx="260" cy={210 - i * 13} rx={180 - i * 21} ry={78 - i * 8} fill="none" stroke={i < 3 ? C.red : C.amber} strokeWidth="3" opacity={0.25 + i * 0.08} />)}
      <path d="M92 246 C164 154 206 248 266 132 S386 186 438 92" fill="none" stroke={C.navy} strokeWidth="3" opacity=".22" />
      <Curve d="M414 92 C374 130 340 158 304 178 S248 206 218 232" color={C.green} width="6" />
      <Node x="218" y="232" r="18" color={C.green} label="min" />
    </Scene>
  );
}

export function IllConditionViz() {
  return (
    <Scene title="Ill-conditioned optimization valley">
      <Title>Ill-conditioned valley: zig-zag gradients</Title>
      {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="260" cy="190" rx={190 - i * 20} ry={88 - i * 9} fill="none" stroke={C.indigo} strokeWidth="3" opacity=".16" transform="rotate(-18 260 190)" />)}
      <Curve d="M110 135 L178 232 L226 128 L272 215 L320 144 L360 198 L400 164" color={C.red} width="5" />
      <Label x="260" y="318" fill={C.muted}>narrow curvature causes slow sideways progress</Label>
    </Scene>
  );
}

export function LocalMinimaViz() {
  return (
    <Scene title="Local minima">
      <Title>Local minima: nearby low point may not be global</Title>
      <Axis x="58" y="280" w="410" h="200" labelX="weight" labelY="loss" />
      <Curve d="M70 180 C128 90 156 294 214 214 S302 90 350 214 S430 292 462 122" color={C.purple} />
      <Node x="214" y="214" r="16" color={C.amber} label="L" sub="local" />
      <Node x="350" y="214" r="16" color={C.green} label="G" sub="global" />
    </Scene>
  );
}

export function PlateauViz() {
  return (
    <Scene title="Plateau optimization">
      <Title>Plateau: gradients become tiny</Title>
      <Axis x="58" y="280" w="410" h="200" labelX="weight" labelY="loss" />
      <Curve d="M74 112 C142 148 176 188 224 205 C280 224 360 224 450 226" color={C.indigo} />
      <Arrow x1="210" y1="205" x2="286" y2="220" color={C.amber} dashed />
      <Label x="328" y="196" fill={C.amber}>slow updates</Label>
    </Scene>
  );
}

export function SaddlePointScene() {
  return (
    <Scene title="Saddle point">
      <Title>Saddle point: optimizer slows near flat curvature</Title>
      <path d="M88 246 C160 154 228 158 260 190 C292 222 362 214 436 118" fill="none" stroke={C.teal} strokeWidth="6" />
      <path d="M94 112 C168 216 224 220 260 190 C296 160 362 154 428 252" fill="none" stroke={C.purple} strokeWidth="6" opacity=".55" />
      <Node x="260" y="190" r="24" color={C.amber} label="s" sub="saddle" />
      <Curve d="M112 236 C170 206 218 194 248 190" color={C.red} dashed />
      <Arrow x1="248" y1="190" x2="260" y2="190" color={C.red} />
    </Scene>
  );
}

export function FlatRegionViz() {
  return (
    <Scene title="Flat region">
      <Title>Flat region: low gradient, little movement</Title>
      <Axis x="58" y="280" w="410" h="200" labelX="parameter" labelY="loss" />
      <Curve d="M70 132 C126 188 166 220 230 222 L380 222 C418 220 438 188 458 136" color={C.teal} />
      {[242,282,322,362].map((x) => <circle key={x} cx={x} cy="222" r="6" fill={C.amber} className={pulse} />)}
      <Label x="310" y="198" fill={C.amber}>almost zero slope</Label>
    </Scene>
  );
}

export function ConvolutionScanner() {
  return (
    <Scene title="Convolution scanner">
      <Title>Convolution: 3×3 kernel scans an image</Title>
      <MiniMatrix x="60" y="86" size="28" rows="6" cols="6" hot={[2,8,14,20,21,27,33]} color={C.blue} />
      <rect x="88" y="114" width="81" height="81" rx="8" fill="none" stroke={C.amber} strokeWidth="5" className={scan} />
      <MiniMatrix x="215" y="126" size="27" rows="3" cols="3" hot={[0,4,8]} color={C.purple} />
      <Arrow x1="185" y1="166" x2="212" y2="166" color={C.amber} />
      <Arrow x1="303" y1="166" x2="346" y2="166" color={C.teal} />
      <MiniMatrix x="352" y="104" size="31" rows="4" cols="4" hot={[0,1,4,5,10,15]} color={C.teal} />
      <Label x="106" y="282" fill={C.blue}>image</Label><Label x="256" y="282" fill={C.purple}>kernel</Label><Label x="414" y="282" fill={C.teal}>feature map</Label>
    </Scene>
  );
}

export function CnnMotivation() {
  return (
    <Scene title="CNN motivation">
      <Title>CNN motivation: dense vs local shared weights</Title>
      <SoftCard x="34" y="86" w="210" h="220" title="Dense" sub="too many weights" color={C.red} />
      <SoftCard x="276" y="86" w="210" h="220" title="Local + shared" sub="same filter everywhere" color={C.green} />
      {Array.from({ length: 7 }, (_, i) => <line key={i} x1="72" y1={128 + i * 20} x2="210" y2="196" stroke={C.red} strokeWidth="2" opacity=".45" />)}
      {[0,1,2].map((i) => <rect key={i} x={324 + i * 34} y={138 + i * 22} width="52" height="52" rx="8" fill="none" stroke={C.green} strokeWidth="4" opacity=".65" />)}
    </Scene>
  );
}

export function FeatureMapBuilder() {
  return (
    <Scene title="Feature map builder">
      <Title>Feature map emerges from repeated filter response</Title>
      <MiniMatrix x="58" y="94" size="25" rows="6" cols="6" hot={[1,7,13,19,25,31]} color={C.blue} />
      <Arrow x1="225" y1="170" x2="288" y2="170" color={C.teal} />
      <MiniMatrix x="304" y="104" size="31" rows="5" cols="5" hot={[0,5,10,16,22,23]} color={C.teal} />
      <circle cx="140" cy="170" r="54" fill="var(--dl-halo)" className={glow} />
      <Label x="390" y="294" fill={C.teal}>activated locations become map values</Label>
    </Scene>
  );
}

export function PoolingViz() {
  return (
    <Scene title="Max pooling visual">
      <Title>Max pooling keeps strongest activation</Title>
      <MiniMatrix x="82" y="94" size="42" rows="4" cols="4" hot={[0,3,5,10,15]} color={C.blue} />
      <rect x="82" y="94" width="81" height="81" rx="8" fill="none" stroke={C.amber} strokeWidth="5" className={scan} />
      <Arrow x1="282" y1="178" x2="344" y2="178" color={C.green} />
      <MiniMatrix x="362" y="136" size="42" rows="2" cols="2" hot={[0,1,2,3]} color={C.green} />
      <Label x="123" y="286" fill={C.blue}>4×4 activations</Label>
      <Label x="404" y="286" fill={C.green}>2×2 pooled map</Label>
    </Scene>
  );
}

export function CnnVolume() {
  return (
    <Scene title="CNN volume">
      <Title>CNN volume: width × height × channels</Title>
      {[0,1,2,3].map((i) => <g key={i} transform={`translate(${90 + i * 72} ${86 + i * 18})`}><rect width="116" height="144" rx="12" fill={i % 2 ? C.teal : C.blue} opacity=".16" stroke={i % 2 ? C.teal : C.blue} strokeWidth="3" /><path d="M0 0 l20 -14 h116 l-20 14z" fill={i % 2 ? C.teal : C.blue} opacity=".28" /><path d="M116 0 l20 -14 v144 l-20 14z" fill={i % 2 ? C.teal : C.blue} opacity=".22" /></g>)}
      <Arrow x1="96" y1="288" x2="380" y2="288" color={C.amber} />
      <Label x="260" y="318" fill={C.muted}>layers transform volumes, not flat vectors</Label>
    </Scene>
  );
}

export function FeatureHierarchy() {
  const items = [['edges', C.blue], ['textures', C.teal], ['parts', C.purple], ['objects', C.green]];
  return (
    <Scene title="CNN feature hierarchy">
      <Title>Feature hierarchy</Title>
      {items.map(([t, c], i) => <g key={t}><SoftCard x={40 + i * 118} y="130" w="90" h="92" title={t} color={c} />{i < 3 && <Arrow x1={130 + i * 118} y1="176" x2={156 + i * 118} y2="176" color={C.amber} />}</g>)}
      <Curve d="M66 158 L102 194 M102 158 L66 194" color={C.blue} width="3" />
      <circle cx="206" cy="176" r="28" fill="none" stroke={C.teal} strokeWidth="5" strokeDasharray="8 7" />
      <path d="M310 192 q18-44 42 0" fill="none" stroke={C.purple} strokeWidth="5" />
      <Node x="438" y="176" r="24" color={C.green} label="✓" />
    </Scene>
  );
}

export function StrongPriorViz() {
  return (
    <Scene title="CNN strong prior">
      <Title>Strong prior: locality + weight sharing</Title>
      <SoftCard x="54" y="100" w="174" h="160" title="Locality" sub="near pixels matter" color={C.blue} />
      <SoftCard x="292" y="100" w="174" h="160" title="Weight sharing" sub="same detector repeats" color={C.green} />
      <MiniMatrix x="92" y="148" size="22" rows="4" cols="4" hot={[5,6,9,10]} color={C.blue} />
      {[0,1,2].map((i) => <rect key={i} x={330 + i * 28} y={152 + i * 14} width="52" height="52" rx="8" fill="none" stroke={C.green} strokeWidth="4" />)}
    </Scene>
  );
}

export function ConvVariants() {
  return (
    <Scene title="Convolution variants">
      <Title>Convolution variants: stride, padding, channels</Title>
      <SoftCard x="32" y="102" w="132" h="160" title="Stride" sub="jump size" color={C.amber} />
      <SoftCard x="194" y="102" w="132" h="160" title="Padding" sub="border zeros" color={C.blue} />
      <SoftCard x="356" y="102" w="132" h="160" title="Channels" sub="RGB / depth" color={C.purple} />
      <Arrow x1="60" y1="202" x2="130" y2="202" color={C.amber} dashed />
      <rect x="226" y="148" width="68" height="68" fill="#fff" stroke={C.blue} strokeWidth="4" /><rect x="214" y="136" width="92" height="92" fill="none" stroke={C.blue} strokeDasharray="8 6" strokeWidth="3" />
      {[0,1,2].map((i) => <rect key={i} x={398 + i * 12} y={144 - i * 10} width="48" height="78" rx="8" fill={[C.red,C.green,C.blue][i]} opacity=".38" />)}
    </Scene>
  );
}

export function StructuredOutputViz() {
  return (
    <Scene title="Structured output from CNN">
      <Title>Structured output: image in, spatial map out</Title>
      <MiniMatrix x="58" y="112" size="27" rows="5" cols="5" hot={[1,2,7,12,17,22]} color={C.blue} />
      <Arrow x1="210" y1="178" x2="270" y2="178" color={C.teal} />
      <SoftCard x="268" y="120" w="88" h="112" title="CNN" color={C.teal} />
      <Arrow x1="356" y1="178" x2="414" y2="178" color={C.green} />
      <MiniMatrix x="416" y="126" size="23" rows="4" cols="4" hot={[0,1,4,5,10,15]} color={C.green} />
      <Sub x="452" y="264">segmentation / heatmap</Sub>
    </Scene>
  );
}

export function CnnDataTypes() {
  return (
    <Scene title="CNN data types">
      <Title>CNN-friendly data types</Title>
      <SoftCard x="36" y="112" w="102" h="128" title="1D" sub="signal/text" color={C.indigo} />
      <SoftCard x="154" y="112" w="102" h="128" title="2D" sub="images" color={C.blue} />
      <SoftCard x="272" y="112" w="102" h="128" title="3D" sub="medical/video" color={C.purple} />
      <SoftCard x="390" y="112" w="92" h="128" title="Grid" sub="spatial" color={C.green} />
      <Curve d="M58 186 C78 146 96 228 118 168" color={C.indigo} />
      <MiniMatrix x="180" y="154" size="15" rows="4" cols="4" hot={[1,4,6,11]} color={C.blue} />
      {[0,1,2].map((i) => <rect key={i} x={306 + i * 8} y={150 - i * 7} width="38" height="50" rx="5" fill={C.purple} opacity=".25" stroke={C.purple} />)}
      <MiniMatrix x="416" y="156" size="13" rows="4" cols="4" hot={[0,5,10,15]} color={C.green} />
    </Scene>
  );
}

export function EfficientConvViz() {
  return (
    <Scene title="Efficient convolution">
      <Title>Efficient convolution: reuse filter, reduce parameters</Title>
      <SoftCard x="44" y="120" w="126" h="110" title="Dense" sub="N×M weights" color={C.red} />
      <Arrow x1="180" y1="176" x2="246" y2="176" color={C.amber} />
      <SoftCard x="244" y="120" w="126" h="110" title="Conv" sub="k×k shared" color={C.green} />
      <Arrow x1="380" y1="176" x2="442" y2="176" color={C.green} />
      <Node x="460" y="176" r="25" color={C.green} label="fast" />
      {Array.from({ length: 6 }, (_, i) => <line key={i} x1="70" y1={145 + i * 12} x2="145" y2="176" stroke={C.red} opacity=".35" />)}
      {[0,1,2].map((i) => <rect key={i} x={280 + i * 18} y="154" width="34" height="34" rx="6" fill="none" stroke={C.green} strokeWidth="3" />)}
    </Scene>
  );
}

export function RnnUnroll() {
  return (
    <Scene title="RNN unroll">
      <Title>RNN unroll through time</Title>
      {[0,1,2,3].map((i) => <g key={i}><SoftCard x={54 + i * 110} y="132" w="78" h="78" title="RNN" sub={`t${i + 1}`} color={C.indigo} />{i < 3 && <Arrow x1={132 + i * 110} y1="170" x2={164 + i * 110} y2="170" color={C.indigo} />}</g>)}
      {[0,1,2,3].map((i) => <Arrow key={`x${i}`} x1={93 + i * 110} y1="252" x2={93 + i * 110} y2="212" color={C.blue} />)}
      {[0,1,2,3].map((i) => <Arrow key={`y${i}`} x1={93 + i * 110} y1="132" x2={93 + i * 110} y2="88" color={C.green} />)}
    </Scene>
  );
}

export function SequenceMemory() {
  return (
    <Scene title="Sequence memory">
      <Title>Hidden state carries memory through time</Title>
      {[0,1,2,3,4].map((i) => <Node key={i} x={78 + i * 90} y={178} r="22" color={C.indigo} label={`h${i}`} />)}
      {[0,1,2,3].map((i) => <Arrow key={i} x1={102 + i * 90} y1="178" x2={144 + i * 90} y2="178" color={C.indigo} />)}
      <Curve d="M82 226 C178 274 314 274 438 226" color={C.amber} dashed />
      <Label x="260" y="294" fill={C.amber}>context accumulates, decays, and transforms</Label>
    </Scene>
  );
}

export function BidirectionalRnn() {
  return (
    <Scene title="Bidirectional RNN">
      <Title>Bidirectional RNN combines past and future context</Title>
      {[0,1,2,3].map((i) => <Node key={`f${i}`} x={110 + i * 92} y="132" r="18" color={C.blue} label={`→`} />)}
      {[0,1,2,3].map((i) => <Node key={`b${i}`} x={110 + i * 92} y="228" r="18" color={C.purple} label={`←`} />)}
      {[0,1,2].map((i) => <Arrow key={`fa${i}`} x1={130 + i * 92} y1="132" x2={182 + i * 92} y2="132" color={C.blue} />)}
      {[0,1,2].map((i) => <Arrow key={`ba${i}`} x1={366 - i * 92} y1="228" x2={314 - i * 92} y2="228" color={C.purple} />)}
      {[0,1,2,3].map((i) => <Arrow key={`c${i}`} x1={110 + i * 92} y1="150" x2={110 + i * 92} y2="205" color={C.green} dashed />)}
      <SoftCard x="205" y="166" w="110" h="48" title="combine" color={C.green} />
    </Scene>
  );
}

export function EncoderDecoder() {
  return (
    <Scene title="Encoder decoder">
      <Title>Encoder-decoder sequence model</Title>
      {['x1','x2','x3'].map((t, i) => <Node key={t} x={70 + i * 62} y="178" r="18" color={C.blue} label={t} />)}
      <SoftCard x="206" y="124" w="86" h="108" title="Encoder" color={C.indigo} />
      <Arrow x1="176" y1="178" x2="206" y2="178" color={C.blue} />
      <Arrow x1="292" y1="178" x2="342" y2="178" color={C.amber} />
      <Node x="318" y="110" r="22" color={C.amber} label="c" sub="context" />
      <SoftCard x="342" y="124" w="86" h="108" title="Decoder" color={C.purple} />
      {['y1','y2'].map((t, i) => <Node key={t} x={452 + i * 42} y={158 + i * 40} r="16" color={C.green} label={t} />)}
    </Scene>
  );
}

export function DeepRnnStack() {
  return (
    <Scene title="Deep RNN stack">
      <Title>Deep RNN: stacked recurrent layers</Title>
      {[0,1,2,3].map((t) => [0,1,2].map((l) => <Node key={`${t}-${l}`} x={110 + t * 88} y={246 - l * 70} r="17" color={[C.blue,C.teal,C.purple][l]} label={`h`} />))}
      {[0,1,2].map((l) => [0,1,2].map((t) => <Arrow key={`${l}-${t}`} x1={130 + t * 88} y1={246 - l * 70} x2={178 + t * 88} y2={246 - l * 70} color={[C.blue,C.teal,C.purple][l]} />))}
      {[0,1,2,3].map((t) => [0,1].map((l) => <Arrow key={`v${t}-${l}`} x1={110 + t * 88} y1={226 - l * 70} x2={110 + t * 88} y2={196 - l * 70} color={C.amber} dashed />))}
      <Sub x="260" y="318">depth across layers, recurrence across time</Sub>
    </Scene>
  );
}

export function RecursiveNet() {
  return (
    <Scene title="Recursive neural network">
      <Title>Recursive net composes a tree</Title>
      {[86,178,342,434].map((x, i) => <Node key={i} x={x} y="260" r="18" color={C.blue} label={['a','b','c','d'][i]} />)}
      <Node x="132" y="190" r="20" color={C.teal} label="h" />
      <Node x="388" y="190" r="20" color={C.teal} label="h" />
      <Node x="260" y="112" r="27" color={C.purple} label="root" />
      <Arrow x1="86" y1="240" x2="122" y2="206" color={C.teal} /><Arrow x1="178" y1="240" x2="142" y2="206" color={C.teal} />
      <Arrow x1="342" y1="240" x2="378" y2="206" color={C.teal} /><Arrow x1="434" y1="240" x2="398" y2="206" color={C.teal} />
      <Arrow x1="146" y1="178" x2="238" y2="126" color={C.purple} /><Arrow x1="374" y1="178" x2="282" y2="126" color={C.purple} />
    </Scene>
  );
}

function Gate({ x, y, label, color, open = true }) {
  return (
    <g className={open ? glow : pulse}>
      <rect x={x} y={y} width="72" height="44" rx="14" fill="#fff" stroke={color} strokeWidth="3" style={{ filter: 'var(--dl-shadow)' }} />
      <Label x={x + 36} y={y + 27} fill={color}>{label}</Label>
    </g>
  );
}

export function LstmCell() {
  return (
    <Scene title="LSTM cell gates">
      <Title>LSTM cell: controlled memory flow</Title>
      <rect x="72" y="88" width="376" height="190" rx="26" fill="var(--dl-glass)" stroke={C.indigo} strokeWidth="3" style={{ filter: 'var(--dl-shadow)' }} />
      <Curve d="M86 138 H430" color={C.green} width="8" className={flow} />
      <Label x="260" y="124" fill={C.green}>cell state Cₜ</Label>
      <Gate x="98" y="184" label="forget" color={C.red} />
      <Gate x="188" y="184" label="input" color={C.blue} />
      <Gate x="278" y="184" label="candidate" color={C.purple} />
      <Gate x="368" y="184" label="output" color={C.amber} />
      <Arrow x1="40" y1="232" x2="96" y2="232" color={C.blue} />
      <Arrow x1="448" y1="232" x2="490" y2="232" color={C.green} />
      <Sub x="54" y="256">xₜ,hₜ₋₁</Sub><Sub x="474" y="256">hₜ</Sub>
    </Scene>
  );
}

export function GateFlowViz() {
  return (
    <Scene title="Gate flow">
      <Title>Gate flow: open, scale, close</Title>
      <Gate x="70" y="142" label="open" color={C.green} />
      <Arrow x1="142" y1="164" x2="206" y2="164" color={C.green} />
      <Gate x="210" y="142" label="scale" color={C.amber} />
      <Arrow x1="282" y1="164" x2="346" y2="164" color={C.amber} />
      <Gate x="350" y="142" label="close" color={C.red} open={false} />
      <Curve d="M78 230 C178 286 334 286 442 230" color={C.indigo} dashed />
      <Label x="260" y="302" fill={C.muted}>sigmoid gates choose how much information passes</Label>
    </Scene>
  );
}

export function RevisionMap({ title = 'Revision map', nodes = ['Neuron', 'Perceptron', 'MLP', 'Backprop', 'CNN', 'RNN', 'LSTM'] }) {
  const items = nodes.slice(0, 9);
  return (
    <Scene title={title}>
      <Title>{title}</Title>
      <Node x="260" y="178" r="34" color={C.teal} label="DL" />
      {items.map((n, i) => {
        const a = (Math.PI * 2 * i) / items.length - Math.PI / 2;
        const x = 260 + Math.cos(a) * 165;
        const y = 178 + Math.sin(a) * 104;
        return <g key={n}><line x1="260" y1="178" x2={x} y2={y} stroke={C.soft} strokeWidth="3" /><Node x={x} y={y} r="18" color={[C.blue,C.teal,C.purple,C.red,C.amber,C.indigo,C.green][i % 7]} label={i + 1} /><Sub x={x} y={y + 42}>{n}</Sub></g>;
      })}
    </Scene>
  );
}

export function ExamStrategy() {
  return (
    <Scene title="Exam strategy">
      <Title>Exam strategy: define, draw, derive, compare</Title>
      <ProcessStrip y="170" items={[['define term', C.blue], ['draw diagram', C.teal], ['write equation', C.purple], ['explain steps', C.amber], ['compare limits', C.green]]} />
      <SoftCard x="86" y="254" w="348" h="54" title="For BCA701 answers: diagram first, then algorithm and intuition" color={C.indigo} />
    </Scene>
  );
}

export function DlHeroNet() {
  return (
    <Scene title="Deep learning hero network">
      <Title>Deep Learning: networks that learn representations</Title>
      <circle cx="260" cy="180" r="122" fill="var(--dl-halo)" className={glow} />
      <LayerNet xs={[86,190,312,432]} counts={[5,7,6,3]} labels={['data', 'features', 'abstractions', 'prediction']} />
      <Curve d="M64 72 C170 32 355 36 456 94" color={C.blue} dashed />
      <Curve d="M74 300 C182 326 342 326 458 278" color={C.purple} dashed />
    </Scene>
  );
}

const visualMap = {
  MasterStory,
  JourneyPath,
  NeuralBrainBridge,
  ArtificialNeuron,
  DirectedNeuralGraph,
  FeedbackCompare,
  NetworkArchitectures,
  PerceptronClassifier,
  DecisionBoundary,
  PerceptronLearningLoop,
  ConvergenceViz,
  GaussianBayesScene,
  MlpScene,
  BatchOnlineViz,
  ForwardPass,
  BackpropFlow,
  GradientGraph,
  XorBoundaryViz,
  HeuristicsViz,
  OverfitCurve,
  L2WeightViz,
  AugmentationScene,
  SemiSupervisedViz,
  LossLandscape,
  IllConditionViz,
  LocalMinimaViz,
  PlateauViz,
  SaddlePointScene,
  FlatRegionViz,
  ConvolutionScanner,
  CnnMotivation,
  FeatureMapBuilder,
  PoolingViz,
  CnnVolume,
  FeatureHierarchy,
  StrongPriorViz,
  ConvVariants,
  StructuredOutputViz,
  CnnDataTypes,
  EfficientConvViz,
  RnnUnroll,
  SequenceMemory,
  BidirectionalRnn,
  EncoderDecoder,
  DeepRnnStack,
  RecursiveNet,
  LstmCell,
  GateFlowViz,
  RevisionMap,
  ExamStrategy,
  DlHeroNet,
};

export function pickDlVisual(key, opts = {}) {
  const Component = visualMap[key] || DlHeroNet;
  return <Component {...opts} />;
}
