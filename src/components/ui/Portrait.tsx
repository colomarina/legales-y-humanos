import type { Discipline, Photo } from '@/content/site'
import './Portrait.css'

interface PortraitProps {
  tone: Discipline
  photo: Photo
}

/**
 * Retrato de cada profesional. El fondo del marco lleva el tono de su
 * disciplina y queda a la vista mientras la imagen carga.
 */
export function Portrait({ tone, photo }: PortraitProps) {
  return (
    <figure className={`portrait portrait--${tone}`}>
      <img
        className="portrait__image"
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}
