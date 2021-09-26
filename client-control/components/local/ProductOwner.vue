<template>
  <div>
    <div
      class="shadow-lg relative h-40 custom-rounded"
      :style="{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(\'' + product.imageUrl + '\')'
      }"
    >
      <div class="flex flex-row space-x-2 ml-3 absolute bottom-2">
        <div
          class="rounded-full w-auto py-1 px-2 shadow-xl text-white color-primary"
        >
          <span class="text-xs">💵{{ product.price }} DOP</span>
        </div>
        <div
          class="rounded-full w-auto py-1 px-2 shadow-xl text-white color-primary"
        >
          <span class="text-xs">⌛{{ product.prepTimeValue }} {{ product.prepTimeUnit }}</span>
        </div>
      </div>
      <div style="top: -20px;" class="absolute right-0 w-7">
        <button
          class="inline-block p-3 text-center text-white transition bg-green-700 rounded-full shadow ripple hover:bg-green-800 focus:outline-none"
          @click="$emit('openModal', product.id)"
        >
          <svg
            class="w-6 h-6"
            fill="#ffff"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
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
            />
          </svg>
        </button>
      </div>
    </div>
    <p class="mt-4 text-lg text-gray-600 leading-tight">
      {{ product.title }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProductOwner',
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  emits: {
    openModal: (id) => {
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
          this.$store.dispatch('product/deleteProduct', id)
        }
      })
    }
  }
}
</script>
