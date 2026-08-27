import React from 'react'
import {
  ComparisonVisualizer,
  ConceptMap,
  EquationStepper,
  FoundationSlide,
  GraphAnimator,
  NumericalBoard,
  ProcessAnimator,
  TeachingCallout,
  WaveformAnimator,
} from '../firstYearFoundation'
import { firstYearDepthModules } from '../firstYearDepthContent'
import { makeSourceTeachingSlides } from '../firstYearSourceSlides'
import { scienceSubjectModules } from './moduleMap'
import './science.css'

const PPTX_ROOT = 'First_Year_PPTX'
const SYLLABUS_ROOT = 'public/syllabus/1st Year Syllabus'

const scienceModules = {
  electrochemGreen: {
    title: 'Energy Systems and Green Fuels',
    domain: 'chemistry',
    topics: ['Electrode potential', 'Nernst equation', 'Concentration cells', 'Batteries and fuel cells', 'Green hydrogen'],
    phenomenon: 'A chemical potential difference drives electrons through an external path while ions move inside the cell.',
    principle: 'Cell voltage depends on reaction tendency, concentration and transport path.',
    equationSteps: [
      ['cell reaction', 'oxidation at anode + reduction at cathode', 'Separate the half reactions so electron flow has a direction.'],
      ['potential', 'E_cell = E_cathode - E_anode', 'The useful voltage is the difference between electrode potentials.'],
      ['Nernst link', 'E = E0 - (0.0591/n) log Q', 'Concentration changes shift the observed potential.'],
      ['interpretation', 'larger driving force => stronger electron flow', 'The equation is tied to a real current path.'],
    ],
    example: ['Find cell emf trend when ion concentration at cathode decreases.', ['E0 known', 'n fixed', 'Q increases'], 'Direction of potential change', 'E = E0 - (0.0591/n) log Q', 'Q increases, so log Q increases', 'Subtracted term grows; E decreases', 'Cell voltage decreases', 'Chemistry, concentration and electrical output are linked.'],
    visual: 'cell',
    process: ['Anode reaction', 'Electron path', 'Ion migration', 'Cathode reaction', 'Useful output'],
    application: 'Green fuels and electrochemical energy devices convert chemical change into usable electrical work.',
    misconception: 'Electron flow in the wire and ion movement in the electrolyte are different paths; do not draw electrons through the electrolyte.',
    slides: 11,
  },
  structuralPolymers: {
    title: 'Materials for Structural Integrity',
    domain: 'chemistry',
    topics: ['Polymerization', 'Engineering polymers', 'Molecular weight', 'Properties', 'Structural applications'],
    phenomenon: 'Small monomer units join into long chains whose arrangement controls strength, flexibility and durability.',
    principle: 'Structure controls property: chain length, bonding and packing change material behaviour.',
    equationSteps: [
      ['monomer', 'n M -> (-M-)_n', 'Polymerization repeats one building unit many times.'],
      ['number average', 'M_n = total mass / number of molecules', 'Number average weights every molecule equally.'],
      ['weight average', 'M_w = sum N_i M_i^2 / sum N_i M_i', 'Weight average emphasizes heavier chains.'],
      ['property', 'higher chain interaction => higher mechanical integrity', 'Molecular scale explains macroscopic strength.'],
    ],
    example: ['Compute number-average molecular weight from two chain groups.', ['N1=2, M1=1000', 'N2=1, M2=4000'], 'M_n', 'M_n = sum N_i M_i / sum N_i', '(2*1000 + 1*4000)/(2+1)', 'M_n = 2000', '2000 g/mol', 'A few long chains can strongly affect averages.'],
    visual: 'polymer',
    process: ['Monomer', 'Initiation', 'Chain growth', 'Network/packing', 'Material property'],
    application: 'Structural polymers and composites are chosen by connecting chain architecture to load and environment.',
    misconception: 'Polymer strength is not decided by chemical name alone; chain length and bonding matter.',
    slides: 10,
  },
  cementWaterCorrosion: {
    title: 'Construction Materials, Water Chemistry and Corrosion',
    domain: 'chemistry',
    topics: ['Cement composition', 'Manufacturing process', 'Water hardness/treatment', 'Corrosion mechanism', 'Surface protection'],
    phenomenon: 'Materials interact with water, oxygen, ions and environment; engineering durability depends on controlling those interactions.',
    principle: 'Chemical composition and exposure path decide degradation or protection.',
    equationSteps: [
      ['corrosion cell', 'metal + environment -> anodic and cathodic sites', 'Corrosion behaves like many tiny electrochemical cells.'],
      ['anode', 'M -> M^(n+) + ne-', 'Metal atoms leave the surface at anodic regions.'],
      ['cathode', 'O2 + 2H2O + 4e- -> 4OH-', 'Electrons are consumed at cathodic regions.'],
      ['control', 'barrier / inhibitor / cathodic protection', 'Protection breaks one required path.'],
    ],
    example: ['Estimate hardness contribution from CaCO3 equivalent.', ['sample equivalent = 120 mg/L as CaCO3'], 'classification and treatment need', 'hardness is expressed as CaCO3 equivalent', '120 mg/L lies in the hard-water range for treatment discussion', 'softening step is selected', 'Treat before scale-forming applications', 'Water chemistry becomes an engineering maintenance decision.'],
    visual: 'corrosion',
    process: ['Exposure', 'Anodic site', 'Cathodic site', 'Ion/electron paths', 'Rust/damage', 'Protection'],
    application: 'Cement, water treatment and corrosion control protect sustainable structures over service life.',
    misconception: 'Rust is not merely a surface stain; it is electrochemical material loss.',
    slides: 12,
  },
  electronicsMaterials: {
    title: 'Materials for Energy Devices and Future Electronics',
    domain: 'chemistry',
    topics: ['Semiconductors', 'Nanomaterials', 'Quantum dots', 'Flexible electronics', 'Electrochemical sensors'],
    phenomenon: 'Electronic materials work because structure and scale change charge movement, light response and sensing behaviour.',
    principle: 'Band structure, particle size and interface chemistry control device function.',
    equationSteps: [
      ['semiconductor', 'conductivity = n q mu', 'Carrier number and mobility decide conductivity.'],
      ['nano scale', 'surface area / volume increases as size decreases', 'Small particles expose more active surface.'],
      ['sensor', 'signal proportional to interaction at electrode/surface', 'The device converts interaction into measurable output.'],
      ['device link', 'material property -> signal/function', 'The material is selected for the response it produces.'],
    ],
    example: ['Compare n-type and p-type carrier behaviour.', ['n-type has electrons as majority carriers', 'p-type has holes as majority carriers'], 'majority carrier and device role', 'conductivity depends on carrier concentration and mobility', 'more majority carriers increase conduction path', 'n-type electron flow / p-type hole conduction', 'Carrier type changes device behaviour', 'Doping is a function-design tool.'],
    visual: 'bands',
    process: ['Material choice', 'Doping/scale change', 'Carrier response', 'Signal/device output', 'Application'],
    application: 'Sensors, displays, quantum-dot devices and flexible electronics translate material response into useful signals.',
    misconception: 'A nanomaterial is not useful only because it is small; useful properties must be tied to scale or structure.',
    slides: 11,
  },
  sustainableFuels: {
    title: 'Sustainable Fuels and Energy Materials',
    domain: 'chemistry',
    topics: ['Calorific value', 'Bomb calorimeter', 'Fuel cells', 'Nanomaterial synthesis', 'Energy applications'],
    phenomenon: 'Fuel value is measured by heat release while advanced materials improve conversion, storage or catalytic action.',
    principle: 'Energy output must be measured, compared and linked to environmental consequence.',
    equationSteps: [
      ['heat released', 'Q = W * Delta T', 'Calorimeter temperature rise indicates heat energy.'],
      ['calorific value', 'CV = heat released / mass of fuel', 'Normalize heat by fuel mass.'],
      ['corrections', 'gross value -> corrected value', 'Experimental corrections make the result meaningful.'],
      ['interpretation', 'higher CV is useful only with sustainability context', 'Energy and environmental impact are both engineering criteria.'],
    ],
    example: ['A 0.8 g fuel sample raises calorimeter water equivalent by 2.4 C for W=2000 cal/C.', ['m=0.8 g', 'W=2000 cal/C', 'Delta T=2.4 C'], 'calorific value', 'CV = W Delta T / m', 'CV = 2000*2.4/0.8', 'CV = 6000 cal/g', '6000 cal/g before correction', 'Numerical result must be read with experiment conditions.'],
    visual: 'calorimeter',
    process: ['Fuel sample', 'Ignition', 'Heat transfer', 'Temperature rise', 'Calculation', 'Fuel comparison'],
    application: 'Sustainable fuel selection balances calorific value, emissions, availability and conversion method.',
    misconception: 'A high calorific value alone does not make a fuel sustainable.',
    slides: 10,
  },
  biotechnologyBasics: {
    title: 'Biology, Biotechnology and Biomimetics',
    domain: 'bio',
    topics: ['Prokaryotic and eukaryotic cells', 'Central dogma', 'Biotechnology branches', 'Bioethanol process', 'Biomimetics and AI in biology'],
    phenomenon: 'Living systems store information, convert it into function and inspire engineered processes.',
    principle: 'Biotechnology maps biological structure and process into useful products, tools and designs.',
    equationSteps: [
      ['information flow', 'DNA -> RNA -> protein', 'Central dogma explains how stored information becomes function.'],
      ['bioprocess', 'substrate + microbe + controlled conditions -> product', 'Bioprocesses require both biology and engineering control.'],
      ['biomimetic route', 'biological strategy -> engineering abstraction -> design', 'Nature inspires design through function, not copying appearance.'],
      ['AI support', 'data -> model -> prediction -> experiment', 'AI accelerates discovery but still needs biological validation.'],
    ],
    example: ['Trace bioethanol production from agri-waste.', ['agri-waste substrate', 'pretreatment', 'fermentation organism'], 'process sequence and product', 'cellulose/starch source -> sugars -> ethanol', 'prepare substrate, ferment sugars, recover product', 'ethanol is obtained as a bio-based fuel/product', 'Bioethanol process route', 'Sustainability comes from feedstock and process design.'],
    visual: 'bio',
    process: ['Cell structure', 'DNA/RNA/protein', 'Bioprocess', 'Product', 'Bio-inspired design'],
    application: 'Medical, agricultural, industrial and environmental biotechnology use biological mechanisms for engineering goals.',
    misconception: 'Biomimetics is not decoration inspired by nature; it transfers a working principle.',
    slides: 12,
  },
  chemicalEngineering: {
    title: 'Chemical Engineering Systems and Plant Operations',
    domain: 'process',
    topics: ['Role of chemical engineer', 'Batch and continuous processing', 'Ideal gas law', 'Fluid flow', 'Dimensional analysis', 'Safety'],
    phenomenon: 'Chemical engineering converts raw material into product through controlled transport, reaction, separation and safety systems.',
    principle: 'A plant is a connected process: inputs, unit operations, measurements, control and safe output.',
    equationSteps: [
      ['ideal gas model', 'PV = nRT', 'Relate pressure, volume, moles and temperature.'],
      ['fluid response', 'shear stress related to velocity gradient', 'Flow behaviour depends on fluid type.'],
      ['dimensionless thinking', 'physical variables -> dimensionless groups', 'Scaling uses relationships rather than raw size alone.'],
      ['safety layer', 'hazard -> control -> emergency response', 'Engineering design includes prevention and mitigation.'],
    ],
    example: ['Use ideal gas law to interpret pressure change at fixed n and V.', ['n and V fixed', 'temperature increases'], 'pressure trend', 'PV=nRT', 'P proportional to T', 'temperature increase raises pressure', 'Pressure increases', 'Plant vessels need pressure monitoring and safety margins.'],
    visual: 'plant',
    process: ['Raw feed', 'Reactor/unit operation', 'Separation', 'Control loop', 'Product', 'Safety barrier'],
    application: 'Modern chemical plants use batch/continuous choices, transport laws and safety systems to scale chemistry responsibly.',
    misconception: 'A chemical plant is not only a reactor; flow, heat, separation, control and safety are equally central.',
    slides: 11,
  },
  quantumPhysics: {
    title: 'Quantum Physics and Electronic Sensors',
    domain: 'physics',
    topics: ['de Broglie hypothesis', 'Uncertainty principle', 'Schrodinger wave equation', 'Metals and semiconductors', 'Superconductivity', 'Photonics', 'Sensors'],
    phenomenon: 'At small scales matter has wave character, energy becomes quantized and devices exploit electron/material response.',
    principle: 'Quantum models explain observations that classical physics cannot, then connect to sensors and photonic devices.',
    equationSteps: [
      ['matter wave', 'lambda = h / p', 'Momentum determines de Broglie wavelength.'],
      ['uncertainty', 'Delta x Delta p >= hbar / 2', 'Sharper position knowledge increases momentum uncertainty.'],
      ['energy transition', 'Delta E = h nu', 'Photon interaction corresponds to energy difference.'],
      ['device output', 'interaction -> material response -> sensor signal', 'Quantum/material behaviour becomes measurement.'],
    ],
    example: ['Find de Broglie wavelength trend when momentum doubles.', ['lambda=h/p', 'new momentum=2p'], 'new wavelength', 'lambda_new = h/(2p)', 'lambda_new = lambda/2', 'wavelength halves', 'Half the original wavelength', 'Higher momentum means shorter matter wave.'],
    visual: 'quantum',
    process: ['Particle model fails', 'Matter wave appears', 'Energy transition', 'Material response', 'Sensor reading'],
    application: 'Electronic sensors, photonics, semiconductors and quantum devices depend on measurable microscopic behaviour.',
    misconception: 'Quantum visuals are models of probability/energy behaviour, not tiny planets orbiting like classical objects.',
    slides: 12,
  },
  electricalMaterials: {
    title: 'Electrical Engineering Materials',
    domain: 'physics',
    topics: ['Dielectric materials', 'Magnetic materials', 'Thermoelectric effects', 'Metals and semiconductors', 'Superconductivity'],
    phenomenon: 'Materials respond to electric, magnetic and thermal inputs through polarization, magnetization, carrier movement and phase change.',
    principle: 'Electrical material choice depends on response mechanism and operating conditions.',
    equationSteps: [
      ['polarization', 'P relates dipole moment per unit volume', 'Dielectric response begins with charge displacement.'],
      ['thermoelectric', 'emf generated by temperature difference', 'Temperature gradient can drive electrical output.'],
      ['conductivity', 'sigma = n q mu', 'Charge carriers and mobility set conduction.'],
      ['superconducting state', 'R -> 0 below critical temperature', 'Material state changes drastically at the transition.'],
    ],
    example: ['Predict conductivity trend when carrier concentration increases.', ['sigma=nqmu', 'q and mu fixed', 'n increases'], 'conductivity trend', 'sigma proportional to n', 'doubling n doubles sigma', 'conductivity increases', 'Higher carrier density improves conduction when mobility is unchanged.', 'Carrier control is material engineering.'],
    visual: 'materials',
    process: ['External field/temperature', 'Material response', 'Carrier or domain behaviour', 'Measured property', 'Application'],
    application: 'Dielectrics, magnetic materials, thermoelectrics, semiconductors and superconductors are selected by response.',
    misconception: 'All conductive materials are not equivalent; mechanism and temperature range matter.',
    slides: 10,
  },
  sustainableStructuresPhysics: {
    title: 'Physics for Sustainable Structural Systems',
    domain: 'physics',
    topics: ['SHM', 'Wave propagation', 'Acoustics', 'Radiometry and photometry', 'Non-destructive testing', 'Smart materials'],
    phenomenon: 'Structures vibrate, transmit waves, interact with sound/light and can be inspected without damage.',
    principle: 'Sustainable structural systems need measurement, diagnosis and response-aware materials.',
    equationSteps: [
      ['SHM model', 'd2x/dt2 + omega^2 x = 0', 'Restoring acceleration creates oscillation.'],
      ['spring frequency', 'omega = sqrt(k/m)', 'Stiffness and mass set natural frequency.'],
      ['wave idea', 'v = f lambda', 'Frequency and wavelength combine into propagation speed.'],
      ['inspection path', 'input wave -> interaction -> received signal', 'NDT reads internal condition indirectly.'],
    ],
    example: ['Compare natural frequency when stiffness increases.', ['omega=sqrt(k/m)', 'mass fixed', 'k increases'], 'frequency trend', 'omega proportional to sqrt(k)', 'larger k produces larger omega', 'natural frequency increases', 'Stiffer structures vibrate faster for the same mass.', 'Design must avoid harmful resonance.'],
    visual: 'wave',
    process: ['Excitation', 'Oscillation/wave', 'Boundary interaction', 'Measurement', 'Structural decision'],
    application: 'Vibration control, acoustics, photometry, NDT and smart materials support durable structures.',
    misconception: 'A small vibration animation must still represent amplitude, direction and restoring action meaningfully.',
    slides: 11,
  },
  physicsMaterials: {
    title: 'Physics of Materials',
    domain: 'physics',
    topics: ['Oscillations', 'Elasticity', 'Stress-strain curve', 'Thermoelectric devices', 'Cryogenics', 'Material characterization'],
    phenomenon: 'Materials deform, store energy, conduct heat/electricity and change behaviour at low temperatures.',
    principle: 'Material behaviour is measured by curves, coefficients, transitions and response under load or temperature.',
    equationSteps: [
      ['stress', 'stress = force / area', 'Load is normalized by area.'],
      ['strain', 'strain = change in length / original length', 'Deformation is measured relatively.'],
      ['Hooke region', 'stress = E strain', 'Slope of elastic region is Young modulus.'],
      ['device link', 'property curve -> material selection', 'Graphs guide engineering choice.'],
    ],
    example: ['Find stress for 500 N load on area 25 mm^2.', ['F=500 N', 'A=25 mm^2 = 25e-6 m^2'], 'stress', 'stress=F/A', '500/(25e-6)', '20,000,000 Pa', '20 MPa', 'Unit conversion controls the physical answer.'],
    visual: 'stress',
    process: ['Applied load', 'Elastic response', 'Plastic change or recovery', 'Property graph', 'Material decision'],
    application: 'Mechanical, thermal and electrical material properties guide component design and testing.',
    misconception: 'Stress-strain slope is not the same in elastic and plastic regions.',
    slides: 11,
  },
  quantumApplications: {
    title: 'Quantum Physics and Applications',
    domain: 'physics',
    topics: ['Quantum mechanics', 'Metals and semiconductors', 'Superconductivity', 'Photonics', 'Quantum computing'],
    phenomenon: 'Quantum principles explain matter waves, energy transitions, conduction limits and emerging computation models.',
    principle: 'Microscopic probability and energy models become macroscopic technologies.',
    equationSteps: [
      ['matter wave', 'lambda = h/p', 'Matter displays wave behaviour at microscopic scale.'],
      ['photon energy', 'E = h nu', 'Frequency determines photon energy.'],
      ['semiconductor response', 'band gap controls excitation', 'Energy bands explain conduction.'],
      ['qubit model', 'state = alpha|0> + beta|1>', 'Quantum computing uses state superposition conceptually.'],
    ],
    example: ['Compare photon energy when frequency doubles.', ['E=h nu', 'new frequency=2nu'], 'new energy', 'E_new=h(2nu)', 'E_new=2E', 'energy doubles', 'Twice the photon energy', 'Frequency is the controlling variable.'],
    visual: 'quantum',
    process: ['Quantum principle', 'Material response', 'Photonic/superconducting behaviour', 'Application device', 'Engineering use'],
    application: 'Lasers, semiconductors, superconductors and quantum computing arise from quantum models.',
    misconception: 'A qubit introduction should not be treated like a classical bit that is simply hidden.',
    slides: 10,
  },
  soilAgronomy: {
    title: 'Principles of Soil Science and Agronomy',
    domain: 'soil',
    topics: ['Agronomy scope', 'Tillage and sowing', 'Soil formation and rocks', 'Soil profile and structure', 'Soil chemical properties'],
    phenomenon: 'Crop performance depends on how soil forms, stores water/nutrients, responds to tillage and supports roots.',
    principle: 'Agronomy connects soil physical and chemical condition to crop management decisions.',
    equationSteps: [
      ['soil system', 'parent material + climate + organisms + relief + time -> soil', 'Soil formation is a process over conditions and time.'],
      ['management', 'soil property -> practice choice', 'Tillage, sowing and nutrient decisions follow observed soil state.'],
      ['profile', 'horizon arrangement -> root/water behaviour', 'Soil layers affect movement and growth.'],
      ['decision', 'observation + property + crop need -> agronomic practice', 'Agronomy is applied soil reasoning.'],
    ],
    example: ['Select management response for compacted seed bed.', ['poor aeration', 'restricted root growth', 'water movement affected'], 'agronomic response', 'match practice to soil physical limitation', 'improve tilth and seed bed condition before sowing', 'use appropriate tillage/seed-bed preparation', 'Better soil physical condition supports establishment.', 'Management follows the observed soil constraint.'],
    visual: 'soil',
    process: ['Soil formation', 'Profile/horizons', 'Physical property', 'Chemical property', 'Crop practice'],
    application: 'Tillage, sowing and soil-property management support sustainable crop production.',
    misconception: 'Soil is not inert dirt; it is a structured physical, chemical and biological system.',
    slides: 12,
  },
}

