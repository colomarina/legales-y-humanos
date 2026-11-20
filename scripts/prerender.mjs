import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const INDEX = 'dist/index.html'
const EMPTY_ROOT = '<div id="root"></div>'

const server = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)
const template = readFileSync(INDEX, 'utf8')
if (!template.includes(EMPTY_ROOT)) throw new Error(`${INDEX} no tiene ${EMPTY_ROOT}`)

writeFileSync(INDEX, template.replace(EMPTY_ROOT, `<div id="root">${server.render()}</div>`))
