# Hero responsive: celular, tablet y escritorio

Fecha: 2026-11-11 · Rama: `feat/bocetos-noviembre` (PR #2), sobre el commit local `b68798f` (todavía sin push).

## Intención

La gente va a abrir la landing desde el celular, la tablet o la compu. Hoy el Hero se ve bien solo en algunas resoluciones:

- **En el celular y la tablet vertical** la foto cae debajo de los botones, en un círculo suelto, y "queda raro" (palabras de la usuaria).
- **En escritorio** el círculo grande del boceto `cambio-1.jpeg` ya está (commit `b68798f`), pero "la imagen está rara".
  - *Interpretación (supuesto):* el círculo sobresale un 30% por la derecha y el Hero lo recorta abajo, así que solo se ve la parte de arriba a la izquierda de la foto. Eso es casi todo pared, con el logo BB y el texto "Bogarsukoff & Baldaro Asoc." cortados.
  - El boceto funciona porque los objetos de su foto (taza, libro, lapicera) caen en la parte visible del círculo.

El objetivo es que el Hero esté pensado para cada tipo de pantalla y quede bien en cada una, no que "entre".

## Decisiones de la usuaria

- **Celular: opción B, imagen de fondo.** La foto ocupa toda la pantalla, oscurecida. Arriba van el eyebrow, el título "Legales *y* Humanos." y "Dos profesiones. *Una mirada integral.*". Abajo, los dos botones a lo ancho, al alcance del pulgar. El botón de WhatsApp sigue flotando.
  - Mockup elegido: `.superpowers/brainstorm/24833-1794440417/content/mobile-hero.html`, opción B.
- **Celular, sin cambios a la descripción de la playback:** confirmó con "Nop" que no faltaba nada. Esto incluye:
  - una descripción más corta en el celular;
  - sacar el círculo y su aro en el celular;
  - que el Hero ocupe la pantalla.
- **Escritorio:** sigue el boceto `cambio-1`, con el círculo grande arrancando bajo el header, sobresaliendo a la derecha y recortado abajo.
- **Fotos:** las reales de la rama se mantienen. La del Hero es `public/fotos/estudio.webp` (1200×1200).
- **Rangos:** pensar celular, tablet y escritorio por separado, "en sus distintas resoluciones".

## Rangos y comportamiento

| Rango (ancho CSS) | Tratamiento | Notas |
|---|---|---|
| ≤ 600px (celulares) | **B: foto de fondo** | Decisión de la usuaria. En el código no hay corte en 600: de 0 a 900px es el mismo bloque B. |
| Celular apaisado (alto ≤ 500px, cualquier ancho) | **B: foto de fondo** | *Mi decisión* (ver 5d) |
| 601–900px (tablet vertical) | **B: foto de fondo** | *Mi decisión:* la tablet vertical tiene el mismo problema que el celular (foto debajo de los botones), y B escala bien a pantallas altas. El texto se limita a un ancho legible. |
| 901–1199px (tablet horizontal, notebooks chicas) | Círculo, más contenido | Círculo más chico que en 1440, sobresale menos |
| 1200–1439px (notebooks) | Círculo como el boceto | |
| 1440–1919px (escritorio) | Círculo, el boceto tal cual | Hoy ya está así |
| ≥ 1920px (monitores grandes) | Círculo con tope de tamaño (1100px) | **Pendiente, decide la usuaria:** el círculo queda a 266px del texto en 1920 y a ~590px en 2560. El texto del logo llega al 98,5% del ancho de la foto, así que solo entra completo si el círculo sobresale; acercarlo exige agrandarlo mucho o cortar el logo. |
| Escritorio con poco alto (< 700px, p. ej. 1257×555 = 1885px con zoom 150%, 1366×657) | Círculo, con el mismo encuadre que el resto | *Mi decisión, tras implementar:* no hace falta subir el encuadre. Con la foto corrida lo mismo que sobresale el círculo, el logo entra completo también en estas pantallas (lo mide el script). |

Los cortes 900, 1200, 1440 y 1920 son míos. El 900 coincide con el corte móvil que ya usa el sitio.

## Requisitos verificables

El script `../herramientas/visual-check.mjs` (fuera del repo, Playwright con Chrome) se extiende para medir estos puntos.

**Celular y tablet vertical (B), probado en 360×740, 375×812, 390×844, 414×896, 768×1024 y 820×1180:**

1. **La foto es fondo.** Cubre el Hero completo. No hay círculo ni aro visibles, y la barra celeste (`Geometry`) no aparece. *Mi decisión: la barra se saca en B, porque sobre una foto de fondo compite con los botones.*
2. **Todo en la primera pantalla.** Sin hacer scroll se ven el eyebrow, el título, la frase, la descripción corta y los dos botones completos, con el borde inferior del segundo botón dentro del viewport.
   - En pantallas más bajas que 640px (p. ej. 320×568) el Hero puede crecer y empujar los botones fuera de la primera pantalla. Ahí no se achica la tipografía.
3. **Alto.** El Hero ocupa `100svh`, o más si el contenido no entra.
4. **Contraste, calculado contra el peor caso:** la foto es casi blanca, así que se asume blanco puro (#fff) debajo del oscurecimiento.
   - Texto chico (eyebrow, descripción, botón con contorno): ≥ 4.5:1 en el punto donde está ese texto.
   - Texto grande (título, frase): ≥ 3:1.
   - El degradé o capa oscura se elige para cumplir eso. Probablemente el eyebrow tenga que pasar de `--lh-muted-invert` a `--lh-ink-invert` en B.
5. **Encuadre.** El **monograma BB** queda completo dentro de la foto visible y en la mitad superior del Hero, nunca detrás de los botones.
   - Coordenadas del monograma en la foto, en fracciones: x 0.58–0.73, y 0.11–0.25.
   - El texto "Bogarsukoff & Baldaro Asoc." puede cortarse en B: en un celular se ve ~49% del ancho de la foto y el bloque completo (x 0.415–0.985) no entra con margen. *(mi decisión, tras la revisión)*
5b. **Header.** La foto arranca debajo del header, como en el mockup B. El header conserva su fondo y su contraste actuales. *(mi decisión)*
5c. **WhatsApp.** Los botones no quedan debajo del botón flotante de WhatsApp: hay ≥ 8px libres entre el borde del botón flotante y el botón más cercano. Si con eso no entra todo en 360×740, vale la excepción del punto 2 y el Hero crece. *(mi decisión)*
5d. **Celular apaisado** (alto ≤ 500px, p. ej. 932×430 u 844×390): recibe B, no el círculo. Los media queries usan el ancho y además `max-height: 500px` para este caso. *(mi decisión)*
   - Se prueba en 844×390 y 932×430: título y botones visibles, con el contraste del punto 4.
   - Acá sí se acepta que los botones queden fuera de la primera pantalla.
6. **Descripción corta en el celular.** *Mi decisión sobre el texto:* "Una consultora jurídica y de Recursos Humanos que combina conocimiento, experiencia y cercanía." Es el texto actual cortado antes de "para acompañar a empresas y particulares."
   - Desde 901px se sigue mostrando el texto completo.
   - Va como un campo nuevo en `src/content/site.ts`, sin recortar por CSS.

**Escritorio (901px en adelante), probado en 1024×768, 1257×555, 1280×800, 1366×657, 1440×900, 1588×991 y 1920×1080:**

7. **Círculo.** Es grande, como en el boceto, y siguen valiendo los chequeos actuales:
   - el aro está a ≥ 16px y ≤ 100px del header;
   - la foto mide ≥ 55% del ancho de la ventana, o 1000px;
   - el aro no pisa el texto (≥ 16px).
   - Los valores concretos de tamaño, sangrado y distancia por rango son del constructor, dentro de esos límites.
8. **Encuadre.** El bloque completo del logo (monograma más "BOGARSUKOFF & BALDARO ASOC.") queda dentro de la parte visible de la foto. Visible quiere decir dentro del círculo, de la ventana y del Hero, en todas las resoluciones de arriba.
   - Hoy no se cumple: a 1440 se ve la foto hasta x≈0.70 y el texto del logo llega a 0.985.
   - Como la foto es cuadrada en un círculo cuadrado, `object-position` no alcanza. Hay que agrandarla y desplazarla dentro del círculo, o recortarla. El mecanismo lo elige el constructor.
9. **Las sillas.** Si entran, mejor, pero no es un requisito.

**General:**

10. **Barra celeste:** en escritorio se mantiene como está.
11. **Sin movimiento:** nada de esto depende de animaciones. `prefers-reduced-motion` no cambia el encuadre (el script lo compara en 1440 y 390).
12. **Sin regresiones:** siguen en verde los chequeos del script (187 al cerrar este trabajo) y `npm run build`.
13b. **Corte en 900px:** el script prueba 900×700 (B) y 901×700 (círculo, con todos los chequeos de escritorio).

## No objetivos

- No se tocan otras secciones.
- No se cambia la foto ni se pide una nueva.
- El diseño de escritorio no se rehace; solo se ajustan el tamaño por rango y el encuadre.

## Lo que haría fallar esto aunque "funcione"

- Texto ilegible sobre la foto en el celular (contraste).
- Logo cortado o fuera de cuadro en alguna de las resoluciones de prueba.
- En el celular, los botones fuera de la primera pantalla en un teléfono común (375×812).
- Un salto feo al cruzar 900px, cuando pasa de foto de fondo a círculo.

## Aro y tipografía (confirmado por la usuaria)

13. **Aro cobre pegado a la foto (escritorio).** Como en `cambio-1`, el aro es concéntrico con la foto y va casi sobre su borde. En las resoluciones de escritorio de prueba, la distancia entre el aro y el borde de la foto es ≤ 6px en todo el contorno (izquierda, arriba y abajo). Hoy el aro está desplazado (`inset: -3% 4% -3% -5%`) y queda separado y descentrado.
14. **Tipografía menos apretada en todas las resoluciones.** Se mide contra `cambio-1` a 1588×991:
    - **Título** "Legales *y* Humanos.": `letter-spacing` entre −0.03em y −0.01em (hoy −0.055em). El ancho de "Legales y" a 1588px es de 438px ± 30px.
    - **Frase** "Dos profesiones. *Una mirada integral.*": `letter-spacing` entre −0.01em y +0.01em (hoy −0.045em). El ancho de "Dos profesiones." a 1588px es de 458px ± 30px.
    - Si con el `letter-spacing` solo no se llega al ancho, se ajusta el cuerpo de la frase dentro del mismo `clamp`, sin pasar de 4.5rem.
    - El `line-height` no cambia.
    - En el celular rigen los mismos valores de tracking; el punto 2 (todo en la primera pantalla) manda.

## Restricciones del repo

- `CLAUDE.md`: sin comentarios en el código, commits en español y sin líneas de atribución.
- Los colores de texto nuevos se verifican por contraste antes de sumarlos a `tokens.css`.

## Lo que queda al constructor

- Los valores exactos de tamaño, sangrado, distancia al header y encuadre por rango, dentro de los requisitos.
- La técnica del oscurecimiento en B (degradé, capa o `filter`), mientras cumpla el contraste.
- Cómo se reestructura el markup de `Hero.tsx`, si hace falta. Quedó así: un `<figure>` con el aro, un `<span class="hero__frame">` que recorta la foto y un `<span class="hero__veil">` que oscurece en B.