const subjectConfigs = [
  ['applied-chemistry-sustainable-structures-1bchec102-202', 'Applied Chemistry for Sustainable Structures and Material Design', '1BCHEC102/202', 'C - CHEMISTRY / MATERIAL SCIENCE', 'Applied_Chemistry_for_Sustainable_Structures_and_Material_Design_1BCHEC102_202'],
  ['applied-chemistry-emerging-electronics-1bchee102-202', 'Applied Chemistry for Emerging Electronics and Futuristic Devices', '1BCHEE102/202', 'C - CHEMISTRY / MATERIAL SCIENCE', 'Applied_Chemistry_for_Emerging_Electronics_and_Futuristic_Devices_1BCHEE102_202'],
  ['applied-chemistry-metal-protection-energy-1bchem102-202', 'Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems', '1BCHEM102/202', 'C - CHEMISTRY / MATERIAL SCIENCE', 'Applied_Chemistry_for_Advanced_Metal_Protection_and_Sustainable_Energy_Systems_1BCHEM102_202'],
  ['elements-biotechnology-biomimetics-1bebt105-205', 'Elements of Biotechnology and Biomimetics', '1BEBT105/205', 'C - CHEMISTRY / MATERIAL SCIENCE', 'Elements_of_Biotechnology_and_Biomimetics_1BEBT105_205'],
  ['elements-chemical-engineering-1beche105-205', 'Elements of Chemical Engineering', '1BECHE105/205', 'C - CHEMISTRY / MATERIAL SCIENCE', 'Elements_of_Chemical_Engineering_1BECHE105_205'],
  ['quantum-physics-electronic-sensors-1bphec102-202', 'QUANTUM PHYSICS AND ELECTRONIC SENSORS', '1BPHEC102/202', 'B - PHYSICS / PHYSICAL SCIENCE', 'QUANTUM_PHYSICS_AND_ELECTRONIC_SENSORS_1BPHEC102_202'],
  ['electrical-engineering-materials-1bphee102-102', 'ELECTRICAL ENGINEERING MATERIALS', '1BPHEE102/102', 'B - PHYSICS / PHYSICAL SCIENCE', 'ELECTRICAL_ENGINEERING_MATERIALS_1BPHEE102_102'],
  ['physics-sustainable-structural-systems-1bphyc102-202', 'PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS', '1BPHYC102/202', 'B - PHYSICS / PHYSICAL SCIENCE', 'PHYSICS_FOR_SUSTAINABLE_STRUCTURAL_SYSTEMS_1BPHYC102_202'],
  ['physics-of-materials-1bphym102-202', 'PHYSICS OF MATERIALS', '1BPHYM102/202', 'B - PHYSICS / PHYSICAL SCIENCE', 'PHYSICS_OF_MATERIALS_1BPHYM102_202'],
  ['quantum-physics-applications-1bphys102-202', 'QUANTUM PHYSICS AND APPLICATIONS', '1BPHYS102/202', 'B - PHYSICS / PHYSICAL SCIENCE', 'QUANTUM_PHYSICS_AND_APPLICATIONS_1BPHYS102_202'],
  ['principles-soil-science-agronomy-1bssa105-205', 'Principles of Soil Science and Agronomy', '1BSSA105/205', 'C - CHEMISTRY / MATERIAL SCIENCE', 'Principles_of_Soil_Science_and_Agronomy_1BSSA105_205'],
]

