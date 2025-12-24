/* eslint-disable no-undef */
// public/sw.js

self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push получен');

    let data = {
        title: 'Alians',
        body: 'Новое уведомление!',
        icon: '/logo192.png'
    };

    // Проверяем, есть ли данные в событии и пытаемся их распарсить
    if (event.data) {
        try {
            // Пытаемся прочитать как JSON
            const jsonData = event.data.json();
            data.title = jsonData.title || data.title;
            data.body = jsonData.body || data.body;
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            // Если не JSON (например, простая строка), берем как текст
            console.warn('[Service Worker] Данные не в формате JSON, читаем как текст');
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: '/logo192.png',   // Убедись, что этот файл есть в папке public
        badge: '/logo192.png',  // Маленькая иконка в строке состояния
        vibrate: [200, 100, 200],
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
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Клик по уведомлению');
    event.notification.close();

    event.waitUntil(
        // eslint-disable-next-line no-undef
        clients.matchAll({ type: 'window' }).then((clientList) => {
            // Если вкладка уже открыта, переключаемся на нее
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // Если закрыта — открываем новую
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});