<template>
  <div class="background-canvas">
    <AllowNotificationsModal v-show="!isSubscribed && authenticated" />
    <HomeHeader />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Footer from '@/components/shared/Footer'
import HomeHeader from '@/components/shared/HomeHeader'
import AllowNotificationsModal from '@/components/shared/AllowNotificationsModal'

export default {
  components: { Footer, HomeHeader, AllowNotificationsModal },

  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap'
        }
      ]
    }
  },
  computed: {
    ...mapState('push', ['isSubscribed']),
    ...mapState('authentication', ['authenticated', 'token'])
  },

  created () {
    this.setToken()
  },

  methods: {
    setToken () {
      if (this.authenticated) {
        this.$api.setToken(this.token, 'Bearer')
        this.getSubscription()
      }
    },
    ...mapActions('push', ['getSubscription'])
  }
}
</script>

<style scoped>
body * {
    font-family: 'Hammersmith One', sans-serif;
    /* background-color: #eff2fb; */
}
.background-canvas {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/foodCanvas.svg');
  background-position: center;
  position: relative;
}
</style>
