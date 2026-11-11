import type { ReactNode } from 'react'
import type { Discipline } from '@/content/site'
import './SectionIntro.css'

interface SectionIntroProps {
  /** Numeración editorial, p. ej. "01 — Nosotras". */
  number: string
  kicker?: string
  title: ReactNode
  titleAccent?: string
  intro?: string
  introInSideColumn?: boolean
  ruleTone?: Discipline
  /** Variante para planos oscuros. */
  invert?: boolean
}

export function SectionIntro({
  number,
  kicker,
  title,
  titleAccent,
  intro,
  introInSideColumn = false,
  ruleTone,
  invert = false,
}: SectionIntroProps) {
  const classes = [
    'section-intro',
    invert && 'section-intro--invert',
    introInSideColumn && 'section-intro--aside',
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
            {title}
            {titleAccent && (
              <>
                {' '}
                <em>{titleAccent}</em>
              </>
            )}
          </h2>
          {ruleTone && (
            <span
              className={`section-intro__rule section-intro__rule--${ruleTone}`}
              aria-hidden="true"
            />
          )}
        </div>
        {intro && <p className="section-intro__lead">{intro}</p>}
      </div>
    </div>
  )
}
