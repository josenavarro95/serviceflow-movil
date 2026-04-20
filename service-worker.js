// Service Worker para PRAÍA PWA
const CACHE_NAME = 'praia-v1';
const urlsToCache = [
  './',
  './praia-movil.html',
  './manifest.json',
  './favicon-setup.js',
  './icono_praia_192.png',
  './icono_praia_512.png',
  './icono_praia_180.png'
];

// Instalar el service worker y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache abierto');
      return cache.addAll(urlsToCache);
    }).catch(err => console.log('Error durante install:', err))
  );
  self.skipWaiting();
});

// Activar el service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia: servir desde cache, si no hay, ir a red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => {
        // Si no hay conexión y no está en cache, devolver offline
        return caches.match('./praia-movil.html');
      });
    })
  );
});
