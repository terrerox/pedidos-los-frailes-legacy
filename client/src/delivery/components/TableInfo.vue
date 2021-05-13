<template>
  <div class="grid grid-cols-2 gap-2 bg-white rounded shadow-xl p-5">
    <p class="col-span-2 text-gray-800 font-bold m-2">Información personal </p>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Cédula</h2>
      {{ deliveryInfo.Delivery.nationalId }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Estado</h2>
      {{ deliveryInfo.Delivery.status }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Nombre</h2>
      {{ deliveryInfo.Delivery.name }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Numero</h2>
      {{ deliveryInfo.Delivery.phoneNumber }}
    </div>
    <div class="col-span-2 lg:col-span-1 mt-2 pr-1">
      <h2 class="font-bold">Email</h2>
      {{ deliveryInfo.email }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TableInfo',

  created () {
    this.getLoggedDelivery()
  },

  methods: {
    ...mapActions('delivery', ['getLoggedDelivery'])
  },

  computed: {
    ...mapState('delivery', {
      deliveryInfo: 'loggedDelivery'
    })
  }
}
</script>

<style>

</style>
