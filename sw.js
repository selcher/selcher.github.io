// Install the service worker
this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            // The cache will fail if any of these resources can't be saved
            return cache.addAll(
                [
                    // Path is relative to the origin,
                    // not the app directory
                    '/',
                    '/index.html',
                    '/css/materialize.min.css',
                    '/css/style.min.css',
                    '/sw.js',
                    '/js/jquery-2.1.1.min.js',
                    '/js/materialize.min.js',
                    '/js/init.min.js',
                    '/icons/favicon.ico',
                    '/icons/favicon-16x16.png',
                    '/icons/favicon-32x32.png',
                    '/icons/android-chrome-96x96.png',
                    '/icons/apple-touch-icon.png',
                    '/icons/safari-pinned-tab.svg',
                    '/img/banner.png',
                    '/img/hall.png',
                    '/img/canvas.png',
                    '/font/roboto/Roboto-Light.woff2',
                    '/font/roboto/Roboto-Regular.woff2',
                    '/font/material-design-icons/family-material-icons.woff2',
                    '/manifest.json',
                ]
            ).then(
                function() {
                    console.log('Now available offline!');
                }
            );
        })
    );
});

// Define what happens when a resource is requested.
// For our app, we can do a cache-first approach.
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(
            function(response) {
                // Fallback to network if resource is not stored in cache.
                return response || fetch(event.request);
            }
        )
    );
});