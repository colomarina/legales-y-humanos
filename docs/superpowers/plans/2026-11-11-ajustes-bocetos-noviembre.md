# Ajustes de bocetos de noviembre — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Acercar la rama `feat/bocetos-noviembre` a los bocetos `cambio-1..4.jpeg` y corregir los desbalances detectados en Hero, Nosotras y Método.

**Architecture:** Cambios de CSS sobre los componentes existentes, más una prop nueva en `SectionIntro` y tres tokens nuevos en `tokens.css`. No hay lógica nueva. La verificación es visual y medible: un script de Playwright mide posiciones y estilos computados en 5 resoluciones.

**Tech Stack:** Vite 8, React 19, TypeScript, CSS plano con tokens `--lh-*`. Verificación con `playwright-core` global (`@playwright/cli`) usando el Chrome instalado.

**Spec:** Reporte de comparación de esta sesión, más estas decisiones de la usuaria:
- Las fotos reales de la rama quedan como están (no se usan las de stock de los bocetos).
- La franja "Asesoramiento claro / Criterio humano" queda a criterio de UX/UI. Decisión: **se saca** (Task 2).
- El círculo del Hero y su aro cobre no tienen que tocar el header.
- Nosotras tiene que quedar centrada.
- En Método se mueve el timeline y los textos de los pasos quedan como están.

## Global Constraints

- `CLAUDE.md`: **sin comentarios en el código**, salvo directivas de herramientas.
- `CLAUDE.md`: los commits van en español, con título en infinitivo o imperativo. **Sin `Co-Authored-By`, sin `Claude-Session`, sin "Generated with Claude Code".**
- Los colores de texto nuevos se verifican por contraste antes de sumarlos a `tokens.css`.
- No se tocan los breakpoints móviles (`max-width: 900px` / `650px`), salvo donde una task lo indique.
- `npm run build` (incluye `tsc --noEmit`) tiene que pasar al final de cada task.

## Verificación (el "test" de este plan)

El repo no tiene tests. La prueba es `../herramientas/visual-check.mjs` (fuera del repo, ya creado). El script recorre 1024×768, 1280×800, 1366×657, 1440×900 y 1920×1080, y escribe una línea PASS o FAIL por chequeo.

Para correrlo hay que tener el dev server levantado (`npx vite --port 5179 --strictPort`):

```bash
node ../herramientas/visual-check.mjs
```

**Línea de base medida hoy: 7/32 OK.** Cada task nombra los chequeos que tiene que pasar de FAIL a PASS sin romper los que ya están en PASS. El objetivo final es 32/32.

## Review Focus

1. **Móvil a 375px:** Hero, Nosotras y Método no cambian de comportamiento debajo de 900px. Se revisa con una captura en cada task que toca esas secciones (paso "Captura móvil").
2. **Hero entre 901 y 1023px:** el círculo sigue siendo absoluto y no tiene que pisar el texto. Se cubre con la captura a 960×700 de la Task 1.
3. **Notebooks de poco alto (1366×657):** el círculo no toca el header. Ya está en el script.
4. **Método con `prefers-reduced-motion`:** la línea sigue terminando en el centro del último marcador. Se revisa emulando `reducedMotion: 'reduce'` en la Task 4.
5. **Nosotras, segundo perfil (retrato a la derecha):** el bloque espejado también queda centrado. El chequeo usa la unión de ambos perfiles.

---

### Task 1: El círculo del Hero no toca el header

Diagnóstico: `.hero__media` toma el tamaño del ancho (`min(56vw, 900px)`) y se centra al 50% del hero sin descontar el header. Medido hoy, el aro invade el header desde 1280px: −2px a 1280, −27px a 1440 y −50px a 1920. A 1920 la foto además queda cortada 6px abajo.

**Files:**
- Modify: `src/components/sections/Hero.css` (`.hero__media`, ~líneas 92-101)

- [ ] **Paso 1: Correr la verificación y confirmar los FAIL de `hero * : aro a ≥16px del header` (1280, 1366, 1440, 1920) y de `hero 1920: foto no cortada abajo`.**
- [ ] **Paso 2: Limitar el tamaño del círculo por alto, en `.hero__media`:**
  - `--hero-media-size: min(56vw, 900px, calc(min(100svh, 860px) - var(--lh-header-h) - 2 * var(--lh-space-lg)))`
  - `width: var(--hero-media-size)`
  - `top: calc(50% + var(--lh-header-h) / 2)` y `transform: translateY(-50%)`
  - `right` queda en `-10vw`. Si a 1920 el hueco entre el texto y el círculo se ve excesivo en la captura, bajar a `-6vw`.
