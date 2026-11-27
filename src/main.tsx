import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import './styles/index.css'
import App from './App'
import { startAnalytics } from './analytics'

const container = document.getElementById('root')
if (!container) throw new Error('No se encontro el elemento #root')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)

startAnalytics()
