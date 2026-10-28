/*
 * Contenido del sitio.
 * -----------------------------------------------------------------------------
 * Todos los textos provienen del proyecto /estructura, aprobado por las clientas.
 * No se inventa informacion: lo que falta queda marcado con `pendiente: true`.
 */

export type Discipline = 'rrhh' | 'juridico'

export interface NavLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  discipline: string
  tone: Discipline
  role: string
  quote: string
  skills: string[]
  portraitAlt: string
}

export interface ServiceItem {
  title: string
  text: string
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
  eyebrow: ['Consultora Jurídica', 'Recursos Humanos', 'La Plata'],
  /* "Dos profesiones. Una mirada integral." partido en dos para el corte de
     línea deliberado de la dirección visual. El acento va en la segunda. */
  leadLines: ['Dos profesiones.', 'Una mirada integral.'],
  description:
    'Una consultora jurídica y de Recursos Humanos que combina conocimiento, experiencia y cercanía para acompañar a empresas y particulares.',
  primaryCta: { label: 'Conocé nuestros servicios', href: '#empresas' },
  secondaryCta: { label: 'Contactanos', href: '#contacto' },
  footnotes: ['Asesoramiento claro', 'Criterio humano'],
} as const

export const nosotras = {
  number: '01 — Nosotras',
  kicker: 'Dos perspectivas, un mismo propósito',
  title: 'Conocimiento que se complementa.',
  profiles: [
    {
      name: 'Antonella Baldaro',
      discipline: 'Recursos Humanos',
      tone: 'rrhh',
      role: 'Profesional de Recursos Humanos. Cofundadora y titular.',
      quote:
        '“Acompaño a empresas en la gestión de sus relaciones laborales, buscando generar procesos más claros, organizados y preventivos.”',
      skills: [
        'Gestión de personas',
        'Relaciones laborales',
        'Selección y Reclutamiento',
        'Procesos y organización laboral',
      ],
      portraitAlt: 'Espacio reservado para el retrato de Antonella Baldaro',
    },
    {
      name: 'Brenda Bogarsukoff',
      discipline: 'Asesoramiento jurídico',
      tone: 'juridico',
      role: 'Abogada. Cofundadora y titular.',
      /* Pasada a primera persona para unificar la voz con la cita de Antonella;
         el texto original de /estructura estaba en tercera. */
      quote:
        '“Aporto la perspectiva jurídica necesaria para analizar las implicancias legales de las decisiones vinculadas a las relaciones laborales.”',
      skills: [
        'Derecho Laboral',
        'Asesoramiento jurídico',
        'Prevención y resolución de contingencias laborales',
      ],
      portraitAlt: 'Espacio reservado para el retrato de Brenda Bogarsukoff',
    },
  ] satisfies Profile[],
  banner: {
    lineOne: 'Dos profesiones.',
    lineTwo: 'Una mirada integral.',
    caption: 'Legales y Humanos · La Plata',
  },
} as const

export const empresas = {
  number: '02 — Empresas',
  kicker: 'Servicios integrales',
  title: '¿Cómo podemos acompañar a tu empresa?',
  intro:
    'Brindamos servicios de Recursos Humanos y asesoramiento jurídico laboral, adaptados a las necesidades de cada organización.',
  services: [
    {
      title: 'Gestión de Recursos Humanos',
      text: 'Diseñamos y acompañamos una gestión de personas clara, consistente y alineada con la realidad de tu organización.',
    },
    {
      title: 'Asesoramiento en Relaciones Laborales',
      text: 'Integramos la mirada jurídica y humana para prevenir contingencias y construir vínculos laborales sostenibles.',
    },
    {
      title: 'Procesos y Organización',
      text: 'Ordenamos políticas, circuitos y documentación para que la operación cotidiana gane claridad y previsibilidad.',
    },
    {
      title: 'Selección y Reclutamiento',
      text: 'Buscamos perfiles que respondan a las necesidades técnicas y culturales de cada equipo.',
    },
    {
      title: 'Consultoría de Recursos Humanos',
      text: 'Desarrollamos soluciones a medida para desafíos específicos, con criterio profesional y cercanía.',
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
  intro:
    'Además de nuestros servicios de consultoría para empresas, brindamos asesoramiento y representación jurídica a particulares en distintas áreas del Derecho.',
  services: [
    'Accidentes de Trabajo y Enfermedades Profesionales (ART)',
    'Derecho Previsional',
    'Derecho Sucesorio',
    'Otras ramas del Derecho',
  ],
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
    whatsapp: 'https://wa.me/5492215790446',
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
    whatsapp: 'https://wa.me/5492214353373',
  },
]

export const contacto = {
  number: '05 — Contacto',
  titleLead: 'Hablemos de',
  titleAccent: 'tu consulta.',
  text: 'Estamos para escuchar tu situación y ayudarte a encontrar un camino claro.',
  /* Etiqueta del selector de recorrido: es la única decisión que se le pide
     al visitante, y de ella dependen los datos de contacto y el destino
     del formulario. */
  channelsLabel: '¿Sobre qué querés consultarnos?',
  address: {
    label: 'Dirección',
    lines: ['Calle 49 n° 876, piso 4, oficina B', 'La Plata, Buenos Aires'],
    mapsLabel: 'Ver en Google Maps',
    /* Enlace de búsqueda de Maps: no necesita clave de API y funciona aunque
       la ficha de negocio todavía no esté verificada. Al activarse la ficha,
       reemplazar por su URL propia. */
    mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      'Calle 49 876, La Plata, Buenos Aires, Argentina',
    )}`,
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
