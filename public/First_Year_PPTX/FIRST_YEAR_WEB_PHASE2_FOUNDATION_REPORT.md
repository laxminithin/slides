# FIRST YEAR WEB PHASE 2 FOUNDATION REPORT

## Existing infrastructure reused

| Component | Path | How reused |
|---|---|---|
| PresentationEngine / TeachingControls / FilmContinuity | src/cinematic/* | Kept the existing slide/runtime architecture; the foundation is a hidden route and standalone component package. |
| CSS/SVG animation stack | existing subject CSS + SVG scene patterns | Used CSS keyframes, SVG draw/path motion and reduced-motion fallbacks instead of adding Framer/GSAP/Three. |
| Typography and density guardrails | src/presentationTypography.js; src/slideContentDensity.js; src/slideOverflowAudit.js | Foundation tokens follow projector-safe title/body/label sizes and are validated with Playwright. |
| ChemKit, AelicScenes, JavaLivingViz, Diagrams patterns | src/chemistry; src/analogElectronics; src/components | Used the same local React/SVG component style and subject-identity model. |

## New components created

| Component | Path | Purpose |
|---|---|---|
| First Year Foundation package | src/firstYearFoundation/index.jsx | Reusable equation, numerical, graph, geometry, code, loop, array, terminal, circuit, waveform, process, timeline, comparison, concept-map, apparatus and experiment primitives. |
| First Year Foundation stylesheet | src/firstYearFoundation/foundation.css | Classroom readability tokens, safe layouts, screen utilization guardrails, motion primitives, reduced-motion states and responsive 16:9 rules. |
| Development-only foundation playground | src/firstYearFoundation/Playground.jsx | Hidden QA harness at #/__first-year-foundation with seven representative teaching scenes. |
| Foundation QA script | scripts/first-year-foundation-qa.mjs | Playwright QA for 1920x1080, 1280x720, reduced motion, visual occupancy, overflow, animation presence and existing-route smoke checks. |

## Existing components improved

| Component | Path | Change |
|---|---|---|
| App route table | src/main.jsx | Added hidden route /__first-year-foundation; no academic subject registry, subject navigation or existing course module was changed. |

## Components intentionally NOT created

- No complete CAD system: only point/vector/axes/angle/projection primitives were added.
- No SPICE/circuit simulator: circuit primitives show teaching behavior, not electrical simulation.
- No symbolic algebra engine or external math renderer: EquationStepper supports classroom-scale transformed text; deeper rendering can be considered after Phase 3 content pressure is known.
- No new animation framework: Phase 1 found CSS/SVG/react runtime sufficient.
- No mass-generated First Year subjects and no recreation of Applied Chemistry for Smart Systems.

## Engine -> subject-family mapping

| Engine | Families | Representative subjects / justification | Component surface |
|---|---|---|---|
| EquationStepper / DerivationAnimator | A, B, C, E | 8 Phase 1 subject(s): Differential Calculus and Linear Algebra (1BMATC101); Differential Calculus and Numerical Methods (1BMATC201); Differential Calculus & Linear Algebra (1BMATE101); Calculus, Laplace Transforms and Numerical Techniques (1BMATE201); Differential Calculus and Linear Algebra (1BMATM101); Multivariable Calculus and Numerical Methods (1BMATM201)... | EquationStepper |
| NumericalSolver | A, B, C, E, F | 8 Phase 1 subject(s): Differential Calculus and Linear Algebra (1BMATC101); Differential Calculus and Numerical Methods (1BMATC201); Differential Calculus & Linear Algebra (1BMATE101); Calculus, Laplace Transforms and Numerical Techniques (1BMATE201); Differential Calculus and Linear Algebra (1BMATM101); Multivariable Calculus and Numerical Methods (1BMATM201)... | NumericalBoard |
| GraphAnimator | A, B, F | 8 Phase 1 subject(s): Differential Calculus and Linear Algebra (1BMATC101); Differential Calculus and Numerical Methods (1BMATC201); Differential Calculus & Linear Algebra (1BMATE101); Calculus, Laplace Transforms and Numerical Techniques (1BMATE201); Differential Calculus and Linear Algebra (1BMATM101); Multivariable Calculus and Numerical Methods (1BMATM201)... | GraphAnimator |
| GeometryVisualizer / CAD primitives | A, F | 5 Phase 1 subject(s): Computer Aided Engineering Drawing for CV Stream (1BCEDC103/203); Computer Aided Engineering Drawing for EE Stream (1BCEDE103/203); Computer Aided Engineering Drawing for ECE Stream (1BCEDEC103/203); Computer Aided Engineering Drawing for ME Stream (1BCEDM103/203); Computer Aided Engineering Drawing for CS Stream (1BCEDS103/203) | GeometryVisualizer |
| CodeExecutionVisualizer / MemoryVisualizer basics | D, H | 5 Phase 1 subject(s): Introduction to AI and Applications (1BAIA103/203); Programming in C (1BEIT105/205); ESSENTIALS OF INFORMATION TECHNOLOGY (1BESC104E); PYTHON PROGRAMMING (1BPLC105B/205B); INTRODUCTION TO C PROGRAMMING (1BPLC205E/105E) | CodeExecutionVisualizer, LoopVisualizer, ArrayVisualizer, TerminalPanel |
| CircuitVisualizer / WaveformAnimator | E, H | 4 Phase 1 subject(s): Basics of Electrical Engineering (1BBEE105/205); Fundamentals of Electronics and Communication Engineering (1BECE105/205); Introduction to Electrical Engineering (1BESC104B/204B); Introduction to Electronics and Communication Engineering (1BESC104C/204C) | CircuitVisualizer, WaveformAnimator |
| ProcessAnimator / Timeline / Comparison / ConceptMap | B, C, F, G | 26 Phase 1 subject(s): Computer Aided Engineering Drawing for CV Stream (1BCEDC103/203); Computer Aided Engineering Drawing for EE Stream (1BCEDE103/203); Computer Aided Engineering Drawing for ECE Stream (1BCEDEC103/203); Computer Aided Engineering Drawing for ME Stream (1BCEDM103/203); Computer Aided Engineering Drawing for CS Stream (1BCEDS103/203); Applied Chemistry for Sustainable Structures and Material Design (1BCHEC102/202)... | ProcessAnimator, TimelineEngine, ComparisonVisualizer, ConceptMap |
| ExperimentVisualizer | H | 7 Phase 1 subject(s): Basic Electrical Lab (1BBEEL107); Fundamentals of Electronics and Communication Engineering Lab (1BECEL107); Elements of Mechanical Engineering Lab (1BEMEL105); Innovation & Design Thinking Lab (1BIDTL158); MECHANICS AND MATERIALS LABORATORY (1BMEML107/207); C Programming Lab (1BPOPL107/207)... | ExperimentVisualizer, ApparatusLayout |

## Test harness scenes

Hidden development route: `/#/__first-year-foundation?scene=1..7`. It is not registered as an academic subject and does not appear in subject navigation.

| Scene | Name | Representative content | Engines |
|---|---|---|---|
| 1 | Equation progression | Derivative of x^2 with substitution, expansion, cancellation and result. | EquationStepper, TeachingCallout |
| 2 | Numerical solution | Ohm law GIVEN/FIND/FORMULA/SUBSTITUTION/CALCULATION/ANSWER/INTERPRETATION board. | NumericalBoard |
| 3 | Graph and geometry | Parabola/line graph plus vector/projection primitives. | GraphAnimator, GeometryVisualizer |
| 4 | Code execution | C loop sum dry-run with line execution, state panel, loop iterations, array traversal and terminal output. | CodeExecutionVisualizer, LoopVisualizer, ArrayVisualizer, TerminalPanel |
| 5 | Circuit and waveform | Resistor circuit current path plus sine/square waveform comparison. | CircuitVisualizer, WaveformAnimator |
| 6 | Process, comparison and concept map | Soil decision cycle, design timeline, communication comparison and ethics concept map. | ProcessAnimator, TimelineEngine, ComparisonVisualizer, ConceptMap |
| 7 | Experiment shell | Ohm law lab with apparatus, aim, setup, procedure, observation, output, result and viva. | ApparatusLayout, ExperimentVisualizer |

## 1920x1080 QA

- Scenes checked: 7
- Passed: true
- Visual body-share range: 39.3% - 91.1%

## 1280x720 QA

- Scenes checked: 7
- Passed: true
- Visual body-share range: 40.3% - 92.5%

## Animation QA

- Animated scenes checked: 14
- Animation pass: true
- Reduced-motion scenes checked: 14
- Reduced-motion pass: true
- Animated element range: 4 - 19
- Motion uses CSS/SVG appear, draw, pulse, path-travel and progressive construction. Initial/final states remain meaningful under reduced motion.

## Performance observations

- No requestAnimationFrame loops or timers were introduced in the foundation components.
- Animations are CSS/SVG declarative and reset naturally on route/scene remount.
- QA screenshots were captured with animations disabled after live timing checks.
- Production build completed; Vite still reports the pre-existing large bundle warning.

## Existing-subject regression check

| Route | Viewport | OK | Title |
|---|---|---|---|
| /#/chemistry/module-1?slide=1 | 1920x1080 | true |  |
| /#/big-data-analytics/module-1?slide=1 | 1920x1080 | true |  |
| /#/database-management-systems/module-1?slide=1 | 1920x1080 | true |  |
| /#/chemistry/module-1?slide=1 | 1280x720 | true |  |
| /#/big-data-analytics/module-1?slide=1 | 1280x720 | true |  |
| /#/database-management-systems/module-1?slide=1 | 1280x720 | true |  |

## Phase 3 readiness

phase3Ready: true

Phase 3 can begin with Mathematics using `EquationStepper`, `NumericalBoard`, `GraphAnimator`, and geometry primitives. Applied Chemistry for Smart Systems remains complete and was not recreated.

## Final validation

- Phase 1 audit was used as the basis for engine selection.
- No complete First Year subject was recreated.
- No missing subject was mass-generated.
- No `First_Year_PPTX/` content was edited.
- Reusable components are justified by Phase 1 subject counts.
- No new animation framework or unnecessary package was installed.
- Test scenes render correctly at 1920x1080.
- Test scenes render correctly at 1280x720.
- Important animations are classroom-visible and purposeful.
- Animations reset predictably through route/remount behavior.
- No timers/requestAnimationFrame loops were introduced in foundation components.
- Representative existing presentations still load.
- Production build passes.
