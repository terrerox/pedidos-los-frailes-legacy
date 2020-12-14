<template>
  <div
    class="shadow-lg relative h-40 custom-rounded cursor-pointer"
    :style="{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(\'' + product.image + '\')'
    }"
  >
    <div
      class="absolute bottom-0 left-0 w-1/3 bg-gray-200 rounded-tr-lg p-2 text-center text-xs"
    >
      <span class="font-bold">{{ product.prepTimeValue }}</span>
      {{ product.prepTimeUnit }}
    </div>
    <div style="bottom: -20px;" class="absolute right-0 w-10 mr-2">
      <button class="rounded-full border-2 border-black bg-white" @click="addToCart(product)">
        <svg
          viewBox="0 0 20 20"
          enable-background="new 0 0 20 20"
          class="w-6 h-6"
        >
          <path
            fill="#00000"
            d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
          C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
          C15.952,9,16,9.447,16,10z"
          />
        </svg>
      </button>
    </div>
  </div>
  <p class="mt-4 font-medium">{{ product.title }}</p>
  <div class="mt-2 flex items-center">
    <span class="text-xs"><i class="fa fa-star"></i> {{ product.rating }}</span>
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      product.cat1
    }}</span>
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      product.cat2
    }}</span>
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      product.range
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: { type: Object, required: true }
  },

  methods: {
    addToCart (product) {
      this.$store.dispatch('addProductToCart', product)
    }
  }
}
</script>
