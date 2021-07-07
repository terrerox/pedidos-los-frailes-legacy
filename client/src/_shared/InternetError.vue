<template>
  <div class="fixed z-20 w-full flex justify-center">
    <div
      class="mt-2 bg-red-200 border w-50 flex flex-row space-x-6 m-auto border-red-400 text-red-700 pl-4 pr-8 py-3 absolute rounded"
    >
      <strong class="font-bold py-2 px-4">No hay conexión</strong>
      <button @click="reloadPage" class="bg-transparent text-red-dark py-2 px-4 border border-red-700 rounded">
        <div class="tracking-widest leading-tight">
          RECARGAR
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternetError',

  methods: {
    reloadPage () {
      this.$router.go()
    }
  }
}
</script>

<style>

</style>
