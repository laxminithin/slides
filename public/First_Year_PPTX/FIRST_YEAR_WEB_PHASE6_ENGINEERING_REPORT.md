# FIRST YEAR WEB PHASE 6 ENGINEERING REPORT

## Final PPTX Source Baseline

- Final First Year PPTX source: `First_Year_PPTX/`
- Total First Year subjects: 51
- Total PPTX files rendered/checked: 295
- Total First Year slides: 9963
- Phase 6 final PPTX slides: 2854
- Phase 6 PPTX files: 70
- Render failures in final PPTX baseline: 0

## Phase 6 Scope

Extracted directly from `FIRST_YEAR_WEB_PHASE1_AUDIT.json` Section K, `laterPhases["6"]`. Phase 6 includes only Electrical / Electronics and Mechanical / Civil / related core-engineering theory subjects. Humanities, communication, constitution/environmental theory, and labs/practicals remain Phase 7 and were not started.

| # | Subject | Code | Family | Modules/Units | Final PPTX Files | Final PPTX Slides |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 1 | Basics of Electrical Engineering | 1BBEE105/205 | E - ELECTRICAL / ELECTRONICS | 5 | 5 | 204 |
| 2 | Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 204 |
| 3 | Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 204 |
| 4 | Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 204 |
| 5 | Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 204 |
| 6 | Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 204 |
| 7 | ENGINEERING MECHANICS | 1BCIV105/205 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 206 |
| 8 | Elements of Aeronautics | 1BEAE105/205 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 206 |
| 9 | Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | E - ELECTRICAL / ELECTRONICS | 5 | 5 | 206 |
| 10 | Elements of Mechanical Engineering | 1BEME105/205 | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 200 |
| 11 | BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 202 |
| 12 | Introduction to Electrical Engineering | 1BESC104B/204B | E - ELECTRICAL / ELECTRONICS | 5 | 5 | 202 |
| 13 | Introduction to Electronics and Communication Engineering | 1BESC104C/204C | E - ELECTRICAL / ELECTRONICS | 5 | 5 | 206 |
| 14 | INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | F - MECHANICAL / CIVIL / CORE ENGINEERING | 5 | 5 | 202 |


## Subjects Created

14 Phase 6 subjects were created as separate subject identities and routes under `src/firstYearEngineering/` and registered in `src/data/subjects.jsx`. No Humanities, Communication, Management, Constitution, Environmental theory, or lab/practical Phase 7 subjects were started. Completed Phase 2–5 families were not recreated.

Routes:

- `basics-electrical-engineering-1bbee105-205`
- `computer-aided-engineering-drawing-{cv,ee,ece,me,cs}-1bced{c,e,ec,m,s}103-203`
- `engineering-mechanics-1bciv105-205`
- `elements-of-aeronautics-1beae105-205`
- `fundamentals-electronics-communication-1bece105-205`
- `elements-mechanical-engineering-1beme105-205`
- `building-science-mechanics-1besc104a-204a`
- `introduction-electrical-engineering-1besc104b-204b`
- `introduction-electronics-communication-1besc104c-204c`
- `introduction-mechanical-engineering-1besc104d-204d`

## Modules Created

Modules created: 70 (5 official modules per subject). Shared CAD Modules 1–4 cover projection, solids, sections/development and isometric views; Module 5 is stream-specific (building / electrical drawing / fibre-antenna-PCB / machine parts / network+IoT STL).

## Interactive Slides

Interactive web slides created: 2269. QA rendered 4538 slide instances across 1920×1080 and 1280×720. Depth is PPTX-driven: 12 core interactive scenes per module, plus every finalized PPTX teaching block as a source slide, plus one extra operational-variant scene for ECE diodes (half- vs full-wave) and EME drives (gear vs robot).

## Final PPTX Depth Coverage

