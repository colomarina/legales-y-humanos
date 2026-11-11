import { empresas } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SectionIntro } from '@/components/layout/SectionIntro'
import { useContactChannel } from '@/context/ContactChannelContext'
import './Empresas.css'

export function Empresas() {
  const { select } = useContactChannel()
  // Quien sale de esta sección hacia el contacto ya dijo que consulta por su empresa.
  const goToContact = () => select('empresas')

  return (
    <section className="section empresas plane--paper" id="empresas">
      <div className="container">
        <SectionIntro
          number={empresas.number}
          kicker={empresas.kicker}
          title={empresas.title}
          titleAccent={empresas.titleAccent}
          intro={empresas.intro}
          introInSideColumn
        />

        <ul className="service-cards" data-reveal>
          {empresas.services.map((service) => (
            <li key={service.title}>
              <a
                className={`service-card service-card--${service.tone}`}
                href={empresas.cta.href}
                onClick={goToContact}
              >
                <span className="service-card__icon">
                  <Icon name={service.icon} />
                </span>
                <div className="service-card__body">
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__copy">{service.text}</p>
                </div>
                <span className="service-card__arrow">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="consulting-cta" data-reveal>
          <div className="consulting-cta__body">
            <p className="kicker">{empresas.cta.eyebrow}</p>
            <h3 className="consulting-cta__title">{empresas.cta.title}</h3>
            <p className="consulting-cta__text">{empresas.cta.text}</p>
          </div>
          <Button href={empresas.cta.href} tone="paper" onClick={goToContact}>
            {empresas.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