function resolveScienceModule(spec) {
  if (typeof spec === 'string') return scienceModules[spec]
  const { base, ...overlay } = spec
  return { ...scienceModules[base], ...overlay }
}

function eqSteps(items) {
  return items.map(([label, expression, note]) => ({ eq: `<strong>${label}</strong>: ${expression}`, explain: note }))
}

function ScienceHero({ module }) {
  return (
    <div className="science-hero-visual" data-domain={module.domain} data-slide-content="true">
      <ScienceVisual kind={module.visual} module={module} />
      <TeachingCallout kind="KEY PHENOMENON">{module.phenomenon}</TeachingCallout>
    </div>
  )
}

function ScienceVisual({ kind, module }) {
  if (kind === 'wave') return <WaveMechanism />
  if (kind === 'quantum') return <QuantumVisual />
  if (kind === 'bands') return <BandStructure />
  if (kind === 'cell') return <ElectrochemicalCell />
  if (kind === 'corrosion') return <CorrosionVisual />
  if (kind === 'polymer') return <PolymerVisual />
  if (kind === 'calorimeter') return <ApparatusVisual label="Bomb calorimeter" stages={['fuel cup', 'oxygen', 'ignition wire', 'water jacket', 'thermometer']} />
  if (kind === 'bio') return <BioProcessVisual />
  if (kind === 'plant') return <PlantVisual />
  if (kind === 'materials') return <MaterialResponseVisual />
  if (kind === 'stress') return <StressStrainVisual />
  if (kind === 'soil') return <SoilProfileVisual />
  return <ProcessScene module={module} />
}

