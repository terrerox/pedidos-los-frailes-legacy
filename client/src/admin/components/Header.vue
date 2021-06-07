<template>
  <div
    class="sticky top-0 w-full p-4 shadow-md z-10 color-primary"
  >
    <div class="flex items-center">
      <a class="mx-4 cursor-pointer" @click="logoutButton">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="#ffff"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path></svg
      ></a>
      <h6 class="font-bold text-lg ml-4 text-white">Administrador</h6>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AdminHeader',

  methods: {
    ...mapActions('account', ['logout']),
    logoutButton () {
      this.logout()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
