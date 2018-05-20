console.log(self)
importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('fetch',function(e){
  let url=e.request.url
  let reg=/.jpeg/
  if(reg.test(url)){
    console.log('i roob it')
  }
})