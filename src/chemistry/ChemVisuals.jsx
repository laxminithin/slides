import React, { useId } from 'react';

const C = {
  navy: '#16324f', aqua: '#0f9db8', cobalt: '#2f6fed', coral: '#e4574b',
  amber: '#e09b2d', violet: '#7a5af8', emerald: '#1f9d6a',
  cream: '#fffcf7', sand: '#f7f3eb', ink: '#132238', muted: '#5a6b7d',
};

function Scene({ children, viewBox = '0 0 520 360', label = 'Chemistry visual' }) {
  const id = `chem-${useId().replace(/:/g, '')}`;
  return (
    <svg className="chem-scene" viewBox={viewBox} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={C.aqua} stopOpacity=".9" />
          <stop offset="1" stopColor={C.cobalt} stopOpacity=".65" />
        </linearGradient>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor={C.sand} />
        </linearGradient>
        <radialGradient id={`${id}-g`}>
          <stop stopColor="#fff" stopOpacity=".95" />
          <stop offset=".35" stopColor={C.amber} stopOpacity=".75" />
          <stop offset="1" stopColor={C.amber} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-s`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor={C.navy} floodOpacity=".14" />
        </filter>
      </defs>
      <rect width="520" height="360" rx="24" fill={C.cream} />
      <circle cx="450" cy="45" r="92" fill={C.aqua} opacity=".06" />
      <g style={{ '--scene-a': `url(#${id}-a)`, '--scene-w': `url(#${id}-w)`, '--scene-g': `url(#${id}-g)`, '--scene-s': `url(#${id}-s)` }}>
        {children}
      </g>
    </svg>
  );
}

function Title({ children, x = 28, y = 34, anchor = 'start', fill = C.navy, size = 18 }) {
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight="800">{children}</text>;
}

function Label({ children, x, y, anchor = 'middle', fill = C.navy, size = 18, weight = 700 }) {
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight={weight}>{children}</text>;
}

function Arrow({ x1, y1, x2, y2, color = C.aqua, dashed = false, className = 'chem-anim-flow' }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - 11 * Math.cos(a - .52)},${y2 - 11 * Math.sin(a - .52)}`;
  const p3 = `${x2 - 11 * Math.cos(a + .52)},${y2 - 11 * Math.sin(a + .52)}`;
  return (
    <g className={className}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={dashed ? '8 7' : undefined} />
      <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
    </g>
  );
}

function Card({ x, y, w = 100, h = 66, color = C.aqua, title, sub, className = 'chem-anim-rise' }) {
  return (
    <g className={className}>
      <rect x={x} y={y} width={w} height={h} rx="14" fill="#fff" stroke={color} strokeWidth="2" style={{ filter: 'var(--scene-s)' }} />
      <rect x={x} y={y} width="8" height={h} rx="4" fill={color} />
      <Label x={x + w / 2 + 3} y={y + 28} fill={color}>{title}</Label>
      {sub && <Label x={x + w / 2 + 3} y={y + 48} fill={C.muted} size={16} weight={600}>{sub}</Label>}
    </g>
  );
}

function Atom({ x, y, r = 13, color = C.aqua, text, className = 'chem-anim-pulse' }) {
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={r} fill={color} />
      {text && <Label x={x} y={y + 4} fill="#fff" size={Math.max(14, r)}>{text}</Label>}
    </g>
  );
}

function Molecule({ points, color = C.navy, atomColor = C.aqua }) {
  return (
    <g>
      {points.slice(1).map((p, i) => <line key={`b${i}`} x1={points[i][0]} y1={points[i][1]} x2={p[0]} y2={p[1]} stroke={color} strokeWidth="5" />)}
      {points.map((p, i) => <Atom key={`a${i}`} x={p[0]} y={p[1]} r={11} color={i % 3 ? atomColor : C.violet} className="chem-anim-drift" />)}
    </g>
  );
}

function Ion({ x, y, text, color, className = 'chem-anim-drift' }) {
  return <g className={className}><circle cx={x} cy={y} r="13" fill={color} opacity=".15" stroke={color} strokeWidth="2" /><Label x={x} y={y + 4} fill={color} size={14}>{text}</Label></g>;
}

function Layer({ x = 90, y, w = 340, h = 38, color, label, detail }) {
  return (
    <g className="chem-anim-rise">
      <path d={`M${x} ${y} l20 -12 h${w} l-20 12z`} fill={color} opacity=".6" />
      <rect x={x} y={y} width={w} height={h} rx="5" fill={color} opacity=".88" />
      <path d={`M${x + w} ${y} l20 -12 v${h} l-20 12z`} fill={color} opacity=".55" />
      <Label x={x + w / 2} y={y + 24} fill="#fff">{label}</Label>
      {detail && <Label x={x + w + 52} y={y + 24} fill={C.muted} size={14}>{detail}</Label>}
    </g>
  );
}

function HalfCell({ x, concentration, metal = 'M', color = C.cobalt }) {
  return (
    <g>
      <path d={`M${x} 130 v155 q0 20 20 20 h120 q20 0 20 -20 V130`} fill="#fff" stroke={C.navy} strokeWidth="3" />
      <rect x={x + 6} y="198" width="148" height="100" rx="8" fill={color} opacity=".13" />
      <rect x={x + 28} y="105" width="18" height="153" rx="5" fill={C.navy} />
      <Label x={x + 37} y="94">{metal}</Label>
      <Label x={x + 80} y="326" fill={color}>{concentration}</Label>
      <Ion x={x + 80} y="235" text={`${metal}+`} color={color} />
      <Ion x={x + 120} y="270" text={`${metal}+`} color={color} />
    </g>
  );
}

export function ChemHeroLab() {
  return (
    <Scene label="Smart chemistry laboratory opener">
      <Title>CHEMISTRY • MATERIALS • DEVICES</Title>
      <g className="chem-anim-rise" style={{ filter: 'var(--scene-s)' }}>
        <path d="M72 88 h82 M88 88 v70 l-35 113 q-8 28 21 28 h94 q29 0 21-28 l-35-113 V88" fill="#fff" stroke={C.navy} strokeWidth="6" strokeLinejoin="round" />
        <path d="M67 251 q52-30 108 0 l12 39 H55z" fill={C.aqua} opacity=".75" />
        <circle cx="92" cy="228" r="8" fill="#fff" className="chem-anim-drift" />
        <circle cx="137" cy="245" r="6" fill="#fff" className="chem-anim-drift" />
      </g>
      <g className="chem-anim-pulse" style={{ filter: 'var(--scene-s)' }}>
        <rect x="326" y="78" width="120" height="226" rx="24" fill={C.navy} />
        <rect x="337" y="96" width="98" height="181" rx="13" fill="var(--scene-a)" />
        <circle cx="386" cy="290" r="8" fill={C.aqua} />
        <path d="M356 210 q30-72 61-12" fill="none" stroke="#fff" strokeWidth="5" />
        <circle cx="357" cy="210" r="8" fill={C.amber} /><circle cx="417" cy="198" r="8" fill="#fff" />
      </g>
      <g className="chem-anim-orbit">
        <ellipse cx="260" cy="160" rx="72" ry="28" fill="none" stroke={C.violet} strokeWidth="3" />
        <Atom x={188} y={160} color={C.violet} />
        <Atom x={332} y={160} color={C.amber} />
      </g>
      <Atom x={260} y={160} r={22} color={C.aqua} text="C" />
      <Label x={260} y={334} fill={C.muted}>Applied chemistry powers smart systems</Label>
    </Scene>
  );
}

export function ChemJourneyPath({ steps = ['Materials', 'Energy', 'Sensors', 'Corrosion', 'Green tech'] }) {
  const items = steps.slice(0, 6);
  const gap = 440 / Math.max(1, items.length - 1);
  return (
    <Scene label="Chemistry learning journey">
      <Title>Learning journey</Title>
      <path d="M40 210 C130 90 210 310 300 170 S430 115 480 180" fill="none" stroke={C.aqua} strokeWidth="6" strokeLinecap="round" strokeDasharray="9 9" />
      {items.map((step, i) => {
        const x = 40 + i * gap;
        const y = 210 + Math.sin(i * 2.1) * 62;
        return <g key={step} className="chem-anim-rise"><circle cx={x} cy={y} r="25" fill={i % 2 ? C.violet : C.aqua} stroke="#fff" strokeWidth="5" /><Label x={x} y={y + 5} fill="#fff">{i + 1}</Label><Label x={x} y={y + 45} size={14}>{step}</Label></g>;
      })}
    </Scene>
  );
}

export function ChemMaterialDeviceFlow() {
  const data = [['Material', 'structure'], ['Property', 'function'], ['Device', 'design'], ['Application', 'impact']];
  return <Scene label="Material to application flow"><Title>Structure becomes function</Title>{data.map((d, i) => <React.Fragment key={d[0]}><Card x={25 + i * 125} y={145} w={104} h={76} color={[C.aqua, C.violet, C.cobalt, C.emerald][i]} title={d[0]} sub={d[1]} />{i < 3 && <Arrow x1={130 + i * 125} y1={183} x2={145 + i * 125} y2={183} color={C.amber} />}</React.Fragment>)}</Scene>;
}

export function ChemOrganicSemiconductor() {
  const pts = [[65,190],[125,145],[185,190],[245,145],[305,190],[365,145],[425,190]];
  return <Scene label="Organic semiconductor conjugation"><Title>Conjugated organic semiconductor</Title><path d="M55 116 Q245 55 435 116 Q245 145 55 116" fill={C.violet} opacity=".16" className="chem-anim-pulse" /><path d="M55 220 Q245 290 435 220 Q245 190 55 220" fill={C.violet} opacity=".16" className="chem-anim-pulse" /><Molecule points={pts} /><Ion x={110} y={92} text="h+" color={C.coral} className="chem-anim-flow" /><Ion x={382} y={255} text="e−" color={C.cobalt} className="chem-anim-flow" /><Label x={260} y={325} fill={C.violet}>delocalized π cloud</Label></Scene>;
}

export function ChemPNCompare() {
  return <Scene label="P-type and N-type comparison"><Title>Charge carriers</Title><rect x="30" y="62" width="220" height="260" rx="18" fill={C.coral} opacity=".08" /><rect x="270" y="62" width="220" height="260" rx="18" fill={C.cobalt} opacity=".08" /><Label x={140} y={94} fill={C.coral} size={18}>p-type</Label><Label x={380} y={94} fill={C.cobalt} size={18}>n-type</Label>{[0,1,2,3].map(i => <Ion key={`p${i}`} x={80 + (i%2)*110} y={155+Math.floor(i/2)*90} text="h+" color={C.coral} />)}{[0,1,2,3].map(i => <Ion key={`n${i}`} x={320 + (i%2)*110} y={155+Math.floor(i/2)*90} text="e−" color={C.cobalt} />)}<Arrow x1={76} y1={292} x2={200} y2={292} color={C.coral}/><Arrow x1={316} y1={292} x2={440} y2={292} color={C.cobalt}/></Scene>;
}

export function ChemPentaceneStack() {
  return <Scene label="Pentacene organic memory stack"><Title>Pentacene memory cell</Title><Layer y={248} color={C.navy} label="Gate electrode" /><Layer y={202} color={C.sand} label="Dielectric" /><Layer y={156} color={C.violet} label="Pentacene active layer" /><Layer y={110} color={C.amber} label="Source / Drain" /><Arrow x1={260} y1={286} x2={260} y2={82} color={C.cobalt} dashed /><Label x={260} y={330}>organic thin-film transistor stack</Label></Scene>;
}

export function ChemReRAMCell() {
  return <Scene label="Resistive RAM switching cell"><Title>ReRAM: filamentary switching</Title><Layer y={267} color={C.navy} label="Bottom electrode" /><Layer y={105} h={42} color={C.navy} label="Top electrode" /><rect x="110" y="147" width="340" height="120" fill={C.aqua} opacity=".18" stroke={C.aqua} strokeWidth="2" /><Label x={165} y={174} fill={C.aqua}>TiO₂</Label><path d="M265 267 C230 235 298 218 257 190 S276 164 264 147" fill="none" stroke={C.coral} strokeWidth="12" strokeLinecap="round" className="chem-anim-pulse" /><Ion x={323} y={200} text="O²−" color={C.coral} /><Arrow x1={390} y1={240} x2={390} y2={166} color={C.cobalt}/><Label x={260} y={326}>filament ON ↔ rupture OFF</Label></Scene>;
}

export function ChemSolGelProcess() {
  const s = [['Sol', C.aqua], ['Hydrolysis', C.cobalt], ['Gel', C.violet], ['Dry', C.amber], ['Oxide', C.emerald]];
  return <Scene label="Sol gel process"><Title>Sol–gel route</Title>{s.map((d,i)=><React.Fragment key={d[0]}><g className="chem-anim-rise"><circle cx={55+i*103} cy="180" r="38" fill={d[1]} opacity=".16" stroke={d[1]} strokeWidth="3" />{i===0&&[0,1,2].map(j=><Atom key={j} x={40+j*14} y={174+j%2*13} r={6} color={C.aqua}/>)}{i===2&&<path d="M35 170 q20-30 40 0 t20 0 M35 195 q20-30 40 0" fill="none" stroke={C.violet} strokeWidth="3"/>}{i===4&&<rect x={35+i*103} y="160" width="40" height="40" rx="4" fill={C.emerald}/>}<Label x={55+i*103} y={240} fill={d[1]} size={14}>{d[0]}</Label></g>{i<4&&<Arrow x1={94+i*103} y1={180} x2={116+i*103} y2={180} color={C.amber}/>}</React.Fragment>)}</Scene>;
}

export function ChemLiquidCrystal() {
  return <Scene label="Liquid crystal alignment"><Title>Electric-field alignment</Title><rect x="55" y="75" width="410" height="28" rx="5" fill={C.navy}/><rect x="55" y="270" width="410" height="28" rx="5" fill={C.navy}/><Label x={260} y={95} fill="#fff">+ electrode</Label><Label x={260} y={290} fill="#fff">− electrode</Label>{Array.from({length:12},(_,i)=>{const x=90+(i%6)*68,y=145+Math.floor(i/6)*72;return <g key={i} className="chem-anim-drift" transform={`rotate(${i<5?25-i*7:0} ${x} ${y})`}><rect x={x-6} y={y-30} width="12" height="60" rx="6" fill={C.violet}/></g>})}<Arrow x1={445} y1={120} x2={445} y2={250} color={C.cobalt}/></Scene>;
}

export function ChemLEDJunction() {
  return <Scene label="LED PN junction photon emission"><Title>LED junction</Title><rect x="45" y="95" width="205" height="205" rx="16" fill={C.coral} opacity=".15"/><rect x="270" y="95" width="205" height="205" rx="16" fill={C.cobalt} opacity=".15"/><Label x={145} y={125} fill={C.coral}>p-region • holes</Label><Label x={375} y={125} fill={C.cobalt}>n-region • electrons</Label><Arrow x1={105} y1={205} x2={238} y2={205} color={C.coral}/><Arrow x1={415} y1={205} x2={282} y2={205} color={C.cobalt}/><circle cx="260" cy="205" r="48" fill="var(--scene-g)" className="chem-anim-pulse"/>{[-35,0,35].map(a=><line key={a} x1="260" y1="170" x2={260+a} y2="88" stroke={C.amber} strokeWidth="5" strokeLinecap="round"/>)}<Label x={260} y={330}>recombination releases photon hν</Label></Scene>;
}

export function ChemOLEDStack() {
  return <Scene label="OLED multilayer stack"><Title>OLED stack</Title><Layer y={276} color={C.navy} label="Substrate" /><Layer y={234} h={32} color={C.cobalt} label="Cathode" /><Layer y={192} h={32} color={C.violet} label="Electron transport layer" /><Layer y={150} h={32} color={C.amber} label="Emissive organic layer" /><Layer y={108} h={32} color={C.coral} label="Hole transport layer" /><Layer y={66} h={32} color={C.aqua} label="Transparent anode" /><circle cx="260" cy="145" r="85" fill="var(--scene-g)" className="chem-anim-pulse" opacity=".65"/></Scene>;
}

export function ChemAMOLEDPixel() {
  return <Scene label="AMOLED active matrix pixel"><Title>AMOLED pixel control</Title><rect x="45" y="95" width="180" height="205" rx="20" fill="#fff" stroke={C.navy} strokeWidth="3" style={{filter:'var(--scene-s)'}}/><Label x={135} y={126}>TFT switch</Label><circle cx="105" cy="200" r="28" fill={C.cobalt} opacity=".16" stroke={C.cobalt} strokeWidth="3"/><line x1="75" y1="200" x2="135" y2="200" stroke={C.cobalt} strokeWidth="5"/><line x1="105" y1="165" x2="105" y2="184" stroke={C.cobalt} strokeWidth="5"/><rect x="153" y="172" width="35" height="58" rx="4" fill={C.amber} opacity=".3" stroke={C.amber} strokeWidth="3"/><Arrow x1={225} y1={200} x2={284} y2={200}/><rect x="295" y="90" width="180" height="220" rx="22" fill={C.navy}/><rect x="316" y="112" width="138" height="176" rx="12" fill={C.violet} opacity=".25"/><circle cx="385" cy="200" r="66" fill="var(--scene-g)" className="chem-anim-pulse"/><Label x={385} y={205} fill="#fff" size={18}>OLED</Label></Scene>;
}

export function ChemQLEDDots() {
  return <Scene label="QLED RGB quantum dots"><Title>Quantum-dot electroluminescence</Title>{[[130,C.coral,'R'],[260,C.emerald,'G'],[390,C.cobalt,'B']].map(([x,c,t])=><g key={t}><circle cx={x} cy="190" r="76" fill={c} opacity=".08" className="chem-anim-pulse"/>{[0,1,2,3,4].map(i=><Atom key={i} x={x+Math.cos(i*1.256)*36} y={190+Math.sin(i*1.256)*36} r={10} color={c}/>) }<Label x={x} y={195} fill={c} size={24}>{t}</Label></g>)}<Label x={260} y={315}>narrow-band, tunable RGB emission</Label></Scene>;
}

export function ChemDisplayCompare() {
  const items=[['LED',C.amber,'backlight'],['OLED',C.violet,'self-emissive'],['AMOLED',C.aqua,'active matrix'],['QLED',C.emerald,'quantum dots']];
  return <Scene label="Display technology comparison"><Title>Display families</Title>{items.map((d,i)=>{const x=25+i*124;return <g key={d[0]}><rect x={x} y="100" width="105" height="150" rx="14" fill={C.navy} style={{filter:'var(--scene-s)'}}/><rect x={x+10} y="110" width="85" height="105" rx="8" fill={d[1]} opacity=".75" className="chem-anim-pulse"/><Label x={x+52} y={280} fill={d[1]} size={16}>{d[0]}</Label><Label x={x+52} y={300} fill={C.muted} size={14}>{d[2]}</Label></g>})}</Scene>;
}

export function ChemQuantumDot() {
  const dots=[[85,215,13,C.cobalt,'blue'],[180,200,21,C.aqua,'cyan'],[295,180,32,C.amber,'yellow'],[425,155,47,C.coral,'red']];
  return <Scene label="Quantum dot size color relation"><Title>Size tunes quantum confinement</Title><line x1="55" y1="275" x2="470" y2="275" stroke={C.navy} strokeWidth="3"/>{dots.map(([x,y,r,c,t])=><g key={t} className="chem-anim-pulse"><circle cx={x} cy={y} r={r*1.7} fill={c} opacity=".1"/><circle cx={x} cy={y} r={r} fill={c}/><Label x={x} y={306} fill={c} size={14}>{t}</Label></g>)}<Label x={260} y={335}>small dot • larger band gap  →  large dot • smaller band gap</Label></Scene>;
}

export function ChemQDSSC() {
  return <Scene label="Quantum dot sensitized solar cell"><Title>QD-sensitized solar cell</Title><Layer y={270} color={C.navy} label="Counter electrode"/><Layer y={220} color={C.coral} label="Electrolyte"/><Layer y={170} color={C.aqua} label="TiO₂ + quantum dots"/><Layer y={120} color={C.cobalt} label="Transparent conductor"/>{[130,190,250,310,370].map((x,i)=><Atom key={x} x={x} y={160} r={8+i%2*3} color={i%2?C.amber:C.violet}/>) }<Arrow x1={100} y1={95} x2={180} y2={150} color={C.amber}/><Arrow x1={220} y1={158} x2={380} y2={105} color={C.cobalt}/><Label x={390} y={90} fill={C.cobalt}>e− circuit</Label></Scene>;
}

export function ChemPolymerChain() {
  return <Scene label="Polymer chain formation"><Title>Monomers link into a macromolecule</Title>{[70,130,190].map((x,i)=><g key={x}><rect x={x-24} y="95" width="48" height="48" rx="14" fill={[C.aqua,C.violet,C.amber][i]} opacity=".8"/>{i<2&&<Label x={x+30} y={125}>+</Label>}</g>)}<Arrow x1={235} y1={120} x2={290} y2={120} color={C.emerald}/><g className="chem-anim-flow">{[315,355,395,435,475].map((x,i)=><React.Fragment key={x}>{i>0&&<line x1={x-40} y1="210" x2={x-15} y2="210" stroke={C.navy} strokeWidth="5"/>}<circle cx={x-15} cy="210" r="18" fill={i%2?C.violet:C.aqua}/></React.Fragment>)}</g><path d="M292 175 v70 M292 175 h18 M292 245 h18 M485 175 v70 M467 175 h18 M467 245 h18" stroke={C.navy} strokeWidth="4" fill="none"/><Label x={390} y={280}>[ repeating unit ]ₙ</Label></Scene>;
}

export function ChemAdditionVsCondensation() {
  return <Scene label="Addition and condensation polymerization"><Title>Two polymerization routes</Title><rect x="25" y="68" width="225" height="260" rx="18" fill={C.aqua} opacity=".07"/><rect x="270" y="68" width="225" height="260" rx="18" fill={C.coral} opacity=".07"/><Label x={137} y={100} fill={C.aqua} size={17}>Addition</Label><Label x={382} y={100} fill={C.coral} size={17}>Condensation</Label><Label x={137} y={138}>C=C monomers</Label><Arrow x1={80} y1={170} x2={195} y2={170}/><path d="M60 225 h40 l25-24 25 24 25-24 40 24" fill="none" stroke={C.aqua} strokeWidth="6"/><Label x={137} y={275} fill={C.emerald}>no by-product</Label><Label x={382} y={138}>A–A + B–B</Label><Arrow x1={325} y1={170} x2={440} y2={170} color={C.coral}/><path d="M300 225 h38 l25-24 25 24 25-24 40 24" fill="none" stroke={C.coral} strokeWidth="6"/><Ion x={438} y={270} text="H₂O" color={C.cobalt}/><Label x={370} y={305} fill={C.coral}>small molecule released</Label></Scene>;
}

export function ChemMnMwChart() {
  const bars=[65,90,135,185,235,285,340];
  return <Scene label="Number and weight average molecular mass"><Title>Molecular-mass averages</Title><line x1="55" y1="295" x2="470" y2="295" stroke={C.navy} strokeWidth="3"/><line x1="55" y1="70" x2="55" y2="295" stroke={C.navy} strokeWidth="3"/>{bars.map((x,i)=><rect key={x} x={x} y={270-i*25+(i>4?(i-4)*45:0)} width="34" height={25+i*25-(i>4?(i-4)*45:0)} rx="4" fill={i<4?C.aqua:C.violet} opacity=".75"/>)}<line x1="203" y1="80" x2="203" y2="295" stroke={C.coral} strokeWidth="4" strokeDasharray="8 7"/><line x1="315" y1="80" x2="315" y2="295" stroke={C.cobalt} strokeWidth="4" strokeDasharray="8 7"/><Label x={203} y={66} fill={C.coral}>Mₙ</Label><Label x={315} y={66} fill={C.cobalt}>M𝓌</Label><Label x={405} y={330}>PDI = M𝓌 / Mₙ ≥ 1</Label></Scene>;
}

export function ChemNylonSynthesis() {
  return <Scene label="Nylon condensation synthesis"><Title>Nylon by condensation</Title><Card x={35} y={112} w={125} title="Diamine" sub="H₂N–R–NH₂" color={C.aqua}/><Label x={180} y={153} size={22}>+</Label><Card x={205} y={112} w={135} title="Diacid" sub="HOOC–R–COOH" color={C.coral}/><Arrow x1={350} y1={150} x2={405} y2={150} color={C.amber}/><path d="M65 245 q30-32 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke={C.violet} strokeWidth="8"/><Label x={245} y={285} fill={C.violet}>polyamide (nylon)</Label><Ion x={430} y={230} text="H₂O" color={C.cobalt}/><Label x={430} y={264} fill={C.muted} size={14}>by-product</Label></Scene>;
}

export function ChemPolyaniline() {
  const pts=[[55,190],[115,145],[175,190],[235,145],[295,190],[355,145],[415,190],[475,145]];
  return <Scene label="Polyaniline doping conduction"><Title>Conducting polyaniline</Title><Molecule points={pts} atomColor={C.emerald}/>{[125,245,365].map(x=><Ion key={x} x={x} y="255" text="A−" color={C.coral}/>)}<Arrow x1={70} y1={95} x2={445} y2={95} color={C.cobalt} dashed/><Ion x={260} y={95} text="h+" color={C.cobalt} className="chem-anim-flow"/><Label x={260} y={322}>protonic doping enables hopping conduction</Label></Scene>;
}

export function ChemNernstBalance() {
  return <Scene label="Nernst equation balance"><Title>Nernst equation</Title><Card x={32} y={120} w={130} h={88} title="E°cell" sub="standard potential" color={C.cobalt}/><Arrow x1={164} y1={164} x2={195} y2={164} color={C.amber}/><Card x={200} y={120} w={130} h={88} title="− (RT/nF) ln Q" sub="concentration effect" color={C.coral}/><Arrow x1={332} y1={164} x2={363} y2={164} color={C.amber}/><Card x={368} y={120} w={120} h={88} title="Ecell" sub="actual voltage" color={C.emerald}/><path d="M55 275 q90-65 180 0 t220 0" fill="none" stroke={C.aqua} strokeWidth="5"/><Label x={260} y={326}>chemical driving force balances composition</Label></Scene>;
}

export function ChemConcentrationCell() {
  return <Scene label="Concentration electrochemical cell"><Title>Concentration cell</Title><HalfCell x={25} concentration="[M⁺] low"/><HalfCell x={335} concentration="[M⁺] high" color={C.coral}/><path d="M105 160 C105 65 415 65 415 160" fill="none" stroke={C.amber} strokeWidth="14" opacity=".45"/><Label x={260} y={78}>salt bridge</Label><Arrow x1={90} y1={58} x2={420} y2={58} color={C.cobalt}/><Label x={260} y={45} fill={C.cobalt}>electron flow</Label></Scene>;
}

function IonBattery({ ion = 'Li⁺', cathode = 'LiMO₂', title = 'Lithium-ion cell', mode = 'discharge' }) {
  const discharge = mode !== 'charge';
  return <Scene label={`${title} ${mode}`}><Title>{title} • {mode}</Title><rect x="35" y="95" width="150" height="200" rx="18" fill={C.navy}/><rect x="335" y="95" width="150" height="200" rx="18" fill={C.coral}/><rect x="242" y="80" width="36" height="230" rx="10" fill={C.sand} stroke={C.amber} strokeWidth="3" strokeDasharray="7 6"/><Label x={110} y={125} fill="#fff">Anode</Label><Label x={410} y={125} fill="#fff">Cathode</Label><Label x={410} y={150} fill="#fff" size={14}>{cathode}</Label><Label x={260} y={330}>separator</Label>{[0,1,2].map(i=><Ion key={i} x={120+i*115} y={190+i%2*55} text={ion} color={C.aqua}/>)}<Arrow x1={discharge?165:355} y1={220} x2={discharge?355:165} y2={220} color={C.aqua}/><path d="M110 95 V55 H410 V95" fill="none" stroke={C.navy} strokeWidth="4"/><Arrow x1={discharge?125:395} y1={55} x2={discharge?395:125} y2={55} color={C.cobalt}/><Label x={260} y={44} fill={C.cobalt}>e− through circuit</Label></Scene>;
}

export function ChemLiIonCell() { return <IonBattery />; }
export function ChemNaIonCell() { return <IonBattery ion="Na⁺" cathode="NaMO₂" title="Sodium-ion cell" />; }
export function ChemBatteryChargeDischarge({ mode = 'discharge' }) { return <IonBattery mode={mode} />; }

export function ChemSupercapacitor() {
  return <Scene label="Asymmetric supercapacitor ion adsorption"><Title>Asymmetric supercapacitor</Title><rect x="50" y="90" width="90" height="220" rx="14" fill={C.navy}/><rect x="380" y="90" width="90" height="220" rx="14" fill={C.emerald}/><rect x="245" y="78" width="30" height="244" rx="8" fill={C.sand} stroke={C.amber} strokeWidth="3"/><Label x={95} y={75}>porous carbon</Label><Label x={425} y={75}>metal oxide</Label>{[120,170,220,270].map((y,i)=><React.Fragment key={y}><Ion x={170+i%2*35} y={y} text={i%2?'−':'+'} color={i%2?C.coral:C.cobalt}/><Ion x={350-i%2*35} y={y} text={i%2?'+':'−'} color={i%2?C.cobalt:C.coral}/></React.Fragment>)}<Arrow x1={225} y1={200} x2={150} y2={200} color={C.coral}/><Arrow x1={295} y1={200} x2={370} y2={200} color={C.cobalt}/><Label x={260} y={348}>surface adsorption + fast redox storage</Label></Scene>;
}

export function ChemSOFC() {
  return <Scene label="Solid oxide fuel cell pathways"><Title>Solid oxide fuel cell</Title><Layer y={268} color={C.navy} label="Fuel electrode • H₂"/><Layer y={190} h={58} color={C.sand} label="Solid oxide electrolyte"/><Layer y={112} h={58} color={C.coral} label="Air electrode • O₂"/><Arrow x1={180} y1={130} x2={180} y2={250} color={C.coral}/><Ion x={180} y={190} text="O²−" color={C.coral}/><path d="M330 268 V315 H470 V90 H330 V112" fill="none" stroke={C.cobalt} strokeWidth="4"/><Arrow x1={455} y1={270} x2={455} y2={120} color={C.cobalt}/><Label x={405} y={300} fill={C.cobalt}>e−</Label><Label x={115} y={325} fill={C.emerald}>H₂O + heat</Label></Scene>;
}

export function ChemPVCell() {
  return <Scene label="Photovoltaic cell charge generation"><Title>Photovoltaic conversion</Title>{[[105,60],[145,78],[185,55]].map(([x,y])=><g key={x} className="chem-anim-pulse"><line x1={x} y1={y} x2={x+62} y2={y+72} stroke={C.amber} strokeWidth="6"/><polygon points={`${x+62},${y+72} ${x+49},${y+63} ${x+58},${y+55}`} fill={C.amber}/></g>)}<rect x="60" y="150" width="400" height="72" rx="12" fill={C.cobalt} opacity=".8"/><rect x="60" y="222" width="400" height="72" rx="12" fill={C.coral} opacity=".8"/><Label x={420} y={193} fill="#fff">n-type</Label><Label x={420} y={265} fill="#fff">p-type</Label><circle cx="245" cy="220" r="26" fill="var(--scene-g)" className="chem-anim-pulse"/><Arrow x1={250} y1={205} x2={355} y2={170} color="#fff"/><Arrow x1={235} y1={238} x2={145} y2={268} color="#fff"/><Label x={260} y={330}>photon → electron–hole pair → current</Label></Scene>;
}

export function ChemGreenHydrogen() {
  return <Scene label="Photocatalytic green hydrogen"><Title>Sunlight-driven water splitting</Title><circle cx="80" cy="92" r="34" fill={C.amber} className="chem-anim-pulse"/>{[0,1,2].map(i=><Arrow key={i} x1={105+i*12} y1={108+i*8} x2={190+i*20} y2={170+i*12} color={C.amber}/>)}<path d="M40 240 Q140 210 240 240 T480 240 V325 H40z" fill={C.aqua} opacity=".25"/><rect x="185" y="190" width="155" height="42" rx="8" fill={C.cream} stroke={C.violet} strokeWidth="4"/><Label x={262} y={216} fill={C.violet}>TiO₂ catalyst</Label>{[170,205,340,380].map((x,i)=><g key={x} className="chem-anim-drift"><circle cx={x} cy={170-i%2*28} r={i<2?11:15} fill={i<2?C.coral:C.cobalt}/><Label x={x} y={174-i%2*28} fill="#fff" size={14}>{i<2?'O₂':'H₂'}</Label></g>)}<Label x={260} y={338} fill={C.emerald}>2H₂O → 2H₂ + O₂</Label></Scene>;
}

export function ChemSensorBlock() {
  const d=[['Stimulus',C.amber],['Transducer',C.aqua],['Signal',C.cobalt],['Output',C.emerald]];
  return <Scene label="Sensor functional blocks"><Title>From chemistry to information</Title>{d.map((x,i)=><React.Fragment key={x[0]}><Card x={24+i*126} y={140} w={106} h={80} title={x[0]} color={x[1]}/>{i<3&&<Arrow x1={132+i*126} y1={180} x2={146+i*126} y2={180} color={C.violet}/>}</React.Fragment>)}</Scene>;
}

export function ChemConductometric() {
  return <Scene label="Conductometric sensor in solution"><Title>Conductometric sensing</Title><path d="M80 105 v190 q0 20 20 20 h320 q20 0 20-20 V105" fill="#fff" stroke={C.navy} strokeWidth="4"/><rect x="86" y="180" width="348" height="128" fill={C.aqua} opacity=".15"/><rect x="140" y="85" width="25" height="170" rx="6" fill={C.navy}/><rect x="355" y="85" width="25" height="170" rx="6" fill={C.navy}/>{[[205,215,'+'],[260,265,'−'],[315,215,'+'],[230,285,'−']].map(([x,y,t],i)=><Ion key={i} x={x} y={y} text={t} color={t==='+'?C.cobalt:C.coral}/>) }<Arrow x1={195} y1={150} x2={320} y2={150} color={C.cobalt}/><Label x={260} y={342}>more mobile ions → higher conductance</Label></Scene>;
}

export function ChemColorimetric() {
  return <Scene label="Colorimetric Beer Lambert measurement"><Title>Colorimetric sensing</Title><circle cx="65" cy="180" r="34" fill={C.amber} className="chem-anim-pulse"/><Label x={65} y={185} fill="#fff">lamp</Label><Arrow x1={100} y1={180} x2={190} y2={180} color={C.amber}/><Label x={145} y={162} fill={C.amber}>I₀</Label><path d="M205 95 h100 l-10 190 q-2 20-20 20 h-40 q-18 0-20-20z" fill="#fff" stroke={C.navy} strokeWidth="4"/><path d="M218 200 h74 l-5 86 q-1 10-14 10 h-36 q-13 0-14-10z" fill={C.violet} opacity=".55"/><Arrow x1={310} y1={180} x2={405} y2={180} color={C.violet}/><Label x={355} y={162} fill={C.violet}>I</Label><rect x="420" y="130" width="65" height="100" rx="12" fill={C.navy}/><circle cx="452" cy="180" r="18" fill={C.aqua}/><Label x={260} y={338}>A = log(I₀/I) = εbc</Label></Scene>;
}

export function ChemGasSensor() {
  return <Scene label="NOx and SOx gas sensor"><Title>Gas detection cell</Title>{[['NOₓ',C.coral,80,110],['SOₓ',C.amber,125,185],['O₂',C.aqua,75,260]].map(([t,c,x,y])=><Ion key={t} x={x} y={y} text={t} color={c} className="chem-anim-flow"/>)}<Arrow x1={150} y1={185} x2={225} y2={185} color={C.aqua}/><rect x="235" y="85" width="180" height="205" rx="22" fill="#fff" stroke={C.navy} strokeWidth="4" style={{filter:'var(--scene-s)'}}/><path d="M270 235 q22-105 44 0 t44 0" fill="none" stroke={C.emerald} strokeWidth="8"/><circle cx="270" cy="235" r="9" fill={C.coral}/><circle cx="358" cy="235" r="9" fill={C.cobalt}/><Label x={325} y={125}>metal-oxide film</Label><Label x={325} y={270} fill={C.emerald}>ΔR signal</Label><Arrow x1={418} y1={185} x2={480} y2={185} color={C.cobalt}/></Scene>;
}

export function ChemBiosensor() {
  return <Scene label="Enzyme glucose biosensor"><Title>Enzyme-electrode biosensor</Title>{[85,125,165].map(x=><g key={x}><polygon points={`${x},130 ${x+18},148 ${x},166 ${x-18},148`} fill={C.aqua} className="chem-anim-drift"/><Label x={x} y={190} size={14}>glucose</Label></g>)}<Arrow x1={185} y1={150} x2={230} y2={150} color={C.amber}/><path d="M245 105 q45 0 45 45 t45 45 q0 45-45 45 t-45-45 q-45-45 0-90z" fill={C.emerald} opacity=".2" stroke={C.emerald} strokeWidth="4" className="chem-anim-pulse"/><Label x={285} y={176} fill={C.emerald}>enzyme</Label><Arrow x1={340} y1={175} x2={400} y2={175} color={C.cobalt}/><rect x="410" y="82" width="28" height="210" rx="7" fill={C.navy}/><path d="M438 118 q45 25 0 50 t0 50" fill="none" stroke={C.cobalt} strokeWidth="4"/><Label x={438} y={325}>current ∝ glucose</Label></Scene>;
}

export function ChemCorrosionCell() {
  return <Scene label="Electrochemical corrosion stages"><Title>Corrosion develops as a cell</Title>{[['Clean',C.navy],['Water + O₂',C.aqua],['Anode M→M²⁺',C.coral],['Cathode reduction',C.cobalt],['Rust spreads',C.amber]].map((d,i)=>{const x=25+i*99;return <g key={d[0]} className={i?'chem-anim-pulse':'chem-anim-rise'}><rect x={x} y="145" width="80" height="76" rx="8" fill={C.navy}/>{i>0&&<path d={`M${x} 145 q20 ${i%2?20:-12} 40 0 t40 0 v25 h-80z`} fill={d[1]} opacity=".75"/>}{i>1&&<circle cx={x+40} cy="183" r={6+i*3} fill={C.coral}/>}<Label x={x+40} y={255} fill={d[1]} size={14}>{d[0]}</Label>{i<4&&<Arrow x1={x+82} y1={183} x2={x+96} y2={183} color={C.amber}/>}</g>})}<Label x={260} y={318}>anodic dissolution + cathodic oxygen reduction</Label></Scene>;
}

export function ChemGalvanicCorrosion() {
  return <Scene label="Galvanic corrosion between dissimilar metals"><Title>Galvanic couple</Title><rect x="55" y="115" width="160" height="170" rx="14" fill={C.coral} opacity=".85"/><rect x="305" y="115" width="160" height="170" rx="14" fill={C.cobalt} opacity=".85"/><Label x={135} y={150} fill="#fff">active metal</Label><Label x={385} y={150} fill="#fff">noble metal</Label><path d="M135 115 V70 H385 V115" fill="none" stroke={C.navy} strokeWidth="5"/><Arrow x1={150} y1={70} x2={370} y2={70} color={C.cobalt}/><path d="M215 190 h90" stroke={C.amber} strokeWidth="12"/><Label x={260} y={212} fill={C.navy}>electrical contact</Label>{[0,1,2].map(i=><Ion key={i} x={85+i*40} y={265-i*18} text="M²⁺" color={C.coral}/>)}</Scene>;
}

export function ChemWaterlinePitting() {
  return <Scene label="Waterline corrosion and pitting"><Title>Differential aeration & pitting</Title><rect x="65" y="65" width="390" height="255" rx="18" fill="#fff" stroke={C.navy} strokeWidth="4"/><rect x="69" y="155" width="382" height="161" fill={C.aqua} opacity=".2"/><line x1="69" y1="155" x2="451" y2="155" stroke={C.aqua} strokeWidth="5" strokeDasharray="10 7"/><Label x={400} y={145} fill={C.aqua}>waterline</Label><rect x="120" y="95" width="280" height="170" rx="8" fill={C.navy}/><path d="M120 158 q35-20 70 0 t70 0 t70 0 t70 0 v20 h-280z" fill={C.coral} opacity=".7" className="chem-anim-pulse"/>{[190,260,335].map((x,i)=><path key={x} d={`M${x} 265 q${15+i*4} 48 ${30+i*4} 0z`} fill={C.coral} className="chem-anim-pulse"/>)}<Label x={260} y={300} fill="#fff">localized pits</Label></Scene>;
}

export function ChemGalvanization() {
  return <Scene label="Zinc galvanized steel protection"><Title>Galvanization</Title><rect x="90" y="105" width="340" height="170" rx="18" fill={C.navy}/><rect x="70" y="85" width="380" height="210" rx="28" fill="none" stroke={C.aqua} strokeWidth="20"/><Label x={260} y={180} fill="#fff" size={22}>STEEL</Label><Label x={260} y={72} fill={C.aqua}>Zn coating</Label><path d="M420 110 q50 35 0 70" fill="none" stroke={C.coral} strokeWidth="6"/><Ion x={455} y={200} text="Zn²⁺" color={C.coral}/><Label x={260} y={330}>zinc sacrifices itself before steel</Label></Scene>;
}

export function ChemAnodization() {
  return <Scene label="Aluminium anodic oxide growth"><Title>Anodization grows protective Al₂O₃</Title><rect x="170" y="85" width="180" height="220" rx="12" fill={C.navy}/><Label x={260} y={200} fill="#fff" size={24}>Al</Label><rect x="145" y="70" width="25" height="250" rx="8" fill={C.aqua} opacity=".75" className="chem-anim-pulse"/><rect x="350" y="70" width="25" height="250" rx="8" fill={C.aqua} opacity=".75" className="chem-anim-pulse"/>{[92,125,158,191,224,257,290].map(y=><React.Fragment key={y}><circle cx="157" cy={y} r="5" fill={C.cream}/><circle cx="363" cy={y} r="5" fill={C.cream}/></React.Fragment>)}<Arrow x1={105} y1={195} x2={142} y2={195} color={C.cobalt}/><Arrow x1={415} y1={195} x2={378} y2={195} color={C.cobalt}/><Label x={260} y={342} fill={C.aqua}>ordered porous oxide layer</Label></Scene>;
}

export function ChemVCI() {
  return <Scene label="Vapour corrosion inhibitor protecting PCB"><Title>Vapour-phase corrosion inhibitor</Title><rect x="65" y="105" width="390" height="205" rx="22" fill={C.navy}/><path d="M95 250 h90 v-55 h70 v-45 h75 v70 h95" fill="none" stroke={C.amber} strokeWidth="8"/>{[130,220,310,390].map((x,i)=><circle key={x} cx={x} cy={i%2?215:170} r="14" fill={C.emerald}/>)}{[100,165,245,330,410].map((x,i)=><g key={x} className="chem-anim-drift"><path d={`M${x} ${105+i%2*20} q15-24 30 0 t30 0`} fill="none" stroke={C.aqua} strokeWidth="4"/><Label x={x+30} y={92+i%2*20} fill={C.aqua} size={14}>VCI</Label></g>)}<rect x="55" y="85" width="410" height="245" rx="28" fill="none" stroke={C.aqua} strokeWidth="3" strokeDasharray="10 8"/><Label x={260} y={345}>adsorbed molecular barrier protects circuitry</Label></Scene>;
}

export function ChemCPRGauge() {
  return <Scene label="Corrosion penetration rate gauge"><Title>Corrosion penetration rate</Title><path d="M105 285 A160 160 0 0 1 415 285" fill="none" stroke={C.sand} strokeWidth="34"/><path d="M105 285 A160 160 0 0 1 260 125" fill="none" stroke={C.emerald} strokeWidth="28"/><path d="M260 125 A160 160 0 0 1 365 165" fill="none" stroke={C.amber} strokeWidth="28"/><path d="M365 165 A160 160 0 0 1 415 285" fill="none" stroke={C.coral} strokeWidth="28"/><line x1="260" y1="285" x2="350" y2="180" stroke={C.navy} strokeWidth="8" strokeLinecap="round" className="chem-anim-pulse"/><circle cx="260" cy="285" r="18" fill={C.navy}/><Label x={260} y={330}>CPR = 87.6 W / ρAt</Label><Label x={130} y={250} fill={C.emerald}>low</Label><Label x={390} y={250} fill={C.coral}>high</Label></Scene>;
}

export function ChemGreenSolvent() {
  return <Scene label="Traditional and green coolant comparison"><Title>Safer solvent & coolant design</Title><rect x="28" y="72" width="220" height="250" rx="20" fill={C.coral} opacity=".07"/><rect x="272" y="72" width="220" height="250" rx="20" fill={C.emerald} opacity=".08"/><Label x={138} y={105} fill={C.coral} size={18}>Traditional</Label><Label x={382} y={105} fill={C.emerald} size={18}>Green alternative</Label><path d="M95 135 h86 l-10 130 q-2 25-33 25 t-33-25z" fill={C.coral} opacity=".55" stroke={C.navy} strokeWidth="3"/><path d="M339 135 h86 l-10 130 q-2 25-33 25 t-33-25z" fill={C.emerald} opacity=".55" stroke={C.navy} strokeWidth="3"/><Label x={138} y={305} fill={C.coral}>toxic • volatile</Label><Label x={382} y={305} fill={C.emerald}>low toxicity • recyclable</Label></Scene>;
}

export function ChemZnONano() {
  return <Scene label="Zinc oxide nanoparticle scale zoom"><Title>ZnO: bulk to nanoscale</Title><rect x="55" y="125" width="120" height="120" rx="15" fill={C.aqua} opacity=".7"/><Label x={115} y={190} fill="#fff" size={22}>ZnO</Label><Arrow x1={185} y1={185} x2={260} y2={185} color={C.violet}/><circle cx="370" cy="185" r="100" fill="#fff" stroke={C.violet} strokeWidth="5" style={{filter:'var(--scene-s)'}}/>{Array.from({length:15},(_,i)=>{const a=i*2.4,r=15+(i%4)*18;return <Atom key={i} x={370+Math.cos(a)*r} y={185+Math.sin(a)*r} r={i%2?8:11} color={i%2?C.cobalt:C.aqua} text={i%2?'O':'Zn'}/>})}<Label x={370} y={315} fill={C.violet}>1–100 nm • high surface area</Label></Scene>;
}

export function ChemPLATouch() {
  return <Scene label="PLA polymer touch screen film"><Title>PLA film in a touch interface</Title><g transform="skewX(-12)"><rect x="120" y="90" width="300" height="200" rx="24" fill={C.navy} style={{filter:'var(--scene-s)'}}/><rect x="135" y="105" width="270" height="170" rx="16" fill={C.aqua} opacity=".6"/><rect x="145" y="95" width="270" height="170" rx="16" fill={C.emerald} opacity=".18" stroke={C.emerald} strokeWidth="5"/></g><circle cx="340" cy="155" r="34" fill="#fff" opacity=".5" className="chem-anim-pulse"/><path d="M365 55 q-22 55-20 98" fill="none" stroke={C.coral} strokeWidth="18" strokeLinecap="round"/><Label x={260} y={330}>transparent, flexible biopolymer layer</Label></Scene>;
}

export function ChemAlginateBCI() {
  return <Scene label="Alginate hydrogel brain computer interface"><Title>Soft alginate biointerface</Title><path d="M50 225 q55-115 125-50 q35-110 110-30 q60-75 120 10 q55 15 65 90 q-60 75-175 55 q-100 35-205-5z" fill={C.sand} stroke={C.navy} strokeWidth="4"/><path d="M80 225 q70-70 130-10 t125-5 t105 15" fill="none" stroke={C.aqua} strokeWidth="28" opacity=".45" className="chem-anim-pulse"/>{[130,205,280,355,415].map((x,i)=><circle key={x} cx={x} cy={210+i%2*18} r="11" fill={C.cobalt}/>)}<path d="M280 170 V75 H450" fill="none" stroke={C.cobalt} strokeWidth="5"/><path d="M320 70 l12-18 13 36 14-25 15 15 12-8 h62" fill="none" stroke={C.emerald} strokeWidth="4"/><Label x={370} y={45} fill={C.emerald}>neural signal</Label><Label x={260} y={332}>hydrated, compliant, ion-conducting contact</Label></Scene>;
}

export function ChemEWasteFlow() {
  const d=[['Collect',C.aqua],['Sort',C.amber],['AI vision',C.violet],['Recover',C.emerald]];
  return <Scene label="Electronic waste recovery flow"><Title>Circular e-waste recovery</Title>{d.map((x,i)=><React.Fragment key={x[0]}><Card x={24+i*126} y={125} w={106} h={88} title={x[0]} color={x[1]}/>{i<3&&<Arrow x1={132+i*126} y1={170} x2={146+i*126} y2={170} color={C.navy}/>}</React.Fragment>)}<path d="M460 225 C460 315 65 330 65 225" fill="none" stroke={C.emerald} strokeWidth="5" strokeDasharray="9 8"/><polygon points="62,225 75,239 50,239" fill={C.emerald}/><Label x={260} y={305} fill={C.emerald}>metals return to manufacturing</Label></Scene>;
}

export function ChemBioleaching() {
  return <Scene label="Microbial gold bioleaching from e-waste"><Title>Bioleaching valuable metals</Title><rect x="60" y="95" width="220" height="210" rx="18" fill={C.navy}/>{[95,145,195,245].map((x,i)=><g key={x}><rect x={x} y={135+i%2*70} width="30" height="22" fill={i%2?C.emerald:C.amber}/><circle cx={x+15} cy={146+i%2*70} r="5" fill={C.navy}/></g>)}<Arrow x1={290} y1={200} x2={350} y2={200} color={C.aqua}/>{[365,405,445].map((x,i)=><g key={x} className="chem-anim-drift"><ellipse cx={x} cy={150+i*45} rx="25" ry="14" fill={C.emerald}/><path d={`M${x+22} ${150+i*45} q25-20 30 4`} fill="none" stroke={C.emerald} strokeWidth="3"/></g>)}{[380,430].map(x=><Atom key={x} x={x} y="275" r={13} color={C.amber} text="Au"/>)}<Label x={170} y={330}>e-waste</Label><Label x={410} y={330} fill={C.emerald}>microbes mobilize Au</Label></Scene>;
}

export function ChemMindMap({ title = 'Smart Chemistry', nodes = ['Materials', 'Energy', 'Sensors', 'Polymers', 'Green design', 'Protection'] }) {
  const shown=nodes.slice(0,8);
  return <Scene label={`${title} mind map`}><circle cx="260" cy="185" r="70" fill={C.navy} style={{filter:'var(--scene-s)'}}/><Label x={260} y={180} fill="#fff" size={16}>{title}</Label><Label x={260} y={202} fill={C.aqua} size={14}>core ideas</Label>{shown.map((n,i)=>{const a=-Math.PI/2+i*Math.PI*2/shown.length,x=260+Math.cos(a)*175,y=185+Math.sin(a)*125,c=[C.aqua,C.violet,C.amber,C.emerald,C.cobalt,C.coral][i%6];return <g key={`${n}-${i}`}><line x1={260+Math.cos(a)*70} y1={185+Math.sin(a)*70} x2={x} y2={y} stroke={c} strokeWidth="4"/><rect x={x-54} y={y-22} width="108" height="44" rx="14" fill="#fff" stroke={c} strokeWidth="2" className="chem-anim-rise"/><Label x={x} y={y+4} fill={c} size={14}>{n}</Label></g>})}</Scene>;
}

export function ChemExamStrategy() {
  const d=[['1. Define','key term'],['2. Explain','mechanism'],['3. Draw','labelled visual'],['4. Conclude','application']];
  return <Scene label="Chemistry exam answer strategy"><Title>Build a high-scoring answer</Title>{d.map((x,i)=><g key={x[0]}><circle cx="75" cy={95+i*65} r="23" fill={[C.aqua,C.violet,C.amber,C.emerald][i]}><title>{x[0]}</title></circle><Label x={75} y={100+i*65} fill="#fff">{i+1}</Label><rect x="115" y={70+i*65} width="340" height="50" rx="12" fill="#fff" stroke={[C.aqua,C.violet,C.amber,C.emerald][i]} strokeWidth="2"/><Label x={190} y={101+i*65} fill={[C.aqua,C.violet,C.amber,C.emerald][i]}>{x[0]}</Label><Label x={355} y={101+i*65} fill={C.muted} size={14}>{x[1]}</Label></g>)}</Scene>;
}

export function ChemRevisionSheet() {
  const items=['Definition recalled','Equation understood','Diagram practised','Application linked','Units checked'];
  return <Scene label="Chemistry revision checklist"><Title>One-page revision check</Title><rect x="70" y="58" width="380" height="275" rx="20" fill="#fff" stroke={C.navy} strokeWidth="3" style={{filter:'var(--scene-s)'}}/>{items.map((x,i)=><g key={x} className="chem-anim-rise"><rect x="105" y={88+i*45} width="24" height="24" rx="5" fill={i<4?C.emerald:C.sand} stroke={C.emerald} strokeWidth="2"/>{i<4&&<path d={`M111 ${100+i*45} l7 7 15-18`} fill="none" stroke="#fff" strokeWidth="4"/>}<Label x={150} y={105+i*45} anchor="start">{x}</Label></g>)}<Label x={260} y={312} fill={C.aqua}>ready • retrieve • apply</Label></Scene>;
}

export function ChemGenericAtoms() {
  return <Scene label="Animated molecular structure"><Title>Chemistry at the atomic scale</Title><g className="chem-anim-orbit"><ellipse cx="260" cy="185" rx="150" ry="62" fill="none" stroke={C.aqua} strokeWidth="3"/><ellipse cx="260" cy="185" rx="62" ry="150" fill="none" stroke={C.violet} strokeWidth="3"/><Atom x={110} y={185} color={C.cobalt} text="e−"/><Atom x={260} y={35} color={C.cobalt} text="e−"/></g><Atom x={260} y={185} r={35} color={C.navy} text="∑"/>{[[190,150,C.aqua],[320,145,C.coral],[210,235,C.amber],[325,230,C.emerald]].map(([x,y,c],i)=><Atom key={i} x={x} y={y} r={17} color={c}/>)}</Scene>;
}

// eslint-disable-next-line react/only-export-components -- required public visual selector
export function pickChemVisual(title = '', moduleId = 'module1') {
  const t = `${title} ${moduleId}`.toLowerCase();
  if (/hero|applied chemistry|smart systems|introduction|opener/.test(t)) return <ChemHeroLab />;
  if (/journey|roadmap|course path/.test(t)) return <ChemJourneyPath />;
  if (/material.*property|property.*device|material.*device/.test(t)) return <ChemMaterialDeviceFlow />;
  if (/organic semiconductor|conjugat/.test(t)) return <ChemOrganicSemiconductor />;
  if (/p-type|n-type|pn compare|charge carrier/.test(t)) return <ChemPNCompare />;
  if (/pentacene|organic memory/.test(t)) return <ChemPentaceneStack />;
  if (/reram|resistive ram|filament/.test(t)) return <ChemReRAMCell />;
  if (/sol.?gel/.test(t)) return <ChemSolGelProcess />;
  if (/liquid crystal|\blcd\b/.test(t)) return <ChemLiquidCrystal />;
  if (/display.*compar|led.*oled.*qled/.test(t)) return <ChemDisplayCompare />;
  if (/amoled/.test(t)) return <ChemAMOLEDPixel />;
  if (/\boled\b|organic led/.test(t)) return <ChemOLEDStack />;
  if (/qled/.test(t)) return <ChemQLEDDots />;
  if (/quantum dot.*solar|qdssc|sensitized solar/.test(t)) return <ChemQDSSC />;
  if (/quantum dot|confinement|size dependent/.test(t)) return <ChemQuantumDot />;
  if (/\bled\b|p.?n junction|photon emission/.test(t)) return <ChemLEDJunction />;
  if (/addition.*condensation|condensation.*addition/.test(t)) return <ChemAdditionVsCondensation />;
  if (/molecular weight|molecular mass|\bmn\b|\bmw\b|pdi|polydispers/.test(t)) return <ChemMnMwChart />;
  if (/nylon|polyamide synthesis/.test(t)) return <ChemNylonSynthesis />;
  if (/polyaniline|conducting polymer|doping.*polymer/.test(t)) return <ChemPolyaniline />;
  if (/polymer chain|monomer|polymerization/.test(t)) return <ChemPolymerChain />;
  if (/nernst/.test(t)) return <ChemNernstBalance />;
  if (/concentration cell/.test(t)) return <ChemConcentrationCell />;
  if (/charge.*discharge|discharge.*charge/.test(t)) return <ChemBatteryChargeDischarge mode={/charg(e|ing)/.test(t) && !/discharge/.test(t) ? 'charge' : 'discharge'} />;
  if (/lithium|li.?ion/.test(t)) return <ChemLiIonCell />;
  if (/sodium|na.?ion/.test(t)) return <ChemNaIonCell />;
  if (/supercapacitor/.test(t)) return <ChemSupercapacitor />;
  if (/solid oxide|\bsofc\b|fuel cell/.test(t)) return <ChemSOFC />;
  if (/photovoltaic|\bpv cell\b|solar cell/.test(t)) return <ChemPVCell />;
  if (/green hydrogen|water splitting|photocatal/.test(t)) return <ChemGreenHydrogen />;
  if (/conductometr|conductivity sensor/.test(t)) return <ChemConductometric />;
  if (/colorimetr|beer.?lambert|absorbance/.test(t)) return <ChemColorimetric />;
  if (/gas sensor|nox|sox/.test(t)) return <ChemGasSensor />;
  if (/biosensor|glucose|enzyme electrode/.test(t)) return <ChemBiosensor />;
  if (/sensor block|transducer|stimulus.*output/.test(t)) return <ChemSensorBlock />;
  if (/galvanic corrosion|dissimilar metal/.test(t)) return <ChemGalvanicCorrosion />;
  if (/waterline|pitting|differential aeration/.test(t)) return <ChemWaterlinePitting />;
  if (/galvaniz|zinc coating|sacrificial protection/.test(t)) return <ChemGalvanization />;
  if (/anodiz|oxide layer.*al/.test(t)) return <ChemAnodization />;
  if (/vapou?r inhibitor|\bvci\b|pcb protection/.test(t)) return <ChemVCI />;
  if (/penetration rate|\bcpr\b|corrosion rate/.test(t)) return <ChemCPRGauge />;
  if (/corrosion|rust|anodic dissolution/.test(t)) return <ChemCorrosionCell />;
  if (/green solvent|green coolant|safer solvent/.test(t)) return <ChemGreenSolvent />;
  if (/zno|zinc oxide|nanoparticle|nanoscale/.test(t)) return <ChemZnONano />;
  if (/\bpla\b|touch screen|biopolymer film/.test(t)) return <ChemPLATouch />;
  if (/alginate|hydrogel|brain.?computer|\bbci\b/.test(t)) return <ChemAlginateBCI />;
  if (/bioleach|microbe.*gold|gold recovery/.test(t)) return <ChemBioleaching />;
  if (/e.?waste|collect.*sort|circular electronic/.test(t)) return <ChemEWasteFlow />;
  if (/mind.?map|concept map|overview/.test(t)) return <ChemMindMap title={title || 'Smart Chemistry'} />;
  if (/exam|answer strategy|scoring/.test(t)) return <ChemExamStrategy />;
  if (/revision|checklist|recap/.test(t)) return <ChemRevisionSheet />;
  return <ChemGenericAtoms />;
}
