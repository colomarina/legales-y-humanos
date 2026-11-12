import type { ReactNode } from 'react'
import type { Accent } from '@/content/site'
import './SectionIntro.css'

interface SectionIntroProps {
  /** Numeración editorial, p. ej. "01 — Nosotras". */
  number: string
  kicker?: string
  title: ReactNode
  titleAccent?: string
  intro?: string
  introAside?: boolean
  ruleAccent?: Accent
  /** Variante para planos oscuros. */
  invert?: boolean
  align?: 'start' | 'center'
}

export function SectionIntro({
  number,
  kicker,
  title,
  titleAccent,
  intro,
  introAside = false,
  ruleAccent,
  invert = false,
  align = 'start',
}: SectionIntroProps) {
  const classes = [
    'section-intro',
    invert && 'section-intro--invert',
    introAside && 'section-intro--aside',
    align === 'center' && 'section-intro--center',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} data-reveal>
      <span className={`section-intro__number${align === 'center' ? ' kicker--ruled' : ''}`}>
        {number}
      </span>
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
          {ruleAccent && (
            <span
              className={`section-intro__rule section-intro__rule--${ruleAccent}`}
              aria-hidden="true"
            />
          )}
        </div>
        {intro && <p className="section-intro__lead">{intro}</p>}
      </div>
    </div>
  )
}
