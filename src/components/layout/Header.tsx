import { useCallback, useEffect, useState } from 'react'
import { navLinks } from '@/content/site'
import { Arrow } from '@/components/ui/Arrow'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useActiveSection, useHasScrolled, useScrolledPast } from '@/hooks/useHeaderScroll'
import { Brand } from './Brand'
import { MobileMenu } from './MobileMenu'
import './Header.css'

const MOBILE_MENU_ID = 'menu-movil'
const HERO_ID = 'inicio'
const HEADER_OFFSET = 88

/** Ids de sección en orden de documento, para marcar la activa. */
const SECTION_IDS = navLinks.map((link) => link.href.slice(1))

/**
 * Cabecera fija con tres pieles:
 *
 *  1. Quieta arriba del todo — transparente, para no tapar el hero.
 *  2. Scrolleando dentro del hero — plano oscuro, el mismo del hero. Sin esto
 *     el contenido del hero se ve pasando por debajo de una barra sin fondo.
 *  3. Pasado el hero — papel con texto tinta, o el texto claro quedaría
 *     invisible sobre las secciones claras.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const hasScrolled = useHasScrolled()
  const pastHero = useScrolledPast(HERO_ID, HEADER_OFFSET)
  const activeSection = useActiveSection(SECTION_IDS)
  useScrollLock(open)

  const skin = pastHero ? 'is-past' : hasScrolled ? 'is-over' : ''

  const close = useCallback(() => setOpen(false), [])

  // Cerrar con Escape mientras el menú esté abierto.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <header className={`header${skin ? ` ${skin}` : ''}${open ? ' is-open' : ''}`}>
      <div className="container header__inner">
        {/* La marca va clara salvo sobre la barra de papel. Con el menú abierto
            la barra vuelve a ser oscura, así que la bajada también. */}
        <Brand light={!pastHero || open} />

        <nav className="header__nav" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const isActive = link.href.slice(1) === activeSection
            return (
              <a
                className={`header__nav-link${isActive ? ' is-active' : ''}`}
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <a className="header__contact" href="#contacto">
          <span>Contacto</span>
          <span className="header__contact-mark">
            <Arrow />
          </span>
        </a>

        <button
          className={`header__toggle${open ? ' is-open' : ''}`}
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setOpen((previous) => !previous)}
        >
          <span />
          <span />
        </button>
      </div>

      <MobileMenu id={MOBILE_MENU_ID} open={open} onNavigate={close} />
    </header>
  )
}