| Subject | Code | Module | Final PPTX Slides | Final Web Slides | Compression/Expansion | Depth Coverage |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 1 | 40 | 32 | 0.80 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 3 | 40 | 32 | 0.80 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 4 | 42 | 33 | 0.79 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 5 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 1 | 42 | 33 | 0.79 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 3 | 42 | 33 | 0.79 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 4 | 40 | 32 | 0.80 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 5 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 1 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 2 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 3 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 4 | 40 | 32 | 0.80 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 5 | 40 | 32 | 0.80 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 1 | 42 | 34 | 0.81 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 3 | 40 | 32 | 0.80 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 4 | 42 | 33 | 0.79 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 5 | 42 | 33 | 0.79 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 1 | 40 | 32 | 0.80 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 3 | 40 | 32 | 0.80 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 4 | 40 | 33 | 0.82 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 5 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 1 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 2 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 3 | 42 | 33 | 0.79 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 4 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 5 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 1 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 2 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 3 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 4 | 42 | 33 | 0.79 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 5 | 40 | 32 | 0.80 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 1 | 42 | 33 | 0.79 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 2 | 42 | 33 | 0.79 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 3 | 40 | 32 | 0.80 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 4 | 40 | 32 | 0.80 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 5 | 42 | 33 | 0.79 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 1 | 40 | 32 | 0.80 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 2 | 40 | 32 | 0.80 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 3 | 40 | 32 | 0.80 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 4 | 42 | 33 | 0.79 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 5 | 40 | 32 | 0.80 | PASS |


PPTX depth coverage failures: 0. Every meaningful finalized PPTX teaching block has a web equivalent (core scene and/or `SourceTeachingBlock`). Source teaching blocks represented: 1427.

## Electrical Visuals

Electrical visuals: 30 module-primary/secondary circuit systems across Basics of Electrical Engineering and Introduction to Electrical Engineering.

Students see:

- series-parallel topology with labelled current split
- Ohm / KCL / KVL on an actual node-loop diagram
- capacitor energy storage
- induction, Lenz polarity and force on a conductor
- single-phase R-L with voltage/current phase
- three-phase generation, star/delta line-phase relation
- domestic two-way wiring, fuse/MCB and earthing path
- transformer coupling (primary → flux → secondary)
- DC machine / induction-motor energy conversion
- power-system source → transmission → load

Current direction, polarity, source/load and switch/protection state are labelled. Animation is current-path and state change, not glowing decoration.

## Electronics Visuals

Electronics visuals: 30 module-primary/secondary device/system diagrams across Fundamentals of ECE and Introduction to ECE.

Students see:

- diode forward vs reverse (polarity, conduction/blocking, resulting current)
- half-wave vs full-wave/bridge rectifier (input wave → device state → path → output wave)
- capacitor filter (ripple reduction)
- BJT terminals, Ib/Ic relationship and Q-point/load line
- op-amp inputs, feedback network and closed-loop gain (not a black box)
- oscillator loop (Barkhausen, frequency-setting network)
- AM/FM and ASK/FSK/PSK waveform comparison
- PSU chain (AC → rectify → filter → regulate)
- embedded sensor → MCU → actuator loop
- logic symbols, truth table active row, half/full adder

Unreadable Analog Electronics JPEGs were not used. Essential device visuals were rebuilt as SVG/React schematics.

## Circuit Animations

Circuit animations: 60. Typical sequence: initial state → input applied → current path → component response → voltage/output → steady/final state. Final path remains visible for the lecturer. Reduced motion keeps the labelled final diagram.

## Waveform Visuals

Waveform visuals: 25. Shared foundation waveform/graph primitives show axes, amplitude, period/frequency or phase, and input/output comparison at classroom projection size. Digital modules use truth tables instead of analog sines.

## Mechanical/Civil/Core Engineering Visuals

Mechanical, civil, CAD and aeronautics process/mechanism/structural visuals: 50 module-primary/secondary systems.

Mechanical: four-stroke engine, lathe tool/work motion, belt vs gear transmission, robot DOF, CNC/additive process, material family response, vehicle/EV energy path, pump vs turbine.

Civil / building science: free-body diagrams, beam load → member → support reaction, friction impending-slip, composite centroid, building load path (slab-beam-column-foundation), green-rating material choice.

CAD: orthographic projectors, tilted solids, section plane + true shape + development, isometric axes, stream-specific building / schematic / antenna-PCB / machine-part / network-STL applications.

Aeronautics: aircraft axes and control surfaces, lift/drag pressure field, jet Brayton path, flight force balance, hydraulic/electrical aircraft systems.

## Numericals

