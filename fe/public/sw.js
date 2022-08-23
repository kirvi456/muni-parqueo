const STATIC_CACHE      = 'static-v10';
const DYNAMIC_CACHE     = 'dynamic-v1';
const INMUTABLE_CACHE   = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'favicon.ico',
    'logo192.png',
    'logo512.png',
    'robots.txt',

    'static/css/main.3ce23c5e.css',

    'static/js/498.23cb4723.chunk.js',
    'static/js/617.804abbb9.chunk.js',
    'static/js/703.37379933.chunk.js',
    'static/js/787.7066aac0.chunk.js',
    'static/js/main.f324886c.js',



    'static/media/escudo.8ee8d043c9434adb6047.png',
]

const APP_SHEL_INMUTABLE = [
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
]

self.addEventListener('install', e => {

    const cacheStatic = caches.open( STATIC_CACHE )
    .then(cache => {
        cache.addAll( APP_SHELL );
    })

    const cacheInmutable = caches.open( INMUTABLE_CACHE )
    .then( cache => {
        cache.addAll( APP_SHEL_INMUTABLE );
    })


    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]) );
});

self.addEventListener('activate', e => {

    const borrado = caches.keys()
    .then(keys => {
        keys.forEach(key => {
            if( key !== STATIC_CACHE && key.includes('static') ){
                caches.delete( key )
            }

            if( key !== DYNAMIC_CACHE && key.includes('dynamic') ){
                caches.delete( key )
            }
        });
    })

    e.waitUntil( borrado );
});

self.addEventListener( 'fetch', e => {
    let respuesta;

    if(e.request.url.includes('chrome-extension')) {
        respuesta = fetch(e.request).then(res => res)
    } else {
        respuesta = caches
            .match( e.request )
            .then( res => {

                if( res ) return res;
                else return fetch( e.request )

            });
    }
    e.respondWith( respuesta );
})