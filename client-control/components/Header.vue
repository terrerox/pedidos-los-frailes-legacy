<template>
  <div
    class="py-12 xl:bg-white lg:bg-white 2xl:justify-start px-12 flex justify-center"
  >
    <div
      class="cursor-pointer flex items-center"
    >
      <div>
        <img class="w-16" :src="icon">
      </div>
      <div class="text-2xl text-gray-600 tracking-wide ml-2">
        Pedidos <span class="text-color-primary">Los Frailes</span>
      </div>
    </div>
  </div>
</template>

<script>
import icon from '../assets/img/logo.png'

export default {
  name: 'Header',

  data () {
    return {
      icon
    }
  }
}
</script>
