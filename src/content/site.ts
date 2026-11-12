/*
 * Contenido del sitio.
 * -----------------------------------------------------------------------------
 * Todos los textos provienen del proyecto /estructura, aprobado por las clientas.
 * No se inventa informacion: lo que falta queda marcado con `pendiente: true`.
 */

import type { IconName } from '@/components/ui/Icon'

export type Discipline = 'rrhh' | 'juridico'

export type Accent = 'warm' | 'blue'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export interface Photo {
  src: string
  alt: string
  width: number
  height: number
}

export interface NavLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  discipline: string
  tone: Discipline
  role: string
  bio: string
  photo: Photo
}

export interface ServiceItem {
  title: string
  text: string
  icon: IconName
  accent: Accent
}

export interface ProcessStep {
  title: string
  text: string
}

export interface ContactChannel {
  id: 'empresas' | 'particulares'
  index: string
  tone: Discipline
  label: string
  description: string
  email: string
  /** Formato local, para mostrar. */
  phone: string
  /** E.164 con el 9 de celular argentino. */
  phoneHref: string
  whatsapp: string
}

export const brand = {
  name: 'Legales y Humanos',
  legalName: 'Bogarsukoff & Baldaro Asoc.',
  tagline: 'Dos profesiones. Una mirada integral.',
  location: 'La Plata · Argentina',
} as const

/** Navegación de escritorio: no incluye Contacto, que vive en el botón del header. */
export const navLinks: NavLink[] = [
  { label: 'Nosotras', href: '#nosotras' },
  { label: 'Empresas', href: '#empresas' },
  { label: 'Particulares', href: '#particulares' },
  { label: 'Cómo trabajamos', href: '#metodo' },
]

/** Navegación móvil: lista completa y numerada. */
export const mobileNavLinks: NavLink[] = [
  { label: 'Nosotras', href: '#nosotras' },
  { label: 'Servicios para empresas', href: '#empresas' },
  { label: 'Servicios para particulares', href: '#particulares' },
  { label: 'Cómo trabajamos', href: '#metodo' },
  { label: 'Contacto', href: '#contacto' },
]

export const hero = {
  /* "Dos profesiones. Una mirada integral." partido en dos para el corte de
     línea deliberado de la dirección visual. El acento va en la segunda. */
  leadLines: ['Dos profesiones.', 'Una mirada integral.'],
  description:
    'Una consultora jurídica y de Recursos Humanos que combina conocimiento, experiencia y cercanía para acompañar a empresas y particulares.',
  descriptionShort:
    'Una consultora jurídica y de Recursos Humanos que combina conocimiento, experiencia y cercanía.',
  primaryCta: { label: 'Conocé nuestros servicios', href: '#empresas' },
  secondaryCta: { label: 'Contactanos', href: '#contacto' },
  photo: {
    src: asset('fotos/estudio.webp'),
    alt: 'Sala de reuniones del estudio, con el logo de Bogarsukoff & Baldaro en la pared',
    width: 1200,
    height: 1200,
  } satisfies Photo,
  photoWideSrcSet: [1280, 1920, 2560]
    .map((width) => `${asset(`fotos/estudio-ancho-${width}.webp`)} ${width}w`)
    .join(', '),
} as const

export const nosotras = {
  number: '01 — Nosotras',
  title: 'Las profesionales detrás de',
  titleAccent: 'Legales y Humanos.',
  profiles: [
    {
      name: 'Antonella Baldaro',
      discipline: 'Recursos Humanos',
      tone: 'rrhh',
      role: 'Profesional de Recursos Humanos. Cofundadora y titular.',
      bio: 'Acompaña a empresas en la gestión de personas, las relaciones laborales y la organización de sus procesos de Recursos Humanos.',
      photo: {
        src: asset('fotos/antonella.webp'),
        alt: 'Antonella Baldaro sentada a su escritorio en el estudio',
        width: 1000,
        height: 1250,
      },
    },
    {
      name: 'Brenda Bogarsukoff',
      discipline: 'Asesoramiento jurídico',
      tone: 'juridico',
      role: 'Abogada. Cofundadora y titular.',
      bio: 'Brinda asesoramiento jurídico a empresas y particulares, con especial atención a las relaciones laborales y la prevención de conflictos.',
      photo: {
        src: asset('fotos/brenda.webp'),
        alt: 'Brenda Bogarsukoff sentada a su escritorio en el estudio',
        width: 1000,
        height: 1250,
      },
    },
  ] satisfies Profile[],
  banner: {
    lineOne: 'Dos profesiones.',
    lineTwo: 'Una mirada integral.',
    caption: 'Legales y Humanos · La Plata',
    photo: {
      src: asset('fotos/antonella-y-brenda.webp'),
      alt: 'Antonella Baldaro y Brenda Bogarsukoff sentadas juntas a una mesa del estudio',
      width: 900,
      height: 1200,
    } satisfies Photo,
  },
} as const

