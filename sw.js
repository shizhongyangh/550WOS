let dymanic = [
  'api.github.com',
  'tjy-gitnub.github.io/win12-theme',
  'win12server.freehk.svipss.top',
  'assets.msn.cn'
]
this.addEventListener('fetch', function (event) {
  if (!/^https?:$/.test(new URL(event.request.url).protocol)) return

  event.respondWith(
    caches.match(event.request).then(res => {
      let fl = false;
      dymanic.forEach(d => {
        if (event.request.url.indexOf(d) > 0) {
          fl = true;
          return;
        }
      });
      if (fl) {
        console.log('动态请求', event.request.url);
        return fetch(event.request);
      }
      return res ||
        fetch(event.request)
          .then(responese => {
            const responeseClone = responese.clone();
            caches.open('def').then(cache => {
              console.log('下载数据', responeseClone.url);
              cache.put(event.request, responeseClone);
            })
            return responese;
          })
          .catch(err => {
            console.log(err);
          });
    })
  )
});
const cacheNames = ['def'];
let nochanges = [
  '/win12/fonts/',
  '/win12/img/',
  '/win12/apps/icons/',
  '/win12/scripts/jq.min.js',
  '/win12/bootstrap-icons.css',
]
let flag = false;

function update(force = false) {
  caches.keys().then(keys => {
    if (keys.includes('def')) {
      caches.open('def').then(cc => {
        cc.keys().then(key => {
          key.forEach(k => {
            let fl = true;
            if (force) {
              console.log('删除数据', k.url);
              return cc.delete(k);
            }
            nochanges.forEach(fi => {
              if (RegExp(fi + '\\S+').test(k.url)) {
                fl = false;
                return;
              }
            });
            if (fl) {
              console.log('删除数据', k.url);
              return cc.delete(k);
            }
          });
        });
      });
    }
  });
}


this.addEventListener('message', function (e) {
  if (e.data.head == 'update') {
    if(e.data.force)update(true);
    else update();
  }
});
this.addEventListener('activate', update);
