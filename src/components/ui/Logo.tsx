import './Logo.css'

export type LogoVariant = 'monograma' | 'completo'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  /** Texto accesible. Sin él, el logo queda como decoración. */
  label?: string
}

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
