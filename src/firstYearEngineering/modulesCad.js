function m(title, domain, visual, topics, problem, principle, process, equationSteps, example, comparison, misconception, application, extras = {}) {
  return { title, domain, visual, topics, problem, principle, process, equationSteps, example, comparison, misconception, application, ...extras }
}

function cadShared(streamVisual, streamName, moduleFiveTitle, moduleFiveTopics, moduleFiveProblem, moduleFivePrinciple, moduleFiveProcess, moduleFiveApp, moduleFiveMistake) {
  return {
    cadIntro: m(
      `Introduction, CAD Tools and Orthographic Projection of Points, Lines and Planes (${streamName})`,
      'cad', 'projection',
      ['BIS conventions', 'Freehand sketching and scales', 'CAD coordinates, HP/VP/RPP/LPP', 'Drawing commands', 'Points in 1st and 3rd angle', 'Lines in first quadrant', 'Planes by change of position'],
      'How does a 3D point become two 2D views that still locate it uniquely?',
      'Orthographic projection uses projectors perpendicular to HP and VP. First-angle and third-angle place the views differently relative to XY.',
      ['Choose plane (HP/VP)', 'Drop projectors', 'Mark front and top views', 'Read distances from XY', 'Use CAD commands to repeat exactly'],
      [['first angle', 'object between observer and plane', 'Views arranged per BIS first-angle practice in this course for lines/planes.'], ['third angle', 'plane between observer and object', 'Points are also taught in 3rd quadrant.'], ['line', 'true length vs apparent', 'Inclination to HP/VP changes views.'], ['plane', 'change-of-position', 'Bring the lamina parallel to a plane.']],
      ['A point is 30 mm above HP and 40 mm in front of VP (first angle). Sketch the views.', 'z=30 mm above HP, y=40 mm in front of VP', 'front and top', 'front above XY by 30, top below XY by 40', 'projectors aligned', 'FV 30 mm above, TV 40 mm below', 'FV 30 / TV 40', 'The vertical projector is the teaching object, not a decorative line.'],
      [['view', 'front', 'top'], ['plane', 'VP', 'HP'], ['distance', 'from HP', 'from VP']],
      'First-angle is not “top view on top”. Learn the BIS placement, do not import third-angle habits blindly.',
      `${streamName} drawings still start from the same projection language as every other stream.`,
      { secondaryVisual: streamVisual },
    ),
    cadSolids: m(
      `Orthographic Projection of Solids (${streamName})`,
      'cad', 'solid',
      ['Right regular prisms, pyramids, cylinders, cones', 'Resting on HP', 'Inclined to both planes'],
      'If a cone or prism is tilted, which outline is true and which is apparent?',
      'Tilt relative to HP and VP changes which edges appear true length. Auxiliary position is a sequence, not a guess.',
      ['Place solid on HP', 'Draw TV and FV', 'Apply inclination to one plane', 'Then the other', 'Trace generators/edges'],
      [['prism', 'parallel generators, polygonal bases', 'Faces project as parallelograms or true shapes.'], ['pyramid', 'apex to base', 'Slant edges need care when inclined.'], ['cylinder/cone', 'generators and axis', 'Ellipse appears when axis is inclined.'], ['both planes', 'two-step tilt', 'Do not combine tilts in one illegal view.']],
      ['A pentagonal prism rests on HP on a base edge and is inclined to VP. What must you draw first?', 'inclined to VP, on HP', 'sequence', 'simple position, then rotate/tilt', 'axis/base relation to VP', 'simple then inclined', 'simple position first', 'Skipping the simple position loses true base geometry.'],
      [['solid', 'prism', 'pyramid', 'cylinder', 'cone'], ['typical tell', 'parallel edges', 'apex', 'rectangle/ellipse', 'triangle/ellipse']],
      'An ellipse in the view is often a tilted circle or base, not a “decoration”.',
      `${streamName} components are still these solids before they become buildings, machines or PCBs.`,
      { secondaryVisual: streamVisual },
    ),
    cadSection: m(
      `Sections and Development of Lateral Surfaces (${streamName})`,
      'cad', 'section',
      ['Section planes', 'Apparent and true shapes', 'Sections of prism, pyramid, cylinder, cone on HP', 'Development of prisms, pyramids, cylinders, cones', 'Frustums and truncations', 'Funnels and trays'],
      'How do you unroll a surface so a sheet-metal funnel or tray has the right true lengths?',
      'A section plane cuts a solid; the true shape is found by projecting onto a plane parallel to the cut. Development uses true lengths of edges/generators.',
      ['Solid in simple position', 'Section plane', 'Apparent cut', 'True-shape view', 'Unroll lateral surface using true lengths'],
      [['true shape', 'project onto plane // section', 'Not the same as the apparent cut in FV/TV.'], ['development', 'true lengths laid in a plane', 'Stretch-out of the surface.'], ['cone', 'sector of a circle', 'Generator is the radius of the sector.'], ['funnel', 'two frustums/cones joined', 'Application development.']],
      ['Why can you not develop a sphere by the same method as a cylinder?', 'double curvature', 'reason', 'sphere is not a single-ruled lateral surface in the same way', 'syllabus solids are right regular developable', 'use prism/pyramid/cylinder/cone methods', 'not a sphere in this module', 'Stay inside developable solids named in the syllabus.'],
      [['output', 'section view', 'development'], ['question answered', 'interior cut', 'sheet-metal size']],
      'Concepts-only sections still need the plane and the true-shape idea; “no problems for practice” is not “no diagram”.',
      `Trays, ducts and ${streamName} enclosures are developments of these solids.`,
      { secondaryVisual: streamVisual },
    ),
    cadIso: m(
      `Isometric Views and Conversion to Orthographic (${streamName})`,
      'cad', 'isometric',
      ['Isometric view vs projection', 'Isometric scale', 'Cube, prisms, pyramids, cylinders, cones, spheres', 'Combination of two solids and step block', 'Isometric to orthographic conversion'],
      'How do you draw a 3D-looking step block that still converts back into correct front, top and side views?',
      'Isometric axes are 120 degrees apart. Isometric view uses true sizes along axes; isometric projection uses isometric scale.',
      ['Draw isometric axes', 'Box the solid', 'Cut steps/combos', 'Read hidden edges carefully', 'Project orthographic views from the iso'],
      [['view vs projection', 'view uses true lengths along iso axes', 'projection shortens by isometric scale.'], ['sphere', 'circle in iso', 'Still a circle.'], ['step block', 'box then subtract', 'Construction sequence.'], ['conversion', 'iso is not a missing view', 'FV/TV/SV still required.']],
      ['A cube of 30 mm: are the isometric face diagonals 30 mm?', 'iso cube', 'lengths', 'only edges along iso axes are 30 in isometric view', 'face diagonal is not an iso axis', 'no', 'no, only axial edges', 'Students over-measure diagonals.'],
      [['drawing', 'isometric', 'orthographic'], ['use', 'pictorial explanation', 'manufacturing/multi-view']],
      'Isometric is not perspective. Edges stay parallel; they do not vanish.',
      `${streamName} parts are dimensioned from orthographic views even if explained in isometric.`,
      { secondaryVisual: streamVisual },
    ),
    cadApp: m(
      moduleFiveTitle,
      'cad', streamVisual,
      moduleFiveTopics,
      moduleFiveProblem,
      moduleFivePrinciple,
      moduleFiveProcess,
      [['model', '3D object from 2D views or direct model', 'CAD solid/surface.'], ['material', 'assigned for render/heat/weight as relevant', 'Stream-specific.'], ['drawing', 'industrial/building communication', 'Standards still apply.'], ['output', 'views, BOM, STL or sheets', 'Downstream use.']],
      ['Name the first modelling unit you would create for this stream’s Module 5 object.', moduleFiveTopics[0], 'starting feature', 'start with the governing solid/feature named in syllabus', 'then holes, slots, openings', 'base feature first', 'base feature', 'Do not start in random decoration.'],
      [['2D', '3D'], ['drawing/schematic', 'model + render / STL']],
      moduleFiveMistake,
      moduleFiveApp,
      { secondaryVisual: 'isometric' },
    ),
  }
}

