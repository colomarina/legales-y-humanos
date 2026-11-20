# Base técnica de SEO y GEO — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que Google y los bots de IA reciban la página ya armada, con datos estructurados, robots, sitemap, vista previa al compartir, título y descripción pensados para búsquedas, y una sección de preguntas frecuentes.

**Architecture:**
- El build pasa a tener tres pasos: el build normal del cliente, un build SSR de `src/entry-server.tsx` y `scripts/prerender.mjs`, que escribe en `dist/index.html` el HTML de la app y las etiquetas del `<head>`, y genera `robots.txt` y `sitemap.xml`.
- El cliente hidrata ese HTML con `hydrateRoot`. En dev, el `#root` llega vacío y se sigue usando `createRoot`.
- Todas las URL absolutas salen de una sola constante, `SITE_URL`. El `base` de Vite se deriva de ella, así que el día que se pase al dominio se cambia una sola línea.
- Los datos estructurados y el `<head>` se arman en `src/seo/`, a partir del contenido de `src/content/site.ts`, sin repetir datos.

**Tech Stack:** Vite 8, React 19 (`react-dom/server`), TypeScript, Node 22. Verificación con `scripts/check-seo.mjs` (nuevo, sin dependencias) sobre `dist/`, y con `../herramientas/smoke.mjs` (Playwright con el Chrome instalado) para hidratación y para las capturas.

