const CACHE_NAME = 'praia-cache-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Service Worker instalado');
});

self.addEventListener('activate', event => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache \!== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  console.log('Service Worker activado');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // No cachear Firebase y APIs externas
  if (url.hostname.includes('firebaseio.com') || 
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('firebase')) {
    return;
  }
  
  // Network first para todo lo demás
  event.respondWith(
    fetch(event.request).then(response => {
      if (response.ok) {
        const cache = caches.open(CACHE_NAME);
        cache.then(c => c.put(event.request, response.clone()));
      }
      return response;
    }).catch(() => {
      return caches.match(event.request).then(response => {
        return response || new Response('Offline - No hay conexión', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
