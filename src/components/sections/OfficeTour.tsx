import { useEffect, useRef, useState } from 'react'
import { oficina } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import './OfficeTour.css'

const VISIBLE_ENOUGH_TO_PLAY = 0.6

type TourState = 'waiting' | 'playing' | 'ended'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function OfficeTour() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<TourState>('waiting')

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
          return
        }
        if (!video.ended) void video.play().catch(() => undefined)
      },
      { threshold: VISIBLE_ENOUGH_TO_PLAY },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const replay = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    void video.play().catch(() => undefined)
  }

  return (
    <section className="office-tour plane--deep" aria-labelledby="office-tour-title">
      <div className="container office-tour__inner" data-reveal>
        <div className="office-tour__text">
          <p className="kicker kicker--ruled office-tour__kicker">{oficina.label}</p>
          <h2 className="office-tour__title" id="office-tour-title">
            {oficina.title} <em>{oficina.titleAccent}</em>
          </h2>
          <p className="office-tour__body">{oficina.text}</p>
          <a className="office-tour__directions" href={oficina.directionsHref}>
            {oficina.directionsLabel} <Arrow />
          </a>
        </div>

        <div className="office-tour__media">
          <figure className="office-tour__frame">
            <img
              src={oficina.entrance.src}
              alt={oficina.entrance.alt}
              width={oficina.entrance.width}
              height={oficina.entrance.height}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className="office-tour__frame office-tour__frame--video">
            <video
              ref={videoRef}
              src={oficina.tour.src}
              poster={oficina.tour.poster}
              aria-label={oficina.tour.label}
              muted
              playsInline
              preload="none"
              onPlay={() => setState('playing')}
              onEnded={() => setState('ended')}
            />
            {state !== 'playing' && (
              <button type="button" className="office-tour__play" onClick={replay}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                </svg>
                <span className="office-tour__play-label">
                  {state === 'ended' ? oficina.tour.replayLabel : oficina.tour.playLabel}
                </span>
              </button>
            )}
          </figure>
        </div>
      </div>
    </section>
  )
}
