/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Получено фоновое сообщение:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo192.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});