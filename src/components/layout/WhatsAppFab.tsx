import { useEffect, useRef, useState } from 'react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { useContactChannel } from '@/context/ContactChannelContext'
import { contactChannels } from '@/content/site'
import './WhatsAppFab.css'

export function WhatsAppFab() {
  const { active, hasChosen, select } = useContactChannel()
  const [open, setOpen] = useState(false)
  const dockRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()

    const onPointerDown = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const content = (
    <>
      <span className="wa-fab__icon">
        <WhatsAppIcon />
      </span>
      {/* Etiqueta decorativa: el nombre accesible ya viaja en el aria-label. */}
      <span className="wa-fab__label" aria-hidden="true">
        Escribinos
      </span>
    </>
  )

  if (hasChosen) {
    return (
      <a
        className="wa-fab"
        href={active.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label={`Escribinos por WhatsApp — ${active.label}`}
      >
        {content}
      </a>
    )
  }

  return (
    <div className="wa-dock" ref={dockRef}>
      <button
        ref={toggleRef}
        type="button"
        className="wa-fab"
        aria-label="Escribinos por WhatsApp"
        aria-expanded={open}
        aria-controls="wa-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {content}
      </button>

      <div id="wa-menu" className={`wa-menu${open ? ' is-open' : ''}`}>
        <p className="wa-menu__title">¿Con quién querés hablar?</p>
        <ul className="wa-menu__list">
          {contactChannels.map((channel, index) => (
            <li key={channel.id}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                className={`wa-menu__option wa-menu__option--${channel.tone}`}
                href={channel.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  select(channel.id)
                  setOpen(false)
                }}
              >
                <span className="wa-menu__dot" aria-hidden="true" />
                <span>
                  <span className="wa-menu__label">{channel.label}</span>
                  <span className="wa-menu__phone">{channel.phone}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
