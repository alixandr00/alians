// public/sw.js
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'Alians', body: 'Новое уведомление!' };

    const options = {
        body: data.body,
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        // eslint-disable-next-line no-undef
        clients.openWindow('/')
    );
});