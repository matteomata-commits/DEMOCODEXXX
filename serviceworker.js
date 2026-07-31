const CACHE_NAME = "democodex-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/copertina.png",
  "./assets/striscia.png",
  "./assets/sfondo.jpg",
  "./assets/rune1.png",
  "./assets/rune2.png",
  "./assets/rune3.png",
  "./assets/rune4.png",
  "./assets/rune5.png",
  "./assets/rune6.png",
  "./assets/rune7.png",
  "./assets/rune8.png",
  "./assets/rune9.png",
  "./assets/carta-segreta.jpg",
  "./assets/icon192.png",
  "./assets/icon512.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
