// Derive the landing syllabus from the authoritative curriculum at build time.
// Only marketing metadata ships on the landing page, not every lesson body.
import { build } from 'esbuild'
import { mkdir, mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const temporary = await mkdtemp(path.join(tmpdir(), 'course-manifest-'))
try {
  const outfile = path.join(temporary, 'curriculum.mjs')
  await build({entryPoints:['src/bitcoin-core-curriculum-player-en-data.ts'], outfile, bundle:true, platform:'node', format:'esm', logLevel:'silent'})
  const source = await import(pathToFileURL(outfile).href)
  const phases = source.curriculumPhases.map(phase => ({...phase, lessons:phase.lessons.map(lesson=>({
    id:lesson.id, slug:lesson.slug, title:lesson.title, chapter:lesson.chapter, optional:!!lesson.optional,
    status:lesson.status, estimatedTime:lesson.estimatedTime, available:source.isAvailableLesson(lesson),
    ...(lesson.id===source.curriculumLessons[0].lesson.id ? {explanation:[lesson.explanation?.[0]],checklist:lesson.checklist} : {})
  }))}))
  await mkdir('.cache',{recursive:true})
  await writeFile('.cache/course-manifest.json',JSON.stringify({phases,aliases:source.legacyEnglishLessonSlugAliases}))
  console.log(`Prepared course metadata for ${phases.flatMap(p=>p.lessons).length} lessons.`)
} finally { await rm(temporary,{recursive:true,force:true}) }
