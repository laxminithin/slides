/**
 * International Business — module barrel.
 *
 * V9.0 split the monolith into a shared kit (src/ib/kit.jsx) + one file per
 * module (src/ib/module1.jsx … module6.jsx). This barrel preserves the public
 * import surface used by src/data/subjects.jsx, so no downstream change is
 * needed. See src/ib/kit.jsx for the component library.
 */

export { internationalBusinessModule1Slides } from './ib/module1'
export { internationalBusinessModule2Slides } from './ib/module2'
export { internationalBusinessModule3Slides } from './ib/module3'
export { internationalBusinessModule4Slides } from './ib/module4'
export { internationalBusinessModule5Slides } from './ib/module5'
export { internationalBusinessModule6Slides } from './ib/module6'
