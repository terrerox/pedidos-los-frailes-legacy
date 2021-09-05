<template>
  <header class="flex justify-between items-center p-6">
    <div class="flex items-center space-x-4 lg:space-x-0">
      <button
        class="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden"
        @click="$emit('sidebarOpen')"
      >
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div>
        <h1 class="text-2xl font-medium text-gray-800 dark:text-white">
          {{ title }}
        </h1>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <button class="flex text-gray-600 dark:text-gray-300 focus:outline-none">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="relative">
        <button
          v-if="loggedLocal.Local"
          class="flex items-center space-x-2 relative focus:outline-none"
          @click="dropdownOpen = ! dropdownOpen"
        >
          <h2 class="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">
            {{ loggedLocal.Local.title }}
          </h2>
          <img
            class="h-9 w-9 rounded-full border-2 border-purple-500 object-cover"
            :src="loggedLocal.Local.imageUrl"
            alt="Your avatar"
          >
        </button>
        <div
          v-show="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
        >
          <router-link
            :to="{ name: 'LocalProfile' }"
            class="block px-4 py-2 text-sm text-gray-700 btn-hover hover:text-white"
          >
            Editar Perfil
          </router-link>
          <a
            class="block px-4 py-2 cursor-pointer text-sm text-gray-700 btn-hover hover:text-white"
            @click="logoutButton"
          >
            Cerrar sesión
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',

  props: {
    loggedLocal: { type: Object, required: true }
  },

  emits: ['sidebarOpen'],

  data () {
    return {
      dropdownOpen: false
    }
  },

  computed: {
    title () {
      return this.$route.meta.title
    }
  },

  methods: {
    ...mapActions('account', ['logout']),

    logoutButton () {
      this.$swal({
        title: '¿Deseas cerrar sesión?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true
      }).then((result) => {
        if (result.value) {
          this.logout()
          this.$router.push({ name: 'Login' })
        }
      })
    }
  }
}
</script>

<style scoped>
.router-link-active {
    background-color: #ec1f28;
    color: white;
}
</style>
