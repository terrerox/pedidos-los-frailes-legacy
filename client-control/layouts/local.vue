<template>
  <div>
    <div>
      <div class="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
        <SideBar :sidebar-open="sidebarOpen" @sidebarOpen="sidebarOpen = false" />
        <div class="flex-1 flex flex-col overflow-hidden">
          <Header :logged-local="loggedLocal" @sidebarOpen="sidebarOpen = true" />

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
import { mapGetters, mapActions } from 'vuex'
import Header from '@/components/local/Header'
import SideBar from '@/components/local/SideBar'
export default {
  name: 'Local',
  components: { Header, SideBar },
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
    ...mapGetters('local', ['loggedLocal'])
  },
  created () {
    this.getLoggedLocal()
  },
  methods: {
    ...mapActions('local', ['getLoggedLocal'])
  }
}
</script>
