<template>
<div>
    <div>
        <div class="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
            <SideBar :sidebarOpen="sidebarOpen" @sidebarOpen="sidebarOpen = false"/>
            <div class="flex-1 flex flex-col overflow-hidden">
                <Header @sidebarOpen="sidebarOpen = true" :loggedLocal="loggedLocal" />

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
import Header from '@/locals/components/Header'
import SideBar from '@/locals/components/SideBar'

export default {
  name: 'Local',

  components: { Header, SideBar },

  data () {
    return {
      sidebarOpen: false
    }
  },

  created () {
    this.getLoggedLocal()
  },

  methods: {
    ...mapActions('local', ['getLoggedLocal'])
  },

  computed: {
    ...mapGetters('local', ['loggedLocal'])
  }
}
</script>
