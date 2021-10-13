<template>
  <div
    class="rounded-lg max-w-xs p-8 mb-8 m-auto border border-dashed border-white text-center hidden lg:block"
  >
    <img
      src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/broken-heart_1f494.png"
      alt="Empty cart"
      class="m-auto w-2/4"
    >
    <p class="mt-6 text-gray-500 font-bold text-2xl">
      ¡No hay nada en el carrito!
    </p>
    <p class="mt-2 text-gray-500 text-lg">
      ¡Selecciona tus
      <br>favoritos!
    </p>
  </div>
</template>

<script>
export default {
  name: 'EmptyCart'
}
</script>
