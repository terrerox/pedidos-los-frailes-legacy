<template>
  <div
    class="shadow-lg relative h-40 custom-rounded"
    :style="{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(\'' + product.imageUrl + product.id + '\')'
    }"
  >
    <div
      class="absolute bottom-0 left-0 w-1/3 bg-gray-200 rounded-tr-lg p-2 text-center text-xs"
    >
      <span class="font-bold">{{ product.prepTimeValue }}</span>
      {{ product.prepTimeUnit }}
    </div>
    <div style="top: -20px;" class="absolute right-0 w-7">
      <button
        @click="this.$emit('openModal', product.id)"
        class="inline-block p-3 text-center text-white transition bg-purple-800 rounded-full shadow ripple hover:shadow-lg hover:bg-purple-900 focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="#ffff"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          ></path>
        </svg>
      </button>
    </div>
    <div style="bottom: -20px;" class="absolute right-0 w-7">
      <button
        class="inline-block p-3 text-center text-white transition bg-red-700 rounded-full shadow ripple hover:shadow-lg hover:bg-red-800 focus:outline-none"
        @click="deleteProduct(product.id)"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
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
  name: 'ProductOwner',
  props: {
    index: {
      type: Number,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },

  emits: {
    openModal: id => {
      return id
    }
  },

  methods: {
    deleteProduct (id) {
      this.$swal({
        title: '¿Estás seguro de eliminar este producto?',
        text: 'No podrás revertir esta acción',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true,
        icon: 'warning'
      }).then((result) => {
        if (result.value) {
          this.$swal('Eliminado', 'Producto eliminado con éxito', 'success')
          this.$store.dispatch('deleteProduct', {
            id,
            index: this.index
          })
        }
      })
    }
  }
}
</script>
