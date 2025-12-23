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

// --- КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: КОНВЕРТЕР КЛЮЧА ---
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
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

  useEffect(() => {
    // Регистрация SW
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

          // --- ТЕПЕРЬ КЛЮЧ ПРАВИЛЬНО ОБРАБАТЫВАЕТСЯ ---
          const publicKey = 'BBAErbwegH7JhG4Dsl2u-E9RqA8dD-dlJNF2EGHpnPjXPWX0mT7CwHZAOCWnADiGNiUuzEzV0MY8BU57VeSkRNg';
          const convertedKey = urlBase64ToUint8Array(publicKey);

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey // Передаем бинарный формат
          });

          // Отправка в Supabase
          const { error } = await supabase
            .from('push_subscriptions')
            .insert([{ subscription_data: subscription }]);

          if (error) {
            console.error('Ошибка сохранения подписки в Supabase:', error.message);
          } else {
            console.log('УСПЕХ: Подписка сохранена для Alians!');
          }
        }
      } catch (error) {
        console.error('Ошибка при настройке уведомлений:', error.message);
      }
    };

    // Таймер на 30 секунд для проверки
    const pushTimer = setTimeout(() => {
      setupPushSubscription();
    }, 30000);

    return () => clearTimeout(pushTimer);
  }, []);

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