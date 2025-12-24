/* eslint-disable no-undef */

// 1. Установка и немедленная активация
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    console.log('[Service Worker] Активирован и готов к работе');
});

// 2. Обработка входящего PUSH-уведомления
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push получен');

    let notificationData = {
        title: 'Alians',
        body: 'У вас новое уведомление!',
        icon: '/logo192.png'
    };

    if (event.data) {
        try {
            // Пытаемся распарсить JSON
            const jsonData = event.data.json();
            notificationData.title = jsonData.title || notificationData.title;
            notificationData.body = jsonData.body || notificationData.body;
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            console.warn('[Service Worker] Не удалось распарсить JSON, читаем как текст');
            const textData = event.data.text();
            if (textData) notificationData.body = textData;
        }
    }

    const options = {
        body: notificationData.body,
        icon: '/logo192.png',
        badge: '/logo192.png', // Маленькая иконка в статус-баре
        vibrate: [200, 100, 200],
        tag: 'alians-notification', // Чтобы уведомления заменяли друг друга, а не плодились
        renotify: true,             // Вибрировать при замене старого уведомления
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            { action: 'explore', title: 'Открыть сайт' },
            { action: 'close', title: 'Закрыть' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(notificationData.title, options)
    );
});

// 3. Логика клика по уведомлению
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Клик по уведомлению');
    event.notification.close();

    // Если нажата кнопка "Закрыть", ничего не делаем
    if (event.action === 'close') return;

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Если сайт уже открыт, переключаем фокус на него
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // Если не открыт — открываем новую вкладку
            if (self.clients.openWindow) {
                return self.clients.openWindow('/');
            }
        })
    );
});