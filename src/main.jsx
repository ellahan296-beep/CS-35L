import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LogIn from './frontend/Login.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
