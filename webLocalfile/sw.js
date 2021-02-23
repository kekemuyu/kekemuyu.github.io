const cacheName = 'cache-v1';
const precacheResources = [
  '/webLocalfile/',
  '/webLocalfile/index.html',
  '/webLocalfile/js/index.js',
  '/webLocalfile/js/jquery.min.js',
  '/webLocalfile/js/bootstrap.min.js',
  '/webLocalfile/css/bootstrap.min.css',
  '/webLocalfile/image/android-launchericon-48-48.png',
  '/webLocalfile/image/android-launchericon-96-96.png',
  '/webLocalfile/image/android-launchericon-72-72.png',
  '/webLocalfile/image/android-launchericon-144-144.png',
  '/webLocalfile/image/android-launchericon-192-192.png',
  '/webLocalfile/image/android-launchericon-512-512.png'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});
