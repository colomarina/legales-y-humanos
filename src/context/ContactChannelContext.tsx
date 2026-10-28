import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { contactChannels, type ContactChannel } from '@/content/site'

interface ContactChannelValue {
  active: ContactChannel
  select: (id: ContactChannel['id']) => void
}

const ContactChannelContext = createContext<ContactChannelValue | null>(null)

/**
 * Recorrido de contacto elegido, compartido por toda la página.
 *
 * Vive acá y no dentro de la sección Contacto porque los enlaces de Empresas y
 * Particulares lo preseleccionan al navegar: quien hace clic en «Servicios para
 * particulares» ya dijo quién es, así que no tiene sentido volver a
 * preguntárselo al llegar al formulario.
 */
export function ContactChannelProvider({ children }: { children: ReactNode }) {
  // Empresas es el recorrido por defecto: es el servicio principal de la consultora.
  const [activeId, setActiveId] = useState<ContactChannel['id']>(contactChannels[0].id)

  const select = useCallback((id: ContactChannel['id']) => setActiveId(id), [])

  const value = useMemo<ContactChannelValue>(
    () => ({
      active: contactChannels.find((channel) => channel.id === activeId) ?? contactChannels[0],
      select,
    }),
    [activeId, select],
  )

  return <ContactChannelContext.Provider value={value}>{children}</ContactChannelContext.Provider>
}

export function useContactChannel(): ContactChannelValue {
  const value = useContext(ContactChannelContext)
  if (!value) {
    throw new Error('useContactChannel debe usarse dentro de ContactChannelProvider')
  }
  return value
}
