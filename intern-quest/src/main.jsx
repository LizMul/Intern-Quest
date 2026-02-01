import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './App.css'

// set the base font family
document.documentElement.style.fontFamily = 'Inter, system-ui, -apple-system, Roboto, "Helvetica Neue", Arial'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