- [ ] **Paso 3: Correr la verificación.** Esperado: PASS en los 5 `aro a ≥16px` y en los 5 `foto no cortada abajo`.
- [ ] **Paso 4: Captura a 960×700 (Review Focus 2) y móvil a 375×812.** Esperado: el círculo no pisa el título ni los botones. En móvil queda igual que antes.
- [ ] **Paso 5: `npm run build` y commit:** `git commit -m "Limitar el circulo del hero al alto disponible bajo el header"`

### Task 2: Sacar la franja "Asesoramiento claro / Criterio humano"

Criterio de UX: repite el rol del eyebrow de arriba ("Consultora jurídica — Recursos Humanos — La Plata"). Encierra el bloque entre dos líneas de kicker que compiten. A 1024×768 cae debajo del pliegue (el hero mide 937px). El boceto no la incluye. Sacarla le da aire al hero y acorta su alto.

**Files:**
- Modify: `src/components/sections/Hero.tsx:56-60` (bloque `.hero__footnotes`)
- Modify: `src/components/sections/Hero.css` (`.hero__footnotes`, `.hero__rule` y la regla dentro de `@media (max-width: 650px)`)
- Modify: `src/content/site.ts:96` (`footnotes`)

- [ ] **Paso 1: Confirmar el FAIL de `hero: sin franja de footnotes`.**
- [ ] **Paso 2: Eliminar el JSX, las reglas CSS y la clave `footnotes` del contenido.** Si `.hero` ya no necesita `justify-content: space-between` porque queda un solo hijo en el flujo, sacarlo también. `tsc` avisa si queda alguna referencia colgada.
- [ ] **Paso 3: Correr la verificación.** Esperado: PASS en `sin franja` y siguen en PASS los chequeos de la Task 1.
- [ ] **Paso 4: `npm run build` y commit:** `git commit -m "Sacar la franja de notas del pie del hero"`

### Task 3: Nosotras centrada

Diagnóstico: el título usa el patrón de dos columnas de `SectionIntro` (numeración a la izquierda, título desplazado) con `max-width: 18ch`, así que ocupa 3 líneas y queda 16px (1440) o 59px (1920) a la izquierda del centro. Los perfiles usan `0.85fr / 1.15fr` con el retrato limitado a 420px y la bio a `--lh-measure`, así que el conjunto queda 78px (1440) o 119px (1920) a la izquierda y con aire muerto a la derecha.

**Files:**
- Modify: `src/components/layout/SectionIntro.tsx` (nueva prop)
- Modify: `src/components/layout/SectionIntro.css` (variante `--center`)
- Modify: `src/components/sections/Nosotras.tsx` (pasar la prop)
- Modify: `src/components/sections/Nosotras.css` (`.nosotras__profiles`, `.profile`, `.profile__portrait`, `.profile__bio`)

**Interfaces:**
- Produces: `SectionIntroProps.align?: 'start' | 'center'` (default `'start'`). `'center'` agrega la clase `section-intro--center`.

- [ ] **Paso 1: Confirmar los FAIL de `nosotras 1440/1920`: título en 2 líneas, título centrado y perfiles centrados.**
- [ ] **Paso 2: Agregar la prop `align` a `SectionIntro` y la variante `.section-intro--center`:**
  - una sola columna
  - la numeración arriba, alineada a la izquierda (como en el boceto)
  - `.section-intro__body` con `text-align: center`
  - el título con `max-width: none` y `margin-inline: auto`
  - la regla con `margin-inline: auto`
- [ ] **Paso 3: Pasar `align="center"` desde `Nosotras.tsx`.**
- [ ] **Paso 4: Centrar los perfiles:**
  - `.nosotras__profiles` con `max-width: 68rem` y `margin-inline: auto`
  - `.profile` con `grid-template-columns: minmax(0, 5fr) minmax(0, 6fr)`. El perfil par (retrato a la derecha) invierte a `6fr 5fr`, para que el retrato siempre ocupe la columna de 5fr.
  - `.profile__portrait` con `max-width: none` desde 901px. El `max-width: 360px` de móvil se mantiene.
  - `.profile__bio` llena su columna (`max-width: none`).
  - El banner "Dos profesiones" queda al ancho completo del container.
