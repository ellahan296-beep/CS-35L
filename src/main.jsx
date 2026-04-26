import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LogIn from './frontend/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogIn />
  </StrictMode>,
)
