import { empresas } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import { Button } from '@/components/ui/Button'
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
          intro={empresas.intro}
        />

        <div className="service-list" data-reveal>
          {empresas.services.map((service, index) => (
            /* Enlace real: la fila responde al hover, así que tiene que conducir
               a la consulta, como en la propuesta visual aprobada. */
            <a
              className="service-row"
              href={empresas.cta.href}
              key={service.title}
              onClick={goToContact}
            >
              <span className="service-row__number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3 className="service-row__title">
                {service.title}
                <span aria-hidden="true">.</span>
              </h3>
              <p className="service-row__copy">{service.text}</p>
              <Arrow />
            </a>
          ))}
        </div>

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