**Spec:** Las tareas 1 a 6 de la fase "Base técnica" de la Hoja de ruta LyH (https://claude.ai/artifact/UxJBNGTj7zm1Geny8CEdVx). Los datos del estudio salen de las respuestas que ellas cargaron ahí y se copian textuales en este plan.

## Global Constraints

- `CLAUDE.md`: **no se escriben comentarios** en el código, salvo directivas de herramientas. Si un archivo que se toca tiene comentarios en las líneas modificadas, se borran.
- Commits en español, con título en infinitivo o imperativo. **Sin `Co-Authored-By`, sin `Claude-Session` y sin "Generated with Claude Code".** El autor es Lucas Marina.
- Se trabaja en la rama `feat/base-tecnica-seo`, creada desde `main`. **No se pushea**: un push a `main` publica en GitHub Pages. Se pushea solo si Lucas lo pide.
- No se cambia ningún texto visible que ellas aprobaron. Lo único visible que se suma es la sección de preguntas, con sus textos tal cual los mandaron.
- `SITE_URL = 'https://colomarina.github.io/legales-y-humanos/'` hasta la mudanza a `legalesyhumanos.com.ar`, que es otra tarea de la hoja de ruta.
- Toda UI nueva se diseña y se muestra en mobile, tablet y desktop: 390×844, 820×1180 y 1440×900.
- Cada task termina con `pnpm build && pnpm check:seo` en verde.

## Datos del estudio (fuente: Hoja de ruta)

| Dato | Valor |
|---|---|
| Nombre comercial / legal | Legales y Humanos / Bogarsukoff & Baldaro Asoc. |
| Dirección | Calle 49 n° 876, piso 4, oficinas B y C · La Plata · Buenos Aires · AR |
| Coordenadas (del embed de Maps) | -34.9194354, -57.9585038 |
| Ficha de Maps | https://maps.app.goo.gl/DiwHJk4yerCjXsSj6 |
| Horario | lunes a viernes, 08:30–16:00 |
| Zona | La Plata presencial; todo el país por videollamada |
| Fundación | 2024 |
| Brenda Bogarsukoff | Abogada · T° 63 F° 186 CALP (Colegio de Abogados de La Plata) |
| Antonella Baldaro | Profesional de Recursos Humanos |
| Teléfonos, mails, Instagram | los de `contactChannels` y `contacto.social` en `site.ts` |

## Review Focus

1. **Hidratación con diferencias.** Si el HTML del servidor no coincide con el primer render del cliente, React lo descarta y lo vuelve a armar, o deja la consola llena de errores. `smoke.mjs` contra `pnpm preview` no tiene que mostrar errores de consola en ningún viewport (Task 1).
2. **Rutas bajo `/legales-y-humanos/`.** Las imágenes y el CSS del HTML prerenderizado tienen que llevar el `base`. `check-seo` verifica que todo `src=` que no sea `data:` empiece con `/legales-y-humanos/` (Task 1).
3. **JSON-LD con `&` y `<`.** "Bogarsukoff & Baldaro" no puede romper el JSON ni cerrar el `<script>`. `check-seo` hace `JSON.parse` del bloque y compara `legalName` (Task 3).
4. **Respuestas plegadas.** Las respuestas de un `<details>` cerrado tienen que estar igual en el HTML. `check-seo` busca las 12 respuestas en `dist/index.html` (Task 6).
5. **Cambio de dominio.** Toda URL absoluta (canonical, og, sitemap, robots, JSON-LD) tiene que empezar con `SITE_URL`. `check-seo` busca cualquier `https://colomarina` o `legalesyhumanos.com.ar` que no salga de `SITE_URL` (Tasks 2–4).

---

### Task 1: Generar la página ya armada al compilar

**Files:**
- Create: `src/content/siteUrl.ts`, `src/entry-server.tsx`, `scripts/prerender.mjs`, `scripts/check-seo.mjs`
- Modify: `vite.config.ts`, `src/main.tsx`, `package.json`, `.gitignore`, `.github/workflows/deploy.yml`

**Interfaces:**
- Produces:
  - `export const SITE_URL: string` en `src/content/siteUrl.ts`. Termina en `/` y no importa nada: lo carga `vite.config.ts`, donde no existe `import.meta.env`.
  - `export function render(): string` en `src/entry-server.tsx`, con `renderToString(<StrictMode><App /></StrictMode>)`.
  - `scripts/prerender.mjs` importa `dist-server/entry-server.js` y reemplaza `<div id="root"></div>` en `dist/index.html` por `<div id="root">${render()}</div>`. Las tasks 2 a 4 le suman pasos.
  - `scripts/check-seo.mjs` lee `dist/`, junta resultados con `check(nombre, ok, detalle)` como `visual-check.mjs`, imprime los FAIL y sale con código 1 si hay alguno. Cada task le suma chequeos.

- [ ] **Step 1: Crear la rama**

```bash
git switch -c feat/base-tecnica-seo
```

- [ ] **Step 2: Escribir `scripts/check-seo.mjs` con los primeros chequeos y sumar `"check:seo": "node scripts/check-seo.mjs"` a `package.json`**

Chequeos:
- `dist/index.html` contiene `Las profesionales detrás de`, `Gestión de Recursos Humanos` y `Derecho Sucesorio`.
- Todo atributo `src="..."` del HTML que no empiece con `data:` ni `https:` empieza con `/legales-y-humanos/`.

- [ ] **Step 3: Correrlo para verlo fallar**

Run: `pnpm build && pnpm check:seo`
Expected: FAIL en los tres textos, porque hoy `#root` llega vacío.

- [ ] **Step 4: Implementar**

- `vite.config.ts`: `base: new URL(SITE_URL).pathname`. Se borran los tres comentarios.
- `src/main.tsx`: si `container.hasChildNodes()`, usar `hydrateRoot(container, app)`; si no, `createRoot(container).render(app)`. Se borra el comentario de los estilos y el import queda en el mismo orden.
- `package.json`: `"build": "tsc --noEmit && vite build && vite build --ssr src/entry-server.tsx --outDir dist-server && node scripts/prerender.mjs"`.
- `.gitignore`: sumar `dist-server`.
- `deploy.yml`: después de `pnpm build`, un paso `- run: pnpm check:seo`. Se borra el comentario `# Incluye typecheck…`.

- [ ] **Step 5: Correr los chequeos**

Run: `pnpm build && pnpm check:seo`
Expected: todo PASS.

- [ ] **Step 6: Revisar la hidratación en el navegador**

Run: `pnpm preview --port 4179 --strictPort` en segundo plano, y después `node ../herramientas/smoke.mjs`
Expected: ningún `console:` con errores, en especial nada de "Hydration" ni "did not match". Si aparece, se corrige el componente para que el primer render no dependa de `window`, en lugar de silenciar el error.

- [ ] **Step 7: Commit**

```bash
git add src/content/siteUrl.ts src/entry-server.tsx src/main.tsx scripts package.json vite.config.ts .gitignore .github/workflows/deploy.yml
git commit -m "Generar el HTML de la página al compilar" -m "Hoy el HTML llega vacío y lo arma JavaScript: Google lo lee tarde y la mayoría de los bots de IA no lo leen. El cliente ahora hidrata el HTML ya armado."
```

---

### Task 2: Agregar robots.txt y sitemap.xml

**Files:**
- Modify: `src/entry-server.tsx`, `scripts/prerender.mjs`, `scripts/check-seo.mjs`

**Interfaces:**
- Consumes: `SITE_URL`. `prerender.mjs` la obtiene de `dist-server/entry-server.js`, así que `entry-server.tsx` pasa a hacer `export { SITE_URL } from './content/siteUrl'`.

- [ ] **Step 1: Sumar los chequeos**

- `dist/robots.txt` existe y contiene `User-agent: *`, `Allow: /` y `Sitemap: ${SITE_URL}sitemap.xml`.
- `dist/sitemap.xml` tiene un solo `<url>` con `<loc>${SITE_URL}</loc>` y `<lastmod>` con la fecha del build en formato `AAAA-MM-DD`.

- [ ] **Step 2: Correr para ver FAIL**

Run: `pnpm build && pnpm check:seo`
Expected: FAIL en los chequeos de robots y sitemap.

- [ ] **Step 3: Generar los dos archivos en `prerender.mjs`** a partir de `SITE_URL`. No se crean archivos en `public/`, porque ahí la URL quedaría escrita a mano.

- [ ] **Step 4: Correr para ver PASS**

- [ ] **Step 5: Commit** — `git commit -m "Generar robots.txt y sitemap.xml desde la URL del sitio"`

Nota para la descripción del PR: en GitHub Pages, el `robots.txt` queda en `/legales-y-humanos/robots.txt` y Google no lo lee ahí. Empieza a contar cuando la web esté en el dominio. El sitemap sí se puede cargar a mano en Search Console.

---

### Task 3: Agregar los datos estructurados del estudio

**Files:**
- Create: `src/seo/structuredData.ts`
- Modify: `src/content/site.ts`, `src/entry-server.tsx`, `scripts/prerender.mjs`, `scripts/check-seo.mjs`

**Interfaces:**
- Consumes: `SITE_URL`, y de `site.ts`: `brand`, `nosotras.profiles`, `empresas.services`, `particulares.services`, `contactChannels`, `contacto.address` y `contacto.social`.
- Produces:
  - En `site.ts`: `export const estudio = { foundingYear: '2024', openingHours: { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:30', closes: '16:00' }, geo: { latitude: -34.9194354, longitude: -57.9585038 }, address: { street: 'Calle 49 n° 876, piso 4, oficinas B y C', locality: 'La Plata', region: 'Buenos Aires', country: 'AR' } } as const`.
  - En `Profile` se suma `credential?: string`; Brenda lleva `'T° 63 F° 186 CALP'`.
  - `export function buildStructuredData(faq?: FaqGroup[]): object` en `src/seo/structuredData.ts`. Devuelve `{ '@context': 'https://schema.org', '@graph': [...] }`. La Task 6 le pasa `faq`.
  - `export function jsonLdScript(data: object): string` devuelve `<script type="application/ld+json">…</script>` con `JSON.stringify(data).replace(/</g, '\\u003c')`.
  - `entry-server.tsx` exporta `structuredDataScript(): string`.

Contenido del `@graph`:
- `ProfessionalService` y `LegalService` (como `@type: ['ProfessionalService','LegalService']`), con `@id: ${SITE_URL}#estudio`. Lleva `name`, `legalName`, `url`, `image` (la foto del estudio), `telephone` (los dos), `email` (los dos), `address` (`PostalAddress`), `geo`, `hasMap`, `openingHoursSpecification`, `foundingDate`, `sameAs` (Instagram ×2 y Maps), `areaServed` (`City` La Plata y `Country` Argentina), `employee` (las dos `Person`) y `hasOfferCatalog` con los 8 servicios. Se excluye "Consultar por otras ramas del Derecho".
- `Person` para Brenda: `jobTitle: 'Abogada'` y `hasCredential` (`EducationalOccupationalCredential`, `credentialCategory: 'Matrícula profesional'`, `name: 'T° 63 F° 186 CALP'`, `recognizedBy`: `Organization` "Colegio de Abogados de La Plata").
- `Person` para Antonella: `jobTitle: 'Profesional de Recursos Humanos'`.
- `WebSite` con `url: SITE_URL`, `inLanguage: 'es-AR'` y `publisher: { '@id': …#estudio }`.

- [ ] **Step 1: Sumar los chequeos**

- Hay exactamente un `<script type="application/ld+json">` en el `<head>`, y su contenido pasa `JSON.parse`.
- El nodo del estudio tiene `legalName === 'Bogarsukoff & Baldaro Asoc.'`, `foundingDate === '2024'`, `openingHoursSpecification[0].opens === '08:30'` y `address.addressLocality === 'La Plata'`.
- Hay una `Person` con `hasCredential.name === 'T° 63 F° 186 CALP'`.
- Toda URL del JSON que empiece con `https://colomarina` o con `https://legalesyhumanos` empieza con `SITE_URL`.

- [ ] **Step 2: Correr para ver FAIL**

- [ ] **Step 3: Implementar**: el builder, el export en `entry-server` y la inyección antes de `</head>` en `prerender.mjs`.

- [ ] **Step 4: Correr para ver PASS** y pegar el JSON en https://validator.schema.org/ para confirmar que no tiene errores. Lo hace Lucas a mano; no es parte del script.

- [ ] **Step 5: Commit** — `git commit -m "Sumar los datos estructurados del estudio"`

---

### Task 4: Imagen y textos para cuando se comparte el link

**Files:**
- Create: `public/og-imagen.jpg`, `src/seo/head.ts`
- Modify: `index.html`, `src/content/site.ts`, `src/entry-server.tsx`, `scripts/prerender.mjs`, `scripts/check-seo.mjs`

**Interfaces:**
- Produces:
  - `export const seo = { title: string, description: string, image: { path: 'og-imagen.jpg', width: 1200, height: 630, alt: string } }` en `site.ts`. Los valores de `title` y `description` se definen en la Task 5; acá se usan los actuales.
  - `export function renderHead(): string` en `src/seo/head.ts`. Arma `<title>`, `meta description`, `link rel="canonical"`, `og:type`, `og:site_name`, `og:locale` (`es_AR`), `og:url`, `og:title`, `og:description`, `og:image` (absoluta), `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description` y `twitter:image`. Todas las URL salen de `SITE_URL`.
  - `prerender.mjs` reemplaza el `<title>…</title>` de `index.html` por `renderHead()`.

- [ ] **Step 1: Sumar los chequeos**

- `dist/og-imagen.jpg` existe, y sus bytes 0–1 son `FF D8` (es JPEG).
- Hay un solo `<title>`, y `og:image` es `${SITE_URL}og-imagen.jpg`.
- `canonical` y `og:url` son `SITE_URL`.
- No queda ningún `icono-512.png` en las metas `og:`.

- [ ] **Step 2: Correr para ver FAIL**

- [ ] **Step 3: Crear la imagen** a partir de la foto ancha del estudio, recortada al centro:

```bash
ffmpeg -i public/fotos/estudio-ancho-1920.webp -vf "scale=1200:-2,crop=1200:630" -q:v 3 public/og-imagen.jpg
```

Se mira la imagen antes de seguir. El logo de la pared tiene que verse. Si el recorte lo corta, se ajusta el `crop` con un `y` explícito.

- [ ] **Step 4: Implementar `renderHead()`.** De `index.html` se borran las metas `description` y `og:*`, junto con su comentario. Se dejan `charset`, `viewport`, `theme-color`, los íconos, las fuentes y `<title>Legales y Humanos</title>`, que en dev queda como título de la pestaña.

- [ ] **Step 5: Correr para ver PASS**

- [ ] **Step 6: Commit** — `git commit -m "Mostrar una foto del estudio al compartir el link"`

---

### Task 5: Ajustar título y descripción para búsquedas

**Files:**
- Modify: `src/content/site.ts` (`seo`), `scripts/check-seo.mjs`

Valores exactos. Salen de las búsquedas que ellas cargaron en la hoja de ruta:
- `title`: `Legales y Humanos · Consultora de RRHH y jurídica en La Plata` (61 caracteres).
- `description`: `Recursos Humanos y asesoramiento jurídico laboral para empresas y pymes en La Plata. Selección de personal, derecho laboral, sucesiones y previsional.` (149 caracteres).
- `image.alt`: `Sala de reuniones de Legales y Humanos en La Plata, con el logo de Bogarsukoff & Baldaro en la pared`.

Los encabezados visibles (h1 "Legales y Humanos" y los h2 de cada sección) **no se tocan**: son textos que ellas aprobaron. Si conviene cambiar alguno, se arma una propuesta para que ellas la aprueben, como tarea aparte.

- [ ] **Step 1: Sumar los chequeos**: `title` entre 30 y 65 caracteres y con `La Plata`; `description` entre 120 y 160 caracteres y con `La Plata`; `og:title === <title>`; `og:description === description`.
- [ ] **Step 2: Correr para ver FAIL**
- [ ] **Step 3: Cargar los valores**
- [ ] **Step 4: Correr para ver PASS**
- [ ] **Step 5: Commit** — `git commit -m "Nombrar en el título lo que busca la gente en La Plata"`

---

### Task 6: Sección de preguntas frecuentes

**Files:**
- Create: `src/components/sections/Preguntas.tsx`, `src/components/sections/Preguntas.css`
- Modify: `src/content/site.ts`, `src/App.tsx`, `src/seo/structuredData.ts`, `src/entry-server.tsx`, `scripts/check-seo.mjs`, `../herramientas/smoke.mjs`

**Interfaces:**
- Produces, en `site.ts`:
  - `export interface FaqItem { question: string; answer: string }`
  - `export interface FaqGroup { id: ContactChannel['id']; tone: Discipline; label: string; items: FaqItem[] }`
  - `export const preguntas = { number: '05 — Preguntas frecuentes', title: 'Lo que más', titleAccent: 'nos preguntan.', groups: FaqGroup[] }`, con Empresas (`tone: 'rrhh'`, 7 preguntas) y Particulares (`tone: 'juridico'`, 5 preguntas). Los textos se copian **textuales** del campo `answer` del ítem `faq-seccion` de la hoja de ruta.
  - `contacto.number` pasa a `'06 — Contacto'`.
  - En `mobileNavLinks` se suma `{ label: 'Preguntas frecuentes', href: '#preguntas' }` antes de Contacto. La navegación de escritorio no cambia.
- Consumes: `buildStructuredData(preguntas.groups)` suma al `@graph` un `FAQPage` con las 12 preguntas (`Question` con `acceptedAnswer` de tipo `Answer`).

Diseño:
- `<section className="section preguntas plane--paper" id="preguntas">`, entre `<OfficeTour />` y `<Contacto />`, con `SectionIntro` arriba.
- Dos grupos, uno por público. Cada uno lleva un título con su raya de color (beige Empresas, azul Particulares, según el código de color de `CLAUDE.md`) y una lista de `<details>`/`<summary>` nativos, sin estado de React. Así las respuestas están en el HTML aunque estén cerradas, funcionan sin JavaScript y el teclado anda solo.
- En mobile y tablet vertical, los grupos van uno debajo del otro. Desde 1024 px van en dos columnas. El ícono `+` de cada pregunta rota a `×` al abrirla y respeta `prefers-reduced-motion`.
- El texto de las respuestas usa `--lh-ink` sobre papel. No se suman colores nuevos a `tokens.css`.
- Cada `summary` tiene un alto táctil de al menos 44 px.

- [ ] **Step 1: Sumar los chequeos**

En `check-seo`:
- Las 12 preguntas y las 12 respuestas están en `dist/index.html`.
- El JSON-LD tiene un `FAQPage` con 12 `mainEntity`.

En `smoke.mjs`, en 390×844, 820×1180 y 1440×900:
- `#preguntas` existe.
- Al hacer clic en el primer `summary`, su `details` queda `open`.
- No hay desborde horizontal: `scrollWidth <= innerWidth`.
- Cada `summary` mide al menos 44 px de alto.
- Se guarda una captura de la sección en cada viewport.

- [ ] **Step 2: Correr para ver FAIL**
- [ ] **Step 3: Implementar el contenido, el componente, el CSS y el `FAQPage`**
- [ ] **Step 4: Correr `pnpm build && pnpm check:seo` y `smoke.mjs` contra `pnpm preview`, y ver PASS**
- [ ] **Step 5: Mostrarle a Lucas las capturas de los tres viewports y esperar el OK antes del commit.** Si hay cambios de diseño, se ajusta y se vuelve al Step 4.
- [ ] **Step 6: Commit** — `git commit -m "Sumar la sección de preguntas frecuentes" -m "Los textos son los que mandó Antonella. Google ya no muestra el desplegable de FAQ para estudios, pero las IA sí leen y citan estas respuestas."`

---

## Cierre

- `pnpm build && pnpm check:seo` en verde, y `smoke.mjs` sin errores.
- Revisión de toda la rama antes de proponer el merge.
- En la Hoja de ruta, las 6 tareas de "Base técnica" pasan a **Listo** cuando la rama se mergea a `main`, no antes.

## Fuera de alcance

- Mostrar en la web el horario y la matrícula de Brenda. Quedan en los datos estructurados; mostrarlos es un cambio visual que tienen que aprobar ellas.
- Cambiar los encabezados visibles.
- `llms.txt` y las páginas por servicio, que son de la fase 6.
- La mudanza a `legalesyhumanos.com.ar`. Con este plan alcanza con cambiar `SITE_URL`.
