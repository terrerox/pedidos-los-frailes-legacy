<template>
  <div
    class="sticky top-0 w-full p-4 shadow-md z-10 color-primary"
  >
    <div class="flex items-center">
      <a class="mx-4 cursor-pointer" @click="logout">
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
      <a class="mx-4 cursor-pointer" @click="this.$emit('openModal')"
        ><svg
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
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path></svg
      ></a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import arrowBack from '@/_shared/assets/arrow-back.png'

export default {
  name: 'OwnerHeader',
  props: {
    title: { type: String, required: true },
    backTo: { type: String, required: true }
  },

  data () {
    return {
      arrowBack: arrowBack
    }
  },

  methods: {
    ...mapActions('account', ['logout']),
    goBack () {
      return this.$router.push({ name: this.backTo })
    }
  }
}
</script>
