<template>
  <div class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5">
    <p class="col-span-2 text-gray-800 font-bold m-2">Detalles de orden <strong v-show="orderDetails.status === 'confirmed'">(Confirmada)</strong></p>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Nombre</h2>
      {{ orderDetails.name }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Número de teléfono</h2>
      {{ orderDetails.phoneNumber }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Calle</h2>
      {{ orderDetails.street }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Número de casa</h2>
      {{ orderDetails.numberOfHouse }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Referencia</h2>
      {{ orderDetails.reference }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Apartamento</h2>
      {{ orderDetails.apartment }}
    </div>
    <div class="col-span-2 mt-2">
      <h2 class="font-bold">Notas adicionales</h2>
      {{ orderDetails.additionalNotes }}
    </div>
    <div class="col-span-2 mt-2">
      <h2 class="font-bold">Productos pedidos | Total: </h2>
        <OrderCartItem
          class="text-white"
          v-for="cartItem in orderDetails.cartItems"
          :cartItem="cartItem"
          :key="cartItem.product.id"
        />
    </div>
    <div v-show="orderDetails.status === 'confirmed'" class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Delivery encargado</h2>
      {{ delivery.name }}
      {{ delivery.lastName }}
    </div>
    <div v-show="orderDetails.status === 'confirmed'" class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Número de teléfono del Delivery</h2>
      {{ delivery.phoneNumber }}
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
  </div>
</template>

<script>
import { currency } from '@/_helpers'

import OrderCartItem from '@/_shared/cart/OrderCartItem'

export default {
  name: 'OrderDetails',

  components: { OrderCartItem },

  props: {
    orderDetails: {
      type: Object
    }
  },

  computed: {
    delivery () {
      return this.orderDetails.Delivery ? this.orderDetails.Delivery : ''
    },
    cartTotal () {
      return currency(
        this.orderDetails.cartItems.reduce(
          (total, current) => total + current.product.price * current.quantity,
          0
        )
      )
    }
  }
}
</script>

<style>

</style>
