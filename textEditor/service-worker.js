/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "styles/main.css",
    "revision": "4ed8362066d739bad5385169a8744a16"
  },
  {
    "url": "styles/print.css",
    "revision": "7d5b6a44dc4a08dccb61bd2d90a5572b"
  },
  {
    "url": "styles/standalone.css",
    "revision": "870065a1ab8a7adc0bd0b5e19ae6fee7"
  },
  {
    "url": "index.html",
    "revision": "e04790526ae58d84169719ae474fb98b"
  },
  {
    "url": "inline-scripts/analytics.js",
    "revision": "35ac53acb12c44dfd0101c38087aa9ea"
  },
  {
    "url": "inline-scripts/app-install.js",
    "revision": "dc8b5692dc4373255dce07fe08959a06"
  },
  {
    "url": "inline-scripts/app.js",
    "revision": "9cb699b807a5cabd7223ab8c716790ff"
  },
  {
    "url": "inline-scripts/fallback.js",
    "revision": "e055b17f0af15e3cd899d397f7c00b36"
  },
  {
    "url": "inline-scripts/fs-helpers.js",
    "revision": "3ce0538fcc8c0a3271ea3c20b900d9e0"
  },
  {
    "url": "inline-scripts/idb-keyval-iife.js",
    "revision": "44a56d9936c6c7b59e2b1b77319b490d"
  },
  {
    "url": "inline-scripts/keyboard-events.js",
    "revision": "db3b62c5678aa2625a1d69f66f1b7bd7"
  },
  {
    "url": "inline-scripts/load-sw.js",
    "revision": "7c3f41dd84da685ee2820806db342055"
  },
  {
    "url": "inline-scripts/menu-edit.js",
    "revision": "98cde46236bad07581433603e1f55424"
  },
  {
    "url": "inline-scripts/menu-file.js",
    "revision": "c93553b69c1cf9e909789450eae1b16f"
  },
  {
    "url": "inline-scripts/menu-recent.js",
    "revision": "30038f80b92a90f0d2b2765c4db18340"
  },
  {
    "url": "inline-scripts/menu-view.js",
    "revision": "8909a3d46ad1d613331d1ba52d74a40f"
  },
  {
    "url": "inline-scripts/menus.js",
    "revision": "bd5168b045ad2f6b6ca40c499d46d82f"
  },
  {
    "url": "inline-scripts/rum.js",
    "revision": "420f911005942f819f6ce88ce4b1dcff"
  },
  {
    "url": "inline-scripts/text-area.js",
    "revision": "acc7fc1bad6fb2a20eddea09f4f9915e"
  },
  {
    "url": "inline-scripts/ui.js",
    "revision": "9c5b9ce7fa2136461a90aea508e0182c"
  },
  {
    "url": "images/favicon.png",
    "revision": "3b3109c37fe1d23e07ae2890862c621a"
  },
  {
    "url": "images/icon-144.png",
    "revision": "8caa72b941fc97f1b636e88379fe329d"
  },
  {
    "url": "images/icon-192.png",
    "revision": "903a848f8ebb57f07e2cf1c21425502a"
  },
  {
    "url": "images/icon-256.png",
    "revision": "28cc3710c2381963648a7435bca9713d"
  },
  {
    "url": "images/icon-512.png",
    "revision": "1490c3b55af9253baba49eb5b821bae9"
  },
  {
    "url": "images/icon-72.png",
    "revision": "0cf5e2bfc187c54a6f40d62acdb04767"
  },
  {
    "url": "images/icon-96.png",
    "revision": "bf085eef60f602eca7790cdfe8a726c0"
  }
]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
// 'use strict';
// const cacheName = 'cache-v1';
// const precacheResources = [
// 	'/'
// 	// 'index.html',
// 	// 'styles/*',
// 	// 'inline-scripts/*',
// 	// 'images/*'
// ];
// self.addEventListener('install', e => {
// 	// eslint-disable-next-line no-console
// 	console.log('[ServiceWorker] Install');
// 	e.waitUntil(
// 		caches.open(cacheName)
// 		.then(cache => {
// 			return cache.addAll(precacheResources);
// 		})
// 	);
// 	// self.skipWaiting();
// });

// self.addEventListener('activate', function(e) {
// 	// eslint-disable-next-line no-console
// 	console.log('[ServiceWorker] Activate');

// 	// return self.clients.claim();


// 	const cacheWhitelist = [cacheName];

// 	e.waitUntil(
// 		caches.keys().then(cacheNames => {
// 			return Promise.all(
// 				cacheNames.map(cacheName => {
// 					if (cacheWhitelist.indexOf(cacheName) === -1) {
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

// self.addEventListener('fetch', e => {
// 	console.log('Fetch intercepted for:', e.request.url);
// 	e.respondWith(caches.match(e.request)
// 		.then(cachedResponse => {
// 			if (cachedResponse) {
// 				return cachedResponse;
// 			}
// 			return fetch(e.request)
// 				.then(response => {
// 					if (response.status === 404) {
// 						console.log("err 404");
// 						return
// 						// return caches.match('pages/404.html');
// 					}
// 					return caches.open(staticCacheName)
// 						.then(cache => {
// 							cache.put(e.request.url, response.clone());
// 							return response;
// 						});
// 				});
// 		})
// 	);
// });
