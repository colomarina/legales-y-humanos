import { hero } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { Geometry } from '@/components/ui/Geometry'
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
            <Button href={hero.secondaryCta.href} tone="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Fotografía real del estudio dentro del círculo de la marca. Es la
          imagen principal de la página, así que no se difiere la carga. */}
      <figure className="hero__media">
        <span className="hero__ring" aria-hidden="true" />
        <img
          className="hero__photo"
          src={hero.photo.src}
          alt={hero.photo.alt}
          width={hero.photo.width}
          height={hero.photo.height}
          fetchPriority="high"
          decoding="async"
        />
      </figure>

      <div className="container hero__footnotes">
        <span>{hero.footnotes[0]}</span>
        <span className="hero__rule" aria-hidden="true" />
        <span>{hero.footnotes[1]}</span>
      </div>
    </section>
  )
}
