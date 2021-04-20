<template>
  <div v-cloak id="dribbleShot">
    <OwnerHeader title="Revisión" backTo="Local"/>
    <section class="main">
      <div class="flex flex-col-reverse lg:flex-row">
        <div class="leading-loose m-5 flex-grow px-2 md:px-16 lg:px-16">
          <OrderDetails :orderDetails="order" />
        </div>
        <DeliveryList/>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderDetails from '@/locals/components/OrderDetails'
import DeliveryList from '@/locals/components/DeliveryList'

import OwnerHeader from '@/_shared/layout/OwnerHeader'

export default {
  name: 'Order',

  components: { OrderDetails, DeliveryList, OwnerHeader },

  created () {
    const orderId = Number(this.$route.params.orderId)
    this.getOrder(orderId)
  },

  methods: {
    ...mapActions('order', ['getOrder'])
  },

  computed: {
    ...mapGetters('order', ['order'])
  }

}
</script>

<style>

</style>
