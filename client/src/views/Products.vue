<template>
  <div class="flex" v-cloak id="dribbleShot">
    <div class="main px-16 border-r border-gray-200">
      <Header/>
      <div class="mt-12 flex items-center">
        <router-link :to="{ name: 'Restaurants' }" class="cursor-pointer mr-3">
          <li class="fas fa-arrow-left"></li>
        </router-link>
        <h3 class="text-xl font-bold">Productos de {{ currentRestaurant.title }}</h3>
        <img
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/hamburger_1f354.png"
          class="mx-4 h-8 w-8"
          alt=""
        />
      </div>
      <div class="mt-12 mb-7 grid grid-cols-3 gap-10">
        <div
          class="flex flex-col"
          v-for="product in productsItems"
          :key="product.id"
        >
          <Product :product="product"/>
        </div>
      </div>
    </div>
     <Cart :restaurantId="restaurantId"/>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import Product from '@/components/Product'
import Cart from '@/components/cart/Cart'

import Header from '@/components/layout/Header'

export default {
  name: 'Products',

  components: { Product, Cart, Header },

  data () {
    return {
      restaurantId: 0
    }
  },

  created () {
    const id = Number(this.$route.params.id)
    this.restaurantId = id
    this.getProducts({ id })
  },

  methods: {
    // ...mapActions(['getProducts'])
    getProducts (id) {
      this.$store.dispatch('getProducts', id)
    }
  },

  computed: {
    productsItems () {
      return this.$store.state.products
    },
    currentRestaurant () {
      return this.$store.state.restaurants.find(restaurant => restaurant.id === this.restaurantId)
    }
  }
}
</script>
