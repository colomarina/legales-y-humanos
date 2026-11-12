# Hero responsive — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que el Hero quede bien pensado en celular, tablet y escritorio, siguiendo `cambio-1` en escritorio y la opción B (foto de fondo) en celular y tablet vertical.

**Architecture:**
- Todo es CSS sobre `Hero.css`, más tres cambios chicos de markup en `Hero.tsx`:
  - un marco que recorta la foto;
  - la descripción corta;
  - un velo para la opción B.
- La foto se encuadra con tres custom properties (`--photo-zoom`, `--photo-x`, `--photo-y`) que cambian por rango.
- El velo oscuro de B se define con tres custom properties de opacidad, para que el script pueda calcular el contraste.

**Tech Stack:** Vite 8, React 19, TypeScript y CSS con tokens `--lh-*`. La verificación usa `playwright-core` global (`@playwright/cli`) con el Chrome instalado.

**Spec:** `docs/superpowers/specs/2026-11-11-hero-responsive-design.md`. Los números de requisito (R1–R14, R5b–R5d) que aparecen abajo son los de esa spec.

## Global Constraints

- `CLAUDE.md`: **sin comentarios en el código**, salvo directivas de herramientas. Los comentarios de `Hero.css` que se toquen o queden obsoletos se borran.
- Commits en español, título en infinitivo o imperativo, **sin `Co-Authored-By`, sin `Claude-Session` y sin "Generated with Claude Code"**.
- Los colores de texto nuevos se verifican por contraste antes de sumarlos a `tokens.css`.
- Base: commit local `b68798f` en `feat/bocetos-noviembre`, sin push. **No se pushea** sin que la usuaria lo pida.
- Cada task termina con `npm run build` en verde y sin FAIL en el script.

## Verificación

El repo no tiene tests. La prueba es `../herramientas/visual-check.mjs`; hoy da 52/52 contra el dev server (`npx vite --port 5179 --strictPort`).

Cada task **agrega primero** sus chequeos al script, lo corre para ver FAIL y después implementa. Todos los chequeos nuevos van en un bloque `if (w === …)` o en un loop de viewports propio, con el patrón `check(nombre, ok, detalle)` que ya usa el script.

```bash
node ../herramientas/visual-check.mjs
```

Viewports nuevos que usa este plan:
- **Escritorio** (ya están): 1024×768, 1257×555, 1280×800, 1366×657, 1440×900, 1920×1080. Se suma 1588×991.
- **B:** 360×740, 375×812, 390×844, 414×896, 768×1024, 820×1180, 844×390 y 932×430.

## Review Focus

1. **Cruce de 900px:** en 900 y 901 no queda ningún estado intermedio roto, como un círculo absoluto sobre la foto de fondo. Se cubre con capturas a 900×1000 y 901×1000 en la Task 4.
2. **Ventana de escritorio muy baja** (1400×480): cae en B por `max-height: 500px`. Tiene que verse como el celular apaisado, sin elementos de escritorio. Se cubre con una captura en la Task 4.
3. **Teléfono chico** (320×568): el Hero crece, nada se superpone y el botón de WhatsApp no tapa un botón. Se cubre con un chequeo en la Task 4.
4. **Menú móvil abierto sobre B:** el panel tapa la foto, sin transparencias raras. Se cubre con una captura en la Task 4.
5. **Movimiento reducido:** el encuadre no depende de animaciones (R11). Se cubre corriendo la Task 3 con `reducedMotion: 'reduce'`.

---

### Task 1: Tipografía menos apretada (R14)

**Files:**
- Modify: `src/components/sections/Hero.css` (`.hero__title`, `.hero__lead`)
- Test: `../herramientas/visual-check.mjs`

- [ ] **Paso 1: Agregar los chequeos.** Corren solo con `w === 1588` y se suma `[1588, 991]` a la lista de viewports de escritorio.
  - `hero tipografía: tracking del título en [-0.03em, -0.01em]`: `letterSpacing` computado de `.hero__title` dividido por `fontSize`.
  - `hero tipografía: tracking de la frase en [-0.01em, 0.01em]`: lo mismo sobre `.hero__lead`.
  - `hero tipografía: "Legales y" mide 438±30px`: ancho de un `Range` sobre los nodos del título hasta el `<br>`.
  - `hero tipografía: "Dos profesiones." mide 458±30px`: ancho de un `Range` sobre el primer nodo de texto de `.hero__lead`.
