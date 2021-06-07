<template>
  <div class="flex" v-cloak id="dribbleShot">
    <div class="main px-7 md:px-16 lg:px-16 border-r border-gray-200">
      <div class="hero bg-white py-7 lg:py-24">
        <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <div
            class="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div class="hero-text col-span-6">
              <h1
                class="font-bold text-4xl md:text-5xl max-w-xl text-gray-900 leading-tight"
              >
                Bienvenidos a Pedidos Los Frailes
              </h1>
              <hr class="w-12 h-1 color-primary rounded-full mt-8" />
              <p
                class="text-gray-800 text-base leading-relaxed mt-8 font-semibold"
              >
                ¡Una plataforma de pedidos en linea y delivery exclusivamente para Los Frailes!
              </p>
            </div>

            <!-- hero image -->
            <div class="hero-image col-span-6">
              <img src="@/_shared/assets/hero.svg"/>
            </div>
          </div>
        </div>
      </div>
      <!-- end hero -->
      <template v-if="verifiedLocals.length">
        <div class="flex mt-12 items-end">
          <div class="font-bold text-2xl max-w-xl text-gray-900 leading-tight">
            Locales displonibles 🤩
            <hr class="w-12 h-1 color-primary rounded-full mb-7 mt-1" />
          </div>
        </div>
        <div
          class="mt-12 mb-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
        >
          <div
            class="flex flex-col"
            v-for="local in verifiedLocals"
            :key="local.id"
          >
            <Local :local="local" />
          </div>
        </div>
      </template>
      <template v-if="unverifiedLocals.length">
        <div class="flex mt-12 items-end">
          <div class="font-bold text-2xl max-w-xl text-gray-900 leading-tight">
            Próximamente 🤫
            <hr class="w-12 h-1 color-primary rounded-full mb-7 mt-1" />
          </div>
        </div>
        <div
          class="mt-12 mb-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
        >
          <div
            class="flex flex-col"
            v-for="local in unverifiedLocals"
            :key="local.id"
          >
            <Local unverified :local="local" />
          </div>
        </div>
      </template>
    </div>
  </div>
  <Footer />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Local from '@/home/components/Local'
import Footer from '@/_shared/layout/Footer'

export default {
  name: 'Home',

  components: { Local, Footer },

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
