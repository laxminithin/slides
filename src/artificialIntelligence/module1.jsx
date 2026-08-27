import { Callout, Definition, Flow, Lead, Points, ResourceHub, Stage, aiSlide, Formula } from './AiKit.jsx'
import {
  AgentArchitecture,
  AgentEnvironmentLoop,
  FourApproachesGrid,
  LogicInferenceFlow,
  PeasOrbit,
  TuringTestScene,
  VacuumWorld,
} from './AiScenes.jsx'
import {
  ApplicationsField,
  ContrastPair,
  DiscreteContinuousScene,
  EnvironmentAxisPair,
  FoundationsConstellation,
  GrainStack,
  HorizonScene,
  IntelligenceCore,
  LearningCutaway,
  MultiagentScene,
  NextStateFork,
  RationalActionViz,
} from './AiUniverse.jsx'
import { Module1Opening, ModuleEnding, ModulePicture } from './AiOpenings.jsx'

const S = ['AI', 'Approaches', 'Art', 'Agent', 'Rational', 'PEAS', 'World', 'Structure']
const k = (t) => `MODULE 1 · ${t}`
function s(cfg, body) {
  return aiSlide({ ...cfg, content: body })
}

export const aiModule1Slides = [
  s({ id: 'm1-open', kicker: k('INTELLIGENT AGENTS'), title: 'Perceive. Decide. Act.', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'agent-loop', object: 'loop', action: 'watch-reason', film: { chapterOpener: true, hero: true }, notes: 'Cinematic open for BCS515B Module 1.' },
    <Stage composition="hero-open" visual={<Module1Opening />} takeaway="You are about to watch an intelligent system reason." />),

  s({ id: 'm1-def', kicker: k('WHAT IS AI?'), title: 'Not just understanding minds — building them', composition: 'inspect', camera: 'close-up', family: 'core-glow', object: 'core', action: 'define', notes: 'Russell & Norvig: AI attempts not just to understand but also to build intelligent entities.' },
    <Stage composition="inspect" visual={<div className="ai-scene" style={{ display: 'grid', placeItems: 'center' }}><IntelligenceCore stage={1} label="exploratory reasoning core" /></div>} takeaway="AI is a universal field: any intellectual task is in scope." exam="Define AI — 2 marks: understand + build intelligent entities.">
      <Definition term="Artificial intelligence">
        A branch of computer science that attempts not just to understand intelligence but to build entities that perceive, reason, learn and act.
      </Definition>
    </Stage>),

  s({ id: 'm1-grid', kicker: k('FIGURE 1.1'), title: 'Eight definitions, four cells', composition: 'board', camera: 'side-by-side', family: 'compare-split', object: 'four-cells', action: 'contrast', notes: 'Human vs rational × thinking vs acting.' },
    <Stage composition="board" visual={<FourApproachesGrid highlight="rational" />} takeaway="This course follows acting rationally — the rational-agent approach.">
      <Lead>Top row: thought. Bottom row: behaviour. Left: like humans. Right: like an ideal — rationality.</Lead>
      <Points items={['Human-centered work is partly empirical science', 'The rationalist path is mathematics + engineering']} />
    </Stage>),

  s({ id: 'm1-turing', kicker: k('ACTING HUMANLY'), title: 'The Turing Test is an operational definition', composition: 'full-stage', camera: 'follow-percept', family: 'turing-dialog', object: 'interrogator', action: 'test', notes: 'Turing 1950. Written questions. Cannot tell person from computer.' },
    <Stage composition="full-stage" visual={<TuringTestScene />} takeaway="If the interrogator cannot tell, the computer has passed." exam="Name the four capabilities needed to pass the (written) Turing Test.">
      <Lead>Alan Turing (1950) avoided physical disguise. Intelligence is judged from conversation alone.</Lead>
    </Stage>),

  s({ id: 'm1-skills', kicker: k('TURING TEST'), title: 'Four skills — plus two for the total test', composition: 'pipeline', camera: 'dive-tree', family: 'perceive-act', object: 'skills', action: 'sequence', story: S, beat: 1 },
    <Stage composition="pipeline" story={S} beat={1} visual={<AgentArchitecture kind="goal" />} exam="NLP, KR, automated reasoning, machine learning. Total test: computer vision + robotics.">
      <Flow items={['NLP', 'Knowledge representation', 'Automated reasoning', 'Machine learning']} />
      <Points items={['Total Turing Test adds video + physical objects “through the hatch”', 'Then the machine also needs computer vision and robotics']} />
    </Stage>),

  s({ id: 'm1-cognitive', kicker: k('THINKING HUMANLY'), title: 'Cognitive modelling compares traces, not just answers', composition: 'timeline', camera: 'inspect-kb', family: 'cognitive-trace', object: 'gps', action: 'compare-trace', notes: 'GPS: Newell & Simon. Introspection, psychology, brain imaging.' },
    <Stage composition="timeline" visual={<LogicInferenceFlow premises={['Observe a human solving a puzzle', 'Write a program whose trace matches']} conclusion="Evidence that the same mechanisms may operate" />} takeaway="Matching input–output is not enough; the reasoning steps must match.">
      <Points items={['Introspection, psychological experiments, brain imaging', 'GPS (Newell & Simon, 1961) compared reasoning traces', 'Cognitive science joins AI models with psychology']} />
    </Stage>),

  s({ id: 'm1-laws', kicker: k('THINKING RATIONALLY'), title: 'Aristotle’s syllogism is a pattern that cannot fail', composition: 'cause-effect', camera: 'inspect-kb', family: 'logic-fire', object: 'syllogism', action: 'infer', story: S, beat: 1 },
    <Stage composition="cause-effect" story={S} beat={1} visual={<LogicInferenceFlow />} takeaway="Logic is “right thinking.” Two obstacles: informal knowledge, and in-principle vs in-practice." exam="State the two obstacles of the logicist tradition.">
      <Lead>Given true premises, the conclusion must be true. That is the laws-of-thought approach.</Lead>
      <Callout kind="warn" label="Obstacles">It is hard to formalise uncertain knowledge. Solving a problem “in principle” is not solving it in time.</Callout>
    </Stage>),

  s({ id: 'm1-rational', kicker: k('ACTING RATIONALLY'), title: 'A rational agent does the right thing', composition: 'split-right', camera: 'zoom-agent', family: 'agent-loop', object: 'rational', action: 'choose', story: S, beat: 4 },
    <Stage composition="split-right" story={S} beat={4} visual={<AgentEnvironmentLoop phase="think" />} takeaway="Correct inference is one way to be rational — not the only way." exam="A rational agent acts to achieve the best outcome, or the best expected outcome under uncertainty.">
      <Definition term="Agent">Something that acts: autonomously, with percepts, over time, adapting, pursuing goals.</Definition>
      <Points items={['More general than “laws of thought”', 'Mathematically well defined — easier to do science on']} />
    </Stage>),

  s({ id: 'm1-found', kicker: k('FOUNDATIONS'), title: 'AI sits on eight older disciplines', composition: 'radial', camera: 'wide-world', family: 'constellation', object: 'disciplines', action: 'map-foundations', notes: 'AIMA 1.2: philosophy, mathematics, economics, neuroscience, psychology, computer engineering, control theory, linguistics.' },
    <Stage composition="radial" visual={<FoundationsConstellation />} takeaway="Multiple foundations explain why AI is interdisciplinary — not a single trick.">
      <Points items={['Philosophy — knowledge, mind, action', 'Mathematics — logic, computation, probability', 'Economics — decisions, utilities, games', 'Neuroscience, psychology, computing, control, linguistics']} />
    </Stage>),

  s({ id: 'm1-art', kicker: k('STATE OF THE ART'), title: 'What can AI do today? A sample, not magic', composition: 'layered', camera: 'overhead-map', family: 'applications-field', object: 'applications', action: 'showcase', story: S, beat: 2, notes: 'STANLEY, BOSS, Deep Blue, DART, Roomba, speech, MAPGEN, spam, translation.' },
    <Stage composition="layered" story={S} beat={2} visual={<ApplicationsField />}>
      <Lead>Robotic vehicles, speech, spacecraft planning, chess, spam filters, logistics, translation — science, not fiction.</Lead>
      <Points items={['NASA Remote Agent / MAPGEN / MEXAR2', 'DART logistics in 1991 paid back decades of AI funding', 'Learning beats static rules when the adversary adapts (spam)']} />
    </Stage>),

  s({ id: 'm1-agent', kicker: k('AGENTS'), title: 'Sensors in. Actuators out. The loop is the agent', composition: 'split-left', camera: 'follow-percept', family: 'agent-loop', object: 'sensors', action: 'perceive', story: S, beat: 3 },
    <Stage composition="split-left" story={S} beat={3} visual={<AgentEnvironmentLoop />} takeaway="Percept sequence: the entire history of what has been seen. Action can depend on all of it." exam="Draw Figure 2.1: environment ↔ sensors → agent → actuators.">
      <Points items={['Human: eyes, ears / hands, voice', 'Robot: cameras, IR / motors', 'Software: keystrokes, packets / files, packets']} />
    </Stage>),

  s({ id: 'm1-vacuum', kicker: k('VACUUM WORLD'), title: 'Two squares. Dirt. A very small world we can finish', composition: 'microscope', camera: 'inspect-board', family: 'vacuum-clean', object: 'squares', action: 'act', notes: 'Squares A and B. Percept: location + dirt. Actions: Left, Right, Suck, NoOp.' },
    <Stage composition="microscope" visual={<VacuumWorld />} takeaway="If dirty, suck; otherwise move. That table is an agent function." exam="Tabulate a vacuum agent function. 8 possible world states for 2 squares.">
      <Lead>The geography is tiny so every percept–action pair can be written down.</Lead>
    </Stage>),

  s({ id: 'm1-fn', kicker: k('AGENT FUNCTION'), title: 'The function is mathematics. The program is code', composition: 'inspect', camera: 'zoom-agent', family: 'formula-reveal', object: 'agent-fn', action: 'distinguish' },
    <Stage composition="inspect" visual={<AgentArchitecture kind="reflex" />} exam="Agent function: percept sequence → action. Agent program: current percept → action, running on an architecture.">
      <Definition term="Agent function">An abstract map from every possible percept sequence to an action.</Definition>
      <Callout kind="idea" label="Program vs function">The program sees only the current percept. If history matters, the program must remember.</Callout>
    </Stage>),

  s({ id: 'm1-perf', kicker: k('RATIONALITY'), title: 'Ask for a clean floor, not for “lots of sucking”', composition: 'pipeline', camera: 'follow-percept', family: 'perceive-act', object: 'measure', action: 'maximize', story: S, beat: 4, notes: 'Dumping dirt then recleaning maximises the wrong measure.' },
    <Stage composition="pipeline" story={S} beat={4} visual={<VacuumWorld loc="A" dirtA={false} dirtB action="Right" />} takeaway="Design the performance measure from what you want in the world, not from how you guess the agent should behave.">
      <Points items={['A bad measure: dirt collected in one shift — invites cheat-cleaning', 'A better one: one point per clean square per time step', 'Penalty for electricity and noise if those matter']} />
    </Stage>),

  s({ id: 'm1-four', kicker: k('RATIONALITY'), title: 'Four things decide what is rational now', composition: 'orbit', camera: 'pull-formula', family: 'rational-merge', object: 'four-factors', action: 'define-rational' },
    <Stage composition="orbit" visual={<RationalActionViz />} exam="For each percept sequence, select the action expected to maximise the performance measure, given evidence and built-in knowledge.">
      <Lead>That sentence is the definition of a rational agent. Write it in full in the exam.</Lead>
    </Stage>),

  s({ id: 'm1-omni', kicker: k('RATIONAL ≠ PERFECT'), title: 'Omniscience is impossible. Exploration is rational', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'omniscience', action: 'contrast' },
    <Stage composition="before-after" visual={<ContrastPair leftTitle="Omniscient" left="Knows actual outcomes. Does not exist." rightTitle="Rational" right="Maximises expected performance. Gathers information." />} takeaway="Autonomy: learn from percepts rather than relying only on the designer’s prior knowledge.">
      <Points items={['Information gathering (exploration) is part of rationality', 'A vacuum that learns where dirt will appear outperforms a fixed table']} />
    </Stage>),

  s({ id: 'm1-peas', kicker: k('PEAS'), title: 'The taxi is specified as four circles around one agent', composition: 'radial', camera: 'zoom-agent', family: 'peas-orbit', object: 'taxi', action: 'specify', story: S, beat: 5, notes: 'Figure 2.4 automated taxi.' },
    <Stage composition="radial" story={S} beat={5} visual={<PeasOrbit />} takeaway="PEAS turns a vague job into an engineering spec." exam="Write PEAS for an automated taxi — performance, environment, actuators, sensors.">
      <Lead>Performance: destination, fuel, time, law, safety, comfort, profit. Environment: roads, traffic, weather, passengers.</Lead>
    </Stage>),

  s({ id: 'm1-peas-more', kicker: k('PEAS'), title: 'Same template, other agents', composition: 'map', camera: 'overhead-map', family: 'peas-orbit', object: 'other-agents', action: 'classify', notes: 'Figure 2.5 additional agent types.' },
    <Stage composition="map" visual={<PeasOrbit agent="Medical" />} exam="Be ready to write PEAS for a medical diagnosis system, a part-picking robot, or a satellite image analyser.">
      <Points items={['Medical diagnosis: healthy patient, hospital, display, symptoms + tests', 'Part-picking robot: % correct parts, conveyor, arm, camera', 'Interactive tutor: student’s score, classroom, display, keyboard']} />
    </Stage>),

  s({ id: 'm1-obs', kicker: k('ENVIRONMENTS'), title: 'Fully observable means sensors see what matters', composition: 'full-stage', camera: 'wide-world', family: 'axis-pair', object: 'observable', action: 'contrast', story: S, beat: 6 },
    <Stage composition="full-stage" story={S} beat={6} visual={<EnvironmentAxisPair left="Fully" right="Partial" question="Can sensors see the whole relevant state?" />} takeaway="A local dirt sensor makes vacuum world partially observable. No sensors at all: unobservable.">
      <Lead>Chess with a visible board is fully observable. Taxi driving is not — you cannot see other drivers’ minds.</Lead>
    </Stage>),

  s({ id: 'm1-multi', kicker: k('ENVIRONMENTS'), title: 'Is the other car an agent — or weather?', composition: 'split-right', camera: 'wide-world', family: 'compare-split', object: 'multiagent', action: 'decide-entity' },
    <Stage composition="split-right" visual={<MultiagentScene />} exam="Chess is competitive multiagent. Taxi driving is partly cooperative (avoid collision) and partly competitive (one parking space).">
      <Points items={['Crossword: single-agent', 'B is an agent if B maximises a score that depends on A']} />
    </Stage>),

  s({ id: 'm1-det', kicker: k('ENVIRONMENTS'), title: 'Deterministic, stochastic, nondeterministic', composition: 'timeline', camera: 'follow-percept', family: 'state-expand', object: 'next-state', action: 'predict' },
    <Stage composition="timeline" visual={<NextStateFork />} takeaway="Taxi driving is stochastic. Vacuum as defined is deterministic; variants can add noise.">
      <Points items={['Deterministic: next state fixed by state + action', 'Stochastic: uncertainty quantified with probabilities', 'Nondeterministic: possible outcomes, no probabilities — succeed for all']} />
    </Stage>),

  s({ id: 'm1-seq', kicker: k('ENVIRONMENTS'), title: 'Episodic tasks do not think ahead. Sequential ones must', composition: 'cause-effect', camera: 'travel-plan', family: 'horizon-scene', object: 'horizon', action: 'look-ahead', story: S, beat: 6 },
    <Stage composition="cause-effect" story={S} beat={6} visual={<HorizonScene />}>
      <Points items={['Classification is typically episodic: percept, then one action, then forget', 'Chess and taxi driving are sequential: a short-term move has long-term cost', 'Static / dynamic / semidynamic: crossword vs taxi vs chess-with-clock']} />
    </Stage>),

  s({ id: 'm1-disc', kicker: k('ENVIRONMENTS'), title: 'Discrete chess. Continuous taxi. Known is not observable', composition: 'inspect', camera: 'inspect-board', family: 'compare-split', object: 'known', action: 'separate-axes' },
    <Stage composition="inspect" visual={<DiscreteContinuousScene />} exam="Known ≠ fully observable. Solitaire: known rules, hidden cards. New video game: full screen, unknown buttons.">
      <Lead>Discrete vs continuous applies to states, time, percepts and actions. Taxi speed is continuous; a camera is discrete samples of a continuous world.</Lead>
    </Stage>),

  s({ id: 'm1-reflex', kicker: k('STRUCTURE'), title: 'Simple reflex: ignore history, fire a rule', composition: 'split-right', camera: 'zoom-agent', family: 'perceive-act', object: 'reflex', action: 'fire-rule', story: S, beat: 7, notes: 'Condition-action: if car-in-front-braking then initiate-braking.' },
    <Stage composition="split-right" story={S} beat={7} visual={<AgentArchitecture kind="reflex" />} takeaway="Works only if the current percept is enough — fully observable. Otherwise: infinite loops." exam="Write the vacuum reflex rule. Explain why a dirt-only sensor loops.">
      <Definition term="Condition–action rule">if condition then action. INTERPRET-INPUT then RULE-MATCH.</Definition>
    </Stage>),

  s({ id: 'm1-random', kicker: k('STRUCTURE'), title: 'A coin flip can save a reflex agent', composition: 'microscope', camera: 'inspect-board', family: 'vacuum-clean', object: 'coin', action: 'randomize' },
    <Stage composition="microscope" visual={<VacuumWorld loc="A" dirtA={false} dirtB action="random Left/Right" />} takeaway="Randomised reflex can outperform deterministic reflex in partially observable rooms.">
      <Lead>Without a location sensor, [Clean] cannot tell A from B. Random Left/Right reaches the other square in two steps on average.</Lead>
    </Stage>),

  s({ id: 'm1-model', kicker: k('STRUCTURE'), title: 'Model-based reflex keeps an internal state', composition: 'stack', camera: 'inspect-loop', family: 'model-update', object: 'internal-state', action: 'remember' },
    <Stage composition="stack" visual={<AgentArchitecture kind="model" />} exam="Two kinds of knowledge: how the world evolves; how my actions change the world. That pair is the model.">
      <Lead>Partial observability is handled by remembering what you cannot see now. UPDATE-STATE is the interesting function.</Lead>
    </Stage>),

  s({ id: 'm1-goal', kicker: k('STRUCTURE'), title: 'Goals turn a junction into a search problem', composition: 'pipeline', camera: 'travel-plan', family: 'goal-seek', object: 'destination', action: 'search', notes: 'Search and planning find action sequences that achieve goals.' },
    <Stage composition="pipeline" visual={<AgentArchitecture kind="goal" />} takeaway="Goal-based agents are more flexible: change the destination, not a hundred rules.">
      <Points items={['At a junction, left / right / straight depends on where you are going', 'Search and planning are the subfields that find the sequence', 'Rain updates brake knowledge — relevant behaviours change automatically']} />
    </Stage>),

  s({ id: 'm1-util', kicker: k('STRUCTURE'), title: 'Utility ranks “happy” instead of a binary goal', composition: 'inspect', camera: 'pull-formula', family: 'formula-reveal', object: 'utility', action: 'rank' },
    <Stage composition="inspect" visual={<AgentArchitecture kind="utility" />} exam="Goals are happy/unhappy. Utility is a comparison of world states — quicker, safer, cheaper.">
      <Lead>Many paths reach the destination. A utility-based agent picks the one that maximises expected utility.</Lead>
    </Stage>),

  s({ id: 'm1-learn', kicker: k('STRUCTURE'), title: 'A learning agent has four boxes', composition: 'layered', camera: 'inside-system', family: 'learning-cutaway', object: 'learning', action: 'improve', notes: 'Performance, critic, learning element, problem generator.' },
    <Stage composition="layered" visual={<LearningCutaway />} exam="Name the four components of a learning agent.">
      <Flow items={['Performance element', 'Critic', 'Learning element', 'Problem generator']} />
      <Points items={['Critic: how well am I doing, using the performance measure', 'Problem generator: suggests exploratory actions that improve future percepts']} />
    </Stage>),

  s({ id: 'm1-repr', kicker: k('REPRESENTATION'), title: 'Atomic, factored, structured — three grains of state', composition: 'tree', camera: 'dive-tree', family: 'state-expand', object: 'representations', action: 'layer' },
    <Stage composition="tree" visual={<GrainStack />} takeaway="Search chapters use atomic states. Planning uses factored. FOL uses structured.">
      <Points items={['Atomic: a black-box name, In(Arad)', 'Factored: a vector of attributes — used in planning', 'Structured: objects and relations — first-order logic']} />
    </Stage>),

  s({ id: 'm1-picture', kicker: k('ONE PICTURE'), title: 'Module 1 in one picture', composition: 'full-stage', camera: 'wide-world', family: 'agent-loop', object: 'summary', action: 'recap' },
    <Stage composition="full-stage" visual={<ModulePicture n={1} />} takeaway="World → sensors → agent → actuators, judged by a performance measure." />),

  s({ id: 'm1-confuse', kicker: k('CONFUSIONS'), title: 'Phrases that lose marks if swapped', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'traps', action: 'warn' },
    <Stage composition="before-after" visual={<ContrastPair leftTitle="Rational" left="Best expected performance from evidence." rightTitle="Omniscient / perfect" right="Knows actual outcomes. Not available in nature." />}>
      <Points items={['Agent function ≠ agent program', 'Known environment ≠ fully observable', 'Utility is not a synonym for “goal”']} />
    </Stage>),

  s({ id: 'm1-formulas', kicker: k('FORMULAS'), title: 'The sentences you must be able to write', composition: 'terminal', camera: 'pull-formula', family: 'formula-reveal', object: 'exam-lines', action: 'memorize' },
    <Stage composition="terminal" visual={<Formula>rational(e) = argmax_a  E[ π | e, K ]</Formula>} exam="Also: Agent = architecture + program. PEAS. Condition–action rule.">
      <Points items={['Percept sequence → action  (function)', 'Current percept + memory → action  (program)', 'Performance, Environment, Actuators, Sensors']} />
    </Stage>),

  s({ id: 'm1-end', kicker: k('CLOSE'), title: 'The machine has a standard of right action', composition: 'board', camera: 'wide-world', family: 'agent-loop', object: 'ending', action: 'close-story' },
    <Stage composition="board" visual={<ModuleEnding n={1} />} />),

  s({ id: 'm1-resources', kicker: k('RESOURCES'), title: 'Notes, questions, quick revision', composition: 'dashboard', camera: 'overhead-map', family: 'compare-split', object: 'hub', action: 'study' },
    <Stage composition="dashboard" visual={<ResourceHub moduleId="module-1" />} takeaway="Redraw the agent loop. Write PEAS for the taxi. List environment properties." />),
]
