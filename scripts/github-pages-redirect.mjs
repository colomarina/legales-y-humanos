import { mkdirSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const OUT_DIR = 'dist-github-pages'

const { SITE_URL } = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)

const page = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Legales y Humanos</title>
  <link rel="canonical" href="${SITE_URL}">
  <meta http-equiv="refresh" content="0; url=${SITE_URL}">
  <script>location.replace(${JSON.stringify(SITE_URL)} + location.hash)</script>
</head>
<body>
  <p>La web de Legales y Humanos ahora está en <a href="${SITE_URL}">${SITE_URL}</a>.</p>
</body>
</html>
`

mkdirSync(OUT_DIR, { recursive: true })
for (const file of ['index.html', '404.html']) writeFileSync(`${OUT_DIR}/${file}`, page)
