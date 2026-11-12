import { useState } from 'react'
import { contacto } from '@/content/site'
import './OfficeMap.css'

const { map } = contacto.address

export function OfficeMap() {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div className="office-map">
        <iframe
          className="office-map__frame"
          src={map.embedSrc}
          title={map.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="office-map">
      <img className="office-map__preview" src={map.previewSrc} alt="" loading="lazy" decoding="async" />
      <span className="office-map__credit">{map.previewCredit}</span>
      <button type="button" className="office-map__placeholder" onClick={() => setLoaded(true)}>
        <svg
          className="office-map__pin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <span className="office-map__label">{map.loadLabel}</span>
        <span className="office-map__hint">{map.loadHint}</span>
      </button>
    </div>
  )
}
