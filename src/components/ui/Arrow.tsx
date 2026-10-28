import './Arrow.css'

/**
 * Flecha diagonal: el signo gráfico recurrente de la dirección visual.
 * Siempre decorativa — el texto del enlace que la acompaña ya nombra la acción.
 */
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  )
}
