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

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDJciFDRXMa0uJYLvYVxqtyEG7xF3smb2A",
//   authDomain: "my-push-app-577de.firebaseapp.com",
//   projectId: "my-push-app-577de",
//   storageBucket: "my-push-app-577de.firebasestorage.app",
//   messagingSenderId: "450323374994",
//   appId: "1:450323374994:web:da319d4fb607fcd0e9174b"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// BHEmaEkuy9d5KTA78i5BRPBNuEJI3y-y-AVpR6bKybAv1ryrGF48E61Ap-wipEzL1CUnKcQF_788Cz0dZVzJRmk