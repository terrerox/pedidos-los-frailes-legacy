<template>
  <Fragment>
    <div
      class="shadow-xl relative h-40 custom-rounded cursor-pointer hover:opacity-75"
      :style="{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(\'' + local.imageUrl + '\')',
      }"
      @click="goToShop(local.accountId)"
    >
      <div
        class="absolute bottom-2 left-3 rounded-full py-1 px-2 shadow-xl text-white color-primary"
      >
        <span class="text-xs">✨ {{ local.category }}</span>
      </div>
    </div>
    <p class="mt-4 text-lg text-gray-600 leading-tight">
      {{ local.title }}
    </p>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  name: 'Local',

  components: { Fragment },

  props: {
    local: { type: Object, required: true }
  },
  methods: {
    goToShop (id) {
      this.$router.push(`shop/${id}`)
    }
  }
}
</script>

<style scoped>
.blured {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(5px);
}
</style>
