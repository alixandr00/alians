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

// Функция-конвертер ключа VAPID
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
    // 1. Регистрация Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW зарегистрирован'))
        .catch(err => console.error('Ошибка SW:', err));
    }

    const setupPushSubscription = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        const registration = await navigator.serviceWorker.ready;

        // --- ВОТ ЭТОТ КУСОК ПОМОЖЕТ ТЕЛЕФОНУ ---
        // Сначала находим старую подписку и удаляем её принудительно
        const oldSubscription = await registration.pushManager.getSubscription();
        if (oldSubscription) {
          await oldSubscription.unsubscribe();
          console.log('Старая подписка удалена');
        }

        const publicKey = 'BBAErbwegH7JhG4Dsl2u-E9RqA8dD-dlJNF2EGHpnPjXPWX0mT7CwHZAOCWnADiGNiUuzEzV0MY8BU57VeSkRNg';

        // Создаем абсолютно новую подписку
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey)
        });

        const subscriptionJson = subscription.toJSON();

        // Сразу сохраняем в базу (без проверок на existing, чтобы точно залетело)
        const { error } = await supabase
          .from('push_subscriptions')
          .insert([{
            subscription_data: {
              endpoint: subscriptionJson.endpoint,
              keys: subscriptionJson.keys
            }
          }]);

        if (error) console.error('Ошибка записи:', error);
        else alert('УСПЕХ: Телефон зарегистрирован!');

      } catch (error) {
        console.error('Ошибка:', error.message);
      }
    };
    // Запуск через 5 секунд после загрузки, чтобы не тормозить сайт
    const timer = setTimeout(setupPushSubscription, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Определение языка (твой оригинальный код)
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