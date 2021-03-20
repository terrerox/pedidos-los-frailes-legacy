<template>
   <div
    class="relative flex flex-row items-center px-2 my-2 transition-all duration-300 color-primary custom-rounded cursor-pointer"
    @click="this.$emit('select', delivery.id)"
  >
    <div
      class="absolute top-0 left-0 w-4 h-4 text-center transition color-primary rounded-full border border-white cursor-pointer shadow ripple btn-hover focus:outline-none"
    >
      <svg fill="#ffff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </div>
    <img
      class="w-12 h-12 my-auto custom-rounded"
      alt="Delivery image"
      :src="delivery.image"
    />
    <div class="flex flex-col w-full mx-2 truncate">
      <span class="text-white truncate">{{ delivery.name }}</span>
      <div>
        <span class="text-white">{{ delivery.phoneNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliveryItem',

  props: {
    delivery: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
