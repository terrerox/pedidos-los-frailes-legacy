<template>
   <div
    class="relative flex flex-row items-center px-2 my-2 transition-all duration-300 color-primary custom-rounded"
  >
    <img
      :src="cartItem.product.image"
      class="w-12 h-12 my-auto custom-rounded"
      alt="Product image"
    />
    <div class="flex flex-col w-full mx-2 truncate">
      <span class=" truncate">{{ cartItem.product.title }} </span>
      <div>
        <span class="">DOP {{ cartItem.product.price }}</span>
      </div>
    </div>
    <span class="">Cantidad:</span>
    <div class="flex items-center text-lg font-bold bg-button">
      <input
        type="number"
        name="quantity"
        min="1"
        :value="cartItem.quantity"
        class="w-8 py-3 font-bold text-center  bg-transparent"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCartItem',
  props: {
    cartItem: {
      type: Object,
      required: true
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
