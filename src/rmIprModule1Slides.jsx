/**
 * BRMK557 Research Methodology & IPR — Module 1: The Research Mindset
 * Covers: Meaning, Objectives, Types, Finding & Solving Problems, Ethics, Misconduct, Authorship
 */
import './rmIpr.css'
import {
  slide,
  Deck,
  Points,
  Lead,
  Definition,
  Example,
  Flow,
  Compare,
  Cards,
  Divider,
  ResourceHub,
  ResearchLifecycle,
  ProblemNarrowing,
  MotivationConstellation,
  ResearchLandscape,
  IntegrityChain,
  MisconductCompare,
  AuthorshipMatrix,
} from './components/RmKit.jsx'

/* ─── helpers ──────────────────────────────────────────────── */

function ResearchObjectivesViz() {
  const types = [
    { label: 'Exploratory', color: '#2563eb', desc: 'Gain new insight into phenomena' },
    { label: 'Descriptive', color: '#0f9d94', desc: 'Accurately portray persons / events' },
    { label: 'Diagnostic', color: '#d97706', desc: 'Determine frequency of occurrence' },
    { label: 'Hypothesis-Testing', color: '#7c5cff', desc: 'Test cause-and-effect hypotheses' },
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Four objectives of research">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {types.map((t, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const x = 38 + col * 232
        const y = 38 + row * 140
        return (
          <g key={t.label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <rect x={x} y={y} width="210" height="116" rx="14" fill={t.color} opacity="0.12" stroke={t.color} strokeWidth="1.5" />
            <circle cx={x + 28} cy={y + 28} r="16" fill={t.color} />
            <text x={x + 28} y={y + 33} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="850">{i + 1}</text>
            <text x={x + 52} y={y + 33} fill="#0f2744" fontSize="14" fontWeight="800">{t.label}</text>
            <text x={x + 14} y={y + 72} fill="#5b6577" fontSize="11" textAnchor="start">{t.desc}</text>
          </g>
        )
      })}
    </svg>
  )
}

function EngineeringResearchViz() {
  const nodes = [
    { x: 80, y: 90, label: 'Solve new\nimportant problems', color: '#2563eb' },
    { x: 260, y: 55, label: 'Develop new\ntheoretical knowledge', color: '#0f9d94' },
    { x: 440, y: 90, label: 'Develop applied\nknowledge', color: '#7c5cff' },
    { x: 260, y: 220, label: 'If goal not achieved\n→ understand WHY\n(also a contribution)', color: '#d97706' },
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 320" role="img" aria-label="Engineering research objectives">
      <rect x="18" y="18" width="484" height="284" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {nodes.map((n, i) => (
        <g key={i} className="rm-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
          <line x1={n.x} y1={n.y} x2="260" y2="148" stroke={n.color} strokeWidth="2.6" opacity="0.5" />
          <circle cx={n.x} cy={n.y} r="42" fill={n.color} opacity="0.15" stroke={n.color} strokeWidth="2.5" />
          {n.label.split('\n').map((ln, li) => (
            <text key={li} x={n.x} y={n.y - 8 + li * 14} textAnchor="middle" fill="#0f2744" fontSize="11.5" fontWeight="800">{ln}</text>
          ))}
        </g>
      ))}
      <circle cx="260" cy="148" r="38" fill="#0f2744" />
      <text x="260" y="144" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="850">Engineering</text>
      <text x="260" y="160" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="850">Research</text>
      <text x="260" y="292" textAnchor="middle" fill="#5b6577" fontSize="13">Conclusion unknown at the start; failure to reach goal is still knowledge.</text>
    </svg>
  )
}

function SolveStepsViz() {
  const steps = [
    ['Understand', 'Restate the problem clearly'],
    ['Visualise', 'Draw / model the system'],
    ['Explore', 'Consider multiple strategies'],
    ['Execute', 'Apply the chosen method'],
    ['Look back', 'Verify & generalise'],
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Problem-solving steps">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {steps.map(([title, sub], i) => {
        const y = 42 + i * 54
        return (
          <g key={title} className="rm-anim-rise" style={{ animationDelay: `${i * 0.09}s` }}>
            <rect x="42" y={y} width="436" height="42" rx="11" fill={i === 4 ? '#eff6ff' : '#fff'} stroke="rgba(37,99,235,.2)" />
            <circle cx="76" cy={y + 21} r="14" fill="#2563eb" />
            <text x="76" y={y + 26} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900">{i + 1}</text>
            <text x="104" y={y + 17} fill="#0f2744" fontSize="14" fontWeight="800">{title}</text>
            <text x="104" y={y + 34} fill="#5b6577" fontSize="11">{sub}</text>
          </g>
        )
      })}
    </svg>
  )
}

function ResearchProcessViz() {
  const steps = [
    'Formulate problem',
    'Review literature',
    'Design study',
    'Collect data',
    'Analyse data',
    'Interpret findings',
    'Report & publish',
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 340" role="img" aria-label="Seven-step research process">
      <rect x="18" y="18" width="484" height="304" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {steps.map((s, i) => {
        const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2
        const r = 110
        const cx = 260 + r * Math.cos(angle)
        const cy = 172 + r * Math.sin(angle)
        const on = i <= 1
        return (
          <g key={s} className="rm-anim-rise" style={{ animationDelay: `${i * 0.09}s` }}>
            {i < steps.length - 1 && (() => {
              const next = (i + 1) / steps.length * 2 * Math.PI - Math.PI / 2
              const nx = 260 + r * Math.cos(next)
              const ny = 172 + r * Math.sin(next)
              return <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#cbd5e1" strokeWidth="2" />
            })()}
            <circle cx={cx} cy={cy} r="26" fill={on ? '#2563eb' : '#e8eef8'} opacity={on ? 1 : 0.85} />
            <text x={cx} y={cy + 5} textAnchor="middle" fill={on ? '#fff' : '#5b6577'} fontSize="13" fontWeight="850">{i + 1}</text>
            <text x={cx} y={cy + 44} textAnchor="middle" fill="#0f2744" fontSize="12" fontWeight="750">{s}</text>
          </g>
        )
      })}
      <circle cx="260" cy="172" r="40" fill="#0f2744" opacity="0.08" />
      <text x="260" y="168" textAnchor="middle" fill="#0f2744" fontSize="13" fontWeight="850">Research</text>
      <text x="260" y="185" textAnchor="middle" fill="#0f2744" fontSize="13" fontWeight="850">Cycle</text>
    </svg>
  )
}

