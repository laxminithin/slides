import { javaSlideMeta } from './javaSlideMeta'
import {
  ClassObjectViz, JvmPipelineViz, StackHeapViz, InheritanceTree, PolymorphicDispatch,
  EncapsulationShell, ExceptionFlow, ThreadLifecycle, RaceSyncScene,
} from './components/JavaLivingViz'

/* V2.2 "Living Software" — map specific slides (by module + slide number, which
   are stable) to a living-visual scene. Only these slides are upgraded; every
   other slide keeps its existing generic scene. Content/notes/routing unchanged. */
const LIVING_VISUALS = {
  module1: { 35: { viz: 'jvm' } },
  module2: {
    3: { viz: 'classObject' },
    6: {
      viz: 'classObject', code: true,
      props: {
        type: 'Box', ctor: 'new Box()',
        f1: ['double width;', 'width  = 10'], f2: ['double height;', 'height = 20'],
        method: ['double volume()', 'volume()', 'returns 2000.0'],
      },
    },
    7: { viz: 'stackHeap', mode: 'objects' },
    35: { viz: 'stackHeap', mode: 'recursion' },
    36: { viz: 'encapsulation' },
  },
  module3: {
    3: { viz: 'inheritance' },
    12: { viz: 'polymorphism' },
  },
  module4: {
    4: { viz: 'exceptions' },
    24: { viz: 'threadLifecycle' },
    33: { viz: 'raceSync' },
  },
}
function livingVisualFor(moduleKey, slideNumber) {
  return LIVING_VISUALS[moduleKey]?.[slideNumber] || null
}

const LIVING_LEGENDS = {
  classObject: [
    ['Class', 'one blueprint, written once'],
    ['Object', 'a live instance in the heap'],
    ['Reference', 'a variable pointing to it'],
  ],
  jvm: [
    ['Compile', 'javac turns source into bytecode'],
    ['Load & verify', 'the JVM checks every class'],
    ['Execute', 'interpreter + JIT run it on the CPU'],
  ],
  stackHeap: [
    ['Stack', 'method frames + local variables'],
    ['Heap', 'objects and arrays'],
    ['Reference', 'stack variable → heap object'],
  ],
  inheritance: [
    ['Inherit', 'the child reuses the parent blueprint'],
    ['Add', 'the child adds its own behaviour'],
    ['Override', 'the child replaces an inherited method'],
  ],
  polymorphism: [
    ['One reference', 'Animal a — a single static type'],
    ['Same call', 'a.sound() — one identical line'],
    ['Runtime decides', 'the actual object picks the behaviour'],
  ],
  encapsulation: [
    ['Private state', 'fields are locked inside the object'],
    ['Blocked', 'direct outside access is refused'],
    ['Public methods', 'the only doors — they guard the rules'],
  ],
  exceptions: [
    ['Throw', 'an error is raised deep in the stack'],
    ['Unwind', 'frames pop while a handler is sought'],
    ['Catch · finally', 'handle, clean up, then recover'],
  ],
  threadLifecycle: [
    ['Lifecycle', 'NEW → RUNNABLE → RUNNING → WAITING → END'],
    ['Scheduler', 'time-slices the CPU between threads'],
    ['One running', 'only one thread runs per core at a time'],
  ],
  raceSync: [
    ['Shared state', 'both threads touch one counter'],
    ['Race', 'interleaved updates lose an increment'],
    ['synchronized', 'a lock serializes access → correct'],
  ],
}

