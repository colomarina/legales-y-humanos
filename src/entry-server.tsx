import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
export { SITE_URL } from './content/siteUrl'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
