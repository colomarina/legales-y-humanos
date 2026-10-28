# Legales y Humanos — Bogarsukoff & Baldaro Asoc.

Landing page de la consultora jurídica y de Recursos Humanos.

Combina la **arquitectura de `/estructura`** con el **sistema visual de `/estetica`**
(dirección «Boutique Contemporánea»), las dos propuestas aprobadas por las clientas.

---

## Cómo ejecutarlo

Requiere Node 20+ (probado con Node 24) y pnpm.

```bash
pnpm install
pnpm dev        # servidor de desarrollo en http://localhost:5173
```

Otros comandos:

```bash
pnpm typecheck  # control de tipos (tsc --noEmit)
pnpm build      # typecheck + build de producción en dist/
pnpm preview    # sirve el build de producción
```

> Si el puerto 5173 está ocupado, Vite elige el siguiente libre y lo informa en consola.

---

## Estructura del proyecto

```
src/
├── main.tsx                  Punto de entrada (estilos globales primero)
├── App.tsx                   Composición de la página
├── content/site.ts           TODO el texto y los datos, tipados
├── context/
│   └── ContactChannelContext.tsx  Recorrido de contacto elegido (Empresas/Particulares)
├── styles/
│   ├── tokens.css            Sistema de diseño: color, tipografía, espaciado, movimiento
│   ├── base.css              Reset, primitivas compartidas (.container, .kicker, .plane--*)
│   └── index.css             Punto de entrada de estilos globales
├── hooks/
│   ├── useReveal.ts          Aparición en viewport (un IntersectionObserver compartido)
│   ├── useScrollLock.ts      Bloqueo de scroll con el menú móvil abierto
│   └── useHeaderScroll.ts    Piel de la cabecera + sección activa
└── components/
    ├── ui/                   Arrow · Button · TextLink · Geometry · Portrait ·
    │                          InstagramIcon · Logo
    ├── layout/               Brand · Header · MobileMenu · SectionIntro · Footer
    └── sections/             Hero · Nosotras · Empresas · Particulares · Metodo ·
                               Contacto (ChannelPicker + ContactForm)
```

Cada componente importa su propio `.css`. **Ningún color, tipografía, espaciado ni
duración se escribe a mano fuera de `tokens.css`**: para recolorear o re-escalar el
sitio entero alcanza con editar ese archivo.

### Tokens principales

| Grupo | Ejemplos |
|---|---|
| Planos | `--lh-paper` `--lh-deep` `--lh-neutral` |
| Texto | `--lh-ink` `--lh-muted` `--lh-muted-invert` |
| Disciplina | `--lh-warm` (RRHH) · `--lh-blue` (Jurídico) + variantes `-soft` y `-text` |
| Tipografía | `--lh-serif` `--lh-sans` · escalas `--lh-display-*` y `--lh-text-*` |
| Ritmo | `--lh-section-y` `--lh-gutter` `--lh-space-*` |
| Movimiento | `--lh-dur` `--lh-ease` |

Los acentos `-text` existen porque el beige y el azul de marca **no tienen contraste
suficiente para texto pequeño** sobre papel. Usar `--lh-warm` / `--lh-blue` para
superficies y detalles gráficos; `--lh-warm-text` / `--lh-blue-text` para tipografía.

Todos los pares de color en uso se midieron contra WCAG AA y **pasan en texto
normal** (el más ajustado es `muted / neutral`, 4.62:1). La escala de texto arranca
en 16px, que es el mínimo recomendado para móvil y además el umbral por debajo del
cual Safari iOS hace zoom automático al enfocar un campo de formulario.

---

## Contacto: un selector, no un menú

La sección pide **una sola decisión**: Empresas o Particulares. De esa elección
dependen los datos de contacto que se muestran y la casilla a la que va el
formulario, que por eso ya no pregunta el tipo de consulta.

| Recorrido | Color | Email | Celular |
|---|---|---|---|
| Empresas (por defecto) | Beige (RRHH) | `Bogarsukoffbaldaroasoc@gmail.com` | 221 579-0446 |
| Particulares | Azul (Jurídico) | `consultas.estudiobb@gmail.com` | 221 435-3373 |

El formulario entero se viste del color del recorrido —filete superior, subrayado
de foco, tilde del consentimiento y botón de enviar— a través de un par de
variables (`--form-accent`, `--form-accent-text`) que define `.contact-form` y
pisa `.contact-form--juridico`.

Los datos viven en `contactChannels` (`src/content/site.ts`); agregar o cambiar un
recorrido es editar ese arreglo. El selector (`ChannelPicker`) usa radios nativos
ocultos visualmente en lugar de ARIA de pestañas: se navegan con flechas y se
anuncian solos.

El formulario **no tiene backend a propósito**: al enviar abre el programa de correo
del visitante con la consulta ya redactada, dirigida a la casilla del recorrido
elegido. Si más adelante se conecta un servicio de formularios, sólo cambia
`handleSubmit` en `src/components/sections/ContactForm.tsx`.

**Dirección:** Calle 49 n° 876, piso 4, oficina B — La Plata, Buenos Aires.
Se muestra como texto con un enlace «Ver en Google Maps» que usa el esquema de URL
de búsqueda: no necesita clave de API, no carga scripts de Google ni cookies de
terceros, y funciona aunque la ficha de negocio todavía no esté verificada. Cuando
la ficha esté activa, reemplazar `contacto.address.mapsHref` por su URL propia.