- [ ] **Paso 5: Correr la verificación.** Esperado: PASS en los 6 chequeos de `nosotras`. Si `perfiles centrados` sigue fuera de ±24px, bajar `max-width` a `64rem`.
- [ ] **Paso 6: Captura móvil a 375×812.** Esperado: el título centrado se lee bien y los perfiles se apilan como antes, con el retrato arriba.
- [ ] **Paso 7: `npm run build` y commit:** `git commit -m "Centrar el encabezado y los perfiles de Nosotras"`

### Task 4: Método, distribuir el timeline a todo el ancho

Diagnóstico: los 4 pasos son columnas `1fr` con el texto alineado a la izquierda dentro de cada una. El último texto termina 61px (1440) o 97px (1920) antes del borde derecho, y la línea corta en el último marcador, así que el bloque se ve cargado a la izquierda. Se mueven las columnas del timeline y los textos de los pasos no cambian.

**Files:**
- Modify: `src/components/sections/Metodo.css` (`.timeline`, `.timeline::before`, solo fuera del media query de 900px)

- [ ] **Paso 1: Confirmar el FAIL de `metodo 1440/1920: texto del último paso al borde derecho`.**
- [ ] **Paso 2: Pasar el timeline a columnas de ancho fijo repartidas a lo ancho:**
  - `--step-w: 15.5rem`
  - `grid-template-columns: repeat(var(--timeline-cols), minmax(0, var(--step-w)))`
  - `justify-content: space-between`
  - `.timeline::before` con `right: calc(min(var(--step-w), (100% - (var(--timeline-cols) - 1) * var(--timeline-gap)) / var(--timeline-cols)) - var(--marker-size) / 2)`
  - `.timeline__text` mantiene su `max-width: 26ch` y no cambia ningún texto.
- [ ] **Paso 3: Correr la verificación.** Esperado: PASS en los 4 chequeos de `metodo`. Si el borde derecho queda entre 4 y 16px, ajustar `--step-w` en pasos de `0.25rem` hasta entrar en ±4px a 1440 y 1920.
- [ ] **Paso 4: Revisar con reducción de movimiento.** Correr el script con `reducedMotion: 'reduce'` en `newPage`. Esperado: `línea termina en el último marcador` en PASS. Volver a dejar el script como estaba.
- [ ] **Paso 5: Captura móvil a 375×812.** Esperado: el timeline vertical queda igual que antes.
- [ ] **Paso 6: `npm run build` y commit:** `git commit -m "Repartir el timeline del metodo a todo el ancho"`

### Task 5: Título de Empresas en 2 líneas

**Files:**
- Modify: `src/components/layout/SectionIntro.css` (variante `--aside`)

- [ ] **Paso 1: Confirmar los FAIL de `empresas 1280/1366/1440/1920: título en ≤2 líneas` (hoy son 3).**
- [ ] **Paso 2: En `.section-intro--aside`:**
  - `.section-intro__body` con `grid-template-columns: minmax(0, 1fr) minmax(0, 22rem)`
  - `.section-intro__title` con `font-size: clamp(2.5rem, 4vw, 3.75rem)`
- [ ] **Paso 3: Correr la verificación.** Esperado: PASS en los 4. Si falla solo a 1280 o 1366, bajar el término medio del clamp a `3.6vw`.
- [ ] **Paso 4: `npm run build` y commit:** `git commit -m "Ajustar el encabezado de Empresas a dos lineas"`

### Task 6: Títulos de tarjetas más grandes e íconos de Particulares

**Files:**
- Modify: `src/styles/tokens.css` (nuevo token junto a `--lh-display-xs`, línea 56)
- Modify: `src/components/sections/Empresas.css:74` (`.service-card__title`)
- Modify: `src/components/sections/Particulares.css:80` (`.particulares__title`) y `:53-54` (`.particulares__icon`)

**Interfaces:**
- Produces: `--lh-display-card: clamp(1.5rem, 2.4vw, 2.125rem)`

- [ ] **Paso 1: Confirmar los FAIL de `tarjetas empresas/particulares: título 32–36px` (hoy 27.36px) y de `particulares: ícono 76px`.**
- [ ] **Paso 2: Crear el token y usarlo en los dos títulos.** `--lh-display-xs` no se toca, porque lo usan los botones, las bios y el timeline.
- [ ] **Paso 3: `.particulares__icon` a 76×76 y su `.icon` a 34×34.** El override de 650px (56px) se mantiene.
- [ ] **Paso 4: Correr la verificación y sacar una captura de Empresas a 1100px**, el borde donde las tarjetas pasan a una columna. Esperado: PASS en los 3, y ningún título choca con la flecha.
- [ ] **Paso 5: `npm run build` y commit:** `git commit -m "Agrandar los titulos de las tarjetas de servicios"`

