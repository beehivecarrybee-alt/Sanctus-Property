/* Sanctus Property — minimal, safe service worker.
 * Only ever intercepts same-origin GET requests. Everything else (POST/PUT/DELETE,
 * cross-origin requests) passes straight through to the network untouched.
 */

const CACHE_VERSION = "sanctus-shell-v1";
const OFFLINE_URL = "/offline.html";

const CACHEABLE_PATH_PREFIXES = ["/assets/", "/frames/", "/icons/"];
const CACHEABLE_EXTENSIONS = [
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif", ".ico",
  ".woff", ".woff2", ".ttf", ".otf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      );
      self.clients.claim();
    })()
  );
});

function isCacheableAsset(pathname) {
  if (CACHEABLE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }
  return CACHEABLE_EXTENSIONS.some((ext) => pathname.toLowerCase().endsWith(ext));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Never touch non-GET requests (e.g. TanStack Start server-function POSTs
  // like /_serverFn/... used by the enquiry form).
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Never touch cross-origin requests (fonts, analytics, etc.).
  if (url.origin !== self.location.origin) {
    return;
  }

  // Navigation requests: network-first, fall back to cached offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch (err) {
          const cache = await caches.open(CACHE_VERSION);
          const cached = await cache.match(OFFLINE_URL);
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // Static assets: cache-first, populate cache on first fetch.
  if (isCacheableAsset(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_VERSION);
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const response = await fetch(request);
          if (response && response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (err) {
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // Everything else: pass through to network, no caching.
});
