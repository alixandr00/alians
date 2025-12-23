import { Outlet, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AutoFromChina } from './components/AutoFromChina/AutoFromChina'
import { CustomOrder } from './components/CustomOrder/CustomOrder'
import { Contacts } from './components/Contacts/Contacts'
import { FAQ } from './components/FAQ/FAQ'
import { CustomsPage } from './components/CustomPage/CustomPage'
import { AuthForm } from './components/AuthForm/AuthForm'
import AddCarForm from './components/addCarForm/AddCarForm'
import CarList from './components/cars/CarList'
import { AdminPanel } from './components/Admin/AdminPanel'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { useState } from 'react'

function App() {

  const [searchTerm, setSearchTerm] = useState('');


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}>
          <Route index element={<AutoFromChina />} />
          <Route path="catalog" element={<CustomOrder searchTerm={searchTerm} />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='faq' element={<FAQ />} />
          <Route path="calculator" element={<CustomsPage />} />
          <Route path="auth" element={<AuthForm />} />
          {/* <Route path="auth" element={<AuthForm />} ali /> */}
          <Route path="*" element={<h1>404: Страница не найдена</h1>} />
          <Route element={<ProtectedRoute />}>
            <Route path="admin-panel" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes >
      {/* <h1>Админка автосалона</h1>
      <AddCarForm onCarAdded={fetchCars} />
      <CarList cars={cars} /> */}
      {/* //1 Полезная информация видеообзор */}
      {/* //2 Дата База */}
      {/* //3 Авто из Кореи и Грузии, Дубай, Америка + Рассчетный калькулятор  */}
      {/* //3 Язык местоположение с выбором */}
      {/* //3 Контакт */}
    </>
  )
}

export default App
