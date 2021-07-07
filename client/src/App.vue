<template>
  <InternetError v-if="!onLine" />
  <router-view />
</template>

<script>
import InternetError from '@/_shared/InternetError'
export default {
  name: 'App',

  components: { InternetError },

  data () {
    return {
      onLine: navigator.onLine
    }
  },

  methods: {
    updateOnlineStatus (e) {
      const {
        type
      } = e
      this.onLine = type === 'online'
    }
  },

  mounted () {
    window.addEventListener('fetch', e => {
      console.log('Fetch.. ', e)

      e.respondWith(
        caches.match(e.request)
          .then(respuestaCache => {
            return respuestaCache || fetch(e.request)
          })
          .catch(() => console.log('no hay conexion'))
      )
    })
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  }
}
</script>

<style>
body * {
  font-family: 'Hammersmith One', sans-serif;
  /* background-color: #eff2fb; */
}
[v-cloak] {
  display: none;
}

.main {
  flex: 3;
}

.sidebar {
  flex: 1;
}

.custom-rounded {
  border-radius: 25px;
}

.custom-tr-rounded {
  border-radius: 0 25px 0 0;
}

.timer {
  background: rgba(217, 194, 105, 0.2);
}

.text-xxs {
  font-size: 0.7rem;
}
</style>
