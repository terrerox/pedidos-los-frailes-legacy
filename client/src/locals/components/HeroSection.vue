<template>
  <div class="text-center">
    <div class="w-full h-44 color-primary"></div>
    <div class="flex justify-center -mt-24">
      <img
        v-if="data.imageUrl"
        :src="data.imageUrl"
        alt="Logo image"
        class="h-48 w-48 m-auto rounded-full"
      />
    </div>
    <div>
      <div class="text-black mt-10 md:text-6xl text-5xl font-bold">
        {{ data.title }}
      </div>
      <span class="text-black">
        {{ data.category }}
      </span>
    </div>
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
