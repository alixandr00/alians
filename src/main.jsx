import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

{/* //1 Полезная информация видеообзор */ }
{/* //2 Дата База */ }
{/* //3 Авто из Кореи и Грузии, Дубай, Америка + Рассчетный калькулятор  */ }
{/* //3 Язык местоположение с выбором */ }
{/* //3 Контакт */ }