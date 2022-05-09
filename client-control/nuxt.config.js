export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pedidos Los Frailes Control',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', mode: 'client' },
    { src: '~/plugins/api' },
    { src: '~/plugins/vue-tooltip', mode: 'client' },
    { src: '~/plugins/sw-ref', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-route-meta',
    'nuxt-sweetalert2',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-twa-module', {
      /* module options */
      defaultUrl: 'https://control.pedidoslosfrailes.com',
      hostName: 'your-url.com',
      sha256Fingerprints: ['DD9D1FA58B10266659E59C31D80A5934778CC63603511EE765F84DBF73DC3427'],
      applicationId: 'com.control.pedidoslosfrailes',
      launcherName: 'Pedidos Los Frailes Control',
      versionCode: 1,
      versionName: '1.0',
      statusBarColor: '#eff2fb',

      /* optional */
      /* overwrite default location for icon */
      iconPath: '/static/icon.png',
      /* Overwrite folder where to put .wellknown */
      distFolder: '/.nuxt/dist/client'
    }]
  ],

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'Pedidos Los Frailes Control',
      author: 'Terrerox'
    },
    manifest: {
      lang: 'en',
      name: 'Pedidos Los Frailes Control',
      short_name: 'Pedidos Los Frailes Control',
      description: 'App de control para locales y deliveries',
      theme_color: '#ec1f28',
      ms_tile_color: '#eff2fb',
      display: 'standalone',
      orientation: 'portrait-primary'
    },
    icon: {
      fileName: 'app-icon.png'
    }
  },

  workbox: {
    importScripts: [
      'custom-sw.js'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    dir: 'public'
  }
}
