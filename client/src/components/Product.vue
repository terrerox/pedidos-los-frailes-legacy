<template>
  <div
  @click="goToMenu(product.id)"
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
  </div>
  <p class="mt-4 font-medium">{{ product.title }}</p>
  <div class="mt-2 flex items-center">
    <span class="text-xs"
      ><i class="fa fa-star"></i> {{ product.rating }}</span
    >
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
  }
}
</script>