export const empresas = {
  number: '02 — Empresas',
  kicker: 'Servicios integrales',
  title: '¿Cómo podemos acompañar',
  titleAccent: 'a tu empresa?',
  intro:
    'Brindamos servicios de Recursos Humanos y asesoramiento jurídico laboral, adaptados a las necesidades de cada organización.',
  services: [
    {
      title: 'Gestión de Recursos Humanos',
      text: 'Te acompañamos en la administración y organización del personal, con procesos claros, ordenados y eficientes.',
      icon: 'people',
      accent: 'warm',
    },
    {
      title: 'Asesoramiento en Relaciones Laborales',
      text: 'Brindamos orientación legal en la gestión del vínculo laboral, la aplicación de la normativa y la prevención de conflictos.',
      icon: 'scale',
      accent: 'blue',
    },
    {
      title: 'Procesos y Organización',
      text: 'Diseñamos y ordenamos políticas, circuitos y documentación interna para una operación más clara, segura y previsible.',
      icon: 'layers',
      accent: 'blue',
    },
    {
      title: 'Selección y Reclutamiento',
      text: 'Identificamos y evaluamos perfiles alineados a las necesidades y la cultura de tu equipo.',
      icon: 'person',
      accent: 'warm',
    },
  ] satisfies ServiceItem[],
  cta: {
    eyebrow: 'Una solución a tu medida',
    title: '¿Tu empresa necesita otro tipo de asesoramiento?',
    text: 'Contanos qué necesitás y evaluaremos cómo podemos acompañarte.',
    label: 'Solicitar asesoramiento',
    href: '#contacto',
  },
} as const

export const particulares = {
  number: '03 — Particulares',
  kicker: 'Asesoramiento jurídico',
  title: 'Servicios para particulares.',
  intro: 'Brindamos asesoramiento y representación jurídica a particulares en distintas áreas del Derecho.',
  services: [
    {
      title: 'Derecho Laboral',
      text: 'Asesoramiento y representación en relaciones laborales, conflictos y reclamos.',
      icon: 'scale',
      accent: 'warm',
    },
    {
      title: 'Derecho Previsional',
      text: 'Gestión y asesoramiento en trámites y prestaciones ante organismos previsionales.',
      icon: 'coins',
      accent: 'blue',
    },
    {
      title: 'Derecho Sucesorio',
      text: 'Acompañamiento integral en sucesiones, declaratorias y trámites registrales.',
      icon: 'document',
      accent: 'blue',
    },
    {
      title: 'Consultar por otras ramas del Derecho',
      text: 'Analizamos tu caso y te orientamos según la necesidad.',
      icon: 'grid',
      accent: 'warm',
    },
  ] satisfies ServiceItem[],
  cta: {
    text: '¿Necesitás asesoramiento jurídico?',
    label: 'Realizar una consulta',
    href: '#contacto',
  },
} as const

export const metodo = {
  number: '04 — Nuestro método',
  kicker: 'Simple, claro y cercano',
  title: 'Cómo trabajamos.',
  steps: [
    { title: 'Contacto inicial', text: 'Nos contás tu situación, inquietud o necesidad.' },
    { title: 'Análisis', text: 'Estudiamos el contexto desde una perspectiva integral.' },
    { title: 'Propuesta', text: 'Definimos un camino de trabajo claro y a medida.' },
    { title: 'Acompañamiento', text: 'Avanzamos con cercanía, criterio y seguimiento.' },
  ] satisfies ProcessStep[],
} as const

