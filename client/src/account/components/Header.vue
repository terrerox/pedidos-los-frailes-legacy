<template>
  <div
    class="py-12 color-secondary lg:bg-white flex justify-center lg:justify-start lg:px-12"
  >
    <router-link
      :to="{ name: 'Home' }"
      class="cursor-pointer flex items-center"
    >
      <div>
        <img class="w-16" src="@/_shared/assets/logo.png" />
      </div>
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
