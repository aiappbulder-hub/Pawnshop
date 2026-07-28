/* Pawn Master service worker — offline shell cache.
   Bump CACHE when any shell file changes so clients pick up the update. */
const CACHE = "pawn-master-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./css/theme.css",
  "./js/data.js",
  "./js/art.js",
  "./js/core.js",
  "./js/ui.js",
  "./icon.svg",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
