<template>
   <div
    class="relative flex flex-row items-center px-2 my-2 transition-all duration-300"
  >
    <div
      class="absolute top-0 left-0 w-4 h-4 rounded-full cursor-pointer select-none bg-button"
      @click="remove"
    >
      <img
        :src="cancel"
        alt="Remove from cart"
        draggable="false"
        class="pointer-events-none"
      />
    </div>
    <img
      :src="cartItem.image"
      class="w-12 h-12 my-auto"
      alt="Product image"
    />
    <div class="flex flex-col w-full mx-2 truncate">
      <span class="text-black-400 truncate">{{ cartItem.title }} </span>
      <div>
        <span class="text-black-500">RD$ {{ cartItem.price }}</span>
      </div>
    </div>
    <div class="flex items-center text-lg font-bold text-black-500 bg-button">
      <div class="w-6 cursor-pointer select-none" @click="decrement">
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
      <div class="w-6 cursor-pointer select-none" @click="increment">
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
import plus from '@/assets/plus.png'
import minus from '@/assets/minus.png'
import cancel from '@/assets/cancel.png'

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
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    remove () {
      this.$store.dispatch('removeProductFromCart', this.index)
    },
    increment () {
      this.$store.dispatch('incrementProductQuantity', this.cartItem)
    },
    decrement () {
      this.$store.dispatch('decrementProductQuantity', this.cartItem)
    }

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
