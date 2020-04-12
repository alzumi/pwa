// Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_amas_programacion';

//Fichero a cachear en la aplicacion
var urlsToCache = [
	'./',
	'./index.html',
	'./css/estilo.css',
	'./faviconA/favicon-1024.png',
	'./faviconA/favicon-512.png',
	'./faviconA/favicon-384.png',
	'./faviconA/favicon-256.png',
	'./faviconA/favicon-192.png',
	'./faviconA/favicon-128.png',
	'./faviconA/favicon-96.png',
	'./faviconA/favicon-64.png',
	'./faviconA/favicon-32.png',
	'./faviconA/favicon-16.png',
	'./faviconA/facebook32.png',
	'./faviconA/instagram-bosquejado32.png',
	'./faviconA/linkedin32.png',
	'./faviconA/youtube32.png'
];

// evento install
//Instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

// una vez que se instala el SW, se activa y 
// busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

/*evento fect: cuando solicitemos una url,
 nos devuelve los recursos de la app, o lo solicita a la app que esta en la web
*/
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request) // si la informacion esta cacheada?
      .then(res => {
        if (res) {
          //recuperar los datos del cache
          return res  
        }
        //hago una  petición a la url desde el servidor
        return fetch(e.request)
      })
  )
})