const javaModules = {
  module1: {
    number: '01',
    title: 'Java Foundations',
    emotion: 'Beginning a journey',
    metaphor: 'JVM factory',
    accent: 'foundation',
    code: 'class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello Java");\n  }\n}',
    path: ['Problem', 'Java code', 'javac', 'Bytecode', 'JVM', 'Output'],
    memory: ['primitive value', 'array object', 'loop counter', 'expression result'],
  },
  module2: {
    number: '02',
    title: 'Object-Oriented Programming',
    emotion: 'Software comes alive',
    metaphor: 'Blueprint factory',
    accent: 'object',
    code: 'class Box {\n  double width, height, depth;\n  Box(double w, double h, double d) {\n    width = w; height = h; depth = d;\n  }\n  double volume() { return width * height * depth; }\n}',
    path: ['Class', 'new', 'Constructor', 'Object', 'Method call', 'State change'],
    memory: ['Box object', 'reference b', 'fields', 'unreachable object'],
  },
  module3: {
    number: '03',
    title: 'Inheritance, Packages and Interfaces',
    emotion: 'Managing complexity',
    metaphor: 'Software family tree',
    accent: 'reuse',
    code: 'abstract class Shape { abstract void draw(); }\nclass Circle extends Shape { void draw() { paintCircle(); } }\nShape s = new Circle();\ns.draw();',
    path: ['Duplication', 'Superclass', 'Subclass', 'Override', 'Dispatch', 'Reuse'],
    memory: ['Shape ref', 'Circle object', 'v-table decision', 'package boundary'],
  },
  module4: {
    number: '04',
    title: 'Exceptions and Threads',
    emotion: 'Many workers',
    metaphor: 'Runtime control room',
    accent: 'thread',
    code: 'class Worker implements Runnable {\n  public void run() { process(); }\n}\nThread t = new Thread(new Worker());\nt.start();\nt.join();',
    path: ['Risky code', 'Exception alarm', 'Handler', 'Thread', 'Scheduler', 'Join'],
    memory: ['Thread-1', 'Thread-2', 'shared object', 'monitor lock'],
  },
  module5: {
    number: '05',
    title: 'Enums, Wrappers and Generics',
    emotion: 'Type safety',
    metaphor: 'Compiler quality gate',
    accent: 'type',
    code: 'enum Department { CSE, ISE, ECE }\nclass Box<T> {\n  private T value;\n  Box(T value) { this.value = value; }\n  T get() { return value; }\n}\nBox<Integer> marks = new Box<>(95);',
    path: ['Named constants', 'Wrapper object', 'Autobox', 'Generic T', 'Compiler check', 'Safe API'],
    memory: ['Department.CSE', 'Integer(95)', 'Box<Integer>', 'Pair<K,V>'],
  },
}

function sceneFor(slide, index) {
  if (index === 0 || slide.layout === 'hero') return 'hero'
  if (slide.layout === 'code') return 'ide'
  if (slide.layout === 'flow') return 'pipeline'
  if (slide.layout === 'compare' || slide.layout === 'table') return 'compare'
  if (slide.layout === 'classDiagram' || slide.layout === 'inheritanceDiagram' || slide.layout === 'threadDiagram') return 'architecture'
  if (slide.layout === 'hub') return 'memory'
  if (slide.layout === 'cards') return 'interaction'
  if (slide.layout === 'questions' || slide.layout === 'revision') return 'debug'
  if (slide.layout === 'definition') return 'why'
  return ['why', 'ide', 'pipeline', 'memory', 'interaction', 'architecture', 'debug'][index % 7]
}

function createJavaSlides(moduleKey) {
  const module = { ...javaModules[moduleKey], slides: javaSlideMeta[moduleKey].slides }
  return module.slides.map((slide, index) => {
    const slideNumber = String(index + 1).padStart(2, '0')
    const scene = sceneFor(slide, index)
    return {
      id: `${moduleKey}-slide-${slideNumber}`,
      kicker: `VTU 1BCS302 · ${slide.section}`,
      title: slide.title,
      subtitle: slide.subtitle,
      hideTitle: true,
      layout: 'full',
      composition: `java-${scene}`,
      tone: `java-masterpiece-slide java-${module.accent}`,
      content: <JavaMasterpieceSlide moduleKey={moduleKey} module={module} slide={slide} index={index} scene={scene} />,
      notes: `Original slide ${index + 1}: ${slide.section} - ${slide.title}`,
    }
  })
}

