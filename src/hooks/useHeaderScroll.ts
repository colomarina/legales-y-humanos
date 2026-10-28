import { useEffect, useRef, useState } from 'react'

/**
 * Indica si el visitante ya empezó a scrollear.
 *
 * La cabecera necesita saberlo aparte de `useScrolledPast`: mientras se recorre
 * el hero, una barra transparente deja ver el contenido del propio hero pasando
 * por debajo. Con esto puede volverse sólida apenas arranca el scroll, sin
 * esperar a salir de la sección.
 */
export function useHasScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/**
 * Indica si el scroll ya dejó atrás el elemento indicado.
 *
 * Se usa para que la cabecera fija cambie de piel al salir del hero oscuro:
 * sobre el hero es transparente con texto claro, más abajo es papel con texto
 * tinta. Sin esto, el texto claro quedaría invisible sobre las secciones claras.
 */
export function useScrolledPast(elementId: string, offset: number): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const target = document.getElementById(elementId)
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      // Encoge la zona observada por el alto de la cabecera: en cuanto el hero
      // deja de asomar por debajo de ella, cambiamos de estado.
      { rootMargin: `-${offset}px 0px 0px 0px`, threshold: 0 },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [elementId, offset])

  return past
}

/**
 * Devuelve el id de la sección que el visitante está leyendo.
 *
 * Mantiene el conjunto de secciones visibles en una ref porque el callback del
 * observer sólo recibe las que cambiaron, no todas; con `ids` en orden de
 * documento, la activa es la primera del conjunto.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const visible = useRef<Set<string>>(new Set())

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.current.add(entry.target.id)
          else visible.current.delete(entry.target.id)
        })
        setActive(ids.find((id) => visible.current.has(id)) ?? null)
      },
      // Banda de lectura: el tercio central de la pantalla.
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    const current = visible.current
    return () => {
      observer.disconnect()
      current.clear()
    }
  }, [ids])

  return active
}
