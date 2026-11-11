import type { ReactNode } from 'react'
import type { Discipline, SplitTitle } from '@/content/site'
import './SectionIntro.css'

interface SectionIntroProps {
  /** Numeración editorial, p. ej. "01 — Nosotras". */
  number: string
  kicker?: string
  /** Texto o título en dos tramos; el segundo va en itálica y con acento. */
  title: ReactNode | SplitTitle
  intro?: string
  /** El párrafo de entrada pasa a una columna propia, a la derecha del título. */
  introAside?: boolean
  /** Filete corto bajo el título, con el color de la disciplina. */
  rule?: Discipline
  /** Variante para planos oscuros. */
  invert?: boolean
}

function isSplit(title: ReactNode | SplitTitle): title is SplitTitle {
  return typeof title === 'object' && title !== null && 'lead' in title && 'accent' in title
}

export function SectionIntro({
  number,
  kicker,
  title,
  intro,
  introAside = false,
  rule,
  invert = false,
}: SectionIntroProps) {
  const classes = [
    'section-intro',
    invert && 'section-intro--invert',
    introAside && 'section-intro--aside',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} data-reveal>
      <span className="section-intro__number">{number}</span>
      <div className="section-intro__body">
        <div className="section-intro__heading">
          {kicker && <p className="kicker">{kicker}</p>}
          <h2 className="section-intro__title">
            {isSplit(title) ? (
              <>
                {title.lead} <em>{title.accent}</em>
              </>
            ) : (
              title
            )}
          </h2>
          {rule && (
            <span className={`section-intro__rule section-intro__rule--${rule}`} aria-hidden="true" />
          )}
        </div>
        {intro && <p className="section-intro__lead">{intro}</p>}
      </div>
    </div>
  )
}
