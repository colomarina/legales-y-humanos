import { useRef, useState, type FormEvent } from 'react'
import { contacto, type ContactChannel, type Discipline } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import { buttonClassName, type ButtonTone } from '@/components/ui/Button'
import './ContactForm.css'

const { form } = contacto

/** El formulario se viste del color de la disciplina del recorrido elegido. */
const TONE_BY_DISCIPLINE: Record<Discipline, ButtonTone> = {
  rrhh: 'warm',
  juridico: 'blue',
}

type FieldName = 'name' | 'email' | 'message' | 'consent'
type Errors = Partial<Record<FieldName, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(data: FormData): Errors {
  const errors: Errors = {}
  const value = (key: string) => String(data.get(key) ?? '').trim()

  if (!value('name')) errors.name = 'Contanos tu nombre para poder responderte.'

  const email = value('email')
  if (!email) errors.email = 'Necesitamos un correo para responderte.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Revisá el correo: parece incompleto.'

  if (!value('message')) errors.message = 'Contanos brevemente tu consulta.'
  if (!data.get('consent')) errors.consent = 'Necesitamos tu conformidad para responderte.'

  return errors
}

/** Arma el correo con la consulta ya redactada. */
function buildMailto(data: FormData, channel: ContactChannel): string {
  const value = (key: string) => String(data.get(key) ?? '').trim()
  const phone = value('phone')

  const body = [
    `Nombre: ${value('name')}`,
    `Correo: ${value('email')}`,
    phone ? `Teléfono: ${phone}` : null,
    `Consulta sobre: ${channel.label}`,
    '',
    'Mensaje:',
    value('message'),
  ]
    .filter((line) => line !== null)
    .join('\n')

  const subject = `Consulta desde la web — ${channel.label}`
  return `mailto:${channel.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

interface ContactFormProps {
  /** Recorrido elegido arriba: define el destinatario del correo. */
  channel: ContactChannel
}

/**
 * Formulario de consulta.
 *
 * No pregunta el tipo de consulta: lo hereda del selector de recorrido, que es
 * la única decisión que se le pide al visitante.
 *
 * El envío abre el programa de correo con la consulta ya redactada, dirigida a
 * la casilla del recorrido. No hay backend: es deliberado, para no depender de
 * un servicio externo. Si se conecta uno, sólo cambia `handleSubmit`.
 */
export function ContactForm({ channel }: ContactFormProps) {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const formRef = useRef<HTMLFormElement>(null)
  const tone = TONE_BY_DISCIPLINE[channel.tone]

  const revalidate = (field: FieldName) => {
    // Sólo se corrige un error ya visible; no se penaliza al escribir por primera vez.
    if (!errors[field] || !formRef.current) return
    const next = validate(new FormData(formRef.current))
    setErrors((previous) => ({ ...previous, [field]: next[field] }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    window.location.href = buildMailto(data, channel)
    setSent(true)
  }

  if (sent) {
    return (
      <div className={`contact-form contact-form--${channel.tone}`} id="formulario">
        <div className="contact-form__success" role="status">
          <p className="kicker">Consulta recibida</p>
          <strong>{form.successTitle}</strong>
          <p>{form.successText}</p>
          <p className="contact-form__hint">{form.successHint}</p>
          <button
            className="contact-form__reset"
            type="button"
            onClick={() => {
              setSent(false)
              setErrors({})
            }}
          >
            {form.resetLabel}
          </button>
        </div>
      </div>
    )
  }

  /** Atributos de accesibilidad para un campo con posible error. */
  const fieldProps = (field: FieldName) =>
    errors[field]
      ? { 'aria-invalid': true as const, 'aria-describedby': `error-${field}` }
      : { 'aria-invalid': undefined, 'aria-describedby': undefined }

  const errorFor = (field: FieldName) =>
    errors[field] ? (
      <span className="field__error" id={`error-${field}`} role="alert">
        {errors[field]}
      </span>
    ) : null

  return (
    <div className={`contact-form contact-form--${channel.tone}`} id="formulario">
      <div className="contact-form__intro">
        <p className="kicker">{form.heading}</p>
        <p className="contact-form__intro-text">
          {form.text} Tu consulta llega a <strong>{channel.label}</strong>.
        </p>
      </div>

      <form className="contact-form__fields" ref={formRef} onSubmit={handleSubmit} noValidate>
        <label className="field field--full">
          <span className="field__label">Nombre y apellido</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            onBlur={() => revalidate('name')}
            {...fieldProps('name')}
          />
          {errorFor('name')}
        </label>

        <label className="field">
          <span className="field__label">Correo electrónico</span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nombre@email.com"
            onBlur={() => revalidate('email')}
            {...fieldProps('email')}
          />
          {errorFor('email')}
        </label>

        <label className="field">
          <span className="field__label">
            Teléfono <small>(opcional)</small>
          </span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+54 9" />
        </label>

        <label className="field field--full">
          <span className="field__label">Mensaje</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Contanos brevemente tu consulta"
            onBlur={() => revalidate('message')}
            {...fieldProps('message')}
          />
          {errorFor('message')}
        </label>

        <div className="field field--full">
          <label className="field--consent">
            <input
              name="consent"
              type="checkbox"
              onChange={() => revalidate('consent')}
              {...fieldProps('consent')}
            />
            <span>{form.consent}</span>
          </label>
          {errorFor('consent')}
        </div>

        <button className={`${buttonClassName(tone)} contact-form__submit`} type="submit">
          <span className="button__label">{form.submitLabel}</span>
          <Arrow />
        </button>
      </form>
    </div>
  )
}
