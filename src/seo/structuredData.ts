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
  type Discipline,
  type Profile,
} from '@/content/site'

const ESTUDIO_ID = `${SITE_URL}#estudio`
const OPEN_ENDED_SERVICE = 'Consultar por otras ramas del Derecho'
const JOB_TITLE: Record<Discipline, string> = {
  rrhh: 'Profesional de Recursos Humanos',
  juridico: 'Abogada',
}

const absolute = (path: string) => new URL(path, SITE_URL).href

function person(profile: Profile) {
  return {
    '@type': 'Person',
    name: profile.name,
    jobTitle: JOB_TITLE[profile.tone],
    image: absolute(profile.photo.src),
    worksFor: { '@id': ESTUDIO_ID },
    ...(profile.credential && {
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Matrícula profesional',
        name: profile.credential,
        recognizedBy: { '@type': 'Organization', name: estudio.bar },
      },
    }),
  }
}

function offerCatalog() {
  const services = [...empresas.services, ...particulares.services].filter(
    (service) => service.title !== OPEN_ENDED_SERVICE,
  )
  return {
    '@type': 'OfferCatalog',
    name: 'Servicios',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.text },
    })),
  }
}

export function buildStructuredData(): object {
  const estudioNode = {
    '@type': ['ProfessionalService', 'LegalService'],
    '@id': ESTUDIO_ID,
    name: brand.name,
    legalName: brand.legalName,
    url: SITE_URL,
    image: absolute(hero.photo.src),
    telephone: contactChannels.map((channel) => channel.phoneHref),
    email: contactChannels.map((channel) => channel.email),
    address: {
      '@type': 'PostalAddress',
      streetAddress: estudio.address.street,
      addressLocality: estudio.address.locality,
      addressRegion: estudio.address.region,
      addressCountry: estudio.address.country,
    },
    geo: { '@type': 'GeoCoordinates', ...estudio.geo },
    hasMap: contacto.address.mapsHref,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: estudio.openingHours.days,
        opens: estudio.openingHours.opens,
        closes: estudio.openingHours.closes,
      },
    ],
    foundingDate: estudio.foundingYear,
    areaServed: [
      { '@type': 'City', name: estudio.address.locality },
      { '@type': 'Country', name: 'Argentina' },
    ],
    sameAs: [...contacto.social.accounts.map((account) => account.href), contacto.address.mapsHref],
    employee: nosotras.profiles.map(person),
    hasOfferCatalog: offerCatalog(),
  }

  const webSite = {
    '@type': 'WebSite',
    url: SITE_URL,
    name: brand.name,
    inLanguage: 'es-AR',
    publisher: { '@id': ESTUDIO_ID },
  }

  return { '@context': 'https://schema.org', '@graph': [estudioNode, webSite] }
}

export function jsonLdScript(data: object): string {
  const json = JSON.stringify(data).replace(/</g, '\u003c')
  return `<script type="application/ld+json">${json}</script>`
}
