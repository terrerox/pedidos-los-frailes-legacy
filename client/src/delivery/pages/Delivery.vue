<template>
<div>
    <div>
        <div class="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
            <SideBar :sidebarOpen="sidebarOpen" @sidebarOpen="sidebarOpen = false"/>
            <div class="flex-1 flex flex-col overflow-hidden">
                <Header @sidebarOpen="sidebarOpen = true" :loggedDelivery="loggedDelivery" />

                <main class="flex-1 overflow-x-hidden overflow-y-auto">
                    <div class="container mx-auto px-6 py-8">
                        <router-view />
                    </div>
                </main>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '@/delivery/components/Header'
import SideBar from '@/delivery/components/SideBar'

export default {
  name: 'Delivery',

  components: { Header, SideBar },

  data () {
    return {
      sidebarOpen: false
    }
  },

  created () {
    this.getLoggedDelivery()
  },

  methods: {
    ...mapActions('delivery', ['getLoggedDelivery'])
  },

  computed: {
    ...mapGetters('delivery', ['loggedDelivery'])
  }
}
</script>