function ElectrochemicalCell() {
  return (
    <svg className="science-svg" viewBox="0 0 860 470" role="img" aria-label="Electrochemical cell with labelled paths">
      <rect width="860" height="470" rx="18" />
      <rect x="92" y="130" width="230" height="230" rx="18" />
      <rect x="538" y="130" width="230" height="230" rx="18" />
      <path className="science-wire" d="M210 130 V72 H650 V130" />
      <path className="science-flow electron" d="M630 82 C500 50 360 50 230 82" />
      <path className="science-bridge" d="M322 210 C400 165 460 165 538 210" />
      <line className="science-electrode" x1="210" y1="150" x2="210" y2="345" />
      <line className="science-electrode cathode" x1="650" y1="150" x2="650" y2="345" />
      <circle className="science-ion ion-a" cx="390" cy="205" r="11" /><circle className="science-ion ion-b" cx="470" cy="205" r="11" />
      <text x="162" y="383">Anode: oxidation</text><text x="592" y="383">Cathode: reduction</text>
      <text x="398" y="58">electron path</text><text x="372" y="248">ion bridge</text>
    </svg>
  )
}

function CorrosionVisual() {
  return (
    <svg className="science-svg" viewBox="0 0 860 470" role="img" aria-label="Corrosion mechanism">
      <rect width="860" height="470" rx="18" />
      <rect x="120" y="285" width="620" height="58" rx="12" />
      <path className="science-liquid" d="M90 245 C210 215 310 270 430 238 C550 205 650 255 770 225 L770 285 L90 285 Z" />
      <circle className="science-site anode" cx="300" cy="285" r="24" /><circle className="science-site cathode" cx="565" cy="285" r="24" />
      <path className="science-flow electron" d="M315 308 C410 360 485 360 550 308" />
      <path className="science-flow ion" d="M300 250 C355 210 500 210 565 250" />
      <text x="245" y="382">anodic metal loss</text><text x="525" y="382">cathodic reaction</text>
      <text x="122" y="214">environment / electrolyte film</text>
    </svg>
  )
}

