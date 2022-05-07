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
            <li v-show="!installed">
              <a class="hover:text-orange-500 hover:border-b-2 hover:border-orange-500" @click="installPWA">
                Instalar app
              </a>
            </li>
            <li v-show="!authenticated">
              <button
                class="color-primary text-xs md:text-sm text-gray-100 p-2 rounded-full tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
                @click="goToLogin"
              >
                Inicia con nosotros
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
  name: 'HomeHeader',

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
