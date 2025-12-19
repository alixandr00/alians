import { Outlet, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AutoFromChina } from './components/AutoFromChina/AutoFromChina'
import { CustomOrder } from './components/CustomOrder/CustomOrder'
import { Contacts } from './components/Contacts/Contacts'
import { FAQ } from './components/FAQ/FAQ'
import { CustomsPage } from './components/CustomPage/CustomPage'
import { AuthForm } from './components/AuthForm/AuthForm'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<AutoFromChina />} />
          <Route path="catalog" element={<CustomOrder />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='faq' element={<FAQ />} />
          <Route path="calculator" element={<CustomsPage />} />
          <Route path="auth" element={<AuthForm />} />
          <Route path="*" element={<h1>404: Страница не найдена</h1>} />
        </Route>
      </Routes >
      {/* //1 Полезная информация видеообзор */}
      {/* //2 Дата База */}
      {/* //3 Авто из Кореи и Грузии, Дубай, Америка + Рассчетный калькулятор  */}
      {/* //3 Язык местоположение с выбором */}
      {/* //3 Контакт */}
    </>
  )
}

export default App
