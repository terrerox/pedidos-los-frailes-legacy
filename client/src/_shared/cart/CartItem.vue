<template>
   <div
    class="relative flex flex-row items-center px-2 my-2 transition-all duration-300 bg-purple-800 custom-rounded"
  >
    <div
      class="absolute top-0 left-0 w-4 h-4 text-center transition bg-purple-800 rounded-full border border-white cursor-pointer shadow ripple hover:shadow-lg hover:bg-purple-900 focus:outline-none"
      @click="remove(cartItem)"
      v-if="!onCheckout"
    >
      <svg fill="#ffff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </div>
    <img
      :src="cartItem.product.imageUrl + cartItem.product.id"
      class="w-12 h-12 my-auto custom-rounded"
      alt="Product image"
    />
    <div class="flex flex-col w-full mx-2 truncate">
      <span class="text-white truncate">{{ cartItem.product.title }} </span>
      <div>
        <span class="text-white">DOP {{ cartItem.product.price }}</span>
      </div>
    </div>
    <div class="flex items-center text-lg font-bold text-white-500 bg-button">
      <div class="w-6 cursor-pointer select-none" @click="decrement(cartItem)" v-if="!onCheckout" >
        <img
          :src="minus"
          alt="-"
          class="py-4 pointer-events-none"
          draggable="false"
        />
      </div>
      <input
        type="number"
        name="quantity"
        min="1"
        :value="cartItem.quantity"
        class="w-8 py-3 font-bold text-center text-white bg-transparent"
      />
      <div class="w-6 cursor-pointer select-none" @click="increment(cartItem)" v-if="!onCheckout">
        <img
          :src="plus"
          alt="+"
          class="py-4 pointer-events-none"
          draggable="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import plus from '@/_shared/assets/plus.png'
import minus from '@/_shared/assets/minus.png'
import cancel from '@/_shared/assets/cancel.png'

export default {
  name: 'CartItem',
  data () {
    return {
      plus: plus,
      minus: minus,
      cancel: cancel
    }
  },
  props: {
    cartItem: {
      type: Object,
      required: true
    },
    // If it is true will be disabled some functions of cart for review in checkout view
    onCheckout: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions({
      remove: 'removeProductFromCart',
      increment: 'incrementProductQuantity',
      decrement: 'decrementProductQuantity'
    })
  }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
