<template>
  <div
    class="border border-solid border-gray-500 shadow-md rounded-lg mb-4 mt-10 p-10 max-w-sm m-auto"
    :class="cartItems.length ? 'block' : 'hidden lg:block'"
  >
    <template v-if="cartItems.length">
      <h3 class="font-bold text-xl textcenter mb-8">{{ title }} 🛒</h3>
      <div class="mt-12 p-6 color-primary custom-rounded font-hairline text-xs">
        <div class="flex justify-between items-center mb-4" v-if="onCheckout">
          <p class="text-white">{{ currentLocal.title }}</p>
          <router-link
            :to="{ name: 'Shop' }"
            class="text-yellow-400 cursor-pointer"
            >Modificar pedido</router-link
          >
        </div>
        <div class="flex items-center">
          <div class="rounded-lg px-2 py-1 timer">
            <i class="fa fa-clock text-yellow-400"></i>
          </div>
          <p class="text-white text-base mx-3">Lo antes posible</p>
        </div>
      </div>
      <transition-group name="cart">
        <CartItem
          v-for="cartItem in cartItems"
          :cartItem="cartItem"
          :onCheckout="onCheckout"
          :key="cartItem.product.id"
        />
      </transition-group>
      <hr class="my-4" />
      <div class="grid grid-cols-2 gap-1">
        <span class="text-black text-sm">Delivery</span>
        <div class="text-right">
          <span class="text-black text-sm">¡Gratis!</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1 mt-2">
        <span class="text-black text-2xl font-bold">Total</span>
        <div class="text-right">
          <span class="text-black text-xl font-bold">DOP {{ cartTotal }}</span>
        </div>
      </div>
      <div class="max-w-sm my-4 m-auto hidden lg:block" v-if="!onCheckout">
        <router-link
          class="block w-full px-6 py-4 text-xs font-medium font-bold leading-6 text-center text-white uppercase transition color-primary rounded shadow ripple btn-hover focus:outline-none"
          :to="{ name: 'Checkout' }"
        >
          Ordena ya
        </router-link>
      </div>
    </template>
    <EmptyCart v-else-if="!cartItems.length" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { currency } from '@/_helpers'

export default {
  components: { CartItem, EmptyCart },

  props: {
    // If it is true will be disabled some functions of cart for review in checkout view
    onCheckout: {
      type: Boolean
    },
    localId: {
      type: Number
    }
  },

  computed: {
    title () {
      return !this.onCheckout ? 'Mi carrito' : 'Review de carrito'
    },
    ...mapGetters('local', {
      currentLocal: 'currentLocal'
    }),
    cartItems () {
      return this.$store.getters['cart/productsOnCart'].filter(
        item => item.product.LocalAccountId === this.localId
      )
    },
    cartTotal () {
      return currency(
        this.cartItems.reduce(
          (total, current) => total + current.product.price * current.quantity,
          0
        )
      )
    }
  }
}
</script>
<style scoped>
.cart-enter,
.cart-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
