export { parallelComputingModule1Slides } from './parallelComputingModule1Slides'
export { parallelComputingModule2Slides } from './parallelComputingModule2Slides'

function slide({ id, kicker, title, subtitle, content, notes, layout, tone, hideTitle }) {
  return { id, kicker, title, subtitle, content, notes, layout, tone, hideTitle }
}

export function parallelComputingComingSoonSlides(moduleNumber) {
  return [
    slide({
      id: `pc-module-${moduleNumber}-coming-soon`,
      kicker: 'Parallel Computing',
      title: 'Coming Soon',
      subtitle: `Module ${moduleNumber} placeholder`,
      content: (
        <div className="pc-coming-soon">
          <div>
            <span>BCS702 - Module {moduleNumber}</span>
            <h2>Coming Soon</h2>
            <p>This module is reserved for the next Parallel Computing lecture experience.</p>
          </div>
        </div>
      ),
      notes: `Premium placeholder for Parallel Computing Module ${moduleNumber}.`,
    }),
  ]
}
