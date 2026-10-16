const C='mybudget-v1';
const A=['./','index.html','manifest.json','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(C).then(async c=>{
    const r=await c.match(e.request,{ignoreSearch:true});
    const n=fetch(e.request).then(res=>{if(res&&res.ok)c.put(e.request,res.clone());return res}).catch(()=>r);
    return r||n;
  }));
});
