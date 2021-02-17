<template>
  <div class="bg-white rounded shadow transition-all duration-300 px-4 py-4">
    <div v-if="getOrders.length">
      <h2 class="font-bold text-xl textcenter mb-8">Pedidos 📝</h2>
      <transition-group name="order">
        <template v-for="(order, $index) in getOrders" :key="order.name">
          <CardOrder :order="order" :index="$index" />
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

  props: {
    resownerId: { type: Number, required: true }
  },

  created () {
    this.$store.dispatch('getOrders', this.resownerId)
  },

  computed: {
    getOrders () {
      return this.$store.getters.order
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
