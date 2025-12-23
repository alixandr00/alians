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
import { supabase } from './api/supabaseClient'

// --- ФУНКЦИЯ ДЛЯ КОНВЕРТАЦИИ КЛЮЧА (ВАЖНО) ---
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { i18n } = useTranslation();

  // --- ЛОГИКА УВЕДОМЛЕНИЙ (START) ---
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW зарегистрирован'))
        .catch(err => console.error('Ошибка SW:', err));
    }

    const setupPushSubscription = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const registration = await navigator.serviceWorker.ready;

          // Используем конвертер для ключа, чтобы не было ошибки как на скриншоте
          const vapidKey = 'BNo6H_t9O-vE7N_uU3vL1X7Z9mU8k-P0Y5X4V3C2B1A';
          const convertedVapidKey = urlBase64ToUint8Array(vapidKey);

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          });

          const { error } = await supabase
            .from('push_subscriptions')
            .insert([{ subscription_data: subscription }]);

          if (error) {
            console.error('Ошибка сохранения подписки в Supabase:', error);
          } else {
            console.log('Подписка успешно сохранена для Alians!');
          }
        }
      } catch (error) {
        console.error('Ошибка при настройке уведомлений:', error);
      }
    };

    const pushTimer = setTimeout(() => {
      setupPushSubscription();
    }, 60000);

    return () => clearTimeout(pushTimer);
  }, []);
  // --- ЛОГИКА УВЕДОМЛЕНИЙ (END) ---

  useEffect(() => {
    const detectUserLanguage = () => {
      const savedLang = localStorage.getItem('i18nextLng');
      if (savedLang && ['ru', 'zh', 'en', 'ko', 'ka', 'ar'].includes(savedLang)) {
        return;
      }

      const browserLang = navigator.language || navigator.userLanguage || 'ru';
      const langCode = browserLang.toLowerCase();
      let langToSet = 'ru';

      if (langCode.startsWith('zh')) {
        langToSet = 'zh';
      } else if (langCode.startsWith('ko')) {
        langToSet = 'ko';
      } else if (langCode.startsWith('ka')) {
        langToSet = 'ka';
      } else if (langCode.startsWith('ar')) {
        langToSet = 'ar';
      } else if (langCode.startsWith('en')) {
        langToSet = 'en';
      } else {
        langToSet = 'ru';
      }

      i18n.changeLanguage(langToSet);
    };

    detectUserLanguage();
  }, [i18n]);

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

          <Route path="*" element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h1>404</h1>
              <p>Страница не найдена</p>
            </div>
          } />

          <Route element={<ProtectedRoute />}>
            <Route path="admin-panel" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;