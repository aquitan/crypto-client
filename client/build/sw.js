
const cacheName = 'cash-name'
const cacheArr = ['index.html']

self.addEventListener('install', async (event) => {
    const res = await caches.open(cacheName)
    await caches.addAll(cacheArr)
    console.log('Установлен', res);
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', async (event) => {
    const res = await fetch('/https://geolocation-db.com/json/')
    console.log('res-------', res)
})
