module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Pedidos Los Frailes',
    shortName: 'Pedidos Los Frailes',
    themeColor: '#ec1f28',
    msTileColor: '#eff2fb',
    startUrl: './login',
    display: 'standalone',
    orientation: 'portrait-primary',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js'
      // ...other Workbox options...
    },
    manifestOptions: {
      background_color: '#eff2fb',
      icons: [
        {
          src: 'img/icons/logo-72_x_72.png',
          type: 'image/png',
          sizes: '72x72'
        },
        {
          src: 'img/icons/logo-120_x_120.png',
          type: 'image/png',
          sizes: '120x120'
        },
        {
          src: 'img/icons/logo-128_x_128.png',
          type: 'image/png',
          sizes: '128x128'
        },
        {
          src: 'img/icons/logo-144_x_144.png',
          type: 'image/png',
          sizes: '144x144'
        },
        {
          src: 'img/icons/logo-152_x_152.png',
          type: 'image/png',
          sizes: '152x152'
        },
        {
          src: 'img/icons/logo-196_x_196.png',
          type: 'image/png',
          sizes: '196x196'
        },
        {
          src: 'img/icons/logo-256_x_256.png',
          type: 'image/png',
          sizes: '256x256'
        },
        {
          src: 'img/icons/logo-512_x_512.png',
          type: 'image/png',
          sizes: '512x512'
        }
      ]
    }
  }
}
