<template>
  <div class="flex" v-cloak id="dribbleShot">
    <div class="main">
      <div class="px-7 md:px-16 lg:px-16">
        <div class="hero bg-white py-7 lg:py-24">
          <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
            <div
              class="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div class="hero-text col-span-6">
                <h1
                  class="text-3xl md:text-4xl max-w-xl text-gray-600 leading-tight"
                >
                  Bienvenidos a Pedidos <br /><span class="text-color-primary"
                    >Los Frailes</span>
                </h1>
                <hr class="w-12 h-1 color-primary rounded-full mt-8" />
                <p class="text-gray-800 text-base leading-relaxed mt-8">
                  ¡Una plataforma de pedidos en linea y delivery exclusivamente
                  para Los Frailes!
                </p>
              </div>

              <!-- hero image -->
              <div class="col-span-6">
                <img class="w-10/12 m-auto" src="@/_shared/assets/logo.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end hero -->
      <img src="@/_shared/assets/wave.svg" alt="" />
      <div class="color-secondary px-7 md:px-16 lg:px-16">
        <div class="px-4 sm:px-8 lg:px-14 xl:px-18 mx-auto">
          <template v-if="verifiedLocals.length">
            <div class="text-center">
              <div class="text-2xl md:text-3xl text-gray-600 leading-tight">
                Tiendas locales
              </div>
              <div class="text-gray-500 mt-5">
                Compra lo que deseas en los locales disponibles
              </div>
            </div>
            <div class="flex mx-auto lg:max-w-3xl xl:max-w-5xl">
              <div class="flex flex-wrap justify-center w-full h-full mx-auto">
                <div
                  v-for="local in verifiedLocals"
                  class="w-full py-10 px-5 md:w-1/2 xl:w-1/3"
                  :key="local.id"
                >
                  <Local :local="local" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <img class="w-full" src="@/_shared/assets/invertedWave.svg" alt="" />
      <div class="px-7 md:px-16 lg:px-16">
        <div class="px-4 sm:px-8 lg:px-14 xl:px-18 mx-auto">
          <template v-if="unverifiedLocals.length">
            <div class="flex mx-auto lg:max-w-3xl xl:max-w-5xl">
              <div class="flex flex-wrap justify-center w-full h-full mx-auto">
                <div
                  class="w-full py-10 px-5 md:w-1/2 xl:w-1/3"
                  v-for="local in unverifiedLocals"
                  :key="local.id"
                >
                  <ComingSoonLocal :local="local" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Local from '@/home/components/Local'
import ComingSoonLocal from '@/home/components/ComingSoonLocal'
import Footer from '@/_shared/layout/Footer'

export default {
  name: 'Home',

  components: { Local, Footer, ComingSoonLocal },

  created () {
    this.getLocals()
  },
  computed: {
    ...mapGetters('local', ['verifiedLocals', 'unverifiedLocals'])
  },
  methods: {
    ...mapActions('local', ['getLocals'])
  }
}
</script>