function PolymerVisual() {
  const xs = [130, 235, 340, 445, 550, 655]
  return (
    <svg className="science-svg" viewBox="0 0 860 470" role="img" aria-label="Polymer chain formation">
      <rect width="860" height="470" rx="18" />
      {xs.map((x, i) => <g key={x} className="science-monomer" style={{ '--i': i }}><circle cx={x} cy="235" r="42" /><text x={x - 14} y="244">M</text></g>)}
      {xs.slice(0, -1).map((x, i) => <line key={x} className="science-bond" x1={x + 42} y1="235" x2={xs[i + 1] - 42} y2="235" />)}
      <text x="250" y="130">monomers join into repeating chain</text>
      <text x="292" y="350">{'chain length + bonding -> material property'}</text>
    </svg>
  )
}

function QuantumVisual() {
  return (
    <svg className="science-svg" viewBox="0 0 860 470" role="img" aria-label="Quantum wave and energy transition">
      <rect width="860" height="470" rx="18" />
      <path className="science-wave" d="M90 250 C145 140 205 360 260 250 S375 140 430 250 S545 360 600 250 S715 140 770 250" />
      <line className="science-level" x1="160" y1="110" x2="410" y2="110" /><line className="science-level" x1="160" y1="190" x2="410" y2="190" />
      <path className="science-transition" d="M285 188 V118" />
      <text x="450" y="116">higher energy</text><text x="450" y="196">lower energy</text>
      <text x="98" y="330">matter-wave / probability model</text><text x="586" y="118">Delta E = h nu</text>
    </svg>
  )
}