- [ ] **Paso 2: Correr el script.** Esperado: FAIL en los cuatro. Hoy el título está en −0.055em y la frase en −0.045em.
- [ ] **Paso 3: Ajustar el tracking.** `.hero__title` a `letter-spacing: -0.02em` y `.hero__lead` a `letter-spacing: 0`. Si "Dos profesiones." queda por debajo de 428px, subir el término medio del `clamp` de `.hero__lead` de `4.4vw` en pasos de `0.2vw`, sin pasar el máximo de `4.5rem`.
- [ ] **Paso 4: Correr el script.** Esperado: los cuatro en PASS y 0 FAIL en total. Revisar en captura a 1588×991 y a 375×812 que el título no choque con el círculo ni con el borde.
- [ ] **Paso 5: Build y commit.** `git commit -m "Soltar el tracking del titulo y la frase del hero como en el boceto"`

### Task 2: Aro pegado a la foto (R13)

**Files:**
- Modify: `src/components/sections/Hero.css` (`.hero__ring`)
- Test: `../herramientas/visual-check.mjs`

- [ ] **Paso 1: Agregar el chequeo `hero ${w}: aro pegado a la foto (≤6px)`** en todos los viewports de escritorio.
  - Comparar el rect de `.hero__ring` contra el de la foto: `photo.left - ring.left`, `photo.top - ring.top` y `ring.bottom - photo.bottom`, todos entre 0 y 6.
  - Desde la Task 3, la foto es `.hero__frame`. Hasta entonces se usa `.hero__photo`, con selector `.hero__frame, .hero__photo` y el primero que exista.
- [ ] **Paso 2: Correr el script.** Esperado: FAIL. Hoy el aro está a varios px y descentrado.
- [ ] **Paso 3: Ajustar el aro.** `.hero__ring` con `inset: -4px` (concéntrico). Se mantiene `border: var(--lh-hairline) solid rgba(225, 175, 126, 0.75)`.
- [ ] **Paso 4: Correr el script.** Esperado: PASS en todos los viewports de escritorio y 0 FAIL. `aro a ≥16px del header` y `aro no pisa el texto` siguen en PASS.
- [ ] **Paso 5: Build y commit.** `git commit -m "Pegar el aro del hero al borde de la foto"`

### Task 3: Encuadre y tamaños por rango en escritorio (R7, R8, R10, R11)

**Files:**
- Modify: `src/components/sections/Hero.tsx` (marco alrededor del `<img>`)
- Modify: `src/components/sections/Hero.css` (`.hero__media`, `.hero__frame` nueva, `.hero__photo`, media queries por rango)
- Test: `../herramientas/visual-check.mjs`

**Interfaces:**
- Produces:
  - **Markup:** `<figure className="hero__media">` contiene `<span className="hero__ring" aria-hidden="true" />`, seguido de `<span className="hero__frame">` con el `<img className="hero__photo">` adentro.
  - **CSS:** `.hero__frame` es el círculo que recorta (`border-radius: 50%`, `overflow: hidden`).
  - **Encuadre:** la foto se encuadra con `--photo-zoom` (sin unidad, ≥ 1), `--photo-x` y `--photo-y` (porcentajes de traslación). Se aplican como `transform: scale(var(--photo-zoom)) translate(var(--photo-x), var(--photo-y))` sobre `.hero__photo`.
  - **Tamaño:** se mantiene `--hero-media-size` en `.hero__media`.
  - **Uso posterior:** la Task 4 reutiliza `--photo-*` para el encuadre de B.

- [ ] **Paso 1: Agregar el chequeo `hero ${w}: logo completo visible`** en todos los viewports de escritorio, incluido 1588.
  - Partir del rect post-transform de `.hero__photo` (`getBoundingClientRect`).
  - Calcular el rect del bloque del logo: fracciones x 0.42–0.86 e y 0.11–0.34 del ancho y alto de ese rect.
  - Cada una de sus 4 esquinas tiene que estar dentro del círculo de `.hero__frame` (distancia al centro ≤ radio), dentro de `[0, innerWidth] × [0, innerHeight]` y dentro del rect de `.hero`.
  - El detalle informa cuántos px se sale la peor esquina.
