self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var url = event.request.url;
  
  if (url.indexOf('firebaseio.com') > -1 || url.indexOf('googleapis.com') > -1) {
    return;
  }
  
  event.respondWith(
    fetch(event.request).then(function(response) {
      return response;
    }).catch(function() {
      return new Response('Offline', { status: 503 });
    })
  );
});
