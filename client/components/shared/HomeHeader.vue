<template>
  <header class="header my-8">
    <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
      <div class="header-wrapper flex items-center justify-between">
        <div class="header-logo">
          <h1 class="text-gray-600 leading-tight">
            <a href="">
              Pedidos <span
                class="text-color-primary"
              >Los Frailes</span>
            </a>
          </h1>
        </div>

        <div class="toggle md:hidden">
          <button>
            <svg
              class="h-6 w-6 fill-current text-black"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <navbar class="navbar hidden md:block">
          <ul class="flex space-x-8 items-baseline text-sm">
            <li v-show="!authenticated">
              <a href="#" class="hover:text-orange-500 hover:border-b-2 hover:border-orange-500">
                Regístrate
              </a>
            </li>
            <li v-show="!authenticated">
              <button
                class="color-primary text-gray-100 p-2 rounded-full tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline btn-hover shadow-lg"
                @click="goToLogin"
              >
                Inicia sesión
              </button>
            </li>
            <li v-show="authenticated">
              <Profile />
            </li>
          </ul>
        </navbar>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Profile from '@/components/index/Profile'

export default {
  name: 'Header',

  components: { Profile },

  computed: {
    ...mapState('authentication', ['authenticated'])
  },

  methods: {
    goToLogin () {
      this.$router.push('login')
    }
  }
}
</script>