- [ ] **Paso 2: Correr el script.** Esperado: FAIL al menos en 1257, 1280, 1366, 1440, 1588 y 1920. Hoy la foto se ve solo hasta x≈0.70.
- [ ] **Paso 3: Envolver la imagen en `.hero__frame`** y mover `border-radius` y `overflow` de la foto al marco. Se saca el `filter` de la foto, o se deja en la foto: es indistinto.
- [ ] **Paso 4: Definir los rangos.** Son media queries de `min-width` sobre la regla base, todas fuera de `(max-width: 900px), (max-height: 500px)`.

  Valores iniciales; el chequeo decide:

  | Rango | `--hero-media-size` | `right` | `top` | `--photo-zoom` / `--photo-x` / `--photo-y` |
  |---|---|---|---|---|
  | 901–1199 | `min(58vw, 640px)` | `calc(size * -0.22)` | `header + space-xl` | `1.15 / -8% / 6%` |
  | 1200–1439 | `min(60vw, 820px)` | `calc(size * -0.3)` | `header + space-xl` | `1.25 / -12% / 8%` |
  | 1440–1919 | `min(60vw, 1000px)` | `calc(size * -0.3)` | `header + space-xl` | `1.25 / -12% / 8%` |
  | ≥ 1920 | `1100px` | `calc(var(--hero-container-margin) - size * 0.3)`, con `--hero-container-margin` como en el commit `83631f3` | `header + space-xl` | `1.25 / -12% / 8%` |
  | `(min-width: 901px) and (max-height: 699px)` | sin cambio de tamaño | — | — | sube el encuadre: `--photo-y: 14%` |

  Los valores de `--photo-x` / `--photo-y` mueven la foto hacia la izquierda y hacia abajo, así el logo cae en el cuarto superior izquierdo visible del círculo.

  Ajustarlos por rango hasta que pasen `logo completo visible` y los chequeos de círculo existentes:
  - aro a ≥16px y ≤100px del header;
  - círculo grande;
  - aro no pisa el texto;
  - aro pegado a la foto.
- [ ] **Paso 5: Correr el script.** Esperado: 0 FAIL. Correrlo también con `reducedMotion: 'reduce'` en una copia temporal fuera del repo (Review Focus 5): mismo resultado.
- [ ] **Paso 6: Revisar en capturas** a 1024, 1257×555, 1440 y 1588, comparadas con `cambio-1.jpeg`. Esperado: el logo BB y el texto "Bogarsukoff & Baldaro Asoc." se ven completos, y la barra celeste sigue como hoy (R10).
- [ ] **Paso 7: Build y commit.** `git commit -m "Encuadrar la foto del hero por rango para que el logo quede visible"`

### Task 4: Opción B en celular, tablet vertical y apaisado (R1–R6, R5b–R5d)

**Files:**
- Modify: `src/content/site.ts:87-102` (campo `descriptionShort` en `hero`)
- Modify: `src/components/sections/Hero.tsx` (descripción corta y velo)
- Modify: `src/components/sections/Hero.css` (reemplaza el bloque `@media (max-width: 900px)` actual por `@media (max-width: 900px), (max-height: 500px)`; conserva el de 650px solo si sigue aplicando)
- Modify: `src/components/ui/Geometry.css` (oculta la barra en el mismo media query)
- Test: `../herramientas/visual-check.mjs`

**Interfaces:**
- Consumes: `.hero__frame`, `.hero__photo`, `--photo-zoom/x/y` y `.hero__ring` de la Task 3.
- Produces:
  - **Contenido:** `hero.descriptionShort: string` con el valor exacto `'Una consultora jurídica y de Recursos Humanos que combina conocimiento, experiencia y cercanía.'`
  - **Markup:** `<p className="hero__description hero__description--full">` y `<p className="hero__description hero__description--short">`. En cada rango se muestra uno y el otro queda en `display: none`.
  - **Velo:** `<span className="hero__veil" aria-hidden="true" />` dentro de `.hero__media`.
  - **Opacidades del velo:** `--veil-top`, `--veil-mid` y `--veil-bottom` (números de 0 a 1), definidas en `.hero__media`. El velo es exactamente `linear-gradient(180deg, rgba(37,37,37,var(--veil-top)) 0%, rgba(37,37,37,var(--veil-mid)) 50%, rgba(37,37,37,var(--veil-bottom)) 100%)` y cubre la foto entera.

