export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pedidos Los Frailes',
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
    { src: '~/plugins/vue-tooltip', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-route-meta',
    'nuxt-sweetalert2',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:4000/api/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'Pedidos Los Frailes',
      author: 'Terrerox'
    },
    manifest: {
      lang: 'en',
      name: 'Pedidos Los Frailes',
      short_name: 'Pedidos Los Frailes',
      description: 'App de pedidos en linea de Los Fraile',
      theme_color: '#ec1f28',
      ms_tile_color: '#eff2fb',
      display: 'standalone',
      orientation: 'portrait-primary'
    },
    icon: {
      fileName: 'app-icon.png'
    }
  },

  generate: {
    dir: 'public'
  },

  server: {
    port: 4500
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-tooltip']
  }
}
