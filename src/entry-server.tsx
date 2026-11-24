import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { buildStructuredData, jsonLdScript } from './seo/structuredData'

export { renderHead } from './seo/head'
export { jsonLdScript } from './seo/structuredData'
export { SITE_URL } from './content/siteUrl'
export { buildLlmsTxt } from './seo/llmsTxt'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export function structuredDataScript(): string {
  return jsonLdScript(buildStructuredData())
}
