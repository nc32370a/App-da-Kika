// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Configuração do seu projeto Firebase
// SUBSTITUA os valores abaixo com a sua própria configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCg0UbyGcxEwhd_GlQNggj4e9pAkisLXHA",
    authDomain: "app-da-kika.firebaseapp.com",
    projectId: "app-da-kika",
    storageBucket: "app-da-kika.firebasestorage.app",
    messagingSenderId: "875403627280",
    appId: "1:875403627280:web:b9b5c11c4ae981eaa7b395"
};

// Inicializa o Firebase no Service Worker
firebase.initializeApp(firebaseConfig);

// Recupera o objeto de mensagens
const messaging = firebase.messaging();

// Lida com mensagens de background
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
        data: payload.data
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});