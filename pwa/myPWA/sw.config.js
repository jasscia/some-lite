var version = '1.0.1';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js', {scope: '/'})
          .then(function (registration) {

              // 注册成功
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
              console.log(localStorage.getItem('sw_version'))
              if (localStorage.getItem('sw_version') !== version) {
                registration.update().then(function () {
                    localStorage.setItem('sw_version', version)
                });
            }
          })
          .catch(function (err) {

              // 注册失败:(
              console.log('ServiceWorker registration failed: ', err);
          });
  });
}

