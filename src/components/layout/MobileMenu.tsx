import { brand, mobileNavLinks } from '@/content/site'
import './MobileMenu.css'

interface MobileMenuProps {
  id: string
  open: boolean
  onNavigate: () => void
}

/**
 * Panel de navegación móvil.
 *
 * Cuando está cerrado usa `visibility: hidden`, que además de ocultarlo lo
 * saca del orden de tabulación sin romper la transición.
 */
export function MobileMenu({ id, open, onNavigate }: MobileMenuProps) {
  return (
    <div className={`mobile-menu${open ? ' is-open' : ''}`} id={id}>
      <nav aria-label="Navegación móvil">
        {mobileNavLinks.map((link, index) => (
          <a className="mobile-menu__link" href={link.href} key={link.href} onClick={onNavigate}>
            <span className="mobile-menu__index">0{index + 1}</span>
            {link.label}
          </a>
        ))}
      </nav>
      <p className="mobile-menu__footer">{brand.location}</p>
    </div>
  )
}
