<template>
  <div class="h-12 mt-8 flex items-center">
    <h6 class="font-bold text-lg mx-10">{{ title }}</h6>
    <div
      class="flex items-center ml-auto bg-gray-100 self-stretch custom-rounded px-4 w-2/3"
    >
      <i class="fa fa-search"></i>
      <input
        type="text"
        class="px-4 self-stretch bg-transparent flex-grow outline-none"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Pedidos los Frailes'
    }
  }
}
</script>
