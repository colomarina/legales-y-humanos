import { useEffect } from 'react'

/** Bloquea el scroll del documento mientras `locked` sea verdadero. */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [locked])
}
