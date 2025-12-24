/* eslint-disable no-undef */
// public/sw.js

// Устанавливаем SW и сразу активируем его
self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    console.log('[Service Worker] Активирован и готов к работе');
});

self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push получен');

    // Значения по умолчанию
    let data = {
        title: 'Alians',
        body: 'У вас новое уведомление!',
        icon: '/logo192.png'
    };

    if (event.data) {
        try {
            // Пытаемся распарсить JSON от сервера
            const jsonData = event.data.json();
            data.title = jsonData.title || data.title;
            data.body = jsonData.body || data.body;
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            console.warn('[Service Worker] Данные не в JSON, читаем как текст');
            const textData = event.data.text();
            if (textData) data.body = textData;
        }
    }

    const options = {
        body: data.body,
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [200, 100, 200],
        tag: 'alians-notification', // Группирует уведомления, чтобы не спамить
        renotify: true,             // Вибрировать даже если есть старое уведомление
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            { action: 'explore', title: 'Открыть' },
            { action: 'close', title: 'Закрыть' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Клик по уведомлению');
    event.notification.close();

    // Логика открытия сайта
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Пытаемся найти уже открытую вкладку нашего сайта
            for (const client of clientList) {
                if ('focus' in client) {
                    return client.focus();
                }
            }
            // Если вкладок нет — открываем главную
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});