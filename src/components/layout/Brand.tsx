import { brand } from '@/content/site'
import { Logo } from '@/components/ui/Logo'
import './Brand.css'

interface BrandProps {
  /** Variante para planos oscuros. */
  light?: boolean
}

export function Brand({ light = false }: BrandProps) {
  return (
    <a
      className={`brand${light ? ' brand--light' : ''}`}
      href="#inicio"
      aria-label={`${brand.name}, ir al inicio`}
    >
      <Logo className="brand__mark" />
      <span className="brand__text">
        <span className="brand__main">
          Legales <i>y</i> Humanos
        </span>
        <span className="brand__sub">{brand.legalName}</span>
      </span>
    </a>
  )
}
