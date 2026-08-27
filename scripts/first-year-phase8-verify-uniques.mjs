import { firstYearScienceSubjects } from '../src/firstYearScience/index.jsx'
import { firstYearMathSubjects } from '../src/firstYearMath/index.jsx'

const sciDup = firstYearScienceSubjects.flatMap((subject) => {
  const titles = subject.modules.map((module) => module.title)
  const clones = titles.filter((title, index) => titles.indexOf(title) !== index)
  return clones.length ? [{ code: subject.code, clones: [...new Set(clones)] }] : []
})
const mathDup = firstYearMathSubjects.flatMap((subject) => {
  const titles = subject.modules.map((module) => module.title)
  const clones = titles.filter((title, index) => titles.indexOf(title) !== index)
  return clones.length ? [{ code: subject.code, clones: [...new Set(clones)] }] : []
})
console.log(JSON.stringify({
  scienceSubjects: firstYearScienceSubjects.length,
  scienceDupTitles: sciDup,
  mathDupTitles: mathDup,
  sample: firstYearScienceSubjects.find((s) => s.code === '1BEBT105/205')?.modules.map((m) => m.title),
  mathSample: firstYearMathSubjects.find((s) => s.code === '1BMATS201')?.modules.map((m) => m.title),
}, null, 2))