const EMAIL_EMPRESAS = 'Bogarsukoffbaldaroasoc@gmail.com'
const EMAIL_PARTICULARES = 'consultas.estudiobb@gmail.com'

const whatsappLink = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`

/**
 * Los dos recorridos de contacto, con el color de su disciplina.
 * Ambos teléfonos son celulares, así que los dos ofrecen WhatsApp y llamada.
 */
export const contactChannels: ContactChannel[] = [
  {
    id: 'empresas',
    index: '01',
    tone: 'rrhh',
    label: 'Empresas',
    description: 'Recursos Humanos y asesoramiento jurídico laboral para organizaciones.',
    email: EMAIL_EMPRESAS,
    phone: '221 579-0446',
    phoneHref: '+5492215790446',
    whatsapp: whatsappLink(
      '5492215790446',
      'Hola, les escribo desde la web por una consulta para mi empresa.',
    ),
  },
  {
    id: 'particulares',
    index: '02',
    tone: 'juridico',
    label: 'Particulares',
    description: 'Asesoramiento y representación jurídica en distintas áreas del Derecho.',
    email: EMAIL_PARTICULARES,
    phone: '221 435-3373',
    phoneHref: '+5492214353373',
    whatsapp: whatsappLink(
      '5492214353373',
      'Hola, les escribo desde la web por una consulta como particular.',
    ),
  },
]

export const contacto = {
  number: '05 — Contacto',
  title: 'Hablemos de',
  titleAccent: 'tu consulta.',
  text: 'Estamos para escuchar tu situación y ayudarte a encontrar un camino claro.',
  /* Etiqueta del selector de recorrido: es la única decisión que se le pide
     al visitante, y de ella dependen los datos de contacto y el destino
     del formulario. */
  channelsLabel: '¿Sobre qué querés consultarnos?',
  address: {
    label: 'Dirección',
    lines: ['Calle 49 n° 876, piso 4, oficinas B y C', 'La Plata, Buenos Aires'],
    mapsLabel: 'Ver en Google Maps',
    mapsHref: 'https://maps.app.goo.gl/jv9MrFxizEy6ukHZ7',
    map: {
      title: 'Ubicación del estudio en Google Maps',
      loadLabel: 'Ver mapa',
      loadHint: 'Se carga desde Google Maps',
      previewSrc: asset('fotos/mapa-estudio.webp'),
      previewCredit: '© OpenStreetMap',
      embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(
        'Bogarsukoff & Baldaro Asoc., Calle 49 876, La Plata, Buenos Aires',
      )}&z=17&output=embed`,
    },
  },
  modality: {
    label: 'Modalidad',
    lines: ['Consultas presenciales y virtuales'],
  },
  social: {
    label: 'Seguinos en Instagram',
    accounts: [
      { handle: '@legalesyhumanos.rrhh', href: 'https://www.instagram.com/legalesyhumanos.rrhh' },
      { handle: '@legalesyhumanos_', href: 'https://www.instagram.com/legalesyhumanos_' },
    ],
  },
  form: {
    heading: 'Formulario de contacto',
    text: 'Completá tus datos y contanos brevemente cómo podemos ayudarte.',
    consent: 'Acepto que mis datos sean utilizados para responder esta consulta.',
    submitLabel: 'Enviar consulta',
    successTitle: 'Gracias por escribirnos.',
    successText: 'Tu consulta quedó preparada para ser enviada.',
    successHint:
      'Se abrió tu programa de correo con la consulta completa. Revisala y tocá enviar para que nos llegue.',
    resetLabel: 'Enviar otra consulta',
  },
} as const

export const footer = {
  taglineLines: ['Dos profesiones.', 'Una mirada integral.'],
  backToTop: 'Volver arriba',
  meta: ['Consultora Jurídica y de Recursos Humanos', 'La Plata · Argentina'],
} as const
