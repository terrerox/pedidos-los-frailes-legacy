<template>
  <form class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5" ref="form" @submit.prevent="addOrder">
    <p class="col-span-2 text-gray-800 font-bold m-2">Tu información</p>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <input
        class="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
        v-model="orderInfo.name"
        required
        placeholder="Nombre"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <input
        class="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
        v-model="orderInfo.tel"
        required
        v-mask="'(###) ###-####'"
        placeholder="Telefono"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        type="text"
        required
        v-model="orderInfo.street"
        placeholder="Calle"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        required
        v-model="orderInfo.number"
        placeholder="Numero"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        required
        type="text"
        v-model="orderInfo.reference"
        placeholder="Referencia"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <input
        class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
        required
        type="text"
        v-model="orderInfo.apartment"
        placeholder="Edificio/Apto/Extensión"
      />
    </div>
    <div class="col-span-2 mt-2">
      <p class="text-gray-800 font-medium mt-2">Notas adicionales</p>
      <input
        class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
        required
        type="text"
        v-model="orderInfo.additionalNotes"
        placeholder="Agregar notas adicionales"
      />
    </div>
    <div class="col-span-2 flex flex-col flex-wrap">
      <p class="mt-4 text-gray-800 font-medium">Métodos de pago</p>
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
      </button>
    </div>
    <div class="mt-4 col-span-2 flex justify-center align-center">
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
import { mask } from 'vue-the-mask'

export default {
  name: 'CheckoutForm',

  directives: { mask },

  props: {
    restaurantId: { type: Number, required: true }
  },

  data () {
    return {
      orderInfo: {
        name: '',
        tel: '',
        street: '',
        number: '',
        reference: '',
        apartment: '',
        additionalNotes: '',
        paymentMethod: 'Pago en entrega',
        cartItems: [],
        restaurantId: this.restaurantId
      }
    }
  },

  created () {
    this.orderInfo.cartItems = this.cartItems
  },

  methods: {
    addOrder () {
      this.$swal({
        title: '¿Estás seguro de enviar el pedido?',
        text: 'No podrás revertir esta acción',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true
      }).then((result) => {
        if (result.value) {
          this.$swal('Enviado', 'El pedido se ha enviado con exito', 'success')
          this.$store.dispatch('addOrder', this.orderInfo)
          this.$refs.form.reset()
          this.cartItems.forEach(cartItem => {
            this.$store.dispatch('removeProductFromCart', cartItem)
          })
          this.$router.push({ name: 'Products' })
        }
      })
    }
  },

  computed: {
    cartTotal () {
      return currency(this.$store.getters.cartTotal)
    },
    cartItems () {
      return this.$store.getters.productsOnCart.filter(item => item.product.restaurantId === this.restaurantId)
    }
  }
}
</script>
