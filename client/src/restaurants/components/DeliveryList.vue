<template>
  <div class="bg-white rounded shadow transition-all duration-300 mb-4 mt-10 p-10 max-w-sm m-auto" v-show="orderDetails.status !== 'taken'">
    <div>
      <h2 class="font-bold text-xl textcenter mb-8">Deliveries 📝</h2>
      <transition-group name="order">
        <template v-for="delivery in activeDeliveries" :key="delivery.id">
          <DeliveryItem
            @select="setSelectedDelivery"
            :delivery="delivery"
            :class="{ 'is-active': delivery.id === setOrderToDelivery.DeliveryId}"
          />
        </template>
      </transition-group>
    </div>
     <div class="mt-4 col-span-2 flex justify-center align-center">
      <button
        class="px-4 py-1 text-white font-bold color-primary custom-rounded hover:opacity-75"
        @click="submitOrderConfirmation"
      >
        Enviar pedido
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DeliveryItem from '@/restaurants/components/DeliveryItem'

export default {
  name: 'DeliveryList',

  components: { DeliveryItem },

  data () {
    return {
      setOrderToDelivery: {
        OrderId: '',
        DeliveryId: '',
        status: 'taken'
      }
    }
  },

  created () {
    this.getDeliveries()
    this.setOrderToDelivery.OrderId = this.$route.params.orderId
  },

  methods: {
    setSelectedDelivery (id) {
      this.setOrderToDelivery.DeliveryId = id
    },
    submitOrderConfirmation () {
      const { DeliveryId, status, OrderId } = this.setOrderToDelivery
      if (DeliveryId === '') {
        this.$swal('Debe seleccionar un delivery', '', 'warning')
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
          this.updateDelivery({ status, id: DeliveryId })
          this.updateOrder({ status, DeliveryId, id: OrderId })
          location.reload()
        }
      })
    },

    ...mapActions('order', ['updateOrder']),
    ...mapActions('delivery', ['updateDelivery']),
    ...mapActions('delivery', ['getDeliveries'])
  },

  computed: {
    ...mapGetters('delivery', ['activeDeliveries']),
    ...mapGetters('order', {
      orderDetails: 'order'
    })
  }
}
</script>

<style scoped>
  .is-active {
    border: 3px #23d160 solid;
  }
</style>
