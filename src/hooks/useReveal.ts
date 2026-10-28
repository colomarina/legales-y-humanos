import { useEffect } from 'react'

/**
 * Revela los elementos marcados con `data-reveal` al entrar en viewport.
 *
 * Usa un único IntersectionObserver compartido por toda la página en lugar de
 * uno por componente, y deja de observar cada nodo una vez revelado.
 * Si el sistema pide movimiento reducido, muestra todo de entrada.
 */
export function useReveal(): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (nodes.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}
