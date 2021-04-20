<template>
  <div class="flex" v-cloak id="dribbleShot">
    <div class="main px-7 md:px-16 lg:px-16 border-r border-gray-200">
      <div class="hero bg-white py-7 lg:py-24">
        <!-- container -->
        <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
          <!-- hero wrapper -->
          <div
            class="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <!-- hero text -->
            <div class="hero-text col-span-6">
              <h1
                class=" font-bold text-4xl md:text-5xl max-w-xl text-gray-900 leading-tight"
              >
                Bienvenidos a Pedidos los Frailes
              </h1>
              <hr class="w-12 h-1 color-primary rounded-full mt-8" />
              <p
                class="text-gray-800 text-base leading-relaxed mt-8 font-semibold"
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quis eius nisi amet porro, ipsum et, perferendis
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
      <div class="flex mt-12 items-end">
        <h3 class="text-xl font-bold">Locales</h3>
        <img
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/hamburger_1f354.png"
          class="mx-4 h-8 w-8"
          alt=""
        />
      </div>
      <div
        class="mt-12 mb-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10"
      >
        <div
          class="flex flex-col"
          v-for="local in localsItems"
          :key="local.id"
        >
          <Local :local="local" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Local from '@/home/components/Local'

export default {
  name: 'Locals',

  components: { Local },

  created () {
    this.getLocals()
  },
  computed: {
    ...mapGetters('local', {
      localsItems: 'locals'
    })
  },
  methods: {
    ...mapActions('local', ['getLocals'])
  }
}
</script>
