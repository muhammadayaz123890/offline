const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {


  

  
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // If the request is in the cache, return the cached version
      if (cachedResponse) {
        return cachedResponse;
      }

      // Fetch the request from the network
      return fetch(event.request).then(response => {
        // Clone the response to use it in the cache
        const responseToCache = response.clone();

        // Cache the fetched response
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(error => {
        // Handle fetch failure
        console.error('Fetch failed:', error);

        // Attempt to fetch the cached HTML page
        return caches.match('/index.html').then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // If cached HTML is not available, return a default response
          return new Response('Offline. Cached HTML not available.');
        });
      });
    })
  );
});
