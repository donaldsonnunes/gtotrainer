const CACHE_NAME = 'gto-trainer-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Instala o Service Worker e guarda os arquivos no Cache do celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('PWA: Armazenando arquivos no cache local...');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativa o SW e remove caches antigos se houver atualizações
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Responde às requisições buscando direto do cache (Modo Offline Ativo)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});