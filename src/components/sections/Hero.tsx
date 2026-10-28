import { hero } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { Geometry } from '@/components/ui/Geometry'
import { TextLink } from '@/components/ui/TextLink'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero plane--deep" id="inicio">
      <Geometry variant="hero" />

      <div className="container hero__inner">
        <ul className="hero__eyebrow">
          {hero.eyebrow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h1 className="hero__title" data-reveal>
          Legales <i>y</i>
          <br />
          Humanos
          <span className="hero__dot" aria-hidden="true">
            .
          </span>
        </h1>

        <div className="hero__statement" data-reveal>
          <p className="hero__lead">
            {hero.leadLines[0]}
            <br />
            <em>{hero.leadLines[1]}</em>
          </p>
          <p className="hero__description">{hero.description}</p>
          <div className="hero__actions">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <TextLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</TextLink>
          </div>
        </div>
      </div>

      <div className="container hero__footnotes">
        <span>{hero.footnotes[0]}</span>
        <span className="hero__rule" aria-hidden="true" />
        <span>{hero.footnotes[1]}</span>
      </div>
    </section>
  )
}
