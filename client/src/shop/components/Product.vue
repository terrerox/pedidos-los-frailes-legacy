<template>
  <div
    @click="addToCart(product)"
    v-tooltip="'Clic para agregar producto al carrito'"
    class="shadow-lg relative h-40 custom-rounded cursor-pointer"
    :style="{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(\'' + product.imageUrl + '\')'
    }"
  >
  <div class="flex flex-row space-x-2 ml-3 absolute bottom-2">
    <div
      class="rounded-full w-auto py-1 px-2 shadow-xl text-white color-primary"
    >
      <span class="text-xs">💵{{ product.price }} DOP</span>
    </div>
    <div
      class="rounded-full w-auto py-1 px-2 shadow-xl text-white color-primary"
    >
      <span class="text-xs">⌛{{  product.prepTimeValue }} {{  product.prepTimeUnit }}</span>
    </div>
  </div>
    <div style="bottom: -20px;" class="absolute right-0 w-10 mr-2">
      <button class="w-auto inline-block p-3 text-center text-white transition color-primary rounded-full shadow ripple btn-hover focus:outline-none">
        <svg
          viewBox="0 0 20 20"
          enable-background="new 0 0 20 20"
          class="w-6 h-6"
        >
          <path
            fill="#ffff"
            d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
          C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
          C15.952,9,16,9.447,16,10z"
          />
        </svg>
      </button>
    </div>
  </div>
  <p class="mt-4 text-lg text-gray-600 leading-tight">{{ product.title }}</p>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    addToCart (product) {
      this.$store.dispatch('cart/addProductToCart', product)
    }
  }
}
</script>