function BandStructure() {
  return (
    <svg className="science-svg" viewBox="0 0 860 470" role="img" aria-label="Energy band structure">
      <rect width="860" height="470" rx="18" />
      <rect x="160" y="95" width="540" height="88" rx="12" className="science-band conduction" />
      <rect x="160" y="286" width="540" height="88" rx="12" className="science-band valence" />
      <path className="science-transition" d="M430 282 V190" />
      <circle className="science-carrier" cx="430" cy="160" r="12" />
      <text x="312" y="148">conduction band</text><text x="342" y="338">valence band</text>
      <text x="462" y="242">band gap</text>
    </svg>
  )
}

function WaveMechanism() {
  return (
    <div className="science-wave-stack" data-slide-content="true">
      <WaveformAnimator />
      <div className="science-wave-legend"><span>amplitude</span><span>wavelength</span><span>propagation direction</span><span>boundary response</span></div>
    </div>
  )
}

function ApparatusVisual({ label, stages }) {
  return (
    <svg className="science-svg" viewBox="0 0 860 470" role="img" aria-label={`${label} apparatus`}>
      <rect width="860" height="470" rx="18" />
      <rect x="140" y="120" width="270" height="240" rx="24" />
      <circle cx="275" cy="240" r="78" />
      <path className="science-wire" d="M410 240 H620" />
      <rect x="620" y="160" width="130" height="150" rx="18" />
      {stages.map((stage, i) => <text key={stage} x="82" y={70 + i * 34}>{i + 1}. {stage}</text>)}
      <text x="548" y="348">reading/result</text><text x="210" y="405">{label}</text>
    </svg>
  )
}

function BioProcessVisual() {
  return <ProcessScene module={{ process: ['DNA', 'RNA', 'Protein', 'Cell function', 'Biotechnology product'] }} />
}

function PlantVisual() {
  return <ProcessScene module={{ process: ['Feed', 'Reactor', 'Separator', 'Controller', 'Product', 'Safety'] }} />
}

function MaterialResponseVisual() {
  return <ProcessScene module={{ process: ['Input field', 'Internal response', 'Carrier/domain change', 'Measured property', 'Device use'] }} />
}

function StressStrainVisual() {
  return (
    <GraphAnimator
      domain={[0, 6]}
      range={[0, 8]}
      xLabel="strain"
      yLabel="stress"
      curves={[{ label: 'stress-strain', color: '#b45309', fn: (x) => x < 3 ? 1.4 * x : 4.2 + 0.35 * (x - 3) }]}
      points={[{ label: 'elastic region', xy: [1.8, 2.52] }, { label: 'yield', xy: [3, 4.2] }]}
      highlight="slope in elastic region gives modulus"
    />
  )
}

