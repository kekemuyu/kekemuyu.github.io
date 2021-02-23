const cacheName = 'cache-v1';
const precacheResources = [
  '/bleHygrothermograph/',
  '/bleHygrothermograph/index.html',
  '/bleHygrothermograph/js/index.js',
  '/bleHygrothermograph/js/jquery.min.js',
  '/bleHygrothermograph/image/android-launchericon-48-48.png',
  '/bleHygrothermograph/image/android-launchericon-96-96.png',
  '/bleHygrothermograph/image/android-launchericon-72-72.png',
  '/bleHygrothermograph/image/android-launchericon-144-144.png',
  '/bleHygrothermograph/image/android-launchericon-192-192.png',
  '/bleHygrothermograph/image/android-launchericon-512-512.png'
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
