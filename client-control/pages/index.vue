<template>
  <div class="lg:flex">
    <div class="lg:w-1/2 xl:max-w-screen-sm">
      <Header />
      <div
        class="
          mt-10
          px-12
          sm:px-24
          md:px-48
          lg:px-12 lg:mt-5
          xl:px-24 xl:max-w-2xl
        "
      >
        <h2
          class="
            text-center text-2xl text-gray-600
            leading-tight
            font-display
            lg:text-left
            xl:text-3xl
          "
        >
          Iniciar sesión
        </h2>
        <Alert />
        <div class="mt-12">
          <LoginForm />
          <div
            class="
              my-5
              sm:mt-10
              md:mt-10
              lg:mt-10
              text-sm
              font-display
              text-gray-700 text-center
            "
          >
            ¿Aún no has registrado tu local?
            <nuxt-link
              to="/local-register"
              class="cursor-pointer text-color-primary"
            >
              ¡Regístrate aquí!
            </nuxt-link>
            <br>
            ¿Aún no te has registrado como delivery?
            <nuxt-link
              to="/delivery-register"
              class="cursor-pointer text-color-primary"
            >
              ¡Regístrate aquí!
            </nuxt-link>
          </div>
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
      </div>
    </div>
    <div
      class="
        hidden
        lg:flex
        items-center
        justify-center
        color-secondary
        flex-1
        h-auto
      "
    >
      <div
        class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer"
      >
        <img :src="chefImg" alt="Chef">
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm'
import Header from '../components/Header'
import Alert from '../components/shared/Alert'

import chefImg from '../assets/img/chef.svg'

let prompt
process.client && window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault()
  prompt = e
})

export default {
  components: { LoginForm, Alert, Header },

  data () {
    return {
      chefImg,
      installed: false
    }
  },
  head () {
    return {
      title: 'Iniciar Sesión | Pedidos Los Frailes',
      meta: [
        {
          hid: 'Iniciar Sesión',
          name: 'Iniciar Sesión',
          content: 'Inicia sesión en Pedidos Los Frailes'
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