function SoilProfileVisual() {
  return (
    <svg className="science-svg" viewBox="0 0 860 470" role="img" aria-label="Soil profile and agronomy decision">
      <rect width="860" height="470" rx="18" />
      {['O horizon: organic matter', 'A horizon: top soil', 'B horizon: sub soil', 'C horizon: parent material'].map((label, i) => (
        <g key={label}><rect className={`soil-layer layer-${i}`} x="160" y={80 + i * 78} width="520" height="76" rx="10" /><text x="212" y={126 + i * 78}>{label}</text></g>
      ))}
      <path className="science-flow water" d="M720 72 V372" />
      <text x="690" y="414">water / root movement</text>
    </svg>
  )
}

function ProcessScene({ module }) {
  return <ProcessAnimator steps={module.process.map((step) => ({ title: step, detail: 'Observe the stage and connect it to the measured property.' }))} />
}

function buildConceptMap(module) {
  const nodes = [
    { id: 'phenomenon', label: 'Phenomenon', x: 382, y: 80, main: true },
    { id: 'principle', label: 'Principle', x: 184, y: 210 },
    { id: 'mechanism', label: 'Mechanism', x: 382, y: 245 },
    { id: 'measure', label: 'Measure', x: 582, y: 210 },
    { id: 'application', label: 'Application', x: 382, y: 360 },
  ]
  const links = [
    { from: 'phenomenon', to: 'principle', label: 'explains' },
    { from: 'principle', to: 'mechanism', label: 'drives' },
    { from: 'mechanism', to: 'measure', label: 'observed as' },
    { from: 'measure', to: 'application', label: 'used for' },
    { from: 'mechanism', to: 'application', label: 'enables' },
  ]
  return <ConceptMap nodes={nodes} links={links} />
}

function buildSourceSlides(subject, moduleIndex, sourceDepth) {
  return makeSourceTeachingSlides({
    idPrefix: `${subject.code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${moduleIndex + 1}-source-depth`,
    sourceDepth,
    tone: 'science',
    footer: `${subject.code} / Module ${moduleIndex + 1}`,
  })
}

