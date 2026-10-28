import { brand, footer } from '@/content/site'
import { Logo } from '@/components/ui/Logo'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer plane--deep">
      <div className="container footer__top">
        {/* El pie es el cierre institucional: acá va el lockup completo de la
            firma, no la marca comercial abreviada. */}
        <Logo
          variant="completo"
          className="footer__logo"
          label={`${brand.legalName} — Estudio Jurídico y Recursos Humanos`}
        />
        <p className="footer__tagline">
          {footer.taglineLines[0]}
          <br />
          <em>{footer.taglineLines[1]}</em>
        </p>
        <a className="footer__top-link" href="#inicio">
          {footer.backToTop}
          <span className="footer__top-mark" aria-hidden="true">
            ↑
          </span>
        </a>
      </div>
      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}
        </span>
        {footer.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </footer>
  )
}
