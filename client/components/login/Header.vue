<template>
  <header
    class="py-12 bg-white px-12 flex justify-center"
    @click="goToHome"
  >
    <div
      class="cursor-pointer flex items-center"
    >
      <div>
        <img class="w-12 md:w-16" :src="icon">
      </div>
      <div class="text-sm md:text-2xl text-gray-600 tracking-wide md:ml-2">
        Pedidos <span class="text-color-primary">Los Frailes</span>
      </div>
    </div>
  </header>
</template>

<script>
import icon from '@/assets/logo.png'
export default {
  name: 'Header',
  data () {
    return {
      icon
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>
