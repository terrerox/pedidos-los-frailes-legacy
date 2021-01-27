<template>
  <div
    class="sticky top-0 w-full p-4 shadow-md z-10 bg-purple-800"
  >
    <div class="flex items-center">
      <img class="cursor-pointer ml-4" :src="arrowBack" @click="goBack" />
      <h6 class="font-bold text-lg ml-4 text-white">{{ title }}</h6>
    </div>
  </div>
</template>

<script>
import arrowBack from '@/assets/arrow-back.png'

export default {
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
    goBack () {
      return this.$router.push({ name: this.backTo })
    }
  }
}
</script>
