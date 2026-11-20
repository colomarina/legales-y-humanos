import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const server = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)
const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

check('entry-server exporta SITE_URL', typeof server.SITE_URL === 'string', String(server.SITE_URL))
const SITE_URL = server.SITE_URL ?? 'https://sin-site-url.invalid/'
const BASE_PATH = new URL(SITE_URL).pathname
const readDist = (file) => (existsSync(`dist/${file}`) ? readFileSync(`dist/${file}`, 'utf8') : '')
const html = readFileSync('dist/index.html', 'utf8')

for (const text of ['Las profesionales detrás de', 'Gestión de Recursos Humanos', 'Derecho Sucesorio']) {
  check(`HTML prerenderizado contiene «${text}»`, html.includes(text))
}

const localSources = [...html.matchAll(/\ssrc="([^"]+)"/g)]
  .map(([, src]) => src)
  .filter((src) => !src.startsWith('data:') && !src.startsWith('https:'))
const outsideBase = localSources.filter((src) => !src.startsWith(BASE_PATH))
check('Todo src local lleva el base', outsideBase.length === 0, outsideBase.join(', '))

const robots = readDist('robots.txt')
check('robots.txt permite todo', robots.includes('User-agent: *') && robots.includes('Allow: /'), robots)
check('robots.txt apunta al sitemap', robots.includes(`Sitemap: ${SITE_URL}sitemap.xml`), robots)

const sitemap = readDist('sitemap.xml')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc)
check('sitemap.xml tiene solo la home', locs.length === 1 && locs[0] === SITE_URL, locs.join(', '))
const today = new Date().toISOString().slice(0, 10)
check('sitemap.xml lleva la fecha del build', sitemap.includes(`<lastmod>${today}</lastmod>`), sitemap)

const failed = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  → ${r.detail}`}`)
console.log(`\n${results.length - failed.length}/${results.length} PASS`)
if (failed.length > 0 || !existsSync('dist/index.html')) process.exit(1)
