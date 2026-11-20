import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const INDEX = 'dist/index.html'
const EMPTY_ROOT = '<div id="root"></div>'
const HEAD_END = '</head>'
const TITLE = /<title>[^<]*<\/title>/

const server = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)
const template = readFileSync(INDEX, 'utf8')

for (const [label, found] of [
  [EMPTY_ROOT, template.includes(EMPTY_ROOT)],
  [HEAD_END, template.includes(HEAD_END)],
  ['<title>', TITLE.test(template)],
]) {
  if (!found) throw new Error(`${INDEX} no tiene ${label}`)
}

const page = template
  .replace(TITLE, () => server.renderHead())
  .replace(HEAD_END, () => `  ${server.structuredDataScript()}\n  ${HEAD_END}`)
  .replace(EMPTY_ROOT, () => `<div id="root">${server.render()}</div>`)
writeFileSync(INDEX, page)

const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${server.SITE_URL}sitemap.xml`, ''].join('\n')
writeFileSync('dist/robots.txt', robots)

const buildDate = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <url><loc>${server.SITE_URL}</loc><lastmod>${buildDate}</lastmod></url>`,
  '</urlset>',
  '',
].join('\n')
writeFileSync('dist/sitemap.xml', sitemap)
