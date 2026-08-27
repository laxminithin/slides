export { LAB_PROGRAMS, getLabProgram } from './catalog'
export { default as LabSelector } from './LabSelector'
export { LabProgramSwitcher } from './LabKit'

import { program1Slides } from './programs/program1'
import { program2Slides } from './programs/program2'
import { program3Slides } from './programs/program3'
import { program4Slides } from './programs/program4'
import { program6Slides } from './programs/program6'
import { program7Slides } from './programs/program7'
import { program8Slides } from './programs/program8'
import { LAB_PROGRAMS } from './catalog'

const slidesById = {
  'lab-p1': program1Slides,
  'lab-p2': program2Slides,
  'lab-p3': program3Slides,
  'lab-p4': program4Slides,
  'lab-p6': program6Slides,
  'lab-p7': program7Slides,
  'lab-p8': program8Slides,
}

export function getLabModules() {
  return LAB_PROGRAMS.map((program) => ({
    id: program.id,
    number: program.number.padStart(2, '0'),
    label: `Program ${program.number}`,
    title: program.title,
    description: program.objective,
    topics: [program.tech],
    kind: 'lab-program',
    tech: program.tech,
    difficulty: program.difficulty,
    time: program.time,
    slides: slidesById[program.id],
  }))
}
