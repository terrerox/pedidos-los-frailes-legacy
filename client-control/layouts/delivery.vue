<template>
  <div>
    <AllowNotificationsModal v-if="!isSubscribed" />
    <div>
      <div class="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
        <SideBar :sidebar-open="sidebarOpen" @sidebarOpen="sidebarOpen = false" />
        <div class="flex-1 flex flex-col overflow-hidden">
          <Header :logged-delivery="loggedDelivery" @sidebarOpen="sidebarOpen = true" />

          <main class="flex-1 overflow-x-hidden overflow-y-auto">
            <div class="container mx-auto px-6 py-8">
              <nuxt />
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Header from '../components/delivery/Header'
import SideBar from '../components/delivery/SideBar'
import AllowNotificationsModal from '@/components/shared/AllowNotificationsModal'

export default {
  name: 'Delivery',

  components: { Header, SideBar, AllowNotificationsModal },
  data () {
    return {
      sidebarOpen: false
    }
  },

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
    ...mapGetters('delivery', ['loggedDelivery']),
    ...mapState('push', ['isSubscribed']),
    ...mapState('authentication', ['authenticated', 'token'])
  },
  mounted () {
    this.getLoggedDelivery()
  },
  created () {
    this.setToken()
  },
  methods: {
    ...mapActions('delivery', ['getLoggedDelivery']),
    ...mapActions('push', ['getSubscription']),
    setToken () {
      if (this.authenticated) {
        this.$api.setToken(this.token, 'Bearer')
        this.getSubscription()
      }
    }
  }
}
</script>
<style scoped>
  body * {
    font-family: 'Hammersmith One', sans-serif;
  }
</style>
