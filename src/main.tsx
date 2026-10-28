import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Los estilos globales se importan antes que la app para que tokens y base
// queden emitidos por delante del CSS de cada componente.
import './styles/index.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('No se encontro el elemento #root')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
