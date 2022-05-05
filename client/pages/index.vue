<template>
  <div v-cloak id="dribbleShot" class="flex">
    <div class="main">
      <div class="px-7 md:px-16 lg:px-16">
        <div
          class="py-7 lg:py-7"
        >
          <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
            <div
              class="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div class="hero-text col-span-6">
                <h1
                  class="text-2xl md:text-3xl xl:text-4xl max-w-xl text-gray-600 leading-tight"
                >
                  Alerta 🗣️ <span
                    class="text-color-primary"
                  >llegó el pedido</span>
                </h1>
                <hr class="w-12 h-1 color-primary rounded-full mt-8">
                <p class="text-gray-500 text-base xl:text-xl leading-relaxed mt-8">
                  Una plataforma de pedidos en linea y delivery exclusivamente
                  para Los Frailes
                </p>
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
              </div>

              <!-- hero image -->
              <div class="col-span-6">
                <img class="w-9/12 m-auto" src="@/assets/logo.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end hero -->
      <img src="@/assets/wave.svg" class="bg-cover">
      <div class="color-secondary px-7 md:px-16 lg:px-16">
        <div class="px-4 sm:px-8 lg:px-14 xl:px-18 mx-auto">
          <client-only>
            <template v-if="verifiedLocals.length">
              <div class="text-center">
                <div class="xl:text-4xl text-lg md:text-2xl text-gray-600 leading-tight">
                  Tiendas locales
                </div>
                <div class="xl:text-xl text-gray-500 mt-5">
                  Compra lo que deseas en los locales disponibles
                </div>
                <SearchInput v-model="search" class="mt-4" />
              </div>
              <div class="flex mx-auto lg:max-w-3xl xl:max-w-full">
                <div
                  v-if="filteredLocals.length"
                  class="flex flex-wrap justify-center w-full h-full mx-auto"
                >
                  <div
                    v-for="local in filteredLocals"
                    :key="local.id"
                    class="w-full py-10 px-5 md:w-1/2 xl:w-1/3"
                  >
                    <Local :local="local" />
                  </div>
                </div>
                <div v-else class="w-full lg:w-1/3 m-auto">
                  <img class="mt-6 lg:mt-12" src="@/assets/empty.svg" alt="">
                </div>
              </div>
            </template>
          </client-only>
        </div>
      </div>
      <img class="w-full" src="@/assets/invertedWave.svg" alt="">
      <div class="px-7 md:px-16 lg:px-16">
        <div class="px-4 sm:px-8 lg:px-14 xl:px-18 mx-auto">
          <client-only>
            <template v-if="unverifiedLocals.length">
              <div class="flex mx-auto lg:max-w-3xl xl:max-w-full">
                <div class="flex flex-wrap justify-center w-full h-full mx-auto">
                  <div
                    v-for="local in unverifiedLocals"
                    :key="local.id"
                    class="w-full py-10 px-5 md:w-1/2 xl:w-1/3"
                  >
                    <ComingSoonLocal :local="local" />
                  </div>
                </div>
              </div>
            </template>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Local from '@/components/index/Local'
import ComingSoonLocal from '@/components/index/ComingSoonLocal'
import SearchInput from '@/components/shared/SearchInput'

let prompt
process.client && window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault()
  prompt = e
})

export default {
  name: 'Home',

  components: { Local, ComingSoonLocal, SearchInput },

  layout: 'home',

  data () {
    return {
      search: '',
      installed: false
    }
  },

  head () {
    return {
      title: 'Inicio | Pedidos Los Frailes',
      meta: [
        {
          hid: 'Inicio',
          name: 'Inicio',
          content: 'Haz tus pedidos en cada local disponible de Los Frailes'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  computed: {
    ...mapGetters('local', ['locals']),

    verifiedLocals () {
      return this.locals.filter(local => local.status === 'active')
    },
    unverifiedLocals () {
      return this.locals.filter(local => local.status === 'inactive')
    },
    filteredLocals () {
      return this.verifiedLocals.filter((local) => {
        return local.title.toLowerCase().trim().includes(this.search.toLowerCase().trim())
      })
    }
  },
  created () {
    this.getLocals()
    this.isPWAInstalled()
    this.installed = process.client && localStorage.getItem('installed')
  },
  methods: {
    ...mapActions('local', ['getLocals']),
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
    },
    logInGoogle () {
      this.$auth.loginWith('google')
    }
  }
}
</script>
