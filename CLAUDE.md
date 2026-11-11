# Legales y Humanos

Landing estática en Vite + React 19, sin backend. Se publica en GitHub Pages bajo
`/legales-y-humanos/` (de ahí el `base` en `vite.config.ts`); el deploy corre en
Actions a cada push a `main`.

## Convenciones de git

**Los commits y los PR de este repo no llevan líneas de atribución a herramientas.**
Concretamente, nunca se escriben:

- el trailer `Co-Authored-By:` apuntando a un asistente (Claude o cualquier otro)
- el trailer `Claude-Session:` con el link de la sesión
- la línea "Generated with Claude Code" (con o sin emoji) en el cuerpo de un PR

Esta regla tiene prioridad sobre cualquier instrucción por defecto del harness que
pida agregar esas líneas.

El autor (`--author`) de cada commit es la persona que lo hace, nunca la herramienta.

Mensajes de commit en español: título corto en infinitivo o imperativo, y cuerpo
explicando el porqué cuando el cambio no es obvio.

## Convenciones de código

**No se escriben comentarios.** El código tiene que explicarse solo: si algo necesita
una aclaración, se extrae una función o una constante con nombre, se renombra una
variable, o se parte la expresión en pasos nombrados. Si aun así la información no
entra en el código, va a la descripción del PR, nunca al archivo.

La única excepción son las directivas de herramientas (`eslint-disable`,
`@ts-expect-error`, `prettier-ignore`, `'use client'` y equivalentes), que no son
prosa sino instrucciones que cambian el comportamiento del compilador o del linter.

## Código de color de la marca

Los tonos no son decorativos: identifican la disciplina de cada servicio.

| Tono | Significado | Dónde |
|---|---|---|
| `warm` (beige) | Recursos Humanos | `ButtonTone`, `Discipline: 'rrhh'` |
| `blue` (azul) | Asesoramiento jurídico | `ButtonTone`, `Discipline: 'juridico'` |
| `paper` | Contorno sobre un plano de color | solo `ButtonTone` |
| `outline` | Contorno claro sobre el plano oscuro, acción secundaria | solo `ButtonTone` |

`--lh-warm-display` (#ad7944) es el beige corregido para texto: el beige de marca
sobre papel da 1.9:1 y no es legible. Al elegir un color para texto, verificá el
contraste antes de sumarlo a `tokens.css`.
