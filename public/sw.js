// Service worker minimal — installabilité PWA + fallback offline basique.
// Stratégie: network-first pour tout, avec mise en cache des pages/assets
// statiques réussis pour un fallback hors-ligne. Aucune mise en cache de
// /api/*, /dashboard*, /auth* (données privées / dynamiques).

const CACHE_NAME = 'suri-space-v1';
const EXCLUDED_PREFIXES = ['/api/', '/dashboard', '/auth'];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (EXCLUDED_PREFIXES.some((p) => url.pathname.startsWith(p))) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || Promise.reject('offline-no-cache')))
  );
});
