import type { ContactChannel } from '@/content/site'
import { contactChannels, contacto } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import './ChannelPicker.css'

interface ChannelPickerProps {
  active: ContactChannel
  onSelect: (id: ContactChannel['id']) => void
}

/**
 * Selector de recorrido: Empresas o Particulares.
 *
 * Es la única decisión que se le pide al visitante. De ella dependen los datos
 * de contacto que se muestran y la casilla a la que va el formulario, así que
 * el campo "Tipo de consulta" ya no hace falta.
 *
 * Usa radios nativos (ocultos visualmente) en lugar de ARIA de pestañas: se
 * navegan con flechas, se anuncian solos y no hay estado que mantener a mano.
 */
export function ChannelPicker({ active, onSelect }: ChannelPickerProps) {
  return (
    <div className="picker">
      <fieldset className="picker__fieldset">
        <legend className="picker__legend">{contacto.channelsLabel}</legend>
        <div className="picker__options">
          {contactChannels.map((channel) => {
            const isActive = channel.id === active.id
            return (
              <label
                className={`picker__option picker__option--${channel.tone}${
                  isActive ? ' is-active' : ''
                }`}
                key={channel.id}
              >
                <input
                  className="visually-hidden"
                  type="radio"
                  name="recorrido"
                  value={channel.id}
                  checked={isActive}
                  onChange={() => onSelect(channel.id)}
                />
                <span className="picker__head">
                  {/* El estado no se transmite sólo con el relleno de color:
                      el punto de radio lo hace explícito. */}
                  <span className="picker__dot" aria-hidden="true" />
                  <span className="picker__eyebrow">
                    <span className="picker__index">{channel.index}</span> / {channel.label}
                  </span>
                </span>
                <span className="picker__description">{channel.description}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* El aria-live va en el envoltorio estable; el hijo se remonta con la
          clave para que el cambio de recorrido se note con un destello. */}
      <div className="picker__panel-wrap" aria-live="polite">
        <div className={`picker__panel picker__panel--${active.tone}`} key={active.id}>
          <a className="picker__email" href={`mailto:${active.email}`}>
            {active.email}
          </a>
          <div className="picker__direct">
            <a className="picker__action" href={`tel:${active.phoneHref}`}>
              {active.phone}
            </a>
            <a className="picker__action" href={active.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp <Arrow />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
