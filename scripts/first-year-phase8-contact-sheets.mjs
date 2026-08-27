import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTACT = path.join(ROOT, 'qa-contact-sheets/first-year-phase8')
const inventory = JSON.parse(await fs.readFile(path.join(ROOT, 'qa/first-year-phase8-inventory.json'), 'utf8'))

const files = (await fs.readdir(CONTACT)).filter((name) => name.endsWith('.jpg') || name.endsWith('.png'))
const bySubject = {}
for (const file of files) {
  const id = file.split('__')[0]
  if (!bySubject[id]) bySubject[id] = []
  bySubject[id].push(file)
}

const familySheets = {}
for (const subject of inventory.subjectsDetail) {
  const fam = subject.familyLabel || subject.family
  if (!familySheets[fam]) familySheets[fam] = []
  familySheets[fam].push(subject)
}

function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title>
<style>
body{font:15px/1.4 "Source Sans 3",system-ui,sans-serif;margin:24px;background:#0f172a;color:#e2e8f0}
a{color:#7dd3fc}
h1,h2{font-weight:800}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
figure{margin:0;background:#1e293b;border-radius:12px;overflow:hidden}
img{width:100%;display:block;background:#020617}
figcaption{padding:8px 10px;font-size:12px}
</style></head><body>${body}</body></html>`
}

await fs.writeFile(path.join(CONTACT, 'index.html'), page('Phase 8 contact sheets', `
<h1>First Year Phase 8 contact sheets</h1>
<p>${inventory.subjects} subjects · ${files.length} captured frames</p>
<h2>Families</h2>
<ul>${Object.keys(familySheets).map((fam) => `<li><a href="family-${fam.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html">${fam}</a></li>`).join('')}</ul>
<h2>Subjects</h2>
<ul>${inventory.subjectsDetail.map((subject) => `<li><a href="${subject.id}.html">${subject.title} (${subject.code})</a></li>`).join('')}</ul>
`))

for (const [fam, subjects] of Object.entries(familySheets)) {
  const images = subjects.flatMap((subject) => (bySubject[subject.id] || []).filter((name) => name.includes('__s1') || name.includes('anim-')).slice(0, 8).map((file) => ({ file, id: subject.id })))
  await fs.writeFile(path.join(CONTACT, `family-${fam.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html`), page(fam, `<p><a href="index.html">All sheets</a></p><h1>${fam}</h1><div class="grid">${images.map((row) => `<figure><img src="${row.file}" alt=""><figcaption>${row.id}<br>${row.file}</figcaption></figure>`).join('')}</div>`))
}

for (const subject of inventory.subjectsDetail) {
  const images = bySubject[subject.id] || []
  const bySegment = {}
  for (const segment of subject.segments) {
    bySegment[segment.id] = images.filter((name) => name.includes(`__${segment.id}__`))
  }
  const segmentNav = subject.segments.map((segment) => `<li><a href="${subject.id}__${segment.id}.html">${segment.id}: ${segment.title} (${segment.slides} slides)</a></li>`).join('')
  await fs.writeFile(path.join(CONTACT, `${subject.id}.html`), page(subject.title, `<p><a href="index.html">All sheets</a></p><h1>${subject.title}</h1><p>${subject.code} · ${images.length} frames · ${subject.segments.length} segments</p><h2>Segments</h2><ul>${segmentNav}</ul><div class="grid">${images.map((file) => `<figure><img src="${file}" alt=""><figcaption>${file}</figcaption></figure>`).join('')}</div>`))
  for (const segment of subject.segments) {
    const segImages = bySegment[segment.id]
    await fs.writeFile(path.join(CONTACT, `${subject.id}__${segment.id}.html`), page(`${subject.title} / ${segment.id}`, `<p><a href="${subject.id}.html">${subject.title}</a> · <a href="index.html">All sheets</a></p><h1>${segment.title}</h1><p>${segment.id} · ${segment.slides} web slides · ${segImages.length} captured frames</p><div class="grid">${segImages.map((file) => `<figure><img src="${file}" alt=""><figcaption>${file}</figcaption></figure>`).join('') || '<p>Opening-frame capture for this segment is on the subject sheet.</p>'}</div>`))
  }
}

console.log(JSON.stringify({ sheets: files.length, subjects: inventory.subjects, index: path.join(CONTACT, 'index.html') }, null, 2))