function EthicsHistoryViz() {
  const events = [
    { y: 68, year: '1947', label: 'Nuremberg Code', detail: 'Voluntary consent of subjects mandatory', color: '#dc2626' },
    { y: 138, year: '1964', label: 'Declaration of Helsinki', detail: 'Research ethics framework for medical studies', color: '#d97706' },
    { y: 208, year: 'Ongoing', label: 'British Royal Society', detail: 'Priority via first submission; credit must be given', color: '#2563eb' },
    { y: 278, year: 'Whitbeck', label: 'Authorship Questions', detail: 'Who is included? What is the order of listing?', color: '#0f9d94' },
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 360" role="img" aria-label="Ethics in research history">
      <rect x="18" y="18" width="484" height="324" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      <line x1="80" y1="45" x2="80" y2="315" stroke="#cbd5e1" strokeWidth="3" />
      {events.map((e, i) => (
        <g key={e.year} className="rm-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
          <circle cx="80" cy={e.y} r="10" fill={e.color} />
          <rect x="100" y={e.y - 22} width="390" height="44" rx="10" fill="#fff" stroke="rgba(20,29,46,.08)" />
          <text x="118" y={e.y - 7} fill={e.color} fontSize="11" fontWeight="900">{e.year}</text>
          <text x="185" y={e.y - 7} fill="#0f2744" fontSize="13" fontWeight="800">{e.label}</text>
          <text x="118" y={e.y + 13} fill="#5b6577" fontSize="11">{e.detail}</text>
        </g>
      ))}
    </svg>
  )
}