function JavaMasterpieceSlide({ moduleKey, module, slide, index, scene }) {
  const living = livingVisualFor(moduleKey, index + 1)
  return (
    <section className={`java-stage java-stage-${living ? 'live' : scene}`} data-slide-content>
      <div className="java-bg-grid" aria-hidden="true" />
      <div className="java-slide-chrome">
        <div>
          <span className="java-module-chip">Module {module.number}</span>
          <span className="java-emotion">{slide.section}</span>
        </div>
        <div className="java-window-dots" aria-hidden="true"><i /><i /><i /></div>
      </div>
      {living ? (
        <LivingScene slide={slide} cfg={living} />
      ) : (
        <>
          {scene === 'hero' && <HeroScene module={module} slide={slide} />}
          {scene === 'why' && <WhyScene module={module} slide={slide} />}
          {scene === 'ide' && <IdeScene module={module} slide={slide} />}
          {scene === 'pipeline' && <PipelineScene module={module} slide={slide} />}
          {scene === 'memory' && <MemoryScene module={module} slide={slide} index={index} />}
          {scene === 'interaction' && <InteractionScene module={module} slide={slide} />}
          {scene === 'architecture' && <ArchitectureScene module={module} slide={slide} />}
          {scene === 'debug' && <DebugScene module={module} slide={slide} index={index} />}
          {scene === 'compare' && <CompareScene module={module} slide={slide} />}
        </>
      )}
    </section>
  )
}

function LivingScene({ slide, cfg }) {
  const code = cfg.code && Array.isArray(slide.data) ? slide.data : null
  const legend = LIVING_LEGENDS[cfg.viz]
  return (
    <div className="java-live-scene">
      <div className="java-live-copy">
        <p className="java-kicker">{slide.section}</p>
        <h2>{slide.title}</h2>
        <p>{slide.subtitle}</p>
        {code ? (
          <div className="java-live-code">
            <header><span>src/{fileName(slide.title)}.java</span><b>{code[1] || 'Java'}</b></header>
            <pre><code>{code[0]}</code></pre>
          </div>
        ) : legend ? (
          <div className="java-live-legend">
            {legend.map(([term, desc]) => <b key={term}>{term} <small>— {desc}</small></b>)}
          </div>
        ) : null}
      </div>
      <div className="java-live-stage">
        {cfg.viz === 'classObject' && <ClassObjectViz {...(cfg.props || {})} />}
        {cfg.viz === 'jvm' && <JvmPipelineViz />}
        {cfg.viz === 'stackHeap' && <StackHeapViz mode={cfg.mode} />}
        {cfg.viz === 'inheritance' && <InheritanceTree />}
        {cfg.viz === 'polymorphism' && <PolymorphicDispatch />}
        {cfg.viz === 'encapsulation' && <EncapsulationShell />}
        {cfg.viz === 'exceptions' && <ExceptionFlow />}
        {cfg.viz === 'threadLifecycle' && <ThreadLifecycle />}
        {cfg.viz === 'raceSync' && <RaceSyncScene />}
      </div>
    </div>
  )
}