export const cadCv = cadShared(
  'cadCv', 'CV stream',
  'Building Components, Floor Plans and 3D Building Models',
  ['Foundations, columns, beams, slabs, walls', 'Doors, windows, stairs', 'Materials and rendering', '2D floor plan', '3D walls, openings, roof', 'Building drawing concept'],
  'How does a floor-plan line become a wall with openings and a roof in 3D?',
  'Building CAD is still orthographic discipline: plan, then extrude walls, then cut doors/windows, then roof.',
  ['Plan lines', 'Wall solids', 'Openings', 'Slabs/roof', 'Materials/render'],
  'Civil students must see the building as a stack of modelled elements, not a pretty house thumbnail.',
  'A plan without wall thickness is not a buildable model.',
)

export const cadEe = cadShared(
  'cadEe', 'EE stream',
  'Electrical Drawing: Devices, Schematics and Power-System Diagrams',
  ['Switches, sockets, panels, junction boxes, antenna', 'Electric circuits in 2D', 'Fire alarm, call bell, UPS schematics', 'Basic power-system diagram', 'Industrial drawing concept'],
  'How is an electrical schematic different from the physical layout of switches and conduits?',
  'Schematics show connectivity and function; layout drawings show location. Both are industrial drawings.',
  ['Device symbol', 'Connectivity', 'Protection/UPS block', 'Power-system single line', 'Industrial annotation'],
  'Electrical students must read both the device drawing and the schematic as two views of one system.',
  'A wiring layout is not a circuit diagram. Do not mix physical position with electrical nodes.',
)

