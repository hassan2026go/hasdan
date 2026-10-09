/* Kalimat PWA service worker - intentionally avoids caching live pages/API data. */
const CACHE_NAME = 'kalimat-shell-v1';
const APP_SCOPE = '/hasdan/';
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('kalimat-shell-') && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});
/* Do not intercept fetches: login, posts, comments, media uploads and live relays stay network-driven. */
