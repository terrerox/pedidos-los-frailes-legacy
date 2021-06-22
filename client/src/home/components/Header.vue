<template>
  <div
    class="sticky top-0 w-full py-4 shadow-md z-10 color-secondary flex justify-center lg:justify-start lg:px-12 md:justify-start md:px-12"
  >
    <router-link
      :to="{ name: 'Home' }"
      class="cursor-pointer flex items-center"
    >
      <div class="text-2xl text-gray-600 tracking-wide ml-2">
        Pedidos <span class="text-color-primary">Los Frailes</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style></style>
