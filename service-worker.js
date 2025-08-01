const CACHE_NAME = 'horarios-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/OneSignalSDKWorker.js',
  '/OneSignalSDKUpdaterWorker.js',
  // se tiveres CSS externo ou JS externo, põe aqui também
];

// Instalando service worker e cacheando arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Ativando e limpando caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keyList) =>
        Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Interceptando requisições e respondendo com cache primeiro
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('onesignal.com')) {
    return fetch(event.request);
  }
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
