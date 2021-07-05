module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Pedidos Los Frailes',
    shortName: 'Pedidos Los Frailes',
    themeColor: '#ec1f28',
    msTileColor: '#eff2fb',
    backgroundColor: '#eff2fb'
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
    }
  }
}
