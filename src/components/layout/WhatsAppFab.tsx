import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { useContactChannel } from '@/context/ContactChannelContext'
import './WhatsAppFab.css'

/**
 * Acceso flotante a WhatsApp, siempre visible abajo a la derecha.
 *
 * Usa el recorrido activo del sitio (Empresas por defecto), así quien ya se
 * identificó navegando por «Particulares» escribe al número que corresponde
 * sin que se le vuelva a preguntar.
 *
 * Vive fuera de `.site-shell` por la misma razón que la cabecera: ese
 * contenedor recorta el desborde y un ancestro que recorta también recorta a
 * sus descendientes fijos.
 */
export function WhatsAppFab() {
  const { active } = useContactChannel()

  return (
    <a
      className="wa-fab"
      href={active.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escribinos por WhatsApp — ${active.label}`}
    >
      <span className="wa-fab__icon">
        <WhatsAppIcon />
      </span>
      {/* Etiqueta decorativa: el nombre accesible ya viaja en el aria-label. */}
      <span className="wa-fab__label" aria-hidden="true">
        Escribinos
      </span>
    </a>
  )
}