---

## Logos

`public/monograma.png` y `public/logo-completo.png` salen de los JPEG originales,
convertidos a PNG con transparencia (alfa = luminancia invertida, no umbral duro,
para conservar los trazos finos de la bajada) y recortados al contenido.

**No se usan como `<img>` sino como `mask-image`.** Los originales tenían fondo
blanco y sobre el plano oscuro habrían quedado dentro de una caja blanca. Como
máscara el color lo pone `currentColor`, así que el mismo archivo sirve beige
sobre oscuro, tinta sobre papel o azul, y el monograma de la cabecera hereda el
color de la piel activa sin exportar una variante por plano.

| Dónde | Qué |
|---|---|
| Favicon | Teja oscura con el monograma en beige (`favicon.png`, 180px) |
| Cabecera | Monograma a 34px junto al nombre |
| Contacto | Monograma grande, en reemplazo del «L+H» que se había inventado |
| Pie | Lockup completo de la firma |
| Open Graph | `icono-512.png` |

La conversión se hizo con el canvas del navegador, no con una librería de imágenes:
no agrega ninguna dependencia al proyecto.

---

## Despliegue

El sitio se publica en **GitHub Pages**: https://colomarina.github.io/legales-y-humanos/

Cada push a `main` dispara `.github/workflows/deploy.yml`, que corre `pnpm build`
y publica `dist/`. No hace falta commitear `dist/` (está en `.gitignore`).

### Al mover a dominio propio

Tres lugares atados al subpath de GitHub Pages:

1. `vite.config.ts` → `base: '/legales-y-humanos/'` pasa a `base: '/'`.
2. `index.html` → las URL absolutas de `og:image` y `og:url`.
3. Un archivo `public/CNAME` con el dominio, más los registros DNS.

---

## Decisiones de implementación

- **Cabecera fija con tres pieles.** Quieta arriba: transparente, para no tapar el
  hero. Scrolleando dentro del hero: plano oscuro — con una barra transparente se
  veía el contenido del propio hero pasando por debajo. Pasado el hero: papel con
  texto tinta. Se compacta de 88px a 68px al scrollear.
  Vive fuera de `.site-shell` porque ese contenedor recorta el desborde de la
  geometría y un ancestro que recorta puede recortar a sus descendientes fijos.
  La sección en lectura se marca en el menú con `aria-current` y mayor peso.
- **Hover protegido con `@media (hover: hover)`.** En táctil el hover no existe y,
  peor, se queda pegado después de tocar. 17 reglas están protegidas; 3 acompañan
  a `:focus-visible` y su efecto es inocuo si se pega. El foco de teclado nunca va
  dentro del `@media`: tiene que funcionar en todos los dispositivos.
  **Corolario de diseño:** nada que importe puede vivir sólo en el hover, porque
  la mayor parte del tráfico va a ser móvil. Por eso el color de disciplina tiene
  presencia permanente (hairlines beige en Empresas, numeración y flecha azules en
  Particulares) y el hover sólo lo refuerza.
- **Preselección del recorrido.** Los enlaces de Empresas y Particulares eligen su
  recorrido de contacto al navegar (`ContactChannelProvider`): quien hace clic en
  «Servicios para particulares» ya dijo quién es, así que llega al formulario sin
  nada que decidir.
- **Línea de tiempo en «Cómo trabajamos».** Se conservó el tratamiento de
  `/estructura` —cuatro marcadores circulares unidos por una línea, con el borde
  alternando beige y azul— traducido a los tokens del sistema. **No lleva hover**:
  los pasos no son interactivos, un hover ahí simularía que se puede hacer clic, y
  además no existiría en móvil. En su lugar la línea se dibuja al entrar en pantalla
  y los marcadores toman su color en secuencia (250 → 850ms): el movimiento comunica
  que es un proceso de cuatro pasos, que es lo que hay que entender ahí.
- **Sin imágenes externas.** Las cuatro fotos de Unsplash de `/estructura` se
  reemplazaron por la geometría de marca (`Geometry`) y el espacio reservado de
  retrato (`Portrait`). El sitio no depende de ningún dominio de terceros.
- **Tipografía de lectura elevada.** La maqueta usaba 9–11 px para texto corrido;
  acá arranca en 16 px. Se conservó la proporción entre niveles y el carácter
  editorial, pero el texto es legible en pantalla real y los campos del formulario
  no disparan el zoom automático de Safari iOS.
- **Contacto por selector.** La sección llegó a tener 12 bloques y 7 vías de
  contacto, y pedía elegir el recorrido dos veces (tarjeta + desplegable del
  formulario). Se redujo a una sola decisión; el campo «Tipo de consulta»
  desapareció porque lo resuelve el selector.
- **Sin Tailwind.** Ambos proyectos originales lo traían instalado y no usaban casi
  ninguna utilidad. Aportaba un *reset* duplicado sobre el propio y ~6 kB de CSS
  muerto. Para reincorporarlo: `pnpm add -D tailwindcss @tailwindcss/vite`, sumar el
  plugin en `vite.config.ts` y `@import 'tailwindcss';` al principio de
  `src/styles/index.css`.
