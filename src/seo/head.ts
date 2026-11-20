import { SITE_URL } from '@/content/siteUrl'
import { brand, seo } from '@/content/site'

const escapeAttribute = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const property = (key: string, value: string | number) =>
  `<meta property="${key}" content="${escapeAttribute(String(value))}" />`

const named = (key: string, value: string) => `<meta name="${key}" content="${escapeAttribute(value)}" />`

export function renderHead(): string {
  const imageUrl = new URL(seo.image.path, SITE_URL).href

  return [
    `<title>${escapeAttribute(seo.title)}</title>`,
    named('description', seo.description),
    `<link rel="canonical" href="${SITE_URL}" />`,
    property('og:type', 'website'),
    property('og:site_name', brand.name),
    property('og:locale', 'es_AR'),
    property('og:url', SITE_URL),
    property('og:title', seo.title),
    property('og:description', seo.description),
    property('og:image', imageUrl),
    property('og:image:width', seo.image.width),
    property('og:image:height', seo.image.height),
    property('og:image:alt', seo.image.alt),
    named('twitter:card', 'summary_large_image'),
    named('twitter:title', seo.title),
    named('twitter:description', seo.description),
    named('twitter:image', imageUrl),
  ].join('\n    ')
}