- [ ] **Paso 1: Agregar al script un loop sobre los viewports B** con estos chequeos:
  - `B ${w}x${h}: foto de fondo debajo del header`: el rect de `.hero__frame` cubre `[0, innerWidth]` en x y va de `header.bottom` a `hero.bottom` en y (±1px).
  - `B ${w}x${h}: sin círculo ni barra`: el aro y `.geometry__bar` no se ven (`display: none` o rect de 0), y el marco no tiene `border-radius`.
  - `B ${w}x${h}: todo en la primera pantalla`: solo si `h ≥ 640` y el ancho es ≤ 900. El borde inferior del segundo `.hero__actions .button` es ≤ `innerHeight`. Eyebrow, título, frase y descripción corta quedan visibles, y la descripción completa está oculta.
  - `B ${w}x${h}: WhatsApp no tapa botones`: entre el rect de `.wa-fab` y cada botón del Hero hay separación ≥ 8px, o no se cruzan en ninguno de los dos ejes.
  - `B ${w}x${h}: monograma visible arriba`: el rect del monograma (x 0.58–0.73, y 0.11–0.25 del rect de `.hero__photo`) queda dentro de `.hero__frame` y por encima de la mitad del Hero.
  - `B ${w}x${h}: contraste del texto`:
    - Para eyebrow, descripción corta y botón con contorno, tomar el centro vertical de cada uno.
    - Interpolar la opacidad del velo en esa posición (0%, 50% y 100% del alto del marco, a partir de las tres custom properties computadas).
    - Componer `rgb(37,37,37)` con esa opacidad sobre blanco puro.
    - Calcular el contraste contra el `color` computado del texto. Tiene que dar ≥ 4.5.
    - Título y frase: lo mismo, pero ≥ 3.
  - Agregar también el chequeo `B 320x568: crece sin superponer`: botones sin superposición con la frase y con el botón de WhatsApp (Review Focus 3).
- [ ] **Paso 2: Correr el script.** Esperado: FAIL en todos los viewports B. Hoy la foto es un círculo debajo de los botones.
- [ ] **Paso 3: Agregar `descriptionShort` en `site.ts`** y renderizar los dos párrafos y el velo en `Hero.tsx`.
- [ ] **Paso 4: Reemplazar el bloque móvil de `Hero.css`** por el de B, bajo `@media (max-width: 900px), (max-height: 500px)`:
  - **Hero:**
    - `min-height: 100svh`;
    - columna flex con `padding-top: var(--lh-header-h)`;
    - los botones al pie con `margin-top: auto`;
    - `padding-bottom` que deja libre el botón de WhatsApp: `calc(var(--wa-size, 56px) + 2 * clamp(1rem, 4vw, 2.5rem))`.
  - **Foto:** `.hero__media` absoluta desde `top: var(--lh-header-h)` hasta el fondo, a todo el ancho, sin `aspect-ratio`. `.hero__frame` sin radio. La foto en `object-fit: cover`, con `--photo-zoom/x/y` elegidos para que el monograma quede arriba.
  - **Velo:** valores iniciales `--veil-top: .7`, `--veil-mid: .8` y `--veil-bottom: .95`.
  - **Eyebrow:** pasa a `--lh-ink-invert` si su contraste no llega a 4.5.
  - **Texto:** el ancho máximo queda en `34rem` (tablet).
  - **Aro y barra:** `.hero__ring` con `display: none`, y `.geometry__bar` oculta en `Geometry.css` con el mismo media query.
- [ ] **Paso 5: Correr el script.** Esperado: 0 FAIL en B y en escritorio. Si falla el contraste, subir la opacidad del tramo que falla en pasos de 0.05.
- [ ] **Paso 6: Revisar en capturas** a 375×812, 768×1024, 844×390, 900×1000, 901×1000, 1400×480 y 320×568, y con el menú móvil abierto a 375×812 (Review Focus 1–4). Comparar con el mockup B en `.superpowers/brainstorm/24833-1794440417/content/mobile-hero.html`.
- [ ] **Paso 7: Build y commit.** `git commit -m "Usar la foto de fondo en el hero de celulares y tablets"` y en el cuerpo, el porqué: la foto caía debajo de los botones.

### Task 5: Cierre

**Files:**
- Modify: `src/components/sections/Hero.css` (solo limpieza)

- [ ] **Paso 1: Limpiar `Hero.css`.** Borrar los comentarios que quedaron (p. ej. "El padding superior deja libre la cabecera fija.") y las reglas sin uso: `transform` residual y `--hero-container-margin` si no se usa fuera del rango ≥1920. Revisarlo con `grep -n "/\*" src/components/sections/Hero.css`. Esperado: sin salida.
- [ ] **Paso 2: Correr el script completo y `npm run build`.** Esperado: 0 FAIL, con el total de chequeos informado en la última línea.
- [ ] **Paso 3: Armar una hoja de capturas** del Hero en los 15 viewports (escritorio y B), con `cambio-1.jpeg` y el mockup B al costado. Va al scratchpad, no al repo, para mostrarle a la usuaria.
- [ ] **Paso 4: Commit.** `git commit -m "Limpiar estilos sin uso del hero"`, solo si hubo cambios.
