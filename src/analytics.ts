import { contactChannels, type ContactChannel } from '@/content/site'

export const GA_MEASUREMENT_ID: string = ''

export const analyticsEnabled = GA_MEASUREMENT_ID !== ''

type AreaId = ContactChannel['id']

type AnalyticsEvent =
  | { name: 'whatsapp_click'; params: { origen: string; area: AreaId | 'desconocida' } }
  | { name: 'generate_lead'; params: { area: AreaId; medio: 'formulario' } }
  | { name: 'select_area'; params: { area: AreaId } }

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

const WHATSAPP_PREFIX = 'https://wa.me/'

const isActive = () => analyticsEnabled && typeof window !== 'undefined' && Array.isArray(window.dataLayer)

function gtag(..._args: unknown[]) {
  window.dataLayer?.push(arguments)
}

export function trackEvent({ name, params }: AnalyticsEvent): void {
  if (!isActive()) return
  gtag('event', name, params)
}

const whatsappNumber = (href: string) => href.slice(WHATSAPP_PREFIX.length).split('?')[0]

function areaOfWhatsapp(href: string): AreaId | 'desconocida' {
  const number = whatsappNumber(href)
  const channel = contactChannels.find((candidate) => whatsappNumber(candidate.whatsapp) === number)
  return channel?.id ?? 'desconocida'
}

function originOf(link: Element): string {
  const section = link.closest('section[id]')
  if (section) return section.id
  if (link.closest('header')) return 'menu'
  if (link.closest('footer')) return 'pie'
  return 'boton-flotante'
}

function trackWhatsappClicks(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const link = target.closest<HTMLAnchorElement>(`a[href^="${WHATSAPP_PREFIX}"]`)
  if (!link) return
  trackEvent({ name: 'whatsapp_click', params: { origen: originOf(link), area: areaOfWhatsapp(link.href) } })
}

export function startAnalytics(): void {
  if (!analyticsEnabled || !import.meta.env.PROD || window.dataLayer) return

  window.dataLayer = []
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.append(script)

  document.addEventListener('click', trackWhatsappClicks, { capture: true })
}
