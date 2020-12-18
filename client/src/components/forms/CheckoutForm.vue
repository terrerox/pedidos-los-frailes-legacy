<template>
  <form class="bg-white rounded shadow-xl p-5" @submit.prevent="addOrder">
    <div class="inline-block mt-2 w-1/2 pr-1">
      <input
        class="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
        v-model="name"
        placeholder="Nombre"
      />
    </div>
    <div class="inline-block mt-2 w-1/2 pr-1">
      <input
        class="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
        v-model="tel"
        type="text"
        placeholder="Telefono"
      />
    </div>
    <div class="inline-block mt-2 w-1/2 pr-1">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        type="text"
        v-model="street"
        placeholder="Calle"
      />
    </div>
    <div class="inline-block mt-2 w-1/2 pr-1">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        type="text"
        v-model="number"
        placeholder="Numero"
      />
    </div>
    <div class="inline-block mt-2 w-1/2 pr-1">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        type="text"
        v-model="reference"
        placeholder="Referencia"
      />
    </div>
    <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        type="text"
        placeholder="Edificio/Apto/Extensión"
      />
    </div>
    <p class="text-gray-800 font-medium mt-2">Notas adicionales</p>
    <div class="mt-2">
      <input
        class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
        type="text"
        placeholder="Agregar notas adicionales"
      />
    </div>
    <p class="mt-4 text-gray-800 font-medium">Métodos de pago</p>
    <div class="flex flex-col flex-wrap">
      <button
        class="flex items-center justify-between bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none"
      >
        <label class="flex items-center">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-blue-600"
            checked
          /><span class="ml-2 text-sm text-gray-700">🛵 Pago en entrega</span>
        </label>

        <span class="text-gray-600 text-sm">RD$ {{ cartTotal }}</span>
      </button>
    </div>
    <div class="mt-4 flex justify-center align-center">
      <button
        class="px-4 py-1 text-white font-bold bg-purple-800 custom-rounded hover:opacity-75"
        type="submit"
      >
        Enviar pedido
      </button>
    </div>
  </form>
</template>
<script>
import { currency } from '@/filters/currency'

export default {
  name: 'CheckoutForm',

  methods: {

  },

  computed: {
    cartTotal () {
      return currency(this.$store.getters.cartTotal)
    }
  }
}
</script>
