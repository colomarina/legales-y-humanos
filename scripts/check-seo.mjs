import { existsSync, readFileSync } from 'node:fs'

const BASE_PATH = '/legales-y-humanos/'
const html = readFileSync('dist/index.html', 'utf8')
const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

for (const text of ['Las profesionales detrás de', 'Gestión de Recursos Humanos', 'Derecho Sucesorio']) {
  check(`HTML prerenderizado contiene «${text}»`, html.includes(text))
}

const localSources = [...html.matchAll(/\ssrc="([^"]+)"/g)]
  .map(([, src]) => src)
  .filter((src) => !src.startsWith('data:') && !src.startsWith('https:'))
const outsideBase = localSources.filter((src) => !src.startsWith(BASE_PATH))
check('Todo src local lleva el base', outsideBase.length === 0, outsideBase.join(', '))

const failed = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  → ${r.detail}`}`)
console.log(`\n${results.length - failed.length}/${results.length} PASS`)
if (failed.length > 0 || !existsSync('dist/index.html')) process.exit(1)
