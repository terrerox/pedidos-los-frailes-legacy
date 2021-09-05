<template>
  <div class="grid grid-cols-2 gap-2 rounded shadow-xl p-5">
    <div class="col-span-2">
      <div class="font-bold text-2xl max-w-xl text-gray-900 leading-tight">
        Verificar delivery
        <hr class="w-12 h-1 color-primary rounded-full mb-7 mt-1">
      </div>
    </div>
    <div v-if="unverifiedDeliveries.length" class="col-span-2">
      <template
        v-for="delivery in unverifiedDeliveries"
      >
        <UnverifiedDeliveryItem
          :key="delivery.accountId"
          :delivery="delivery"
        />
        <hr :key="delivery.accountId" class="col-span-2">
      </template>
    </div>
    <div v-else class="col-span-2">
      <h1 class="text-xl text-center">
        ¡No hay deliveries para verificar! 😬
      </h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UnverifiedDeliveryItem from './UnverifiedDeliveryItem'

export default {
  name: 'UnverifiedDeliveries',

  components: { UnverifiedDeliveryItem },

  computed: {
    ...mapGetters('delivery', ['unverifiedDeliveries'])
  },

  created () {
    this.getDeliveries()
  },

  methods: {
    ...mapActions('delivery', ['getDeliveries'])
  }
}
</script>

<style scoped>
</style>
