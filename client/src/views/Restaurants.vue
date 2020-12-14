<template>
  <div class="flex mt-12 items-end">
    <h3 class="text-xl font-bold">Restaurantes</h3>
    <img
      src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/hamburger_1f354.png"
      class="mx-4 h-8 w-8"
      alt=""
    />
    <button
      class="ml-auto rounded-full p-2 bg-orange-600 hover:bg-orange-500 hover:shadow-lg text-white cursor-pointer text-sm"
    >
      <i class="fa fa-clock mx-2"></i>
      <span class="font-hairline">Delivery: </span><span>Now</span>
      <i class="fa fa-chevron-down mx-2"></i>
    </button>
  </div>
  <div class="mt-12 mb-7 grid grid-cols-3 gap-10">
    <div
      class="flex flex-col"
      v-for="restaurant in restaurantsItems"
      :key="restaurant.id"
    >
      <Restaurant :restaurant="restaurant" />
    </div>
  </div>
</template>

<script>
import Restaurant from '@/components/Restaurant'

export default {
  name: 'Restaurants',
  components: { Restaurant },
  data () {
    return {
      title: 'Chukwudi'
    }
  },

  created () {
    try {
      this.$store.dispatch('getRestaurants')
    } catch (error) {
      console.error(error)
    }
  },

  computed: {
    restaurantsItems () {
      return this.$store.state.restaurants
    }
  }
}
</script>
