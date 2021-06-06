<template>
  <div class="grid grid-cols-2 gap-2 rounded shadow-xl p-5">
    <div class="col-span-2">
      <div class="font-bold text-2xl max-w-xl text-gray-900 leading-tight">
        Verificar delivery
        <hr class="w-12 h-1 color-primary rounded-full mb-7 mt-1" />
      </div>
    </div>
    <div class="col-span-2" v-if="unverifiedDeliveries.length">
      <template
        :key="delivery.accountId"
        v-for="delivery in unverifiedDeliveries"
      >
        <UnverifiedDeliveryItem
          :delivery="delivery"
        />
        <hr class="col-span-2"/>
      </template>
    </div>
    <div class="col-span-2" v-else>
      <h1 class="text-xl text-center">¡No hay deliveries para verificar! 😬</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UnverifiedDeliveryItem from '@/admin/components/UnverifiedDeliveryItem'

export default {
  name: 'UnverifiedDeliveries',

  components: { UnverifiedDeliveryItem },

  created () {
    this.getDeliveries()
  },

  methods: {
    ...mapActions('delivery', ['getDeliveries'])
  },

  computed: {
    ...mapGetters('delivery', ['unverifiedDeliveries'])
  }
}
</script>

<style scoped>
</style>
