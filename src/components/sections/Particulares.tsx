import { particulares } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SectionIntro } from '@/components/layout/SectionIntro'
import { useContactChannel } from '@/context/ContactChannelContext'
import './Particulares.css'

export function Particulares() {
  const { select } = useContactChannel()
  // Quien sale de esta sección hacia el contacto consulta como particular.
  const goToContact = () => select('particulares')

  return (
    <section className="section particulares plane--deep" id="particulares">
      <div className="container">
        <SectionIntro
          number={particulares.number}
          kicker={particulares.kicker}
          title={particulares.title}
          intro={particulares.intro}
          ruleTone="rrhh"
          invert
        />

        <ul className="particulares__grid" data-reveal>
          {particulares.services.map((service, index) => (
            <li key={service.title}>
              {/* Enlace real: el bloque reacciona al hover, así que tiene que llevar
                  a algún lado. Lleva a la consulta, como en la propuesta visual. */}
              <a
                className={`particulares__item particulares__item--${service.tone}`}
                href={particulares.cta.href}
                onClick={goToContact}
              >
                <span className="particulares__number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="particulares__icon">
                  <Icon name={service.icon} />
                </span>
                <div className="particulares__body">
                  <h3 className="particulares__title">{service.title}</h3>
                  <p className="particulares__copy">{service.text}</p>
                </div>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>

        <div className="particulares__cta" data-reveal>
          <p className="particulares__cta-text">{particulares.cta.text}</p>
          <Button href={particulares.cta.href} tone="blue" onClick={goToContact}>
            {particulares.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
