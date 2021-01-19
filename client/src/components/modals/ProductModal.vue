<template>
    <div class="">
      <div
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      >
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <div
            class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <!--header-->
            <div
              class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
            >
              <h3 class="text-3xl font-semibold">
                {{ modalTitle }}
              </h3>
              <button
                class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                @click="toggleModal()"
              >
                <span
                  class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                >
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto">
                <ProductForm :isEditing="isEditing" :resownerId="resownerId" ref="form"/>
            </div>
            <!--footer-->
            <div
              class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
            >
              <button
                class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style="transition: all .15s ease"
                @click="this.$emit('close')"
              >
                Cerrar
              </button>
              <button
                class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                @click="$refs.form.submitProduct()"
                style="transition: all .15s ease"
              >
                {{ btnTitle }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>

<script>
import ProductForm from '../forms/ProductForm'

export default {
  name: 'ProductModal',

  components: { ProductForm },

  props: {
    isEditing: { type: Number },
    resownerId: { type: Number, required: true }
  },

  data () {
    return {
      showModal: false
    }
  },

  computed: {
    modalTitle () {
      return this.isEditing ? 'Editar producto' : 'Agregar producto'
    },
    btnTitle () {
      return this.isEditing ? 'Editar' : 'Agregar'
    }
  }
}
</script>
