<template>
  <div class="text-center">
    <div class="w-full h-44 color-primary"></div>
    <div class="flex justify-center -mt-24">
      <img
        v-if="data.image"
        :src="data.image"
        alt="Logo image"
        class="h-48 w-48 m-auto rounded-full"
      />
    </div>
    <h1 class="text-black mt-10 md:text-6xl text-5xl font-bold">
      {{ data.title }}
    </h1>
    <p class="text-gray-500 mt-2 whitespace-pre-wrap mx-auto max-w-lg">
      {{ data.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'HeroSectionOwner',
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