### Task 7: "Contacto" del header en formato pastilla

**Files:**
- Modify: `src/components/layout/Header.css:99-124` (`.header__contact`, `.header__contact-mark`, hover)

- [ ] **Paso 1: Confirmar el FAIL de `header: Contacto en pastilla`.**
- [ ] **Paso 2: Pasar el borde al enlace entero:**
  - `.header__contact` con `border: var(--lh-hairline) solid currentColor`, `border-radius: var(--lh-radius-pill)` y `padding: 0.55rem 1rem 0.55rem 1.25rem`
  - `.header__contact-mark` sin borde y a 20×20
  - en hover y focus-visible, el fondo `--lh-warm` y el texto `--lh-ink` aplican a todo `.header__contact`
  - el markup de `Header.tsx` no cambia
- [ ] **Paso 3: Correr la verificación y sacar capturas del header sobre el hero (oscuro) y con scroll (claro, compacto).** Esperado: PASS, y la pastilla es legible en los dos planos.
- [ ] **Paso 4: `npm run build` y commit:** `git commit -m "Mostrar el acceso a contacto del header como pastilla"`

### Task 8: Banner de Empresas en durazno claro

**Files:**
- Modify: `src/styles/tokens.css` (nuevo token junto a `--lh-warm`, línea 33)
- Modify: `src/components/sections/Empresas.css:135` (`.consulting-cta`)

**Interfaces:**
- Produces: `--lh-warm-light: #ebcba9`

- [ ] **Paso 1: Confirmar el FAIL de `empresas: banner durazno claro`.**
- [ ] **Paso 2: Verificar el contraste del texto `rgba(41,41,41,0.78)` sobre `#ebcba9`.** Tiene que dar ≥ 4.5:1 (calculado, o con DevTools). Crear el token y usarlo en `.consulting-cta`.
- [ ] **Paso 3: Correr la verificación.** Esperado: PASS. El hover del botón "Solicitar asesoramiento" sigue contrastando.
- [ ] **Paso 4: `npm run build` y commit:** `git commit -m "Aclarar el fondo del llamado de Empresas"`

### Task 9: Detalles: radio de botones, rayita de la numeración y barra celeste

**Files:**
- Modify: `src/styles/tokens.css` (junto a `--lh-radius-sm`, línea 100)
- Modify: `src/components/ui/Button.css` (`.button`)
- Modify: `src/styles/base.css:133` (junto a `.kicker`)
- Modify: `src/components/layout/SectionIntro.tsx` (clase en el número) y `src/components/sections/Nosotras.tsx` (clase en `.profile__discipline`)
- Modify: `src/components/ui/Geometry.css` (`.geometry__bar`)

**Interfaces:**
- Produces: `--lh-radius-xs: 6px` y la clase utilitaria `.kicker--ruled` (`::after` de 40px por `--lh-hairline`, `currentColor`, opacidad 0.5, `margin-left: var(--lh-space-sm)`, `vertical-align: middle`)

- [ ] **Paso 1: Confirmar los FAIL de `botones: radio 6px` y de `numeración de sección con rayita`.**
- [ ] **Paso 2: `.button` con `border-radius: var(--lh-radius-xs)`.**
- [ ] **Paso 3: Crear `.kicker--ruled` en `base.css` y aplicarla a `.section-intro__number` y a `.profile__discipline`.** En la variante `--center` (Task 3), la rayita del número sigue a la izquierda.
- [ ] **Paso 4: Achicar `.geometry__bar` a un triángulo de esquina, como en el boceto:** `width: 120px`, `height: 300px`, `bottom: -170px`. El override de 650px queda proporcional: `80px`, `220px`, `-130px`.
- [ ] **Paso 5: Correr la verificación completa.** Esperado: **32/32 OK**. Sacar capturas del Hero, Nosotras, Empresas, Particulares y Método a 1440 y a 375, y compararlas contra `cambio-1..4.jpeg`.
- [ ] **Paso 6: `npm run build` y commit:** `git commit -m "Redondear botones, sumar rayita a la numeracion y achicar la barra celeste"`