export const cadEce = cadShared(
  'cadEce', 'ECE stream',
  'Electronic Component Visualisation, Antennas and PCB Enclosures',
  ['Optical fibre core and cladding', 'Photonic crystal fibre idea', 'Patch antenna and array', 'PCB enclosure with standard slots', 'Heat-sink and IP-style material properties', 'Industrial drawing'],
  'Why does a fibre or antenna need a 3D model, and what does an enclosure have to respect?',
  'Geometry is functional: core/cladding, patch size, enclosure slots and heat-sink volume are electrical/mechanical constraints.',
  ['Model the functional geometry', 'Assign materials (fibre, metal, plastic)', 'Add slots per standard', 'Heat/dust features', 'Render for communication'],
  'ECE CAD is still projection plus a device that carries a signal or protects a board.',
  'A pretty enclosure that blocks connectors or trapping heat is a failed drawing, not a styling win.',
)

export const cadMe = cadShared(
  'cadMe', 'ME stream',
  'Part Design, Rendering, Sheet Metal and Surface Design',
  ['3D machine parts', 'Material properties and rendering', 'Automotive panels', 'HVAC ducting', 'Industrial drawing concept'],
  'How does a machine part model become a sheet-metal panel or a duct that can be manufactured?',
  'Solid part design, then sheet-metal/surface operations, then materials for visualisation and downstream CAM.',
  ['Base solid', 'Holes/features', 'Sheet-metal/unfold or surface', 'Material/render', 'Industrial views'],
  'Mechanical CAD closes the loop from the Module 1–4 solids to shop-floor parts and ducts.',
  'Rendering is not a substitute for correct orthographic production views.',
)

export const cadCs = cadShared(
  'cadCs', 'CS stream',
  'Computer Network Drawings and 3D IoT/Board Models',
  ['2D wired and wireless network drawings', 'Network topology', 'Raspberry Pi / Arduino', 'Routers and switches', 'IoT devices and STL for 3D printing', 'Industrial drawing concept'],
  'How do you draw a topology so a router is a node, then model the physical board that will be printed?',
  'Network drawings show logical/physical connectivity; 3D models of boards and devices prepare STL fabrication.',
  ['Topology nodes and links', 'Wired vs wireless notation', 'Board/device solids', 'Ports and envelopes', 'STL export concept'],
  'CS stream drawing is still engineering graphics: topology is a diagram; the board is a solid.',
  'A topology sketch that ignores connectors and keep-out is not an industrial drawing.',
)
