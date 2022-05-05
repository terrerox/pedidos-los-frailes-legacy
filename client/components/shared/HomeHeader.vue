<template>
  <header class="header my-8">
    <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
      <div class="header-wrapper flex items-center justify-between">
        <div class="header-logo">
          <img class="w-12 block md:hidden md:w-16" :src="icon">
          <h1 class="hidden md:block text-gray-600 leading-tight">
            <a href="">
              Pedidos <span
                class="text-color-primary"
              >Los Frailes</span>
            </a>
          </h1>
        </div>

        <navbar class="navbar block">
          <ul class="flex space-x-8 items-baseline text-sm">
            <li v-show="!authenticated">
              <a href="#" class="hover:text-orange-500 hover:border-b-2 hover:border-orange-500">
                Regístrate
              </a>
            </li>
            <li v-show="!authenticated">
              <button
                class="color-primary text-xs md:text-sm text-gray-100 p-2 rounded-full tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
                @click="goToLogin"
              >
                Inicia sesión
              </button>
            </li>
            <li>
              <button
                v-show="!installed"
                class="bg-white shadow-md px-3 py-2 m-auto mt-6 rounded-lg flex items-center space-x-4"
                @click="installPWA"
              >
                <div class="image">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="text">
                  <p class="text-xs font-semibold text-gray-900">
                    Instalar aplicación
                  </p>
                </div>
              </button>
            </li>
            <li v-show="authenticated">
              <Profile />
            </li>
          </ul>
        </navbar>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Profile from '@/components/index/Profile'
import icon from '@/assets/logo.png'

let prompt
process.client && window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault()
  prompt = e
})

export default {
  name: 'Header',

  components: { Profile },

  data () {
    return {
      installed: false,
      icon
    }
  },

  computed: {
    ...mapState('authentication', ['authenticated'])
  },

  mounted () {
    this.isPWAInstalled()
    this.installed = localStorage.getItem('installed')
  },

  methods: {
    goToLogin () {
      this.$router.push('login')
    },
    async installPWA () {
      prompt.prompt()
      const result = await prompt.userChoice
      if (result && result.outcome === 'accepted') {
        this.installed = true
      }
    },
    async isPWAInstalled () {
      if (process.client) {
        if ('getInstalledRelatedApps' in window.navigator) {
          const relatedApps = await window.navigator.getInstalledRelatedApps()
          if (relatedApps.length > 0) {
            localStorage.setItem('installed', true)
          } else {
            localStorage.setItem('installed', false)
          }
        }
      }
    }
  }
}
</script>
