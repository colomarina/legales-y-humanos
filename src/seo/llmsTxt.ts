import { SITE_URL } from '@/content/siteUrl'
import {
  brand,
  contacto,
  contactChannels,
  empresas,
  estudio,
  hero,
  nosotras,
  particulares,
  preguntas,
  seo,
  type ServiceItem,
} from '@/content/site'

const DAY_NAMES: Record<(typeof estudio.openingHours.days)[number], string> = {
  Monday: 'lunes',
  Tuesday: 'martes',
  Wednesday: 'miércoles',
  Thursday: 'jueves',
  Friday: 'viernes',
}

const anchor = (id: string) => `${SITE_URL}#${id}`

const serviceLines = (services: readonly ServiceItem[]) =>
  services.map((service) => `- **${service.title}**: ${service.text}`)

function openingHours(): string {
  const { days, opens, closes } = estudio.openingHours
  return `${DAY_NAMES[days[0]]} a ${DAY_NAMES[days[days.length - 1]]} de ${opens} a ${closes} hs`
}

export function buildLlmsTxt(): string {
  const people = nosotras.profiles.map((profile) => {
    const credential = profile.credential ? ` Matrícula ${profile.credential} (${estudio.bar}).` : ''
    return `- **${profile.name}**: ${profile.role}${credential}`
  })

  const channels = contactChannels.map(
    (channel) => `- ${channel.label}: ${channel.phone} (llamada o WhatsApp) · ${channel.email}`,
  )

  const faq = preguntas.groups.flatMap((group) => [
    `### ${group.label}`,
    '',
    ...group.items.flatMap((item) => [`**${item.question}**`, item.answer, '']),
  ])

  return [
    `# ${brand.name}`,
    '',
    `> ${seo.description}`,
    '',
    hero.description,
    '',
    `Razón social: ${brand.legalName} En actividad desde ${estudio.foundingYear}, con oficina en ${estudio.address.locality}, ${estudio.address.region}, Argentina.`,
    '',
    '## Profesionales',
    '',
    ...people,
    '',
    `## [Servicios para empresas](${anchor('empresas')})`,
    '',
    empresas.intro,
    '',
    ...serviceLines(empresas.services),
    '',
    `## [Servicios para particulares](${anchor('particulares')})`,
    '',
    particulares.intro,
    '',
    ...serviceLines(particulares.services),
    '',
    `## [Contacto](${anchor('contacto')})`,
    '',
    `- Dirección: ${estudio.address.street}, ${estudio.address.locality}, ${estudio.address.region}, Argentina`,
    `- Horario: ${openingHours()}`,
    `- Modalidad: ${contacto.modality.lines.join(' ')}. Presencial en ${estudio.address.locality}; el resto del país, por videollamada.`,
    ...channels,
    `- Google Maps: ${contacto.address.mapsHref}`,
    ...contacto.social.accounts.map((account) => `- Instagram: ${account.href}`),
    '',
    `## [Preguntas frecuentes](${anchor('preguntas')})`,
    '',
    ...faq,
  ].join('\n')
}
