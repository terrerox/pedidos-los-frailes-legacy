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

export default {
  name: 'Home',

  components: { Local, ComingSoonLocal, SearchInput },

  layout: 'home',

  data () {
    return {
      search: ''
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
  },
  methods: {
    ...mapActions('local', ['getLocals']),
    logInGoogle () {
      this.$auth.loginWith('google')
    }
  }
}
</script>
