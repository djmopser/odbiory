const V="odbiory-1795170033";
const CORE=["./", "index.html", "manifest.webmanifest", "fonts/fonts.css", "fonts/ibm-plex-mono-latin-500-normal.woff2", "fonts/ibm-plex-mono-latin-600-normal.woff2", "fonts/ibm-plex-mono-latin-ext-500-normal.woff2", "fonts/ibm-plex-mono-latin-ext-600-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-400-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-500-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-600-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-700-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-ext-400-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-ext-500-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-ext-600-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-ext-700-normal.woff2", "lib/jszip.min.js", "lib/pdf-lib.min.js", "lib/pdf.min.js", "lib/pdf.worker.min.js", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin||u.pathname.includes("/_blob/"))return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    return net.then(x=>x||(r.mode==="navigate"?caches.match("index.html"):Response.error()))}))});
