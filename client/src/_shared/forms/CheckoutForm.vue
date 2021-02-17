<template>
  <form class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5" ref="form" @submit.prevent="addOrder">
    <p class="col-span-2 text-gray-800 font-bold m-2">Tu información</p>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.name"
        required
        label="Nombre"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        v-model="orderInfo.tel"
        required
        v-mask="'(###) ###-####'"
        label="Telefono"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        type="text"
        required
        v-model="orderInfo.street"
        label="Calle"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        v-model="orderInfo.number"
        label="Numero"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        v-model="orderInfo.reference"
        label="Referencia"
      />
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <material-input
        required
        type="text"
        v-model="orderInfo.apartment"
        label="Edificio/Apto/Extensión"
      />
    </div>
    <div class="col-span-2 mt-2">
      <material-input
        required
        type="text"
        v-model="orderInfo.additionalNotes"
        label="Notas adicionales"
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
import { currency } from '@/_helpers/index'
import { mask } from 'vue-the-mask'

import MaterialInput from '@/_shared/inputs/MaterialInput'

export default {
  name: 'CheckoutForm',

  directives: { mask },

  components: { MaterialInput },

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
        RestaurantId: this.restaurantId,
        cartItems: []
      }
    }
  },

  created () {
    this.orderInfo.cartItems = this.cartItems
  },

  methods: {
    addOrder () {
      if (this.isEmpty(this.orderInfo)) {
        this.$swal('Debe de llenar todos los campos', '', 'warning')
        return
      }

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
          this.$store.dispatch('order/addOrder', this.orderInfo)
          this.$refs.form.reset()
          this.cartItems.map(cartItem => {
            this.$store.dispatch('cart/removeProductFromCart', cartItem)
          })
          this.$router.push({ name: 'Shop' })
        }
      })
    },
    isEmpty (obj) {
      return !Object.values(obj).every(element => element !== '')
    }
  },

  computed: {
    cartTotal () {
      return currency(this.$store.getters['cart/cartTotal'])
    },
    cartItems () {
      return this.$store.getters['cart/productsOnCart'].filter(item => item.product.RestaurantId === this.restaurantId)
    }
  }
}
</script>
