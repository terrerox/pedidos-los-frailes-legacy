<template>
  <div class="lg:flex lg:flex-row-reverse">
    <section class="lg:w-1/2 xl:max-w-screen-sm">
      <DeliverySection />
    </section>
    <section
      class="
        hidden
        lg:flex
        items-center
        color-secondary
        flex-1
        h-auto
      "
    >
      <h1 class="ml-6 font-black text-6xl text-gray-600 leading-relaxed xl:text-8xl">
        Donde están <br>
        los mejores <br>
        <span class="text-color-primary">deliveries</span> <br>
        del mundo.
      </h1>
    </section>
  </div>
</template>

<script>
import DeliverySection from '../components/auth/DeliverySection'

let prompt
process.client && window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault()
  prompt = e
})

export default {
  components: { DeliverySection },

  data () {
    return {
      installed: false
    }
  },
  head () {
    return {
      title: '¡Bienvenido delivery! | Pedidos Los Frailes',
      meta: [
        {
          hid: '¡Bienvenido delivery!',
          name: '¡Bienvenido delivery!',
          content: 'Inicia sesión o registrate como delivery en Pedidos Los Frailes'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  created () {
    this.isPWAInstalled()
    this.installed = process.client && localStorage.getItem('installed')
  },

  methods: {
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

<style type="text/css">
.st0 {
  fill: none;
  stroke: currentColor;
  stroke-width: 20;
  stroke-linecap: round;
  stroke-miterlimit: 3;
}
</style>
