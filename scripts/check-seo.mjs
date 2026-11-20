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

const head = html.slice(0, html.indexOf('</head>'))
const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => json)
const jsonLdInHead = [...head.matchAll(/<script type="application\/ld\+json">/g)].length
check('Un solo bloque JSON-LD, en el head', jsonLdBlocks.length === 1 && jsonLdInHead === 1, `${jsonLdBlocks.length} en total, ${jsonLdInHead} en el head`)

let graph = []
try {
  graph = JSON.parse(jsonLdBlocks[0] ?? 'null')?.['@graph'] ?? []
  check('El JSON-LD se puede leer', graph.length > 0)
} catch (error) {
  check('El JSON-LD se puede leer', false, error.message)
}

const types = (node) => [node['@type']].flat()
const estudio = graph.find((node) => types(node).includes('LegalService')) ?? {}
check('Estudio con nombre legal exacto', estudio.legalName === 'Bogarsukoff & Baldaro Asoc.', estudio.legalName)
check('Estudio fundado en 2024', estudio.foundingDate === '2024', estudio.foundingDate)
check('Estudio abre a las 08:30', estudio.openingHoursSpecification?.[0]?.opens === '08:30', JSON.stringify(estudio.openingHoursSpecification))
check('Estudio en La Plata', estudio.address?.addressLocality === 'La Plata', JSON.stringify(estudio.address))

const people = [...graph, ...(estudio.employee ?? [])].filter((node) => types(node).includes('Person'))
check('Brenda con su matrícula', people.some((p) => p.hasCredential?.name === 'T° 63 F° 186 CALP'), people.map((p) => p.name).join(', '))

const ownUrls = [...JSON.stringify(graph).matchAll(/https:\/\/(?:colomarina|legalesyhumanos)[^"]*/g)].map(([url]) => url)
const foreignOwnUrls = ownUrls.filter((url) => !url.startsWith(SITE_URL))
check('URLs propias del JSON-LD salen de SITE_URL', foreignOwnUrls.length === 0, foreignOwnUrls.join(', '))

const ogImagePath = 'dist/og-imagen.jpg'
const ogImageBytes = existsSync(ogImagePath) ? readFileSync(ogImagePath) : Buffer.alloc(0)
check('og-imagen.jpg es un JPEG', ogImageBytes[0] === 0xff && ogImageBytes[1] === 0xd8)

const meta = (attr, key) => head.match(new RegExp(`<meta ${attr}="${key.replace(/[.+]/g, '\\$&')}" content="([^"]*)"`))?.[1]
const titles = [...head.matchAll(/<title>([^<]*)<\/title>/g)].map(([, t]) => t)
check('Un solo <title>', titles.length === 1, titles.join(' | '))
check('og:image apunta a la foto del estudio', meta('property', 'og:image') === `${SITE_URL}og-imagen.jpg`, meta('property', 'og:image'))
check('og:image declara 1200×630', meta('property', 'og:image:width') === '1200' && meta('property', 'og:image:height') === '630')
check('twitter:card con imagen grande', meta('name', 'twitter:card') === 'summary_large_image', meta('name', 'twitter:card'))
const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
check('canonical es SITE_URL', canonical === SITE_URL, canonical)
check('og:url es SITE_URL', meta('property', 'og:url') === SITE_URL, meta('property', 'og:url'))
check('Ya no se comparte el ícono', !/og:image[^>]*icono-512/.test(head))

const headUrls = [...head.matchAll(/https:\/\/(?:colomarina|legalesyhumanos)[^"]*/g)].map(([url]) => url)
const foreignHeadUrls = headUrls.filter((url) => !url.startsWith(SITE_URL))
check('URLs propias del head salen de SITE_URL', foreignHeadUrls.length === 0, foreignHeadUrls.join(', '))

const decode = (text = '') => text.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
const title = decode(titles[0])
const description = decode(meta('name', 'description'))
check('Título de 30 a 65 caracteres', title.length >= 30 && title.length <= 65, `${title.length}: ${title}`)
check('Título nombra La Plata', title.includes('La Plata'), title)
check('Descripción de 120 a 160 caracteres', description.length >= 120 && description.length <= 160, `${description.length}: ${description}`)
check('Descripción nombra La Plata', description.includes('La Plata'), description)
check('og:title igual al título', decode(meta('property', 'og:title')) === title)
check('og:description igual a la descripción', decode(meta('property', 'og:description')) === description)

const faqPage = graph.find((node) => types(node).includes('FAQPage'))
const faqEntries = faqPage?.mainEntity ?? []
check('FAQPage con 12 preguntas', faqEntries.length === 12, String(faqEntries.length))
check('FAQPage incluye una pregunta textual de Anto', faqEntries.some((q) => q.name === '¿Pueden trabajar como departamento externo de Recursos Humanos?'))

const body = decode(html.slice(html.indexOf('<body')).replace(/&#x27;/g, "'"))
const missingFaqTexts = faqEntries
  .flatMap((q) => [q.name, q.acceptedAnswer?.text])
  .filter((text) => !text || !body.includes(text))
check('Las 12 preguntas y respuestas están en el HTML', faqEntries.length > 0 && missingFaqTexts.length === 0, missingFaqTexts.slice(0, 2).join(' | '))

const failed = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  → ${r.detail}`}`)
console.log(`\n${results.length - failed.length}/${results.length} PASS`)
if (failed.length > 0 || !existsSync('dist/index.html')) process.exit(1)
