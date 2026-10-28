import { contacto } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { Logo } from '@/components/ui/Logo'
import { useContactChannel } from '@/context/ContactChannelContext'
import { ChannelPicker } from './ChannelPicker'
import { ContactForm } from './ContactForm'
import './Contacto.css'

export function Contacto() {
  // El recorrido puede venir ya elegido desde Empresas o Particulares.
  const { active, select } = useContactChannel()

  return (
    <section className="section contacto plane--paper" id="contacto">
      <div className="container">
        <div className="contacto__heading" data-reveal>
          {/* Antes había un monograma «L+H» inventado como recurso gráfico.
              Ahora existe el real. */}
          <Logo className="contacto__mark" />
          <div className="contacto__heading-body">
            <p className="kicker">{contacto.number}</p>
            <h2 className="contacto__title">
              {contacto.titleLead} <em>{contacto.titleAccent}</em>
            </h2>
            <p className="contacto__text">{contacto.text}</p>
          </div>
        </div>

        <div data-reveal>
          <ChannelPicker active={active} onSelect={select} />
        </div>

        <div className="contacto__grid">
          <div className="contacto__details" data-reveal>
            <div className="contacto__detail">
              <p className="kicker">{contacto.address.label}</p>
              <p className="contacto__address">
                {contacto.address.lines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < contacto.address.lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <a
                className="contacto__maps"
                href={contacto.address.mapsHref}
                target="_blank"
                rel="noreferrer"
              >
                {contacto.address.mapsLabel} <Arrow />
              </a>
            </div>

            <div className="contacto__detail">
              <p className="kicker">{contacto.modality.label}</p>
              <p className="contacto__address">{contacto.modality.lines[0]}</p>
            </div>

            <div className="contacto__detail">
              <p className="kicker">{contacto.social.label}</p>
              {contacto.social.accounts.map((account) => (
                <a
                  className="contacto__social-link"
                  href={account.href}
                  key={account.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon />
                  {account.handle}
                </a>
              ))}
            </div>
          </div>

          <div data-reveal>
            <ContactForm channel={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
