<template>
  <div class="text-center">
    <div class="w-full h-44 color-secondary"></div>
    <div class="flex justify-center -mt-24">
      <img
        v-if="data.imageUrl"
        :src="data.imageUrl"
        alt="Logo image"
        class="h-48 w-48 m-auto rounded-full"
      />
    </div>
    <div>
      <div class="text-3xl md:text-4xl text-gray-600 leading-tight mt-10">
        {{ data.title }}
      </div>
      <div class="flex justify-center mt-3">
        <div
          class="rounded-full w-auto py-1 px-2 shadow-xl text-white color-primary"
        >
          <span class="text-xs">✨ {{ data.category }}</span>
        </div>
      </div>
    </div>
    <div class="whitespace-pre-wrap mx-auto max-w-lg text-gray-500 mt-7">
        {{ data.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    heroData: { type: Object, required: true }
  },

  computed: {
    data () {
      return this.heroData === undefined ? {} : this.heroData
    }
  }
}
</script>

<style></style>
