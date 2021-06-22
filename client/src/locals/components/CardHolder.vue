<template>
  <div
    class="border border-solid border-gray-500 shadow-md rounded-lg mb-4 mt-16 p-10 max-w-sm m-auto"
    :class="getOrders.length ? 'block' : 'hidden lg:block'"
  >
    <div v-if="getOrders.length">
      <h2 class="text-xl text-gray-600 leading-tight text-center mb-8">Pedidos 📝</h2>
      <transition-group name="order">
        <template v-for="order in getOrders" :key="order.id">
          <CardOrder :order="order" />
        </template>
      </transition-group>
    </div>
    <EmptyOrders v-else />
  </div>
</template>

<script>
import CardOrder from './CardOrder'
import EmptyOrders from './EmptyOrders'

export default {
  name: 'CardHolder',

  components: { CardOrder, EmptyOrders },

  created () {
    this.$store.dispatch('order/getOrders')
  },

  computed: {
    getOrders () {
      return this.$store.getters['order/orders']
    }
  }
}
</script>

<style scoped>
.order-enter,
.order-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
