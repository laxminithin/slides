import './parallelComputing.css'
import './pcComposition.css'
import { OpeningM4 } from './components/ParallelOpenings'
import {
  ForkJoinTimeline, CriticalSectionGate, OpenMpReduction,
  LoadBalancing, CoherenceStory, ProcessorPackage,
} from './components/ParallelViz'

const roadmap = [
  'Opening',
  'OpenMP Basics',
  'Pragmas',
  'Trapezoidal Rule',
  'Variable Scope',
  'Synchronization',
  'Dependencies',
  'Scheduling',
  'Producer-Consumer',
  'Caches',
  'Tasking',
  'Thread Safety',
  'Performance',
  'Summary',
]

const sourceNote = 'Source: VTU_BCS702_Module_4_OpenMP.pptx in the workspace.'

function slide({ id, title, subtitle, content, notes, hideTitle = true }) {
  return { id, kicker: 'VTU BCS702 | Module 4', title, subtitle, content, notes, hideTitle }
}

function Roadmap({ section }) {
  return (
    <nav className="pc-m4-roadmap" aria-label="Module 4 roadmap">
      {roadmap.map((item) => <span key={item} className={item === section ? 'active' : ''}>{item}</span>)}
    </nav>
  )
}

function Points({ items }) {
  return (
    <ul className="pc-m4-points">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function Flow({ items, tone = 'blue' }) {
  return (
    <div className={`pc-m4-flow ${tone}`}>
      {items.map((item, index) => <span key={`${item}-${index}`} style={{ '--i': index }}>{item}</span>)}
    </div>
  )
}

function Code({ children }) {
  return <pre className="pc-m4-code"><code>{children}</code></pre>
}

function Definition({ term, children }) {
  return (
    <div className="pc-m4-definition">
      <span>Definition</span>
      <strong>{term}</strong>
      <p>{children}</p>
    </div>
  )
}

function Compare({ leftTitle, rightTitle, left, right }) {
  return (
    <div className="pc-m4-compare">
      <article><h3>{leftTitle}</h3><Points items={left} /></article>
      <article><h3>{rightTitle}</h3><Points items={right} /></article>
    </div>
  )
}

function ConceptGrid({ items }) {
  return (
    <div className="pc-m4-concepts">
      {items.map(([title, body], index) => (
        <article key={title} style={{ '--i': index }}>
          <strong>{title}</strong>
          <span>{body}</span>
        </article>
      ))}
    </div>
  )
}

function Workstation({ mode = 'serial', labels = [], memory = 'shared arrays', alert }) {
  const status = {
    serial: ['Thread 0 active', 'waiting', 'waiting', 'waiting'],
    fork: ['Thread 0', 'Thread 1', 'Thread 2', 'Thread 3'],
    loop: ['i: 0,4,8', 'i: 1,5,9', 'i: 2,6,10', 'i: 3,7,11'],
    scope: ['temp private', 'temp private', 'temp private', 'temp private'],
    race: ['writes sum', 'writes sum', 'writes sum', 'writes sum'],
    sync: ['local sum', 'local sum', 'local sum', 'local sum'],
    schedule: ['chunk done', 'new chunk', 'long chunk', 'new chunk'],
    cache: ['cache line A', 'cache line A', 'cache line B', 'cache line B'],
    tasks: ['producer', 'consumer', 'consumer', 'consumer'],
    safe: ['race-free', 'race-free', 'race-free', 'race-free'],
  }[mode] || ['Thread 0', 'Thread 1', 'Thread 2', 'Thread 3']

  return (
    <div className={`pc-m4-workstation ${mode}`}>
      <div className="pc-m4-runtime">OpenMP runtime scheduler</div>
      <div className="pc-m4-chip">
        {[0, 1, 2, 3].map((thread) => (
          <article key={thread} style={{ '--i': thread }}>
            <b>Core {thread}</b>
            <span>private cache</span>
            <strong>{status[thread]}</strong>
          </article>
        ))}
      </div>
      <div className="pc-m4-memory">
        <strong>Shared memory</strong>
        <span>{memory}</span>
        {labels.map((label) => <em key={label}>{label}</em>)}
      </div>
      {alert && <div className="pc-m4-alert">{alert}</div>}
    </div>
  )
}

function IterationStrip({ dependent = false }) {
  return (
    <div className={`pc-m4-iterations ${dependent ? 'dependent' : ''}`}>
      {Array.from({ length: 12 }).map((_, i) => <span key={i}>i={i}</span>)}
      <b>{dependent ? 'p[i] needs p[i-1]' : 'each iteration uses its own cell'}</b>
    </div>
  )
}

function BufferVisual() {
  return (
    <div className="pc-m4-buffer">
      <article><strong>Producer</strong><span>create weather task</span></article>
      <div>{['task A', 'task B', 'task C'].map((item) => <span key={item}>{item}</span>)}</div>
      <article><strong>Consumer</strong><span>process item safely</span></article>
      <b>lock / critical / task coordination</b>
    </div>
  )
}

function MindMap() {
  return (
    <div className="pc-m4-mindmap">
      <strong>Module 4</strong>
      {['OpenMP', 'Pragmas / directives', 'Scope / reduction', 'Dependency / schedule', 'Producer-consumer', 'Coherence / false sharing', 'Tasking / thread safety'].map((item, index) => (
        <span key={item} style={{ '--i': index }}>{item}</span>
      ))}
    </div>
  )
}

function SlideView({ section, title, subtitle, points = [], visual, code, definition, flow, compare, dense = false, tone, composition = '' }) {
  return (
    <div className={`pc-m4-slide ${dense ? 'dense' : ''} ${composition}`.trim()}>
      <Roadmap section={section} />
      <div className="pc-m4-body">
        <section className="pc-m4-copy">
          <span className="pc-m4-section">{section}</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          {definition && <Definition term={definition[0]}>{definition[1]}</Definition>}
          {flow && <Flow items={flow} tone={tone} />}
          {points.length > 0 && <Points items={points} />}
        </section>
        <section className="pc-m4-visual">
          {code ? <Code>{code}</Code> : compare ? <Compare {...compare} /> : visual}
        </section>
      </div>
    </div>
  )
}

function DividerView({ number, section, title, subtitle, visual }) {
  return (
    <div className="pc-m4-slide pc-m4-divider pc-comp-hero">
      <Roadmap section={section} />
      <div>
        <span>{number}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {visual || <ForkJoinTimeline />}
    </div>
  )
}

const rawSlides = [
  { section: 'Opening', title: 'Parallel Computing Module 4', subtitle: 'Nearby workers are faster — share the workbench carefully', flow: ['Serial program', '#pragma omp', 'Fork thread team', 'Shared memory', 'Race-free result'], points: ['Threads share memory; correctness depends on how they coordinate.', 'Add directives. Create threads. Share memory carefully.', 'Thread 0 starts serial execution, then Threads 1, 2 and 3 join inside parallel regions.', 'The weather simulation now runs on one multicore workstation.'], visual: <OpeningM4 />, composition: 'pc-comp-hero' },
  { section: 'Opening', title: 'Module 4 learning journey', subtitle: 'Watch thread life: fork → team → barrier → join.', flow: ['OpenMP pragmas', 'Trapezoidal rule', 'Variable scope', 'Reduction', 'Loop dependency', 'Scheduling', 'Producer-consumer', 'Caches', 'Tasking', 'Thread safety'], visual: <ForkJoinTimeline />, composition: 'pc-comp-visual-first' },
  { section: 'Opening', title: 'Why OpenMP?', subtitle: 'Why are nearby workers faster than remote workers?', flow: ['Serial C program', 'Add pragmas', 'Compiler creates threads', 'Runtime schedules work', 'Parallel result'], points: ['OpenMP supports incremental parallelization without rewriting the application in a new language.', 'The source code remains ordinary C/C++/Fortran plus compiler-recognized directives.', 'Runtime settings can change thread counts and scheduling experiments.'], visual: <ProcessorPackage label="CPU" cores={4} hot />, composition: 'pc-comp-exploded' },
  { divider: true, number: '02', section: 'OpenMP Basics', title: 'OpenMP Basics', subtitle: 'One program. One address space. Many threads.', visual: <ProcessorPackage label="CPU" cores={4} /> },
  { section: 'OpenMP Basics', title: 'What is OpenMP?', subtitle: 'Define the API before reading any pragma.', definition: ['OpenMP', 'OpenMP is a shared-memory parallel programming API that uses compiler directives, runtime functions and environment variables to create and coordinate threads.'], points: ['Threads cooperate in a common address space.', 'Pragmas and directives describe parallel regions and work sharing.', 'Runtime functions and environment variables query or tune execution.'], visual: <ProcessorPackage label="CPU" cores={4} />, composition: 'pc-comp-exploded' },
  { section: 'OpenMP Basics', title: 'Fork-join execution model', subtitle: 'The master thread creates a team, then serial execution resumes.', flow: ['Serial code', 'parallel region begins', 'Thread team works', 'Implicit barrier', 'Serial code resumes'], points: ['The master thread starts the serial program and creates the team at a parallel region.', 'Thread 0, Thread 1, Thread 2 and Thread 3 execute parts of the region.', 'An implicit barrier usually waits for the team before the join.'], visual: <ForkJoinTimeline />, composition: 'pc-comp-timeline' },
  { section: 'OpenMP Basics', title: 'OpenMP components', subtitle: 'The API has three visible pieces in exam answers and lab programs.', points: ['Compiler directives: pragmas tell the compiler what to parallelize.', 'Runtime library: functions query and control threads.', 'Environment variables: settings such as OMP_NUM_THREADS affect execution.'], visual: <ConceptGrid items={[['Directive', '#pragma omp parallel'], ['Runtime call', 'omp_get_thread_num()'], ['Environment', 'OMP_NUM_THREADS=4'], ['Compiler', 'enable OpenMP support']]} />, composition: 'pc-comp-quiet' },
  { divider: true, number: '03', section: 'Pragmas', title: 'Pragmas and Directives', subtitle: 'Read the pragma, identify the region, then check scope and synchronization.', visual: <ForkJoinTimeline /> },
  { section: 'Pragmas', title: 'OpenMP pragma syntax', subtitle: 'A pragma attaches OpenMP meaning to a structured block.', code: '#pragma omp directive [clauses]\n{\n  /* structured block */\n}\n\n#pragma omp parallel num_threads(4)\n{\n  printf("Hello from thread\\n");\n}', points: ['directive names the OpenMP operation.', 'clauses refine behavior, such as num_threads(4).', 'The structured block is the code executed under the directive.'] },
  { section: 'Pragmas', title: 'parallel directive', subtitle: 'Create a team of threads.', definition: ['parallel', 'The OpenMP directive that creates a team of threads to execute a structured block concurrently.'], points: ['Fork creates the thread team.', 'Each thread executes the structured block.', 'Join occurs after the region, with an implicit barrier unless changed by the construct.'], visual: <ForkJoinTimeline />, composition: 'pc-comp-hero' },
  { section: 'Pragmas', title: 'parallel for directive', subtitle: 'Split loop iterations among threads.', code: '#pragma omp parallel for\nfor (int i = 0; i < n; i++) {\n  a[i] = b[i] + c[i];\n}', points: ['The loop iterations are divided among the team.', 'Input arrays b[] and c[] are shared read-only data.', 'Each iteration writes a different a[i], so this loop is data parallel.'] },
  { section: 'Pragmas', title: 'Work-sharing loop model', subtitle: 'The visible team receives iteration chunks.', flow: ['Loop iterations', 'Chunks', 'Thread team', 'Local work', 'Join / barrier'], points: ['Thread 0, 1, 2 and 3 stay active as one team.', 'Correctness depends on whether iterations are independent.', 'Performance depends on chunk balance and scheduling overhead.'], visual: <LoadBalancing />, composition: 'pc-comp-dashboard' },
  { section: 'Pragmas', title: 'Common OpenMP directives', subtitle: 'The source deck highlights the beginner directive set.', points: ['parallel: create a thread team.', 'for: distribute loop iterations.', 'sections: run different code sections.', 'single/master: restrict a block to one thread.'], visual: <ConceptGrid items={[['parallel', 'team creation'], ['for', 'loop work sharing'], ['sections', 'different blocks'], ['single / master', 'one-thread block']]} />, composition: 'pc-comp-quiet' },
  { section: 'Pragmas', title: 'Runtime functions', subtitle: 'Useful calls for identifying and timing the thread team.', points: ['omp_get_thread_num() returns current thread ID.', 'omp_get_num_threads() returns team size.', 'omp_set_num_threads() requests thread count.', 'omp_get_wtime() returns wall-clock time.', 'omp_get_max_threads() returns maximum available threads.'], visual: <Workstation mode="fork" labels={['tid = omp_get_thread_num()', 'team = omp_get_num_threads()', 'time = omp_get_wtime()']} />, composition: 'pc-comp-reverse' },
  { divider: true, number: '04', section: 'Trapezoidal Rule', title: 'OpenMP Trapezoidal Rule', subtitle: 'Split loop iterations. Compute partial sums. Reduce safely.', visual: <OpenMpReduction /> },
  { section: 'Trapezoidal Rule', title: 'Trapezoidal rule in OpenMP', subtitle: 'Numerical integration becomes a shared-memory loop problem.', flow: ['Split loop iterations', 'Each thread computes partial sum', 'Reduction combines sums', 'Multiply by h', 'Print estimate'], points: ['The interval endpoints keep half weight.', 'Interior function evaluations are independent loop iterations.', 'The final accumulation needs reduction, not an unsafe shared update.'], visual: <IterationStrip />, composition: 'pc-comp-quiet' },
  { section: 'Trapezoidal Rule', title: 'Sequential trapezoidal skeleton', subtitle: 'Start from the serial C baseline.', code: 'h = (b - a) / n;\napprox = (f(a) + f(b)) / 2.0;\nfor (i = 1; i <= n-1; i++)\n  approx += f(a + i*h);\napprox = h * approx;', points: ['This baseline has one thread and one running sum.', 'The loop body is the natural target for OpenMP parallelization.', 'The shared sum is the dangerous part after adding threads.'] },
  { section: 'Trapezoidal Rule', title: 'OpenMP trapezoidal with reduction', subtitle: 'Each thread owns a private sum; OpenMP combines them.', code: 'double sum = 0.0;\n#pragma omp parallel for reduction(+:sum)\nfor (int i = 1; i <= n-1; i++) {\n  sum += f(a + i*h);\n}\napprox = h * ((f(a)+f(b))/2.0 + sum);', points: ['reduction(+:sum) prevents a race on sum.', 'The combine step happens at the end of the parallel loop.', 'This is clearer and usually faster than protecting every addition with critical.'] },
  { section: 'Trapezoidal Rule', title: 'Weather simulation mapping', subtitle: 'The same idea estimates accumulated weather values across grid cells.', flow: ['shared temperature[]', 'private x and local contribution', 'parallel for', 'reduction(+:sum)', 'forecast estimate'], points: ['Input arrays remain shared.', 'Temporary variables become private.', 'The output sum is combined race-free.'], visual: <OpenMpReduction />, composition: 'pc-comp-visual-first' },
  { divider: true, number: '05', section: 'Variable Scope', title: 'Variable Scope', subtitle: 'Correct OpenMP begins by deciding which memory each thread can touch.', visual: <CriticalSectionGate /> },
  { section: 'Variable Scope', title: 'Scope of variables', subtitle: 'Shared copy or private copy?', definition: ['Variable scope', 'In OpenMP, variable scope decides whether threads see one shared copy or each thread gets its own private copy.'], points: ['shared means one copy visible to all threads.', 'private means one copy per thread.', 'firstprivate initializes a private copy from the original value.', 'lastprivate copies the final loop value back.', 'default controls assumed data-sharing rules.'], visual: <Workstation mode="scope" labels={['shared arrays', 'private temp', 'default clause']} />, composition: 'pc-comp-reverse' },
  { section: 'Variable Scope', title: 'Shared variables', subtitle: 'One memory location is accessed by all threads.', points: ['One copy: all threads access the same memory location.', 'Useful for input arrays, especially read-only weather data.', 'Read-only shared data is usually safe.', 'Concurrent writes can create race conditions.'], visual: <CriticalSectionGate />, composition: 'pc-comp-compare' },
  { section: 'Variable Scope', title: 'Private variables', subtitle: 'One instance per thread avoids accidental interference.', points: ['Each thread gets its own variable instance.', 'Useful for loop temporaries such as x, local_value or cell_delta.', 'Private variables do not automatically inherit old values.', 'Private temporaries help preserve serial logic inside each iteration.'], visual: <Workstation mode="scope" memory="shared inputs, private temporaries" />, composition: 'pc-comp-quiet' },
  { section: 'Variable Scope', title: 'firstprivate, lastprivate and default', subtitle: 'Scope clauses communicate intent.', compare: { leftTitle: 'firstprivate', rightTitle: 'lastprivate', left: ['Private copy per thread.', 'Initialized from original value.', 'Useful for constants copied into a region.', 'Avoids shared updates.'], right: ['Private during loop.', 'Final value copied back.', 'Useful when sequential final value matters.', 'Depends on the last iteration.'] }, points: ['default can force explicit shared/private classification.'], composition: 'pc-comp-compare' },
  { section: 'Variable Scope', title: 'Race condition', subtitle: 'The central correctness bug in shared-memory programming.', definition: ['Race condition', 'A correctness bug where the result depends on unpredictable timing of multiple threads accessing shared data.'], points: ['Shared data is accessed concurrently.', 'At least one thread writes.', 'Timing determines the final result.', 'A shared sum updated by several weather threads is the classic example.'], visual: <CriticalSectionGate />, composition: 'pc-comp-hero' },
  { divider: true, number: '06', section: 'Synchronization', title: 'Synchronization and Reduction', subtitle: 'Protect correctness, but pay attention to overhead.', visual: <OpenMpReduction /> },
  { section: 'Synchronization', title: 'Critical section', subtitle: 'Protect one-at-a-time code.', code: '#pragma omp critical\n{\n  total += local_value;\n}', points: ['Only one thread enters the critical block at a time.', 'Useful for general protected code.', 'Can serialize work and reduce speedup if used inside hot loops.'] },
  { section: 'Synchronization', title: 'Atomic update', subtitle: 'Use lighter protection for simple operations.', code: '#pragma omp atomic\ntotal += value;', points: ['atomic is for a simple memory update.', 'It is usually lighter than a full critical section.', 'It still synchronizes the shared update, so it is not free.'] },
  { section: 'Synchronization', title: 'Reduction clause', subtitle: 'The preferred pattern for sums, products, min and max.', definition: ['reduction', 'An OpenMP clause that gives each thread a private copy of a variable and combines all copies using an operator at the end.'], points: ['Private copy per thread.', 'Operator-based combine.', 'Race-free sum.', 'Implicit synchronization at the end of the construct.'], visual: <OpenMpReduction />, composition: 'pc-comp-visual-first' },
  { section: 'Synchronization', title: 'Reduction operators', subtitle: 'OpenMP reductions are not only for addition.', points: ['+ / *: sum or product.', 'min / max: find smallest or largest.', '&& / ||: logical combination.', '& / | / ^: bitwise reductions.'], visual: <ConceptGrid items={[[ '+ / *', 'numeric accumulation'], ['min / max', 'extreme value'], ['&& / ||', 'logical result'], ['& / | / ^', 'bitwise result']]} />, composition: 'pc-comp-quiet' },
  { section: 'Synchronization', title: 'Reduction vs critical', subtitle: 'Both are correct for a sum; one expresses the intent better.', compare: { leftTitle: 'critical', rightTitle: 'reduction', left: ['General protected block.', 'One thread at a time.', 'Can serialize work.', 'Easy but slower for frequent sums.'], right: ['Designed for combining values.', 'Thread-local copies.', 'Efficient combine step.', 'Cleaner for sums, min and max.'] }, composition: 'pc-comp-compare' },
  { divider: true, number: '07', section: 'Dependencies', title: 'Loop Dependencies', subtitle: 'Not every serial loop becomes a safe parallel loop.', visual: <LoadBalancing /> },
  { section: 'Dependencies', title: 'Loop-carried dependency', subtitle: 'Iteration order can be a correctness requirement.', definition: ['Loop-carried dependency', 'A dependency where an iteration of a loop needs a value produced by an earlier or later iteration.'], points: ['Iteration order matters.', 'A dependency may make a loop not safely parallel.', 'Prefix sums are the standard warning example.', 'Correctness comes before speedup.'], visual: <IterationStrip dependent />, composition: 'pc-comp-quiet' },
  { section: 'Dependencies', title: 'Independent loop vs dependent loop', subtitle: 'Look for whether iteration i needs another iteration.', compare: { leftTitle: 'Independent loop', rightTitle: 'Dependent loop', left: ['a[i] = b[i] + c[i].', 'No iteration needs another.', 'Safe for parallel for.', 'Data parallel.'], right: ['p[i] = p[i-1] + a[i].', 'Iteration i needs i-1.', 'Not directly parallel.', 'Needs redesign.'] }, composition: 'pc-comp-compare' },
  { divider: true, number: '08', section: 'Scheduling', title: 'Scheduling', subtitle: 'Assign iterations so every thread stays useful.', visual: <LoadBalancing /> },
  { section: 'Scheduling', title: 'Why scheduling matters', subtitle: 'Load distribution controls both runtime and idle time.', definition: ['Scheduling', 'The OpenMP policy for assigning loop iterations to threads.'], points: ['Iterations are grouped into chunks.', 'Static, dynamic and guided schedules distribute those chunks differently.', 'Irregular weather cells can make equal iteration counts unequal in cost.'], visual: <LoadBalancing />, composition: 'pc-comp-dashboard' },
  { section: 'Scheduling', title: 'static scheduling', subtitle: 'Predictable assignment before the loop starts.', points: ['Iterations are divided before the loop starts.', 'Low overhead.', 'Good when work per iteration is similar.', 'Possible imbalance when iterations have uneven cost.'], visual: <LoadBalancing />, composition: 'pc-comp-visual-first' },
  { section: 'Scheduling', title: 'dynamic and guided scheduling', subtitle: 'Adaptive assignment for irregular work.', compare: { leftTitle: 'dynamic', rightTitle: 'guided', left: ['Threads request chunks as they finish.', 'Good for irregular work.', 'More scheduling overhead.', 'Chunk size matters.'], right: ['Large chunks first, smaller later.', 'Balances overhead and load.', 'Good for decreasing remaining work.', 'Runtime managed.'] }, composition: 'pc-comp-compare' },
  { section: 'Scheduling', title: 'schedule clause examples', subtitle: 'The schedule clause makes the policy explicit.', code: '#pragma omp parallel for schedule(static, 2)\nfor (int i = 0; i < n; i++) work(i);\n\n#pragma omp parallel for schedule(dynamic, 4)\nfor (int i = 0; i < n; i++) work(i);', points: ['schedule(static, 2) assigns fixed chunks of two iterations.', 'schedule(dynamic, 4) hands out chunks of four as threads finish.', 'The right choice depends on variation in iteration cost.'] },
  { section: 'Scheduling', title: 'Scheduling practical output', subtitle: 'A lab run should reveal which thread executed which iterations.', flow: ['Set OMP_SCHEDULE', 'Run loop', 'Each thread prints iterations', 'Observe chunks', 'Compare schedules'], points: ['Use Thread 0 to Thread 3 labels consistently.', 'Static output should look predictable.', 'Dynamic output may vary because faster threads request more work.'], visual: <Workstation mode="schedule" />, composition: 'pc-comp-reverse' },
  { divider: true, number: '09', section: 'Producer-Consumer', title: 'Producer-Consumer Coordination', subtitle: 'When threads share a queue, correctness lives in the handoff.', visual: <CriticalSectionGate /> },
  { section: 'Producer-Consumer', title: 'Producer-consumer pattern', subtitle: 'Producers create work; consumers process it.', definition: ['Producer-consumer', 'A pattern where producer threads create work/items and consumer threads process them, requiring safe coordination through a buffer or queue.'], points: ['Producer threads create weather tasks.', 'Consumer threads remove and process tasks.', 'A buffer or queue is shared.', 'Synchronization and conditions prevent unsafe access.'], visual: <BufferVisual />, composition: 'pc-comp-quiet' },
  { section: 'Producer-Consumer', title: 'Producer-consumer workflow', subtitle: 'Every queue handoff needs a protected update.', flow: ['Producer creates item', 'Lock buffer', 'Insert item', 'Consumer removes item', 'Process item'], points: ['The queue is shared memory.', 'Insert/remove operations need coordination.', 'Unprotected queue updates create races or lost work.'], visual: <CriticalSectionGate />, composition: 'pc-comp-timeline' },
  { section: 'Producer-Consumer', title: 'Synchronization choices', subtitle: 'Choose the mechanism that matches the work shape.', points: ['critical/lock protects a shared queue.', 'barrier makes phases wait.', 'single lets one thread create work.', 'task represents work items flexibly.'], visual: <ConceptGrid items={[['critical / lock', 'protect queue'], ['barrier', 'phase wait'], ['single', 'one creator'], ['task', 'flexible work item']]} />, composition: 'pc-comp-quiet' },
  { divider: true, number: '10', section: 'Caches', title: 'Caches and Coherence', subtitle: 'Shared memory is correct only when private caches stay coherent.', visual: <CoherenceStory /> },
  { section: 'Caches', title: 'Caches in OpenMP programs', subtitle: 'Performance can be limited by data movement, not arithmetic.', definition: ['Cache effects', 'Thread performance can be limited by how data moves through private caches and shared memory.'], points: ['Locality keeps useful data close to a core.', 'A cache line moves data in blocks.', 'Coherence keeps shared copies consistent.', 'False sharing creates traffic without true data sharing.', 'Bandwidth can limit multicore speedup.'], visual: <Workstation mode="cache" memory="shared memory + private caches" />, composition: 'pc-comp-reverse' },
  { section: 'Caches', title: 'Cache coherence in OpenMP', subtitle: 'If one core writes x, other cached copies must be corrected.', flow: ['Core 0 cache has x copy', 'Core 1 cache has x copy', 'Core writes x', 'Other cache stale', 'Coherence protocol invalidates or updates'], points: ['Coherence provides correct visibility for shared-memory writes.', 'Correctness may hold while performance still suffers from coherence traffic.'], visual: <CoherenceStory stale />, composition: 'pc-comp-hero' },
  { section: 'Caches', title: 'False sharing in OpenMP', subtitle: 'Different variables can fight because they share one cache line.', points: ['Thread 0 updates a[0].', 'Thread 1 updates a[1].', 'Both variables may live in the same cache line.', 'Coherence traffic slows both threads even though they do not share the same element.'], visual: <CoherenceStory stale />, composition: 'pc-comp-visual-first' },
  { section: 'Caches', title: 'Avoiding false sharing', subtitle: 'Reduce unnecessary cache-line traffic.', points: ['Give each thread separate cache-line-friendly storage.', 'Use padding for per-thread counters when needed.', 'Prefer reduction clauses for combined totals.', 'Avoid frequent writes to adjacent shared variables.', 'Measure performance because effects can be hardware dependent.'], visual: <CoherenceStory stale={false} />, composition: 'pc-comp-compare' },
  { divider: true, number: '11', section: 'Tasking', title: 'OpenMP Tasking', subtitle: 'Use tasks when work is irregular, recursive or discovered dynamically.', visual: <ForkJoinTimeline /> },
  { section: 'Tasking', title: 'What is OpenMP tasking?', subtitle: 'Tasking creates dynamic units of work for the runtime.', definition: ['Tasking', 'OpenMP tasking lets a program create units of work that can be scheduled dynamically among threads.'], points: ['Tasks represent dynamic work.', 'Useful for irregular parallelism.', 'The runtime maintains a task queue.', 'Work stealing can keep threads busy.'], visual: <LoadBalancing />, composition: 'pc-comp-dashboard' },
  { section: 'Tasking', title: 'task directive', subtitle: 'A single thread can create tasks for the team.', code: '#pragma omp parallel\n#pragma omp single\n{\n  #pragma omp task\n  work_left();\n\n  #pragma omp task\n  work_right();\n}', points: ['parallel creates the team.', 'single keeps task creation from being duplicated by every thread.', 'task packages work for runtime scheduling.'] },
  { section: 'Tasking', title: 'taskwait', subtitle: 'Wait until child tasks complete before combining results.', code: '#pragma omp task\ncompute_part_A();\n\n#pragma omp task\ncompute_part_B();\n\n#pragma omp taskwait\ncombine_results();', points: ['taskwait synchronizes child tasks in the current task context.', 'Use it before code that depends on task results.', 'It is the tasking counterpart of waiting before final combination.'] },
  { section: 'Tasking', title: 'Tasking for Fibonacci', subtitle: 'Recursive work naturally becomes a task tree.', flow: ['fib(n)', 'Create fib(n-1) task', 'Create fib(n-2) task', 'taskwait', 'Add results'], points: ['The same pattern applies to recursive weather-region subdivision.', 'Tasks express irregular work better than a fixed loop schedule.'], visual: <Workstation mode="tasks" alert="task tree -> queue -> worker threads" />, composition: 'pc-comp-reverse' },
  { section: 'Tasking', title: 'Task granularity', subtitle: 'Task size controls overhead and load balance.', compare: { leftTitle: 'Too fine', rightTitle: 'Too coarse', left: ['Many tiny tasks.', 'High overhead.', 'Poor speedup.', 'Runtime overloaded.'], right: ['Few big tasks.', 'Less overhead.', 'Poor load balance.', 'Threads may idle.'] }, composition: 'pc-comp-compare' },
  { divider: true, number: '12', section: 'Thread Safety', title: 'Thread Safety', subtitle: 'A parallel program is only useful when it remains correct.', visual: <CriticalSectionGate /> },
  { section: 'Thread Safety', title: 'Thread safety', subtitle: 'Define the property every OpenMP program must satisfy.', definition: ['Thread safety', 'Code is thread-safe if it behaves correctly when multiple threads execute it concurrently.'], points: ['Correctness must hold for Thread 0, 1, 2 and 3 together.', 'Shared state needs discipline.', 'Race-free code is the first requirement.', 'Reentrant code and synchronization help preserve behavior.'], visual: <Workstation mode="safe" labels={['correctness', 'race-free', 'reentrant']} />, composition: 'pc-comp-quiet' },
  { section: 'Thread Safety', title: 'Thread-safe coding rules', subtitle: 'Practical checklist for weather simulation code.', points: ['Avoid unsynchronized shared writes.', 'Prefer private variables for temporaries.', 'Use reductions for accumulations.', 'Protect shared data structures.', 'Be careful with non-thread-safe library calls and global state.'], visual: <Workstation mode="safe" alert="private where possible, synchronized where necessary" />, composition: 'pc-comp-reverse' },
  { section: 'Thread Safety', title: 'OpenMP debugging mindset', subtitle: 'Races are nondeterministic, so debugging must be deliberate.', points: ['A race may appear only sometimes.', 'Changing print statements can hide timing bugs.', 'Correct serial code can become wrong when shared variables are updated.', 'Start with small inputs and known answers.', 'Test with multiple thread counts.'], visual: <CriticalSectionGate />, composition: 'pc-comp-hero' },
  { divider: true, number: '13', section: 'Performance', title: 'OpenMP Performance', subtitle: 'Measure the parallel region and explain the overhead.', visual: <LoadBalancing /> },
  { section: 'Performance', title: 'Timing OpenMP programs', subtitle: 'omp_get_wtime measures wall-clock elapsed time.', code: 'double start = omp_get_wtime();\n#pragma omp parallel for reduction(+:sum)\nfor (int i = 0; i < n; i++)\n  sum += a[i];\ndouble elapsed = omp_get_wtime() - start;', points: ['Measure the real parallel section.', 'Repeat with different thread counts.', 'Interpret speedup through work size, balance, synchronization and cache behavior.'] },
  { section: 'Performance', title: 'OpenMP performance checklist', subtitle: 'Speedup comes from useful work, not just more threads.', points: ['Enough parallel work to amortize thread overhead.', 'Balanced scheduling across threads.', 'Low synchronization overhead.', 'Good cache locality and minimal false sharing.', 'Correct variable scoping and reductions.'], visual: <LoadBalancing />, composition: 'pc-comp-dashboard' },
  { divider: true, number: '14', section: 'Summary', title: 'Module 4 Summary', subtitle: 'Threads share memory, so coordination decides correctness and speed.', visual: <ProcessorPackage label="CPU" cores={4} hot /> },
  { section: 'Summary', title: 'Module 4 in one mind map', subtitle: 'Connect all major headings before revision.', points: ['OpenMP uses pragmas and directives.', 'Variables require scope and reduction decisions.', 'Loops need dependency checks and scheduling choices.', 'Producer-consumer, caches and tasks explain real shared-memory behavior.', 'Thread safety and timing close the program.'], visual: <MindMap />, composition: 'pc-comp-quiet' },
  { section: 'Summary', title: 'Exam-writing shortcuts', subtitle: 'Turn concepts into marks.', points: ['For OpenMP, write pragma syntax and explain clauses.', 'For trapezoidal rule, use reduction instead of critical for sum.', 'For variable scope, classify shared/private/firstprivate/lastprivate.', 'For scheduling, compare static, dynamic and guided.', 'For false sharing, draw a cache-line example.'], visual: <ConceptGrid items={[['Definition', 'state the term'], ['Syntax', 'write pragma or function'], ['Diagram', 'show threads and shared memory'], ['Performance note', 'race, overhead or cache effect']]} />, composition: 'pc-comp-quiet' },
  { section: 'Summary', title: '20 important viva questions', subtitle: 'Rapid oral revision.', points: ['What are OpenMP, pragma, parallel directive, parallel for and fork-join model?', 'What are shared variable, private variable, race condition, critical section and atomic?', 'What are reduction, loop-carried dependency, scheduling, static scheduling and dynamic scheduling?', 'What are producer-consumer, cache coherence, false sharing, tasking, taskwait and thread safety?'], visual: <Workstation mode="fork" />, dense: true },
  { section: 'Summary', title: '10 two-mark questions', subtitle: 'Practice short answers.', points: ['Define OpenMP.', 'What is pragma?', 'Define parallel region.', 'What is reduction clause?', 'What is private variable?', 'What is shared variable?', 'Define loop-carried dependency.', 'What is schedule(static)?', 'Define false sharing.', 'What is thread safety?'], visual: <ConceptGrid items={[['2 marks', 'definition + one use'], ['Keywords', 'pragma, thread, shared'], ['Code', 'include syntax when asked'], ['Diagram', 'small memory/thread sketch']]} />, dense: true },
  { section: 'Summary', title: '10 five-mark questions', subtitle: 'Practice medium answers.', points: ['Explain OpenMP pragmas and directives.', 'Explain trapezoidal rule using OpenMP.', 'Explain scope of variables in OpenMP.', 'Explain reduction clause with example.', 'Explain loop-carried dependency.', 'Explain OpenMP scheduling.', 'Explain producer-consumer pattern.', 'Explain cache coherence and false sharing in OpenMP.', 'Explain tasking in OpenMP.', 'Explain thread safety.'], visual: <Workstation mode="safe" />, dense: true },
  { section: 'Summary', title: '10 ten-mark questions and VTU placeholders', subtitle: 'Practice long-answer structure.', points: ['Explain shared-memory programming with OpenMP pragmas and directives.', 'Explain trapezoidal rule in OpenMP with scope and reduction clauses.', 'Explain loop-carried dependency, scheduling and producer-consumer pattern.', 'Explain caches, cache coherence and false sharing in OpenMP programs.', 'Explain tasking, taskwait and thread safety in OpenMP.', 'Previous VTU Q1-Q5 placeholders: fill from past paper.'], visual: <MindMap />, dense: true },
  { section: 'Summary', title: 'One-page revision and keyword sheet', subtitle: 'Close with the must-remember terms.', points: ['OpenMP; shared memory; thread; pragma; directive; parallel; parallel for; sections; single; master.', 'omp_get_thread_num; omp_get_num_threads; omp_set_num_threads; omp_get_wtime; omp_get_max_threads; fork-join.', 'trapezoidal rule; shared; private; firstprivate; lastprivate; default; race condition; critical; atomic; reduction.', 'loop-carried dependency; schedule; static; dynamic; guided; chunk; producer-consumer; cache; cache coherence; false sharing.', 'task; taskwait; task granularity; thread safety.'], visual: <ConceptGrid items={[['Memory path', 'pragmas create teams -> scopes control data -> reductions prevent races'], ['Scheduling path', 'schedules balance loops -> tasks handle irregular work'], ['Safety path', 'synchronization protects shared state'], ['Answer formula', 'definition + syntax + diagram + example + race/performance note']]} />, dense: true },
]

export const parallelComputingModule4Slides = rawSlides.map((item, index) => {
  const content = item.divider ? <DividerView {...item} /> : <SlideView {...item} />
  return slide({
    id: `pc-openmp-${String(index + 1).padStart(2, '0')}`,
    title: item.title,
    subtitle: item.subtitle,
    section: item.section,
    content,
    notes: `Teach with the Weather Simulation on a Multicore Workstation: identify active threads, shared variables, private variables, synchronization points, iteration ownership, race risk and performance cost. ${sourceNote}`,
  })
})
