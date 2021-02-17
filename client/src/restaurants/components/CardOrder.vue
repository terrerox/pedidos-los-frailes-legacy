<template>
  <div
    class="relative items-center px-2 my-2 transition-all duration-300 bg-purple-800 custom-rounded text-white cursor-pointer"
  >
    <div
      class="mb-1 p-4 no-underline text-white flex justify-between rounded "
      @click.prevent="active = !active"
    >
      <div class="title font-bold text-lg">{{ order.name }}</div>
      <div class="title font-bold text-lg">Calle: {{ order.street }}</div>
      <div class="title font-bold text-lg">{{ order.tel }}</div>
      <span class="text-white" v-show="!active">
        <img
          :src="plus"
          alt="+"
          class="w-7"
          draggable="false"
      /></span>
      <span class="text-white" v-show="active">
        <img
          :src="minus"
          alt="-"
          class="w-7"
          draggable="false"
      /></span>
    </div>
    <div class="p-2" v-show="active">
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Edificio/Apto/Extensión:
        </div>
        <div class="title  text-lg">
          {{ order.apartment }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Número:
        </div>
        <div class="title  text-lg">
          {{ order.number }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Referencia:
        </div>
        <div class="title text-lg">
          {{ order.reference }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Método de pago:
        </div>
        <div class="title text-lg">
          {{ order.paymentMethod }}
        </div>
      </div>
      <hr />
      <div class="flex flex-row justify-between">
        <div class="title font-bold text-lg">
          Notas adicionales:
        </div>
        <div class="title text-lg">
          {{ order.additionalNotes }}
        </div>
      </div>
      <hr />
      <OrderCartItem
        v-for="cartItem in order.cartItems"
        :cartItem="cartItem"
        :key="cartItem.product.id"
      />
      <div class="px-2 flex flex-row justify-between">
        <button
          class="px-4 py-1 text-white font-bold bg-purple-600 custom-rounded hover:opacity-75"
          @click="sendOrder(order.id)"
        >
          Enviar orden
        </button>
        <div class="title font-bold text-lg">Total DOP: {{ cartTotal }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderCartItem from '@/_shared/cart/OrderCartItem'

import { currency } from '@/_helpers/index'

import plus from '@/_shared/assets/plus.png'
import minus from '@/_shared/assets/minus.png'

export default {
  name: 'CardOrder',

  components: { OrderCartItem },

  props: {
    order: { type: Object, required: true },
    index: { type: Number, required: true }
  },

  data () {
    return {
      active: false,
      plus: plus,
      minus: minus
    }
  },

  methods: {
    sendOrder (id) {
      this.$swal({
        title: '¿Estás seguro de enviar este producto?',
        text: 'No podrás revertir esta acción',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true,
        icon: 'warning'
      }).then((result) => {
        if (result.value) {
          this.$swal('Enviado', 'Producto se ha enviado con éxito', 'success')
          this.$store.dispatch('order/deleteOrder', {
            id,
            index: this.index
          })
        }
      })
    }
  },

  computed: {
    cartTotal () {
      return currency(
        this.order.cartItems.reduce(
          (total, current) => total + current.product.price * current.quantity,
          0
        )
      )
    }
  }
}
</script>