function makeSlides(subject, module, moduleIndex, sourceDepth) {
  const base = `${subject.code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${moduleIndex + 1}`
  const slides = [
    {
      id: `${base}-phenomenon`,
      title: `Module ${moduleIndex + 1}: ${module.title}`,
      subtitle: `${subject.code} / ${subject.family.startsWith('B') ? 'Physics' : 'Chemistry and physical science'}`,
      kicker: 'First Year Science',
      composition: 'visual-hero',
      content: <FoundationSlide layout="visual-hero"><ScienceHero module={module} /></FoundationSlide>,
      takeaway: module.phenomenon,
    },
    {
      id: `${base}-why`,
      title: 'Why This Module Matters',
      subtitle: module.application,
      composition: 'process',
      content: <FoundationSlide layout="full-canvas-diagram"><ProcessScene module={module} /></FoundationSlide>,
      takeaway: module.application,
    },
    {
      id: `${base}-coverage`,
      title: 'Source Coverage Route',
      subtitle: 'PPTX topics and official syllabus topics mapped into teaching actions',
      composition: 'full-canvas-diagram',
      content: <TopicMap topics={module.topics} />,
      takeaway: 'The module moves from source topic to visual mechanism, equation, measurement and application.',
    },
    {
      id: `${base}-mechanism`,
      title: 'Mechanism in Front of the Student',
      subtitle: module.principle,
      composition: 'visual',
      content: <FoundationSlide layout="full-canvas-diagram"><ScienceVisual kind={module.visual} module={module} /></FoundationSlide>,
      takeaway: module.principle,
    },
    {
      id: `${base}-equation`,
      title: 'Equation Connected to the Phenomenon',
      subtitle: 'The symbols follow the physical mechanism',
      composition: 'worked-example',
      content: <FoundationSlide layout="derivation"><EquationStepper steps={eqSteps(module.equationSteps)} /></FoundationSlide>,
      takeaway: `${module.equationSteps[0][1]} — ${module.equationSteps[0][2]}`,
    },
    {
      id: `${base}-numerical`,
      title: 'Worked Numerical / Source-Supported Example',
      subtitle: module.example[0],
      composition: 'worked-example',
      content: <FoundationSlide layout="worked-example"><NumericalBoard problem={module.example[0]} given={module.example[1]} find={module.example[2]} formula={module.example[3]} substitution={module.example[4]} calculation={module.example[5]} answer={module.example[6]} interpretation={module.example[7]} /></FoundationSlide>,
      takeaway: module.example[7],
    },
    {
      id: `${base}-graph`,
      title: 'Graph / Relationship Reading',
      subtitle: 'Axes and trend are tied to the measured science',
      composition: 'visual',
      content: <FoundationSlide layout="full-canvas-diagram"><ScienceGraph domain={module.domain} /></FoundationSlide>,
      takeaway: 'Students read the trend before memorising the relation.',
    },
    {
      id: `${base}-application`,
      title: 'Application Story',
      subtitle: 'Property -> reason -> engineering use',
      composition: 'comparison',
      content: <FoundationSlide layout="comparison"><ComparisonVisualizer left={{ title: 'Scientific property' }} right={{ title: 'Engineering use' }} dimensions={[{ label: 'Mechanism', left: module.principle, right: module.application }, { label: 'Observation', left: module.phenomenon, right: module.topics.slice(0, 2).join('; ') }, { label: 'Limit', left: module.misconception, right: `Do not apply ${module.equationSteps?.[0]?.[0] || 'the formula'} outside the stated mechanism.`}]} /></FoundationSlide>,
      takeaway: module.application,
    },
    {
      id: `${base}-misconception`,
      title: 'Common Misconception',
      subtitle: 'What students often confuse',
      composition: 'process',
      content: (
        <FoundationSlide layout="visual-hero">
          <div className="science-hero-visual" data-slide-content="true">
            <ScienceVisual kind={module.visual} module={module} />
            <TeachingCallout kind="COMMON MISTAKE">{module.misconception}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.misconception,
    },
  ]

  if (module.slides >= 10) {
    slides.splice(7, 0, {
      id: `${base}-apparatus`,
      title: 'Measurement / Apparatus View',
      subtitle: 'Input, interaction, detector and reading',
      composition: 'visual',
      content: <FoundationSlide layout="full-canvas-diagram"><ApparatusVisual label={module.domain === 'physics' ? 'measurement setup' : 'process setup'} stages={(module.process || ['input/sample', 'interaction zone', 'detector/observation', 'signal or result']).slice(0, 5)} /></FoundationSlide>,
      takeaway: 'The measurement path is visible before the final reading is interpreted.',
    })
  }
  if (module.slides >= 11) {
    slides.splice(slides.length - 1, 0, {
      id: `${base}-process-detail`,
      title: 'Process Build-Up',
      subtitle: 'Input to final state',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram"><ProcessScene module={module} /></FoundationSlide>,
      takeaway: 'The final state is understandable because each stage has been constructed.',
    })
  }
  if (module.slides >= 12) {
    slides.push({
      id: `${base}-recap`,
      title: 'Module Recap',
      subtitle: 'Phenomenon, mechanism, measurement and application',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram">{buildConceptMap(module)}</FoundationSlide>,
      takeaway: 'The module closes by connecting what happens, why it happens, how it is measured and where it is applied.',
    })
  }
  const sourceSlides = buildSourceSlides(subject, moduleIndex, sourceDepth)
  return [
    ...slides.slice(0, -1),
    ...sourceSlides,
    slides.at(-1),
  ]
}

function TopicMap({ topics }) {
  return (
    <div className="science-topic-map" data-slide-content="true">
      {topics.map((topic, i) => <article key={topic} style={{ '--i': i }}><strong>{String(i + 1).padStart(2, '0')}</strong><span>{topic}</span></article>)}
    </div>
  )
}

function ScienceGraph({ domain }) {
  const physics = domain === 'physics'
  return (
    <GraphAnimator
      domain={[0, 6]}
      range={[0, 8]}
      xLabel={physics ? 'input / time' : 'process variable'}
      yLabel={physics ? 'response' : 'property'}
      curves={[{ label: 'response', color: physics ? '#2563eb' : '#0f766e', fn: (x) => physics ? 3 + 2 * Math.sin(x) + x * 0.35 : 1.2 + x * 0.9 - 0.06 * x * x }]}
      points={[{ label: 'threshold', xy: [2.5, physics ? 5.1 : 3.08] }, { label: 'operating region', xy: [4.7, physics ? 4.25 : 4.11] }]}
      highlight={physics ? 'response changes with input and boundary conditions' : 'property trend guides material/process choice'}
    />
  )
}

function buildSubject([id, title, code, family, folder]) {
  const keys = scienceSubjectModules[code]
  return {
    id,
    number: code.replace(/\D/g, '').slice(-3),
    title,
    shortTitle: code,
    code,
    description: `${family}: interactive science modules built from finalized First Year PPTX sources.`,
    accent: 'first-year-science',
    segmentLabel: 'Module',
    keyAreas: Array.from(new Set(keys.flatMap((key) => resolveScienceModule(key).topics.slice(0, 2)))).slice(0, 8),
    moduleFlow: keys.map((key) => resolveScienceModule(key).title.split(/ and |,|:/)[0]),
    phase: 4,
    family,
    pptxFolder: `${PPTX_ROOT}/${folder}`,
    syllabusSource: `${SYLLABUS_ROOT}/${code.split('/')[0]}.pdf`,
    modules: keys.map((key, i) => {
      const module = resolveScienceModule(key)
      const sourceDepth = firstYearDepthModules[`${code}|${i + 1}`]
      return {
        id: `module-${i + 1}`,
        number: String(i + 1).padStart(2, '0'),
        label: `Module ${i + 1}`,
        title: module.title,
        description: module.topics.slice(0, 3).join(', ') + '.',
        topics: module.topics,
        slides: makeSlides({ id, title, code, family }, module, i, sourceDepth),
        pptxSource: `${PPTX_ROOT}/${folder}/Module_${i + 1}.pptx`,
        depthResync: sourceDepth,
      }
    }),
  }
}

export const firstYearScienceSubjects = subjectConfigs.map(buildSubject)

export const firstYearScienceReportSeed = {
  subjectsExpected: subjectConfigs.length,
  subjectsCreated: firstYearScienceSubjects.length,
  subjectsSkipped: 1,
  modulesCreated: firstYearScienceSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  interactiveSlides: firstYearScienceSubjects.reduce((sum, subject) => sum + subject.modules.reduce((m, module) => m + module.slides.length, 0), 0),
  majorAnimations: firstYearScienceSubjects.reduce((sum, subject) => sum + subject.modules.reduce((m, module) => m + Math.max(4, Math.floor(module.slides.length / 2)), 0), 0),
  scientificProcessVisuals: firstYearScienceSubjects.reduce((sum, subject) => sum + subject.modules.length * 3, 0),
  experimentVisuals: firstYearScienceSubjects.reduce((sum, subject) => sum + subject.modules.filter((module) => module.slides.length >= 10).length, 0),
  workedNumericals: firstYearScienceSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  graphVisualizations: firstYearScienceSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
}
