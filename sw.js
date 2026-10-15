// Service worker: makes the portal installable and lets pages you've opened work offline.
// Pages and files on this site: network first, so changes show up straight away.
// Bootstrap from the CDN (pinned versions) and the logo: cache first.
const CACHE = 'esad-v1';
const CDN = ['https://cdn.jsdelivr.net/', 'https://esadservices.com/'];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const keep = res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; };
  if (new URL(req.url).origin === location.origin) {
    e.respondWith(fetch(req).then(res => (res.ok ? keep(res) : res))
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || Response.error())));
  } else if (CDN.some(prefix => req.url.startsWith(prefix))) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => (res.ok || res.type === 'opaque' ? keep(res) : res))));
  }
});
