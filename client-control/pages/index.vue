<template>
  <div class="lg:flex">
    <section class="lg:w-1/2 xl:max-w-screen-sm">
      <LocalSection :isInstalled="installed" :installPWA="installPWA" />
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
        <span class="text-color-primary">locales</span> <br>
        del mundo.
      </h1>
    </section>
  </div>
</template>

<script>
import LocalSection from '../components/auth/LocalSection'

let prompt
process.client && window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault()
  prompt = e
})

export default {
  components: { LocalSection },

  data () {
    return {
      installed: false
    }
  },
  head () {
    return {
      title: '¡Bienvenido local! | Pedidos Los Frailes',
      meta: [
        {
          hid: '¡Bienvenido local!',
          name: '¡Bienvenido local!',
          content: 'Inicia sesión o registrate como local en Pedidos Los Frailes'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  created () {
    this.isPWAInstalled()
  },

  mounted () {
    const { authenticated, user: { role } } = this.$store.state.authentication
    if (!authenticated) { return }
    if (role === 'Delivery') { return this.$router.push('/delivery/orders') }
    if (role === 'Local') { return this.$router.push('/local/products') }
    this.$router.push('/admin')
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
            this.installed = true
          } else {
            this.installed = false
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
