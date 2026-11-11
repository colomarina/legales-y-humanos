import type { Discipline, Photo } from '@/content/site'
import './Portrait.css'

interface PortraitProps {
  tone: Discipline
  photo: Photo
}

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
