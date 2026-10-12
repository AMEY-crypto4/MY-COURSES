// Service worker: makes the courses open instantly and work offline after first visit.
const VERSION = 'learn-hub-v1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'dsa-course.html', 'sql-databases-course.html', 'js-fundamentals-course.html', 'python-fundamentals-course.html',
  'course-site.html', 'course-2-devops.html', 'course-3-ai-llm.html', 'course-4-react-systems.html'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  if (sameOrigin) {
    // network-first so a new deploy shows up, cache fallback so it works offline
    e.respondWith(fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else {
    // CDN libraries (CodeMirror, sql.js, Pyodide, fonts): serve cached copy, refresh in background
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
