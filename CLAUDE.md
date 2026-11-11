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
