import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { Contacto } from '@/components/sections/Contacto'
import { Empresas } from '@/components/sections/Empresas'
import { Hero } from '@/components/sections/Hero'
import { Metodo } from '@/components/sections/Metodo'
import { Nosotras } from '@/components/sections/Nosotras'
import { Particulares } from '@/components/sections/Particulares'
import { ContactChannelProvider } from '@/context/ContactChannelContext'
import { useReveal } from '@/hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <ContactChannelProvider>
      {/* La cabecera fija y el salto al contenido quedan fuera de `.site-shell`:
          ese contenedor recorta el desborde de la geometría, y un ancestro que
          recorta puede recortar también a sus descendientes fijos. */}
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>

      <Header />

      <div className="site-shell">
        <main id="contenido">
          <Hero />
          <Nosotras />
          <Empresas />
          <Particulares />
          <Metodo />
          <Contacto />
        </main>

        <Footer />
      </div>

      <WhatsAppFab />
    </ContactChannelProvider>
  )
}
