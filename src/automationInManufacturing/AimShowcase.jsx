/** Full-bleed showcase layouts for Automation in Manufacturing. Two per module. */
import {
  M1USAPrincipleThreeStepsScene,
  M1BreakEvenComparisonScene,
  M2MultiStationJamScene,
  M2BufferDecouplingScene,
  M3MrpTimePhasedRecordScene,
  M3RobotAnatomyLabelledScene,
  M4CMMAlignmentScene,
  M4VisionPipelineScene,
  M5LayerByLayerBuildPrincipleScene,
  M5DesignForAmAvoidAndExploitScene,
} from './AimScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="aim-showcase-scene">{scene}</div>,
  }
}

const SHOWCASE = {
  'm1-u6-ops': wrap(
    'Understand, simplify, then automate',
    <M1USAPrincipleThreeStepsScene />,
    'Automation belongs at the end of the sequence, after waste has been understood and removed.',
    'wide-bench',
    'aim-usa-principle',
    'process-improvement',
  ),
  'm1-u15-ops': wrap(
    'The break-even quantity makes the automation decision visible',
    <M1BreakEvenComparisonScene />,
    'Fixed cost buys automation; quantity determines whether its lower running cost repays it.',
    'overhead-board',
    'aim-break-even',
    'cost-comparison',
  ),
  'm2-u14-ops': wrap(
    'One station jam can stop an entire coupled line',
    <M2MultiStationJamScene />,
    'Without isolation, a local failure propagates upstream and downstream through the line.',
    'wide-bench',
    'aim-jam-propagation',
    'assembly-line',
  ),
  'm2-u15-ops': wrap(
    'Buffers decouple stations and protect throughput',
    <M2BufferDecouplingScene />,
    'A buffer absorbs short disruptions, turning a line-wide stoppage into a local event.',
    'side-by-side',
    'aim-buffer-decoupling',
    'storage-buffer',
  ),
  'm3-u6-ops': wrap(
    'MRP turns demand into a time-phased release plan',
    <M3MrpTimePhasedRecordScene />,
    'Gross requirements, scheduled receipts and lead time combine to determine exactly when to release an order.',
    'overhead-board',
    'aim-mrp-record',
    'material-planning',
  ),
  'm3-u10-ops': wrap(
    'Every robot motion begins with its anatomy',
    <M3RobotAnatomyLabelledScene />,
    'Links, joints, controller and end effector together define what a robot can reach and do.',
    'close-element',
    'aim-robot-anatomy',
    'industrial-robot',
  ),
  'm4-u7-ops': wrap(
    'A CMM measures only after it establishes the part datum frame',
    <M4CMMAlignmentScene />,
    'Probe points become meaningful dimensions only when the coordinate system is aligned to the part.',
    'close-element',
    'aim-cmm-alignment',
    'coordinate-measurement',
  ),
  'm4-u12-ops': wrap(
    'Machine vision transforms pixels into an inspection decision',
    <M4VisionPipelineScene />,
    'Thresholding, segmentation and features turn an image into a repeatable accept-or-reject verdict.',
    'wide-bench',
    'aim-vision-pipeline',
    'machine-vision',
  ),
  'm5-u1-ops': wrap(
    'Additive manufacturing makes the part one layer at a time',
    <M5LayerByLayerBuildPrincipleScene />,
    'Each layer is a controlled cross-section; their accumulation is the finished geometry.',
    'close-element',
    'aim-layerwise-build',
    'additive-manufacturing',
  ),
  'm5-u10-ops': wrap(
    'Design for additive manufacturing avoids traps and exploits freedom',
    <M5DesignForAmAvoidAndExploitScene />,
    'Avoid unsupported and trapped features; exploit topology and lattices to put material only where load needs it.',
    'side-by-side',
    'aim-design-for-am',
    'design-freedom',
  ),
}

export function getShowcase(id) {
  return SHOWCASE[id] || null
}