Worked numericals: 70 (one full PROBLEM → GIVEN → FIND → DIAGRAM → FORMULA → SUBSTITUTION → CALCULATION → ANSWER → ENGINEERING INTERPRETATION board per module). Units follow the finalized PPTX/syllabus treatment.

## Engineering Process Visuals

Engineering process visuals: 140. Each module includes an operation sequence (initial → acting → final state) and a process/comparison animator for construction, operation, limitation or application.

## Major Teaching Animations

Major teaching animations: 1121. Motion teaches: current path, switch/device state, waveform development, mechanism/input-output motion, force/load transfer, projection construction, truth-table active row, and process stage. Decorative bounce/spin/particle motion is not used. `prefers-reduced-motion` collapses motion to a still, labelled final state.

## Unreadable Asset Handling

Phase 5 isolated two Analog Electronics WhatsApp JPEGs with macOS EPERM read/copy failures in `tmp/phase5-unreadable-assets/`:

- `WhatsApp Image 2026-08-21 at 12.04.21.jpeg`
- `WhatsApp Image 2026-08-21 at 12.04.37.jpeg`

Phase 6 did not move them back and does not import them. Diode, rectifier, transistor, filter, op-amp and PSU teaching diagrams were recreated as editable SVG/CSS/React shapes from syllabus/PPTX content. Production build has no new asset-copy errors.

## Engineering Correctness QA

Engineering correctness failures: 0. Circuit topology, polarity, current direction, waveform meaning, formulas, numerical substitution/units, device labels, force direction and structural labels were checked against the module source treatment. Animations do not reverse current or invent physics absent from the PPTX/syllabus.

## 1920 QA

Rendered 1920×1080 Phase 6 slide checks: 2269. Failures: 0.

## 1280 QA

Rendered 1280×720 Phase 6 slide checks: 2269. Failures: 0.

## Animation QA

Animation failures: 0. Reduced-motion checks: 28 (Module 1 slide 4 of every Phase 6 subject at both resolutions); failures: 0.

## Storytelling QA

Storytelling failures: 0. Modules follow operating-system hero, process sequence, formula with conditions, device/terminals, worked numerical, waveform or truth table, comparison, process, application, common mistake, concept map, PPTX source blocks, then recap.

## Repetition QA

Repetition failures: 0. Sequences alternate full-canvas circuit/mechanism, process steps, equation board, numerical board, waveform/truth table, comparison, application, misconception callout, concept map and grouped PPTX source blocks. Electrical, electronics, mechanical, civil, CAD and aero decks use distinct palettes and diagrams.

## Regression QA

Regression routes checked: 16 (8 routes × 2 viewports). Regression failures: 0. Checked Applied Chemistry, Phase 3 Mathematics, Phase 4 Quantum Physics, Phase 5 Introduction to AI, Phase 2 Foundation, Big Data Analytics, Database Management Systems, and Analog Electronics (5th semester) routes.

## Build Status

Production build: PASS. The existing Vite large-chunk warning remains non-fatal. No Analog Electronics JPEG / EPERM copy errors occurred.

## Source Inconsistencies

- Phase 1 audit `totalSlides` values are pre-depth-pass counts. Phase 6 used `First_Year_PPTX/` and `FIRST_YEAR_PPTX_DEPTH_FINALIZATION_REPORT.json` (9,963 slides) as the teaching-depth authority.
- Two Analog Electronics WhatsApp JPEGs remain isolated in `tmp/phase5-unreadable-assets/` after Phase 5 macOS EPERM failures; they are recorded, not restored.
- CAD five streams share Modules 1–4 teaching language by syllabus design; Module 5 is deliberately stream-specific rather than duplicated generic CAD.

## Phase 7 Readiness

`phase7Ready = true`

Phase 7 was **not started**. Remaining First Year work is Humanities, Communication, Constitution / Environmental theory assigned to Phase 7, and labs/practicals (Basic Electrical Lab, ECE Lab, Mechanical Lab, Mechanics and Materials Lab, C Programming Lab, Kannada, Soft Skills, Innovation & Design Thinking Lab, Interdisciplinary Project Work).

## Module Delta Table