function HeroScene({ module, slide }) {
  const hero = typeof slide.data === 'object' && !Array.isArray(slide.data) ? slide.data : null
  return (
    <div className="java-hero-scene">
      <div className="java-hero-copy">
        <p className="java-kicker">Java Programming V2.1</p>
        <h2>{slide.title}</h2>
        <p>{slide.subtitle}</p>
        <div className="java-hero-tags">
          {(hero?.sub ? hero.sub.split(' • ') : module.path.slice(0, 4)).map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <div className="java-runtime-orbit" aria-label={`${module.metaphor} visual`}>
        <div className="java-core-engine"><span>{hero?.mark?.split('\n')[0] || 'JAVA'}</span><strong>{hero?.mark?.split('\n')[1] || module.metaphor}</strong></div>
        {module.path.map((step, i) => <b key={step} style={{ '--i': i }}>{step}</b>)}
      </div>
    </div>
  )
}

function WhyScene({ module, slide }) {
  const definition = Array.isArray(slide.data) ? slide.data : null
  const terms = Array.isArray(definition?.[2]) ? definition[2] : module.path.slice(0, 5)
  return (
    <div className="java-why-scene">
      <div className="java-problem-card">
        <span>{slide.section}</span><h2>{slide.title}</h2><p>{definition?.[1] || slide.subtitle}</p>
        <div className="java-term-strip">{terms.map((item) => <b key={item}>{item}</b>)}</div>
      </div>
      <div className="java-before-after">
        <article><small>Why it appears</small><strong>{definition?.[0] || slide.section}</strong><p>{slide.subtitle}</p></article>
        <i aria-hidden="true" />
        <article className="is-after"><small>Runtime meaning</small><strong>{module.path.at(-1)}</strong><p>{module.metaphor} turns the idea into an executing software behavior.</p></article>
      </div>
    </div>
  )
}

function IdeScene({ module, slide }) {
  const [code, label] = Array.isArray(slide.data) ? slide.data : [module.code, 'Java code']
  return (
    <div className="java-ide-scene">
      <div className="java-ide-window"><header><span>src/{fileName(slide.title)}.java</span><b>{label || slide.section}</b></header><pre><code>{code || module.code}</code></pre></div>
      <div className="java-console"><span>{slide.section}</span><strong>{slide.title}</strong><p>{slide.subtitle}</p><code>{'>'} javac {fileName(slide.title)}.java</code><code>{'>'} java {fileName(slide.title)}</code></div>
    </div>
  )
}

function PipelineScene({ module, slide }) {
  const steps = Array.isArray(slide.data) ? slide.data : module.path
  return (
    <div className="java-pipeline-scene">
      <div className="java-scene-title"><span>{slide.section}</span><h2>{slide.title}</h2><p>{slide.subtitle}</p></div>
      <div className="java-pipeline" data-count={Math.min(steps.length, 6)}>{steps.slice(0, 6).map((step, i) => <article key={`${step}-${i}`} style={{ '--i': i }}><span>{String(i + 1).padStart(2, '0')}</span><strong>{step}</strong></article>)}</div>
    </div>
  )
}

function CompareScene({ slide }) {
  const panes = compareItems(slide)
  return (
    <div className="java-debug-scene java-compare-scene">
      <div className="java-debug-panel"><span>{slide.section}</span><h2>{slide.title}</h2><p>{slide.subtitle}</p></div>
      <div className="java-debug-dashboard java-compare-dashboard">
        {panes.slice(0, 6).map((item, i) => <article key={`${labelOf(item)}-${i}`} className={i === 1 ? 'active' : ''}><small>{`compare ${i + 1}`}</small><strong>{labelOf(item)}</strong>{descOf(item) && <p>{descOf(item)}</p>}</article>)}
      </div>
    </div>
  )
}

function MemoryScene({ module, slide, index }) {
  const data = Array.isArray(slide.data) ? slide.data : [slide.title, []]
  const center = typeof data[0] === 'string' ? data[0] : slide.section
  const items = Array.isArray(data[1]) ? data[1] : module.memory.map((item) => [item, slide.subtitle])
  const left = items.slice(0, Math.ceil(items.length / 2))
  const right = items.slice(Math.ceil(items.length / 2))
  return (
    <div className="java-memory-scene">
      <div className="java-scene-title"><span>{slide.section}</span><h2>{slide.title}</h2><p>{slide.subtitle}</p></div>
      <div className="java-memory-board">
        <section><h3>{center}</h3>{left.map((item, i) => <b key={labelOf(item)} className={i === index % Math.max(1, left.length) ? 'active' : ''}>{labelOf(item)}<small>{descOf(item)}</small></b>)}</section>
        <section><h3>Runtime View</h3>{(right.length ? right : module.memory).map((item, i) => <b key={labelOf(item)} className={i === (index + 1) % Math.max(1, right.length || module.memory.length) ? 'active' : ''}>{labelOf(item)}<small>{descOf(item)}</small></b>)}</section>
        <div className="java-gc-unit" aria-hidden="true"><span /><strong>{module.accent === 'thread' ? 'CPU' : 'GC'}</strong></div>
      </div>
    </div>
  )
}

function InteractionScene({ module, slide }) {
  const cards = Array.isArray(slide.data) ? slide.data : []
  const actors = cards.length ? cards : module.memory.map((item) => [item, slide.subtitle])
  return (
    <div className="java-interaction-scene">
      <div className="java-scene-title"><span>{slide.section}</span><h2>{slide.title}</h2><p>{slide.subtitle}</p></div>
      <div className="java-sequence" data-count={Math.min(actors.length, 4)}>{actors.slice(0, 4).map((actor, i) => <article key={labelOf(actor)} style={{ '--i': i }}><strong>{labelOf(actor)}</strong><p>{descOf(actor)}</p><span>{i % 2 === 0 ? 'send' : 'execute'}</span></article>)}</div>
    </div>
  )
}

function ArchitectureScene({ module, slide }) {
  const layers = architectureItems(module, slide)
  return (
    <div className="java-architecture-scene">
      <div className="java-scene-title"><span>{slide.section}</span><h2>{slide.title}</h2><p>{slide.subtitle}</p></div>
      <div className="java-architecture">{layers.map((item, i) => <div key={item} className={`java-layer layer-${i}`} style={{ '--z': i - 2 }}>{item}</div>)}</div>
    </div>
  )
}

function DebugScene({ module, slide, index }) {
  const raw = slide.layout === 'questions' || slide.layout === 'revision' ? (Array.isArray(slide.data) ? slide.data : []) : module.memory
  const signals = raw.length ? raw : module.memory
  return (
    <div className="java-debug-scene">
      <div className="java-debug-panel"><span>{slide.layout === 'questions' ? 'Viva Console' : slide.section}</span><h2>{slide.title}</h2><p>{slide.subtitle}</p></div>
      <div className="java-debug-dashboard">{signals.slice(0, 6).map((item, i) => <article key={`${labelOf(item)}-${i}`} className={i === index % Math.min(6, signals.length) ? 'active' : ''}><small>{slide.layout === 'questions' ? `question ${i + 1}` : `watch ${i + 1}`}</small><strong>{labelOf(item)}</strong>{descOf(item) && <p>{descOf(item)}</p>}</article>)}</div>
    </div>
  )
}

function fileName(title) { return title.replace(/[^a-z0-9]+/gi, '').slice(0, 22) || 'Program' }
function labelOf(item) { return Array.isArray(item) ? String(item[0]) : String(item) }
function descOf(item) { return Array.isArray(item) ? (Array.isArray(item[1]) ? item[1].join(' • ') : item[1] ? String(item[1]) : '') : '' }
function compareItems(slide) {
  const data = Array.isArray(slide.data) ? slide.data : []
  if (data.length >= 4 && Array.isArray(data[1]) && Array.isArray(data[3])) return [[data[0], data[1]], [data[2], data[3]]]
  if (Array.isArray(data[0]) && Array.isArray(data[1])) return data[1]
  return data
}
function architectureItems(module, slide) {
  if (slide.layout === 'classDiagram') return ['Class blueprint', 'Reference', 'Object', 'Fields', 'Methods']
  if (slide.layout === 'inheritanceDiagram') return ['Superclass', 'extends', 'Subclass', 'Override', 'Dispatch']
  if (slide.layout === 'threadDiagram') return ['main thread', 'start()', 'run()', 'Scheduler', 'child thread']
  if (slide.layout === 'table' && Array.isArray(slide.data?.[0])) return slide.data[0]
  return module.path.slice(0, 5)
}

export const javaModule1Slides = createJavaSlides('module1')
export const javaModule2Slides = createJavaSlides('module2')
export const javaModule3Slides = createJavaSlides('module3')
export const javaModule4Slides = createJavaSlides('module4')
export const javaModule5Slides = createJavaSlides('module5')
