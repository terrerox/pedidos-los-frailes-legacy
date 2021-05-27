<template>
  <div class="text-center">
    <div class="w-full h-44 color-primary"></div>
    <div class="flex justify-center -mt-24">
      <img
        v-if="heroData.imageUrl"
        :src="heroData.imageUrl"
        alt="Logo image"
        class="h-48 w-48 m-auto rounded-full"
      />
    </div>
    <div>
      <div class="text-black mt-10 md:text-6xl text-5xl font-bold">
        {{ heroData.title }}
      </div>
      <span class="text-black">
        {{ heroData.category }}
      </span>
    </div>
    <p class="text-gray-500 mt-7 whitespace-pre-wrap mx-auto max-w-lg">
      {{ heroData.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    heroData: { type: Object, required: true }
  }
}
</script>

<style></style>
