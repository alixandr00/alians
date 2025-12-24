import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AutoFromChina } from './components/AutoFromChina/AutoFromChina';
import { CustomOrder } from './components/CustomOrder/CustomOrder';
import { Contacts } from './components/Contacts/Contacts';
import { FAQ } from './components/FAQ/FAQ';
import { CustomsPage } from './components/CustomPage/CustomPage';
import { AuthForm } from './components/AuthForm/AuthForm';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { AdminPanel } from './components/Admin/AdminPanel';
import { supabase } from './api/supabaseClient';

// ИМПОРТЫ FIREBASE
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// КОНФИГ FIREBASE (Твой из консоли)
const firebaseConfig = {
  apiKey: "AIzaSyDJciFDRXMa0uJYLvYVxqtyEG7xF3smb2A",
  authDomain: "my-push-app-577de.firebaseapp.com",
  projectId: "my-push-app-577de",
  storageBucket: "my-push-app-577de.firebasestorage.app",
  messagingSenderId: "450323374994",
  appId: "1:450323374994:web:da319d4fb607fcd0e9174b"
};

// Инициализация
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { i18n } = useTranslation();

  useEffect(() => {
    const setupCloudMessaging = async () => {
      try {
        // 1. Запрашиваем разрешение
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.log('Пользователь отказал в уведомлениях');
          return;
        }

        // 2. Получаем токен (ВСТАВЬ СЮДА СВОЙ VAPID KEY ИЗ FIREBASE)
        // Найти тут: Project Settings -> Cloud Messaging -> Web Push certificates
        const currentToken = await getToken(messaging, {
          vapidKey: 'BHEmaEkuy9d5KTA78i5BRPBNuEJI3y-y-AVpR6bKybAv1ryrGF48E61Ap-wipEzL1CUnKcQF_788Cz0dZVzJRmk'
        });

        if (currentToken) {
          console.log('FCM Token получен:', currentToken);

          // 3. Проверяем в Supabase, есть ли такой токен
          const { data: existing } = await supabase
            .from('push_subscriptions')
            .select('id')
            .eq('token', currentToken) // Предполагаем, что колонка называется 'token'
            .maybeSingle();

          if (!existing) {
            console.log('Новый токен, сохраняю в базу...');
            const { error } = await supabase
              .from('push_subscriptions')
              .insert([{
                token: currentToken,
                subscription_data: { platform: 'firebase' } // для совместимости
              }]);

            if (error) console.error('Ошибка сохранения в базу:', error);
            else console.log('УСПЕХ: Токен сохранен!');
          }
        }
      } catch (error) {
        console.error('Ошибка Firebase:', error);
      }
    };

    // Слушаем входящие сообщения, когда сайт открыт
    onMessage(messaging, (payload) => {
      console.log('Сообщение в фокусе:', payload);
      alert(`${payload.notification.title}\n${payload.notification.body}`);
    });

    // Запуск через 5 секунд
    const timer = setTimeout(setupCloudMessaging, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Определение языка
  useEffect(() => {
    const detectUserLanguage = () => {
      const savedLang = localStorage.getItem('i18nextLng');
      if (savedLang && ['ru', 'zh', 'en', 'ko', 'ka', 'ar'].includes(savedLang)) return;

      const browserLang = (navigator.language || 'ru').toLowerCase();
      const langMap = { zh: 'zh', ko: 'ko', ka: 'ka', ar: 'ar', en: 'en' };
      const langToSet = Object.keys(langMap).find(key => browserLang.startsWith(key)) || 'ru';

      i18n.changeLanguage(langToSet);
    };
    detectUserLanguage();
  }, [i18n]);

  return (
    <Routes>
      <Route path='/' element={<Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}>
        <Route index element={<AutoFromChina />} />
        <Route path="catalog" element={<CustomOrder searchTerm={searchTerm} />} />
        <Route path='contacts' element={<Contacts />} />
        <Route path='faq' element={<FAQ />} />
        <Route path="calculator" element={<CustomsPage />} />
        <Route path="auth" element={<AuthForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="admin-panel" element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<div style={{ padding: '50px', textAlign: 'center' }}><h1>404</h1><p>Страница не найдена</p></div>} />
      </Route>
    </Routes>
  );
}

export default App;