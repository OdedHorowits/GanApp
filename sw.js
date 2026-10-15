const C="ganrides-v2",F=["./","index.html","manifest.json","icon-192.png","config.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
// Network first for our own files (so updates arrive), cache as offline fallback. The API (other origin) is never cached.
self.addEventListener("fetch",e=>{
  if(new URL(e.request.url).origin!==location.origin||e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
});
