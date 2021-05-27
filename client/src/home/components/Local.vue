<template>
  <div
  @click="goToShop(local.accountId)"
    class="shadow-lg relative h-40 custom-rounded cursor-pointer hover:opacity-75"
    :style="{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(\'' + local.imageUrl + '\')'
    }"
  >
  </div>
  <p class="mt-4 font-medium">{{ local.title }}</p>
  <div class="mt-2 flex items-center">
    <span class="text-xs"
      ><i class="fa fa-star"></i> {{ local.rating }}</span
    >
    <span class="text-gray-600 font-hairline text-xs mx-4">{{
      local.category
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Local',

  props: {
    local: { type: Object, required: true }
  },

  methods: {
    goToShop (id) {
      this.$router.push({ name: 'Shop', params: { id } })
    }
  }
}
</script>
