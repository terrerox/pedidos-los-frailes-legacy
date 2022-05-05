<template>
  <div
    class="border border-solid border-gray-500 shadow-md rounded-lg mb-4 mt-10 p-10 max-w-sm m-auto"
    :class="cartItems.length ? 'block' : 'hidden lg:block'"
  >
    <template v-if="cartItems.length">
      <h3 class="text-gray-600 leading-tight text-xl textcenter mb-8">
        {{ title }} 🛒
      </h3>
      <div class="mt-12 p-6 color-primary custom-rounded font-hairline text-xs">
        <div v-if="onCheckout" class="flex justify-between items-center mb-4">
          <p class="text-white">
            {{ currentLocal.title }}
          </p>
          <nuxt-link
            :to="{ name: 'shop-id', params: { id: $route.params.id }}"
            class="text-yellow-400 cursor-pointer"
          >
            Modificar pedido
          </nuxt-link>
        </div>
        <div class="flex items-center">
          <div class="rounded-lg px-2 py-1 timer">
            <i class="fa fa-clock text-yellow-400" />
          </div>
          <p class="text-white text-base mx-3">
            Lo antes posible
          </p>
        </div>
      </div>
      <transition-group name="cart">
        <CartItem
          v-for="cartItem in cartItems"
          :key="cartItem.product.id"
          :cart-item="cartItem"
          :on-checkout="onCheckout"
        />
      </transition-group>
      <hr class="my-4">
      <div class="grid grid-cols-2 gap-1">
        <span class="text-gray-600 leading-tight text-sm">Delivery</span>
        <div class="text-right">
          <span class="text-gray-600 leading-tight text-sm">¡Gratis!</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1 mt-2">
        <span class="text-black text-2xl">Total</span>
        <div class="text-right">
          <span class="text-black text-xl">DOP {{ cartTotal }}</span>
        </div>
      </div>
      <div v-if="!onCheckout" class="max-w-sm my-4 m-auto hidden lg:block">
        <nuxt-link
          v-if="authenticated"
          class="block w-full px-6 py-4 text-xs font-medium font-bold leading-6 text-center text-white uppercase transition color-primary rounded shadow ripple btn-hover focus:outline-none"
          :to="{ name: 'shop-id-checkout', params: { id: $route.params.id }}"
        >
          Ordena ya
        </nuxt-link>
        <nuxt-link
          v-else
          class="block w-full px-6 py-4 text-xs font-medium font-bold leading-6 text-center text-white uppercase transition bg-gray-500 rounded shadow ripple focus:outline-none"
          to="/login"
        >
          Inicia sesión para ordenar
        </nuxt-link>
      </div>
    </template>
    <EmptyCart v-else-if="!cartItems.length" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { currency } from '@/helpers'
export default {
  components: { CartItem, EmptyCart },
  props: {
    // If it is true will be disabled some functions of cart for review in checkout view
    onCheckout: {
      type: Boolean
    }
  },
  computed: {
    ...mapState('authentication', ['authenticated']),
    ...mapGetters('local', {
      currentLocal: 'currentLocal'
    }),
    title () {
      return !this.onCheckout ? 'Mi carrito' : 'Review de carrito'
    },
    cartItems () {
      return this.$store.getters['cart/productsOnCart'].filter(
        (item) => {
          const localId = Number(this.$route.params.id)
          return item.product.LocalAccountId === localId
        }
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
