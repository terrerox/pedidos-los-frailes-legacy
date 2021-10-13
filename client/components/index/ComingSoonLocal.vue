<template>
  <Fragment>
    <div class="relative">
      <div class="custom-rounded text-xs md:text-base lg:text-base xl:text-base absolute inset-0 z-10 bg-gray-900 text-gray-400 leading-tight text-center flex flex-col items-center justify-center opacity-100 bg-opacity-90">
        <h1>Próximamente</h1>
      </div>
      <div
        class="shadow-xl relative h-40 custom-rounded cursor-not-allowed"
        :style="{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(\'' + local.imageUrl + '\')',
        }"
      >
        <div
          class="absolute bottom-2 left-3 rounded-full py-1 px-2 shadow-xl text-white color-primary"
        >
          <span class="text-xs">✨ {{ local.category }}</span>
        </div>
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
  name: 'ComingSoonLocal',

  components: { Fragment },

  props: {
    local: { type: Object, required: true }
  }
}
</script>

<style scoped>
.blured {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(5px);
}
</style>
