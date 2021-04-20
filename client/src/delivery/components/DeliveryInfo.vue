<template>
  <div class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5">
    <p class="col-span-2 text-gray-800 font-bold m-2">Información personal </p>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Cédula</h2>
      {{ deliveryInfo.name }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Estado</h2>
      {{ deliveryInfo.name }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Nombre</h2>
      {{ deliveryInfo.name }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Apellido</h2>
      {{ deliveryInfo.name }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Numero</h2>
      {{ deliveryInfo.phoneNumber }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Email</h2>
      {{ deliveryInfo.street }}
    </div>
  </div>
</template>

<script>
import { currency } from '@/_helpers'

export default {
  name: 'DeliveryInfo',

  props: {
    deliveryInfo: {
      type: Object,
      required: true
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
