<template>
  <div class="relative">
    <button
      class="flex items-center space-x-2 relative focus:outline-none"
      @click="dropdownOpen = ! dropdownOpen"
    >
      <img
        class="h-9 w-9 rounded-full border-2 border-purple-500 object-cover"
        :src="placeholder"
        alt="Your avatar"
      >
    </button>
    <div
      v-show="dropdownOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
    >
      <h2 class="block px-4 py-2 cursor-pointer text-sm text-gray-700">
        {{ user.email }}
      </h2>
      <a
        class="block px-4 py-2 cursor-pointer text-sm text-gray-700 btn-hover hover:text-white"
        @click="logoutButton"
      >
        Cerrar sesión
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProfilePlaceholder from '@/assets/profile-placeholder.png'
export default {
  data () {
    return {
      dropdownOpen: false,
      placeholder: ProfilePlaceholder
    }
  },
  computed: {
    ...mapState('authentication', ['user'])
  },
  methods: {
    ...mapActions('authentication', {
      logoutButton: 'logout'
    })
  }
}
</script>

<style>

</style>
