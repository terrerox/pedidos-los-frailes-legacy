<template>
    <div class="bg-gray-500 sidebar flex flex-col fixed-right">
      <div class="px-6">
        <div class="h-12 mt-8 flex justify-end items-center">
          <i class="fa fa-user"></i>
          <div
            class="rounded-lg bg-yellow-400 px-3 font-bold text-xs py-1 ml-6"
          >
            3
          </div>
        </div>
        <div class="mt-12">
          <p class="font-medium text-xl">Mi carrito 🛒</p>
        </div>
        <div
          class="mt-12 p-6 bg-purple-800 custom-rounded font-hairline text-xs"
        >
          <div class="flex justify-between items-center">
            <p class="text-white">Los Frailes calle #3</p>
            <p class="text-yellow-400 cursor-pointer">Editar</p>
          </div>
          <div class="flex items-center mt-4">
            <div class="rounded-lg px-2 py-1 timer">
              <i class="fa fa-clock text-yellow-400"></i>
            </div>
            <p class="text-white mx-3">35 min</p>
            <p class="text-yellow-400 cursor-pointer ml-auto">Choose time</p>
          </div>
        </div>
        <cart-item
          v-for="(cartItem, $index) in cartItems"
          :cart-item="cartItem"
          :index="$index"
          :key="cartItem.id"
        />
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
      </div>
      <div class="flex-grow flex flex-col pl-6 justify-end">
        <div class="flex justify-between items-center border-b-2 pb-2">
          <span>Total:</span>
          <span class="text-xl font-medium pr-6">RD$ {{ cartTotal }}</span>
        </div>
        <div class="flex justify-between pt-4 text-xs font-bold">
          <div class="flex flex-col">
          </div>
          <div class="ml-auto bg-yellow-400 p-6 rounded-l-lg">
            Checkout <i class="ml-3 fa fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import CartItem from './CartItem'
import { currency } from '@/filters/currency'

export default {
  components: { CartItem },
  computed: {
    cartItems () {
      return this.$store.getters.productsOnCart
    },
    cartTotal () {
      return currency(this.$store.getters.cartTotal)
    }
  }
}
</script>
