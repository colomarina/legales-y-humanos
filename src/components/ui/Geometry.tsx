import './Geometry.css'

export type GeometryVariant = 'hero' | 'banner'

/**
 * Geometría de marca: círculo beige (Recursos Humanos) y barra azul inclinada
 * (Jurídico), que se intersectan como metáfora de la mirada integral.
 *
 * Ocupa el lugar que en la propuesta visual tenía una fotografía de archivo.
 * Es puramente decorativa y queda fuera del árbol de accesibilidad.
 */
export function Geometry({ variant = 'hero' }: { variant?: GeometryVariant }) {
  return (
    <div className={`geometry geometry--${variant}`} aria-hidden="true">
      <span className="geometry__glow" />
      <span className="geometry__circle" />
      <span className="geometry__bar" />
    </div>
  )
}
