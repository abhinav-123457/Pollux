/**
 * Service Worker for offline support and caching strategy.
 * Caches static assets and API responses for offline availability.
 */

const CACHE_NAME = 'pollux-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
];

// Install event — cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      self.skipWaiting();
    })
  );
});

// Activate event — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// Fetch event — cache first, fallback to network
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      // Return cached response if available
      if (response) {
        return response;
      }

      // Otherwise, fetch from network
      return fetch(request).then((response) => {
        // Don't cache non-successful responses or cross-origin requests
        if (!response || response.status !== 200 || response.type === 'basic') {
          return response;
        }

        // Clone the response for caching
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Return offline page or fallback
        return new Response('Offline - Please check your connection', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          }),
        });
      });
    })
  );
});
