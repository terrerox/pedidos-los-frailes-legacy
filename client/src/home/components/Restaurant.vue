<template>
  <div
  @click="goToShop(restaurant.id)"
    class="shadow-lg relative h-40 custom-rounded cursor-pointer hover:opacity-75"
    :style="{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(\'' + restaurant.image + '\')'
    }"
  >
  </div>
  <p class="mt-4 font-medium">{{ restaurant.title }}</p>
  <div class="mt-2 flex items-center">
    <span class="text-xs"
      ><i class="fa fa-star"></i> {{ restaurant.rating }}</span
    >
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      restaurant.category
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
    goToShop (id) {
      this.$router.push({ name: 'Shop', params: { id } })
    }
  }
}
</script>
