<template>
  <div
  @click="goToMenu(restaurant.id)"
    class="shadow-lg relative h-40 custom-rounded cursor-pointer"
    :style="{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(\'' + restaurant.image + '\')'
    }"
  >
    <div
      class="absolute bottom-0 left-0 w-1/3 bg-gray-200 rounded-tr-lg p-2 text-center text-xs"
    >
      <span class="font-bold">{{ restaurant.prepTimeValue }}</span>
      {{ restaurant.prepTimeUnit }}
    </div>
  </div>
  <p class="mt-4 font-medium">{{ restaurant.title }}</p>
  <div class="mt-2 flex items-center">
    <span class="text-xs"
      ><i class="fa fa-star"></i> {{ restaurant.rating }}</span
    >
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      restaurant.cat1
    }}</span>
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      restaurant.cat2
    }}</span>
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      restaurant.range
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Restaurant',
  props: {
    restaurant: { type: Object, required: true }
  },

  methods: {
    goToMenu (id) {
      this.$router.push({ name: 'Products', params: { id } })
    }
  }
}
</script>