function PrivacySurveillanceViz() {
  const stages = [
    ['Design\nOutset', 'Choose what data to collect', '#2563eb'],
    ['Data\nDesign', 'Consider alternatives', '#0f9d94'],
    ['Side\nEffects', 'Unintended consequences?', '#d97706'],
    ['Safety\nInherent', 'Inherent safety by design', '#7c5cff'],
  ]
  return (
    <svg className="rm-scene" viewBox="0 0 520 300" role="img" aria-label="Ethics in practice">
      <rect x="18" y="18" width="484" height="264" rx="18" fill="#fffdf9" stroke="rgba(20,29,46,.1)" />
      {stages.map(([label, sub, color], i) => {
        const x = 46 + i * 112
        return (
          <g key={label} className="rm-anim-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <rect x={x} y="44" width="96" height="160" rx="14" fill={color} opacity="0.1" stroke={color} strokeWidth="1.5" />
            <circle cx={x + 48} cy="80" r="24" fill={color} opacity="0.92" />
            <text x={x + 48} y="85" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="850">{i + 1}</text>
            {label.split('\n').map((ln, li) => (
              <text key={li} x={x + 48} y={128 + li * 15} textAnchor="middle" fill="#0f2744" fontSize="12.5" fontWeight="800">{ln}</text>
            ))}
            {sub.split(' ').reduce((acc, word, wi) => {
              const lineIdx = Math.floor(wi / 2)
              acc[lineIdx] = (acc[lineIdx] ? acc[lineIdx] + ' ' : '') + word
              return acc
            }, []).map((ln, li) => (
              <text key={li} x={x + 48} y={176 + li * 13} textAnchor="middle" fill="#5b6577" fontSize="10.5">{ln}</text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

/* ─── slides ────────────────────────────────────────────────── */

export const rmIprModule1Slides = [

  /* ══════════════════════════════════════════════════════════
     SLIDE 1 — Module Title Divider
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-title',
    kicker: 'BRMK557 · Research Methodology & IPR',
    title: 'The Research Mindset',
    content: (
      <Divider
        number="MODULE 1"
        title="The Research Mindset"
        subtitle='"Good research begins with a worthwhile question."'
        visual={<ResearchLifecycle stage={0} />}
      />
    ),
    notes: 'Opening card. Ask students: what does research mean to you? Let a few answers surface before moving forward. Running story begins here — the campus electricity problem will thread through the module.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 2 — Story hook: Campus Electricity Waste
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-story-hook',
    kicker: 'Why we are here',
    title: 'A Classroom Light Left On All Night',
    content: (
      <Deck active={0} visual={<ProblemNarrowing />} tone={1} takeaway="Every piece of engineered research begins as an irritation, a curiosity, or a complaint.">
        <Lead>You walk into the university campus at 7 am. Lights in Lab 204 have been burning all night. Electricity is wasted; the timetable shows rooms unused after 6 pm.</Lead>
        <Definition term="The Spark">
          You feel certain this problem is worth solving — but you do not yet know <em>how</em>. That gap between conviction and method is where research begins.
        </Definition>
        <Example label="Running story">
          This campus scenario will reappear across the module — from asking the right question to conducting our study ethically.
        </Example>
      </Deck>
    ),
    notes: 'Ground the module in a relatable local problem. Do not over-explain — the point is that a real irritation becomes a research question. Return to this story at the problem-formulation and ethics slides.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 3 — Meaning of Research
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-meaning',
    kicker: 'Meaning of Research',
    title: 'What Is Research?',
    content: (
      <Deck density="dense" active={0} visual={<ResearchLifecycle stage={3} />} tone={1} takeaway="Research systematically converts the unknown into evidenced understanding.">
        <Definition term="Research">
          An endeavour to discover answers to questions through the application of the scientific method — a systematic, controlled, empirical and critical investigation of natural phenomena.
        </Definition>
        <Points items={[
          'Systematic effort to gain new knowledge',
          'Systematic collecting, recording and analysing of information to increase understanding of a topic',
          'The scientific method guides collection and interpretation of evidence',
          'Answers must be verifiable, not merely asserted',
        ]} />
      </Deck>
    ),
    notes: 'Three definitions from the PPT converge: (1) endeavour to discover answers, (2) systematic effort for new knowledge, (3) collecting/analysing to increase understanding. All share the word "systematic".',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 4 — Objectives of Research (General)
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-objectives-general',
    kicker: 'Objectives of Research',
    title: 'Four General Objectives',
    content: (
      <Deck active={0} visual={<ResearchObjectivesViz />} tone={1} takeaway="Most research studies pursue one primary objective; the rest are secondary.">
        <Lead>Every study belongs to at least one objective category. Choosing the right category sharpens methodology.</Lead>
        <Cards items={[
          ['Exploratory / Formulative', 'Gain familiarity with a phenomenon; generate hypotheses. Example: surveying campus energy behaviour for the first time.'],
          ['Descriptive', 'Accurately portray characteristics of a situation, person, or group. Example: mapping which labs waste the most electricity.'],
          ['Diagnostic', 'Determine frequency of occurrence or association. Example: measuring how often lights are left on vs occupancy patterns.'],
          ['Hypothesis-Testing', 'Test cause-and-effect relationships between variables. Example: does an occupancy sensor reduce consumption by >30%?'],
        ]} />
      </Deck>
    ),
    notes: 'PPT lists these four under "Objectives of Research". Exploratory = formulative in some references. Give a brief campus-electricity example for each to keep the running story alive.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 5 — Objectives of Engineering Research
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-objectives-engineering',
    kicker: 'Engineering Research',
    title: 'Objectives Specific to Engineering Research',
    content: (
      <Deck active={0} visual={<EngineeringResearchViz />} tone={1} reverse takeaway="In engineering research, not reaching the desired result still adds knowledge — it tells us what does not work and why.">
        <Points items={[
          'Solve new, important problems — conclusions are unknown at the start',
          'Develop new theoretical knowledge applicable beyond the immediate problem',
          'Develop new applied knowledge — practical solutions with transferable value',
          'If the desired result is not achieved, understanding why is also a contribution',
          'Engineering research requires rigour: reproducibility, documented methods, validated outcomes',
        ]} />
        <Example label="Chandrayaan-2, 2019">
          The lander did not achieve a soft landing. Yet ISRO published findings on fuel combustion timing — applied knowledge that will improve future missions. Partial success is not failure.
        </Example>
      </Deck>
    ),
    notes: 'The PPT states "If desired result not achieved, understand why — also a contribution." Chandrayaan-2 is used in the PPT as an example; reinforce it here. Key distinction from general research: conclusion is unknown at start.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 6 — Motivation (overview)
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-motivation-overview',
    kicker: 'Motivation',
    title: 'Why Do Researchers Research?',
    content: (
      <Deck active={0} visual={<MotivationConstellation />} tone={1} takeaway="Motivation shapes the question we ask and the rigour we apply. Know yours.">
        <Lead>Behind every research project is a human motive. Motives are rarely pure — most researchers carry a mix.</Lead>
        <Points items={[
          'Influence of the research community and supervisors',
          'Personal motives: desire to improve the state of the art',
          'Societal motives: contribute to the welfare of the community',
          'Government / funding: employment, sponsored projects',
          'Intellectual curiosity and the joy of discovery',
        ]} />
      </Deck>
    ),
    notes: 'The PPT lists multiple motivation sources. This slide gives the overview; the next slide contrasts intrinsic vs extrinsic in depth.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 7 — Intrinsic vs Extrinsic Motivation
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-motivation-intrinsic-extrinsic',
    kicker: 'Motivation',
    title: 'Intrinsic vs Extrinsic — Does It Matter?',
    content: (
      <Deck density="dense" active={0} visual={<MotivationConstellation />} tone={1} takeaway="Extrinsic rewards can crowd out creativity. The best research usually starts with genuine curiosity.">
        <Compare
          leftTitle="Intrinsic"
          left={[
            'Intellectual interest in the problem',
            'Desire to face a stimulating challenge',
            'Satisfaction from learning and discovery',
            'Commitment to societal improvement',
          ]}
          rightTitle="Extrinsic"
          right={[
            'Money, grants and employment security',
            'Fame, recognition and publication counts',
            'Awards and academic promotions',
            'May narrow focus and block creative paths — PPT notes the patent motive can constrain sharing of knowledge',
          ]}
        />
      </Deck>
    ),
    notes: 'PPT specifically flags that extrinsic motivation (money/fame/awards) may block creativity. The patent example: if the sole motive is a patent, the researcher may avoid publishing partial findings that would benefit others.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 8 — Types of Research (Landscape overview)
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-types-overview',
    kicker: 'Types of Research',
    title: 'The Research Landscape',
    content: (
      <Deck active={0} visual={<ResearchLandscape />} tone={1} takeaway="Every study sits at the intersection of at least two axes. Knowing your type clarifies your method.">
        <Lead>Research is not one thing. It is a landscape of complementary approaches — each asking a different kind of question.</Lead>
        <Flow items={['Descriptive / Analytical', 'Applied / Fundamental', 'Quantitative / Qualitative', 'Conceptual / Empirical']} />
        <Points items={[
          'One-time vs Longitudinal: single snapshot or tracked over time',
          'Experimental: controlled manipulation of variables',
          'Historical: understanding the past to inform the present',
        ]} />
      </Deck>
    ),
    notes: 'This is the landscape view. The next four slides drill into each pair with Question / Method / Contribution. Keep this slide brief and visual.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 9 — Descriptive vs Analytical
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-descriptive-analytical',
    kicker: 'Research Type Pair 1',
    title: 'Descriptive vs Analytical',
    content: (
      <Deck density="dense" active={0} visual={<ResearchLandscape />} tone={1} takeaway="You cannot analyse what you have not first described.">
        <Compare
          leftTitle="Descriptive"
          left={[
            'Question: What exists? What is the current state?',
            'Method: Survey, observation, census, case study',
            'Contribution: An accurate record of fact',
            'Example: Mapping energy consumption per lab per hour on campus',
          ]}
          rightTitle="Analytical"
          right={[
            'Question: Why does it happen? What is the relationship?',
            'Method: Statistical analysis, experiments, hypothesis testing',
            'Contribution: Causal or correlational explanation',
            'Example: Correlating occupancy sensor data with reduction in energy bills',
          ]}
        />
      </Deck>
    ),
    notes: 'Descriptive research is often the necessary first step before analytical work. Students often confuse "describing data" with "analysis" — clarify here.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 10 — Applied vs Fundamental
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-applied-fundamental',
    kicker: 'Research Type Pair 2',
    title: 'Applied vs Fundamental',
    content: (
      <Deck density="dense" active={0} visual={<ResearchLandscape />} tone={1} takeaway="Fundamental research without eventual application is rare; applied research without theoretical grounding rarely lasts.">
        <Compare
          leftTitle="Applied (Action)"
          left={[
            'Question: How do we solve this real-world problem?',
            'Method: Field experiments, prototypes, simulations',
            'Contribution: A usable solution or system',
            'Example: Designing a low-cost occupancy-sensor kit for Indian classrooms',
          ]}
          rightTitle="Fundamental (Basic / Pure)"
          right={[
            'Question: What are the underlying principles?',
            'Method: Controlled experiments, mathematical modelling',
            'Contribution: New generalised theoretical knowledge',
            'Example: Developing a formal model of human occupancy detection accuracy under varying lighting',
          ]}
        />
      </Deck>
    ),
    notes: 'Also called "basic research" vs "applied research". Fundamental research may not have an immediate application but expands the knowledge base that applied research draws upon.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 11 — Quantitative vs Qualitative
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-quantitative-qualitative',
    kicker: 'Research Type Pair 3',
    title: 'Quantitative vs Qualitative',
    content: (
      <Deck density="dense" active={0} visual={<ResearchLandscape />} tone={1} takeaway="Mixed-methods research uses both; the question should drive the choice, not the researcher's comfort zone.">
        <Compare
          leftTitle="Quantitative"
          left={[
            'Question: How much? How many? What is the correlation?',
            'Method: Measurement, statistics, controlled experiments',
            'Contribution: Numerical evidence, generalisable findings',
            'Example: kWh saved per month after sensor installation',
          ]}
          rightTitle="Qualitative"
          right={[
            'Question: Why? What is the lived experience?',
            'Method: Interviews, ethnography, grounded theory',
            'Contribution: Rich contextual meaning and insight',
            'Example: Understanding why faculty do not switch off lights through ethnographic observation',
          ]}
        />
      </Deck>
    ),
    notes: 'Engineering students default to quantitative. Ask them: "when would a survey or interview give better insight than a sensor reading?" — for behaviour change problems, qualitative often wins.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 12 — Conceptual vs Empirical
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-conceptual-empirical',
    kicker: 'Research Type Pair 4',
    title: 'Conceptual vs Empirical',
    content: (
      <Deck density="dense" active={0} visual={<ResearchLandscape />} tone={1} takeaway="Most engineering dissertations include both a conceptual framework and empirical validation.">
        <Compare
          leftTitle="Conceptual"
          left={[
            'Relates to abstract ideas and theories',
            'Develops frameworks and models from existing knowledge',
            'No direct experiment is required',
            'Example: Formulating a theoretical model for smart-building energy optimisation',
          ]}
          rightTitle="Empirical"
          right={[
            'Relies on observation and experience',
            'Results are derived from actual data and experiments',
            'Can verify or refute conceptual models',
            'Example: Testing the occupancy-sensor model in Lab 204 over 30 days',
          ]}
        />
      </Deck>
    ),
    notes: 'The PPT distinguishes: conceptual relies on abstract reasoning; empirical relies on data. Philosophers of science debate which comes first — in engineering, they iterate.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 13 — Other Types (One-time, Longitudinal, Experimental, Historical)
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-other-types',
    kicker: 'Additional Research Approaches',
    title: 'More Ways to Frame a Study',
    content: (
      <Deck active={0} visual={<ResearchLandscape />} tone={1} reverse takeaway="Choosing the right temporal and experimental structure is as important as choosing the right topic.">
        <Cards items={[
          ['One-time Research', 'Data collected once for a single study. Fast but cannot track change. Example: one-week snapshot of campus energy use.'],
          ['Longitudinal Research', 'Data collected over a long period to observe trends. Example: monitoring energy use across three academic years.'],
          ['Experimental Research', 'Variables are controlled and manipulated to test causality. Example: installing sensors in half the labs, leaving rest unchanged.'],
          ['Historical Research', 'Analyses past records and documents to understand the present. Example: reviewing campus electricity bills over the last decade.'],
        ]} />
      </Deck>
    ),
    notes: 'These four appear in the PPT alongside the main pairs. They concern research design and timing rather than the type of knowledge produced.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 14 — What Is a Research Problem?
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-problem-what',
    kicker: 'Finding the Problem',
    title: 'What Is a Research Problem?',
    content: (
      <Deck density="dense" active={1} visual={<ProblemNarrowing />} tone={1} takeaway="A research problem is the gap between what is known and what needs to be known.">
        <Definition term="Research Problem">
          A question that a researcher wants to answer, or a difficulty that needs to be eliminated or solved. It is the gap between the current state of knowledge and a desired state.
        </Definition>
        <Points items={[
          'A problem is not a topic — it is a specific, answerable question',
          '"Energy waste in classrooms" is a topic; "Does occupancy-sensor installation reduce classroom energy use by >30%?" is a problem',
          'A worthwhile problem has practical or theoretical significance',
          'The conviction that a problem is worth solving must come before the literature review',
        ]} />
      </Deck>
    ),
    notes: 'The PPT says: worthwhile problem — spark before literature, conviction the problem is worth it. Students tend to read first and then find a problem; the better order is to feel the problem first.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 15 — How Do We Know We Have a Problem?
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-problem-signals',
    kicker: 'Recognising the Problem',
    title: 'How Do We Know We Have a Research Problem?',
    content: (
      <Deck active={1} visual={<ProblemNarrowing />} tone={1} reverse takeaway="Problems signal themselves through gaps, pain points, contradictions, and unexplained successes.">
        <Lead>Problems rarely announce themselves. Researchers develop sensitivity to certain signals.</Lead>
        <Cards items={[
          ['Complaints & Pain Points', 'Repeated frustration signals an unsolved problem. E.g., campus facility managers complaining about electricity bills.'],
          ['Observation', 'Noticing something unexpected in the environment. E.g., lights on in empty labs every morning.'],
          ['Competitor / Peer Success', 'Someone solved a related problem differently — why? E.g., IIT campus achieved 40% energy reduction.'],
          ['Reading Literature', 'A paper reports results that contradict your experience, or identifies a gap you can fill.'],
          ['Records & Data', 'Historical records reveal trends no one has explained. E.g., bill spikes every October.'],
        ]} />
      </Deck>
    ),
    notes: 'The PPT lists: complaints, observation, competitor success, reading, records as sources of awareness. Connect each to the running campus story.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 16 — Sources of Research Problems
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-problem-sources',
    kicker: 'Sources of Problems',
    title: 'Where Good Research Problems Come From',
    content: (
      <Deck active={1} visual={<ProblemNarrowing />} tone={1} reverse takeaway="Diversify your sources — the best problems often surface at the intersection of reading, experience, and conversation.">
        <Flow items={['Reading', 'Academic Experience', 'Daily Experience', 'Field Work', 'Consultations']} />
        <Points items={[
          'Reading: journals, theses, conference papers — identify gaps explicitly stated by authors',
          'Academic experience: courses, lab work, interactions with supervisors reveal unexplored angles',
          'Daily experience: problems you live with every day are problems someone has not yet solved',
          'Field work: observing real systems uncovers discrepancies between theory and practice',
          'Consultations: discussions with practitioners, domain experts, and fellow researchers',
        ]} />
      </Deck>
    ),
    notes: 'From PPT: sources of research problems. The five sources form the "problem antenna" of a good researcher. Ask students: "where did you last encounter a problem worth studying?"',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 17 — Identification & Selection of a Problem
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-problem-selection',
    kicker: 'Identification & Selection',
    title: 'Narrowing from Broad Topic to Specific Problem',
    content: (
      <Deck active={1} visual={<ProblemNarrowing />} tone={1} reverse takeaway="A well-narrowed problem is half solved.">
        <Lead>Most beginners start too broad. The narrowing process is disciplined and iterative.</Lead>
        <Flow items={['Broad area', 'Observe specific issue', 'Survey existing knowledge', 'Identify research gap', 'State specific question']} />
        <Example label="Campus story">
          Broad: energy sustainability → Specific: classroom lighting control → Gap: no data on automated occupancy detection in Indian campus environments → Question: Can a PIR-based sensor reduce campus classroom energy use by ≥30%?
        </Example>
      </Deck>
    ),
    notes: 'ProblemNarrowing visual shows the funnel from broad to specific. Walk students through the campus example step by step.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 18 — Criteria of a Good Problem
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-problem-criteria',
    kicker: 'Good Problem Criteria',
    title: 'Six Criteria for a Worthwhile Research Problem',
    content: (
      <Deck active={1} visual={<ProblemNarrowing />} tone={1} reverse takeaway="If your problem fails any of these criteria, rework it before investing in the study.">
        <Cards items={[
          ['Clear', 'Unambiguous statement; all key terms are defined. "Reduce energy use" is unclear; "reduce kWh in occupied periods" is clear.'],
          ['Empirical', 'Can be answered with observable, measurable data — not just opinion or philosophical argument.'],
          ['Verifiable', 'Another researcher with the same data and method should reach the same conclusions.'],
          ['Interesting', 'Genuinely novel and relevant to the research community or society.'],
          ['Novel', 'Does not simply replicate a known finding. Literature review confirms the gap is real.'],
          ['Guidance Available', 'Supervisor, domain expert, or literature can support the investigation — you are not starting from zero.'],
        ]} />
      </Deck>
    ),
    notes: 'PPT lists six criteria: clear, empirical, verifiable, interesting, novel, guidance available. Each applies directly to the campus electricity problem used as a running example.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 19 — Formulation of Research Problem
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-problem-formulation',
    kicker: 'Problem Formulation',
    title: 'From Observation to Formally Stated Problem',
    content: (
      <Deck density="dense" active={1} visual={<ProblemNarrowing />} tone={1} takeaway="A problem statement is a contract: it commits the researcher to scope, method, and criterion of success.">
        <Definition term="Problem Formulation">
          The process of converting a vague awareness of a difficulty into a precise, researchable question with defined variables, scope, and criteria for a satisfactory answer.
        </Definition>
        <Points items={[
          'Clearly define all key constructs (e.g., "energy waste", "occupancy", "reduction")',
          'Specify the scope: where, when, and for whom the study applies',
          'State the dependent and independent variables',
          'Confirm the problem is neither too broad (unanswerable) nor too narrow (trivial)',
          'Express as a question or a falsifiable hypothesis',
        ]} />
        <Example label="Formulated problem statement">
          "Does installing passive infrared (PIR) occupancy sensors in university engineering laboratories reduce electricity consumption during unoccupied periods by at least 30%, measured over one academic semester?"
        </Example>
      </Deck>
    ),
    notes: 'Formulation is the bridge between intuition and method. Stress that a well-formulated problem makes the methodology choice almost automatic.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 20 — Establishment of Research Objectives
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-research-objectives',
    kicker: 'Research Objectives',
    title: 'Translating the Problem into Actionable Objectives',
    content: (
      <Deck active={1} visual={<ProblemNarrowing />} tone={1} reverse takeaway="Objectives are the measurable commitments that make your research auditable and completable.">
        <Lead>Once the problem is stated, objectives convert it into specific, measurable tasks. Objectives typically begin with action verbs.</Lead>
        <Points items={[
          '"To discover…" — uncover something previously unknown',
          '"To determine…" — establish facts or relationships through investigation',
          '"To establish…" — build a validated framework, protocol, or standard',
          '"To evaluate…" — assess the effectiveness or efficiency of an approach',
          '"To develop…" — create a new system, algorithm, or method',
        ]} />
        <Example label="Campus study objectives">
          1. To determine the average daily occupied vs unoccupied hours per laboratory. 2. To evaluate the reduction in energy consumption after PIR sensor installation. 3. To establish a cost-benefit model for campus-wide deployment.
        </Example>
      </Deck>
    ),
    notes: 'The PPT provides the verb list: discover, determine, establish. These objectives map directly to the research design and results section of a dissertation.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 21 — The Worthwhile Problem
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-worthwhile-problem',
    kicker: 'The Worthwhile Problem',
    title: 'Why the Conviction Must Come Before the Literature',
    content: (
      <Deck active={1} visual={<ProblemNarrowing />} tone={1} reverse takeaway="Literature review can confirm or sharpen a problem — but it cannot create the spark. That must come from the researcher.">
        <Lead>The PPT makes a subtle but critical point: your conviction that a problem is worth solving should precede your literature search — not the other way around.</Lead>
        <Points items={[
          'If you read first, you risk framing your problem entirely within existing paradigms',
          'A felt problem — something you genuinely believe matters — produces better research questions',
          'Once the spark exists, literature review refines and validates; it does not replace conviction',
          'Hard problems with partial success are still valuable — the attempt advances knowledge',
        ]} />
        <Example label="Chandrayaan-2 (revisited)">
          ISRO engineers were convinced soft landing on the Moon was worth attempting despite prior failures. Partial success (orbiter functional; lander hard-landed) still produced orbital data of scientific value and advanced propulsion knowledge for future missions.
        </Example>
      </Deck>
    ),
    notes: 'The PPT says: "worthwhile problem: spark before literature, conviction problem is worth it". This is often the most memorable advice you can give — and the most counter-intuitive for students trained to search first.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 22 — Hard Problems, Partial Success, Failure
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-hard-problems',
    kicker: 'Hard Problems',
    title: 'Partial Success and Failure Are Also Contributions',
    content: (
      <Deck active={1} visual={<EngineeringResearchViz />} tone={1} takeaway="A negative result, honestly reported, is more valuable than a fabricated positive result.">
        <Lead>Engineering research is not a guaranteed success story. The field advances through published attempts — even failed ones.</Lead>
        <Points items={[
          'Hard problems attract the best researchers precisely because they are unsolved',
          'Partial success narrows the search space for future researchers',
          'A published null result ("X does not work because Y") prevents others from repeating the same path',
          'The PPT explicitly states: if the desired result is not achieved, understanding why is a contribution',
          'Failure that reveals a new constraint is a form of discovery',
        ]} />
        <Example label="Why this matters for student projects">
          If your sensor experiment shows no significant reduction in energy use, publishing the result with an explanation (e.g., sensor placement errors, faculty override behaviour) saves the next researcher from repeating the same study.
        </Example>
      </Deck>
    ),
    notes: 'Chandrayaan-2 is the PPT example. Emphasise that the culture of hiding negative results is the root of the replication crisis in many fields.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 23 — Recommended Steps to Solve a Problem
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-solve-steps',
    kicker: 'Solving the Problem',
    title: 'A Systematic Approach to Research Problem-Solving',
    content: (
      <Deck active={1} visual={<SolveStepsViz />} tone={1} reverse takeaway="The steps are iterative, not linear — researchers move back and forth between them as new evidence emerges.">
        <Lead>Good researchers don't just work harder — they work methodically. These steps apply from a homework problem to a PhD thesis.</Lead>
        <Points items={[
          'Understand & restate: put the problem in your own words; identify hidden assumptions',
          'Visualise: sketch diagrams, models, or data flows to externalise the problem',
          'Explore strategies: brainstorm multiple approaches before committing to one',
          'Execute: apply the chosen strategy rigorously, documenting every step',
          'Look back: verify results against the original problem, seek generalisations',
        ]} />
      </Deck>
    ),
    notes: 'The PPT recommends: understand/restate/visualize, explore strategies, execute, look back. This mirrors Polya\'s problem-solving heuristic — widely taught in mathematics and engineering.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 24 — Research Process Overview (7 Steps)
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-process-overview',
    kicker: 'Research Process',
    title: 'The Seven-Step Research Process (Overview)',
    content: (
      <Deck active={1} visual={<ResearchProcessViz />} tone={1} takeaway="This module covers steps 1 and 3–4. Literature review (step 2) and reporting (steps 6–7) are covered in Module 2.">
        <Lead>Most research follows a broadly circular process. The steps are often iterative — new findings loop back to earlier stages.</Lead>
        <Flow items={[
          '1. Formulate problem',
          '2. Review literature',
          '3. Design study',
          '4. Collect data',
          '5. Analyse',
          '6. Interpret',
          '7. Report',
        ]} />
        <Points items={[
          'Problem formulation (step 1) is the focus of this module',
          'Literature review (step 2) and reporting (step 7) form the core of Module 2',
          'Data collection and analysis (steps 4–5) depend on your research type and methodology',
        ]} />
      </Deck>
    ),
    notes: 'Keep this slide brief — it is a signpost, not a deep dive. Steps 2 and 6-7 belong to Module 2. Marking this clearly prevents over-expansion here.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 25 — Ethics Divider
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-ethics-divider',
    kicker: 'Section 2 of 2',
    title: 'Ethics in Engineering Research',
    content: (
      <Divider
        number="ETHICS IN ENGINEERING RESEARCH"
        title="Doing Research Right"
        subtitle='"The integrity of the process is inseparable from the integrity of the result."'
        visual={<IntegrityChain breakAt={-1} />}
      />
    ),
    notes: 'Transition divider. Pause here — ask students if they can name one famous case of research misconduct before you begin. Tuskegee, Hwang Woo-suk, or Jan Hendrik Schön are good examples to raise if no one responds.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 26 — What Is Research Ethics?
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-ethics-definition',
    kicker: 'Research Ethics',
    title: 'Ethics: Rules That Distinguish Acceptable from Unacceptable',
    content: (
      <Deck density="dense" active={3} visual={<IntegrityChain breakAt={-1} />} tone={1} takeaway="Ethics precedes law. Many laws follow ethical consensus — but ethics guides researchers even before the law catches up.">
        <Definition term="Research Ethics">
          The rules, norms, and principles that distinguish between acceptable and unacceptable behaviour in research. Ethics is not the same as law — but laws often follow ethical consensus.
        </Definition>
        <Points items={[
          'Ethics apply to the conduct of the research, not only to its outcomes',
          'An unethical study can produce accurate data — and still be wrong',
          'Research ethics includes: honesty, objectivity, integrity, openness, and respect for persons',
          '"Responsible Conduct of Research" (RCR) is the operationalisation of ethics into daily practice',
          'RCR covers: data management, peer review, mentoring, conflicts of interest, authorship',
        ]} />
      </Deck>
    ),
    notes: 'The PPT distinguishes "research ethics" from "responsible conduct of research". Ethics is the philosophical framework; RCR is the daily checklist. Both matter.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 27 — Historical Landmarks in Research Ethics
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-ethics-history',
    kicker: 'Ethics Landmarks',
    title: 'Moments That Shaped Research Ethics',
    content: (
      <Deck active={3} visual={<EthicsHistoryViz />} tone={1} takeaway="Research ethics is not abstract philosophy — it was written in response to real, documented harm.">
        <Lead>Modern research ethics did not emerge from philosophical debate. It emerged from specific violations of human dignity.</Lead>
        <Points items={[
          'Nuremberg Code (1947): first international standard for voluntary, informed consent in human experiments — a direct response to Nazi medical experiments',
          'British Royal Society principle: credit and priority go to the researcher who first submits for publication — creating the incentive to publish',
          'Whitbeck authorship questions: who should be included as an author? What is the appropriate order of listing? These questions remain contested in modern research',
          'Declaration of Helsinki (1964): expanded the Nuremberg principles for medical research with human subjects',
        ]} />
      </Deck>
    ),
    notes: 'The PPT specifically cites: Nuremberg Code 1947, British Royal Society credit/priority principle, Whitbeck authorship questions. Use this to show that ethics frameworks have historical origins in real harm.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 28 — Research Ethics vs Responsible Conduct
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-ethics-rcr',
    kicker: 'Two Levels',
    title: 'Research Ethics vs Responsible Conduct of Research',
    content: (
      <Deck density="dense" active={3} visual={<IntegrityChain breakAt={-1} />} tone={1} takeaway="Ethics asks 'is it right?'; RCR asks 'are we doing it right in practice?'">
        <Compare
          leftTitle="Research Ethics"
          left={[
            'Philosophical and normative framework',
            'Defines what is acceptable and unacceptable in principle',
            'Guides decisions when rules are absent',
            'Examples: respect for persons, beneficence, justice',
          ]}
          rightTitle="Responsible Conduct of Research (RCR)"
          right={[
            'Operational norms for daily research practice',
            'Specifies how to handle data, authorship, and peer review',
            'Enforced through institutional and funding body policies',
            'Examples: data management plans, conflict-of-interest disclosure, authorship criteria',
          ]}
        />
      </Deck>
    ),
    notes: 'PPT explicitly distinguishes these two. The relationship is: ethics is the why; RCR is the how. Graduate students especially must know both.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 29 — Ethics in Practice: Privacy, Surveillance, Design Choices
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-ethics-practice',
    kicker: 'Ethics in Practice',
    title: 'Ethical Decisions Are Made Throughout the Research Lifecycle',
    content: (
      <Deck active={3} visual={<PrivacySurveillanceViz />} tone={1} takeaway="The ethical moment is not only before the study — it runs through every design decision, from data collection to publication.">
        <Lead>Ethics are not a checklist filled in before data collection. They are live decisions made at every stage of the study.</Lead>
        <Points items={[
          'Privacy and surveillance data: collecting behavioural data about people raises consent and anonymisation obligations',
          'Choices at the outset: the research design itself can be more or less ethical — e.g., choosing a less invasive measurement method',
          'Alternatives at design stage: could the same question be answered without involving vulnerable populations or sensitive data?',
          'Unintended side effects: a study that works may create new harms — e.g., energy sensors that also track faculty movement',
          'Inherent safety: design research so the process itself cannot harm participants, data subjects, or the environment',
        ]} />
        <Example label="Campus electricity study">
          Installing motion sensors to measure occupancy also creates a surveillance record of faculty location. Anonymising this data and obtaining ethics board approval is not optional — it is the responsible conduct of research.
        </Example>
      </Deck>
    ),
    notes: 'The PPT covers: privacy/surveillance data; choices at outset, design, alternatives; unintended side effects; inherent safety. Use the campus story to show each one.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 30 — Research Misconduct: Overview
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-misconduct-overview',
    kicker: 'Research Misconduct',
    title: 'The Three Core Forms of Misconduct + Others',
    content: (
      <Deck density="dense" active={3} visual={<MisconductCompare />} tone={1} takeaway="Misconduct is not always dramatic fraud. Sloppy data management or not seeking ethical approval are also misconduct.">
        <Lead>Research misconduct refers to intentional violation of the norms of honest research. It undermines the entire evidence base on which science and engineering depend.</Lead>
        <Compare
          leftTitle="The Three Core Forms"
          left={[
            'Fabrication: inventing data or results that were never collected',
            'Falsification: manipulating research materials, equipment, or processes to misrepresent results',
            'Plagiarism: using another person\'s ideas, methods, results, or words without proper attribution',
          ]}
          rightTitle="Other Misconduct"
          right={[
            'Conducting human or animal research without ethical committee approval',
            'Failing to disclose conflicts of interest',
            'Misrepresenting qualifications or roles in publications',
            'Selective data reporting (p-hacking, cherry-picking results)',
            'Retaliation against colleagues who raise misconduct concerns',
          ]}
        />
      </Deck>
    ),
    notes: 'PPT covers: fabrication, falsification, plagiarism, and "other misconduct (e.g. no ethical approval)". The three core forms (FFP) are standard across all institutional research policies worldwide.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 31 — Integrity Chain: Where Misconduct Breaks Trust
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-integrity-chain',
    kicker: 'Integrity Chain',
    title: 'Misconduct Breaks the Evidence Chain at a Specific Link',
    content: (
      <Deck active={3} visual={<IntegrityChain breakAt={1} />} tone={1} takeaway="Trust in published results depends on every link in the chain being honest. One fabricated data point poisons the whole.">
        <Lead>Research produces a chain of evidence from question to publication. Any break destroys the reliability of everything downstream.</Lead>
        <Points items={[
          'Question: the framing must be honest — hiding a negative hypothesis is a form of bias',
          'Data: fabrication or falsification here breaks the chain most visibly',
          'Analysis: selective reporting, p-hacking, or misapplied statistics',
          'Interpretation: overstating significance or burying contradictory findings',
          'Publication: plagiarism, duplicate submission, or misrepresenting authorship',
        ]} />
        <Example label="Why the chain metaphor matters">
          A study that correctly formulates the problem, collects real data, but then falsifies the statistical analysis produces a publication that looks valid. Other researchers build on it. The false foundation corrupts the entire subfield until retraction.
        </Example>
      </Deck>
    ),
    notes: 'Visual shows the chain with the Data link broken (breakAt=1). Walk through each node. Emphasise: misconduct is rarely caught at the moment it occurs — it compounds over time.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 32 — Authorship Ethics: The Whitbeck Questions
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-authorship-ethics',
    kicker: 'Authorship Ethics',
    title: 'Who Gets to Be an Author? The Whitbeck Questions',
    content: (
      <Deck active={3} visual={<AuthorshipMatrix />} tone={1} reverse takeaway="Authorship is not a reward — it is an accountability relationship. Every author is accountable for the paper's claims.">
        <Lead>Credit in research is almost always given through authorship. The Whitbeck framework asks two fundamental questions about author inclusion and order.</Lead>
        <Points items={[
          'Who should be included? — Only those who made a significant intellectual contribution to conception, design, data collection, or interpretation',
          'What is the order of listing? — First author typically led the work; last author is often the senior supervisor; order conventions vary by field',
          'Guest / gift authorship: including someone who did not contribute — unethical and increasingly policed by journals',
          'Career-boost authorship: adding a powerful name to improve acceptance chances — also unethical',
          'Career-preservation authorship: adding a supervisor to avoid institutional conflict — a form of coercion',
        ]} />
      </Deck>
    ),
    notes: 'PPT cites Whitbeck authorship questions: who included; order of listing. The three types of problematic authorship (guest, career-boost, career-preservation) are all explicitly in the PPT. ICMJE criteria are a good extension reference.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 33 — Authorship: Credit, Citation, Accountability
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-authorship-credit',
    kicker: 'Credit & Accountability',
    title: 'Authorship Is Credit, Responsibility, and Consent',
    content: (
      <Deck active={3} visual={<AuthorshipMatrix />} tone={1} reverse takeaway="Every author must be able to defend every part of the paper — not just their own contribution.">
        <Lead>The three mechanisms for giving credit in research are authorship, citation, and acknowledgment. Each has a different level of responsibility attached.</Lead>
        <Cards items={[
          ['Authorship', 'Significant intellectual contribution to conception, design, analysis, or writing. All authors share accountability for the paper.'],
          ['Citation', 'Credit for ideas, data, or methods borrowed from another work. Mandatory for any use of prior work.'],
          ['Acknowledgment', 'Recognition for support, funding, data access, or technical assistance without the level of contribution warranting authorship.'],
          ['Double Submission', 'Submitting the same paper (or substantially the same work) to two journals simultaneously is unethical — it wastes peer reviewers\' time and risks double publication.'],
        ]} />
        <Points items={[
          'All listed authors must consent to submission',
          'Authorship disputes should be resolved before, not after, submission',
        ]} />
      </Deck>
    ),
    notes: 'PPT covers: credit via authorship, citation, acknowledgment; significant contributor only; all authors accountable; consent for submission; double submission unethical. This slide covers all of those.',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 34 — Module 1 Summary
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-summary',
    kicker: 'Module 1 Summary',
    title: 'What We Have Covered: The Research Mindset',
    content: (
      <Deck active={3} visual={<ResearchLifecycle stage={3} />} tone={1} reverse takeaway="A worthwhile question, pursued rigorously and honestly, is the beginning of all knowledge creation.">
        <Lead>From a campus light left on all night, we have travelled through the full conceptual foundation of research methodology and ethics.</Lead>
        <Flow items={['Meaning of Research', 'Four Objectives', 'Types Landscape', 'Finding Problems', 'Formulation', 'Worthwhile Problem', 'Ethics', 'Misconduct', 'Authorship']} />
        <Cards items={[
          ['The Research Mindset', 'Systematic, empirical, ethical — these three words define good research.'],
          ['The Problem Spark', 'Conviction precedes literature. Feel the problem, then interrogate it.'],
          ['Integrity Matters', 'Every link in the evidence chain must be honest for the result to mean anything.'],
          ['Authorship = Accountability', 'Include only those who contributed significantly; all authors share responsibility.'],
        ]} />
      </Deck>
    ),
    notes: 'Closing synthesis slide. Invite students to connect every item back to the campus electricity story used throughout the module. Ask: "how would an unethical researcher approach the same problem?"',
  }),

  /* ══════════════════════════════════════════════════════════
     SLIDE 35 — Resource Hub
  ══════════════════════════════════════════════════════════ */
  slide({
    id: 'rm1-resources',
    kicker: 'Resources',
    title: 'Module 1 Resources',
    content: (
      <Deck active={3} full visual={null} takeaway="Use the practice bank before your exam — it includes viva, 2-mark, 5-mark and 10-mark questions drawn from this module." tone={1}>
        <ResourceHub moduleId="module-1" />
      </Deck>
    ),
    notes: 'Resource finale slide. Links to notes, practice bank, and quick-revision checklist for Module 1.',
  }),
]
