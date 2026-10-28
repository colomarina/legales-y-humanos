import type { Discipline } from '@/content/site'
import './Portrait.css'

interface PortraitProps {
  tone: Discipline
  /** Describe a quién corresponde el espacio reservado. */
  label: string
}

/**
 * Espacio reservado para el retrato de cada profesional.
 *
 * La dirección visual aprobada declara que las fotografías están por
 * producirse, así que no se usa fotografía de archivo: un stock de una persona
 * ajena se leería como si fuera la profesional real.
 * Reemplazar por `<img>` cuando existan las fotos definitivas.
 */
export function Portrait({ tone, label }: PortraitProps) {
  return (
    <figure className={`portrait portrait--${tone}`}>
      <div className="portrait__frame" aria-hidden="true">
        <span className="portrait__mark" />
      </div>
      <figcaption className="portrait__caption">
        <span>Retrato editorial</span>
        <small>Fotografía a producir</small>
        <span className="visually-hidden">{label}</span>
      </figcaption>
    </figure>
  )
}
