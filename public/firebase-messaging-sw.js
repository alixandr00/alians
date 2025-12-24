/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// 1. Твоя конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJciFDRXMa0uJYLvYVxqtyEG7xF3smb2A",
    authDomain: "my-push-app-577de.firebaseapp.com",
    projectId: "my-push-app-577de",
    storageBucket: "my-push-app-577de.firebasestorage.app",
    messagingSenderId: "450323374994",
    appId: "1:450323374994:web:da319d4fb607fcd0e9174b"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 2. Обработка сообщений, когда вкладка ЗАКРЫТА или СВЕРНУТА
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Получено фоновое сообщение:', payload);
    const notificationTitle = payload.notification?.title || "Alians Auto";
    const notificationOptions = {
        body: payload.notification?.body || "У вас новое сообщение",
        icon: '/logo192.png',
        badge: '/logo192.png',
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 3. УНИВЕРСАЛЬНЫЙ обработчик (чтобы работало ВСЕГДА, даже если сайт открыт)
// Это исправит ошибку "Unexpected token <" и проблему с парсингом
self.addEventListener('push', (event) => {
    let data = {};
    if (event.data) {
        try {
            data = event.data.json();
            // eslint-disable-next-line no-unused-vars
        } catch (e) {
            // Если пришел не JSON, а обычный текст
            data = { notification: { title: "Alians Auto", body: event.data.text() } };
        }
    }

    const title = data.notification?.title || "Alians Auto";
    const options = {
        body: data.notification?.body || "Проверьте новые автомобили!",
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [200, 100, 200],
        data: {
            url: self.location.origin // Откроет главную страницу твоего сайта
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// 4. Что делать при КЛИКЕ на уведомление
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Закрываем уведомление
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((windowClients) => {
            // Если сайт уже открыт, просто переключаемся на него
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            // Если сайт закрыт, открываем новую вкладку
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});