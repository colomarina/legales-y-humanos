import type { ReactNode } from 'react'
import './SectionIntro.css'

interface SectionIntroProps {
  /** Numeración editorial, p. ej. "01 — Nosotras". */
  number: string
  kicker: string
  title: ReactNode
  intro?: string
  /** Variante para planos oscuros. */
  invert?: boolean
}

export function SectionIntro({ number, kicker, title, intro, invert = false }: SectionIntroProps) {
  return (
    <div className={`section-intro${invert ? ' section-intro--invert' : ''}`} data-reveal>
      <span className="section-intro__number">{number}</span>
      <div className="section-intro__body">
        <p className="kicker">{kicker}</p>
        <h2 className="section-intro__title">{title}</h2>
        {intro && <p className="section-intro__lead">{intro}</p>}
      </div>
    </div>
  )
}