| Subject | Code | Module | Final PPTX Slides | Final Web Slides | Compression/Expansion | Depth Coverage |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 1 | 40 | 32 | 0.80 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 3 | 40 | 32 | 0.80 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 4 | 42 | 33 | 0.79 | PASS |
| Basics of Electrical Engineering | 1BBEE105/205 | Module 5 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 1 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 2 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 3 | 40 | 32 | 0.80 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 4 | 42 | 33 | 0.79 | PASS |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | Module 5 | 40 | 32 | 0.80 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 1 | 42 | 33 | 0.79 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 3 | 42 | 33 | 0.79 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 4 | 40 | 32 | 0.80 | PASS |
| ENGINEERING MECHANICS | 1BCIV105/205 | Module 5 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 1 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 2 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 3 | 42 | 33 | 0.79 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 4 | 40 | 32 | 0.80 | PASS |
| Elements of Aeronautics | 1BEAE105/205 | Module 5 | 40 | 32 | 0.80 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 1 | 42 | 34 | 0.81 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 3 | 40 | 32 | 0.80 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 4 | 42 | 33 | 0.79 | PASS |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | Module 5 | 42 | 33 | 0.79 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 1 | 40 | 32 | 0.80 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 2 | 40 | 32 | 0.80 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 3 | 40 | 32 | 0.80 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 4 | 40 | 33 | 0.82 | PASS |
| Elements of Mechanical Engineering | 1BEME105/205 | Module 5 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 1 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 2 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 3 | 42 | 33 | 0.79 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 4 | 40 | 32 | 0.80 | PASS |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | Module 5 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 1 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 2 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 3 | 40 | 32 | 0.80 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 4 | 42 | 33 | 0.79 | PASS |
| Introduction to Electrical Engineering | 1BESC104B/204B | Module 5 | 40 | 32 | 0.80 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 1 | 42 | 33 | 0.79 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 2 | 42 | 33 | 0.79 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 3 | 40 | 32 | 0.80 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 4 | 40 | 32 | 0.80 | PASS |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | Module 5 | 42 | 33 | 0.79 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 1 | 40 | 32 | 0.80 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 2 | 40 | 32 | 0.80 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 3 | 40 | 32 | 0.80 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 4 | 42 | 33 | 0.79 | PASS |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | Module 5 | 40 | 32 | 0.80 | PASS |


## Final Subject Table

| Subject | Code | Modules | Web Slides | Circuit/Process Visuals | Numericals | Major Animations | 1920 QA | 1280 QA | Content |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| Basics of Electrical Engineering | 1BBEE105/205 | 5 | 162 | 15 | 5 | 80 | PASS | PASS | COMPLETE |
| Computer Aided Engineering Drawing for CV Stream | 1BCEDC103/203 | 5 | 162 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| Computer Aided Engineering Drawing for EE Stream | 1BCEDE103/203 | 5 | 162 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| Computer Aided Engineering Drawing for ECE Stream | 1BCEDEC103/203 | 5 | 162 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| Computer Aided Engineering Drawing for ME Stream | 1BCEDM103/203 | 5 | 162 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| Computer Aided Engineering Drawing for CS Stream | 1BCEDS103/203 | 5 | 162 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| ENGINEERING MECHANICS | 1BCIV105/205 | 5 | 163 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| Elements of Aeronautics | 1BEAE105/205 | 5 | 163 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| Fundamentals of Electronics and Communication Engineering | 1BECE105/205 | 5 | 164 | 15 | 5 | 81 | PASS | PASS | COMPLETE |
| Elements of Mechanical Engineering | 1BEME105/205 | 5 | 161 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| BUILDING SCIENCE AND MECHANICS | 1BESC104A/204A | 5 | 161 | 10 | 5 | 80 | PASS | PASS | COMPLETE |
| Introduction to Electrical Engineering | 1BESC104B/204B | 5 | 161 | 15 | 5 | 80 | PASS | PASS | COMPLETE |
| Introduction to Electronics and Communication Engineering | 1BESC104C/204C | 5 | 163 | 15 | 5 | 80 | PASS | PASS | COMPLETE |
| INTRODUCTION TO MECHANICAL ENGINEERING | 1BESC104D/204D | 5 | 161 | 10 | 5 | 80 | PASS | PASS | COMPLETE |

