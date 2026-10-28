import './Logo.css'

export type LogoVariant = 'monograma' | 'completo'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  /** Texto accesible. Sin él, el logo queda como decoración. */
  label?: string
}

/**
 * Logo de Bogarsukoff & Baldaro.
 *
 * Se dibuja con `mask-image` y no con `<img>`: los archivos originales eran
 * JPEG con fondo blanco, que sobre el plano oscuro habrían quedado dentro de
 * una caja blanca. Como máscara, el color lo pone `currentColor`, así que el
 * mismo archivo sirve beige sobre oscuro, tinta sobre papel o azul, y hereda
 * el color de la piel activa de la cabecera sin exportar variantes.
 */
export function Logo({ variant = 'monograma', className, label }: LogoProps) {
  return (
    <span
      className={`logo logo--${variant}${className ? ` ${className}` : ''}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
