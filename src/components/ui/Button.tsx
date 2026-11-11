import type { ReactNode } from 'react'
import { Arrow } from './Arrow'
import './Button.css'

/**
 * Beige = Recursos Humanos · Azul = Jurídico · Papel = contorno sobre color ·
 * Outline = contorno claro sobre el plano oscuro, como acción secundaria.
 */
export type ButtonTone = 'warm' | 'blue' | 'paper' | 'outline'

/** Clases del botón, para los casos en que hace falta un `<button>` nativo. */
export function buttonClassName(tone: ButtonTone = 'warm'): string {
  return `button button--${tone}`
}

interface ButtonProps {
  href: string
  tone?: ButtonTone
  /** Se dispara además de navegar; lo usan las secciones para preseleccionar recorrido. */
  onClick?: () => void
  children: ReactNode
}

export function Button({ href, tone = 'warm', onClick, children }: ButtonProps) {
  return (
    <a className={buttonClassName(tone)} href={href} onClick={onClick}>
      <span className="button__label">{children}</span>
      <Arrow />
    </a>
  )
}
