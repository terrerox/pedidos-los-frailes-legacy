<template>
  <div class="bg-gray-100 sidebar flex flex-col fixed-right">
    <div class="px-6">
      <div class="h-12 mt-8 flex justify-end items-center">
        <i class="fa fa-user"></i>
        <div class="rounded-lg bg-yellow-400 px-3 font-bold text-xs py-1 ml-6">
          3
        </div>
      </div>
      <div class="mt-12">
        <p class="font-bold text-xl">{{ title }} 🛒</p>
      </div>
      <div class="mt-12 p-6 bg-purple-800 custom-rounded font-hairline text-xs">
        <div class="flex justify-between items-center">
          <p class="text-white">Los Frailes calle #3</p>
          <p class="text-yellow-400 cursor-pointer">Editar</p>
        </div>
      </div>
      <template v-if="cartItems.length">
        <transition-group name="cart">
          <CartItem
            v-for="cartItem in cartItems"
            :cartItem="cartItem"
            :onCheckout="onCheckout"
            :key="cartItem.product.id"
          />
        </transition-group>
        <div class="grid grid-cols-4 gap-1 mb-5">
          <div class="h-10 rounded-lg bg-orange-200 flex">
            <i class="fa fa-car m-auto text-orange-500"></i>
          </div>
          <div class="col-span-2 grid grid-cols-3 text-xxs font-semibold ">
            <p class="col-span-2 flex justify-center items-center">Delivery</p>
            <p class="flex items-center"></p>
          </div>
          <div
            class="flex justify-end items-center text-gray-600 font-hairline text-xs"
          >
            $0.00
          </div>
        </div>
        <div class="flex-grow flex flex-col pl-6 justify-end">
          <div class="flex justify-between items-center border-b-2 pb-2">
            <span>Total:</span>
            <span class="text-xl font-medium pr-6">RD$ {{ cartTotal }}</span>
          </div>
          <div class="flex justify-between pt-4 text-xs font-bold mt-5">
            <div class="flex flex-col"></div>
            <div
              class="ml-auto bg-yellow-400 p-6 rounded-l-lg cursor-pointer hover:opacity-75"
              @click="goToCheckout"
              v-if="!onCheckout"
            >
              Ordena ya <i class="ml-3 fa fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </template>
      <EmptyCart v-else-if="!cartItems.length" />
    </div>
    <div class="flex h-20">
      <div class="flex-grow px-16 main border-r border-gray-200"></div>
      <div class="sidebar bg-gray-100"></div>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { currency } from '@/filters/currency'

export default {
  components: { CartItem, EmptyCart },

  props: {
    // If it is true will be disabled some functions of cart for review in checkout view
    onCheckout: {
      type: Boolean
    }
  },

  methods: {
    goToCheckout () {
      this.$router.push({ name: 'Checkout' })
    }
  },

  computed: {
    title () {
      return !this.onCheckout ? 'Mi carrito' : 'Review de carrito'
    },
    cartItems () {
      return this.$store.getters.productsOnCart
    },
    cartTotal () {
      return currency(this.$store.getters.cartTotal)
    }
  }
}
</script>
<style scoped>
.cart-leave-to,
.cart-enter {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
